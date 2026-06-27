import { useState } from 'react';

export default function TodoPanel({ active, state, actions, showToast }) {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('');
  const [customMango, setCustomMango] = useState('');
  const [pri, setPri] = useState('med');

  const handleAdd = () => {
    const t = text.trim();
    if (!t) return;
    actions.addTask(t, category, customMango, pri);
    setText('');
    setCustomMango('');
  };

  const handleToggle = (t) => {
    if (!t.done) showToast('+' + t.mango + ' 🥭');
    actions.toggleTask(t.id);
  };

  return (
    <div className={'panel' + (active ? ' active' : '')} id="panel-todo">
      <div className="task-card">
        <div id="todo-list">
          {state.todos.length === 0 ? (
            <div className="empty">No tasks yet — add one below 🥭</div>
          ) : (
            state.todos.map((t) => {
              const priClass = t.pri === 'high' ? 'tag-pri-high' : t.pri === 'low' ? 'tag-pri-low' : 'tag-pri-med';
              return (
                <div key={t.id} className={'todo-item fade-in' + (t.done ? ' done' : '')}>
                  <div className={'todo-check' + (t.done ? ' checked' : '')} onClick={() => handleToggle(t)}>
                    <svg viewBox="0 0 10 10"><polyline points="1.5,5 4,7.5 8.5,2.5" /></svg>
                  </div>
                  <span className="todo-text">{t.text}</span>
                  <div className="todo-tags">
                    {t.category && <span className="tag tag-category">{t.category}</span>}
                    <span className={'tag ' + priClass}>{t.pri}</span>
                    <span className="tag tag-mango">{t.mango} 🥭</span>
                  </div>
                  <button className="todo-del" title="Delete" onClick={() => actions.deleteTask(t.id)}>×</button>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="add-area">
        <div className="add-row1">
          <input
            type="text"
            placeholder="Add a task..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          />
        </div>
        <div className="add-row2">
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select Category...</option>
            {state.customTypes.map((c) => (
              <option key={c.name} value={c.name}>{c.name} ({c.mango} 🥭)</option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Custom 🥭 (Optional)"
            min="1"
            value={customMango}
            onChange={(e) => setCustomMango(e.target.value)}
          />
          <select value={pri} onChange={(e) => setPri(e.target.value)}>
            <option value="med">Medium priority</option>
            <option value="high">High priority</option>
            <option value="low">Low priority</option>
          </select>
          <button className="btn btn-mango" onClick={handleAdd}>+ Add Task</button>
        </div>
      </div>
    </div>
  );
}
