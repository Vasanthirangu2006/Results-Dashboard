import React, { useState } from "react";
import "./BranchSemesterSelector.css";

const branches = ["AID","AIM","CIC","CIV","CSE", "CSM","CSO","ECE", "EEE","INF","MECH"];
const semesters = ["1-1", "1-2", "2-1", "2-2", "3-1","3-2"];


function BranchSemesterSelector({ onBranchSelect, onSemesterSelect }) {
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");

  const handleProceed = () => {
    if (branch && semester) {
      onBranchSelect(branch);
      onSemesterSelect(semester);
    } else {
      alert("Please select both branch and semester.");
    }
  };

  return (
    <div className="selector-page">
      <div className="selector-card">
        <img src="https://www.bing.com/th/id/OIP.Fjp-7-IDsjOyf9IpWkyntAHaHa?w=204&h=211&c=8&rs=1&qlt=90&o=6&cb=12&dpr=1.3&pid=3.1&rm=2" alt="VVIT Logo"  className="logo" />
        <h2>VVIT RESULTS DASHBOARD</h2>

        <div className="dropdown-group">
          <label>
            Branch:
            <select value={branch} onChange={(e) => setBranch(e.target.value)}>
              <option value="">Choose Branch</option>
              {branches.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </label>

          <label>
            Semester:
            <select value={semester} onChange={(e) => setSemester(e.target.value)}>
              <option value="">Choose Semester</option>
              {semesters.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </label>
        </div>

        <button onClick={handleProceed}>Proceed</button>
      </div>
    </div>
  );
}

export default BranchSemesterSelector;