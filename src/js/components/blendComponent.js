import React, { Component } from 'react';
import { connect } from "react-redux";
import b4w from "blend4web";

class BlendComponent extends Component {

  constructor(props){
    super(props);
    this.state = {

    };
  }

  componentDidMount() {

    b4w.register("sev_canvas_app", (exports, require) => {

// import modules used by the app
      this.m_app       = require("app");
      // var m_cfg       = require("config");
      this.m_data      = require("data");
      this.m_preloader = require("preloader");
      this.m_ver       = require("version");

// detect application mode
      this.DEBUG = (this.m_ver.type() == "DEBUG");

// automatically detect assets path
//       var APP_ASSETS_PATH = m_cfg.get_assets_path("blend4web-folder");

      /**
       * callback executed when the app is initialized
       */
      const init_cb = (canvas_elem, success) => {
        if (!success) {
          console.log("b4w init failure");
          return;
        }
        this.m_preloader.create_preloader();
        // ignore right-click on the canvas element
        canvas_elem.oncontextmenu = function(e) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        };
        load();
      };

      /**
       * load the scene data
       */
      const load = () => {
        this.m_data.load("/blend4web-folder/assets/kit02.json", load_cb, preloader_cb);
      };

      /**
       * update the app's preloader
       */
      const preloader_cb = (percentage) => {
        this.m_preloader.update_preloader(percentage);
      };

      /**
       * callback executed when the scene data is loaded
       */
      const load_cb = (data_id, success) => {
        if (!success) {
          console.log("b4w load failure");
          return;
        }
        this.m_app.enable_camera_controls();
        // place your code here
      }


      /**
       * export the method to initialize the app (called at the bottom of this file)
       */
      exports.init_1 = () => {
        this.m_app.init({
          canvas_container_id: "main_canvas_container_1",
          callback: init_cb,
          show_fps: this.DEBUG,
          console_verbose: this.DEBUG,
          autoresize: true
        });
      };

    });

// import the app module and start the app by calling the init method
    b4w.require("sev_canvas_app", "NS_1").init_1();
  }

  componentWillUnmount() {
    this.m_data.unload();
  }

  render() {
    return (
      <div id="main_canvas_container_1"/>
    );
  }
}

const mapStateToProps = () => {
  return {

  };
};
const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(BlendComponent);