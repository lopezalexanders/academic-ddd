import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { ProtectedRoute } from './components/guards';
import { HomePage } from './components/pages/HomePage';
import { LoginPage } from './components/pages/LoginPage';
import { EstudiantesPage, RegisterPage, EditPage } from './components/pages/EstudiantesPage';
import { InscripcionCursosPage } from './components/pages/InscripcionCursosPage';
import { UsuariosPage } from './components/pages/UsuariosPage';
import { CursosPage } from './components/pages/CursosPage';
import { HorariosPage } from './components/pages/HorariosPage';
import { MiPerfilPage } from './components/pages/MiPerfilPage';
import { MisClasesPage } from './components/pages/MisClasesPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          element={
            <ProtectedRoute>
              <Outlet />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<HomePage />} />
          <Route path="/estudiantes" element={<EstudiantesPage />} />
          <Route path="/estudiantes/registro" element={<RegisterPage />} />
          <Route path="/estudiantes/:id/editar" element={<EditPage />} />
          <Route path="/inscripcion-cursos" element={<InscripcionCursosPage />} />
          <Route path="/usuarios" element={<UsuariosPage />} />
          <Route path="/cursos" element={<CursosPage />} />
          <Route path="/horarios" element={<HorariosPage />} />
          <Route path="/mi-perfil" element={<MiPerfilPage />} />
          <Route path="/mis-clases" element={<MisClasesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
