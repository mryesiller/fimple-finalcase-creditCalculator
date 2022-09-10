import create from "zustand"

const initialData = {
  isCalculated: false,
}

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
  calculateBasicCreditPayback: (args) => {
    const {
      creditAmount,
      creditRate,
      creditPeriod,
      creditBsmv,
      creditKkdf,
      tableData = [],
    } = Object.keys(args).reduce((prev, key) => {
      const value = args[key]
      return {
        ...prev,
        // If arg (tableData) is an array or object, return it as is
        // otherwise, return cast it to a number
        [key]: typeof value !== "object" ? Number(value) : value,
      }
    }, {})

    const totalRateAmount = creditAmount * (creditRate / 100) * creditPeriod
    const totalBsmvAndKkdfAmount =
      totalRateAmount * ((creditBsmv + creditKkdf) / 100)

    const totalCreditBsmvAmount = totalRateAmount * (creditBsmv / 100)
    const totalCreditKkdfAmount = totalRateAmount * (creditKkdf / 100)
    const totalTaxAmount = totalRateAmount + totalBsmvAndKkdfAmount
    const totalTaxPeriodAmount = totalTaxAmount / creditPeriod
    const totalPaymentAmount = creditAmount + totalTaxAmount
    const creditRateAmount = totalRateAmount / creditPeriod
    const creditBsmvAmount = totalCreditBsmvAmount / creditPeriod
    const creditKkdfAmount = totalCreditKkdfAmount / creditPeriod
    const creditPeriodPayment = totalPaymentAmount / creditPeriod
    const principalAmount = creditPeriodPayment - totalTaxPeriodAmount
    var remaningPrincipalAmount = totalPaymentAmount - creditPeriodPayment

    set({
      creditAmount: creditAmount.toFixed(2),
      creditRate: creditRate.toFixed(2),
      totalRateAmount: totalRateAmount.toFixed(2),
      totalBsmvAndKkdfAmount: totalBsmvAndKkdfAmount.toFixed(2),
      totalTaxAmount: totalTaxAmount.toFixed(2),
      totalPaymentAmount: totalPaymentAmount.toFixed(2),
      creditPeriodPayment: creditPeriodPayment.toFixed(2),
    })

    for (let i = 0; i < creditPeriod; i++) {
      tableData.push({
        period: i + 1,
        creditPeriodPayment: creditPeriodPayment.toFixed(2),
        principalAmount: principalAmount.toFixed(2),
        creditRateAmount: creditRateAmount.toFixed(2),
        creditBsmvAmount: creditBsmvAmount.toFixed(2),
        creditKkdfAmount: creditKkdfAmount.toFixed(2),
        remaningPrincipalAmount: remaningPrincipalAmount.toFixed(2),
      })
      remaningPrincipalAmount = remaningPrincipalAmount - creditPeriodPayment
    }

    set({ tableData })
  },
  calculateCompoundCreditPayback: (args) => {
    const { creditAmount, creditRate, creditPeriod, creditBsmv, creditKkdf } =
      Object.keys(args).reduce((prev, key) => {
        const value = args[key]
        return {
          ...prev,
          [key]: typeof value !== "object" ? Number(value) : value,
        }
      }, {})

    const totalTaxRate =
      (creditRate / 100) * (1 + (creditBsmv / 100 + creditKkdf / 100))
    const creditPeriodPayment =
      creditAmount *
      ((totalTaxRate * (1 + totalTaxRate) ** creditPeriod) /
        ((1 + totalTaxRate) ** creditPeriod - 1))

    const totalPaymentAmount = creditPeriodPayment * creditPeriod
    const totalTaxAmount = totalPaymentAmount - creditAmount

    var totalRateAmount = 0
    var totalBsmvAndKkdfAmount = 0
    var period = 0

    set({
      tableData: null,
      creditAmount: creditAmount.toFixed(2),
      creditRate: creditRate.toFixed(2),
      creditPeriod,
      creditPeriodPayment: creditPeriodPayment.toFixed(2),
      totalTaxAmount: totalTaxAmount.toFixed(2),
      totalPaymentAmount: totalPaymentAmount.toFixed(2),
      totalRateAmount: totalRateAmount.toFixed(2),
      totalBsmvAndKkdfAmount: totalBsmvAndKkdfAmount.toFixed(2),
    })

    return get().compundComplexInterestFormula(
      creditAmount,
      creditRate,
      creditPeriod,
      creditBsmv,
      creditKkdf,
      creditPeriodPayment,
      totalRateAmount,
      totalBsmvAndKkdfAmount,
      period
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
    period,
    tableData = []
  ) => {
    var creditRateAmount = (creditRate / 100) * creditAmount
    var creditBsmvAmount = (creditBsmv / 100) * creditRateAmount
    var creditKkdfAmount = (creditKkdf / 100) * creditRateAmount
    var principalAmount =
      creditPeriodPayment -
      (creditRateAmount + creditBsmvAmount + creditKkdfAmount)
    var remaningPrincipalAmount = creditAmount - principalAmount
    totalRateAmount += parseFloat(creditRateAmount)
    totalBsmvAndKkdfAmount +=
      parseFloat(creditBsmvAmount) + parseFloat(creditKkdfAmount)

    period += 1
    tableData.push({
      period,
      creditPeriodPayment: creditPeriodPayment.toFixed(2),
      principalAmount: principalAmount.toFixed(2),
      creditRateAmount: creditRateAmount.toFixed(2),
      creditPeriod,
      creditKkdfAmount: creditKkdfAmount.toFixed(2),
      creditBsmvAmount: creditBsmvAmount.toFixed(2),
      remaningPrincipalAmount: remaningPrincipalAmount.toFixed(2),
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
        period,
        tableData
      )
    } else {
      set({ tableData })
      set({
        totalRateAmount: totalRateAmount.toFixed(2),
        totalBsmvAndKkdfAmount: totalBsmvAndKkdfAmount.toFixed(2),
      })
      return
    }
  },
})

export const dataStore = create((set, get) => ({
  ...initialData,
  ...initialCreditData,
  ...calculatedData,
  ...creditMethods(set, get),
}))
