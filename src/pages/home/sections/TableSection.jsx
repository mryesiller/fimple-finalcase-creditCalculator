import React from "react"
import { dataStore } from "../../../context/dataContext"
import { eventStore } from "../../../context/eventContext"
import { useTranslation } from "react-i18next"

const Table = () => {
  const { tableData } = dataStore()
  const { toggleTableOverflow, tableOverflowMode, tableShowHideMode } =
    eventStore()
  const { t } = useTranslation()

  return (
    <section className="table container" id="table">
      <div className="table__info--buttons grid">
        <button
          className={tableShowHideMode ? "" : "active"}
          onClick={() =>
            eventStore.setState({ tableShowHideMode: !tableShowHideMode })
          }
        >
          GENEL BİLGİLER
        </button>
        <button
          className={tableShowHideMode ? "active" : ""}
          onClick={() =>
            eventStore.setState({ tableShowHideMode: !tableShowHideMode })
          }
        >
          ÖDEME PLANI
        </button>
      </div>

      {tableShowHideMode ? (
        <div className={tableData.length === 0 ? "none" : "table__container"}>
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
        <div className="table__info">
          <h1>GENEL BİLGİLER</h1>
        </div>
      )}

      <button
        className={
          tableData.length <= 12 || !tableShowHideMode
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
