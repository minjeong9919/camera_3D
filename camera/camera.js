import * as THREE from "three";
import { OrbitControls } from "OrbitControls";
import { viewFinder } from "./components/viewFinder/viewFinder.js";
import { lens } from "./components/lens.js";
import { shutter } from "./components/shutter.js";
import { imageViewer } from "./components/imageViewer.js";
import { imageSelector } from "./components/imageSelector.js";
import { smallButtons } from "./components/smallButtons.js";
import { body } from "./components/body.js";
import { GLTFExporter } from "https://unpkg.com/three@0.138.0/examples/jsm/exporters/GLTFExporter.js";

class App {
  constructor() {
    const divContainer = document.querySelector("#webgl-container");
    this._divContainer = divContainer;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    divContainer.appendChild(renderer.domElement);
    this._renderer = renderer;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#DFDEDE");
    this._scene = scene;

    this._setupCamera();
    this._setupLight();
    this._setupModel();
    this._setupControls();

    window.onresize = this.resize.bind(this);
    this.resize();
    requestAnimationFrame(this.render.bind(this));

    document.querySelector("#export-button").addEventListener("click", () => {
      this._exportToGLTF();
      console.log("내보내기 완료");
    });

    // '_'로 시작하는 것은 해당 class 내에서만 사용되는 Private 이라고 지정
    // 개발자들간의 약속임!
    window.onresize = this.resize.bind(this);
    this.resize();
    // 창크키가 변경될 때마다 창 크기에 맞게 설정되도록
    // this가 app class의 객체를 가리키도록 bind로 묶어줌.
    requestAnimationFrame(this.render.bind(this));
  }

  _setupControls() {
    new OrbitControls(this._camera, this._divContainer);
  }

  _setupCamera() {
    const width = this._divContainer.clientWidth;
    const height = this._divContainer.clientHeight;
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
    camera.position.z = 7;
    this._camera = camera;
  }

  _setupLight() {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(0, 7, -6.6);
    this._scene.add(light);

    const ambientIntensity = 0.5;
    const ambientLight = new THREE.AmbientLight(0xffffff, ambientIntensity);
    this._scene.add(ambientLight);
  }

  _setupModel() {
    const Camera = new THREE.Object3D();
    Camera.name = "camera";
    this._scene.add(Camera);

    const Body = body(0.5, 0.1);
    Body.name = "body";
    Camera.add(Body);

    const ViewFinder = viewFinder();
    ViewFinder.name = "view_finder";
    Camera.add(ViewFinder);

    const Lens = lens();
    Camera.add(Lens);

    const Shutter = shutter();
    Shutter.name = "shutter";
    Camera.add(Shutter);

    const ImageViewer = imageViewer();
    ImageViewer.name = "image_viewer";
    Camera.add(ImageViewer);

    const ImageSelector = imageSelector();
    ImageSelector.name = "image_selector";
    Camera.add(ImageSelector);

    const SmallButton = smallButtons();
    SmallButton.name = "small_button";
    Camera.add(SmallButton);
  }

  _exportToGLTF() {
    const exporter = new GLTFExporter();
    exporter.parse(
      this._scene,
      (gltf) => {
        const blob = new Blob([JSON.stringify(gltf)], {
          type: "application/json",
        });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "camera_model.glb";
        link.click();
      },
      { binary: false }
    );
  }

  resize() {
    const width = this._divContainer.clientWidth;
    const height = this._divContainer.clientHeight;

    this._camera.aspect = width / height;
    this._camera.updateProjectionMatrix();

    this._renderer.setSize(width, height);
  }

  render(time) {
    this._renderer.render(this._scene, this._camera);
    this.update(time);
  }

  update(time) {
    time *= 0.001;
  }
}

window.onload = function () {
  new App();
};
