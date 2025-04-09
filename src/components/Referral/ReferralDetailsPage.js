import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './styles/ReferralReview.module.css';

const ReferralDetailsPage = () => {
  const { applicant_id, job_id } = useParams();
  console.log(applicant_id)
  const navigate = useNavigate();
  const [referralData, setReferralData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReferralData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/reviewReferralRequest/referral-request/${applicant_id}/${job_id}`);
        setReferralData(res.data);
      } catch (err) {
        setError('Could not fetch referral data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReferralData();
  }, [applicant_id, job_id]);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!referralData) return <div className={styles.error}>No data found.</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Referral Request Details</h1>
      <div className={styles.detailBox}>
        <p><strong>Name:</strong> {referralData.name}</p>
        <p><strong>Email:</strong> {referralData.email}</p>
        <p><strong>Message:</strong> {referralData.message || 'No message provided'}</p>
        <p><strong>Status:</strong> {referralData.status}</p>
        <p><strong>Submitted on:</strong> {new Date(referralData.created_at).toLocaleString()}</p>
        <p>
          <strong>Resume:</strong> <a href={`http://localhost:5000/${referralData.resume}`} target="_blank" rel="noopener noreferrer">View Resume</a>
        </p>
      </div>
      <button className={styles.backBtn} onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
};

export default ReferralDetailsPage;

