import { useState, useEffect } from 'react';
import { inventoryApi } from '../services/inventoryApi';
import InventoryTable from '../components/inventory/InventoryTable';

export default function AdminInventory() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Функція для отримання даних з бекенду
  const fetchInventory = async () => {
    try {
      setIsLoading(true);
      const data = await inventoryApi.getAll();
      setItems(data);
    } catch (err) {
      setError('Не вдалося завантажити дані. Перевірте, чи запущений бекенд.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Викликаємо при першому рендері сторінки
  useEffect(() => {
    fetchInventory();
  }, []);

  // Функція видалення (з Confirm-modal)
  const handleDelete = async (id) => {
    // Вбудоване вікно підтвердження браузера виконує роль базового Confirm-modal
    if (window.confirm('Ви впевнені, що хочете видалити цю позицію?')) {
      try {
        await inventoryApi.delete(id);
        // Оновлюємо список після успішного видалення
        setItems(items.filter(item => item.id !== id));
      } catch (err) {
        alert('Помилка при видаленні. Можливо, запис вже видалено.');
        console.error(err);
      }
    }
  };

  return (
    <div>
      <h2>Управління інвентарем</h2>
      
      {/* Loading state */}
      {isLoading && <p>Завантаження даних...</p>}
      
      {/* Error state */}
      {error && <p style={{ color: 'red', padding: '10px', backgroundColor: '#fee' }}>{error}</p>}
      
      {/* Таблиця рендериться тільки якщо немає завантаження і помилок */}
      {!isLoading && !error && (
        <InventoryTable items={items} onDelete={handleDelete} />
      )}
    </div>
  );
}