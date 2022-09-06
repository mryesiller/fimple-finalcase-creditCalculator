import React from "react"
import { useTranslation } from "react-i18next"
import { dataStore } from "../../../context/dataContext"

import { InfoText } from "../../../components"

const Info = () => {
  const { t } = useTranslation()
  const {
    creditAmount,
    creditRate,
    creditPeriod,
    creditPeriodType,
    creditPeriodPayment,
    totalTaxAmount,
    totalPaymentAmount,
  } = dataStore()

  return (
    <article className="info__info">
      <InfoText
        className={"info"}
        title={t("form-amount")}
        text={creditAmount}
        span={t("form-span-currency")}
      />
      <InfoText
        className={"info"}
        title={t("form-interest")}
        text={creditRate}
        span={t("form-span-percent")}
      />
      <InfoText
        className={"info"}
        title={t("installment-period")}
        text={creditPeriod}
        span={creditPeriodType}
      />
      <InfoText
        className={"info"}
        title={t("total-interest")}
        text={totalTaxAmount.toFixed(2)}
        span={t("form-span-currency")}
      />
      <InfoText
        className={"info"}
        title={t("form-installment")}
        text={creditPeriodPayment.toFixed(2)}
        span={t("form-span-currency")}
      />
      <InfoText
        className={"info"}
        title={t("total-payback")}
        text={totalPaymentAmount.toFixed(2)}
        span={t("form-span-currency")}
      />
    </article>
  )
}

export default Info
