import React, { useState, useEffect } from "react";
import ApexChart from "../components/Chart";
import Card from "@mui/material/Card";
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Gauge from "../components/Gauge";
import RadialGauge from "../components/RadialGauge";

function Dashboard() {
  const [chart, setChart] = useState();
  const [gauge, setGauge] = useState();
  const [count, setCount] = useState();
  
  const fetchData = async () => {
    const chartResponse = await fetch("http://localhost:8080/sensors/dashboard/chart");
    chartResponse.json().then((data) => {
      setChart(data);
    });

    const gaugeResponse = await fetch("http://localhost:8080/sensors/dashboard/gauge");
    gaugeResponse.json().then((data) => {
      setGauge(data);
    });

    const countResponse = await fetch("http://localhost:8080/sensors/dashboard/count_motorcycle");
    countResponse.json().then((data) => {
      setCount(data);
    });

  };

  useEffect(() => {
    const timer = setInterval(() => {
      fetchData();
    }, 5000);
    return () => {
      clearInterval(timer);
    };
  }, [chart, gauge, count]);

  return (
    <div className="container">
      <div id="left" className="child-container">
        <div id="chart1" className="chart-containers">
          <ApexChart data={chart} title="Temperature" />
        </div>
        <div id="chart2" className="chart-containers">
          <ApexChart data={chart} title="Humidity" />
        </div>
      </div>
      <div id="right" className="child-container">
        <div id="row-1">
          <div id="gauge-left">
            <Card className="cv-gauge-temp">
              <CardHeader title="Temperature" subheader={gauge?.timestamp} />
              <Gauge data={gauge} />
            </Card>
            <Card className="cv-motorcycle-count">
              <CardHeader title="Motorcycle Count" subheader={count?.timestamp} />
              <CardContent>{count?.count}</CardContent>
            </Card>
          </div>
          <div id="gauge-right">
            <Card className="cv-gauge-humidity">
              <CardHeader title="Humidity" subheader={gauge?.timestamp} />
              <RadialGauge data={gauge} />
            </Card>
          </div>
        </div>
        <div id="row-2">
          <Card className="cv-video-stream">
            <CardContent>
              <iframe src="http://192.168.1.88:8888/cam1" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
