import React, { useState } from 'react';
import './Atn.css';

function Atn() {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [dept, setDept] = useState('');
  const [year, setYear] = useState('');
  const [students, setStudents] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!start || !end) {
      alert("Start and End dates are mandatory!");
      return;
    }

    const queryParams = new URLSearchParams({
      start,
      end,
      ...(dept && { dept }),
      ...(year && { year }),
    }).toString();

    try {
      const response = await fetch(`/students/get_attendance?${queryParams}`);
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };

  return (
    <div className='gg'>
      <div className="wrapp">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className='b'>
              Start Date:
              <input type="date" value={start} onChange={(e) => setStart(e.target.value)} required />
            </label>
          </div>
          <div className="form-group">
            <label className='b'>
              End Date:
              <input type="date" value={end} onChange={(e) => setEnd(e.target.value)} required />
            </label>
          </div>
          <div className="form-group">
            <label className='a'>
              Department:
              <input type="text" value={dept} onChange={(e) => setDept(e.target.value)} />
            </label>
          </div>
          <div className="form-group">
            <label className='a'>
              Year:
              <input type="text" value={year} onChange={(e) => setYear(e.target.value)} />
            </label>
          </div>
          <button data-label="Register" class="rainbow-hover">
            <span class="sp">Attendance</span>
          </button>

        </form>

        {students.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Student ID</th>
                <th>Department</th>
                <th>Year</th>
                <th>Avg Attendance</th>
                <th>Exam Eligibility</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.std_id}>
                  <td>{student.name}</td>
                  <td>{student.std_id}</td>
                  <td>{student.dept}</td>
                  <td>{student.year}</td>
                  <td>{student.avg_attendance}</td>
                  <td>{student.exam_eligibility ? 'Eligible' : 'Not Eligible'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Atn;
