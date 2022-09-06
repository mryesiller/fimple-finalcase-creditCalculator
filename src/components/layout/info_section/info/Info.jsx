import React from "react"
import { useTranslation } from "react-i18next"
import { dataStore } from "../../../../context/dataContext"

const Info = () => {
  const { t } = useTranslation()
  const {
    rate,
    expiryValue,
    expiryType,
    expiryPayment,
    totalTax,
    totalPayment,
  } = dataStore()

  return (
    <article className="info__info">
      <div className="info__text">
        <h2>{t("form-interest")}</h2>
        <h3>
          <span>%</span>
          {rate}
        </h3>
      </div>
      <div className="info__text">
        <h2>{t("installment-period")}</h2>
        <h3>
          {expiryValue} <span>{expiryType}</span>
        </h3>
      </div>
      <div className="info__text">
        <h2>{t("total-interest")}</h2>
        <h3>
          {totalTax.toFixed(2)} <span>{t("form-span")}</span>
        </h3>
      </div>
      <div className="info__text">
        <h2>{t("form-installment")}</h2>
        <h3>
          {expiryPayment.toFixed(2)} <span>{t("form-span")}</span>
        </h3>
      </div>
      <div className="info__text">
        <h2>{t("total-payback")}</h2>
        <h3>
          {totalPayment.toFixed(2)} <span>{t("form-span")}</span>
        </h3>
      </div>
    </article>
  )
}

export default Info
