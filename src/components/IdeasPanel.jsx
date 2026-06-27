import { useState } from 'react';

export default function IdeasPanel({ active, state, actions }) {
  const [text, setText] = useState('');

  const handleAdd = () => {
    const t = text.trim();
    if (!t) return;
    actions.addIdea(t);
    setText('');
  };

  return (
    <div className={'panel' + (active ? ' active' : '')} id="panel-ideas">
      <div className="task-card">
        <div id="ideas-list">
          {state.ideas.length === 0 ? (
            <div className="empty">No ideas yet. Brain dump here! 💡</div>
          ) : (
            state.ideas.map((i) => (
              <div key={i.id} className={'todo-item fade-in' + (i.done ? ' done' : '')}>
                <div className={'todo-check' + (i.done ? ' checked' : '')} onClick={() => actions.toggleIdea(i.id)}>
                  <svg viewBox="0 0 10 10"><polyline points="1.5,5 4,7.5 8.5,2.5" /></svg>
                </div>
                <span className="todo-text">{i.text}</span>
                <button className="todo-del" title="Delete" onClick={() => actions.deleteIdea(i.id)}>×</button>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="add-area">
        <div className="add-row1" style={{ marginBottom: 0 }}>
          <input
            type="text"
            placeholder="Note down an idea or reminder for later..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          />
          <button className="btn btn-mango" onClick={handleAdd}>+ Add Note</button>
        </div>
      </div>
    </div>
  );
}
