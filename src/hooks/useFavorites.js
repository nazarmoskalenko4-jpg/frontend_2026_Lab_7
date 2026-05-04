import { useState, useEffect } from 'react';

export const useFavorites = () => {
  // Зчитуємо дані з localStorage при першому завантаженні
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Щоразу, коли змінюється стан favorites, записуємо його в localStorage
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Функція для додавання/видалення з улюблених
  const toggleFavorite = (item) => {
    setFavorites((prev) => {
      const exists = prev.find((fav) => fav.id === item.id);
      if (exists) {
        // Якщо вже є - видаляємо
        return prev.filter((fav) => fav.id !== item.id);
      }
      // Якщо немає - додаємо
      return [...prev, item];
    });
  };

  // Функція для перевірки, чи є елемент улюбленим
  const isFavorite = (id) => {
    return favorites.some((fav) => fav.id === id);
  };

  return { favorites, toggleFavorite, isFavorite };
};