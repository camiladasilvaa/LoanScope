import { useState } from 'react'
import { minPayment } from '../../shared/engine'
import InputField from './InputField.jsx'
// import Schedule from './Schedule.jsx'
import { calculateSchedule } from '../../shared/engine'
import Chart from './Chart.jsx'
import Table from './Table.jsx'
import './App.css'

// validating URL parameters - REQ-21
// reusing logic from input validation

// principal
function checkPrincipalURL(principal) {
  if (principal === null || principal.trim() === '' ) {
    return ''
  }
  const principalNum = Number(principal)
  // check if input is number
  if (Number.isNaN(principalNum)) {
    return 'Please enter a number for the starting principal.'
  } 
  if (principalNum < 1 || principalNum > 100000000) {
    return 'The starting principal must be between $1 to $100,000,000.'
  }
  return ''
}

// interest/apr
function checkAPRURL(apr) {
  if (apr === null || apr.trim() === '') {
    return ''
  }
  const aprNum = Number(apr)
  if (Number.isNaN(aprNum)) {
      return 'Please enter a number for the interest rate.'
    } 
  else if (aprNum < 0 || aprNum > 40) {
    return 'The interest rate must be between 0% to 40%.'
  }
  return ''
}

// monthly
function checkMonthlyURL(monthly, principal, interest) {
  if (monthly === null || monthly.trim() === '') {
    return ''
  }

  const monthlyNum = Number(monthly)

  if (Number.isNaN(monthlyNum)) {
    return 'Please enter a number for the monthly payment.'
  } 

  // need to check that principal and interest rate are valid data

  if (checkPrincipalURL(principal) != '' || checkAPRURL(interest) != '') {
    return ''
  }

  if (interest.trim() === '' || principal.trim() === '') {
    return ''
  }

  const principalNum = Number(principal)
  const interestNum = Number(interest)
  const greaterValue = Math.max(1000000, minPayment(principalNum, interestNum)*3)

  if (monthlyNum < 1 || monthlyNum > greaterValue) {
    return `The monthly payment must be between $1 and $${greaterValue.toLocaleString()}.`
  }
  else if (monthlyNum < minPayment(principalNum, interestNum)) {
    return `With a monthly payment of $${monthlyNum.toLocaleString()}, the payment is less than or equal to the monthly interest accrued on the starting principal. The loan would never be paid off at that rate. Minimum: $${minPayment(principalNum, interestNum).toFixed(2)}.`
  }

  return ''
  
}

export default function App() {

  // using URLSearchParams for 3.5

  // using these templates
  // https://stackoverflow.com/questions/56111914/how-to-read-url-parameters-within-component-in-react-js
  // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams

  const windowUrl = window.location.search;
  const searchParams = new URLSearchParams(windowUrl);
  //console.log(searchParams.get('principal'), searchParams.get('apr'), searchParams.get('monthly'))

  // forgot how to use the ternary operator: https://www.w3schools.com/js/js_if_ternary.asp
  // safety default - ''
  // if the check functions return a '', set the variable to the validated url

  // principal 
  const urlPrincipal = searchParams.get('principal') ?? ''
  const urlAPR = searchParams.get('apr') ?? ''
  const urlMonthly = searchParams.get('monthly') ?? ''

  //validate and set safe default
  const valPrincipal = checkPrincipalURL(urlPrincipal) === '' ? urlPrincipal : ''
  const valAPR = checkAPRURL(urlAPR) === '' ? urlAPR : ''
  const valMonthly = checkMonthlyURL(urlMonthly, valPrincipal, valAPR) === '' ? urlMonthly : ''
  
  const [principal, setPrincipal] = useState(valPrincipal)
  const [interest, setInterest] = useState(valAPR)
  const [monthly, setMonthly] = useState(valMonthly)

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
    else if (principal.trim() === '') {
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
    if (Number.isNaN(monthlyNum)) {
      monthlyError = 'Please enter a number for the monthly payment.'
    } 
    // need to check that principal and interest rate are valid data (no error was created)
    else if (principalError === '' && interestError === '') {

      const greaterValue = Math.max(1000000, minPayment(principalNum, interestNum)*3)

      if (monthlyNum < 1 || monthlyNum > greaterValue) {
        monthlyError = `The monthly payment must be between $1 and $${greaterValue.toLocaleString()}.`
      }
      else if (monthlyNum < minPayment(principalNum, interestNum)) {
        monthlyError = `With a monthly payment of $${monthlyNum.toLocaleString()}, the payment is less than or equal to the monthly interest accrued on the starting principal. The loan would never be paid off at that rate. Minimum: $${minPayment(principalNum, interestNum).toFixed(2)}.`
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
  
  // const result = calculateSchedule(1000, 12, 400, new Date())
  // console.log(result.payoffDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: '2-digit', year: 'numeric' }))


  let inputValid = false
  // need a variable to store whether all 3 inputs are valid
  if (principalError === '' && interestError === '' && monthlyError === '' && !principalEmpty && !interestEmpty && !monthlyEmpty) {
    inputValid = true
  }

  let schedule = null

  if (inputValid) {
    schedule = calculateSchedule(principalNum, interestNum, monthlyNum, new Date())
  }

  // console.log(schedule)

  let payOff = ''
  let terms = ''
  let intPaid = ''

  // build data for chart
  let chartData = []

  if (schedule && schedule.schedule) {
    if (schedule.payoffDate) {
      payOff = schedule.payoffDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: '2-digit', year: 'numeric' })
    }
    else {
      payOff = 'Exceeds 100 years.'
    }

    if (schedule.totalTerm) {
      // need to extract months and years
      const months = schedule.totalTerm % 12 // whole number of months
      const years = Math.floor(schedule.totalTerm / 12) // round down
      terms = `${years} years and ${months} months`
    }

    // formatting sources: https://www.w3schools.com/jsref/jsref_tolocalestring.asp, https://www.w3schools.com/jsref/jsref_tolocalestring_number.asp
    if (schedule.cumulativeInterest) {
      intPaid = (schedule.cumulativeInterest / 100).toLocaleString(undefined, {style: 'currency', currency: "USD"}) // need to divide because amount is in cents, need dollars
      // undefined for portability
    }

    // build data array for chart
    chartData.push({month: 0, balance: principalNum}) // first entry which is the initial principal

    // balance over month, each row has a month and a balance
    for(let i = 0; i<schedule.schedule.length; i++){
      // construct row
      const row = schedule.schedule[i]
      chartData.push({month: row.month, balance: row.balance/100}) // need to divide because it's in cents
    }

  }

  //console.log(chartData.length)

  // for the expandable panel, i was going to add a button with an onClick function that would make the panel show up
  // but i found this:https://dev.to/jordanfinners/creating-a-collapsible-section-with-nothing-but-html-4ip9
  // using the summary and details tag in html
  // https://www.w3schools.com/TAGs/tag_summary.asp
  
  return (
    <main>
 
    <h1>LoanScope</h1>
    
      <div className='input-container'>

        <InputField
          id="principal"
          label="Starting Principal"
          value={principal}
          onChange={handlePrincipalChange}
          error={principalError}
        />
        
        <InputField
          id="interest"
          label="Annual Interest Rate"
          value={interest}
          onChange={handleInterestChange}
          error={interestError}
        />

        <InputField
          id="monthly"
          label="Monthly Payment"
          value={monthly}
          onChange={handleMonthlyChange}
          error={monthlyError}
        />
        
      </div>

      <div className='chart-container'>

        {schedule && schedule.schedule && schedule.exceededMonths && (
          <p style={{ color: 'red' }}>{schedule.error}</p>
        )}
        
        <div className='headline-container'>
          <div className='headline-value'>
            <h3>Payoff Date</h3>
            <p>{payOff}</p>
          </div>

          <div className='headline-value'>
            <h3>Total Terms</h3>
            <p>{terms}</p>
            
          </div>

          <div className='headline-value'>
            <h3>Total Interest Paid</h3>
            <p>{intPaid}</p>
          
          </div>
        
        </div>
  
        {schedule && schedule.schedule && (
          <Chart data={chartData}></Chart>
        )}

      </div>


      {schedule && schedule.schedule && (
        <div className='table-container'>
          <details>
            <summary>Schedule</summary>
            <div className='schedule-table'>
              <Table data={schedule.schedule}></Table>
            </div>
          </details>
          
        </div>
      )}
   
      
    </main>
  )
}