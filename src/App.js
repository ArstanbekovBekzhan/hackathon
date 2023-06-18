import { Routes, Route } from 'react-router-dom';
import "./App.css"
import { Homepage } from './pages/Home/Homepage.jsx';
import { CardDetails } from './pages/Details/Details';
import Private from './component/PrivateCabinet/Private.jsx'
import { PublicServicesDynamic } from './pages/PublicServicesDynamic';
import Registration from './pages/auth/Registration';
import Login from './pages/auth/Login';
import { Admin } from './component/Admin/admin.jsx';
import { Layout } from './component/Layout/Layout';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="/register" element={<Registration />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/cards/:id" element={<CardDetails />} />
          <Route path="/Categories/:serviceEng/:id" element={<PublicServicesDynamic/>} />
          <Route path="/Private" element={<Private />} />
          <Route path="/Admin" element={<Admin />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;