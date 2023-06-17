import { Routes, Route } from 'react-router-dom';
import "./App.css"
import { Homepage } from './pages/Home/Homepage.jsx';
import { CardDetails } from './pages/Details/Details';
import { Layout } from './component/Layout/Layout.jsx';
import { Private } from './component/PrivateCabinet/Private.jsx'
import { Register } from './pages/Register'
import { PublicServicesDynamic } from './pages/PublicServicesDynamic';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="/register" element={<Register />}/>
          <Route path="/cards/:id" element={<CardDetails />} />
          <Route path="/Categories/:serviceEng" element={<PublicServicesDynamic />} />
          <Route path="/Private" element={<Private />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;