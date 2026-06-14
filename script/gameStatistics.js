const ctx = document.getElementById("myChart");
const data = [3, 10, 17, 8, 4, 3, 2];
const max = Math.max(...data);

const stats = document.querySelector(".statistics");
document.addEventListener("click", (e) => {
  if (e.target.matches(".open-stats")) {
    stats.classList.toggle("opened");
  }
});

const valueLabelPlugin = {
  id: "valueLabel",
  afterDatasetsDraw(chart) {
    const { ctx } = chart;
    chart.data.datasets.forEach((dataset, i) => {
      const meta = chart.getDatasetMeta(i);
      meta.data.forEach((bar, index) => {
        const value = dataset.data[index];

        ctx.save();
        ctx.fillStyle = "#1f1f1fc3";
        ctx.font = "12px Arial";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(value, bar.x + 10, bar.y);
        ctx.restore();
      });
    });
  },
};

new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["1", "2", "3", "4", "5", "6", "Lost"],
    datasets: [
      {
        label: "",
        data: data,
        borderWidth: 1,
        backgroundColor: data.map((value) =>
          value === max ? "#6627c461" : "#1c1c8833",
        ),
      },
    ],
  },
  options: {
    plugins: {
      legend: {
        display: false,
      },
    },
    indexAxis: "y",
    scales: {
      x: {
        display: false,
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: "#020005e5",
        },
        beginAtZero: true,
      },
    },
  },
  plugins: [valueLabelPlugin],
});
