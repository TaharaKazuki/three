import * as THREE from 'three'

// add scene
const scene = new THREE.Scene()

// add camera
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
camera.position.set(0, 0, 500)

// add renderer
const renderer = new THREE.WebGLRenderer({
  alpha: true,
})
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// add geometry
const ballGeometry = new THREE.SphereGeometry(100, 64, 32)

// add material
const ballMaterial = new THREE.MeshPhysicalMaterial()

// add mesh
const ballMesh = new THREE.Mesh(ballGeometry, ballMaterial)
scene.add(ballMesh)

// add directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 2)
directionalLight.position.set(1, 1, 1)
scene.add(directionalLight)

// add point light
const pointLight = new THREE.PointLight(0xffffff, 1)
pointLight.position.set(-200, -200, -200)
scene.add(pointLight)

// add pointLightHelper
let pointLightHelper = new THREE.PointLightHelper(pointLight, 30)
scene.add(pointLightHelper)

renderer.render(scene, camera)
