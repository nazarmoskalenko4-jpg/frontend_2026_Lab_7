import { useState, useEffect } from 'react';
import { inventoryApi } from '../services/inventoryApi';
import { useFavorites } from '../hooks/useFavorites';
import InventoryCard from '../components/gallery/InventoryCard';
import InventoryQuickView from '../components/gallery/InventoryQuickView';

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Стан для модального вікна (Quick View)
  const [selectedItem, setSelectedItem] = useState(null);
  
  // Підключаємо наш кастомний хук для улюблених
  const { toggleFavorite, isFavorite } = useFavorites();

  // Отримуємо дані з бекенду (GET /inventory)
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        setIsLoading(true);
        const data = await inventoryApi.getAll();
        setItems(data);
      } catch (err) {
        setError('Не вдалося завантажити галерею. Перевірте з\'єднання з сервером.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInventory();
  }, []);

  return (
    <div>
      <h2 style={{ marginBottom: '20px', color: '#1f2937' }}>Каталог інвентарю</h2>

      {/* Loading state */}
      {isLoading && <div style={{ textAlign: 'center', padding: '50px', color: '#6b7280' }}>Завантаження галереї...</div>}
      
      {/* Error state */}
      {error && <div style={{ color: '#ef4444', backgroundColor: '#fee2e2', padding: '15px', borderRadius: '8px' }}>{error}</div>}
      
      {/* Empty state */}
      {!isLoading && !error && items.length === 0 && (
        <div style={{ textAlign: 'center', padding: '50px', color: '#6b7280', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
          Наразі інвентар порожній.
        </div>
      )}

      {/* Адаптивний Grid для карток */}
      {!isLoading && !error && items.length > 0 && (
        <div className="gallery-grid">
          {items.map(item => (
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