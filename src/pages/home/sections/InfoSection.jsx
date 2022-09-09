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
        title={t("form-amount")}
        text={creditAmount}
        span={t("form-span-currency")}
      />
      <InfoText
        title={t("form-interest")}
        text={creditRate}
        span={t("form-span-percent")}
      />
      <InfoText
        title={t("installment-period")}
        text={creditPeriod}
        span={creditPeriodType}
      />
      <InfoText
        title={t("total-interest")}
        text={totalTaxAmount}
        span={t("form-span-currency")}
      />
      <InfoText
        title={t("form-installment")}
        text={creditPeriodPayment}
        span={t("form-span-currency")}
      />

      <InfoText
        title={t("total-payback")}
        text={totalPaymentAmount}
        span={t("form-span-currency")}
      />
    </article>
  )
}

export default Info
