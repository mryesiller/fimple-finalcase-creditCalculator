import React from "react"
import Graphic from "./graphic/Graphic"
import Info from "./info/Info"

const InfoSection = () => {
  return (
    <section className="info container grid">
      <Graphic />
      <Info />
    </section>
  )
}

export default InfoSection
