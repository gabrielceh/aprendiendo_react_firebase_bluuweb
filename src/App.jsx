import { Route, Routes } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './context/UserProvider';

import Home from './routes/Home';
import Login from './routes/Login';
import Register from './routes/Register';
import Profile from './routes/Profile';
import NotFound from './routes/NotFound';

import Navbar from './components/Navbar';
import LayoutRequireAuth from './components/layouts/LayoutRequireAuth';
import LayoutContainerForm from './components/layouts/LayoutContainerForm';
import Loading from './components/Loading';
import LayoutRedirect from './components/layouts/LayoutRedirect';

const App = () => {
  const { user } = useContext(UserContext);

  if (user === false) {
    return <Loading />;
  }

  return (
    <>
      <Navbar></Navbar>
      <Routes>
        {/* Ruta Protegida Home */}
        {/* <Route
          path="/"
          element={
            <LayoutRequireAuth>
              <Home />
            </LayoutRequireAuth>
          }
        /> */}

        {/*Rutas protegidas  */}
        <Route path="/" element={<LayoutRequireAuth />}>
          <Route index element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Esto es por si dos elementos compartiran el mismo layout */}
        <Route path="/" element={<LayoutContainerForm />}>
          {/* Ruta Login */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="/:nanoid" element={<LayoutRedirect />}>
          <Route index element={<NotFound />}></Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
