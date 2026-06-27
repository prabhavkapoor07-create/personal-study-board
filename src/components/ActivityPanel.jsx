import { useMemo } from 'react';
import { todayStr, fmtDate, getDayData, buildHbarData } from '../state/dateUtils';

export default function ActivityPanel({ active, state, actDate, setActDate }) {
  const day = useMemo(() => getDayData(actDate, state.history, state.taskLog), [actDate, state.history, state.taskLog]);
  const hbars = useMemo(() => buildHbarData(state.history, state.streakThresh), [state.history, state.streakThresh]);

  const activeDays = Object.keys(state.history).filter((k) => state.history[k] > 0).length;

  return (
    <div className={'panel' + (active ? ' active' : '')} id="panel-activity">
      <div className="task-card" style={{ padding: '20px 22px' }}>
        <div className="section-head" style={{ marginBottom: 14 }}>
          <h2 className="display" style={{ fontSize: '1.1rem' }}>Day Lookup</h2>
        </div>
        <div className="date-search">
          <input type="date" value={actDate} onChange={(e) => setActDate(e.target.value)} />
          <button className="btn btn-ghost" onClick={() => setActDate(todayStr())}>Today</button>
        </div>
        <div id="day-content">
          <div className="day-stats">
            <div className="day-stat">
              <div className="ds-l">DATE</div>
              <div className="ds-v" style={{ fontSize: 14, marginTop: 4 }}>{fmtDate(actDate)}</div>
            </div>
            <div className="day-stat"><div className="ds-l">MANGOES</div><div className="ds-v">{day.mg} 🥭</div></div>
            <div className="day-stat"><div className="ds-l">TASKS</div><div className="ds-v">{day.logs.length}</div></div>
            <div className="day-stat"><div className="ds-l">STREAK</div><div className="ds-v">{day.mg >= state.streakThresh ? '✅' : '❌'}</div></div>
          </div>
          {day.logs.length ? (
            <div className="task-log">
              {day.logs.map((l, i) => (
                <div className="tlog-item" key={i}>
                  <span className="tl-check">✓</span>
                  <span className="tl-text">
                    {l.text}
                    {l.category && <span style={{ color: 'var(--ink-faint)', fontSize: 11 }}> [{l.category}]</span>}
                  </span>
                  {l.time && <span className="tl-time">{l.time}</span>}
                  <span className="tl-mg">{l.mango} 🥭</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty">{day.isToday ? 'No tasks done yet today. Go earn those mangoes! 🥭' : 'No activity recorded.'}</div>
          )}
        </div>
      </div>

      <div className="task-card" style={{ padding: '20px 22px', marginTop: 14 }}>
        <div className="section-head" style={{ marginBottom: 14 }}>
          <h2 className="display" style={{ fontSize: '1.1rem' }}>Last 7 Days</h2>
        </div>
        <div id="hbars">
          {hbars.map((v, i) => (
            <div className="hbar-row" key={i}>
              <div className="hbar-label">{v.label}</div>
              <div className="hbar-track"><div className="hbar-fill" style={{ width: v.pct + '%' }}></div></div>
              <div className="hbar-val">{v.mg}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="task-card" style={{ padding: '20px 22px', marginTop: 14 }}>
        <div className="section-head" style={{ marginBottom: 14 }}>
          <h2 className="display" style={{ fontSize: '1.1rem' }}>All-Time Stats</h2>
        </div>
        <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
          <div className="stat-card"><div className="lab">Total Mangoes</div><div className="num mono">{state.mangoes}</div></div>
          <div className="stat-card"><div className="lab">Active Days</div><div className="num mono">{activeDays}</div></div>
          <div className="stat-card"><div className="lab">Tasks Done</div><div className="num mono">{state.totalTasksDone}</div></div>
          <div className="stat-card"><div className="lab">Best Streak</div><div className="num mono">{state.bestStreak}</div></div>
        </div>
      </div>
    </div>
  );
}
