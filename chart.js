
    function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function loadCSV() {
  const response = await fetch("VideoGameSales.csv");
  const text = await response.text();

  const rows = text.trim().split("\n").slice(1,101);
  const labels = [];
  const values = [];
  const platforms=[];
  const japansales=[];
  const criticscore=[]
  rows.forEach(row => {
  const cols = row.split(",");
  const name = cols[0];
  const sales = parseFloat(cols[9]); 
  platforms.push(cols[1]);
  japansales.push(parseFloat(cols[7]));


  labels.push(name);
  values.push(sales);
  });

  createChart(labels, values, platforms, japansales);
}

function createChart(labels, values, platforms, japansales) {
  const ctx = document.getElementById("chart1").getContext("2d"); 
  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "Global Sales",
        data: values,
        borderWidth: 2,
        tension: 0.25
      }]
    },
    options: {
      responsive: true,
      scales: { y: { beginAtZero: true } }
    }
  });
 
  const ctx2 = document.getElementById("chart2").getContext("2d"); 
  const barchart = new Chart(ctx2, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "Japan sales",
        data: japansales,
        borderWidth: 2,
        tension: 0.25
      }]
    },
    options: {
      responsive: true,
      scales: { y: { beginAtZero: true } }
    }
  });

  const [btnRandom, btnAdd, btnRemove] = document.querySelectorAll("button");
document.getElementById("random1").addEventListener("click", () => {
  chart.data.datasets[0].data =
    chart.data.labels.map(() => randInt(1, 90));
  chart.update();
});

document.getElementById("add1").addEventListener("click", () => {
  chart.data.labels.push("New Game");
  chart.data.datasets[0].data.push(randInt(1, 90));
  chart.update();
});

document.getElementById("remove1").addEventListener("click", () => {
  chart.data.labels.pop();
  chart.data.datasets[0].data.pop();
  chart.update();
});
document.getElementById("random2").addEventListener("click", () => {
  barchart.data.datasets[0].data =
    barchart.data.labels.map(() => randInt(1, 90));
  barchart.update();
});

document.getElementById("add2").addEventListener("click", () => {
  barchart.data.labels.push("New Platform");
  barchart.data.datasets[0].data.push(randInt(1, 90));
  barchart.update();
});

document.getElementById("remove2").addEventListener("click", () => {
  barchart.data.labels.pop();
  barchart.data.datasets[0].data.pop();
  barchart.update();
}); }
loadCSV();
