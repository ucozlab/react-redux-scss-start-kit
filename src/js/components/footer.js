import React, { Component } from 'react';
import { connect } from "react-redux";

class Footer extends Component {

  render() {
    return (
      <footer className="footer">
        (c) quote countertops 2018
      </footer>
    );
  }
}

const mapStateToProps = () => {
  return {

  };
};
const mapDispatchToProps = () => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);