import React from "react"
import { dataStore } from "../../../context/dataContext"
import { eventStore } from "../../../context/eventContext"
import { useTranslation } from "react-i18next"

import InfoCredit from "./InfoCredit"

const Table = () => {
  const { tableData } = dataStore()
  const { toggleTableOverflow, tableOverflowMode, selectedTab } = eventStore()
  const { t } = useTranslation()

  return (
    <section id="table" className="table container">
      <div className="table__info--buttons grid">
        <button
          className={selectedTab === "general" ? "active" : ""}
          onClick={() => eventStore.setState({ selectedTab: "general" })}
        >
          {t("info-button-general")}
        </button>
        <button
          id="payment-plan-tab"
          className={selectedTab === "payment-table" ? "active" : ""}
          onClick={() => eventStore.setState({ selectedTab: "payment-table" })}
        >
          {t("info-button-payment")}
        </button>
      </div>

      {selectedTab === "payment-table" ? (
        <div className={tableData.length === 0 ? "none" : "table__container"}>
          <table>
            <thead className="table__thead">
              <tr>
                <th>{t("table-period")}</th>
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
                  <td>{item.period}</td>
                  <td>
                    {item.creditPeriodPayment} {t("form-span-currency")}
                  </td>
                  <td>
                    {item.principalAmount} {t("form-span-currency")}
                  </td>
                  <td>
                    {item.creditRateAmount} {t("form-span-currency")}
                  </td>
                  <td>
                    {item.creditBsmvAmount} {t("form-span-currency")}
                  </td>
                  <td>
                    {item.creditKkdfAmount} {t("form-span-currency")}
                  </td>
                  <td>
                    {item.remaningPrincipalAmount < 1
                      ? 0
                      : item.remaningPrincipalAmount}{" "}
                    {t("form-span-currency")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <InfoCredit />
      )}

      <button
        className={
          tableData.length <= 12 || selectedTab === "general"
            ? "none"
            : "table__button"
        }
        onClick={toggleTableOverflow}
      >
        {tableOverflowMode ? t("table-hide-details") : t("table-show-details")}
      </button>
    </section>
  )
}

export default Table
