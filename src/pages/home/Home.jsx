import React, { Fragment } from "react"
import { Loading, Error, Table } from "../../components"

import FormSection from "./sections/FormSection"
import InfoSection from "./sections/InfoSection"
import GraphicSection from "./sections/GraphicSection"
import TableSection from "./sections/TableSection"

const Home = () => {
  return (
    <Fragment>
      <FormSection />
      <section className="info container grid">
        <GraphicSection />
        <InfoSection />
      </section>
      <TableSection />
    </Fragment>
  )
}

export default Home
