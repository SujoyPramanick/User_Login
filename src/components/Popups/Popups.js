import React, { useRef, useState } from 'react';
import './Popups.css';

function Popups(props) {
    const inputRef = useRef(null);
    const [image, setImage] = useState(null);
    const [name, setName] = useState('');
    const [dept, setdept] = useState('');
    const [year, setYear] = useState('');
    const [email, setEmail] = useState('');

    const handleImageClick = () => {
        inputRef.current.click();
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImage(file);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('dept', dept);
        formData.append('year', year);
        formData.append('image', image);

        // Log formData contents for debugging
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        try {
            const response = await fetch('/students/add', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('Student added successfully!');
                props.setTrigger(false); // Close the popup
                // props.fetchStudents();
            } else {
                const errorData = await response.json();
                alert(`Failed to add student. Error: ${errorData.message || response.statusText}`);
            }
            props.onStudentAdded();
        } catch (error) {
            console.error('Error adding student:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (props.trigger) ? (
        <div className='popup'>
            <div className="popup-inner">
                <h2>Enter Student's Details</h2><br />
                <form onSubmit={handleSubmit}>
                    <div className='one'>
                        <div className="input-group">
                            <h3>Name </h3>
                            <input
                                className='box'
                                type="text"
                                placeholder='Name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <h3>Email </h3>
                            <input
                                className='box m'
                                type="email"
                                placeholder='Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <h3>Dept </h3>
                            <input
                                className='box m'
                                type="text"
                                placeholder='Department'
                                value={dept}
                                onChange={(e) => setdept(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <h3>Year </h3>
                            <input
                                className='box m'
                                type="text"
                                placeholder='Year'
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div onClick={handleImageClick}>
                        {image ? (
                            <img src={URL.createObjectURL(image)} alt="Upload" />
                        ) : (
                            <img src="./360_F_283724163_kIWm6DfeFN0zhm8Pc0xelROcxxbAiEFI.jpg" alt="Upload" />
                        )}
                        <input type="file" ref={inputRef} onChange={handleImageChange} style={{ display: 'none' }} required />
                    </div>
                    <div>
                    <button type="submit" className='submitbtn'>
                        <div className="svg-wrapper-1">
                            <div className="svg-wrapper">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                >
                                    <path fill="none" d="M0 0h24v24H0z"></path>
                                    <path
                                        fill="currentColor"
                                        d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                                    ></path>
                                </svg>
                            </div>
                        </div>
                        <span>Submit</span>
                    </button>
                    </div>
                </form>
                <button className="close-btn" onClick={() => { props.setTrigger(false) }}>X</button>
                {props.children}
            </div>
        </div>
    ) : null;
}

export default Popups;
