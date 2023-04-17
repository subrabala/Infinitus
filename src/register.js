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
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

const cursorEdit = document.querySelector(".cursor", ".cursorTwo");

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

// ;const fog = new THREE.Fog("#000000", 1, 300);
// scene.fog = fog
// Loader
let mixer = null;

const loader = new GLTFLoader();
loader.load("./models/04/scene.gltf", function (glb) {
  mixer = new THREE.AnimationMixer(glb.scene);
  const action = mixer.clipAction(glb.animations[0]);
  action.play();

  const model = scene.add(glb.scene);
  model.scale.set(1, 1, 1);
  //NOW
  // model.position.set(0.3, -16, 0);
  model.position.set(0, -1.1, 0);
  // model.rotation.set(0, 0, 1.5);
});

function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

//Light
const light = new THREE.AmbientLight("#3d3d3d", 0.1);
light.position.set(10, 10, 10);
light.intensity = 2;
scene.add(light);

const directionalLight = new THREE.DirectionalLight("#3d3d3d", 0.1);
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
// camera.position.x = -200;
// camera.position.y = 15;
// camera.position.z = 50;
//NOW
// camera.position.x = 200;
// camera.position.y = 0;
// camera.position.z = 1000;

//SS
camera.position.x = 30;
camera.position.y = 100;
camera.position.z = 0;
cameraGroup.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 0.75, 0);
controls.enabled = false;

/**
 * Particles
 */
// Geometry
const particlesCount = 400;
const positions = new Float32Array(particlesCount * 6);

for (let i = 0; i < particlesCount; i++) {
  positions[i * 3 + 0] = (Math.random() - 0.3) * 5;
  positions[i * 3 + 1] =
    objectsDistance * 0.3 - Math.random() * objectsDistance;
  positions[i * 3 + 2] = (Math.random() - 0.3) * 5;
}

// const particlesGeometry = new THREE.BufferGeometry();
// particlesGeometry.setAttribute(
//   "position",
//   new THREE.BufferAttribute(positions, 4)
// );
// // Material
// const particlesMaterial = new THREE.PointsMaterial({
//   color: "#8c8c8c",
//   // sizeAttenuation: textureLoader,
//   size: 0.6,
// });

// // Points
// const particles = new THREE.Points(particlesGeometry, particlesMaterial);
// scene.add(particles);
// particles.position.z = -6;
// particles.position.y = -2;
// // particles.position.x = -1

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
  ".webgl",
  {
    y: 0,
    // scale: 2.7,
    // x: -450,
    // opacity: 0.95,
  },
  {
    // opacity: 0,
    scrollTrigger: {
      trigger: ".webgl",
      start: "center 45%",
      markers: false,
      scrub: 2,
    },
  }
);

gsap.fromTo(
  "#lengthOne",
  {
    y: 0,
  },
  {
    y: -50,
    scrollTrigger: {
      trigger: "#lengthOne",
      start: "center 45%",
      markers: false,
      scrub: 2,
    },
  }
);

gsap.fromTo(
  "#lengthOneLogo",
  {
    y: 0,
  },
  {
    y: -50,
    scrollTrigger: {
      trigger: "#lengthOneLogo",
      start: "center 45%",
      markers: false,
      scrub: 2,
    },
  }
);

gsap.fromTo(
  "#lengthTwoLogo",
  {
    y: 0,
    opacity: 0,
  },
  {
    opacity: 1,
    scrollTrigger: {
      trigger: "#lengthTwoLogo",
      start: "center 43%",
      markers: false,
      scrub: 2,
    },
  }
);

// gsap.fromTo(
//   "#subOne",
//   {
//     y: 0,
//     opacity: 0.2,
//   },
//   {
//     y: 35,
//     x: 0,
//     opacity: 1,
//     scale: 0.3,
//     scrollTrigger: {
//       trigger: "#subOne",
//       start: "center 45%",
//       markers: false,
//       scrub: 3,
//     },
//   }
// );

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

// gsap.fromTo(
//   "#subFive",
//   {
//     y: 0,
//     opacity: 0.1,
//   },
//   {
//     y: -10,
//     opacity: 0.4,
//     scrollTrigger: {
//       trigger: "#subFive",
//       start: "center 45%",
//       markers: false,
//       scrub: 2,
//     },
//   }
// );

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
  ".gd-1",
  {},
  {
    opacity: 0,
    scrollTrigger: {
      trigger: ".gd-1",
      start: "center 25%",
      markers: false,
      scrub: 1,
    },
  }
);

gsap.fromTo(
  ".gd-2",
  {
    opacity: 0,
  },
  {
    scale: 3.5,
    opacity: 0.7,
    scrollTrigger: {
      trigger: ".gd-2",
      start: "center 25%",
      markers: false,
      scrub: 1,
    },
  }
);
gsap.fromTo(
  "#sd-eve-two",
  {
    y: 0,
  },
  {
    // y: -30,
    scrollTrigger: {
      trigger: "#sd-eve-two",
      start: "center 70%",
      markers: false,
      scrub: 2,
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
    opacity: 0,
  },
  {
    y: 0,
    opacity: 1,
    scrollTrigger: {
      trigger: ".img-cont-2",
      start: "center 100%",
      end: "center 90%",
      markers: false,
      scrub: 1,
    },
  }
);

gsap.fromTo(
  ".img-cont-3",
  {
    y: 0,
    opacity: 0,
  },
  {
    x: -50,
    y: 100,
    opacity: 1,
    rotate: -4,
    scrollTrigger: {
      trigger: ".img-cont-3",
      start: "center 70%",
      end: "center 65%",
      markers: false,
      scrub: 2,
    },
  }
);

gsap.fromTo(
  ".img-cont-4",
  {
    opacity: 0,
  },
  {
    x: 50,
    y: 100,
    opacity: 1,
    rotate: 4,
    scrollTrigger: {
      trigger: ".img-cont-4",
      start: "center 70%",
      end: "center 65%",
      markers: false,
      scrub: 2,
    },
  }
);

gsap.fromTo(
  ".img-cont-5",
  {
    y: 0,
    opacity: 0,
  },
  {
    x: -50,
    y: 100,
    opacity: 1,
    rotate: -8,
    scrollTrigger: {
      trigger: ".img-cont-5",
      start: "center 60%",
      end: "center 50%",
      markers: false,
      scrub: 2,
    },
  }
);

gsap.fromTo(
  ".img-cont-6",
  {
    opacity: 0,
  },
  {
    x: 50,
    y: 100,
    opacity: 1,
    rotate: 8,
    scrollTrigger: {
      trigger: ".img-cont-6",
      start: "center 60%",
      end: "center 50%",
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
      start: "center 90%",
      end: "center 100%",
      markers: false,
      scrub: 2,
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
  // camera.position.x = (-scrollY / sizes.height) * objectsDistance * 0.1;
  camera.position.y = (-scrollY / sizes.width) * objectsDistance * 0.3;
  camera.rotation.z = (-scrollY / sizes.height) * objectsDistance * 0.3;

  const parallaxX = cursor.x * 5;
  const parallaxY = cursor.y * -5;

  cameraGroup.position.x +=
    (parallaxX - cameraGroup.position.x) * 5 * deltaTime;
  cameraGroup.position.y +=
    (parallaxY - cameraGroup.position.y) * 5 * deltaTime;

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
