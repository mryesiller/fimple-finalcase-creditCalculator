import create from "zustand"
import { convertToFixed } from "../helpers/number"

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
    let remaningPrincipalAmount = totalPaymentAmount - creditPeriodPayment

    set(
      convertToFixed(
        {
          creditAmount,
          creditRate,
          totalRateAmount,
          totalBsmvAndKkdfAmount,
          totalTaxAmount,
          totalPaymentAmount,
          creditPeriodPayment,
        },
        2
      )
    )

    for (let i = 0; i < creditPeriod; i++) {
      tableData.push({
        period: i + 1,
        ...convertToFixed(
          {
            creditPeriodPayment,
            principalAmount,
            creditRateAmount,
            creditBsmvAmount,
            creditKkdfAmount,
            remaningPrincipalAmount,
          },
          2
        ),
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
      creditPeriod,
      ...convertToFixed(
        {
          creditAmount,
          creditRate,
          creditPeriodPayment,
          totalTaxAmount,
          totalPaymentAmount,
          totalRateAmount,
          totalBsmvAndKkdfAmount,
        },
        2
      ),
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
    const creditRateAmount = (creditRate / 100) * creditAmount
    const creditBsmvAmount = (creditBsmv / 100) * creditRateAmount
    const creditKkdfAmount = (creditKkdf / 100) * creditRateAmount
    const principalAmount =
      creditPeriodPayment -
      (creditRateAmount + creditBsmvAmount + creditKkdfAmount)
    const remaningPrincipalAmount = creditAmount - principalAmount
    totalRateAmount += parseFloat(creditRateAmount)
    totalBsmvAndKkdfAmount +=
      parseFloat(creditBsmvAmount) + parseFloat(creditKkdfAmount)

    period += 1
    tableData.push({
      period,
      creditPeriod,
      ...convertToFixed(
        {
          creditPeriodPayment,
          principalAmount,
          creditRateAmount,
          creditKkdfAmount,
          creditBsmvAmount,
          remaningPrincipalAmount,
        },
        2
      ),
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
