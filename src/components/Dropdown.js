import React from "react";

const Dropdown = ({ onInsertBefore, onInsertAfter }) => {
  return (
    <div
      style={{
        position: "absolute",
        background: "#fff",
        border: "1px solid #ccc",
        padding: "10px",
      }}
    >
      <button onClick={onInsertBefore} style={{ display: "block", marginBottom: "5px" }}>
        Insert Polygon Before
      </button>
      <button onClick={onInsertAfter} style={{ display: "block" }}>
        Insert Polygon After
      </button>
    </div>
  );
};

export default Dropdown;
