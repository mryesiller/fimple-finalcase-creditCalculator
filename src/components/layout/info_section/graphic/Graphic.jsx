import React from "react"
import CanvasJSReact from "../../../../assets/scss/vendor/canvasjs.react"
import { eventStore } from "../../../../context/eventContext"

var CanvasJSChart = CanvasJSReact.CanvasJSChart

const Graphic = () => {
  const { darkMode } = eventStore()

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
        indexLabel: "{label}: {y}%",
        startAngle: -90,
        indexLabelFontColor: `${darkMode ? "#fff" : "#333"}`,
        dataPoints: [
          { y: 80, label: "Credit Amount" },
          { y: 15, label: "Interest" },
          { y: 5, label: "Tax" },
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
