import create from "zustand"

export const initialCreditData = {
  creditAmount: 10000,
  creditPeriod: 12,
  creditPeriodType: "month",
  creditRate: 1.68,
  creditBsmv: 10,
  creditKkdf: 15,
}

const calculatedData = {
  creditPeriodPayment: 951.41,
  totalRateAmount: 1133.57,
  totalBsmvAndKkdfAmount: 283.39,
  totalTaxAmount: 1416.92,
  totalPaymentAmount: 11416.92,
  remaningPrincipalAmount: 0,
  principalAmount: 0,
  tableData: [],
}

const creditMethods = (set, get) => ({
  calculateBasicCreditPayback: (
    creditAmount,
    creditRate,
    creditPeriod,
    creditBsmv,
    creditKkdf,
    tableData = []
  ) => {
    const totalRateAmount = creditAmount * (creditRate / 100) * creditPeriod
    const totalCreditBsmvAmount = (
      totalRateAmount *
      (Number(creditBsmv) / 100)
    ).toFixed(2)
    const totalCreditKkdfAmount = (
      totalRateAmount *
      (Number(creditKkdf) / 100)
    ).toFixed(2)

    const creditRateAmount = (totalRateAmount / creditPeriod).toFixed(2)
    const creditBsmvAmount = (totalCreditBsmvAmount / creditPeriod).toFixed(2)
    const creditKkdfAmount = (totalCreditKkdfAmount / creditPeriod).toFixed(2)

    const totalBsmvAndKkdfAmount =
      totalRateAmount * ((Number(creditBsmv) + Number(creditKkdf)) / 100)

    const totalTaxAmount = (totalRateAmount + totalBsmvAndKkdfAmount).toFixed(2)
    const totalTaxPeriodAmount = totalTaxAmount / creditPeriod

    const totalPaymentAmount = Number(creditAmount) + Number(totalTaxAmount)

    const creditPeriodPayment = (totalPaymentAmount / creditPeriod).toFixed(2)
    const principalAmount = (
      creditPeriodPayment - totalTaxPeriodAmount
    ).toFixed(2)

    set({
      creditRate,
      totalRateAmount,
      totalBsmvAndKkdfAmount,
      totalTaxAmount,
      totalPaymentAmount,
      creditPeriodPayment,
    })

    var remaningPrincipalAmount = (
      totalPaymentAmount - creditPeriodPayment
    ).toFixed(2)

    for (let i = 0; i < creditPeriod; i++) {
      tableData.push({
        creditPeriodPayment,
        principalAmount,
        creditRateAmount,
        creditBsmvAmount,
        creditKkdfAmount,
        remaningPrincipalAmount,
      })
      remaningPrincipalAmount = (
        remaningPrincipalAmount - creditPeriodPayment
      ).toFixed(2)
    }

    set({ tableData })
  },
  calculateCompoundCreditPayback: (
    creditAmount,
    creditRate,
    creditPeriod,
    creditBsmv,
    creditKkdf
  ) => {
    const totalTaxRate =
      (creditRate / 100) * (1 + (creditBsmv / 100 + creditKkdf / 100))
    const creditPeriodPayment = (
      creditAmount *
      ((totalTaxRate * (1 + totalTaxRate) ** creditPeriod) /
        ((1 + totalTaxRate) ** creditPeriod - 1))
    ).toFixed(2)

    const totalPaymentAmount = (creditPeriodPayment * creditPeriod).toFixed(2)
    const totalTaxAmount = (totalPaymentAmount - creditAmount).toFixed(2)

    var totalRateAmount = 0
    var totalBsmvAndKkdfAmount = 0

    set({
      tableData: null,
      creditAmount,
      creditRate,
      creditPeriod,
      creditPeriodPayment,
      totalTaxAmount,
      totalPaymentAmount,
      totalRateAmount,
      totalBsmvAndKkdfAmount,
    })

    return get().compundComplexInterestFormula(
      creditAmount,
      creditRate,
      creditPeriod,
      creditBsmv,
      creditKkdf,
      creditPeriodPayment,
      totalRateAmount,
      totalBsmvAndKkdfAmount
    )
  },
  compundComplexInterestFormula: (
    creditAmount,
    creditRate,
    creditPeriod,
    creditBsmv,
    creditKkdf,
    creditPeriodPayment,
    totalRateAmount,
    totalBsmvAndKkdfAmount,
    tableData = []
  ) => {
    var creditRateAmount = (creditRate / 100) * creditAmount
    var creditBsmvAmount = (creditBsmv / 100) * creditRateAmount
    var creditKkdfAmount = (creditKkdf / 100) * creditRateAmount
    var principalAmount =
      creditPeriodPayment -
      (creditRateAmount + creditBsmvAmount + creditKkdfAmount)
    var remaningPrincipalAmount = creditAmount - principalAmount

    principalAmount = principalAmount.toFixed(2)
    creditRateAmount = creditRateAmount.toFixed(2)
    creditBsmvAmount = creditBsmvAmount.toFixed(2)
    creditKkdfAmount = creditKkdfAmount.toFixed(2)
    remaningPrincipalAmount = remaningPrincipalAmount.toFixed(2)

    totalRateAmount += parseFloat(creditRateAmount)
    totalBsmvAndKkdfAmount +=
      parseFloat(creditBsmvAmount) + parseFloat(creditKkdfAmount)

    tableData.push({
      creditPeriodPayment,
      principalAmount,
      creditRateAmount,
      creditPeriod,
      creditKkdfAmount,
      creditBsmvAmount,
      remaningPrincipalAmount,
    })

    if (remaningPrincipalAmount > 0 && tableData.length < creditPeriod) {
      get().compundComplexInterestFormula(
        remaningPrincipalAmount,
        creditRate,
        creditPeriod,
        creditKkdf,
        creditBsmv,
        creditPeriodPayment,
        totalRateAmount,
        totalBsmvAndKkdfAmount,
        tableData
      )
    } else {
      set({ tableData })
      set({ totalRateAmount, totalBsmvAndKkdfAmount })
      return
    }
  },
})

export const dataStore = create((set, get) => ({
  ...initialCreditData,
  ...calculatedData,
  ...creditMethods(set, get),
}))
