export default function Table({data}) {

  // need to construct data array for table
  // each row should be payment, amount, principal, interest, balance
  const rows = []
  
  for(let i = 0; i < data.length; i++) {
    const row = data[i]
    rows.push(
      <tr key={row.month}>
        <td>{row.month}</td>
        <td>{(row.payment/100).toLocaleString(undefined, {style: 'currency', currency: "USD"})}</td>
        <td>{(row.principalPaid/100).toLocaleString(undefined, {style: 'currency', currency: "USD"})}</td>
        <td>{(row.interestPaid/100).toLocaleString(undefined, {style: 'currency', currency: "USD"})}</td>
        <td>{(row.balance/100).toLocaleString(undefined, {style: 'currency', currency: "USD"})}</td>
      </tr>
    )
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Payment No.</th>
          <th>Payment Amount</th>
          <th>Portion to Principal</th>
          <th>Portion to Interest</th>
          <th>Remaining Balance</th>
        </tr>
      </thead>
      
      <tbody>
        {rows}
      </tbody>
      

      
    </table>
  )
}