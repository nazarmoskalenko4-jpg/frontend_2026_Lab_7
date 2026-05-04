import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { inventoryApi } from '../services/inventoryApi';

export default function AdminInventoryDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setIsLoading(true);
        // Робимо запит GET /inventory/:id 
        const data = await inventoryApi.getById(id);
        setItem(data);
      } catch (err) {
        setError('Не вдалося завантажити деталі інвентарю.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  if (isLoading) return <p style={{ padding: '20px' }}>Завантаження...</p>;
  if (error) return <p style={{ color: 'red', padding: '20px' }}>{error}</p>;
  if (!item) return <p style={{ padding: '20px' }}>Позицію не знайдено.</p>;

  return (
    <div style={{ maxWidth: '600px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', marginTop: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0 }}>Деталі інвентарю #{item.id}</h2>
        <Link to="/" style={{ padding: '8px 12px', backgroundColor: '#6c757d', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
          Назад до списку
        </Link>
      </div>
      
      <div style={{ marginBottom: '20px', textAlign: 'center', backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '8px' }}>
        {item.photo ? (
          <img 
            src={`http://localhost:3000/inventory/${item.id}/photo`} 
            alt={item.name} 
            style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain', borderRadius: '4px' }} 
          />
        ) : (
          <div style={{ padding: '50px', color: '#888' }}>Фото відсутнє</div>
        )}
      </div>

      <div style={{ marginBottom: '15px' }}>
        <strong>Назва:</strong> <span style={{ fontSize: '1.2em', marginLeft: '10px' }}>{item.name}</span>
      </div>
      
      <div>
        <strong>Опис:</strong> 
        <p style={{ marginTop: '5px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '4px', whiteSpace: 'pre-wrap' }}>
          {item.description || 'Опис відсутній'}
        </p>
      </div>
    </div>
  );
}

