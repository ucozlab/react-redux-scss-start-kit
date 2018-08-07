import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

class Header extends Component {

  static propTypes = {
    isLoggedIn: PropTypes.bool
  };

  render() {
    return (
      <header className="header">
        <Link className="header-button" to={"/"}>three.js</Link>
        <Link className="header-button" to={"/blend4web"}>blend4web</Link>
      </header>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    isLoggedIn: store.userState.isLoggedIn
  };
};
const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Header);