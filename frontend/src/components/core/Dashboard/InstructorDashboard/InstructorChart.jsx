import React, { useMemo, useState } from "react";
import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";

Chart.register(...registerables);

const InstructorChart = ({ courses }) => {
  const [currChart, setCurrChart] = useState("students");

  // Generate random colors
  const generateRandomColors = (numColors) => {
    const colors = [];

    for (let i = 0; i < numColors; i++) {
      const color = `rgb(
        ${Math.floor(Math.random() * 256)},
        ${Math.floor(Math.random() * 256)},
        ${Math.floor(Math.random() * 256)}
      )`;

      colors.push(color);
    }

    return colors;
  };

  // Generate colors only when number of courses changes
  const colors = useMemo(() => {
    return generateRandomColors(courses.length);
  }, [courses.length]);

  // Student chart data
  const chartDataStudents = {
    labels: courses.map((course) => course.courseName),

    datasets: [
      {
        label: "Students",

        data: courses.map(
          (course) => course.totalStudentsEnrolled || 0
        ),

        backgroundColor: colors,
        borderColor: "#161D29",
        borderWidth: 2,
        hoverBorderColor: "#FFFFFF",
        hoverBorderWidth: 2,
      },
    ],
  };

  // Income chart data
  const chartIncomeData = {
    labels: courses.map((course) => course.courseName),

    datasets: [
      {
        label: "Income",

        data: courses.map(
          (course) => course.totalAmountGenerated || 0
        ),

        backgroundColor: colors,

        borderColor: "#161D29",

        borderWidth: 2,

        hoverBorderColor: "#FFFFFF",

        hoverBorderWidth: 2,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      // Legend
      legend: {
        position: "right",

        labels: {
          color: "#AFB2BF",
          boxWidth: 12,
          boxHeight: 12,
          padding: 10,
          usePointStyle: true,
          pointStyle: "circle",
          font: {
            size: 11,
          },
        },
      },

      // Tooltip
      tooltip: {
        backgroundColor: "#000814",

        titleColor: "#FFFFFF",

        bodyColor: "#AFB2BF",

        borderColor: "#2C333F",

        borderWidth: 1,

        padding: 12,

        displayColors: true,

        callbacks: {
          label: function (context) {
            const label = context.label || "";

            const value = context.raw || 0;

            if (currChart === "income") {
              return `${label}: ₹${value}`;
            }

            return `${label}: ${value} students`;
          },
        },
      },
    },

    // Pie chart appearance
    elements: {
      arc: {
        borderWidth: 2,
      },
    },

    // Animation
    animation: {
      duration: 700,
    },
  };

  return (
    <div className="flex h-full w-full flex-col">

      {/* ================= HEADER ================= */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">

        {/* Title */}
        <div>
          <p className="text-xl font-semibold text-richblack-5">
            Course Overview
          </p>

          <p className="mt-1 text-xs text-richblack-300">
            Track your course performance
          </p>
        </div>

        {/* ================= CHART TOGGLE ================= */}
        <div className="flex rounded-lg bg-richblack-700 p-1">

          {/* Students */}
          <button
            onClick={() => setCurrChart("students")}
            className={`rounded-md px-4 py-2 text-sm font-semibold transition-all duration-200 ${
              currChart === "students"
                ? "bg-yellow-50 text-richblack-900 shadow-md"
                : "text-richblack-200 hover:text-richblack-5"
            }`}
          >
            Students
          </button>

          {/* Income */}
          <button
            onClick={() => setCurrChart("income")}
            className={`rounded-md px-4 py-2 text-sm font-semibold transition-all duration-200 ${
              currChart === "income"
                ? "bg-yellow-50 text-richblack-900 shadow-md"
                : "text-richblack-200 hover:text-richblack-5"
            }`}
          >
            Income
          </button>

        </div>
      </div>

      {/* ================= CHART ================= */}
      <div className="flex flex-1 items-center justify-center">

        <div className="relative h-[380px] w-full max-w-[650px]">

          <Pie
            data={
              currChart === "students"
                ? chartDataStudents
                : chartIncomeData
            }
            options={options}
          />

        </div>

      </div>
    </div>
  );
};

export default InstructorChart;