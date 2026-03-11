import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../../templates/MainLayout';
import { Button } from '../../atoms/Button';
import { getStudents, deleteStudent, type Student } from '../../../services/studentService';

function formatBirthDate(value: string): string {
  if (!value) return '–';
  try {
    return new Date(value).toLocaleDateString('es');
  } catch {
    return value;
  }
}

export function EstudiantesPage() {
  const navigate = useNavigate();
  const [students, setStudents] = useState<Student[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadStudents = async () => {
    const result = await getStudents();
    setStudents(result);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleDelete = async (student: Student) => {
    if (!window.confirm(`¿Eliminar a ${student.firstName} ${student.lastName}? Esta acción no se puede deshacer.`)) {
      return;
    }
    setError(null);
    setDeletingId(student.id);
    try {
      await deleteStudent(student.id);
      await loadStudents();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <MainLayout>
      <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm ring-1 ring-slate-200/50 sm:p-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Estudiantes
          </h2>
          <Button type="button" onClick={() => navigate('/estudiantes/registro')}>
            Agregar estudiante
          </Button>
        </div>
        {students.length > 0 ? (
          <div className="mt-6 overflow-x-auto rounded-lg border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-slate-50 text-slate-700">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">Código</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Nombre</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Apellidos</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Usuario</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Email</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Documento</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Fecha de nacimiento</th>
                  <th scope="col" className="px-4 py-3 font-semibold text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50/70">
                    <td className="px-4 py-3 font-medium text-slate-900">{student.code}</td>
                    <td className="px-4 py-3 text-slate-700">{student.firstName}</td>
                    <td className="px-4 py-3 text-slate-700">{student.lastName}</td>
                    <td className="px-4 py-3 text-slate-600">{student.username ?? '–'}</td>
                    <td className="px-4 py-3 text-slate-600">{student.email ?? '–'}</td>
                    <td className="px-4 py-3 text-slate-600">{student.document}</td>
                    <td className="px-4 py-3 text-slate-600">
                      {formatBirthDate(student.birthDate)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => navigate(`/estudiantes/${student.id}/editar`)}
                          className="rounded-lg px-3 py-1.5 text-sm font-medium text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(student)}
                          disabled={deletingId === student.id}
                          className="rounded-lg px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 disabled:opacity-50"
                        >
                          {deletingId === student.id ? 'Eliminando…' : 'Eliminar'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="mt-6 text-slate-600">No hay estudiantes registrados.</p>
        )}
        {error && (
          <p className="mt-4 text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>
        )}
      </div>
    </MainLayout>
  );
}
