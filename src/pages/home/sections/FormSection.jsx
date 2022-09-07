import React, { useState, useRef, useCallback } from "react"
import { useTranslation } from "react-i18next"
import * as yup from "yup"
import { dataStore } from "../../../context/dataContext"
import { eventStore } from "../../../context/eventContext"
import { formStore } from "../../../context/formContext"

import dollar from "../../../assets/images/dollar.png"
import { Input } from "../../../components"

const FormSection = () => {
  const { t } = useTranslation()

  const { handleFormSubmit } = formStore()
  const { isLoading, errors, setErrors } = eventStore()
  const {
    creditAmount,
    creditRate,
    creditPeriod,
    creditPeriodType,
    creditBsmv,
    creditKkdf,
    setCalculatedData,
    calculteCompoundInterest,
    recursion,
  } = dataStore()

  const initialErrorState = {
    creditAmount: false,
    creditRate: false,
    creditPeriod: false,
    creditPeriodType: false,
    creditBsmv: false,
    creditKkdf: false,
  }

  const creditAmountRef = useRef()
  const creditRateRef = useRef()
  const creditPeriodRef = useRef()
  const creditBsmvRef = useRef()
  const creditKkdfRef = useRef()

  const [values, setValues] = useState({
    creditAmount: creditAmount,
    creditRate: creditRate,
    creditPeriod: creditPeriod,
    creditPeriodType: creditPeriodType,
    creditBsmv: creditBsmv,
    creditKkdf: creditKkdf,
  })

  const [formErrors, setFormErrors] = useState(initialErrorState)

  const formSchema = yup.object().shape({
    creditPeriodType: yup.string().required(),
    creditAmount: yup.number()
    .when("creditPeriodType", {
      is: "year",
      then: yup
        .number()
        .required()
        .min(10000, t("min-amount-error-year"))     // 10.000 TL min/year
        .max(10000000, t("max-amount-error-year")), // 10.000.000TL max/year      
    })
    .when("creditPeriodType", {      
      is: "month",
      then:yup
        .number()
        .required()
        .min(1000, t("min-amount-error-month"))      // 1.000 TL min/month
        .max(1000000, t("max-amount-error-month")),  // 1.000.000 TL max/month      
    })
    .when("creditPeriodType", {     
      is : "week",
      then:yup
        .number()
        .required()
        .min(500, t("min-amount-error-week"))       // 500 TL min/week
        .max(100000, t("max-amount-error-week")),   // 100.000 TL max/week
    }),           
    creditRate: yup.number()
    .when("creditPeriodType", {      
      is : "week",
      then:yup
        .number()
        .required()
        .min(0.01, t("min-rate-error-week"))         // 0.01% min/week
        .max(5, t("max-rate-error-week")),           // 5% max/week
    })
    .when("creditPeriodType", {
      is: "year",
      then: yup
        .number()
        .required()
        .min(0.1, t("min-rate-error-year"))          // 0,1% min/year
        .max(50, t("max-rate-error-year")),        // 50% max/year     
    })
    .when("creditPeriodType", {      
      is: "month",
      then:yup
        .number()
        .required()
        .min(0.01, t("min-rate-error-month"))        // 0.01% min/month
        .max(10, t("max-rate-error-month")),         // 10% max/month     
    }),            
    creditPeriod: yup.number()
    .when("creditPeriodType", {            
      is : "week",
      then:yup
        .number()
        .required()
        .min(4, t("min-period-error-week"))          // 4 week min
        .max(52, t("max-period-error-week")),      // 52 week max      
    })
    .when("creditPeriodType", {
      is: "year",
      then: yup
        .number()
        .required()
        .min(1, t("min-period-error-year"))          // 1 year min
        .max(30, t("max-period-error-year")),        // 30 year max
    })
    .when("creditPeriodType", {
      is: "month",
      then:yup
        .number()
        .required()
        .min(3, t("min-period-error-month"))          // 3 month min
        .max(120, t("max-period-error-month")),       // 120 month max
    }),
    creditBsmv: yup
      .number()
      .min(0.1, `${t("min-bsmv-error")}`)
      .max(20, `${t("max-bsmv-error")}`)
      .required(),
    creditKkdf: yup
      .number()
      .min(0.1, `${t("min-kkdf-error")}`)
      .max(20, `${t("max-kkdf-error")}`)
      .required(),
    
  })

  const onInputChange = useCallback(
    (e) => {
      const { name, value } = e.target
      setValues({ ...values, [name]: value })
    },
    [values]
  )

  const handleSubmitForm = (e) => {
    e.preventDefault()
    eventStore.setState({ isLoading: true })

    formSchema
      .validate(values, { abortEarly: false })
      .then((valid) => {
        console.log("Valid", valid)
        dataStore.setState({
          creditAmount: values.creditAmount,
          creditPeriod: values.creditPeriod,
          creditPeriodType: values.creditPeriodType,
          creditRate: values.creditRate,
          creditBsmv: values.creditBsmv,
          creditKkdf: values.creditKkdf,
        })
        recursion(
          values.creditAmount,
          values.creditRate,
          values.creditPeriod,          
          values.creditBsmv,
          values.creditKkdf
        )
        eventStore.setState({ isLoading: false })
      })
      .catch((err) => {
        const validationErrors = {}
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message
        })
        console.log(isLoading)
        setFormErrors(validationErrors)
        setTimeout(() => {
          setFormErrors(initialErrorState)
        }, 2000)
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
          <Input
            ref={creditAmountRef}
            classname={"form"}
            containerID={"creditAmountContainer"}
            id={"creditAmount"}
            name={"creditAmount"}
            type={"number"}
            defaultValue={creditAmount}
            onChange={onInputChange}
            label_text={t("form-amount")}
            span_value={t("form-span-currency")}
            error={formErrors.creditAmount}
          />
          <Input
            ref={creditRateRef}
            classname={"form"}
            containerID={"creditRateContainer"}
            id={"creditRate"}
            name={"creditRate"}
            type={"number"}
            defaultValue={creditRate}
            onChange={onInputChange}
            label_text={t("form-interest")}
            span_value={t("form-span-percent")}
            step={0.01}
            error={formErrors.creditRate}
          />
        </div>
        <div className="form__sections">
          <Input
            ref={creditPeriodRef}
            classname={"form"}
            containerID={"creditPeriodContainer"}
            id={"creditPeriod"}
            name={"creditPeriod"}
            type={"number"}
            defaultValue={creditPeriod}
            onChange={onInputChange}
            label_text={t("form-installment")}
            error={formErrors.creditPeriod}
          />
          <select
            className="form__select"
            name="creditPeriodType"
            defaultValue="month"
            onChange={onInputChange}
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
            ref={creditBsmvRef}
            classname={"form"}
            containerID={"creditBsmvContainer"}
            id={"creditBsmv"}
            name={"creditBsmv"}
            type={"number"}
            defaultValue={creditBsmv}
            onChange={onInputChange}
            label_text={t("form-bsmv")}
            span_value={t("form-span-percent")}
            step={0.01}
            error={formErrors.creditBsmv}
          />
          <Input
            ref={creditKkdfRef}
            classname={"form"}
            containerID={"creditKkdfContainer"}
            id={"creditKkdf"}
            name={"creditKkdf"}
            type={"number"}
            defaultValue={creditKkdf}
            onChange={onInputChange}
            label_text={t("form-kkdf")}
            span_value={t("form-span-percent")}
            step={0.01}
            error={formErrors.creditKkdf}
          />
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

export default FormSection

//   const handleChangeData = () => {
//     return {
//       creditAmount: creditAmountRef.current?.value,
//       creditRate: creditRate.current?.value,
//       creditPeriod: creditPeriodRef.current?.value,
//       creditBsmv: creditBsmvRef.current?.value,
//       creditKkdf: creditKkdfRef.current?.value,
//     }
//   }

//   const onInputChange = (e) => {
//     const { name, value } = e.target
//     setValues({ ...values, [name]: value })
//   }

//   const onInputChange = useCallback(
//     (e) => {
//       const { name, value } = e.target
//       setValues({ ...values, [name]: value })
//     },
//     [values]
//   )
