import React from "react"

const Input = (
  {
    classname,
    name,
    span_value,
    type,
    label_text,
    onChange,
    error,
    step,
    containerID,
    defaultValue,
  },
  ref
) => {
  return (
    <div className={`${classname}__group`} id={containerID}>
      <input
        ref={ref}
        className={`${classname}__input`}
        id={name}
        name={name}
        type={type}
        step={step}
        defaultValue={defaultValue}
        onChange={onChange}
      ></input>
      <label className={`${classname}__label ${name}`} htmlFor={name}>
        {label_text}
      </label>
      <span className={`${classname}__span ${name}`}>{span_value}</span>
      {error && <p className={`${classname}__error`}>{error}</p>}
    </div>
  )
}

export default React.forwardRef(Input)
