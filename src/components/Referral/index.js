import React from 'react';
import { Routes, Route } from 'react-router-dom';
import JobForm from './JobForm';

function Referral() {
  return (
    <div>
      <Routes>
        <Route path="/form" element={<JobForm />} />
      </Routes>
    </div>
  );
}

export default Referral;
