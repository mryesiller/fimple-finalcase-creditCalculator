import React from "react"

const InfoText = ({ className, title, text, span }) => {
  return (
    <div className={`${className}__text`}>
      <h2>{title}</h2>
      <h3>
        {text}
        <span>{span}</span>
      </h3>
    </div>
  )
}

export default InfoText