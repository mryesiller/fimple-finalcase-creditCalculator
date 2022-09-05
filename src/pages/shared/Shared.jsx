import React, { Fragment } from "react"
import { Outlet } from "react-router-dom"
import { Navbar, Footer } from "../../components"

const Layout = () => {
  return (
    <Fragment>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </Fragment>
  )
}

export default Layout
