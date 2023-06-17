import { Routes, Route } from 'react-router-dom';

import { Homepage } from './pages/Home/Homepage.jsx';

import { Layout } from './component/Layout/Layout.jsx'

import { Register } from './pages/Register'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="/register" element={<Register />}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;