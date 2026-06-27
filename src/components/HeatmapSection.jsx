import { useMemo } from 'react';
import { buildHeatmapCells } from '../state/dateUtils';

export default function HeatmapSection({ state, onCellClick }) {
  const { cells, totalWeeks, monthLabels } = useMemo(
    () => buildHeatmapCells(state.history, state.streakThresh),
    [state.history, state.streakThresh]
  );

  if (!state.showHeatmap) return null;

  return (
    <div className="section" style={{ paddingTop: 0 }}>
      <div className="section-head">
        <h2 className="display">The Orchard — Last 12 Months</h2>
        <span className="sub">Every square is a day you showed up</span>
      </div>
      <div className="heat-card">
        <div id="hm-months" style={{ gridTemplateColumns: `repeat(${totalWeeks},1fr)` }}>
          {monthLabels.map((m) => (
            <span key={m.col} style={{ gridColumnStart: m.col }}>{m.label}</span>
          ))}
        </div>
        <div id="hm-grid" style={{ gridTemplateColumns: `repeat(${totalWeeks},1fr)` }}>
          {cells.map((c) => (
            <div
              key={c.key}
              className={'hm-cell ' + c.cls}
              title={c.key + ': ' + c.mg + ' 🥭'}
              onClick={() => onCellClick(c.key)}
            />
          ))}
        </div>
        <div className="heat-legend">
          <span>Less</span>
          <span className="sq" style={{ background: 'var(--parchment-2)' }}></span>
          <span className="sq" style={{ background: '#E8C898' }}></span>
          <span className="sq" style={{ background: 'var(--mango)' }}></span>
          <span className="sq" style={{ background: 'var(--mango-deep)' }}></span>
          <span className="sq" style={{ background: 'var(--leaf-deep)' }}></span>
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
