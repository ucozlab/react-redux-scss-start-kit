/**
 * @author mrdoob / http://mrdoob.com/
 */

const THREE = window.THREE;
const WEBVR = window.WEBVR;

export default {

  Player: function () {

    var loader = new THREE.ObjectLoader();
    var camera, scene, renderer, controls;

    var events = {};

    var dom = document.createElement( 'div' );

    this.dom = dom;

    this.width = 500;
    this.height = 500;

    this.load = function ( json ) {

      renderer = new THREE.WebGLRenderer( { antialias: true } );
      renderer.setClearColor( 0x000000 );
      renderer.setPixelRatio( window.devicePixelRatio );

      var project = json.project;

      if ( project.gammaInput ) renderer.gammaInput = true;
      if ( project.gammaOutput ) renderer.gammaOutput = true;
      if ( project.shadows ) renderer.shadowMap.enabled = true;
      if ( project.vr ) renderer.vr.enabled = true;

      dom.appendChild( renderer.domElement );

      const parsedScene = loader.parse( json.scene );

      // console.log('parsedScene', parsedScene);
        parsedScene.traverse(( child ) => {
          // if ( child instanceof THREE.Mesh && child.name === "Icosphere") {
          //   this.replaceChild(child);
          // }
          // console.log(child);
          if (child.type === "SpotLight") {
            console.log(child);
            child.target.position.set(child.position.x, 0, child.position.z);
            child.target.updateMatrixWorld();

          }
        });

      this.setScene( parsedScene );
      this.setCamera( loader.parse( json.camera ) );
      this.setControls();

      events = {
        init: [],
        start: [],
        stop: [],
        keydown: [],
        keyup: [],
        mousedown: [],
        mouseup: [],
        mousemove: [],
        touchstart: [],
        touchend: [],
        touchmove: [],
        update: []
      };

      var scriptWrapParams = 'player,renderer,scene,camera';
      var scriptWrapResultObj = {};

      for ( var eventKey in events ) {

        scriptWrapParams += ',' + eventKey;
        scriptWrapResultObj[ eventKey ] = eventKey;

      }

      var scriptWrapResult = JSON.stringify( scriptWrapResultObj ).replace( /"/g, '' );

      for ( var uuid in json.scripts ) {

        var object = scene.getObjectByProperty( 'uuid', uuid, true );

        if ( object === undefined ) {

          console.warn( 'APP.Player: Script without object.', uuid );
          continue;

        }

        var scripts = json.scripts[ uuid ];

        for ( var i = 0; i < scripts.length; i ++ ) {

          var script = scripts[ i ];

          var functions = ( new Function( scriptWrapParams, script.source + '\nreturn ' + scriptWrapResult + ';' ).bind( object ) )( this, renderer, scene, camera );

          for ( var name in functions ) {

            if ( functions[ name ] === undefined ) continue;

            if ( events[ name ] === undefined ) {

              console.warn( 'APP.Player: Event type not supported (', name, ')' );
              continue;

            }

            events[ name ].push( functions[ name ].bind( object ) );

          }

        }

      }

      dispatch( events.init, arguments );

    };

    this.setCamera = function ( value ) {

      camera = value;
      camera.aspect = this.width / this.height;
      camera.updateProjectionMatrix();

      if ( renderer.vr.enabled ) {
        dom.appendChild( WEBVR.createButton( renderer ) );
      }

    };

    this.setControls = function () {
      controls = new THREE.OrbitControls( camera );
      controls.enablePan = true;
      controls.enableZoom = true;
      controls.enableDamping = true;
      controls.minPolarAngle = 0;   // y scale
      controls.maxPolarAngle = 1.5; // y scale
      controls.dampingFactor = 0.07;
      controls.rotateSpeed = 0.07;
      controls.minAzimuthAngle = -1; // x scale
      controls.maxAzimuthAngle = 1; // x scale
    };

    this.setScene = function ( value ) {

      scene = value;

    };

    this.replaceChild = function (child) {

      console.log('child', child);

      var path = "/img/Park2/";
      var format = '.jpg';
      var urls = [
        path + 'posx' + format, path + 'negx' + format,
        path + 'posy' + format, path + 'negy' + format,
        path + 'posz' + format, path + 'negz' + format
      ];

      var textureCube = new THREE.CubeTextureLoader().load( urls );
      textureCube.format = THREE.RGBFormat;

      //

      // var geometry = new THREE.SphereBufferGeometry( 100, 32, 16 );

      var shader = THREE.FresnelShader;
      var uniforms = THREE.UniformsUtils.clone( shader.uniforms );

      uniforms[ "tCube" ].value = textureCube;

      var material = new THREE.ShaderMaterial( {
        uniforms: uniforms,
        vertexShader: shader.vertexShader,
        fragmentShader: shader.fragmentShader
      });

      child.material = material;

    };

    this.setSize = function ( width, height ) {

      this.width = width;
      this.height = height;

      if ( camera ) {

        camera.aspect = this.width / this.height;
        camera.updateProjectionMatrix();

      }

      if ( renderer ) {

        renderer.setSize( width, height );

      }

    };

    function dispatch( array, event ) {

      for ( var i = 0, l = array.length; i < l; i ++ ) {

        array[ i ]( event );

      }

    }

    var time, prevTime;

    function animate() {

      time = performance.now();

      try {

        dispatch( events.update, { time: time, delta: time - prevTime } );

      } catch ( e ) {

        console.error( ( e.message || e ), ( e.stack || "" ) );

      }

      controls.update();

      renderer.render( scene, camera );

      prevTime = time;

    }

    this.play = function () {

      prevTime = performance.now();

      document.addEventListener( 'keydown', onDocumentKeyDown );
      document.addEventListener( 'keyup', onDocumentKeyUp );
      document.addEventListener( 'mousedown', onDocumentMouseDown );
      document.addEventListener( 'mouseup', onDocumentMouseUp );
      document.addEventListener( 'mousemove', onDocumentMouseMove );
      document.addEventListener( 'touchstart', onDocumentTouchStart );
      document.addEventListener( 'touchend', onDocumentTouchEnd );
      document.addEventListener( 'touchmove', onDocumentTouchMove );

      dispatch( events.start, arguments );

      renderer.setAnimationLoop( animate );

    };

    this.stop = function () {

      document.removeEventListener( 'keydown', onDocumentKeyDown );
      document.removeEventListener( 'keyup', onDocumentKeyUp );
      document.removeEventListener( 'mousedown', onDocumentMouseDown );
      document.removeEventListener( 'mouseup', onDocumentMouseUp );
      document.removeEventListener( 'mousemove', onDocumentMouseMove );
      document.removeEventListener( 'touchstart', onDocumentTouchStart );
      document.removeEventListener( 'touchend', onDocumentTouchEnd );
      document.removeEventListener( 'touchmove', onDocumentTouchMove );

      dispatch( events.stop, arguments );

      renderer.setAnimationLoop( null );

    };

    this.dispose = function () {

      while ( dom.children.length ) {

        dom.removeChild( dom.firstChild );

      }

      renderer.dispose();

      camera = undefined;
      scene = undefined;
      renderer = undefined;

    };

    //

    function onDocumentKeyDown( event ) {

      dispatch( events.keydown, event );

    }

    function onDocumentKeyUp( event ) {

      dispatch( events.keyup, event );

    }

    function onDocumentMouseDown( event ) {

      dispatch( events.mousedown, event );

    }

    function onDocumentMouseUp( event ) {

      dispatch( events.mouseup, event );

    }

    function onDocumentMouseMove( event ) {

      dispatch( events.mousemove, event );

    }

    function onDocumentTouchStart( event ) {

      dispatch( events.touchstart, event );

    }

    function onDocumentTouchEnd( event ) {

      dispatch( events.touchend, event );

    }

    function onDocumentTouchMove( event ) {

      dispatch( events.touchmove, event );

    }

  }

};
