import React, { useState } from "react";
import PdfViewerComponent from "./components/PdfViewerComponent";

const App = () => {
  const [showPdf, setShowPdf] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");

  const handleToggleClick = () => {
    if (pdfUrl) {
      setShowPdf(!showPdf);
    } else {
      alert("Please upload a PDF file first!");
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setPdfUrl(fileUrl);
      console.log(fileUrl);  // Use console.log instead of alert
    }
  };

  return (
    <div style={{ width: "100%", height: "100vh", padding: 0, margin: 0 }}>
      <div style={{ marginBottom: "20px", padding: "20px" }}>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileUpload}
        />
        <button onClick={handleToggleClick} style={{ marginLeft: "10px" }}>
          {showPdf ? "Hide PDFs" : "Show PDFs"}
        </button>
      </div>
      {showPdf && pdfUrl && (
        <div style={{ width: "100%", height: "calc(100vh - 60px)" }}>
          <PdfViewerComponent document={pdfUrl} />
        </div>
      )}
    </div>
  );
};

export default App;
