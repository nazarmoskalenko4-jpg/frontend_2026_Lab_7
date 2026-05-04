import { useNavigate } from 'react-router-dom';
import { inventoryApi } from '../services/inventoryApi';
import InventoryForm from '../components/inventory/InventoryForm';

export default function AdminInventoryCreate() {
  const navigate = useNavigate();

  const handleCreate = async (formData) => {
    try {
      await inventoryApi.create(formData);
      alert('Позицію успішно створено!');
      navigate('/'); // Повертаємось на головну сторінку списку
    } catch (error) {
      console.error('Помилка створення:', error);
      alert('Помилка при створенні позиції. Перевірте консоль.');
    }
  };

  return (
    <div>
      <h2>Додати новий інвентар</h2>
      <InventoryForm onSubmit={handleCreate} />
    </div>
  );
}