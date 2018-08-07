/**
 2  * @author mrdoob / http://mrdoob.com/
 3  **/
/**@constructor**/
window.THREE.UV = function ( u, v ) {
  this.u = u || 0;
  this.v = v || 0;
};

window.THREE.UV.prototype = {

  constructor: window.THREE.UV,

  set: function ( u, v ) {

    this.u = u;
    this.v = v;

    return this;

  },

  copy: function ( uv ) {

    this.u = uv.u;
    this.v = uv.v;

    return this;

  },

  lerpSelf: function ( uv, alpha ) {

    this.u += ( uv.u - this.u ) * alpha;
    this.v += ( uv.v - this.v ) * alpha;

    return this;

  },

  clone: function () {

    return new window.THREE.UV( this.u, this.v );

  }

};