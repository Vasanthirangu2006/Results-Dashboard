import React, { useState } from "react";
import * as XLSX from "xlsx";
import "./StudentDetails.css"; // ✅ Import your CSS

function StudentDetails({ branch, semester, onBack }) {
  const [hallTicket, setHallTicket] = useState("");
  const [studentData, setStudentData] = useState(null);

  const handleSearch = async () => {
    const filePath = `/data/${branch}-${semester}.xlsx`;
    const response = await fetch(filePath);
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: "array" });
    const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { defval: "" });

    const idKey = Object.keys(sheet[0]).find((key) => key.toLowerCase().includes("ht"));
    const student = sheet.find((row) => String(row[idKey]).trim().toLowerCase() === hallTicket.trim().toLowerCase());

    setStudentData(student || null);
  };

  return (
    <div className="dashboard-container">
      <h2>VVIT RESULTS DASHBOARD</h2>

      <div className="input-group">
        <input
          type="text"
          placeholder="Enter Hall Ticket Number"
          value={hallTicket}
          onChange={(e) => setHallTicket(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={onBack}>Back</button>
      </div>

      {studentData && (
        <div className="student-card">
          <div className="flex-pair">
          <h3><span className="ans"> { studentData. Name} </span></h3>
          <p><span className="ans"><b>{hallTicket}</b></span></p></div>
          <div className="flex-pair-two">
          <p><strong className="ans">Branch:</strong> <span className="ans"><b>{branch}</b></span></p>
          <p><strong className="ans">Semester:</strong> <span className="ans"><b>{semester}</b></span></p></div>

          <table className="results-table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Grade</th>
                <th>Credits</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(studentData)
                .filter(([key]) => key.includes("-G"))
                .map(([key, grade]) => {
                  const subject = key.replace("-G", "");
                  const credits = studentData[`${subject}-C`] || "-";
                  return (
                    <tr key={subject}>
                      <td>{subject}</td>
                      <td>{grade}</td>
                      <td>{credits}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>

          <div className="summary">
            <p><strong>SGPA:</strong> {studentData.SGPA}</p>
            <p><strong>Result:</strong> {studentData.RES}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentDetails;
