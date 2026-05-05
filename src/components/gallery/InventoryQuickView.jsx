export default function InventoryQuickView({ item, onClose }) {
  if (!item) return null;

  const imageUrl = item.photo 
    ? `http://localhost:3000/inventory/${item.id}/photo` 
    : 'https://via.placeholder.com/500x300?text=No+Photo';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content tech-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✖</button>
        
        {/* Ліва колонка - Зображення */}
        <div style={{ flex: '1', backgroundColor: '#f8f9fa', borderRadius: '16px', padding: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img 
            src={imageUrl} 
            alt={item.name} 
            style={{ maxWidth: '100%', maxHeight: '350px', objectFit: 'contain' }} 
          />
        </div>
        
        {/* Права колонка - Характеристики */}
        <div style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span style={{ textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '1.5px', color: '#3b82f6', fontWeight: '800', marginBottom: '12px' }}>
            Деталі комплектуючої
          </span>
          
          <h2 style={{ margin: '0 0 20px 0', color: '#111827', fontSize: '2.2rem', lineHeight: '1.1' }}>
            {item.name}
          </h2>
          
          <div style={{ padding: '20px', backgroundColor: '#f9fafb', borderLeft: '4px solid #3b82f6', borderRadius: '0 12px 12px 0' }}>
            <p style={{ color: '#4b5563', lineHeight: '1.7', margin: 0, whiteSpace: 'pre-wrap', fontSize: '1rem' }}>
              {item.description || 'Опис відсутній.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}