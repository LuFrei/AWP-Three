import React, { Component } from 'react'
import * as THREE from 'three'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"

class Viewport extends Component {

  componentDidMount(){
    this.sceneSetup();
    this.addObjectsToScene();
    this.startAnimationLoop();

    window.addEventListener('resize', this.handleWindowResize.bind(this)); //<-- this will have no effect now as we hard coded the size of our canvas, but when we start messing with scalable nd resizable canvases, this will be needed
  }

  handleWindowResize(){
    const width = this.el.clientWidth;
    const height = this.el.clientHeight;

    this.renderer.setSize( width, height );
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  sceneSetup (){
    //get width & Height
    const width = this.el.clientWidth;
    const height = this.el.clientHeight;

    //create Scene
    this.scene = new THREE.Scene();

    //create & Setup camera
    this.camera = new THREE.PerspectiveCamera( 75, width/height, 0.1, 1000);
    this.camera.position.z = 6;
    this.camControls = new OrbitControls(this.camera, this.el); //<-- this.el is optional, and used for event listening
    //By default scroll wheel zooms, but if there are multiple scenes/you need to scroll through the whole webpage, it might be wise to turn it off. I'll be leaving it on
    //this.camControls.enableZoom = false; 
    //more on OrbitControls: https://threejs.org/docs/#examples/en/controls/OrbitControls

    //create & Setup renderer
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);

    //attach it to DOM
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