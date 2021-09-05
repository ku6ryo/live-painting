import {
  Scene,
  Engine,
  Vector3,
  HemisphericLight,
  Color4,
  MeshBuilder,
  PBRMetallicRoughnessMaterial,
  ArcRotateCamera,
  Texture,
} from "babylonjs"
import { Canvas } from "./Canvas"

const canvas = document.getElementById("canvas") as HTMLCanvasElement
const engine = new Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true})

const scene = new Scene(engine)
const camera = new ArcRotateCamera("camera1", 0, Math.PI / 2, 5, Vector3.Zero(), scene)
camera.setTarget(Vector3.Zero())
camera.attachControl(canvas, false)
new HemisphericLight("HemiLight", new Vector3(0, 1, 0), scene);
new HemisphericLight("HemiLight", new Vector3(0, -1, 0), scene);

scene.clearColor = new Color4(0, 0, 0, 0)

const sphere = MeshBuilder.CreateSphere("sphere", {
  diameter: 2
})
sphere.position.set(0, 0, 0)
const sphereMaterial = new PBRMetallicRoughnessMaterial("standard", scene)
sphereMaterial.roughness = 0.6
sphere.material = sphereMaterial
sphere.rotate(new Vector3(0, 0, 1), Math.PI)

engine.runRenderLoop(function() {
  scene.render()
})

window.addEventListener("resize", function() {
  engine.resize()
})

const drawingCanvas = new Canvas()
drawingCanvas.setOnUpdate(() => {
  sphereMaterial.baseTexture = new Texture(drawingCanvas.toDataUrl(), scene)
})
document.body.appendChild(drawingCanvas.getElement())