import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Layout = () => {
  const [headerHeight, setHeaderHeight] = useState(0);

  const handleHeaderHeight = (height) => {
    setHeaderHeight(height);
    console.log(height);
  };

  return (
    <>
      <Header onHeaderHeight={handleHeaderHeight} />
      <main className="container" style={{ marginTop: headerHeight, backgroundColor: 'brown' }}>
       <Outlet />
      </main>
      <Footer />
    </>
  );
};

export { Layout };