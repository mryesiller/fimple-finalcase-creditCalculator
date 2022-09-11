import React from "react"
import ClipLoader from "react-spinners/ClipLoader"
import { eventStore } from "../../context/eventContext"

const Loading = () => {
  const { isLoading } = eventStore()

  const override = {
    display: "block",
    margin: "10rem auto",
    borderColor: "red",
  }

  return (
    <ClipLoader
      color="#000000"
      loading={isLoading}
      cssOverride={override}
      size={200}
    />
  )
}

export default Loading
