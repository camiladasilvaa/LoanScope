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
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="month"
          label={{ value: 'Month', position: 'insideBottom', offset: -10 }}
        />
        <YAxis
          width={90}
          tickFormatter={(value) => `$${value.toLocaleString()}`}
          label={{ value: 'Balance', angle: -90, position: 'insideLeft', offset: -10 }}
        />
        <Line type="monotone" dataKey="balance" dot={false} stroke="#662dbb" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}