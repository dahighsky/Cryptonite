import { ChartOptions } from "chart.js";
export interface ChartCoinData {
  id: string;
  symbol: string;
  prices: [number, number][];
}

export interface Dataset {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
  fill: boolean;
  pointRadius: number;
}
[];

export const prepareChartData = (
  data: ChartCoinData[]
): [datasets: Dataset[], labels: string[]] => {
  console.log(data[0].prices);
  const labels = data[0].prices.map((price) => {
    const date = new Date(price[0]);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  });
  const datasets = data.map((coin, index) => ({
    label: coin.symbol.toUpperCase(),
    data: coin.prices.map((price) => price[1]),
    borderColor: ["#FF4DCA", "#F68D7D", "#23DBBD"][index],
    backgroundColor: ["#FF4DCA", "#F68D7D", "#23DBBD"][index],
    fill: false,
    // pointBackgroundColor: "rgba(0, 0, 0, 0)",
    // pointBorderColor: "rgba(0, 0, 0, 0)",
    pointRadius: 0,
  }));
  return [datasets, labels];
};

export const options: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
      align: "center",
      labels: {
        usePointStyle: true,
        boxHeight: 4,
        font: {
          size: 10,
          lineHeight: 2,
        },
        textAlign: "right",
      },
    },
  },
  scales: {
    x: {
      ticks: {
        maxTicksLimit: 6,
      },
      grid: {
        display: false,
      },
      border: {
        display: false,
      },
    },
    y: {
      ticks: {
        callback: (value: number | string) => {
          if (typeof value === "number") {
            return new Intl.NumberFormat().format(+value.toFixed(0));
          }
          return value;
        },
      },
      grid: {
        display: false,
      },
      border: {
        display: false,
      },
    },
  },
};
