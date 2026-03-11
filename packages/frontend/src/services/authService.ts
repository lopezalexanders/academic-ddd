const API_BASE = import.meta.env.VITE_API_BASE ?? '/api';

export type LoginResult = {
  id: string;
  username: string;
  email: string;
  role: string;
};

export async function login(
  username: string,
  password: string,
): Promise<LoginResult> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: username.trim(), password }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    const message =
      data.message === 'Credenciales inválidas'
        ? 'Usuario o contraseña incorrectos'
        : data.message ?? 'Error al iniciar sesión';
    throw new Error(message);
  }
  return res.json();
}
