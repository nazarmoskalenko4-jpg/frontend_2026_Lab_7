import { useState } from 'react';

export default function InventoryForm({ onSubmit, initialData = null, isEdit = false }) {
  const [formData, setFormData] = useState({
    inventory_name: initialData?.name || '',
    description: initialData?.description || '',
  });
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Валідація обов'язкового поля 
    if (!formData.inventory_name.trim()) {
      setError('Назва інвентарю є обов\'язковою!');
      return;
    }

    // Для multipart/form-data використовуємо об'єкт FormData
    const submitData = new FormData();
    submitData.append('inventory_name', formData.inventory_name);
    submitData.append('description', formData.description);
    if (photo) {
      submitData.append('photo', photo);
    }

    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      
      <div>
        <label style={{ display: 'block', marginBottom: '5px' }}>Назва інвентарю *</label>
        <input 
          type="text" 
          name="inventory_name" 
          value={formData.inventory_name} 
          onChange={handleChange} 
          style={{ width: '100%', padding: '8px' }}
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '5px' }}>Опис</label>
        <textarea 
          name="description" 
          value={formData.description} 
          onChange={handleChange} 
          rows="4"
          style={{ width: '100%', padding: '8px' }}
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '5px' }}>Фото {isEdit && '(Залиште пустим, щоб не змінювати)'}</label>
        <input 
          type="file" 
          accept="image/*"
          onChange={handleFileChange} 
        />
      </div>

      <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
        {isEdit ? 'Зберегти зміни' : 'Створити позицію'}
      </button>
    </form>
  );
}