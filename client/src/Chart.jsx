import { Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart } from 'recharts';

// template from https://recharts.github.io/en-US/examples/SimpleLineChart/, https://www.geeksforgeeks.org/reactjs/create-a-line-chart-using-recharts-in-reactjs/
export default function Chart({data}) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 50,
          left: 50,
          bottom: 50,
        }}
      >
        <CartesianGrid />
        <XAxis
          dataKey="month"
          label={{ value: 'Month', position: 'insideBottom', offset: -20 }}
        />
        <YAxis
          width={90}
          tickFormatter={(value) => `$${value.toLocaleString()}`} // https://recharts.github.io/en-US/api/XAxis/#tickFormatter
          label={{ value: 'Balance', angle: -90, position: 'insideLeft', offset: -20 }}
        />
        <Line type="monotone" dataKey="balance" dot={false} stroke="#662dbb" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}