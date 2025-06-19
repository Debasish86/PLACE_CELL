new Chart(document.getElementById("placementChart"), {
  type: 'doughnut',
  data: {
    labels: ["Placed", "Unplaced"],
    datasets: [{
      label: 'Students',
      data: [285, 35],
      backgroundColor: ['#22c55e', '#ef4444']
    }]
  },
  options: {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: "#fff", font: { size: 12 } },
        position: 'bottom'
      }
    }
  }
});

// Company Visits
new Chart(document.getElementById("companyChart"), {
  type: 'bar',
  data: {
    labels: ["Total", "Product", "Service"],
    datasets: [{
      label: 'Companies',
      data: [85, 25, 60],
      backgroundColor: ['#3b82f6', '#10b981', '#f59e0b']
    }]
  },
  options: {
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: { ticks: { color: "#fff" } },
      y: { ticks: { color: "#fff" } }
    }
  }
});

// Package Details
new Chart(document.getElementById("packageChart"), {
  type: 'bar',
  data: {
    labels: ["Highest", "Median", "Average"],
    datasets: [{
      label: 'LPA',
      data: [45, 8.5, 10.2],
      backgroundColor: ['#8b5cf6', '#3b82f6', '#10b981']
    }]
  },
  options: {
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: { ticks: { color: "#fff" } },
      y: { ticks: { color: "#fff" } }
    }
  }
});

// Interesting Highlight
new Chart(document.getElementById("highlightChart"), {
  type: 'doughnut',
  data: {
    labels: ["Campus-to-Career", "Others"],
    datasets: [{
      data: [89, 11],
      backgroundColor: ['#f97316', '#64748b']
    }]
  },
  options: {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: "#fff" },
        position: 'bottom'
      }
    }
  }
});