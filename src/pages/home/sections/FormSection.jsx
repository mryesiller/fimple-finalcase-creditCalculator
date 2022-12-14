import React, { useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"

import { dataStore, initialCreditData } from "../../../context/dataContext"
import { eventStore } from "../../../context/eventContext"
import { formSchema } from "../../../helpers/yupFormSchema"

import dollar from "../../../assets/images/dollar.png"
import { Input, CurrencyInput } from "../../../components"
import ToggleButton from "react-toggle-button"

import { sanitizeCurrencyValue } from "../../../helpers/currency"

const FormSection = () => {
  const { t } = useTranslation()
  const { errors, calculateMode } = eventStore()
  const {
    calculateCompoundCreditPayback,
    calculateBasicCreditPayback,
    isCalculated,
  } = dataStore()

  const refs = {
    creditAmountRef: useRef(),
    creditRateRef: useRef(),
    creditPeriodRef: useRef(),
    creditBsmvRef: useRef(),
    creditKkdfRef: useRef(),
    selectRef: useRef(),
  }

  useEffect(() => {
    if (isCalculated) {
      window.scrollTo({
        top: document.body.scrollHeight / 2,
      })
      document.getElementById("payment-plan-tab").click()
    }
  }, [isCalculated])

  // form handle funtion
  const handleSubmitForm = (e) => {
    e.preventDefault()
    dataStore.setState({ isCalculated: false })
    eventStore.setState({ isLoading: true, errors: false })

    const {
      creditAmountRef: creditAmount,
      creditRateRef: creditRate,
      creditPeriodRef: creditPeriod,
      creditBsmvRef: creditBsmv,
      creditKkdfRef: creditKkdf,
      selectRef: creditPeriodType,
    } = Object.keys(refs).reduce((ref1, ref2) => {
      const currentRefValue = refs[ref2].current.value

      return {
        ...ref1,
        [ref2]:
          ref2 === "creditAmountRef"
            ? sanitizeCurrencyValue(currentRefValue)
            : currentRefValue,
      }
    }, {})

    formSchema
      .validate(
        {
          creditPeriodType,
          creditAmount,
          creditRate,
          creditPeriod,
          creditBsmv,
          creditKkdf,
        },
        { abortEarly: false }
      )
      .then(() => {
        !calculateMode
          ? calculateCompoundCreditPayback({
              creditAmount,
              creditRate,
              creditPeriod,
              creditBsmv,
              creditKkdf,
            })
          : calculateBasicCreditPayback({
              creditAmount,
              creditRate,
              creditPeriod,
              creditBsmv,
              creditKkdf,
            })

        eventStore.setState({ isLoading: false })
        dataStore.setState({ isCalculated: true })
      })
      .catch((err) => {
        const validationErrors = {}

        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message
        })
        console.log(validationErrors)
        eventStore.setState({ errors: validationErrors })
        eventStore.setState({ isLoading: false })
      })
  }

  return (
    <form className="form container" onSubmit={handleSubmitForm}>
      <div className="form__container grid">
        <div className="form__logo">
          <img src={dollar} alt="dollar" />
          <h2 className="form__title">{t("form-title")}</h2>
        </div>
        <div className="form__sections">
          <CurrencyInput
            ref={refs.creditAmountRef}
            id="creditAmount"
            name="creditAmount"
            type="tel"
            label={t("form-amount")}
            info={t("form-span-currency")}
            error={errors.creditAmount}
            defaultValue={initialCreditData.creditAmount}
          />
          <Input
            ref={refs.creditRateRef}
            id="creditRate"
            name="creditRate"
            type="number"
            label={t("form-interest")}
            info={t("form-span-percent")}
            step={0.01}
            error={errors.creditRate}
            defaultValue={initialCreditData.creditRate}
          />
        </div>
        <div className="form__sections">
          <Input
            ref={refs.creditPeriodRef}
            id="creditPeriod"
            name="creditPeriod"
            type="number"
            label={t("form-installment")}
            error={errors.creditPeriod}
            defaultValue={initialCreditData.creditPeriod}
          />
          <select
            className="form__select"
            name="creditPeriodType"
            defaultValue={initialCreditData.creditPeriodType}
            ref={refs.selectRef}
          >
            {["week", "month", "year"].map((period, index) => (
              <option key={index} value={period}>
                {t(`select-${period}`)}
              </option>
            ))}
          </select>
        </div>
        <div className="form__sections">
          <Input
            ref={refs.creditBsmvRef}
            id="creditBsmv"
            name="creditBsmv"
            type="number"
            label={t("form-bsmv")}
            info={t("form-span-percent")}
            step={0.01}
            error={errors.creditBsmv}
            defaultValue={initialCreditData.creditBsmv}
          />
          <Input
            ref={refs.creditKkdfRef}
            id="creditKkdf"
            name="creditKkdf"
            type="number"
            label={t("form-kkdf")}
            info={t("form-span-percent")}
            step={0.01}
            error={errors.creditKkdf}
            defaultValue={initialCreditData.creditKkdf}
          />
        </div>

        <div className="form__button">
          <div className="form__toggle">
            <h4>{t("compound-rate")}</h4>
            <ToggleButton
              className="form__credit_toggle_button"
              inactiveLabel=""
              activeLabel=""
              value={calculateMode}
              onToggle={() => {
                eventStore.setState({ calculateMode: !calculateMode })
              }}
              colors={{
                activeThumb: {
                  base: "rgb(250,250,250)",
                },
                inactiveThumb: {
                  base: "rgb(250,250,250)",
                },
                active: {
                  base: "rgb(1,124,66)",
                },
                inactive: {
                  base: "rgb(255,96,0)",
                },
              }}
            />
            <h4>{t("basic-rate")}</h4>
          </div>

          <button type="submit" className="btn btn__success">
            {t("form-button")}
          </button>
        </div>
      </div>
    </form>
  )
}

export default FormSection
