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
  remaningPrincipalAmount: 10000,
  principalAmount: 10000,
  tableData : []
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
  recursion: (creditAmount,creditRate,creditPeriod,creditBsmv,creditKkdf) => {

  const totalTaxRate =
    (creditRate / 100) * (1 + (creditBsmv / 100 + creditKkdf / 100))
  const creditPayment =
    creditAmount *
    ((totalTaxRate * (1 + totalTaxRate) ** creditPeriod) /
      ((1 + totalTaxRate) ** creditPeriod - 1))

  set({ creditRateAmount : (creditRate/100) * creditAmount})
  set({ creditBsmvAmount : (creditBsmv/100) * get().creditRateAmount})
  set({ creditKkdfAmount : (creditKkdf/100) * get().creditRateAmount})
  set({ principalAmount : creditAmount - (get().creditRateAmount+get().creditBsmvAmount+get().creditKkdfAmount)})   
  set({ creditPeriodPayment: creditPayment })
  set({ totalPaymentAmount: creditPayment * creditPeriod })
  set({ totalTaxAmount: get().totalPaymentAmount - creditAmount })
  set({ remaningPrincipalAmount : creditAmount - get().creditPeriodPayment}) 

  const {creditPeriodPayment,remaningPrincipalAmount,creditRateAmount,creditBsmvAmount,creditKkdfAmount} = get()

  set({creditAmount : remaningPrincipalAmount})
  get().tableData.push({
    creditPeriodPayment,remaningPrincipalAmount,creditRateAmount,creditBsmvAmount,creditKkdfAmount,creditAmount
  })

  if(remaningPrincipalAmount > 0){    
    get().recursion(creditAmount,creditRate,creditPeriod,creditBsmv,creditKkdf)
    console.log(get().tableData)
  }
  

},
})

export const dataStore = create((set, get) => ({
  ...initialBaseInputData,
  ...calculatedData,
  ...creditMethods(set, get),
}))
