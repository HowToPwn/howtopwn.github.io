// Initialize Three.js scene
let scene, camera, renderer, particles;

function init() {
    // Scene setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('background-canvas'),
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 1500;
    const posArray = new Float32Array(particleCount * 3);

    for(let i = 0; i < particleCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 5;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.003,
        color: '#ffffff',
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending
    });

    particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    camera.position.z = 2;
}

// Animation
function animate() {
    requestAnimationFrame(animate);
    
    particles.rotation.x += 0.0003;
    particles.rotation.y += 0.0005;
    
    renderer.render(scene, camera);
}

// Handle window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Event listeners
window.addEventListener('resize', onWindowResize, false);

// Initialize when document is loaded
document.addEventListener('DOMContentLoaded', () => {
    init();
    animate();
});
