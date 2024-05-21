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
            subheader={gauge?.timestamp}
          />
          <Gauge data={gauge} title="Temperature" max={50} />
        </Card>
        <Card className="cv-gauge-humidity">
          <CardHeader
            title="Humidity"
            subheader={gauge?.timestamp}
          />
          <CardOverflow>
            <Gauge data={gauge} title="Humidity" max={100} />
          </CardOverflow>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
