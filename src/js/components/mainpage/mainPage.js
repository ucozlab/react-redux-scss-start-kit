import React, { Component } from 'react';
import { connect } from "react-redux";

class MainPage extends Component {

  constructor(props){
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div className="mainpage">

      </div>
    );
  }
}

const mapStateToProps = () => {
  return {

  };
};
const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);