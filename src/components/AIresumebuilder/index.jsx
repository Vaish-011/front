import React, { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const AIResumeBuilder = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    summary: "",
    experience: "",
    education: "",
    skills: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const downloadResume = () => {
    const resume = document.getElementById("resume-preview");
    html2canvas(resume).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
      pdf.save("resume.pdf");
    });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">AI Resume Builder</h1>

      <div className="grid gap-4 mb-6">
        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} className="border p-2 w-full" />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full" />
        <input type="text" name="phone" placeholder="Phone" onChange={handleChange} className="border p-2 w-full" />
        <textarea name="summary" placeholder="Summary" onChange={handleChange} className="border p-2 w-full"></textarea>
        <textarea name="experience" placeholder="Work Experience" onChange={handleChange} className="border p-2 w-full"></textarea>
        <textarea name="education" placeholder="Education" onChange={handleChange} className="border p-2 w-full"></textarea>
        <textarea name="skills" placeholder="Skills (comma-separated)" onChange={handleChange} className="border p-2 w-full"></textarea>
      </div>

      <button onClick={downloadResume} className="bg-blue-500 text-white p-2 rounded w-full">
        Download Resume
      </button>

      {/* Resume Preview */}
      <div id="resume-preview" className="mt-6 p-4 border rounded bg-white shadow">
        <h2 className="text-xl font-bold">{formData.name}</h2>
        <p>{formData.email} | {formData.phone}</p>
        <h3 className="mt-2 font-semibold">Summary</h3>
        <p>{formData.summary}</p>
        <h3 className="mt-2 font-semibold">Work Experience</h3>
        <p>{formData.experience}</p>
        <h3 className="mt-2 font-semibold">Education</h3>
        <p>{formData.education}</p>
        <h3 className="mt-2 font-semibold">Skills</h3>
        <p>{formData.skills}</p>
      </div>
    </div>
  );
};

export default AIResumeBuilder;