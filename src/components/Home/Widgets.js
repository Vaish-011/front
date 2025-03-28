import React from 'react';
import JobListWidget from './JobListWidget';
import styles from "./styles/Widgets.module.css";

function Widgets() {

return (
    
    <div className={styles.widgets}>
        <div className={styles.jobListContainer}>
            <JobListWidget />
        </div>
    </div>
);

}

export default Widgets;