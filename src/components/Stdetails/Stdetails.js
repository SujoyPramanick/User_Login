import React, { useState, useEffect } from 'react';
import './Stdetails.css';

function StDetails({ stdId, setTrigger }) {
    const [studentDetails, setStudentDetails] = useState(null);

    useEffect(() => {
        const fetchStudentDetails = async () => {
            try {
                const response = await fetch(`/students/get/${stdId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setStudentDetails(data);
                } else {
                    console.error('Failed to fetch student details');
                }
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchStudentDetails();
    }, [stdId]);

    return (
        <div className="student-details">
            {studentDetails ? (
                <div className="popup-background">
                    <div className="popup-content">
                        <button className="close-btn" onClick={() => setTrigger(false)}>X</button>
                        <div className="details">
                            <h2>Student Details</h2>
                            <p className="student-name"><label className='a'>NAME</label> : {studentDetails.name}</p>
                            <p className="student-email"><label className='a'>EMAIL</label> : {studentDetails.email}</p>
                            <p className="student-id"><label className='a'>STUDENT ID</label> : {studentDetails.std_id}</p>
                        </div>
                        {studentDetails.std_img && (
                            <div className="student-image">
                                <img className="student-image-box" src={studentDetails.std_img} alt="Student" />
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <p>Loading student details...</p>
            )}
        </div>
    );
}

export default StDetails;
