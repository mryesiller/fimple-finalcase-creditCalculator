import React, { forwardRef } from "react"

const Input = (
  { name, info, type, label, onChange, error, step, defaultValue, ...props },
  ref
) => {
  return (
    <div className={`input__container`}>
      <input
        {...props}
        ref={ref}
        id={name}
        name={name}
        type={type}
        step={step}
        defaultValue={defaultValue}
        onChange={onChange}
      />
      <label className={`input__label`} htmlFor={name}>
        {label}
      </label>
      <span className={`input__info`}>{info}</span>
      {error && <p className={`input__error`}>{error}</p>}
    </div>
  )
}

export default forwardRef(Input)
