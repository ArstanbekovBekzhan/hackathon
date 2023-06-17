import { Routes, Route } from 'react-router-dom';
import "./App.css"
import { Homepage } from './pages/Home/Homepage.jsx';
import { CardDetails } from './pages/Details/Details';
import { Layout } from './component/Layout/Layout.jsx'
import Registration from './pages/auth/Registration';
import Login from './pages/auth/Login';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="/register" element={<Registration />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/cards/:id" element={<CardDetails />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;