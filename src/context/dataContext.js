import create from "zustand";

export const initialCreditData = {
  creditAmount: 10000,
  creditPeriod: 12,
  creditPeriodType: "month",
  creditRate: 1.68,
  creditBsmv: 10,
  creditKkdf: 15,
};

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
  tableData: [],
};

const creditMethods = (set, get) => ({
  calculateCreditPayback: (
    creditAmount,
    creditRate,
    creditPeriod,
    creditBsmv,
    creditKkdf
  ) => {
    const totalTaxRate =
      (creditRate / 100) * (1 + (creditBsmv / 100 + creditKkdf / 100));
    const creditPeriodPayment =
      (creditAmount *
      ((totalTaxRate * (1 + totalTaxRate) ** creditPeriod) /
        ((1 + totalTaxRate) ** creditPeriod - 1))).toFixed(2);
    const totalPaymentAmount = creditPeriodPayment * creditPeriod;
    const totalTaxAmount = totalPaymentAmount - creditAmount;

    set({
      tableData: null,
      creditAmount,
      creditRate,
      creditPeriod,
      creditPeriodPayment,
      totalTaxAmount,
      totalPaymentAmount,
    });

    return get().recursion(
      creditAmount,
      creditRate,
      creditPeriod,
      creditBsmv,
      creditKkdf,
      creditPeriodPayment
    );
  },
  recursion: (
    creditAmount,
    creditRate,
    creditPeriod,
    creditBsmv,
    creditKkdf,
    creditPeriodPayment,
    tableData = []
  ) => {
    var creditRateAmount = (creditRate / 100) * creditAmount;
    var creditBsmvAmount = (creditBsmv / 100) * creditRateAmount;
    var creditKkdfAmount = (creditKkdf / 100) * creditRateAmount;
    var principalAmount =
      creditPeriodPayment -
      (creditRateAmount + creditBsmvAmount + creditKkdfAmount);
    var remaningPrincipalAmount = creditAmount - principalAmount;

    principalAmount = principalAmount.toFixed(2);
    creditRateAmount = creditRateAmount.toFixed(2);
    creditBsmvAmount = creditBsmvAmount.toFixed(2);
    creditKkdfAmount = creditKkdfAmount.toFixed(2);
    remaningPrincipalAmount = remaningPrincipalAmount.toFixed(2);
    tableData.push({
      creditPeriodPayment,
      principalAmount,
      creditRateAmount,
      creditPeriod,
      creditKkdfAmount,
      creditBsmvAmount,
      remaningPrincipalAmount,
    });

    if (remaningPrincipalAmount > 0 && tableData.length < creditPeriod) {
      get().recursion(
        remaningPrincipalAmount,
        creditRate,
        creditPeriod,
        creditKkdf,
        creditBsmv,
        creditPeriodPayment,
        tableData
      );
    } else {
      set({ tableData });
      return;
    }
  },
});

export const dataStore = create((set, get) => ({
  ...initialCreditData,
  ...calculatedData,
  ...creditMethods(set, get),
}));
