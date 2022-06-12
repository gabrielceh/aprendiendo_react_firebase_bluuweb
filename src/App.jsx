import { Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import Login from './routes/Login';
import Register from './routes/Register';
import Navbar from './components/Navbar';
import RequireAuth from './components/RequireAuth';
import { useContext } from 'react';
import { UserContext } from './context/UserProvider';
import LayoutContainerForm from './components/LayoutContainerForm';

const App = () => {
  const { user } = useContext(UserContext);

  if (user === false) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar></Navbar>
      <h1>App</h1>
      <Routes>
        {/* Ruta Protegida Home */}
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        {/* Esto es por si dos elementos compartiran el mismo layout */}
        <Route path="/" element={<LayoutContainerForm></LayoutContainerForm>}>
          {/* Ruta Login */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
