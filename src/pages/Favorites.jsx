import { useState } from 'react';
import { useFavorites } from '../hooks/useFavorites';
import InventoryCard from '../components/gallery/InventoryCard';
import InventoryQuickView from '../components/gallery/InventoryQuickView';

export default function Favorites() {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div>
      <h2 style={{ marginBottom: '20px', color: '#1f2937' }}>Мої улюблені позиції</h2>

      {/* empty state, якщо улюблених немає */}
      {favorites.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px', color: '#6b7280', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
          <p style={{ fontSize: '3rem', margin: '0 0 15px 0' }}>💔</p>
          Ви ще не додали жодної позиції до улюблених.
        </div>
      ) : (
        <div className="gallery-grid">
          {favorites.map(item => (
            <InventoryCard 
              key={item.id} 
              item={item} 
              isFavorite={isFavorite(item.id)} 
              onToggleFavorite={toggleFavorite}
              onClick={setSelectedItem} 
            />
          ))}
        </div>
      )}

      {/* Модальне вікно Quick View */}
      {selectedItem && (
        <InventoryQuickView 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)} 
        />
      )}
    </div>
  );
}