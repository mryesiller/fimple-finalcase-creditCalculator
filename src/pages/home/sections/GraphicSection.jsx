import React from "react"
import { useTranslation } from "react-i18next"
import CanvasJSReact from "../../../assets/scss/vendor/canvasjs.react"
import { eventStore } from "../../../context/eventContext"
import { dataStore } from "../../../context/dataContext"

var CanvasJSChart = CanvasJSReact.CanvasJSChart

const Graphic = () => {
  const { t } = useTranslation()
  const { darkMode } = eventStore()
  const { creditAmount, totalRateAmount, totalBsmvAndKkdfAmount } = dataStore()

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
          {
            y: creditAmount,
            label: t("graphic-amount"),
            color: "rgb(255,96,0)",
          },
          {
            y: totalRateAmount,
            label: t("graphic-interest"),
            color: "rgb(210,0,161)",
          },
          {
            y: totalBsmvAndKkdfAmount,
            label: t("graphic-tax"),
            color: "rgb(168, 255, 0)",
          },
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
