export default function InventoryQuickView({ item, onClose }) {
  if (!item) return null;

  const imageUrl = item.photo 
    ? `http://localhost:3000/inventory/${item.id}/photo` 
    : 'https://via.placeholder.com/500x300?text=No+Photo';

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* Зупиняємо клік всередині вікна, щоб воно не закривалося при кліку на контент */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✖</button>
        
        <img 
          src={imageUrl} 
          alt={item.name} 
          style={{ width: '100%', height: '300px', objectFit: 'contain', marginBottom: '15px', borderRadius: '8px', backgroundColor: '#f9fafb' }} 
        />
        
        <h2 style={{ margin: '0 0 10px 0', color: '#1f2937' }}>{item.name}</h2>
        <p style={{ color: '#6b7280', lineHeight: '1.6', margin: 0, whiteSpace: 'pre-wrap' }}>
          {item.description || 'Опис відсутній.'}
        </p>
      </div>
    </div>
  );
}