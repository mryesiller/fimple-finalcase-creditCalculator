import React, { Fragment } from "react"
import { Loading } from "../../components"
import { eventStore } from "../../context/eventContext"

import FormSection from "./sections/FormSection"
import InfoSection from "./sections/InfoSection"
import GraphicSection from "./sections/GraphicSection"
import TableSection from "./sections/TableSection"

const Home = () => {
  const { isLoading } = eventStore()

  return (
    <Fragment>
      <FormSection />
      <section className="info container grid">
        <GraphicSection />
        <InfoSection />
      </section>
      {isLoading ? <Loading /> : <TableSection />}
    </Fragment>
  )
}

export default Home
