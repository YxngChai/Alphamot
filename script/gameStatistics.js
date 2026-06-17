import { SoundManager } from "./sound.js";

export const stats = {
  totalPlayed: 0,
  win: 0,
  currentStreak: 0,
  maxStreak: 0,
  guessDistribution: {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    lost: 0,
  },
};
let chartInstance = null;
const ctx = document.getElementById("myChart");

function getWinPercentage(stats) {
  return Math.round(
    stats.totalPlayed ? (stats.win / stats.totalPlayed) * 100 : 0,
  );
}

export function updateStatsText() {
  document.querySelectorAll("[data-stats]").forEach((el) => {
    const key = el.dataset.stats;
    if (key === "winPercentage") {
      el.textContent = getWinPercentage(stats) + "%";
    } else {
      el.textContent = stats[key];
    }
  });
}

document.addEventListener("click", (e) => {
  if (e.target.matches(".open-stats")) {
    const statsSection = document.querySelector(".statistics");
    statsSection.classList.toggle("opened");
    SoundManager.play("menu");
  }
  updateStatsText();
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
        const text = value.toString();
        const padding = 10;
        const x = Math.min(bar.x + padding, chart.width - 10);
        const y = bar.y;
        ctx.fillText(text, x, y);
        ctx.restore();
      });
    });
  },
};
export function generateChart() {
  const data = [
    stats.guessDistribution[1],
    stats.guessDistribution[2],
    stats.guessDistribution[3],
    stats.guessDistribution[4],
    stats.guessDistribution[5],
    stats.guessDistribution[6],
    stats.guessDistribution.lost,
  ];
  const max = Math.max(...data);

  if (chartInstance) {
    chartInstance.destroy();
  }
  chartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["1", "2", "3", "4", "5", "6", "X"],
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
}

const KEY = "alphamot-stats";
export function saveStats() {
  const saveStats = {
    totalPlayed: stats.totalPlayed,
    win: stats.win,
    currentStreak: stats.currentStreak,
    maxStreak: stats.maxStreak,
    guessDistribution: stats.guessDistribution,
  };
  localStorage.setItem(KEY, JSON.stringify(saveStats));
}
export function loadStats() {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : null;
}
export function restoreStats(saved) {
  if (!saved) return;

  stats.totalPlayed = saved.totalPlayed ?? 0;
  stats.win = saved.win ?? 0;
  stats.currentStreak = saved.currentStreak ?? 0;
  stats.maxStreak = saved.maxStreak ?? 0;
  stats.guessDistribution = saved.guessDistribution ?? stats.guessDistribution;
}
