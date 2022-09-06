import create from "zustand"

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
  calculteCompoundInterest: (
    creditAmount,
    creditRate,
    creditPeriod,
    creditPeriodType,
    creditBsmv,
    creditKkdf
  ) => {
    const totalTaxRate =
      (creditRate / 100) * (1 + (creditBsmv / 100 + creditKkdf / 100))
    const creditPayment =
      creditAmount *
      ((totalTaxRate * (1 + totalTaxRate) ** creditPeriod) /
        ((1 + totalTaxRate) ** creditPeriod - 1))

    set({ creditPeriodPayment: creditPayment })
    set({ totalPaymentAmount: creditPayment * creditPeriod })
    set({ totalTaxAmount: get().totalPaymentAmount - creditAmount })
  },
})

export const dataStore = create((set, get) => ({
  ...initialBaseInputData,
  ...calculatedData,
  ...creditMethods(set, get),
}))
