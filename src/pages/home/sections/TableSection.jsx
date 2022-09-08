import React from "react"
import {dataStore} from "../../../context/dataContext"
import { useTranslation } from "react-i18next"

const Table = () => {

  const {tableData} = dataStore()
  const { t } = useTranslation()

  return (
    <section className="table container">
      
      <div className="table__container">
        <table>
          <thead className="table__thead">
            <tr>
              <th>{t("table-periodPayment")}</th>
              <th>{t("table-principalAmount")}</th>
              <th>{t("table-creditRateAmount")}</th>
              <th>{t("table-bsmvAmount")}</th>
              <th>{t("table-kkdfAmount")}</th>
              <th>{t("table-remainingPrincipalAmount")}</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => (
              <tr key={index}>
                <td>{item.creditPeriodPayment} {t("form-span-currency")}</td>
                <td>{item.principalAmount} {t("form-span-currency")}</td>
                <td>{item.creditRateAmount} {t("form-span-currency")}</td>
                <td>{item.creditBsmvAmount} {t("form-span-currency")}</td>
                <td>{item.creditKkdfAmount} {t("form-span-currency")}</td>
                <td>{item.remaningPrincipalAmount < 1 ? 0 : item.remaningPrincipalAmount} {t("form-span-currency")}</td>
              </tr>
            ))}
            
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Table
