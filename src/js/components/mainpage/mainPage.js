import React, { Component } from 'react';
import APP from "../../lib/threejs-app";
import { connect } from "react-redux";

class MainPage extends Component {

  constructor(props){
    super(props);
    this.state = {

    };
  }

  componentDidMount() {

    const THREE = window.THREE;

    const loader = new THREE.FileLoader();
    loader.load( '/app.json', function ( text ) {

      // console.log(text);

      const player = new APP.Player();
      player.load( JSON.parse( text ) );
      player.setSize( window.innerWidth, window.innerHeight );
      player.play();

      document.getElementById('3d').appendChild( player.dom );

      window.addEventListener( 'resize', function () {
        player.setSize( window.innerWidth, window.innerHeight );
      });

    });

  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div id="3d"/>
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