const TABS = [
  { key: 'todo', label: 'To-Do' },
  { key: 'ideas', label: 'Ideas' },
  { key: 'activity', label: 'Activity' },
  { key: 'settings', label: 'Settings' },
];

export default function Tabs({ current, onChange }) {
  return (
    <div className="tabs">
      {TABS.map((t) => (
        <button
          key={t.key}
          className={'tab display' + (current === t.key ? ' active' : '')}
          onClick={() => onChange(t.key)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
