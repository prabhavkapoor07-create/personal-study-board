export default function SettingsPanel({ active, state, actions, syncStatus, forceSave, showToast }) {
  const handleThreshChange = (e) => {
    const newVal = parseInt(e.target.value, 10);
    if (isNaN(newVal) || newVal === state.streakThresh) return;
    if (window.confirm('Warning: Changing the daily mango target will reset your current streak to 0. Do you want to proceed?')) {
      actions.updateStreakThresh(newVal);
    } else {
      e.target.value = state.streakThresh; // revert, same as the original
    }
  };

  const handleForceSave = async () => {
    const msg = await forceSave();
    showToast(msg);
  };

  const handleReset = () => {
    if (!window.confirm('Reset ALL data? This cannot be undone.')) return;
    actions.resetAll();
    showToast('Board reset.');
  };

  const syncDotColor = {
    live: '#2ecc71',
    saving: '#f1c40f',
    error: '#e74c3c',
    connecting: 'var(--ink-faint)',
  }[syncStatus] || 'var(--ink-faint)';

  const syncLabel = {
    live: 'Synced — changes save automatically',
    saving: 'Saving…',
    error: 'Sync error — check connection',
    connecting: 'Connecting…',
  }[syncStatus] || 'Connecting…';

  return (
    <div className={'panel' + (active ? ' active' : '')} id="panel-settings">
      <div className="task-card" style={{ padding: '20px 22px' }}>
        <div className="section-head" style={{ marginBottom: 14 }}>
          <h2 className="display" style={{ fontSize: '1.1rem' }}>Cloud Sync</h2>
        </div>
        <div className="sync-status">
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: syncDotColor, display: 'inline-block' }}></span>
          <span>{syncLabel}</span>
          <button className="btn btn-ghost" style={{ marginLeft: 'auto' }} onClick={handleForceSave}>Force Sync Now</button>
        </div>
        <div style={{ fontSize: '.78rem', color: 'var(--ink-faint)', marginTop: 10, lineHeight: 1.5 }}>
          Your data syncs automatically to Firebase in real time — open this app on any device and it will stay up to date.
        </div>
      </div>

      <div className="task-card" style={{ padding: '20px 22px', marginTop: 14 }}>
        <div className="section-head" style={{ marginBottom: 4 }}>
          <h2 className="display" style={{ fontSize: '1.1rem' }}>Streak Settings</h2>
        </div>
        <div className="setting-row">
          <div>
            <div className="s-label">Daily mango target</div>
            <div className="s-desc">Mangoes needed per day to keep streak alive</div>
          </div>
          <input type="number" min="1" max="100" defaultValue={state.streakThresh} key={state.streakThresh} onBlur={handleThreshChange} />
        </div>
      </div>

      <div className="task-card" style={{ padding: '20px 22px', marginTop: 14 }}>
        <div className="section-head" style={{ marginBottom: 4 }}>
          <h2 className="display" style={{ fontSize: '1.1rem' }}>Display</h2>
        </div>
        <div className="setting-row">
          <div>
            <div className="s-label">Show heatmap</div>
            <div className="s-desc">Activity grid on main page</div>
          </div>
          <div className={'toggle' + (state.showHeatmap ? ' on' : '')} onClick={() => actions.toggleSetting('showHeatmap')}></div>
        </div>
        <div className="setting-row">
          <div><div className="s-label">Show streak badge</div></div>
          <div className={'toggle' + (state.showStreak ? ' on' : '')} onClick={() => actions.toggleSetting('showStreak')}></div>
        </div>
      </div>

      <div className="task-card" style={{ padding: '20px 22px', marginTop: 14 }}>
        <div className="section-head" style={{ marginBottom: 10 }}>
          <h2 className="display" style={{ fontSize: '1.1rem' }}>Custom Categories</h2>
        </div>
        <div id="ctypes">
          {state.customTypes.map((c, i) => (
            <div className="ctype-row" key={i}>
              <input
                value={c.name}
                placeholder="Category name"
                style={{ flex: 1 }}
                onChange={(e) => actions.updateCType(i, 'name', e.target.value)}
              />
              <input
                type="number"
                value={c.mango}
                min="1"
                max="99"
                placeholder="🥭"
                style={{ width: 70 }}
                onChange={(e) => actions.updateCType(i, 'mango', +e.target.value)}
              />
              <button className="del-btn" onClick={() => actions.deleteCType(i)}>×</button>
            </div>
          ))}
        </div>
        <button className="btn btn-ghost" style={{ marginTop: 6 }} onClick={actions.addCType}>+ Add Category</button>
      </div>

      <div className="task-card" style={{ padding: '20px 22px', marginTop: 14 }}>
        <div className="section-head" style={{ marginBottom: 10 }}>
          <h2 className="display" style={{ fontSize: '1.1rem' }}>Danger Zone</h2>
        </div>
        <button className="btn danger-btn" onClick={handleReset}>Reset Everything</button>
      </div>
    </div>
  );
}
