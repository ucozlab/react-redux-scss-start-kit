import React, { Component } from 'react';
import APP from "../../lib/app";
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

      const player = new APP.Player();
      player.load( JSON.parse( text ) );
      player.setSize( window.innerWidth, window.innerHeight );
      player.play();

      document.getElementById('3d').appendChild( player.dom );

      window.addEventListener( 'resize', function () {
        player.setSize( window.innerWidth, window.innerHeight );
      });

    });

    // // camera
    // camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 100 );
    // camera.position.set( 20, 20, 20 );
    //
    // // controls
    // controls = new THREE.OrbitControls( camera );
    // controls.minDistance = 10;
    // controls.maxDistance = 50;

  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div id="3d"></div>
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