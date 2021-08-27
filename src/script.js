import * as THREE from 'three'
import './style.css'
// import * as dat from 'dat.gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import './form.js'
//Debug
// const gui = new dat.GUI()

//Canvas
const canvas = document.querySelector('canvas.webgl')

//Scene
const scene = new THREE.Scene()

//Texture
const loader = new THREE.TextureLoader()
const cross = loader.load('./cross.png')
const texture = new THREE.TextureLoader().load('earth.jpg')
// const texture = new THREE.TextureLoader().load('earth2.jpg')

//Object
const geometry = new THREE.SphereGeometry(15, 32, 20);

const particlesGeometry = new THREE.BufferGeometry;
const particlesCnt = 5000;

const posArray = new Float32Array(particlesCnt * 5);
//xyz xyz xyz xyz
for (let i = 0; i < particlesCnt * 3; i++) {
    // posArray[i] = Math.random()
    // posArray[i] = Math.random() - 0.5
    posArray[i] = (Math.random() - 0.5) * (Math.random() * 500)
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))



//Materials
const material = new THREE.MeshBasicMaterial({
    map: texture,
    // opacity: 1
})

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.025,
    map: cross,
    transparent: true,
})

//Mesh
const sphere = new THREE.Mesh(geometry, material)
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)


scene.add(sphere, particlesMesh)

sphere.position.y = -10
sphere.position.x = 30
sphere.position.z = 2
//Lights
const pointLight = new THREE.PointLight(0xff0000, 0.1)
pointLight.position.x = 5
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)




const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
window.addEventListener('resize', () => {
    //Update Size
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    //Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    //update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

})

//Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 1, 1000)

camera.position.z = 70
camera.position.y = 0
camera.position.x = 0
camera.lookAt(sphere.position)
scene.add(camera)

//Renderer
const renderer = new THREE.WebGLRenderer({
    alpha: true,
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


//Animate

const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    //update objects
    sphere.rotation.y = .25 * elapsedTime

    //render
    renderer.render(scene, camera)

    //call tick again on the next frame!
    window.requestAnimationFrame(tick)

}

tick()