import React, { useState } from "react";
import "./Form.css";

const Form: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <form className="form-container">
      {/* ---------- 1st DIV ---------- */}
      <div className="section two-column">
        
        {/* LEFT COLUMN */}
        <div className="column">
          
          {/* Image Upload */}
          <div className="image-upload">
            <label htmlFor="fileInput" className="image-circle">
              {imagePreview ? (
                <img src={imagePreview} alt="preview" />
              ) : (
                <span>Upload</span>
              )}
            </label>
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />
          </div>

          {/* Name Fields */}
          <div className="row">
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="column">
          <h3>Address</h3>

          <div className="row">
            <input type="text" placeholder="Street No" />
            <input type="text" placeholder="City" />
          </div>

          <input type="text" placeholder="Country" />
        </div>
      </div>

      {/* ---------- 2nd DIV (3 Columns) ---------- */}
      <div className="section three-column">
        <input type="text" placeholder="Phone Number" />
        <input type="email" placeholder="Email" />
        <input type="date" placeholder="DOB" />
      </div>

      {/* ---------- 3rd DIV ---------- */}
      <div className="section two-column">
        <div className="column">
          <h3>Security</h3>
          <input type="password" placeholder="Password" />
        </div>

        <div className="column">
          <h3>&nbsp;</h3>
          <input type="password" placeholder="Confirm Password" />
        </div>
      </div>

      {/* ---------- FINAL DIV ---------- */}
      <div className="section">
        <select>
          <option value="">Select Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <button type="submit" className="button-team">Submit</button>
    </form>
  );
};

export default Form;