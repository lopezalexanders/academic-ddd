import { MainLayout } from '../../templates/MainLayout';

export function HorariosPage() {
  return (
    <MainLayout>
      <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm ring-1 ring-slate-200/50 sm:p-10">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Horarios
        </h2>
        <p className="mt-3 text-slate-600">Gestión de horarios.</p>
      </div>
    </MainLayout>
  );
}
