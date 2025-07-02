
  document.addEventListener("DOMContentLoaded", function () {
    const dateList = document.getElementById("date-list");

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    for (let i = 0; i < 6; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i); // recent 6 days

      const day = date.getDate();
      const month = date.toLocaleString('default', { month: 'long' });
      const year = date.getFullYear();
      const weekday = days[date.getDay()];
      const randomTag = Math.floor(Math.random() * 30) + 1; // or static number

      const card = document.createElement("div");
      card.className = "date-card";
      card.innerHTML = `
        <div>
          <h3>${day}</h3>
          <p>${month} ${year}<br><span>${weekday}</span></p>
        </div>
        <div class="date-tag">${randomTag}</div>
      `;

      dateList.appendChild(card);
    }
  });

