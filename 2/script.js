import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.min.js';

let scene, camera, renderer, logoMesh, clock, mouse, resetTimeout;
const colors = ["#3d5fc4", "#c01d23", "#0fc3ed", "#53509e", "#008361", "#a04461", "#d7c004", "#e97c2d", "#c79700", "#bd7cae", "#026546", "#bf3c9d"];

init();
animate();

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(colors[Math.floor(Math.random() * colors.length)]);
    
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 1.5;
    
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    clock = new THREE.Clock();
    mouse = new THREE.Vector2(0.5, 0.5);
    
    const textureLoader = new THREE.TextureLoader();
    const logoTexture = textureLoader.load('logo.png');

    const geometry = new THREE.PlaneGeometry(3.5, 2.2); // Increased width
    const material = new THREE.ShaderMaterial({
        uniforms: {
            uTime: { value: 0 },
            uTexture: { value: logoTexture },
            uMouse: { value: new THREE.Vector2(0.5, 0.5) },
            uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
            uDistortion: { value: 0.0 }
        },
        transparent: true,
        vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform sampler2D uTexture;
            uniform vec2 uMouse;
            uniform float uTime;
            uniform vec2 uResolution;
            uniform float uDistortion;
            varying vec2 vUv;
            
            void main() {
                vec2 uv = vUv;
                vec2 dist = uv - uMouse;
                float strength = exp(-5.0 * length(dist)) * uDistortion;
                float wave = sin(uTime * 3.0 + length(dist) * 15.0) * strength;
                uv += wave * 0.07;
                
                vec4 texColor = texture2D(uTexture, uv);
                texColor.a *= smoothstep(0.1, 0.9, texColor.a);
                
                gl_FragColor = texColor;
            }
        `,
    });
    
    logoMesh = new THREE.Mesh(geometry, material);
    scene.add(logoMesh);
    
    window.addEventListener('resize', onWindowResize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove);

    window.addEventListener('mousedown', () => changeBackgroundColor());
    window.addEventListener('touchstart', () => changeBackgroundColor());
    
    addShareButton();
}

function animate() {
    requestAnimationFrame(animate);
    logoMesh.material.uniforms.uTime.value = clock.getElapsedTime();
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    logoMesh.material.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
}

function onMouseMove(event) {
    const x = event.clientX / window.innerWidth;
    const y = 1.0 - event.clientY / window.innerHeight;
    logoMesh.material.uniforms.uMouse.value.set(x, y);

    gsap.to(logoMesh.material.uniforms.uDistortion, { value: 2.0, duration: 0.2, ease: "power2.out" });
    gsap.to(logoMesh.material.uniforms.uDistortion, { value: 0.0, duration: 1.5, ease: "power3.out", delay: 0.1 });

    resetEffectAfterTimeout();
}

function onTouchMove(event) {
    if (event.touches.length > 0) {
        const x = event.touches[0].clientX / window.innerWidth;
        const y = 1.0 - event.touches[0].clientY / window.innerHeight;
        logoMesh.material.uniforms.uMouse.value.set(x, y);

        gsap.to(logoMesh.material.uniforms.uDistortion, { value: 2.0, duration: 0.2, ease: "power2.out" });
        gsap.to(logoMesh.material.uniforms.uDistortion, { value: 0.0, duration: 1.5, ease: "power3.out", delay: 0.1 });

        resetEffectAfterTimeout();
    }
}

function changeBackgroundColor() {
    gsap.to(scene.background, { r: Math.random(), g: Math.random(), b: Math.random(), duration: 1 });
}

function resetEffectAfterTimeout() {
    clearTimeout(resetTimeout);
    resetTimeout = setTimeout(() => {
        gsap.to(scene.background, { r: 1, g: 1, b: 1, duration: 1 });
    }, 30000); // Reset after 30 seconds
}

function addShareButton() {
    const button = document.createElement("button");
    button.innerText = "Share";
    button.style.position = "absolute";
    button.style.top = "10px";
    button.style.right = "10px";
    button.style.padding = "10px 20px";
    button.style.background = "black";
    button.style.color = "white";
    button.style.border = "none";
    button.style.cursor = "pointer";
    button.onclick = downloadScreenshot;
    document.body.appendChild(button);
}

function downloadScreenshot() {
    renderer.domElement.toBlob(blob => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "interaction-screenshot.png";
        link.click();
    });
}
