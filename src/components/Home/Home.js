import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Popups from '../Popups/Popups';
import Dltpopup from '../Dltpopup/Dltpopup';
import StDetails from '../Stdetails/Stdetails';
import { UserContext } from '../../UserContext';
import './Home.css';

function Home() {
  const [BtnPopup, setBtnPopup] = useState(false);
  const [DeletePopup, setDeletePopup] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [student, setStudent] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (user) {
      console.log('User in Home:', user);
      fetchUserName();
      fetchStudents();
    }
  }, [user]);

  // FETCH USER NAME
  const fetchUserName = async () => {
    try {
      const response = await fetch('/user/info', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserName(data.name);
      } else {
        console.error('Failed to fetch user name');
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  // FETCH STUDENT
  const fetchStudents = async () => {
    try {
      const response = await fetch('/students/get', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStudent(data);
      } else {
        console.error('Failed to fetch students');
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  // CSV DOWNLOAD
  const downloadCSV = async () => {
    try {
      const response = await fetch('/students/csv', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'students.csv';
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        console.error('Failed to Download');
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  // LOGOUT
  const handleLogout = async () => {
    try {
      const response = await fetch('/user/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setUser(null);
        navigate('/');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const handleDeleteAccount = () => {
    setDeletePopup(true);
  };

  return (
    <div className="gg">
      <div className='wrapp'>
        <h1>Welcome {userName}</h1>
        <div className="btnss">

          {/* Add Button */}
          <div>
            <button type="button" className="button" onClick={() => setBtnPopup(true)}>
              <span className="button__text">Add</span>
              <span className="button__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" stroke="currentColor" height="24" fill="none" className="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
            </button>
            <Popups trigger={BtnPopup} setTrigger={setBtnPopup} onStudentAdded={fetchStudents} />
          </div>

          {/* Download CSV */}
          <div>
            <button className="Btn" onClick={downloadCSV}>
              <svg
                className="svgIcon"
                viewBox="0 0 384 512"
                height="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
                ></path>
              </svg>
              <span className="icon2"></span>
              <span className="tooltip">CSV File</span>
            </button>
          </div>

          {/* Delete students */}
          <div>
            <button className="noselect dllt" onClick={handleDeleteAccount}><span className="text">Delete</span><span className="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span></button>
            <Dltpopup trigger={DeletePopup} setTrigger={setDeletePopup} fetchStudents={fetchStudents} />
          </div>

        </div>

        <div className="atn">
          <button className='atn2' onClick={() => navigate('/atn')}>Attendance</button>
        </div>

        <div className="students">
          {student.length > 0 ? (
            student.map((students, index) => (
              <div key={index} className="student">
                <div><h3>{index + 1}. {students.name}</h3></div>
                <div>

                  {/* Details button */}
                  <button className="Documents-btn" onClick={() => setSelectedStudentId(students.std_id)}>
                    <span className="folderContainer">
                      <svg
                        className="fileBack"
                        width="146"
                        height="113"
                        viewBox="0 0 146 113"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0 4C0 1.79086 1.79086 0 4 0H50.3802C51.8285 0 53.2056 0.627965 54.1553 1.72142L64.3303 13.4371C65.2799 14.5306 66.657 15.1585 68.1053 15.1585H141.509C143.718 15.1585 145.509 16.9494 145.509 19.1585V109C145.509 111.209 143.718 113 141.509 113H3.99999C1.79085 113 0 111.209 0 109V4Z"
                          fill="url(#paint0_linear_117_4)"
                        ></path>
                        <defs>
                          <linearGradient
                            id="paint0_linear_117_4"
                            x1="0"
                            y1="0"
                            x2="72.93"
                            y2="95.4804"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#8F88C2"></stop>
                            <stop offset="1" stopColor="#5C52A2"></stop>
                          </linearGradient>
                        </defs>
                      </svg>
                      <svg
                        className="filePage"
                        width="88"
                        height="99"
                        viewBox="0 0 88 99"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="88" height="99" fill="url(#paint0_linear_117_6)"></rect>
                        <defs>
                          <linearGradient
                            id="paint0_linear_117_6"
                            x1="0"
                            y1="0"
                            x2="81"
                            y2="160.5"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="white"></stop>
                            <stop offset="1" stopColor="#686868"></stop>
                          </linearGradient>
                        </defs>
                      </svg>

                      <svg
                        className="fileFront"
                        width="160"
                        height="79"
                        viewBox="0 0 160 79"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.29306 12.2478C0.133905 9.38186 2.41499 6.97059 5.28537 6.97059H30.419H58.1902C59.5751 6.97059 60.9288 6.55982 62.0802 5.79025L68.977 1.18034C70.1283 0.410771 71.482 0 72.8669 0H77H155.462C157.87 0 159.733 2.1129 159.43 4.50232L150.443 75.5023C150.19 77.5013 148.489 79 146.474 79H7.78403C5.66106 79 3.9079 77.3415 3.79019 75.2218L0.29306 12.2478Z"
                          fill="url(#paint0_linear_117_5)"
                        ></path>
                        <defs>
                          <linearGradient
                            id="paint0_linear_117_5"
                            x1="38.7619"
                            y1="8.71323"
                            x2="66.9106"
                            y2="82.8317"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#C3BBFF"></stop>
                            <stop offset="1" stopColor="#51469A"></stop>
                          </linearGradient>
                        </defs>
                      </svg>
                    </span>
                    <p className="text">Details</p>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No students found</p>
          )}
        </div>
        <div>
          <button onClick={handleLogout} className='btn2 homebtn'>Logout</button>
        </div>
      </div>
      {selectedStudentId && <StDetails stdId={selectedStudentId} setTrigger={setSelectedStudentId} />}
    </div>
  );
}

export default Home;
