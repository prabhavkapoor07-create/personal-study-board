import { useState } from 'react';
import { todayStr } from '../state/dateUtils';
import StatsGrid from './StatsGrid';
import HeatmapSection from './HeatmapSection';
import Tabs from './Tabs';
import TodoPanel from './TodoPanel';
import IdeasPanel from './IdeasPanel';
import ActivityPanel from './ActivityPanel';
import SettingsPanel from './SettingsPanel';
import Footer from './Footer';

export default function Dashboard({ state, actions, syncStatus, forceSave, showToast }) {
  const [currentTab, setCurrentTab] = useState('todo');
  const [actDate, setActDate] = useState(todayStr());

  const handleCellClick = (key) => {
    setActDate(key);
    setCurrentTab('activity');
  };

  return (
    <div id="dashboard" style={{ display: 'block' }}>
      <div className="section" style={{ paddingTop: 0 }}>
        <div className="date-line mono">
          {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
        <StatsGrid state={state} />
      </div>

      <HeatmapSection state={state} onCellClick={handleCellClick} />

      <div className="section" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <h2 className="display">Today's Tasks</h2>
        </div>
        <Tabs current={currentTab} onChange={setCurrentTab} />

        <TodoPanel active={currentTab === 'todo'} state={state} actions={actions} showToast={showToast} />
        <IdeasPanel active={currentTab === 'ideas'} state={state} actions={actions} />
        <ActivityPanel active={currentTab === 'activity'} state={state} actDate={actDate} setActDate={setActDate} />
        <SettingsPanel
          active={currentTab === 'settings'}
          state={state}
          actions={actions}
          syncStatus={syncStatus}
          forceSave={forceSave}
          showToast={showToast}
        />

        <Footer />
      </div>
    </div>
  );
}
