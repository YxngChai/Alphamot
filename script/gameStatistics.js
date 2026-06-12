const ctx = document.getElementById("myChart");

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
        ctx.font = "16px Arial";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(value, bar.x - 30, bar.y);
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
        label: "Guess distribution",
        data: [3, 10, 17, 8, 4, 3, 2],
        borderWidth: 1,
        backgroundColor: "#6127dde1",
      },
    ],
  },
  options: {
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
