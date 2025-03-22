import React, { useEffect, useRef } from 'react';
import { Helmet } from "react-helmet";
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip } from 'chart.js';

const YearlyPerformanceChart = () => {
    const canvasRef = useRef(null);
    let chartInstance = useRef(null);

    useEffect(() => {
        // Register components required for the line chart
        Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip);

        const ctx = canvasRef.current.getContext('2d');

        // Create a new chart instance
        chartInstance.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['2021', '2022', '2023', '2024'],
                datasets: [{
                    label: 'Yearly ROI',
                    data: [20, 30, 25, 35],
                    borderColor: 'rgba(255, 99, 132, 1)',
                    fill: false,
                }]
            }
        });

        // Cleanup function to destroy chart instance when the component is unmounted or re-rendered
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, []);

    return (<>
     <Helmet>
                <meta charSet="utf-8" />
                <title>Yearly Performance Chart - ROI Analysis</title>
                <meta name="description" content="A chart showing yearly ROI performance from 2021 to 2024. Analyze trends and growth." />
                <meta name="robots" content="index, follow" />
                <meta property="og:title" content="Yearly Performance Chart - ROI Analysis" />
                <meta property="og:description" content="A chart showing yearly ROI performance from 2021 to 2024. Analyze trends and growth." />
                <meta property="og:image" content="https://via.placeholder.com/1200x630" />
                <meta property="og:url" content="https://www.example.com/yearly-performance" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Yearly Performance Chart - ROI Analysis" />
                <meta name="twitter:description" content="A chart showing yearly ROI performance from 2021 to 2024. Analyze trends and growth." />
                <meta name="twitter:image" content="https://via.placeholder.com/1200x630" />
            </Helmet>
    <canvas ref={canvasRef} width="400" height="200"></canvas>
    </>);
}

export default YearlyPerformanceChart;
