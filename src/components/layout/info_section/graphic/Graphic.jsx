import React from "react"
import { useTranslation } from "react-i18next"
import CanvasJSReact from "../../../../assets/scss/vendor/canvasjs.react"
import { eventStore } from "../../../../context/eventContext"
import { dataStore } from "../../../../context/dataContext"

var CanvasJSChart = CanvasJSReact.CanvasJSChart

const Graphic = () => {
  const { t } = useTranslation()
  const { darkMode } = eventStore()
  const { amountValue, rateValue, taxValue } = dataStore()

  const options = {
    animationEnabled: true,
    exportEnabled: true,
    backgroundColor: `${darkMode ? "#333" : "#fff"}`, // "light1", "dark1", "dark2"
    textColor: `${darkMode ? "#fff" : "#333"}`,
    title: {
      text: "Credit Graphic",
      fontColor: `${darkMode ? "#fff" : "#333"}`,
    },
    data: [
      {
        type: "pie",
        indexLabel: "{label}: {y}",
        startAngle: -90,
        indexLabelFontColor: `${darkMode ? "#fff" : "#333"}`,
        dataPoints: [
          { y: amountValue, label: t("graphic-amount") },
          { y: rateValue, label: t("graphic-interest") },
          { y: taxValue, label: t("graphic-tax") },
        ],
      },
    ],
  }

  return (
    <article className="info__graphic">
      <CanvasJSChart
        options={options}
        /* onRef={ref => this.chart = ref} */
      />
    </article>
  )
}

export default Graphic
