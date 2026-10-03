import express from 'express';
import { calculateSchedule, minPayment} from '../shared/engine.js';

const app = express();
const port = 3000;

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

app.use(express.json());

// https://www.geeksforgeeks.org/web-tech/express-js-app-post-function/
// https://expressjs.com/en/5x/guide/routing/
// https://expressjs.com/en/5x/guide/routing/
app.post('/api/amortization', (req, res) => {
  const content = req.body ?? {} // stop if body is empty
  const { principal, apr, monthly } = content

  if (typeof principal !== 'number') {
    return res.status(400).json({ error: 'principal must be a number.' })
  }
  if (typeof apr !== 'number') {
    return res.status(400).json({ error: 'apr must be a number.' })
  }
  if (typeof monthly !== 'number') {
    return res.status(400).json({ error: 'monthly must be a number.' })
  }

  // reusing input logic to validate

  // principal
  if (principal < 1 || principal > 100000000) {
    return res.status(400).json({ error: 'Starting principal must be between $1 and $100,000,000.' })
  }

  // interest
  if (apr < 0 || apr > 40) {
    return res.status(400).json({ error: 'Interest rate must be between 0% and 40%.' })
  }

  // monthly
  const minPay = minPayment(principal, apr)
  const greaterValue = Math.max(1000000, minPay * 3)

  if (monthly < 1 || monthly > greaterValue) {
    return res.status(400).json({
      error: `Monthy must be between $1 and $${greaterValue.toLocaleString()}.`,
    })
  }
  if (monthly < minPay) {
    return res.status(400).json({
      error: `With a monthly payment of $${monthly.toLocaleString()}, the payment is less than or equal to the monthly interest accrued on the starting principal. The loan would never be paid off at that rate. Minimum: $${minPay.toFixed(2)}.`,
    })
  }

  // res.json({ ok: true}) // for testing

  // calculate the schedule
  const schedule = calculateSchedule(principal, apr, monthly, new Date())

  res.json(schedule)
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});