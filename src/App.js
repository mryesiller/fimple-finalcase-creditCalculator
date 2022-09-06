import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home, Error, Shared } from "./pages"

function App() {
  // TODO: Rename Shared -> ??
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Shared />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
