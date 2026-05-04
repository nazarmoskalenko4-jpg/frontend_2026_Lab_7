import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { inventoryApi } from '../services/inventoryApi';
import InventoryForm from '../components/inventory/InventoryForm';

export default function AdminInventoryEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Спочатку отримуємо поточні дані, щоб заповнити форму
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const data = await inventoryApi.getById(id);
        setItem(data);
      } catch (err) {
        console.error('Помилка завантаження даних для редагування:', err);
        alert('Не вдалося завантажити позицію.');
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };
    fetchItem();
  }, [id, navigate]);

  const handleUpdate = async (formData) => {
    try {
      // 1. Витягуємо текст із FormData для JSON-запиту
      const name = formData.get('inventory_name');
      const description = formData.get('description');
      
      // Відправляємо PUT /inventory/:id (Текст)
      // Зверни увагу: бекенд очікує поле "name", а не "inventory_name"
      await inventoryApi.updateText(id, { name, description });

      // 2. Якщо користувач вибрав нове фото, робимо другий запит
      const photoFile = formData.get('photo');
      if (photoFile) {
        const photoData = new FormData();
        photoData.append('photo', photoFile);
        // Відправляємо PUT /inventory/:id/photo (Фото)
        await inventoryApi.updatePhoto(id, photoData);
      }

      alert('Позицію успішно оновлено!');
      navigate('/');
    } catch (error) {
      console.error('Помилка оновлення:', error);
      alert('Виникла помилка при оновленні.');
    }
  };

  if (isLoading) return <p style={{ padding: '20px' }}>Завантаження форми...</p>;

  return (
    <div>
      <h2>Редагувати інвентар #{id}</h2>
      {/* Передаємо initialData та isEdit=true */}
      <InventoryForm onSubmit={handleUpdate} initialData={item} isEdit={true} />
    </div>
  );
}