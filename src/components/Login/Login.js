import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import './Login.css';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { setUser } = useContext(UserContext);

    const handleSignIn = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await fetch('/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const userData = await response.json();
                console.log('User data:', userData);
                setUser(userData);
                navigate('/home');
            } else {
                const errorData = await response.json();
                console.error('Login failed:', errorData.error);
                setError(errorData.error || 'Incorrect email or password');
            }
        } catch (error) {
            console.error('Fetch error:', error);
            setError('Error connecting to the server. Please try again later.');
        }
    };

    return (
        <div className="og">
            <div className="container">
                <div className="form-container sign-in">
                    <form>
                        <h1 className='sing'>SIGN IN</h1>                        
                        <span className='usekaro'>with your email & password</span>

                        <div className='em'>
                        <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <button onClick={handleSignIn} type="button">Sign In</button>
                        {error && <p className="error">{error}</p>}
                    </form>
                </div>
                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-right">
                            <h1>Hello, Admin!</h1>
                            <p>Unlock full access to all features by entering your personal details. Experience the ultimate in personalized convenience and functionality!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
