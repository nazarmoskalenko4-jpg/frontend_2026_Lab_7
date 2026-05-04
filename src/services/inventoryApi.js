import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: BASE_URL,
});

export const inventoryApi = {
  // Отримати всі записи (GET /inventory)
  getAll: async () => {
    const response = await api.get('/inventory');
    return response.data;
  },

  // Отримати запис за id (GET /inventory/:id)
  getById: async (id) => {
    const response = await api.get(`/inventory/${id}`);
    return response.data;
  },

  // Створити новий запис (POST /register)
  // Відправляємо як multipart/form-data, бо є файл фото
  create: async (formData) => {
    const response = await api.post('/register', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  // 1. Оновлення текстових даних (PUT /inventory/:id)
  // Формат JSON. Пам'ятай: тут треба передавати { name: "...", description: "..." }
  updateText: async (id, data) => {
    const response = await api.put(`/inventory/${id}`, data);
    return response.data;
  },

  // 2. Оновлення фотографії (PUT /inventory/:id/photo)
  // Відправляємо як multipart/form-data
  updatePhoto: async (id, formData) => {
    const response = await api.put(`/inventory/${id}/photo`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  // Видалити запис (DELETE /inventory/:id)
  delete: async (id) => {
    const response = await api.delete(`/inventory/${id}`);
    return response.data;
  }
};