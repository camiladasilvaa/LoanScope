# LoanScope

LoanScope is a browser-based, single-page application that visualizes a loan’s amortiza-
tion schedule and remaining lifetime as a function of three interactive inputs: starting
principal, annual interest rate, and monthly payment.

# How to run

Node.js 24 needs to be installed. 
Need two terminals:
- Run server in one terminal
- Run client in the other terminal

1. Run server
```bash
cd server
npm install
npm run dev
```

2. Run client
```bash
cd client
npm install
npm run dev
```

3. Use LoanScope
- Go to http://localhost:5173

# Frameworks and Tools
- Frontend: React (Vite)
- Charting: Recharts
- Backend: Node.js + Express
