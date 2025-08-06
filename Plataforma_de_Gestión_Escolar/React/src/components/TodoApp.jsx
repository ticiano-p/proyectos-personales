import { Link, Route, Routes,  } from 'react-router-dom';
import { AuthContext, AuthProvider } from '../contexts/AuthContext';
import Footer from './Footer';
import UserList from '../pages/users/UserList';
import UserPostForm from '../pages/users/UserPostForm';
import UserPostFormEdit from '../pages/users/UserPostFormEdit';

import SchoolsList from '../pages/schools/SchoolList';
import SchoolPostForm from '../pages/schools/SchoolPostForm';                             
import SchoolEditForm from '../pages/schools/SchoolsPutForm';      

import NotificadosList from '../pages/announcement/notificadosList';      
import CrearNotificados from '../pages/announcement/crearNotificados';   
import EditarNotificados from '../pages/announcement/editarNotificados';   
import RealizarPago from '../pages/payment/CreatePaymentForm';
import NotFound from '../pages/NotFound';
import Userlogin from '../pages/users/Userlogin';
import Home from '../pages/Home';
import Header from './header/Header';
import '../index.css';
import AdminRoutes from './protectedRoutes/AdminRutes';
import UnLoggedRoutes from './protectedRoutes/UnloggedRutes';
import LoggedRoutes from './protectedRoutes/LoggedRutes';
import DirectorRoutes from './protectedRoutes/DirectorRules';
import TeacherRules from './protectedRoutes/TeacherRules';
//-------------
import CursoList from '../pages/Course/MyCourses';      
import NewCurso from '../pages/Course/NewCurso';      
import EditCurso from '../pages/Course/EditCurso';
import NewMesage from '../pages/announcementCourse/crearMensaje';      
import ComunicadosCursoList from '../pages/announcementCourse/ComunicadosCursoList';      
import EditMesage from '../pages/announcementCourse/editarNotificados';   
import StudentsAdmin from '../pages/users/StudentsAdmin';   
import AddCourseUser from '../pages/users/AddCourseUser';   


const TodoApp = () => {        
  return (
    <div className='grid grid-rows-[100px_1fr_250px] min-h-screen'>
      <AuthProvider>

        <Header/>
    
        <Routes>
          <Route path='/' element={<Home/>} />
          // {/*Users*/}
          <Route path='/Crear_Usuario' element={
            <UnLoggedRoutes>
              <UserPostForm />
            </UnLoggedRoutes>
          } />
          <Route path='/Iniciar_Sesion' element={
            <UnLoggedRoutes>
              <Userlogin/>
            </UnLoggedRoutes>
          } />
          <Route path='/Editar_Usuario/:id' element={
            <LoggedRoutes>
              <UserPostFormEdit />
            </LoggedRoutes>
          } />
          <Route path='/Lista_Usuarios' element={
            <AdminRoutes >
              <UserList />
            </AdminRoutes>
          } />
          // {/*Schools*/}
          <Route path='/Crear_Escuela' element={
            <LoggedRoutes>
              <SchoolPostForm />
            </LoggedRoutes>
          } />
          <Route path='/Editar_Escuela/:id' element={
            <DirectorRoutes>
              <SchoolEditForm />
            </DirectorRoutes>
          } />
          <Route path='/Lista_Escuela' element={
            <AdminRoutes>
              <SchoolsList />
            </AdminRoutes>
          } />
          // {/*AnnouncementList*/}
          <Route path='/Comunicados' element={
            <LoggedRoutes >
              <NotificadosList/>
            </LoggedRoutes>
          } />
          <Route path='/Crear_Comunicados' element={
            <DirectorRoutes >
              <CrearNotificados/>
            </DirectorRoutes>
          } />
          <Route path="/Editar_Comunicado/:id" element={
            <DirectorRoutes >
              <EditarNotificados />
            </DirectorRoutes>
          } />

          // {/*Payment*/}
          <Route path='/Realizar_Pago' element={
            <DirectorRoutes >
              <RealizarPago/>
            </DirectorRoutes>
          } />
           <Route path='/Comunicados-Curso/:id' element={
            <LoggedRoutes >
              <ComunicadosCursoList/>
            </LoggedRoutes>
          } />
           <Route path='/Curso' element={
            <LoggedRoutes >
              <CursoList/>
            </LoggedRoutes>
          } /> 
          <Route path="/NuevoCurso" element={
            <DirectorRoutes >
              <NewCurso/>
            </DirectorRoutes>
          } />
          <Route path="/EditCurso/:course_id" element={
            <DirectorRoutes >
              <EditCurso/>
            </DirectorRoutes>
          } />
          <Route path='/Nuevo_Mensaje/:course_id' element={
            <TeacherRules >
              <NewMesage/>
            </TeacherRules>
          } />
          <Route path="/Editar_Mensaje/:id" element={
            <TeacherRules >
              <EditMesage />
            </TeacherRules>
          } />
            <Route path="/Estudiantes" element={
            <DirectorRoutes >
              <StudentsAdmin/>
            </DirectorRoutes>
          } />
          <Route path="/Agregar_Curso_Usuario/:id" element={
            <DirectorRoutes >
              <AddCourseUser/>
            </DirectorRoutes>
          } />
          
          <Route path='*' element={<NotFound />}/>
        </Routes>
    
        <Footer/>

      </AuthProvider>
    </div>
  );
};

export default TodoApp;
