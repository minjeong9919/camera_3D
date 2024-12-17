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

window.onload = function () {
  const app = new App();

  document.querySelector("#export-button").addEventListener("click", () => {
    app._exportToGLTF();
    console.log("내보내기 완료");
  });
};

class App {
  constructor() {
    this.isAnimating = false;
    this.shutterButton = null;
    const divContainer = document.querySelector("#webgl-container");
    this._divContainer = divContainer; // 다른 메서드에서 참조 가능하도록 하기 위함

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
    this._setupRaycaster();

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
    const camera = new THREE.Object3D();
    this._scene.add(camera);

    const Body = body(0.5, 0.1);
    camera.add(Body);

    const ViewFinder = viewFinder();
    camera.add(ViewFinder);

    const lensMesh = lens();
    camera.add(lensMesh);

    const buttonGeometry = shutter();
    camera.add(buttonGeometry);

    const ImageViewer = imageViewer();
    camera.add(ImageViewer);

    const ImageSelector = imageSelector();
    camera.add(ImageSelector);

    const SmallButton = smallButtons();
    camera.add(SmallButton);
  }

  _setupRaycaster() {
    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();

    window.addEventListener("pointermove", this._onPointerMove.bind(this));
    window.addEventListener("click", this._onClick.bind(this));
  }

  _onPointerMove(event) {
    this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  _animateShutter() {
    const initialY = this.shutterButton.position.y;
    const duration = 200;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;

      if (elapsed <= duration) {
        this.shutterButton.position.y =
          initialY - 0.1 * Math.sin((elapsed / duration) * Math.PI);
        requestAnimationFrame(animate);
      } else {
        this.shutterButton.position.y = initialY;
        this.isAnimating = false;
      }
      this._renderer.render(this._scene, this._camera);
    };

    requestAnimationFrame(animate);
  }

  _onClick() {
    this.raycaster.setFromCamera(this.pointer, this._camera);
    const intersects = this.raycaster.intersectObjects(this._scene.children);

    for (let i = 0; i < intersects.length; i++) {
      const clickedObject = intersects[0].object;
      if (clickedObject.name === "shutter" && !this.isAnimating) {
        this.shutterButton = clickedObject;
        this.isAnimating = true;
        this._animateShutter();
      }
    }
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
    requestAnimationFrame(this.render.bind(this));
  }

  update(time) {
    time *= 0.001;
    // this._cube.rotation.x = time;
    // this._cube.rotation.y = time;
  }
}

window.onload = function () {
  new App();
};
