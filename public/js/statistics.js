// /js/stats.js

document.addEventListener("DOMContentLoaded", () => {
    // Numbers
    animateCount("eligible-count", 320, 30);
    animateCount("placed-count", 285, 30);
    animateCount("visited-count", 85, 20);
    animateCount("product-count", 25, 20);
    animateCount("service-count", 60, 20);
    animateCount("offer-count", 9, 300);
    animatePercent("conversion-rate", 89);
    animateCount("fastest-offer", 3, 300);
  
    // Bars
    animateBar("highest-bar", 100); // ₹45 LPA
    animateBar("median-bar", (8.5 / 45) * 100);
    animateBar("average-bar", (10.2 / 45) * 100);
  });
  
  function animateCount(id, target, interval) {
    const element = document.getElementById(id);
    let count = 0;
    const step = Math.ceil(target / 50);
    const timer = setInterval(() => {
      count += step;
      if (count >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = count;
      }
    }, interval);
  }
  
  function animatePercent(id, target) {
    const element = document.getElementById(id);
    let percent = 0;
    const step = 2;
    const timer = setInterval(() => {
      percent += step;
      if (percent >= target) {
        element.textContent = `${target}%`;
        clearInterval(timer);
      } else {
        element.textContent = `${percent}%`;
      }
    }, 20);
  }
  
  function animateBar(id, percent) {
    const bar = document.getElementById(id);
    bar.style.width = `${percent}%`;
  }
  