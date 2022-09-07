
var tableData = []

export function creditPaybackRecursion (creditAmount,creditRate,creditPeriod,creditBsmv,creditKkdf) {
  const totalTaxRate =
    (creditRate / 100) * (1 + (creditBsmv / 100 + creditKkdf / 100))
  const creditPayment =
    creditAmount *
    ((totalTaxRate * (1 + totalTaxRate) ** creditPeriod) /
      ((1 + totalTaxRate) ** creditPeriod - 1))

    var creditRateAmount = (creditRate/100) * creditAmount
    var creditBsmvAmount = (creditBsmv/100) * creditRateAmount
    var creditKkdfAmount = (creditKkdf/100) * creditRateAmount
    var principalAmount = creditAmount - (creditRateAmount+creditBsmvAmount+creditKkdfAmount)
    var creditPeriodPayment = creditPayment    
    var remaningPrincipalAmount = creditAmount - creditPeriodPayment

    if(remaningPrincipalAmount > 0){
        tableData.push({creditPeriodPayment,principalAmount,creditRateAmount,creditBsmvAmount,creditKkdfAmount,creditAmount})
        return creditPaybackRecursion(remaningPrincipalAmount,creditRate,creditPeriod,creditBsmv,creditKkdf)
    }  else {
        console.log(tableData)
    }
}


var tableData = []

function formula (creditAmount,creditRate,creditPeriod,creditBsmv,creditKkdf) {
    const totalTaxRate = (creditRate / 100) * (1 + (creditBsmv / 100 + creditKkdf / 100))
    const creditPeriodPayment = creditAmount *
    ((totalTaxRate * (1 + totalTaxRate) ** creditPeriod) /
      ((1 + totalTaxRate) ** creditPeriod - 1))

      return creditPeriodPayment.toFixed(2)
}


//console.log(formula(10000,1.68,12,10,15))


function creditPayment (creditAmount,creditPeriod){
    var totalTaxRate = totalTaxRate()
    return creditAmount *
    ((totalTaxRate * (1 + totalTaxRate) ** creditPeriod) /
      ((1 + totalTaxRate) ** creditPeriod - 1))
}





function creditPaybackRecursionNew (creditAmount,creditRate,creditPeriod,creditBsmv,creditKkdf) {
     
      var creditPeriodPayment = 974.13
      

    var creditRateAmount = (creditRate/100) * creditAmount
    var creditBsmvAmount = (creditBsmv/100) * creditRateAmount
    var creditKkdfAmount = (creditKkdf/100) * creditRateAmount
    var principalAmount = creditPeriodPayment - (creditRateAmount+creditBsmvAmount+creditKkdfAmount)
       
    var remaningPrincipalAmount = creditAmount - principalAmount

    if(remaningPrincipalAmount > 0 && tableData.length < creditPeriod){
        
        tableData.push({creditPeriodPayment,principalAmount,creditRateAmount,creditBsmvAmount,creditKkdfAmount,remaningPrincipalAmount})
        creditPaybackRecursion(remaningPrincipalAmount,creditRate,creditPeriod,creditKkdf,creditBsmv)
    }  else {
        console.log(tableData)
        return
    }
}

creditPaybackRecursion(10000,1.99,12,10,15)