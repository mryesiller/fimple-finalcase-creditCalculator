import React from "react"
import { useTranslation } from "react-i18next"
import dollar from "../../../assets/images/dollar.png"

const Form = () => {
  const { t } = useTranslation()
  return (
    <form className="form container">
      <div className="form__container grid">
        <div className="form__logo">
          <img src={dollar} alt="dollar" />
        </div>
        <div className="form__group">
          <label className="form__label" htmlFor="amount">
            {t("form-amount")}
          </label>
          <input className="form__input" id="amount" type="number"></input>

          <span className="form__span">{t("form-span")}</span>
        </div>
        <div className="form__group">
          <label className="form__label" htmlFor="installment">
            {t("form-installment")}
          </label>
          <input
            className="form__input"
            id="installment"
            type="number"
            selectBoxOptions="Canada;Denmark;Finland;Germany;Mexico"
          ></input>
          <select className="form__select" name="select">
            <option value="week">{t("select-week")}</option>
            <option value="month" selected>
              {t("select-month")}
            </option>
            <option value="year">{t("select-year")}</option>
          </select>
        </div>
        <h2 className="form__title">{t("form-title")}</h2>
        <div className="form__group">
          <label className="form__label" htmlFor="rate">
            {t("form-interest")}
          </label>
          <input className="form__input" id="rate" type="number"></input>

          <span className="form__span">%</span>
        </div>
        <div className="form__group">
          <label className="form__label" htmlFor="tax">
            {t("form-tax")}
          </label>
          <input className="form__input" id="tax" type="number"></input>

          <span className="form__span">%</span>
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
      /> */
