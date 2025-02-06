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

  const clearForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      summary: "",
      experience: "",
      education: "",
      skills: "",
    });
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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-black flex flex-col items-center p-6">
      <div className="max-w-4xl w-full bg-gray-800 bg-opacity-95 p-8 rounded-lg shadow-2xl">
        <h1 className="text-5xl font-extrabold text-center text-white mb-8">
          
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-4">
              Enter Your Details
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                placeholder="Full Name"
                onChange={handleChange}
                className="w-full bg-gray-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="Email"
                onChange={handleChange}
                className="w-full bg-gray-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                placeholder="Phone"
                onChange={handleChange}
                className="w-full bg-gray-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <textarea
                name="summary"
                value={formData.summary}
                placeholder="Summary"
                onChange={handleChange}
                className="w-full bg-gray-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              ></textarea>
              <textarea
                name="experience"
                value={formData.experience}
                placeholder="Work Experience"
                onChange={handleChange}
                className="w-full bg-gray-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              ></textarea>
              <textarea
                name="education"
                value={formData.education}
                placeholder="Education"
                onChange={handleChange}
                className="w-full bg-gray-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              ></textarea>
              <textarea
                name="skills"
                value={formData.skills}
                placeholder="Skills (comma-separated)"
                onChange={handleChange}
                className="w-full bg-gray-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              ></textarea>
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={downloadResume}
                className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Download Resume
              </button>
              <button
                onClick={clearForm}
                className="bg-red-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700 transition duration-300"
              >
                Clear All
              </button>
            </div>
          </div>

          {/* Resume Preview */}
          <div
            id="resume-preview"
            className="bg-gray-900 p-6 rounded-lg shadow-lg overflow-auto max-h-[500px]"
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              Resume Preview
            </h2>
            <div className="text-white space-y-4">
              <h3 className="text-2xl font-extrabold">{formData.name}</h3>
              <p className="text-sm text-gray-400">
                {formData.email} | {formData.phone}
              </p>

              <div className="mt-4">
                <h4 className="text-lg font-semibold text-blue-400">Summary</h4>
                <p>{formData.summary}</p>
              </div>

              <div className="mt-4">
                <h4 className="text-lg font-semibold text-blue-400">
                  Work Experience
                </h4>
                <p>{formData.experience}</p>
              </div>

              <div className="mt-4">
                <h4 className="text-lg font-semibold text-blue-400">
                  Education
                </h4>
                <p>{formData.education}</p>
              </div>

              <div className="mt-4">
                <h4 className="text-lg font-semibold text-blue-400">Skills</h4>
                <p>{formData.skills}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIResumeBuilder;
