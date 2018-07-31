import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';

// import Header from './components/header';
// import Footer from './components/footer';

class App extends Component {

  static propTypes = {
    children: PropTypes.array,
  };

  render() {
    return (
      <Fragment>
        {/*<Header/>*/}
        <main>
          {this.props.children}
        </main>
        {/*<Footer/>*/}
      </Fragment>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
