import './App.css';
import './index.css';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Games from './components/Games';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/games" element={<Games />} />
      </Routes>
  );
}

export default App;
