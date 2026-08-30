// src/services/api.js
const API_URL = 'https://sapereaude.onrender.com/api';

export const registrarUsuario = async (userData) => {
  const response = await fetch(`${API_URL}/usuarios/registro`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  if (!response.ok) throw new Error('Error al registrar usuario');
  return response.json();
};

export const loginUsuario = async (credentials) => {
  const response = await fetch(`${API_URL}/usuarios/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) throw new Error('Credenciales inválidas');
  return response.json();
};