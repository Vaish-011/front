import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import styles from "./styles/darkUI.module.css"; 

const JobList = () => {
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/jobs/");
                setJobs(response.data);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };
        fetchJobs();
    }, []);

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.container}>
                <h2 className={styles.heading}>Job Listings</h2>

                <button className={styles.goBack} onClick={() => navigate("/referral/form")}>
                    Go Back
                </button>

                <div className={styles.jobList}>
                    {jobs.length > 0 ? (
                        jobs.map((job) => (
                            <div key={job.id} className={styles.jobCard}>
                                <h3 className={styles.jobTitle}>{job.title}</h3>
                                <p><strong>Company:</strong> {job.company}</p>
                                <p><strong>Location:</strong> {job.location}</p>
                                <p><strong>Skills:</strong> {job.skills}</p>
                                <p><strong>Experience:</strong> {job.experience} years</p>
                                <p><strong>Salary:</strong> {job.salary}</p>
                                <p><strong>Employment Type:</strong> {job.employment_type}</p>
                                <p><strong>Description:</strong> {job.description}</p>
                                <div className={styles.buttonContainer}>
                                    {/* <a href={job.apply_link} target="_blank" rel="noopener noreferrer"> */}
                                        <button className={styles.applyButton}
                                            onClick = {() => navigate(`/referral/applynow/`)}
                                        > Apply now
                                        </button>
                                    {/* </a> */}
                                    <button 
                                        className={styles.referralButton} 
                                        onClick={() => navigate(`/referral/requestform/`)}
                                    >
                                        Request Referral
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className={styles.noJobs}>No jobs available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default JobList;