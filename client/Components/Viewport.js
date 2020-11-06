import React, { Component } from 'react'
import * as THREE from 'three'

class Viewport extends Component {

  componentDidMount(){
    this.sceneSetup();
    this.addObjectsToScene();
    this.startAnimationLoop();
  }

  sceneSetup (){
    const width = this.el.clientWidth;
    const height = this.el.clientHeight;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 75, width/height, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();

    this.camera.position.z = 6;

    this.renderer.setSize(width, height);

    this.el.appendChild( this.renderer.domElement );
  }

  addObjectsToScene(){
    //Creating & adding Mesh
    const geo = new THREE.BoxGeometry(1, 1, 1);
    const mat = new THREE.MeshPhongMaterial({
      color: 0x156289,
      emissive: 0x072534,
      side: THREE.DoubleSide,
      flatShading: true
    });

    this.cube = new THREE.Mesh( geo, mat );
    this.scene.add( this.cube )
    
    //Creating & adding lights
    const lights = [];
    
    lights.push(new THREE.PointLight(0xffffff, 1, 0));
    lights.push(new THREE.PointLight(0xffffff, 1, 0));
    lights.push(new THREE.PointLight(0xffffff, 1, 0));
    
    lights[0].position.set(0, 200, 0);
    lights[1].position.set(100, 200, 100);
    lights[2].position.set(-100, -200, -100);
    
    lights.forEach(light => {
      this.scene.add(light)
    })
  }
  
  startAnimationLoop(){
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
    
    this.renderer.render( this.scene, this.camera );
    this.requestID = window.requestAnimationFrame(this.startAnimationLoop.bind(this)); //<-- need to .bind(this) to carry the "this" reference along
  }
  
  render(){
    return(
      <div className="view-port" ref={ ref => this.el = ref } /> //<--- add ref={ (ref) => this.mount = ref }
    )
  }

}

export default Viewport;