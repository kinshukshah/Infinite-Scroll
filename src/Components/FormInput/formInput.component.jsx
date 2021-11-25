import React from "react";
import "./formInput.style.css";
function FormInput({ label, ...props }) {
  return (
    <div className="input-label">
      <input className="form-input" id={label} {...props}></input>
    </div>
  );
}

export default FormInput;
