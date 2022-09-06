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

const initialBaseInputData = {
  creditAmount: 10000,
  creditPeriod: 12,
  creditPeriodType: "ay",
  creditRate: 1.68,
  creditBsmv: 10,
  creditKkdf: 15,
}

const calculatedData = {
  creditRateAmount: 2016,
  creditBsmvAmount: null,
  creditKkdfAmount: null,
  creditPeriodPayment: 1043.33,
  creditTaxAmount: 504,
  totalTaxAmount: 2520,
  totalPaymentAmount: 12520,
}

const creditMethods = (set, get) => ({
  setCalculatedData: (
    creditAmount,
    creditRate,
    creditPeriod,
    creditPeriodType,
    creditBsmv,
    creditKkdf
  ) => {
    set({
      creditRateAmount: (creditRate * creditAmount * creditPeriod) / 100,
    })
    console.log(get().creditRateAmount)
    set({ creditBsmvAmount: (creditBsmv * get().creditRateAmount) / 100 })
    set({ creditKkdfAmount: (creditKkdf * get().creditRateAmount) / 100 })
    set({
      creditTaxAmount: get().creditBsmvAmount + get().creditKkdfAmount,
    })
    set({
      totalTaxAmount: get().creditRateAmount + get().creditTaxAmount,
    })
    console.log(get().totalTaxAmount)
    set({ totalPaymentAmount: get().totalTaxAmount + Number(creditAmount) })
    console.log(get().totalPaymentAmount)
    set({ creditPeriodPayment: get().totalPaymentAmount / creditPeriod })
  },
  calculteCompoundInterest: () => {},
})

export const dataStore = create((set, get) => ({
  ...initialState,
  ...initialBaseInputData,
  ...calculatedData,
  ...creditMethods(set, get),
}))
