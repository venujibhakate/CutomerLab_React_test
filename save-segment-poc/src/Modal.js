import React, { useState, useMemo } from "react";

export default function Modal({ onClose, allOptions }) {
  const [segmentName, setSegmentName] = useState("");
  const [primary, setPrimary] = useState("");
  const [schemas, setSchemas] = useState([]);

  const used = useMemo(() => schemas.map((s) => s.value), [schemas]);

  const availableForPrimary = allOptions.filter((o) => !used.includes(o.value));

  function handleAddSchema(e) {
    e.preventDefault();
    if (!primary) return;
    setSchemas((prev) => [...prev, { id: Date.now(), value: primary }]);
    setPrimary("");
  }

  function handleSchemaChange(id, newValue) {
    setSchemas((prev) =>
      prev.map((s) => (s.id === id ? { ...s, value: newValue } : s))
    );
  }

  function handleRemove(id) {
    setSchemas((prev) => prev.filter((s) => s.id !== id));
  }

  function getAvailableForRow(id) {
    const otherUsed = schemas.filter((s) => s.id !== id).map((s) => s.value);
    return allOptions.filter((o) => !otherUsed.includes(o.value));
  }

  async function handleSave() {
    let finalSchemas = [...schemas];
    if (primary) {
      finalSchemas.push({ id: Date.now(), value: primary });
    }

    const schemaArr = finalSchemas.map((s) => {
      const opt = allOptions.find((o) => o.value === s.value);
      return { [s.value]: opt ? opt.label : s.value };
    });

    const data = {
      segment_name: segmentName || "untitled_segment",
      schema: schemaArr
    };

    const WEBHOOK_URL = "http://localhost:5000/proxy";

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        alert("Segment saved successfully!");
        onClose();
      } else {
        alert("Failed to save segment");
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  }

  return (
    <div className="modalBackdrop">
      <div className="modal">
        <div className="modalHeader">
          <button className="backBtn" onClick={onClose}>
            &lt;
          </button>
          <h2>Saving Segment</h2>
        </div>

        <div className="modalBody">
          <label>Enter the Name of the Segment</label>
          <input
            type="text"
            placeholder="Name of the segment"
            value={segmentName}
            onChange={(e) => setSegmentName(e.target.value)}
          />

          <p>
            To save your segment, you need to add the schemas to build the query
          </p>

          <div className="blueBox">
            {schemas.map((s) => (
              <div key={s.id} className="row">
                <div className="dot"></div>
                <select
                  value={s.value}
                  onChange={(e) => handleSchemaChange(s.id, e.target.value)}
                >
                  {getAvailableForRow(s.id).map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <button className="removeBtn" onClick={() => handleRemove(s.id)}>
                  -
                </button>
              </div>
            ))}

            <div className="row">
              <div className="dot neutral"></div>
              <select
                value={primary}
                onChange={(e) => setPrimary(e.target.value)}
              >
                <option value="">Add schema to segment</option>
                {availableForPrimary.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <a href="#" className="addLink" onClick={handleAddSchema}>
            + Add new schema
          </a>
        </div>

        <div className="modalFooter">
          <button className="saveBtn2" onClick={handleSave}>
            Save the Segment
          </button>
          <button className="cancelBtn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
