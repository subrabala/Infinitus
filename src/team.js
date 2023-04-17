import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import * as dat from "lil-gui";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import gsap from "gsap";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import typefaceFont from "three/examples/fonts/helvetiker_regular.typeface.json";

/**
 * Base
 */
// Debug
// const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector("canvas.webglTwo");

// Scene
const scene = new THREE.Scene();

const cursorEdit = document.querySelector(".cursor");

document.addEventListener("mousemove", (e) => {
  cursorEdit.setAttribute(
    "style",
    "top: " + (e.pageY - 0) + "px; left: " + (e.pageX - 0) + "px;"
  );
});

document.addEventListener("click", () => {
  cursorEdit.classList.add("expand");
  setTimeout(() => {
    cursorEdit.classList.remove("expand");
  }, 0);
});

// Loader
let mixer = null;

const loader = new GLTFLoader();
loader.load("./models/06/scene.gltf", function (glb) {
  mixer = new THREE.AnimationMixer(glb.scene);
  const action = mixer.clipAction(glb.animations[0]);
  action.play();

  const model = scene.add(glb.scene);
  model.scale.set(1, 1, 1);
  model.position.set(-20, 0, 0);
  model.rotation.set(0, 0, 0);
});

//Light
const light = new THREE.AmbientLight("#050505", 0.2);
light.position.set(10, 10, 10);
light.intensity = 2;
scene.add(light);

const directionalLight = new THREE.DirectionalLight("#050505", 0.3);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.camera.far = 30;
directionalLight.shadow.camera.left = -7;
directionalLight.shadow.camera.top = 7;
directionalLight.shadow.camera.right = 7;
directionalLight.shadow.camera.bottom = -7;
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// /**
//  * Textures
//  */
// const textureLoader = new THREE.TextureLoader();
// const matcapTexture = textureLoader.load("textures/matcaps/8.png");

// /**
//  * Fonts
//  */
// const fontLoader = new FontLoader();

// fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
//   // Material
//   const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });

//   // Text
//   const textGeometry = new TextGeometry("2023", {
//     font: font,
//     size: 0.5,
//     height: 0.2,
//     curveSegments: 50,
//     bevelEnabled: true,
//     bevelThickness: 0.1,
//     bevelSize: 0.02,
//     bevelOffset: 0.01,
//     bevelSegments: 5,
//   });
//   textGeometry.center();

//   const text = new THREE.Mesh(textGeometry, material);
//   scene.add(text);
// });
// // /**
//  * Sizes
//  */
const objectsDistance = 200;

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const cameraGroup = new THREE.Group();
scene.add(cameraGroup);

const camera = new THREE.PerspectiveCamera(1.8, sizes.width / sizes.height);
// camera.position.x = 200;
// camera.position.y = 0;
// camera.position.z = 0;
camera.position.x = 40;
camera.position.y = 1.35;
camera.position.z = 0;
cameraGroup.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 0.75, 0);
controls.enabled = false;

/**
 * Cursor
 */
const cursor = {};
cursor.x = 0;
cursor.y = 0;
window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.1;
  cursor.y = event.clientY / sizes.height - 0.1;
});

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// GSAP
gsap.registerPlugin(ScrollTrigger);

gsap.fromTo(
  ".webglTwo",
  {
    // y: 0,
  },
  {
    // opacity: 0,
    scale: 1.25,
    // x: -100,
    scrollTrigger: {
      trigger: ".webglTwo",
      start: "center 45%",
      markers: false,
      scrub: 2,
    },
  }
);

gsap.fromTo(
  ".gd-3",
  {
    y: 0,
    opacity: 0,
  },
  {
    y: 200,
    opacity: 0.5,
    scale: 4,
    scrollTrigger: {
      trigger: ".gd-3",
      start: "center 5%",
      markers: false,
      scrub: 3,
    },
  }
);

gsap.fromTo(
  "#footer-eve",
  {
    y: 0,
    opacity: 0,
  },
  {
    opacity: 1,
    scrollTrigger: {
      trigger: "#footer-eve",
      start: "center 50%",
      markers: false,
      scrub: 3,
    },
  }
);

gsap.fromTo(
  "#lengthOne",
  {
    y: 0,
  },
  {
    y: -100,
    scrollTrigger: {
      trigger: "#lengthOne",
      start: "center 45%",
      markers: false,
      scrub: 2,
    },
  }
);
gsap.fromTo(
  "#subOne",
  {
    y: 0,
  },
  {
    y: 30,
    x: 140,
    opacity: 1,
    scale: 0.3,
    scrollTrigger: {
      trigger: "#subOne",
      start: "center 45%",
      markers: false,
      scrub: 3,
    },
  }
);

gsap.fromTo(
  "#subTwo",
  {
    y: 0,
    opacity: 0,
  },
  {
    y: -70,
    opacity: 1,
    scrollTrigger: {
      trigger: "#subTwo",
      start: "center 45%",
      markers: false,
      scrub: 2,
    },
  }
);

gsap.fromTo(
  ".link-one",
  {
    y: 0,
    opacity: 0,
  },
  {
    y: 80,
    opacity: 1,
    scale: 0.95,
    scrollTrigger: {
      trigger: ".link-one",
      start: "center 50%",
      markers: false,
      scrub: 1,
    },
  }
);

gsap.fromTo(
  "#subThree",
  {
    y: 0,
    opacity: 0,
  },
  {
    y: -10,
    opacity: 1,
    scrollTrigger: {
      trigger: "#subThree",
      start: "center 45%",
      markers: false,
      scrub: 2,
    },
  }
);

gsap.fromTo(
  ".hover-one",
  {
    opacity: 1,
  },
  {
    opacity: 0,
    scrollTrigger: {
      trigger: ".hover-one",
      start: "center 25%",
      markers: false,
      scrub: 1,
    },
  }
);

gsap.fromTo(
  "#secThree",
  {
    opacity: 0,
  },
  {
    opacity: 1,
    scrollTrigger: {
      trigger: "#secThree",
      start: "center 5%",
      markers: false,
      scrub: 1,
    },
  }
);

gsap.fromTo(
  ".img-cont-1",
  {
    y: 0,
  },
  {
    scrollTrigger: {
      trigger: ".img-cont-1",
      start: "center 100%",
      markers: false,
      scrub: 2,
    },
  }
);

gsap.fromTo(
  ".img-cont-2",
  {
    y: 0,
  },
  {
    y: 100,
    scrollTrigger: {
      trigger: ".img-cont-2",
      start: "center 100%",
      markers: false,
      scrub: 2,
    },
  }
);

gsap.fromTo(
  ".img-cont-3",
  {
    y: 0,
  },
  {
    x: -250,
    y: 100,
    scrollTrigger: {
      trigger: ".img-cont-3",
      start: "center 100%",
      markers: false,
      scrub: 3,
    },
  }
);

gsap.fromTo(
  ".img-cont-4",
  {
    y: 0,
  },
  {
    x: 250,
    y: 100,
    scrollTrigger: {
      trigger: ".img-cont-4",
      start: "center 100%",
      markers: false,
      scrub: 3,
    },
  }
);

gsap.fromTo(
  ".pro-1",
  {
    y: 0,
    opacity: 0,
  },
  {
    opacity: 1,
    scrollTrigger: {
      trigger: ".pro-1",
      start: "center 80%",
      markers: false,
      scrub: 1,
    },
  }
);

gsap.fromTo(
  ".pro-2",
  {
    y: 0,
    opacity: 0,
  },
  {
    opacity: 1,
    scrollTrigger: {
      trigger: ".pro-2",
      start: "center 80%",
      markers: false,
      scrub: 1,
    },
  }
);
gsap.fromTo(
  ".pro-3",
  {
    y: 0,
    opacity: 0,
  },
  {
    opacity: 1,
    scrollTrigger: {
      trigger: ".pro-3",
      start: "center 80%",
      markers: false,
      scrub: 1,
    },
  }
);

gsap.fromTo(
  "#subFive",
  {
    y: 0,
    opacity: 0,
  },
  {
    y: -10,
    opacity: 1,
    scrollTrigger: {
      trigger: "#subFive",
      start: "center 45%",
      markers: false,
      scrub: 2,
    },
  }
);

// Events

gsap.fromTo(
  "#EventsOne",
  {
    y: 0,
  },
  {
    scrollTrigger: {
      trigger: "#EventsOne",
      start: "center 45%",
      markers: false,
      scrub: 2,
    },
  }
);

gsap.fromTo(
  "#eve-two",
  {
    y: 0,
  },
  {
    y: -100,
    scrollTrigger: {
      trigger: "#eve-two",
      start: "center 0%",
      markers: false,
      scrub: 2,
    },
  }
);

gsap.fromTo(
  "#sd-eve-one",
  {
    y: 0,
  },
  {
    y: 50,
    scrollTrigger: {
      trigger: "#sd-eve-one",
      start: "center 70%",
      markers: false,
      scrub: 2,
    },
  }
);
// gsap.fromTo(
//   "#eve-one",
//   {
//     y: 0,
//     opacity: 0,
//   },
//   {
//     y: -65,
//     opacity: 1,
//     scrollTrigger: {
//       trigger: "#eve-one",
//       start: "center 0%",
//       markers: false,
//       scrub: 2,
//     },
//   }
// );
// Gallery

gsap.fromTo(
  "#show-two",
  {
    y: 0,
  },
  {
    y: -100,
    scrollTrigger: {
      trigger: "#show-two",
      start: "center 90%",
      markers: false,
      scrub: 2,
    },
  }
);

gsap.fromTo(
  "#show-three",
  {
    y: 0,
  },
  {
    y: -200,
    scrollTrigger: {
      trigger: "#show-three",
      start: "top 100%",
      markers: false,
      scrub: 2,
    },
  }
);

gsap.fromTo(
  "#show-four",
  {
    y: 0,
  },
  {
    y: -500,
    scrollTrigger: {
      trigger: "#show-four",
      start: "top 100%",
      markers: false,
      scrub: 2,
    },
  }
);

gsap.fromTo(
  "#show-five",
  {
    y: 0,
  },
  {
    y: -500,
    scrollTrigger: {
      trigger: "#show-five",
      start: "top 100%",
      markers: false,
      scrub: 2,
    },
  }
);

gsap.fromTo(
  "#show-six",
  {
    y: 0,
  },
  {
    y: -500,
    scrollTrigger: {
      trigger: "#show-six",
      start: "top 100%",
      markers: false,
      scrub: 2,
    },
  }
);

gsap.fromTo(
  "#show-Seven",
  {
    y: 0,
  },
  {
    y: -500,
    scrollTrigger: {
      trigger: "#show-Seven",
      start: "top 100%",
      markers: false,
      scrub: 2,
    },
  }
);

gsap.fromTo(
  "#show-Eight",
  {
    y: 0,
  },
  {
    y: -500,
    scrollTrigger: {
      trigger: "#show-Eight",
      start: "top 100%",
      markers: false,
      scrub: 2,
    },
  }
);

gsap.fromTo(
  "#show-Nine",
  {
    y: 0,
  },
  {
    y: -500,
    scrollTrigger: {
      trigger: "#show-Nine",
      start: "top 100%",
      markers: false,
      scrub: 2,
    },
  }
);

gsap.fromTo(
  "#show-Ten",
  {
    y: 0,
  },
  {
    y: -500,
    scrollTrigger: {
      trigger: "#show-Ten",
      start: "top 100%",
      markers: false,
      scrub: 2,
    },
  }
);

gsap.fromTo(
  "#show-Eleven",
  {
    y: 0,
  },
  {
    y: -300,
    scrollTrigger: {
      trigger: "#show-Eleven",
      start: "top 100%",
      markers: false,
      scrub: 2,
    },
  }
);
/**
 * Animate
 */
const clock = new THREE.Clock();
let previousTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;

  // Animate camera
  // camera.position.x = (-scrollY / sizes.height) * objectsDistance;
  // camera.position.y = (scrollY / sizes.width) * objectsDistance * 2;
  // camera.rotation.z = (scrollY / sizes.width) * objectsDistance * 5;

  // const parallaxX = cursor.x * 3;
  // const parallaxY = cursor.y * -3;
  // cameraGroup.position.x +=
  //   (parallaxX - cameraGroup.position.x) * 5 * deltaTime;
  // cameraGroup.position.y +=
  //   (parallaxY - cameraGroup.position.y) * 5 * deltaTime;

  // Update mixer
  if (mixer !== null) {
    mixer.update(deltaTime);
  }

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
