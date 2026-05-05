export default function InventoryCard({ item, isFavorite, onToggleFavorite, onClick }) {
  const imageUrl = item.photo 
    ? `http://localhost:3000/inventory/${item.id}/photo` 
    : 'https://via.placeholder.com/250x200?text=No+Photo';

  return (
    <div className="inventory-card" onClick={() => onClick(item)}>
      {/* Обгортка-"вітрина" */}
      <div className="inventory-card-img-wrapper">
        <img src={imageUrl} alt={item.name} className="inventory-card-img" />
      </div>
      
      <div className="inventory-card-body">
        <div>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '1.15rem', color: '#111827', fontWeight: '700' }}>
            {item.name}
          </h3>
          {/* Обрізаємо опис до 2-х рядків, щоб картки не ламалися */}
          <p style={{ margin: 0, color: '#6b7280', fontSize: '0.9rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {item.description}
          </p>
        </div>
        
        <button
          className="fav-btn"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(item);
          }}
          title={isFavorite ? "Видалити з улюблених" : "Додати в улюблені"}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>
    </div>
  );
}