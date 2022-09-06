import create from "zustand"

const initialState = {
  amountValue: 10000,
  expiryType: "ay",
  expiryValue: 12,
  expiryPayment: 1043.33,
  rate: 1.68,
  rateValue: 2016,
  bsmv: 10,
  bsmvValue: null,
  kkdfValue: null,
  kkdf: 15,
  taxValue: 504,
  totalTax: 2520,
  totalPayment: 12520,
}

const dataMethods = (set, get) => {
  return {
    setRateValue: (rate, amountValue, expiryValue) => {
      const value = (rate * amountValue * expiryValue) / 100
      set({ rateValue: value })
      return value
    },
    setBsmvValue: (bsmv, rateValue) => {
      const value = (bsmv * rateValue) / 100
      set({ bsmvValue: value })
      return value
    },
    setKkdfValue: (kkdf, rateValue) => {
      const value = (kkdf * rateValue) / 100
      set({ kkdfValue: value })
      return value
    },
    setTaxValue: (bsmvValue, kkdfValue) => {
      const value = bsmvValue + kkdfValue
      set({ taxValue: value })
      return value
    },
    setTotalTax: (taxValue, rateValue) => {
      const value = taxValue + rateValue
      set({ totalTax: value })
      return value
    },
    setTotalPayment: (totalTax, amountValue) => {
      const value = totalTax + amountValue
      set({ totalPayment: value })
      return value
    },
    setExpiryPayment: (amountValue, expiryValue) => {
      const value = amountValue / expiryValue
      set({ expiryPayment: value })
      return value
    },
  }
}

export const dataStore = create((set, get) => ({
  ...initialState,
  ...dataMethods(set, get),
}))
