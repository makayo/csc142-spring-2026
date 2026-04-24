import { useImmer } from "use-immer";
import { useState } from "react";

export default function ShoppingListWithImmer() {
  const [shoppingList, updateShoppingList] = useImmer([]);

  const [form, setForm] = useState({
    name: "",
    quantity: 1,
    category: "",
    notes: "",
  });

  const addItem = () => {
    if (!form.name.trim()) return;

    updateShoppingList((draft) => {
      draft.push({
        id: Date.now(),
        name: form.name,
        quantity: Number(form.quantity),
        details: {
          category: form.category,
          notes: form.notes,
        },
      });
    });

    setForm({ name: "", quantity: 1, category: "", notes: "" });
  };

  const removeItem = (id) => {
    updateShoppingList((draft) => {
      const index = draft.findIndex((i) => i.id === id);
      if (index !== -1) draft.splice(index, 1);
    });
  };

  const updateNotes = (id, notes) => {
    updateShoppingList((draft) => {
      const item = draft.find((i) => i.id === id);
      if (item) item.details.notes = notes;
    });
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>🛒 Shopping List</h1>

      {/* FORM */}
      <div style={styles.card}>
        <input
          style={styles.input}
          placeholder="Item name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          style={styles.input}
          type="number"
          placeholder="Qty"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
        />

        <input
          style={styles.input}
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <input
          style={styles.input}
          placeholder="Notes"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />

        <button style={styles.addBtn} onClick={addItem}>
          ➕ Add Item
        </button>
      </div>

      {/* LIST */}
      <div style={styles.list}>
        {shoppingList.length === 0 && (
          <p style={styles.empty}>No items yet. Add something 👆</p>
        )}

        {shoppingList.map((item) => (
          <div key={item.id} style={styles.item}>
            <div>
              <h3 style={styles.itemTitle}>
                {item.name} <span>({item.quantity})</span>
              </h3>

              <p style={styles.meta}>
                📦 {item.details.category || "No category"}
              </p>

              <p style={styles.meta}>📝 {item.details.notes || "No notes"}</p>
            </div>

            <div style={styles.actions}>
              <button
                style={styles.smallBtn}
                onClick={() =>
                  updateNotes(
                    item.id,
                    prompt("Update notes:", item.details.notes),
                  )
                }
              >
                Edit
              </button>

              <button
                style={styles.deleteBtn}
                onClick={() => removeItem(item.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 🎨 Simple clean styling */
const styles = {
  page: {
    fontFamily: "Arial",
    maxWidth: "600px",
    margin: "40px auto",
    padding: "20px",
  },
  title: {
    textAlign: "center",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    marginBottom: "20px",
  },
  input: {
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  addBtn: {
    padding: "10px",
    background: "#2ecc71",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px",
    border: "1px solid #eee",
    borderRadius: "8px",
  },
  itemTitle: {
    margin: 0,
  },
  meta: {
    margin: "4px 0",
    color: "#555",
    fontSize: "14px",
  },
  actions: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  smallBtn: {
    padding: "5px 8px",
    cursor: "pointer",
  },
  deleteBtn: {
    padding: "5px 8px",
    background: "#e74c3c",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  empty: {
    textAlign: "center",
    color: "#888",
  },
};
