import { useState } from 'react'
import { minPayment } from '../../shared/engine'

export default function App() {
  const [principal, setPrincipal] = useState('')
  const [interest, setInterest] = useState('')
  const [monthly, setMonthly] = useState('')

  const principalNum = Number(principal)
  const interestNum = Number(interest)
  const monthlyNum = Number(monthly)

  const principalEmpty = principal.trim() === ''
  const interestEmpty = interest.trim() === ''
  const monthlyEmpty = monthly.trim() === ''

  // principal
  let principalError = ''
  if (!principalEmpty) {
    // check if input is number
    if (Number.isNaN(principalNum)) {
      principalError = 'Please enter a number for the starting principal.'
    } 
    else if (principalNum < 1 || principalNum > 100000000) {
      principalError = 'The starting principal must be between $1 to $100,000,000.'
    }
    else if (monthly.trim() === '') {
      principalError = ''
    }
  }

  // interest
  let interestError = ''
  if (!interestEmpty) {
    if (Number.isNaN(interestNum)) {
      interestError = 'Please enter a number for the interest rate.'
    } 
    else if (interestNum < 0 || interestNum > 40) {
      interestError = 'The interest rate must be between 0% to 40%.'
    }
  }

  // monthly payment
  let monthlyError = ''
  if (!monthlyEmpty) {
    if (Number.isNaN(monthlyNum) || monthly.trim() === '') {
      monthlyError = 'Please enter a number for the monthly payment.'
    } 
    // need to check that principal and interest rate are valid data (no error was created)
    else if (principalError === '' && interestError === '') {

      const greaterValue = Math.max(1000000, minPayment(principalNum, interestNum)*3)

      if (monthlyNum < 1 || monthlyNum > greaterValue) {
        monthlyError = `The monthly payment must be between $1 and $${greaterValue.toLocaleString()}.`
      }
      else if (monthlyNum < minPayment(principalNum, interestNum)) {
        monthlyError = `With a monthly payment of $${monthlyNum.toLocaleString()}, the loan would never be paid off at that rate. Minimum: $${minPayment(principalNum, interestNum).toFixed(2)}.`
      }
    
    }
  }


  const handlePrincipalChange = (e) => {
    setPrincipal(e.target.value);
  };

  const handleInterestChange = (e) => {
    setInterest(e.target.value);
  };

  const handleMonthlyChange = (e) => {
    setMonthly(e.target.value);
  };

  return (
    <main>
 
    <h1>LoanScope</h1>
    
      <div className='input-container'>

        <div className='input'>
          <label htmlFor="principal">Starting Principal</label>
          <input
            id="principal"
            type="text"
            value={principal}
            onChange={handlePrincipalChange}
          />
          <p>{principalError}</p>
        </div>

        <div className='input'>
          <label htmlFor="interest">Interest Rate</label>
          <input
            id="interest"
            type="text"
            value={interest}
            onChange={handleInterestChange}
          />
          <p>{interestError}</p>
        </div>

        <div className='input'>
          <label htmlFor="monthly">Monthly Payment</label>
          <input
            id="monthly"
            type="text"
            value={monthly}
            onChange={handleMonthlyChange}
          />
          <p>{monthlyError}</p>
        </div>
        
      </div>
   
      
    </main>
  )
}