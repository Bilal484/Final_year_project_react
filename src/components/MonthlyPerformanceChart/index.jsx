import React, { useEffect, useRef } from "react";
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Helmet } from "react-helmet";

const MonthlyPerformanceChart = () => {
  const canvasRef = useRef(null);
  let chartInstance = useRef(null);

  useEffect(() => {
    // Register components required for the bar chart
    Chart.register(
      BarController,
      BarElement,
      CategoryScale,
      LinearScale,
      Title,
      Tooltip
    );

    const ctx = canvasRef.current.getContext("2d");

    // Create a new chart instance
    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["January", "February", "March", "April", "May"],
        datasets: [
          {
            label: "Performance",
            data: [65, 59, 80, 81, 56],
            backgroundColor: "rgba(54, 162, 235, 0.6)",
          },
        ],
      },
    });

    // Cleanup function to destroy chart instance when the component is unmounted or re-rendered
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <>
     <Helmet>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="description" content="View the monthly performance chart that tracks the performance over several months, showcasing key data points and insights." />
                <meta name="keywords" content="performance chart, bar chart, data visualization, monthly performance" />
                <meta property="og:title" content="Monthly Performance Chart" />
                <meta property="og:description" content="Explore the performance trends of the past months with a dynamic and interactive bar chart." />
                <meta property="og:image" content="https://via.placeholder.com/1200x630?text=Monthly+Performance+Chart" />
                <meta property="og:url" content="https://www.example.com/monthly-performance-chart" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Monthly Performance Chart" />
                <meta name="twitter:description" content="Explore the performance trends of the past months with a dynamic and interactive bar chart." />
                <meta name="twitter:image" content="https://via.placeholder.com/1200x630?text=Monthly+Performance+Chart" />
                <title>Monthly Performance Chart</title>
            </Helmet>

      <canvas ref={canvasRef} width="400" height="200"></canvas>
    </>
  );
};

export default MonthlyPerformanceChart;
