export function minPayment(principal, rate) {
  // currency calculations in integer cents
  const principalCents = Math.round(principal*100)
  const rateCents = Math.round(rate*100)

  const intCents = Math.round(((principalCents * rateCents) / (12*100*100)));

  let paymentCents = intCents + 1

  if (paymentCents < 100) {
    paymentCents = 100
  }

  return paymentCents / 100
}

export function calculateSchedule(principal, APR, monthly, currentDate) {
  // currency calculations in integer cents
  const principalCents = Math.round(principal*100)
  const rateCents = Math.round(APR*100)
  const paymentCents = Math.round(monthly*100)

  // check the min payment requirement
  if (paymentCents <= Math.round((principalCents * rateCents) / (12*100*100))) {
    return {
      error: "The payment is less than or equal to the monthly interest accrued on the starting principal. The loan would never be paid off at that rate."
    }
  }

  // initialize variables
  let numMonths = 1200
  let totalTerm = 0
  let balance = principalCents

  let cumulativeInterest = 0
  let cumulativePrincipal = 0

  let exceededMonths = false

  let payoffDate = null

  // store any error that might come up, will return at the end
  let error = ""

  // store all the fields of the schedule
  let schedule = []

  // count number of months
  let i = 0
  while(numMonths > 0) {
    const interestPaid = Math.round((balance * rateCents) / (12*100*100))
    cumulativeInterest += interestPaid
    const payment = Math.min(paymentCents, balance + interestPaid)
    const principalPaid = payment - interestPaid
    cumulativePrincipal += principalPaid
    balance = balance - principalPaid
    schedule.push({month: i+1, payment, principalPaid, interestPaid, cumulativePrincipal, cumulativeInterest, balance})

    i += 1
    numMonths -= 1

    // paid entire balance
    if (balance === 0) {
      break
    }
  }
  // total months
  totalTerm = i

  if (balance === 0) {
    // source for the date logic: https://www.w3schools.com/js/js_dates.asp
    payoffDate = new Date(currentDate)
    payoffDate.setDate(1) // first of the month
    payoffDate.setMonth(payoffDate.getMonth() + totalTerm) // add the total months to pay
  }

  // after 1200 months, balance is not paid in full
  if (balance > 0) {
    exceededMonths = true
    error = "The number of months to pay the loan exceeded 1200 months (100 years)."
  }

  return {schedule, totalTerm, cumulativeInterest, exceededMonths, payoffDate, error}

}

