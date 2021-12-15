import React, { Component } from 'react'
import * as THREE from 'three'
import SimplexNoise from 'simplex-noise';
import chroma from "chroma-js";


const conf = {
    fov: 75,
    cameraZ: 75,
    xyCoef: 50,
    zCoef: 10,
    lightIntensity: 0.9,
    ambientColor: 0x000000,
    light1Color: 0x0E09DC,
    light2Color: 0x1CD1E1,
    light3Color: 0x18C02C,
    light4Color: 0xee3bcf
};

class DragFlask extends Component {
    constructor(props) {
        super(props)
        this.props = props.props
        this.initScene = this.initScene.bind(this)
        this.initLights = this.initLights.bind(this)
        this.animatePlane = this.animatePlane.bind(this)
        this.animateLights = this.animateLights.bind(this)
        this.updateLightsColors = this.updateLightsColors.bind(this)
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(100, 100)
        this.camera = new THREE.PerspectiveCamera(conf.fov);
        this.camera.position.z = conf.cameraZ;
        this.camera.aspect = 1;
        this.simplex = new SimplexNoise();
        this.animate = this.animate.bind(this)
    }



    initScene() {
        this.scene = new THREE.Scene();
        this.initLights();
        this.group = new THREE.Group()
        const middle_ = new THREE.CylinderGeometry(10, 15, 30, 32)
        const material = new THREE.MeshPhysicalMaterial({
            metalness: 1.0,
            roughness: 0.2,
            refractionRatio: 0.95,
            transparent: true,
            opacity: 0.1,
            transmission: 0.1,
            side: THREE.BackSide,
            clearcoat: 1.0,
            clearcoatRoughness: 1
        })
        const mat_solid = new THREE.MeshPhysicalMaterial({ color: this.props.props.color})
        console.log(this.props?.color)
        const mat_liquid = new THREE.MeshPhongMaterial({ color: this.props.props.color, transparent: true,
            opacity: this.props?.props.opacity })
        this.middle = new THREE.Mesh(middle_, material)
        this.group.add(this.middle)
        this.scene.add(this.group)
        const geo = new THREE.CylinderBufferGeometry(12.9, 14.9 , 10, 115)
        this.thing = new THREE.Mesh(geo, (this.props.props.type_ === 'liquid')?mat_liquid:mat_solid)
        this.group.add(this.thing)
        this.thing.position.y = -10
        this.group.position.y = -20;
        this.group.position.z = 40
        console.log(this.props)
        this.camera.position.z = 90
        this.camera.position.y = -9
        this.mount.appendChild(this.renderer.domElement)
    }

    componentDidMount() {
        this.simplex = new SimplexNoise();
        this.initScene();
        this.animate();
    }


    componentWillUnmount() {
        cancelAnimationFrame(this.frameId)
        this.mount.removeChild(this.renderer.domElement)
    }

    animatePlane() {
        const wArray = this.thing.geometry.attributes.position.array;
        const time = Date.now() * 0.0002;
        for (let i = wArray.length / 2; i < wArray.length; i += 3) {
            wArray[i + 1] = this.props.props.type_==='liquid' ?
                this.simplex.noise4D(wArray[i] / 50, wArray[i + 1] / 50, time, (4.34)) * 3  + 5 :
                this.simplex.noise3D(wArray[i] / 50, wArray[i + 1] / 50, wArray[i + 2] / 50) * 3  + 5 ;
        }
        for (let i = 0; i < wArray.length / 8 + 3; i += 3) {
            wArray[i + 1] = wArray[(wArray.length / 2) + i + 1]
        }
        for (let i = 261; i < 347; i += 3) {
            wArray[i+1] = wArray[(wArray.length / 2) + i + 1]
        }
        this.thing.geometry.attributes.position.needsUpdate = true;
        this.thing.geometry.computeBoundingSphere();
    }

    initLights() {
        const r = 90;
        const y = -20;
        const lightDistance = 500;


        this.light1 = new THREE.PointLight(conf.light1Color, conf.lightIntensity, lightDistance);
        this.light1.position.set(0, y, r);
        this.scene.add(this.light1);
        this.light2 = new THREE.PointLight(conf.light2Color, conf.lightIntensity, lightDistance);
        this.light2.position.set(0, -y, -r);
        this.scene.add(this.light2);
        this.light3 = new THREE.PointLight(conf.light3Color, conf.lightIntensity, lightDistance);
        this.light3.position.set(r, y, 0);
        this.scene.add(this.light3);
        this.light4 = new THREE.PointLight(conf.light4Color, conf.lightIntensity, lightDistance);
        this.light4.position.set(-r, y, 0);
        this.scene.add(this.light4);
    }

    animateLights() {
        const time = Date.now() * 0.001;
        const d = 50;
        this.light1.position.x = Math.sin(time * 0.1) * d;
        this.light1.position.z = Math.cos(time * 0.2) * d;
        this.light2.position.x = Math.cos(time * 0.3) * d;
        this.light2.position.z = Math.sin(time * 0.4) * d;
        this.light3.position.x = Math.sin(time * 0.5) * d;
        this.light3.position.z = Math.sin(time * 0.6) * d;
        this.light4.position.x = Math.sin(time * 0.7) * d;
        this.light4.position.z = Math.cos(time * 0.8) * d;
    }
    updateLightsColors() {
        conf.light1Color = chroma.random().hex();
        conf.light2Color = chroma.random().hex();
        conf.light3Color = chroma.random().hex();
        conf.light4Color = chroma.random().hex();
        this.light1.color = new THREE.Color(conf.light1Color);
        this.light2.color = new THREE.Color(conf.light2Color);
        this.light3.color = new THREE.Color(conf.light3Color);
        this.light4.color = new THREE.Color(conf.light4Color);
    }

    animate() {
        this.frameId = requestAnimationFrame(this.animate);
        this.animatePlane();
        this.animateLights();

        this.renderer.render(this.scene, this.camera);
    };



    render() {
        return (
            <div
                style={{ width: '100px', height: '100px' }}
                ref={(mount) => { this.mount = mount }}
            />
        )
    }
}

export default DragFlask
