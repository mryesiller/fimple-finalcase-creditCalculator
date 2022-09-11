import React, { forwardRef } from "react"

import { sanitizeCurrencyValue, formatCurrency } from "../../helpers/currency"

const CurrencyInput = (
  { name, info, type, label, onChange, error, step, defaultValue, ...props },
  ref
) => {
  const handleInputChange = (e) => {
    const value = sanitizeCurrencyValue(e.target.value)
    const formattedValue = formatCurrency(value)
    e.target.value = formattedValue
  }

  return (
    <div className={`input__container`}>
      <input
        {...props}
        ref={ref}
        id={name}
        name={name}
        type={type}
        defaultValue={formatCurrency(defaultValue + "")}
        onChange={handleInputChange}
      />
      <label className={`input__label`} htmlFor={name}>
        {label}
      </label>
      <span className={`input__info`}>{info}</span>
      {error && <p className={`input__error`}>{error}</p>}
    </div>
  )
}

export default forwardRef(CurrencyInput)
