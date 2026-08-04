import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';

const container = document.getElementById('canvas-container');

// 1. Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.z = 120; // Pull camera back to see the spread

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// 2. Geometry Setup (Creating vertices for lines)
const particleCount = 1500; // Total number of light streaks
const geometry = new THREE.BufferGeometry();

// We need 2 vertices per line (start and end) -> x, y, z
const positions = new Float32Array(particleCount * 2 * 3);
const speeds = new Float32Array(particleCount * 2);
const lengths = new Float32Array(particleCount * 2);
const opacities = new Float32Array(particleCount * 2);
const vertexTypes = new Float32Array(particleCount * 2); // 0 = trail top, 1 = solid bottom

const spreadX = 400; // How wide the effect spans
const spreadY = 300; // How tall the looping area is
const spreadZ = 50;  // Depth for 3D parallax effect

for (let i = 0; i < particleCount; i++) {
    const x = (Math.random() - 0.5) * spreadX;
    const y = Math.random() * spreadY;
    const z = (Math.random() - 0.5) * spreadZ;

    const speed = Math.random() * 40 + 30; // Animation speed
    const length = Math.random() * 40 + 10; // Length of the trail
    const opacity = Math.random() * 0.3 + 0.1; // Base brightness

    const index = i * 2;

    // Top Vertex (The fading trail)
    positions[index * 3] = x;
    positions[index * 3 + 1] = y;
    positions[index * 3 + 2] = z;
    speeds[index] = speed;
    lengths[index] = length;
    opacities[index] = opacity;
    vertexTypes[index] = 0.0; 

    // Bottom Vertex (The bright leading edge)
    positions[(index + 1) * 3] = x;
    positions[(index + 1) * 3 + 1] = y;
    positions[(index + 1) * 3 + 2] = z;
    speeds[index + 1] = speed;
    lengths[index + 1] = length;
    opacities[index + 1] = opacity;
    vertexTypes[index + 1] = 1.0; 
}

// Bind data to the geometry
geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
geometry.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 1));
geometry.setAttribute('aLength', new THREE.BufferAttribute(lengths, 1));
geometry.setAttribute('aOpacity', new THREE.BufferAttribute(opacities, 1));
geometry.setAttribute('aVertexType', new THREE.BufferAttribute(vertexTypes, 1));

// 3. Custom GLSL Shaders
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
            // Calculate downward motion with wrapping modulo
            float yOffset = mod(position.y - (uTime * aSpeed), uHeight);
            
            // Re-center coordinates so they fall across the camera view
            float currentY = yOffset - (uHeight / 2.0);
            
            // Apply length to the top vertex to stretch the line
            if (aVertexType == 0.0) {
                currentY += aLength;
                vAlpha = 0.0; // Completely transparent at the tail
            } else {
                vAlpha = aOpacity; // Solid at the leading edge
            }
            
            vec3 newPosition = vec3(position.x, currentY, position.z);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
    `,
    fragmentShader: `
        varying float vAlpha;
        
        void main() {
            // Render the line color (pure white) with the interpolated alpha gradient
            gl_FragColor = vec4(1.0, 1.0, 1.0, vAlpha);
        }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending // This creates the glowing light overlap effect
});

// Create the line segments and add to scene
const lines = new THREE.LineSegments(geometry, material);
scene.add(lines);

// 4. Animation Loop
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    
    // Pass the elapsed time to the GPU shader
    material.uniforms.uTime.value = clock.getElapsedTime();
    
    // Optional: Add a subtle slow rotation to the entire system for depth
    lines.rotation.y = Math.sin(clock.getElapsedTime() * 0.1) * 0.05;
    
    renderer.render(scene, camera);
}
animate();

// 5. Handle Window Resize
window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});
