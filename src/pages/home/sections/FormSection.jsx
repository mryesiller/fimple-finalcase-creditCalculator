import React, { useRef} from "react"
import { useTranslation } from "react-i18next"

import { dataStore } from "../../../context/dataContext"
import { eventStore } from "../../../context/eventContext"
import { formStore } from "../../../context/formContext"
import { formSchema } from "../../../helpers/yupFormSchema"



import dollar from "../../../assets/images/dollar.png"
import { Input } from "../../../components"

const FormSection = () => {
  const { t } = useTranslation()  

  const { handleFormSubmit } = formStore()
  const { errors} = eventStore()
  const {
    creditAmount,
    creditRate,
    creditPeriod,    
    creditBsmv,
    creditKkdf,    
    getTogetherMethod,
    
  } = dataStore() 

  const creditAmountRef = useRef()
  const creditRateRef = useRef()
  const creditPeriodRef = useRef()
  const creditBsmvRef = useRef()
  const creditKkdfRef = useRef()
  const selectRef = useRef() 
 


  const handleSubmitForm = (e) => {
    e.preventDefault()
    eventStore.setState({ isLoading: true })

    formSchema
      .validate({
        creditPeriodType: selectRef.current.value,
        creditAmount : creditAmountRef.current.value,
        creditRate : creditRateRef.current.value,
        creditPeriod : creditPeriodRef.current.value,
        creditBsmv : creditBsmvRef.current.value,
        creditKkdf : creditKkdfRef.current.value,
      }, { abortEarly: false })
      .then((valid) => {
        console.log("Valid", valid)           
       
        getTogetherMethod(
          creditAmountRef.current.value,
          creditRateRef.current.value,
          creditPeriodRef.current.value,       
          creditBsmvRef.current.value,
          creditKkdfRef.current.value
        )       
        eventStore.setState({ isLoading: false })
      })
      .catch((err) => {
        const validationErrors = {}
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message
        })        
        eventStore.setState({ errors: validationErrors })         
        setTimeout(() => {          
          eventStore.setState({ errors: false })          
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
            label_text={t("form-amount")}
            span_value={t("form-span-currency")}
            error={errors.creditAmount}
          />
          <Input
            ref={creditRateRef}
            classname={"form"}
            containerID={"creditRateContainer"}
            id={"creditRate"}
            name={"creditRate"}
            type={"number"}
            defaultValue={creditRate}            
            label_text={t("form-interest")}
            span_value={t("form-span-percent")}
            step={0.01}
            error={errors.creditRate}
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
            label_text={t("form-installment")}
            error={errors.creditPeriod}
          />
          <select
            className="form__select"
            name="creditPeriodType"
            defaultValue="month"
            ref={selectRef}            
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
            label_text={t("form-bsmv")}
            span_value={t("form-span-percent")}
            step={0.01}
            error={errors.creditBsmv}
          />
          <Input
            ref={creditKkdfRef}
            classname={"form"}
            containerID={"creditKkdfContainer"}
            id={"creditKkdf"}
            name={"creditKkdf"}
            type={"number"}
            defaultValue={creditKkdf}            
            label_text={t("form-kkdf")}
            span_value={t("form-span-percent")}
            step={0.01}
            error={errors.creditKkdf}
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

