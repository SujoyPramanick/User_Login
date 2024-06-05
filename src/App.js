import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Atn from './components/Atn/Atn';
import { UserProvider } from './UserContext';

function App() {
  return (
    <UserProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/atn" element={<Atn />} />
      </Routes>
    </Router>
  </UserProvider>
  );
}

export default App;
