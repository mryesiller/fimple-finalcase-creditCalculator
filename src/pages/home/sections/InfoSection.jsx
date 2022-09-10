import React from "react"
import { useTranslation } from "react-i18next"
import { dataStore } from "../../../context/dataContext"

import { InfoText } from "../../../components"

const Info = () => {
  const textRef1 = React.useRef()
  const textRef2 = React.useRef()
  const textRef3 = React.useRef()
  const textRef4 = React.useRef()
  const textRef5 = React.useRef()
  const textRef6 = React.useRef()

  const handleChangeBackground = (ref) => {
    ref.current.changeBackground()
  }

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
        ref={textRef1}
        onClick={() => {
          handleChangeBackground(textRef1)
        }}
        title={t("form-amount")}
        text={creditAmount}
        span={t("form-span-currency")}
      />
      <InfoText
        ref={textRef2}
        onClick={() => {
          handleChangeBackground(textRef2)
        }}
        title={t("form-interest")}
        text={creditRate}
        span={t("form-span-percent")}
      />
      <InfoText
        ref={textRef3}
        onClick={() => {
          handleChangeBackground(textRef3)
        }}
        title={t("installment-period")}
        text={creditPeriod}
        span={creditPeriodType}
      />
      <InfoText
        ref={textRef4}
        onClick={() => {
          handleChangeBackground(textRef4)
        }}
        title={t("total-interest")}
        text={totalTaxAmount}
        span={t("form-span-currency")}
      />
      <InfoText
        ref={textRef5}
        onClick={() => {
          handleChangeBackground(textRef5)
        }}
        title={t("form-installment")}
        text={creditPeriodPayment}
        span={t("form-span-currency")}
      />

      <InfoText
        ref={textRef6}
        onClick={() => {
          handleChangeBackground(textRef6)
        }}
        title={t("total-payback")}
        text={totalPaymentAmount}
        span={t("form-span-currency")}
      />
    </article>
  )
}

export default Info
