
  // Populate recent 6 days
  const dateList = document.getElementById("dateList");
  const days = 6;
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    const weekday = weekdays[date.getDay()];
    const randomTag = Math.floor(Math.random() * 30) + 1;

    const dateCard = `
      <div class="date-card">
        <div>
          <h3>${day}</h3>
          <p>${month} ${year}<br><span>${weekday}</span></p>
        </div>
        <div class="date-tag">${randomTag}</div>
      </div>
    `;

    dateList.innerHTML += dateCard;
  }



  // Render dynamic calendar
  const fullCalendar = document.getElementById("fullCalendar");
  const calendarMonthYear = document.getElementById("calendarMonthYear");
  const prevMonthBtn = document.getElementById("prevMonth");
  const nextMonthBtn = document.getElementById("nextMonth");

  let currentDate = new Date();

  function renderCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const monthName = date.toLocaleString("default", { month: "long" });

    calendarMonthYear.textContent = `${monthName} ${year}`;
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    let days = `<table style="width:100%; border-collapse: collapse;"><thead><tr>
      <th>Su</th><th>Mo</th><th>Tu</th><th>We</th><th>Th</th><th>Fr</th><th>Sa</th>
    </tr></thead><tbody><tr>`;

    for (let i = 0; i < firstDay; i++) days += "<td></td>";
    for (let d = 1; d <= lastDate; d++) {
      const cellDate = new Date(year, month, d);
      const dayOfWeek = cellDate.getDay();
      days += `<td style="padding: 4px; text-align: center;">${d}</td>`;
      if (dayOfWeek === 6 && d !== lastDate) days += "</tr><tr>";
    }
    days += "</tr></tbody></table>";
    fullCalendar.innerHTML = days;
  }

  renderCalendar(currentDate);

  prevMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
  });

  nextMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
  });


  
