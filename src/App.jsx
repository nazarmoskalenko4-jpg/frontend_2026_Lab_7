import { Routes, Route, Link } from 'react-router-dom';
import AdminInventory from './pages/AdminInventory';
import AdminInventoryCreate from './pages/AdminInventoryCreate';
import AdminInventoryEdit from './pages/AdminInventoryEdit';
import AdminInventoryDetails from './pages/AdminInventoryDetails';
import './App.css';

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <header style={{ marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #ccc' }}>
        <h1>Система складу</h1>
        <nav style={{ display: 'flex', gap: '15px' }}>
          <Link to="/">Список інвентарю</Link>
          <Link to="/create">Додати позицію</Link>
        </nav>
      </header>
      
      <main>
        <Routes>
          <Route path="/" element={<AdminInventory />} />
          <Route path="/create" element={<AdminInventoryCreate />} />
          <Route path="/edit/:id" element={<AdminInventoryEdit />} />
          <Route path="/details/:id" element={<AdminInventoryDetails />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;