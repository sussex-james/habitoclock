import React, { useEffect } from "react";
import { toJS } from "mobx";
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
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import "./results-styles.css";
import { Heading } from "@chakra-ui/react";

const Results = ({ results }) => {
  useEffect(() => {
    console.log("Results: ", toJS(results));
  }, []);

  // description: ""
  // emoji: ")"
  // name: ""
  // percentageDifference: 0.15
  // timeRepresentation: Object { hour: null, minute: null }
  // hour: null
  // minute: null
  // usage: 10
  // watts: 50

  // radar with % diff - just takes the bestTime of each ++ % diff
  // proofread teext thing
  // ask about fireworks

  let barData = [];
  results.map((item) => {
    let name =
      item.name +
      "\n" +
      item.timeRepresentation.hour +
      ":" +
      item.timeRepresentation.minute;
    barData.push({
      name: name,
      carbonGramsConsumed: (item.usage * item.watts) / 1000,
    });
  });

  let tableData = [];
  results.map((item) => {
    tableData.push({
      name: item.name + " " + item.emoji,
      time: item.timeRepresentation.hour + ":" + item.timeRepresentation.minute,
      carbon: (item.usage * item.watts) / 1000,
    });
  });

  return (
    <div class="wrapper">
      <div class="divide">
        <Heading
          as="h1"
          size="xl"
          fontWeight="bold"
          color="primary.800"
          textAlign={["center", "center", "left", "left"]}
        >
          Results:
        </Heading>
      </div>
      <div class="flex">
        <ResponsiveContainer width="60%" height={500}>
          <RadarChart cx="50%" cy="50%" outerRadius="85%" data={barData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            <PolarRadiusAxis />
            <Radar
              name="radarCarbon"
              dataKey="carbonGramsConsumed"
              stroke="#207959"
              fill="#04AA6E"
              fillOpacity={0.65}
            />
          </RadarChart>
        </ResponsiveContainer>
        <div class="leftShift">
          EXPLANATION HERE OF THE GRAPHS ETC. HOW IT WORKS AND STUFF.
        </div>
      </div>
      <div class="divide" />
      <div class="flex">
        <ResponsiveContainer width="60%" height={500}>
          <BarChart
            layout="vertical"
            syncId="anyId"
            width={500}
            height={300}
            data={barData}
            margin={{ left: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis
              dataKey="name"
              type="category"
              padding={{ top: -8, bottom: -8 }}
            />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="carbonGramsConsumed"
              barSize={60}
              fill="#04AA6E"
              background={{ fill: "#eee" }}
            />
          </BarChart>
        </ResponsiveContainer>
        <table id="table">
          <tr>
            <th>Habit</th>
            <th>Time of day</th>
            <th>Carbon Grams Consumed</th>
          </tr>
          {tableData.map((item) => (
            <tr>
              <td>{item.name}</td>
              <td>{item.time}</td>
              <td>{item.carbon}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Results;
