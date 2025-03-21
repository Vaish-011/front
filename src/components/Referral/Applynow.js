import React, { useState } from "react";
import styles from './styles/applyNow.module.css';

const ApplyNowForm = ({ closeModal }) => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        linkedin: "",
        portfolio: "",
        resume: null,
        coverLetter: "",
        jobTitle: "",
        experience: "",
        expectedSalary: "",
        noticePeriod: "",
        certifications: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Application submitted (Backend not implemented yet)");
    };

    return (
        <div className={styles.modal}>
            <h2 className={styles.title}>Apply for Job</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} required className={styles.input}/>
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required className={styles.input}/>
                <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} required className={styles.input}/>
                <input type="url" name="linkedin" placeholder="LinkedIn Profile" onChange={handleChange} className={styles.input}/>
                <input type="url" name="portfolio" placeholder="Portfolio/Website" onChange={handleChange} className={styles.input}/>
                <textarea name="coverLetter" placeholder="Message (Optional)" onChange={handleChange} className={styles.textarea}></textarea>
                <input type="text" name="jobTitle" placeholder="Current Job Title (Optional)" onChange={handleChange} className={styles.input}/>
                <input type="number" name="experience" placeholder="Years of Experience (Optional)" onChange={handleChange} className={styles.input}/>
                <input type="number" name="expectedSalary" placeholder="Expected Salary (Optional)" onChange={handleChange} className={styles.input}/>
                <input type="text" name="noticePeriod" placeholder="Notice Period (Optional)" onChange={handleChange} className={styles.input}/>
                <input type="file" name="resume" onChange={handleFileChange} required className={styles.fileInput}/>
                <input type="file" name="certifications" onChange={handleFileChange} className={styles.fileInput}/>
                <button type="submit" className={styles.submitButton}>Submit Application</button>
            </form>
            <button onClick={closeModal} className={styles.cancelButton}>Cancel</button>
        </div>
    );
};

export default ApplyNowForm;
