const API_BASE = import.meta.env.VITE_API_BASE ?? '/api';

export type Student = {
  id: string;
  firstName: string;
  lastName: string;
  document: string;
  birthDate: string;
  code: string;
  userId: string;
  username?: string;
  email?: string;
};

export type CreateStudentDto = {
  firstName: string;
  lastName: string;
  document: string;
  birthDate: string;
  email?: string;
};

export async function createStudent(data: CreateStudentDto): Promise<Student> {
  const res = await fetch(`${API_BASE}/students`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message ?? 'Error al registrar alumno');
  }
  return res.json();
}

export async function getStudents(): Promise<Student[]> {
  const res = await fetch(`${API_BASE}/students`);
  if (!res.ok) throw new Error('Error al cargar alumnos');
  return res.json();
}

export async function getStudent(id: string): Promise<Student> {
  const res = await fetch(`${API_BASE}/students/${id}`);
  if (!res.ok) {
    if (res.status === 404) throw new Error('Estudiante no encontrado');
    throw new Error('Error al cargar alumno');
  }
  return res.json();
}

export type UpdateStudentDto = {
  firstName?: string;
  lastName?: string;
  document?: string;
  birthDate?: string;
  email?: string;
};

export async function updateStudent(
  id: string,
  data: UpdateStudentDto,
): Promise<Student> {
  const res = await fetch(`${API_BASE}/students/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message ?? 'Error al actualizar alumno');
  }
  return res.json();
}

export async function deleteStudent(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/students/${id}`, { method: 'DELETE' });
  if (!res.ok) {
    if (res.status === 404) throw new Error('Estudiante no encontrado');
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message ?? 'Error al eliminar alumno');
  }
}
