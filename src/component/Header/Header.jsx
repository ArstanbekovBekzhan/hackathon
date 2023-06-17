import React from 'react';
import "./Header.css";

const Header = ({ onHeaderHeight }) => {
  return (
    <div>
    <section class="top-nav">
      <div>Airngas Controls</div>
      <input id="menu-toggle" type="checkbox" />
      <label class="menu-button-container" for="menu-toggle">
        <div class="menu-button"></div>
      </label>
      <ul class="menu">
        <li>
          <a href="#products">Products</a>
        </li>
        <li>
          <a href="#whyus">Why Us?</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>
    </section>
  </div>
  );
};

export default Header;
