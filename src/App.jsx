import { Routes, Route, Link } from 'react-router-dom';
import AdminInventory from './pages/AdminInventory';
import AdminInventoryCreate from './pages/AdminInventoryCreate';
import AdminInventoryEdit from './pages/AdminInventoryEdit';
import AdminInventoryDetails from './pages/AdminInventoryDetails';
import Gallery from './pages/Gallery';
import Favorites from './pages/Favorites';
import './App.css';

function App() {
  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <header style={{ 
        backgroundColor: '#ffffff', 
        padding: '15px 30px', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '30px'
      }}>
        <h1 style={{ margin: 0, color: '#3b82f6', fontSize: '1.5rem' }}>Склад PC</h1>
        
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          {/* Користувацьке меню */}
          <nav style={{ display: 'flex', gap: '15px', borderRight: '2px solid #eee', paddingRight: '20px' }}>
            <Link to="/" style={{ textDecoration: 'none', color: '#1f2937', fontWeight: '500' }}>Галерея</Link>
            <Link to="/favorites" style={{ textDecoration: 'none', color: '#ef4444', fontWeight: '500' }}>Улюблені ❤️</Link>
          </nav>
          
          {/* Адмінське меню */}
          <nav style={{ display: 'flex', gap: '15px' }}>
            <Link to="/admin" style={{ textDecoration: 'none', color: '#6b7280', fontSize: '0.9rem' }}>Адмінка</Link>
          </nav>
        </div>
      </header>
      
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <Routes>
          {/* Користувацькі маршрути */}
          <Route path="/" element={<Gallery />} />
          <Route path="/favorites" element={<Favorites />} />

          {/* Адміністративні маршрути */}
          <Route path="/admin" element={<AdminInventory />} />
          <Route path="/admin/create" element={<AdminInventoryCreate />} />
          <Route path="/admin/edit/:id" element={<AdminInventoryEdit />} />
          <Route path="/admin/details/:id" element={<AdminInventoryDetails />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;