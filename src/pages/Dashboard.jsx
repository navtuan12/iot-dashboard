import React from "react";
import { useState, useEffect, useRef } from "react";
import ApexChart from "../components/Chart";
import Card from "@mui/material/Card";
import CardHeader from '@mui/material/CardHeader';
import CardOverflow from '@mui/joy/CardOverflow';
import Box from '@mui/material/Box';
import Gauge from "../components/Gauge";
import RadialGauge from "../components/RadialGauge";
import CardContent from '@mui/material/CardContent';
import ReactPlayer from 'react-player'

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
    }, 5000);
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
        <div id="chart1" className="chart-containers">
          <ApexChart data={chart} title="Temperature"></ApexChart>
        </div>
        <div id="chart2" className="chart-containers">
          <ApexChart data={chart} title="Humidity"></ApexChart>
        </div>
      </div>
      <div id="right" className="child-container">
        <div id="row-1">
          <Card className="cv-gauge-temp">
            <CardHeader
              title="Temperature"
              subheader={gauge?.timestamp}
            />
            <Gauge data={gauge} />
          </Card>
          <Card className="cv-gauge-humidity" >
            <CardHeader
              title="Humidity"
              subheader={gauge?.timestamp}
            />
            <RadialGauge data={gauge} />
          </Card>
        </div>
        <div id="row-2">
          <Card className="cv-video-stream">
            <CardContent>
              <ReactPlayer url='http://192.168.1.88:8888/proxied' playing={true} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
