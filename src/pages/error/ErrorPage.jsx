import React from "react"
import errorİmage from '../../assets/images/error404.png'

const ErrorPage = () => {
  return <div className="error container-fluid">
    <img className="error__img" src={errorİmage} alt="errorPage"></img>
  </div>
}

export default React.memo(ErrorPage)
