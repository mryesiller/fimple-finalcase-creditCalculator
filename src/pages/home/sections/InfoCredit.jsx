import React from "react"
import { useTranslation } from "react-i18next"

// General Informations in this component
const InfoCredit = () => {
  const { t } = useTranslation()

  return (
    <article className="info__credit">
      <h2>{t("info-title")}</h2>
      <ul>
        <li>{t("info-1")}</li>
        <li>{t("info-2")}</li>
        <li>{t("info-3")}</li>
        <li>{t("info-4")}</li>
      </ul>
    </article>
  )
}

export default InfoCredit
