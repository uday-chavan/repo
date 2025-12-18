


window.nextRaceDateIso = "2026-04-06T15:00:00"; // <-- set the desired date/time here (YYYY-MM-DDTHH:MM:SS)
window.nextRaceLabel = "Australian Grand Prix";
window.nextRaceLabelDateText = "06 April 2026 • 15:00 (Local Time)";


const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const raceNameEl = document.getElementById("raceName");
const raceDateEl = document.getElementById("raceDate");

if (!daysEl || !hoursEl || !minutesEl || !secondsEl) {
  console.error("Countdown elements missing. Ensure IDs 'days','hours','minutes','seconds' exist in HTML.");
} else {
  if (raceNameEl) raceNameEl.textContent = window.nextRaceLabel;
  if (raceDateEl) raceDateEl.textContent = window.nextRaceLabelDateText;

    let base = new Date(window.nextRaceDateIso);
  if (isNaN(base.getTime())) {
    console.error("Invalid date in window.nextRaceDateIso:", window.nextRaceDateIso);
  } else {
       const originalYear = base.getFullYear();
    const now = () => new Date();
    let nextDate = new Date(base);
    let loops = 0;
    while (nextDate <= now() && loops < 10) {
      nextDate.setFullYear(nextDate.getFullYear() + 1);
      loops++;
    }
    if (nextDate <= now()) {
      console.warn("Could not find a future date from base. Countdown will show 00:00.");
    } else {
      console.info("Next race countdown set to:", nextDate.toString());
    }

    function update() {
      const diff = nextDate - new Date();
      if (diff <= 0) {
        daysEl.textContent = hoursEl.textContent = minutesEl.textContent = secondsEl.textContent = "00";
        return;
      }
      const totalSec = Math.floor(diff / 1000);
      const days = Math.floor(totalSec / (3600*24));
      const hours = Math.floor((totalSec % (3600*24)) / 3600);
      const minutes = Math.floor((totalSec % 3600) / 60);
      const seconds = totalSec % 60;
      daysEl.textContent = String(days).padStart(2,"0");
      hoursEl.textContent = String(hours).padStart(2,"0");
      minutesEl.textContent = String(minutes).padStart(2,"0");
      secondsEl.textContent = String(seconds).padStart(2,"0");
    }

    update();
    setInterval(update, 1000);
  }
}


