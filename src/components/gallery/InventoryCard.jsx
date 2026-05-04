export default function InventoryCard({ item, isFavorite, onToggleFavorite, onClick }) {
  // Визначаємо URL зображення або ставимо заглушку
  const imageUrl = item.photo 
    ? `http://localhost:3000/inventory/${item.id}/photo` 
    : 'https://via.placeholder.com/250x200?text=No+Photo';

  return (
    <div className="inventory-card" onClick={() => onClick(item)}>
      <img src={imageUrl} alt={item.name} className="inventory-card-img" />
      
      <div className="inventory-card-body">
        <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#1f2937' }}>{item.name}</h3>
        
        <button
          className="fav-btn"
          onClick={(e) => {
            e.stopPropagation(); // Зупиняємо клік, щоб не відкрилося модальне вікно
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