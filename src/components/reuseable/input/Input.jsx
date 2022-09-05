import React from "react"

const Input = ({
  classname,
  name,
  span_value,
  maxlength,
  input_value,
  type,
  placeholder,
  label_text,
}) => {
  return (
    <div className={`${classname}__group`}>
      <input
        className={`${classname}__input`}
        id={name}
        placeholder={placeholder}
        value={input_value}
        type={type}
        maxlength={maxlength}
      ></input>
      <label className={`${classname}__label`} htmlFor={name}>
        {label_text}
      </label>
      <span className={`${classname}__span`}>{span_value}</span>
    </div>
  )
}

export default Input
