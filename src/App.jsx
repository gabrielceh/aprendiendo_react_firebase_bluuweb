import { Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import Login from './routes/Login';
import Navbar from './components/Navbar';
import RequireAuth from './components/RequireAuth';

const App = () => {
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
        {/* Ruta Login */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
