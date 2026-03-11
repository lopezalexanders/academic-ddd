import { MainLayout } from '../../templates/MainLayout';
import { useAuthStore } from '../../../stores';

export function MiPerfilPage() {
  const user = useAuthStore((s) => s.user);

  return (
    <MainLayout>
      <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm ring-1 ring-slate-200/50 sm:p-10">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Mi perfil
        </h2>
        {user && (
          <div className="mt-4 space-y-2 text-slate-600">
            <p><span className="font-medium text-slate-700">Nombre:</span> {user.name}</p>
            <p><span className="font-medium text-slate-700">Email:</span> {user.email}</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
