import React from "react"

const Input = (
  {
    classname,
    name,
    span_value,
    input_value,
    type,
    label_text,
    onChange,
    error,
    step,
  },
  ref
) => {
  return (
    <div className={`${classname}__group`}>
      <input
        ref={ref}
        className={`${classname}__input`}
        id={name}
        name={name}
        type={type}
        step={step}
        defaultValue={input_value}
        onChange={onChange}
      ></input>
      <label className={`${classname}__label`} htmlFor={name}>
        {label_text}
      </label>
      <span className={`${classname}__span`}>{span_value}</span>
      {error && <p className={`${classname}__error`}>{error}</p>}
    </div>
  )
}

export default React.forwardRef(Input)
