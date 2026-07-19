import { useEffect } from 'react';
import * as THREE from 'three';

export function ThreeBackground() {
  useEffect(() => {
    const container = document.getElementById('three-bg');
    if (!container) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 400;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Neural Network Config
    const particleCount = 150;
    const maxDistance = 90; // Distance to draw lines between nodes
    
    // Nodes
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];
    const colors = new Float32Array(particleCount * 3);

    const colorIndigo = new THREE.Color('#6366f1'); // Indigo-500
    const colorEmerald = new THREE.Color('#10b981'); // Emerald-500
    const colorWhite = new THREE.Color('#ffffff');

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 800; // x
      positions[i + 1] = (Math.random() - 0.5) * 800; // y
      positions[i + 2] = (Math.random() - 0.5) * 400; // z

      velocities.push({
        x: (Math.random() - 0.5) * 0.5,
        y: (Math.random() - 0.5) * 0.5,
        z: (Math.random() - 0.5) * 0.5
      });

      // Mix colors
      const mixRatio = Math.random();
      let pColor = mixRatio < 0.5 
        ? colorIndigo.clone().lerp(colorWhite, Math.random() * 0.2)
        : colorEmerald.clone().lerp(colorWhite, Math.random() * 0.2);

      colors[i] = pColor.r;
      colors[i + 1] = pColor.g;
      colors[i + 2] = pColor.b;
    }

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle Texture
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);
    const texture = new THREE.CanvasTexture(canvas);

    const particlesMat = new THREE.PointsMaterial({
      size: 4,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      map: texture,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particles);

    // Links (Lines)
    const linesGeo = new THREE.BufferGeometry();
    // Maximum possible lines = n * (n-1) / 2
    const linesPositions = new Float32Array(particleCount * particleCount * 3);
    const linesColors = new Float32Array(particleCount * particleCount * 3);
    
    linesGeo.setAttribute('position', new THREE.BufferAttribute(linesPositions, 3));
    linesGeo.setAttribute('color', new THREE.BufferAttribute(linesColors, 3));

    const linesMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const lines = new THREE.LineSegments(linesGeo, linesMat);
    scene.add(lines);

    // Interactive Variables
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = width / 2;
    const windowHalfY = height / 2;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX - windowHalfX) * 0.1;
      mouseY = (event.clientY - windowHalfY) * 0.1;
    };

    // Gyroscope Variables
    let gyroX = 0;
    let gyroY = 0;
    const handleOrientation = (event) => {
      if (event.beta && event.gamma) {
        // Landscape or portrait handling can be complex, this is a basic mapping
        // beta is front-to-back tilt in degrees, where front is positive
        // gamma is left-to-right tilt in degrees, where right is positive
        gyroX = event.gamma * 2; // Sensitivity multiplier
        gyroY = (event.beta - 45) * 2; // Offset assuming held at 45deg
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation);
    }

    // Animation Loop
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Update positions
      const pPositions = particlesGeo.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        pPositions[i * 3] += velocities[i].x;
        pPositions[i * 3 + 1] += velocities[i].y;
        pPositions[i * 3 + 2] += velocities[i].z;

        // Bounce off bounds
        if (pPositions[i * 3] < -400 || pPositions[i * 3] > 400) velocities[i].x *= -1;
        if (pPositions[i * 3 + 1] < -400 || pPositions[i * 3 + 1] > 400) velocities[i].y *= -1;
        if (pPositions[i * 3 + 2] < -200 || pPositions[i * 3 + 2] > 200) velocities[i].z *= -1;
      }
      particlesGeo.attributes.position.needsUpdate = true;

      // Update Links
      let vertexpos = 0;
      let colorpos = 0;
      let numConnected = 0;

      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const dx = pPositions[i * 3] - pPositions[j * 3];
          const dy = pPositions[i * 3 + 1] - pPositions[j * 3 + 1];
          const dz = pPositions[i * 3 + 2] - pPositions[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < maxDistance) {
            const alpha = 1.0 - (dist / maxDistance);

            linesPositions[vertexpos++] = pPositions[i * 3];
            linesPositions[vertexpos++] = pPositions[i * 3 + 1];
            linesPositions[vertexpos++] = pPositions[i * 3 + 2];

            linesPositions[vertexpos++] = pPositions[j * 3];
            linesPositions[vertexpos++] = pPositions[j * 3 + 1];
            linesPositions[vertexpos++] = pPositions[j * 3 + 2];

            // Use color of first particle for line, adjusted by alpha
            const cR = colors[i * 3] * alpha;
            const cG = colors[i * 3 + 1] * alpha;
            const cB = colors[i * 3 + 2] * alpha;

            linesColors[colorpos++] = cR;
            linesColors[colorpos++] = cG;
            linesColors[colorpos++] = cB;

            linesColors[colorpos++] = cR;
            linesColors[colorpos++] = cG;
            linesColors[colorpos++] = cB;

            numConnected++;
          }
        }
      }

      linesGeo.setDrawRange(0, numConnected * 2);
      linesGeo.attributes.position.needsUpdate = true;
      linesGeo.attributes.color.needsUpdate = true;

      // Camera Movement (Mouse + Gyro)
      const combinedX = mouseX + gyroX;
      const combinedY = mouseY + gyroY;

      targetX += (combinedX - targetX) * 0.05;
      targetY += (combinedY - targetY) * 0.05;
      
      camera.position.x += (targetX - camera.position.x) * 0.1;
      camera.position.y += (-targetY - camera.position.y) * 0.1;
      camera.lookAt(scene.position);

      // Add gentle overall rotation
      scene.rotation.y += 0.001;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('deviceorientation', handleOrientation);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      particlesGeo.dispose();
      particlesMat.dispose();
      texture.dispose();
      linesGeo.dispose();
      linesMat.dispose();
    };
  }, []);

  return (
    <div
      id="three-bg"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1, // Push behind content
        pointerEvents: 'none',
        opacity: 0.8,
        background: 'radial-gradient(circle at center, #0a0a0a 0%, #000000 100%)' // Fallback/base
      }}
    />
  );
}
