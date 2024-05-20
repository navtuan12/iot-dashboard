import React from 'react'

export default Gauge = ({ data, title, max }) => {
    const settings = {
        width: 200,
        height: 100,
    };
    return (
        <div>
            <Gauge
                {...settings}
                value={50}
                valueMax={max}
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
        </div>
    )
}
