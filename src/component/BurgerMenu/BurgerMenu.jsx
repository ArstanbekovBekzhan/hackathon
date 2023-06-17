import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';

export default class BurgerMenu extends React.Component {
  state = {
    menuOpen: false,
  };

  handleStateChange(state) {
    this.setState({ menuOpen: state.isOpen });
  }

  closeMenu() {
    this.setState({ menuOpen: false });
  }

  render() {
    return (
      <Menu isOpen={this.state.menuOpen} onStateChange={state => this.handleStateChange(state)}>
        <h1 className='logo'>John's Blog</h1>
        <Link onClick={() => this.closeMenu()} className="menu-item" to="/">
          Home
        </Link>
        <Link onClick={() => this.closeMenu()} className="menu-item" to="/works">
          Works
        </Link>
        <Link onClick={() => this.closeMenu()} className="menu-item" to="/blog">
          Blog
        </Link>
        <Link onClick={() => this.closeMenu()} className="menu-item" to="/contact">
          Contact
        </Link>
      </Menu>
    );
  }
}