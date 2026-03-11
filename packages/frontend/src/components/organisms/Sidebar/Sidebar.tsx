import { NavLink } from 'react-router-dom';
import { useAuthStore, type Role } from '../../../stores';

type MenuItem = { to: string; label: string };

const MENU_BY_ROLE: Record<Role, MenuItem[]> = {
  ADMINISTRATOR: [
    { to: '/usuarios', label: 'Usuarios' },
    { to: '/estudiantes', label: 'Estudiantes' },
    { to: '/cursos', label: 'Cursos' },
    { to: '/horarios', label: 'Horarios' },
  ],
  STUDENT: [
    { to: '/mi-perfil', label: 'Mi perfil' },
    { to: '/inscripcion-cursos', label: 'Inscripción' },
    { to: '/mis-clases', label: 'Mis clases' },
  ],
  TEACHER: [
    { to: '/mi-perfil', label: 'Mi perfil' },
    { to: '/mis-clases', label: 'Mis clases' },
  ],
};

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
    isActive
      ? 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200/60'
      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
  }`;

export function Sidebar() {
  const user = useAuthStore((s) => s.user);
  const items = user ? MENU_BY_ROLE[user.role] : [];

  if (items.length === 0) {
    return null;
  }

  return (
    <aside className="flex w-56 flex-shrink-0 flex-col border-r border-slate-200/80 bg-white/95">
      <nav className="flex flex-col gap-0.5 p-3" aria-label="Menú principal">
        {items.map(({ to, label }) => (
          <NavLink key={to} to={to} className={navLinkClass}>
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
