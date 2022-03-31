import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import texture from './textures/earth.jpg'

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let pointLight: THREE.PointLight
let renderer: THREE.WebGLRenderer

const init = () => {
  // add scene
  scene = new THREE.Scene()

  // add camera
  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.set(0, 0, 500)

  // add renderer
  renderer = new THREE.WebGLRenderer({
    alpha: true,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  document.body.appendChild(renderer.domElement)

  // add texture
  const textures = new THREE.TextureLoader().load(texture)

  // add geometry
  const ballGeometry = new THREE.SphereGeometry(100, 64, 32)

  // add material
  const ballMaterial = new THREE.MeshPhysicalMaterial({ map: textures })

  // add mesh
  const ballMesh = new THREE.Mesh(ballGeometry, ballMaterial)
  scene.add(ballMesh)

  // add directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 2)
  directionalLight.position.set(1, 1, 1)
  scene.add(directionalLight)

  // add point light
  pointLight = new THREE.PointLight(0xffffff, 1)
  pointLight.position.set(-200, -200, -200)
  scene.add(pointLight)

  // add pointLightHelper
  let pointLightHelper = new THREE.PointLightHelper(pointLight, 30)
  scene.add(pointLightHelper)

  // mouse move
  let controls = new OrbitControls(camera, renderer.domElement)
  window.addEventListener('resize', onWindowResize)
  animate()
}

const onWindowResize = () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
}

const animate = () => {
  pointLight.position.set(
    200 * Math.sin(Date.now() / 500),
    200 * Math.sin(Date.now() / 1000),
    200 * Math.cos(Date.now() / 500)
  )
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

window.addEventListener('load', init)
