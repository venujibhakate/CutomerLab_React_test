import React, { useState } from "react";
import Modal from "./Modal";

const ALL_OPTIONS = [
  { label: "First Name", value: "first_name" },
  { label: "Last Name", value: "last_name" },
  { label: "Gender", value: "gender" },
  { label: "Age", value: "age" },
  { label: "Account Name", value: "account_name" },
  { label: "City", value: "city" },
  { label: "State", value: "state" },
];

export default function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="page">
      <header className="topbar">View Audience</header>

      <main className="content">
        <button className="saveBtn" onClick={() => setShowModal(true)}>
          Save segment
        </button>
      </main>

      {showModal && (
        <Modal allOptions={ALL_OPTIONS} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
