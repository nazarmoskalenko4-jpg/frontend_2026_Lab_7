import { Link } from 'react-router-dom';

export default function InventoryTable({ items, onDelete }) {
  // Empty state з методички
  if (!items || items.length === 0) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Інвентар порожній. Додайте нові позиції!</div>;
  }

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
      <thead>
        <tr style={{ borderBottom: '2px solid #ccc', textAlign: 'left' }}>
          <th style={{ padding: '10px' }}>ID</th>
          <th style={{ padding: '10px' }}>Фото (Прев'ю)</th>
          <th style={{ padding: '10px' }}>Назва (inventory_name)</th>
          <th style={{ padding: '10px' }}>Опис</th>
          <th style={{ padding: '10px' }}>Дії</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '10px' }}>{item.id}</td>
            <td style={{ padding: '10px' }}>
              {/* Використовуємо спеціальний ендпоінт бекенду для отримання фото */}
              {item.photo ? (
                <img
                  src={`http://localhost:3000/inventory/${item.id}/photo`}
                  alt={item.name}
                  style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }}
                />
              ) : (
                <span style={{ color: '#888' }}>Немає фото</span>
              )}
            </td>
            {/* Зверни увагу: з бекенду приходить поле name, хоча називаємо колонку inventory_name */}
            <td style={{ padding: '10px' }}>{item.name}</td>
            <td style={{ padding: '10px' }}>{item.description}</td>
            <td style={{ padding: '10px', display: 'flex', gap: '10px', alignItems: 'center' }}>
              <Link to={`/details/${item.id}`}>Переглянути</Link>
              <Link to={`/edit/${item.id}`}>Редагувати</Link>
              <button 
                onClick={() => onDelete(item.id)} 
                style={{ color: 'white', backgroundColor: '#dc3545', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
              >
                Видалити
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}