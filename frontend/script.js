// ---------- STATE ----------
let currentState = { sleep: 6.5, work: 10, activity: 35, screen: 7.2, stress: 5 };
let trendChart = null;

// ---------- GAUGE ----------
const circumference = 2 * Math.PI * 85;
function updateGauge(percentage) {
const gaugeCircle = document.querySelector('.gauge-progress');
const percentText = document.getElementById('gaugePercentText');

if (gaugeCircle) {
const offset = circumference - (percentage / 100) * circumference;
gaugeCircle.style.strokeDashoffset = offset;
}

if (percentText) {
percentText.textContent = `${percentage}%`;
if (percentage < 30) percentText.style.fill = '#2c9b6e';
else if (percentage < 60) percentText.style.fill = '#f4b942';
else percentText.style.fill = '#d9534f';
}
}

// ---------- BACKEND CALL ----------
async function callBackend() {
  try {
    const response = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        sleep: currentState.sleep,
        activity: currentState.activity,
        stress: currentState.stress
      })
    });

    const data = await response.json();

    let percent = 30;
    if (data.label === "Medium") percent = 60;
    else if (data.label === "High") percent = 90;

    updateGauge(percent);

    document.getElementById("confidenceBadge").innerText =
      "Confidence: " + data.confidence;

  } catch (err) {
    console.error("API Error:", err);
  }
}
// ---------- TREND ----------
function generateTrendData() {
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

  const sleepVals = [];
  const workloadVals = [];
  const stressVals = [];

  for (let i = 0; i < 7; i++) {
    let s = currentState.sleep + (i * 0.1);
    let w = currentState.work + (i * 0.2);
    let st = Math.min(10, Math.max(1, w / 2));

    sleepVals.push(parseFloat(s.toFixed(1)));
    workloadVals.push(parseFloat(w.toFixed(1)));
    stressVals.push(parseFloat(st.toFixed(1)));
  }

  return {
    labels: days,
    sleep: sleepVals,
    workload: workloadVals,
    stress: stressVals
  };
}
// ---------- CHART ----------
function updateChart() {
const ctx = document.getElementById('trendChart').getContext('2d');
const data = generateTrendData();

if (trendChart) trendChart.destroy();

trendChart = new Chart(ctx, {
type: 'line',
data: {
labels: data.labels,
datasets: [
{ label: 'Sleep', data: data.sleep, borderColor: '#2c9baf' },
{ label: 'Work', data: data.workload, borderColor: '#e68a2e' },
{ label: 'Stress', data: data.stress, borderColor: '#d9534f' }
]
}
});
}

// ---------- MAIN UI ----------
function refreshEntireUI() {
  const contrib = {
  sleep: Math.max(0, Math.round((7 - currentState.sleep) * 5)),
  work: Math.round((currentState.work - 8) * 4),
  activity: Math.round((30 - currentState.activity) * 0.5),
  screen: Math.round((currentState.screen - 6) * 3)
};

document.getElementById('contribList').innerHTML = `
  <div>😴 Sleep Impact: ${contrib.sleep}</div>
  <div>💼 Work Impact: ${contrib.work}</div>
  <div>🏃 Activity Impact: ${contrib.activity}</div>
  <div>📱 Screen Impact: ${contrib.screen}</div>
`;
document.getElementById('sleepValLabel').innerHTML = currentState.sleep + "h";
document.getElementById('workValLabel').innerHTML = currentState.work + "h";
document.getElementById('activityValLabel').innerHTML = currentState.activity + " min";
document.getElementById('screenValLabel').innerHTML = currentState.screen + "h";

document.getElementById('snapshotValues').innerHTML = `     <div>😴 ${currentState.sleep}h</div>     <div>💼 ${currentState.work}h</div>     <div>🏃 ${currentState.activity} min</div>     <div>📱 ${currentState.screen}h</div>
  `;

callBackend();
updateChart();
}


// ---------- EVENTS ----------
function bindEvents() {
const sleep = document.getElementById('sleepSlider');
const work = document.getElementById('workSlider');
const activity = document.getElementById('activitySlider');
const screen = document.getElementById('screenSlider');
const stressSlider = document.getElementById('stressSlider');

function sync() {
currentState.sleep = parseFloat(sleep.value);
currentState.work = parseFloat(work.value);
currentState.activity = parseInt(activity.value);
currentState.screen = parseFloat(screen.value);
const stressSlider = document.getElementById('stressSlider');
currentState.stress = parseFloat(stressSlider.value);

refreshEntireUI();
}

sleep.addEventListener('input', sync);
work.addEventListener('input', sync);
activity.addEventListener('input', sync);
screen.addEventListener('input', sync);

document.getElementById('runSimulateBtn').addEventListener('click', sync);

document.getElementById('resetSlidersBtn').addEventListener('click', () => {
sleep.value = 6.5;
work.value = 10;
activity.value = 35;
screen.value = 7.2;
sync();
});

document.getElementById('downloadReportBtn').addEventListener('click', () => {
const content = `NeuroWell Report
Date: ${new Date()}
Sleep:${currentState.sleep}
Work:${currentState.work}
Activity:${currentState.activity}
Screen:${currentState.screen}`;

```
const blob = new Blob([content], {type:'text/plain'});
const a = document.createElement('a');
a.href = URL.createObjectURL(blob);
a.download = "report.txt";
a.click();
```

});

sync();
}

// ---------- INIT ----------
document.addEventListener('DOMContentLoaded', () => {
document.querySelector('.gauge-progress').style.strokeDasharray = circumference;
bindEvents();
});
