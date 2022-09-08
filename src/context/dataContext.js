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
getTogetherMethod : (creditAmount,creditRate,creditPeriod,creditBsmv,creditKkdf) => {
  var tableData2 = []
  var totalTaxRate =
    (creditRate / 100) * (1 + (creditBsmv / 100 + creditKkdf / 100))
  var creditPeriodPayment =
    creditAmount *
    ((totalTaxRate * (1 + totalTaxRate) ** creditPeriod) /
      ((1 + totalTaxRate) ** creditPeriod - 1))   


      
      creditPeriodPayment = (creditPeriodPayment).toFixed(2)
      var totalPaymentAmount = creditPeriodPayment * creditPeriod
      var totalTaxAmount = totalPaymentAmount - creditAmount

      set({tableData : null})
      set({creditAmount : creditAmount})
      set({creditRate : creditRate})
      set({creditPeriod : creditPeriod})
      set({creditPeriodPayment : creditPeriodPayment})
      set({totalTaxAmount : totalTaxAmount})
      set({totalPaymentAmount : totalPaymentAmount})

      
  
  return  get().recursionNew(creditAmount,creditRate,creditPeriod,creditBsmv,creditKkdf,creditPeriodPayment,tableData2)
  
  
},
recursionNew : (creditAmount,creditRate,creditPeriod,creditBsmv,creditKkdf,creditPeriodPayment,tableData2) => {
  var creditRateAmount  = ((creditRate/100) * creditAmount)
  var creditBsmvAmount = ((creditBsmv/100) * creditRateAmount)
  var creditKkdfAmount = ((creditKkdf/100) * creditRateAmount)
  var principalAmount = (creditPeriodPayment - (creditRateAmount+creditBsmvAmount+creditKkdfAmount))
  var remaningPrincipalAmount = (creditAmount - principalAmount)

  principalAmount = (principalAmount).toFixed(2)
  creditRateAmount = (creditRateAmount).toFixed(2)
  creditBsmvAmount = (creditBsmvAmount).toFixed(2)
  creditKkdfAmount = (creditKkdfAmount).toFixed(2)
  remaningPrincipalAmount = (remaningPrincipalAmount).toFixed(2)
  tableData2.push({
    creditPeriodPayment,principalAmount,creditRateAmount,creditPeriod,creditKkdfAmount,creditBsmvAmount,remaningPrincipalAmount
  })

  if(remaningPrincipalAmount > 0 && tableData2.length < creditPeriod){    
    get().recursionNew(remaningPrincipalAmount,creditRate,creditPeriod,creditKkdf,creditBsmv,creditPeriodPayment,tableData2)
    
  }else {    
    set({tableData : tableData2})    
    return
  }

}


})

export const dataStore = create((set, get) => ({
  ...initialBaseInputData,
  ...calculatedData,
  ...creditMethods(set, get),
}))
