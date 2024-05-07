// Setup scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Robot parts
const bodyGeometry = new THREE.BoxGeometry(1, 2, 0.5);
const headGeometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
const armGeometry = new THREE.BoxGeometry(0.2, 1.5, 0.2);
const legGeometry = new THREE.BoxGeometry(0.5, 1.5, 0.5);
const eyeGeometry = new THREE.SphereGeometry(0.1, 32, 32);
const noseGeometry = new THREE.ConeGeometry(0.1, 0.3, 32);

const bodyMaterial = new THREE.MeshBasicMaterial({ color: 0x00008B }); // Dark blue color
const headMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const cocoaMaterial = new THREE.MeshBasicMaterial({ color: 0x6f4e37 }); // Cocoa color

const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
const head = new THREE.Mesh(headGeometry, headMaterial);
const leftArm = new THREE.Mesh(armGeometry, cocoaMaterial); // Changed color to cocoa
const rightArm = new THREE.Mesh(armGeometry, cocoaMaterial); // Changed color to cocoa
const leftLeg = new THREE.Mesh(legGeometry, cocoaMaterial); // Changed color to cocoa
const rightLeg = new THREE.Mesh(legGeometry, cocoaMaterial); // Changed color to cocoa
const leftEye = new THREE.Mesh(eyeGeometry, cocoaMaterial); // Changed color to cocoa
const rightEye = new THREE.Mesh(eyeGeometry, cocoaMaterial); // Changed color to cocoa
const nose = new THREE.Mesh(noseGeometry, cocoaMaterial); // Changed color to cocoa

body.position.y = 1.75;
head.position.y = 3.25;
leftArm.position.x = -0.7;
leftArm.position.y = 2.25;
rightArm.position.x = 0.7;
rightArm.position.y = 2.25;
leftLeg.position.x = -0.3;
leftLeg.position.y = 0.25;
rightLeg.position.x = 0.3;
rightLeg.position.y = 0.25;
leftEye.position.set(-0.3, 3.5, 0.5);
rightEye.position.set(0.3, 3.5, 0.5);
nose.position.set(0, 3, 0.7);

const robot = new THREE.Group();
robot.add(body);
robot.add(head);
robot.add(leftArm);
robot.add(rightArm);
robot.add(leftLeg);
robot.add(rightLeg);
robot.add(leftEye);
robot.add(rightEye);
robot.add(nose);

scene.add(robot);

// Ground
const groundGeometry = new THREE.PlaneGeometry(100, 100);
const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Green color
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2; // Rotate to make it horizontal
scene.add(ground);

// Palm tree
const trunkGeometry = new THREE.CylinderGeometry(0.1, 0.1, 2, 32);
const leavesGeometry = new THREE.SphereGeometry(0.5, 8, 6);
const trunkMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 }); // Brown color
const leavesMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Green color

const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
leaves.position.y = 1.5; // Position leaves on top of trunk

const palmTree = new THREE.Group();
palmTree.add(trunk);
palmTree.add(leaves);
palmTree.position.set(-5, 0, 5); // Position the palm tree
scene.add(palmTree);

// Stars
const starGeometry = new THREE.SphereGeometry(0.05, 32, 32);
const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff }); // White color

const stars = [];
for (let i = 0; i < 200; i++) {
  const size = Math.random() * 1 + 0.5; // Random size between 0.05 and 0.15
  const star = new THREE.Mesh(starGeometry.clone().scale(size, size, size), starMaterial);
  const x = Math.random() * 100 - 50;
  const y = Math.random() * 50 + 25;
  const z = Math.random() * 100 - 50;
  star.position.set(x, y, z);
  scene.add(star);
  stars.push(star);
}

camera.position.set(5, 3, 5);
camera.lookAt(0, 2, 0);

// Animation
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const time = clock.getElapsedTime();
  const delta = Math.sin(time * 5) * 0.05;

  leftArm.rotation.x = Math.sin(time * 10) * 0.5 + delta;
  rightArm.rotation.x = -Math.sin(time * 10) * 0.5 + delta;
  leftLeg.rotation.x = -Math.sin(time * 10) * 0.5 - delta;
  rightLeg.rotation.x = Math.sin(time * 10) * 0.5 - delta;

  robot.rotation.y += 0.01; // Rotate the entire robot

  // Animate stars
  stars.forEach((star, index) => {
    star.position.y += Math.sin((time + index * 0.1) * 2) * 0.01;
    star.position.x += Math.cos((time + index * 0.1) * 2) * 0.01;
  });

  renderer.render(scene, camera);
}

animate();
