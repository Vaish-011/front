import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './styles/ApplicationPage.module.css';

const ApplicationReviewPage = () => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        console.log("Fetching applications for jobId:", jobId); // Add this line
        const response = await axios.get(
          `http://localhost:5000/api/applicationReview/${jobId}`
        );
        console.log("Response data:", response.data); // Add this line
        setApplications(response.data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };
    if (jobId) {
      fetchApplications();
    }
  }, [jobId]);

  const handleViewProfile = (applicantId) => {
    navigate(`/user/${applicantId}`);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Job Applications Review</h2>
      <ul className={styles.appList}>
        {applications.map((app) => (
          <li key={app.id} className={styles.appItem}>
            <div>
              <p>
                <strong>Company:</strong> {app.company_name}
              </p>
              <p>
                <strong>Position:</strong> {app.job_title}
              </p>
              <p>
                <strong>Applicant:</strong> {app.applicant_name}
              </p>
            </div>
            <button
              className={styles.viewProfileButton}
              onClick={() => handleViewProfile(app.applicant_Id)}
            >
              View Profile
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApplicationReviewPage;