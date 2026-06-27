// Pure date/derived-data helpers — direct ports of the same-named
// functions from the original index.html, just without DOM access.

export function todayStr() {
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

export function localKey(d) {
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

export function fmtDate(s) {
  return new Date(s + 'T00:00:00').toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

export function fmtToday() {
  return new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

// Builds the 52-week heatmap grid — same Sunday-aligned windowing logic
// as the original buildHeatmap(), just returning data instead of touching the DOM.
export function buildHeatmapCells(history, streakThresh) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const currentWeekSunday = new Date(today);
  currentWeekSunday.setDate(today.getDate() - today.getDay());

  const startDate = new Date(currentWeekSunday);
  startDate.setDate(currentWeekSunday.getDate() - 52 * 7);
  startDate.setDate(startDate.getDate() + 7);

  const cells = [];
  const d = new Date(startDate);
  while (d <= today) {
    const key = localKey(d);
    const mg = history[key] || 0;
    let cls = 'hm-0';
    if (mg > 0 && mg < streakThresh * 0.25) cls = 'hm-1';
    else if (mg >= streakThresh * 0.25 && mg < streakThresh * 0.5) cls = 'hm-2';
    else if (mg >= streakThresh * 0.5 && mg < streakThresh) cls = 'hm-3';
    else if (mg >= streakThresh) cls = 'hm-4';
    cells.push({ key, mg, cls, dow: d.getDay() });
    d.setDate(d.getDate() + 1);
  }

  const totalDays = cells.length;
  const totalWeeks = Math.ceil((startDate.getDay() + totalDays) / 7);

  const monthLabels = [];
  let lastMonth = -1;
  for (let w = 0; w < totalWeeks; w++) {
    const wd = new Date(startDate);
    wd.setDate(startDate.getDate() + w * 7);
    if (wd > today) break;
    const m = wd.getMonth();
    if (m !== lastMonth) {
      monthLabels.push({ col: w + 1, label: wd.toLocaleString('default', { month: 'short' }) });
      lastMonth = m;
    }
  }

  return { cells, totalWeeks, monthLabels };
}

// Last-7-days bar data — direct port of buildHbars()'s math.
export function buildHbarData(history, streakThresh) {
  const today = new Date();
  const vals = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (6 - i));
    return { key: localKey(d), label: i === 6 ? 'Today' : d.toLocaleDateString('default', { weekday: 'short' }) };
  });
  const maxMg = Math.max(...vals.map((v) => history[v.key] || 0), streakThresh, 1);
  return vals.map((v) => {
    const mg = history[v.key] || 0;
    return { label: v.label, mg, pct: Math.round((mg / maxMg) * 100) };
  });
}

// Direct port of loadDay()'s data-gathering half (rendering moved to the component).
export function getDayData(date, history, taskLog) {
  return {
    mg: history[date] || 0,
    logs: taskLog[date] || [],
    isToday: date === todayStr(),
  };
}
