import React, { useState, useCallback } from "react"
import { useTranslation } from "react-i18next"
import * as yup from "yup"
import { dataStore } from "../../../context/dataContext"
import { eventStore } from "../../../context/eventContext"
import dollar from "../../../assets/images/dollar.png"

const Form = () => {
  const { t } = useTranslation()
  const {
    amountValue,
    expiryValue,
    rate,
    bsmv,
    kkdf,
    expiryType,
    setRateValue,
    setBsmvValue,
    setKkdfValue,
    setTaxValue,
    setTotalTax,
    setTotalPayment,
    setExpiryPayment,
  } = dataStore()

  const creditAmountRef = React.useRef()

  const handleChangeCreditAmount = () => {
    console.log(creditAmountRef.current.value)
  }

  const formSchema = yup.object().shape({
    amountValue: yup.number().min(500).max(1000000).required(),
    expiryValue: yup.number().required(),
    rate: yup
      .number()
      .min(0.1, `${t("min-rate-error")}`)
      .max(10, `${t("max-rate-error")}`)
      .required(),
    bsmv: yup.number().min(0.1).max(20).required(),
    kkdf: yup.number().min(0.1).max(20).required(),
    expiryType: yup.string().required(),
  })

  const [values, setValues] = useState({
    amountValue: amountValue,
    expiryValue: expiryValue,
    expiryType: expiryType,
    rate: rate,
    bsmv: bsmv,
    kkdf: kkdf,
  })

  const [errors, setErrors] = useState({
    amountValue: false,
    expiryValue: false,
    expiryType: false,
    rate: false,
    bsmv: false,
    kkdf: false,
  })

  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target
      setValues({ ...values, [name]: value })
    },
    [values]
  )

  const handleFormSubmit = useCallback(
    (e) => {
      e.preventDefault()
      eventStore.setState({ isLoading: true })
      formSchema
        .validate(values, { abortEarly: false })
        .then((valid) => {
          console.log("Valid", valid)
          dataStore.setState({
            amountValue: values.amountValue,
            expiryValue: values.expiryValue,
            expiryType: values.expiryType,
            rate: values.rate,
            bsmv: values.bsmv,
            kkdf: values.kkdf,
          })
        })
        .then(() => {
          const rateValue = setRateValue(
            values.rate,
            values.amountValue,
            values.expiryValue
          )
          const bsmvValue = setBsmvValue(values.bsmv, rateValue)
          const kkdfValue = setKkdfValue(values.kkdf, rateValue)
          const taxValue = setTaxValue(bsmvValue, kkdfValue)
          const totalTax = setTotalTax(taxValue, rateValue)
          const totalPayment = setTotalPayment(
            totalTax,
            Number(values.amountValue)
          )
          console.log(values.expiryType)
          setExpiryPayment(totalPayment, Number(values.expiryValue))
          eventStore.setState({ isLoading: false })
        })
        .catch((err) => {
          console.log("Error", err)
          const validationErrors = {}
          err.inner.forEach((error) => {
            validationErrors[error.path] = error.message
          })
          setErrors(validationErrors)
          eventStore.setState({ isLoading: false })
          eventStore.setState({ error: validationErrors })
        })
    },
    [values]
  )

  return (
    <form className="form container" onSubmit={handleFormSubmit}>
      <div className="form__container grid">
        <div className="form__logo">
          <img src={dollar} alt="dollar" />
        </div>
        <div className="form__group">
          <label className="form__label" htmlFor="amount">
            {t("form-amount")}
          </label>
          <input
            ref={creditAmountRef}
            className="form__input"
            id="amount"
            name="amountValue"
            type="number"
            defaultValue={amountValue}
            onChange={handleInputChange}
          ></input>
          <span className="form__span">{t("form-span")}</span>
          {errors.amountValue && (
            <p className="form__error">{errors.amountValue}</p>
          )}
        </div>
        <div className="form__group">
          <label className="form__label" htmlFor="installment">
            {t("form-installment")}
          </label>
          <input
            className="form__input"
            id="installment"
            name="expiryValue"
            type="number"
            defaultValue={expiryValue}
            onChange={handleInputChange}
          ></input>

          <select
            className="form__select"
            name="expiryType"
            defaultValue="month"
            onChange={handleInputChange}
          >
            <option value={t("week")}>{t("select-week")}</option>
            <option value={t("month")}>{t("select-month")}</option>
            <option value={t("year")}>{t("select-year")}</option>
          </select>
        </div>
        <h2 className="form__title">{t("form-title")}</h2>
        <div className="form__group">
          <label className="form__label" htmlFor="rate">
            {t("form-interest")}
          </label>
          <input
            className="form__input"
            id="rate"
            name="rate"
            type="number"
            step="0.01"
            defaultValue={rate}
            onChange={handleInputChange}
          ></input>

          <span className="form__span">%</span>
          {errors.rate && <p className="form__error">{errors.rate}</p>}
        </div>
        <div className="form__group flex tax">
          <label className="form__label_bsmv" htmlFor="bsmv">
            {t("form-bsmv")}
          </label>
          <input
            className="form__input"
            id="bsmv"
            name="bsmv"
            type="number"
            step="0.01"
            defaultValue={bsmv}
            onChange={handleInputChange}
          ></input>
          <span className="form__span_bsmv">%</span>
          {errors.bsmv && <p className="form__error">{errors.bsmv}</p>}
          <label className="form__label_kkdf" htmlFor="kkdf">
            {t("form-kkdf")}
          </label>
          <input
            className="form__input"
            id="kkdf"
            name="kkdf"
            type="number"
            step="0.01"
            defaultValue={kkdf}
            onChange={handleInputChange}
          ></input>
          <span className="form__span_kkdf">%</span>
          {errors.kkdf && <p className="form__error">{errors.kkdf}</p>}
        </div>
      </div>
      <div className="form__button">
        <button type="submit" className="btn btn__success">
          {t("form-button")}
        </button>
      </div>
    </form>
  )
}

export default Form

/* <Input
        classname={"form"}
        name={"amount"}
        label_text={"Credit Amount"}
        span_value={"TL"}
        maxlength={10}
        input_value={10000}
        type={"number"}
      />
      <Input
        classname={"form"}
        name={"expiry"}
        label_text={"Loan Term"}
        span_value={"month"}
        maxlength={3}
        type={"number"}
      />
      <Input
        classname={"form"}
        name={"rate"}
        span_value={"%"}
        maxlength={3}
        input_value={1.59}
        type={"number"}
        <input name="my_field" pattern="^\d*(\.\d{0,2})?$" />
        .test("is-decimal", "invalid-Decimal", (value) =>
        (value + "").match(/^\d*\.{1}\d*$/)
      ),
      /> */
