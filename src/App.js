import React, { useState } from "react";
import BranchSemesterSelector from "./components/BranchSemesterSelector";
import StudentDetails from "./components/StudentDetails";

function App() {
  const [branch, setBranch] = useState(null);
  const [semester, setSemester] = useState(null);

  const handleBack = () => {
    setBranch(null);
    setSemester(null);
  };

  return (
    <div className="App">
      {!branch || !semester ? (
        <BranchSemesterSelector
          onBranchSelect={setBranch}
          onSemesterSelect={setSemester}
        />
      ) : (
        <StudentDetails
          branch={branch}
          semester={semester}
          onBack={handleBack}
        />
      )}
    </div>
  );
}

export default App;
