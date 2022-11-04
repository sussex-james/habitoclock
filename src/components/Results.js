import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Results = () => {
  //   ...item, // description + timeRepresentation
  //                 'usage': usage,
  //                 'watts': watts,
  //                 'emoji': emoji,
  //                 'percentageDifference': percentageDifference
  //             })
  // [{ 'text': string, 'time': { 'minute': int, 'second': int }, 'percentageDifference': float(0-1)}, ...]

  let data1 = { name: "coffee 12:00", value: 400 };
  let data2 = { name: "gym 13:00", value: 200 };
  let data3 = { name: "gaming 09:00", value: 900 };

  const data = [
    {
      name: "coffee 12:00",
      carbon: 400,
    },
    {
      name: "gym 13:00",
      carbon: 200,
    },
    {
      name: "gaming 09:00",
      carbon: 900,
    },
    {
      name: "gaming 09:00",
      carbon: 900,
    },
  ];

  // sort data into descending (or maybe sort by time option)

  // radar to show your carbon output during the day for the habits shown. 'go back and enter more habits to change'
  // or radialBar
  return (
    <div>
      <ResponsiveContainer width="50%" height={500}>
        <BarChart
          layout="vertical"
          syncId="anyId"
          width={500}
          height={300}
          data={data}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis
            dataKey="name"
            type="category"
            padding={{ top: -33, bottom: -34 }}
          />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="carbon"
            barSize={60}
            fill="#0AA882"
            background={{ fill: "#eee" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Results;
