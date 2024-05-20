import React from 'react'
import Chart from "react-apexcharts";

const ApexChart = ({data, title}) => {
    return (
        <>
            <Chart
                sx={{position:"absolute"}}
                type="area"
                series={[
                    {
                        name: "Commits",
                        data: data?.map(data => title==="Humidity"?data.humidity:data.temperature)
                    }
                ]}

                options={{
                    chart: {
                        toolbar: {
                            show: false
                        },

                    },
                    colors: ['#f90000'],
                    stroke: { width: 1, curve: 'smooth' },
                    dataLabels: { enabled: false },
                    xaxis: {
                        categories: data?.map(data => data.timestamp),
                    },
                    yaxis: {
                        show: true,
                        labels: {
                            formatter: function (val) {
                                return val.toFixed(2);
                            },
                        }
                    },
                    title: {    
                        text: title, 
                        align: 'center',
                        margin: 10,
                        offsetX: 0,
                        offsetY: 0,
                        floating: false, 
                        style: {
                            fontSize:  '14px',
                            fontWeight:  'bold',
                            color:  '#263238'
                        }
                    }
                }}
            />
        </>
    )
}

export default ApexChart;