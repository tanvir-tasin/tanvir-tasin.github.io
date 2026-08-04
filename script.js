import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';

// --- 1. WebGL Background Animation ---
const container = document.getElementById('canvas-container');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.z = 120;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

const particleCount = 1500;
const geometry = new THREE.BufferGeometry();

const positions = new Float32Array(particleCount * 2 * 3);
const speeds = new Float32Array(particleCount * 2);
const lengths = new Float32Array(particleCount * 2);
const opacities = new Float32Array(particleCount * 2);
const vertexTypes = new Float32Array(particleCount * 2);

const spreadX = 400;
const spreadY = 300;
const spreadZ = 50; 

for (let i = 0; i < particleCount; i++) {
    const x = (Math.random() - 0.5) * spreadX;
    const y = Math.random() * spreadY;
    const z = (Math.random() - 0.5) * spreadZ;

    const speed = Math.random() * 30 + 15; 
    const length = Math.random() * 40 + 10;
    const opacity = Math.random() * 0.3 + 0.1;

    const index = i * 2;

    positions[index * 3] = x;
    positions[index * 3 + 1] = y;
    positions[index * 3 + 2] = z;
    speeds[index] = speed;
    lengths[index] = length;
    opacities[index] = opacity;
    vertexTypes[index] = 0.0; 

    positions[(index + 1) * 3] = x;
    positions[(index + 1) * 3 + 1] = y;
    positions[(index + 1) * 3 + 2] = z;
    speeds[index + 1] = speed;
    lengths[index + 1] = length;
    opacities[index + 1] = opacity;
    vertexTypes[index + 1] = 1.0; 
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
geometry.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 1));
geometry.setAttribute('aLength', new THREE.BufferAttribute(lengths, 1));
geometry.setAttribute('aOpacity', new THREE.BufferAttribute(opacities, 1));
geometry.setAttribute('aVertexType', new THREE.BufferAttribute(vertexTypes, 1));

const material = new THREE.ShaderMaterial({
    uniforms: {
        uTime: { value: 0.0 },
        uHeight: { value: spreadY }
    },
    vertexShader: `
        uniform float uTime;
        uniform float uHeight;
        
        attribute float aSpeed;
        attribute float aLength;
        attribute float aOpacity;
        attribute float aVertexType;
        
        varying float vAlpha;
        
        void main() {
            float yOffset = mod(position.y - (uTime * aSpeed), uHeight);
            float currentY = yOffset - (uHeight / 2.0);
            
            if (aVertexType == 0.0) {
                currentY += aLength;
                vAlpha = 0.0;
            } else {
                vAlpha = aOpacity;
            }
            
            vec3 newPosition = vec3(position.x, currentY, position.z);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
    `,
    fragmentShader: `
        varying float vAlpha;
        void main() {
            gl_FragColor = vec4(1.0, 1.0, 1.0, vAlpha);
        }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending 
});

const lines = new THREE.LineSegments(geometry, material);
scene.add(lines);

const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    material.uniforms.uTime.value = clock.getElapsedTime();
    lines.rotation.y = Math.sin(clock.getElapsedTime() * 0.1) * 0.05;
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});


// --- 2. Image Upload Logic for Achievements Gallery ---
const imageUpload = document.getElementById('imageUpload');
const galleryGrid = document.getElementById('galleryGrid');

imageUpload.addEventListener('change', function(event) {
    const files = event.target.files;
    
    // Loop through all selected files
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Ensure the file is an image
        if (file.type.match('image.*')) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                // Create a new image element and add it to the grid
                const imgElement = document.createElement('img');
                imgElement.src = e.target.result;
                galleryGrid.appendChild(imgElement);
            };
            
            // Read the image file as a data URL
            reader.readAsDataURL(file);
        }
    }
});
