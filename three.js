if (typeof THREE === "undefined") {
  console.log("3d animation didn't load");
} 
else { const canvas = document.getElementById("bg-canvas");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 5000 );
  camera.position.z = 800; 
const renderer = new THREE.WebGLRenderer({canvas: canvas, alpha: true,antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const particleCount = 1200;
const positions = new Float32Array(particleCount * 3);
const colors = new Float32Array(particleCount * 3);

const themeColors = [new THREE.Color(0xff7a33), 
new THREE.Color(0x1f9d55),  new THREE.Color(0x3a7bd5), 
    new THREE.Color(0xf5f3ee) ];

for (let i = 0; i < particleCount; i++) {const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 1800; 
    positions[i3+1] = (Math.random() - 0.5) * 1800; 
    positions[i3+ 2] = (Math.random()- .5) * 3600; 

    const c = themeColors[Math.floor(Math.random() * themeColors.length)];
    colors[i3] = c.r;
    colors[i3+1] = c.g;
    colors[i3 + 2] = c.b;}

const particleGeometry = new THREE.BufferGeometry();
particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const particleMaterial = new THREE.PointsMaterial({
    size: 3.5,
    vertexColors: true,
    transparent: true,
    opacity: 0.85
  });

  const particles = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particles);

function makeWireShape(geometry, color, x, y, z) {
    const material = new THREE.MeshBasicMaterial({
      color: color,
      wireframe: true,
      transparent: true,
      opacity: 0.5
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    scene.add(mesh);
    return mesh;}

  const shape1 = makeWireShape(new THREE.IcosahedronGeometry(90, 0), 0xff7a33, -250, 100, -400);
  const shape2 = makeWireShape(new THREE.TorusGeometry(110, 22, 16, 60), 0x3a7bd5, 260, -80, -1300);
  const shape3 = makeWireShape(new THREE.OctahedronGeometry(100, 0), 0x1f9d55, -220, -60, -2300);

  const allShapes = [shape1, shape2, shape3];

  let scrollProgress = 0; 

  function updateScrollProgress() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
  }

  window.addEventListener("scroll", updateScrollProgress);
  updateScrollProgress();
 
  function animate() { requestAnimationFrame(animate);
 const targetZ = 800 - scrollProgress * 3400;
camera.position.z += (targetZ - camera.position.z) * 0.05;
 camera.position.x = Math.sin(scrollProgress * Math.PI * 2) * 40;
 particles.rotation.y += 0.0006;
 
allShapes.forEach((shape, index) => { shape.rotation.x += 0.002 + index * 0.0006;
shape.rotation.y += 0.003 + index * 0.0004; });
 
renderer.render(scene, camera); }
animate();
 
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight); });
}
 