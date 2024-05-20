import React from "react";
import { useState, useEffect } from "react";
import ApexChart from "../components/Chart";
import Card from "@mui/material/Card";
import CardHeader from '@mui/material/CardHeader';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

function Dashboard() {
  const [chart, setChart] = useState();
  const [gauge, setGauge] = useState();
  const fetchData = async () => {
    const chartResponse = await fetch("http://localhost:8080/sensors/dashboard/chart");
    console.log(chartResponse);
    chartResponse.json().then((data) => {
      setChart(data);
    });

    const gaugeResponse = await fetch("http://localhost:8080/sensors/dashboard/gauge");
    console.log(gaugeResponse);
    gaugeResponse.json().then((data) => {
      setGauge(data);
    });
  };
  useEffect(() => {
    const timer = setInterval(() => {
      fetchData();
    }, 10000);
    return () => {
      clearInterval(timer);
    };
  }, [chart, gauge]);

  const settings = {
    width: 300,
    height: 200,
  };

  return (
    <div className="container">
      <div id="left" className="child-container">
        <div className="chart-containers">
          <ApexChart data={chart} title="Temperature"></ApexChart>
        </div>
        <div className="chart-containers">
          <ApexChart data={chart} title="Humidity"></ApexChart>
        </div>
      </div>
      <div id="right" className="child-container">
        <Card className="cv-gauge-temp">
          <CardHeader
            title="Temperature"
            subheader="May 09 10:04:20"
          />
          <Gauge
            {...settings}
            value={gauge?.temperature}
            valueMax={50}
            cornerRadius="50%"
            sx={(theme) => ({
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: 40,
              },
              [`& .${gaugeClasses.valueArc}`]: {
                fill: '#012349',
              },
              [`& .${gaugeClasses.referenceArc}`]: {
                fill: theme.palette.text.disabled,
              },
            })}
          />
        </Card>
        <Card className="cv-gauge-humidity">
          <CardHeader
            title="Humidity"
            subheader="May 09 10:04:20"
          />
           <Gauge
            {...settings}
            value={gauge?.humidity}
            valueMax={100}
            cornerRadius="50%"
            sx={(theme) => ({
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: 40,
              },
              [`& .${gaugeClasses.valueArc}`]: {
                fill: '#012349',
              },
              [`& .${gaugeClasses.referenceArc}`]: {
                fill: theme.palette.text.disabled,
              },
            })}
          />
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
