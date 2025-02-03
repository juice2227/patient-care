import React from "react";
import { jsPDF } from "jspdf";

const PrescriptionPDF = ({ prescription }) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Prescription", 20, 20);
    doc.setFontSize(12);
    doc.text(`Medicine: ${prescription.medicine}`, 20, 30);
    doc.text(`Dosage: ${prescription.dosage}`, 20, 40);
    doc.text(`Instructions: ${prescription.instructions}`, 20, 50);
    doc.text(`Date: ${new Date(prescription.dateTime).toLocaleString()}`, 20, 60);

    doc.save("prescription.pdf");
  };

  return (
    <div>
      <button onClick={generatePDF}>Download Prescription as PDF</button>
    </div>
  );
};

export default PrescriptionPDF;
