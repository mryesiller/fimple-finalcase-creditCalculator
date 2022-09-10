import React, { forwardRef, useImperativeHandle, useState } from "react"

const InfoText = ({ title, text, span, onClick, ...props }, ref) => {
  const [value, setValue] = useState(true)
  const [background, setBackground] = useState("info__text")

  useImperativeHandle(ref, () => {
    return {
      changeBackground: () => {
        setValue(!value)
        value ? setBackground("info__text change") : setBackground("info__text")
      },
    }
  })

  return (
    <div {...props} ref={ref} className={background} onClick={onClick}>
      <h2>{title}</h2>
      <h3>
        {text}
        <span> {span}</span>
      </h3>
    </div>
  )
}

export default forwardRef(InfoText)
