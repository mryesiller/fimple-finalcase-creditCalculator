// format creditAmount on input field
export const formatCurrency = (amount) =>
  amount.replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1.")
export const sanitizeCurrencyValue = (value) => value.replaceAll(".", "")
