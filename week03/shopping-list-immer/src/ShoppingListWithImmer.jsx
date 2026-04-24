import { useImmer } from "use-immer";
import { useState } from "react";
import "./style.css";

export default function ShoppingListWithImmer() {
  const [state, updateState] = useImmer({
    viewMode: "edit",
    form: {
      name: "",
      quantity: 1,
      category: "",
      notes: "",
    },
    items: [],
  });

  const [editingNoteId, setEditingNoteId] = useState(null);
  const [tempNote, setTempNote] = useState("");

  const isLocked = state.viewMode === "view";

  /* =========================
     TOGGLE VIEW MODE
  ========================= */
  const toggleViewMode = () => {
    updateState((draft) => {
      draft.viewMode = draft.viewMode === "edit" ? "view" : "edit";
    });
  };

  /* =========================
     FORM UPDATE
  ========================= */
  const updateForm = (field, value) => {
    updateState((draft) => {
      draft.form[field] = value;
    });
  };

  /* =========================
     ADD ITEM
  ========================= */
  const addItem = () => {
    if (!state.form.name.trim()) return;

    updateState((draft) => {
      draft.items.push({
        id: Date.now(),
        name: draft.form.name,
        quantity: Number(draft.form.quantity),
        details: {
          category: draft.form.category,
          notes: draft.form.notes,
        },
      });

      draft.form.name = "";
      draft.form.quantity = 1;
      draft.form.category = "";
      draft.form.notes = "";
    });
  };

  /* =========================
     REMOVE ITEM
  ========================= */
  const removeItem = (id) => {
    updateState((draft) => {
      const index = draft.items.findIndex((i) => i.id === id);
      if (index !== -1) draft.items.splice(index, 1);
    });
  };

  /* =========================
     NOTES EDIT FLOW
  ========================= */
  const startEditNote = (item) => {
    setEditingNoteId(item.id);
    setTempNote(item.details.notes);
  };

  const saveNote = (id) => {
    updateState((draft) => {
      const item = draft.items.find((i) => i.id === id);
      if (item) item.details.notes = tempNote;
    });

    setEditingNoteId(null);
    setTempNote("");
  };

  return (
    <div className="page">
      {/* ================= LEFT PANEL ================= */}
      <div className="panel">
        <div className="header">
          <h2>🛒 Shopping List</h2>

          <button className="button" onClick={toggleViewMode}>
            {state.viewMode === "edit" ? "🔒 Lock" : "🔓 Unlock"}
          </button>
        </div>

        <p className="modeText">
          Mode: <b>{state.viewMode.toUpperCase()}</b>
        </p>

        {/* ================= FORM ================= */}
        <div className="card">
          <h3>Add Item</h3>

          <input
            className="input"
            placeholder="Item name"
            value={state.form.name}
            disabled={isLocked}
            onChange={(e) => updateForm("name", e.target.value)}
          />

          <input
            className="input"
            type="number"
            placeholder="Quantity"
            value={state.form.quantity}
            disabled={isLocked}
            onChange={(e) => updateForm("quantity", e.target.value)}
          />

          <input
            className="input"
            placeholder="Category"
            value={state.form.category}
            disabled={isLocked}
            onChange={(e) => updateForm("category", e.target.value)}
          />

          <input
            className="input"
            placeholder="Notes"
            value={state.form.notes}
            disabled={isLocked}
            onChange={(e) => updateForm("notes", e.target.value)}
          />

          <button className="addBtn" onClick={addItem} disabled={isLocked}>
            ➕ Add Item
          </button>
        </div>

        {/* ================= LIST ================= */}
        <div className="list">
          {state.items.length === 0 && (
            <p className="empty">No items yet. Add something 👆</p>
          )}

          {state.items.map((item) => (
            <div key={item.id} className="item">
              <div>
                <h3>
                  {item.name} ({item.quantity})
                </h3>

                <p>📦 {item.details.category || "No category"}</p>

                {/* READ ONLY DISPLAY */}
                <p>📝 {item.details.notes || "No notes"}</p>

                {/* EDIT NOTES */}
                {editingNoteId === item.id ? (
                  <div>
                    <input
                      className="input"
                      value={tempNote}
                      onChange={(e) => setTempNote(e.target.value)}
                    />

                    <button
                      className="smallBtn"
                      onClick={() => saveNote(item.id)}
                    >
                      Save
                    </button>

                    <button
                      className="smallBtn"
                      onClick={() => setEditingNoteId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    className="smallBtn"
                    onClick={() => startEditNote(item)}
                    disabled={isLocked}
                  >
                    ✏️ Edit Notes
                  </button>
                )}
              </div>

              <button
                className="deleteBtn"
                onClick={() => removeItem(item.id)}
                disabled={isLocked}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ================= RIGHT PANEL ================= */}
      <div className="jsonPanel">
        <h2>📊 Live State Viewer</h2>

        <p className="subtitle">
          Real-time Immer state (form + items + UI mode)
        </p>

        <pre className="json">{JSON.stringify(state, null, 2)}</pre>
      </div>
    </div>
  );
}
