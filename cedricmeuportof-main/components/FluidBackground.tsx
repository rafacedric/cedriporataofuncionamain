import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const FluidBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.Camera(); // Orthographic camera not strictly needed for full screen quad
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Optimize for performance
    mountRef.current.appendChild(renderer.domElement);

    // Uniforms
    const uniforms = {
      u_time: { value: 0.0 },
      u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
    };

    // Vertex Shader (Simple Pass-through)
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    // Fragment Shader (Fluid Simulation approximation using Domain Warping)
    const fragmentShader = `
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      varying vec2 vUv;

      // Simple noise function
      float random(in vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }

      // Noise based on value noise
      float noise(in vec2 st) {
          vec2 i = floor(st);
          vec2 f = fract(st);
          float a = random(i);
          float b = random(i + vec2(1.0, 0.0));
          float c = random(i + vec2(0.0, 1.0));
          float d = random(i + vec2(1.0, 1.0));
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }

      // Fractional Brownian Motion
      float fbm(in vec2 st) {
          float value = 0.0;
          float amplitude = 0.5;
          float frequency = 0.0;
          for (int i = 0; i < 5; i++) {
              value += amplitude * noise(st);
              st *= 2.0;
              amplitude *= 0.5;
          }
          return value;
      }

      void main() {
          vec2 st = gl_FragCoord.xy / u_resolution.xy;
          st.x *= u_resolution.x / u_resolution.y;

          // Mouse influence
          vec2 mouse = u_mouse * u_resolution.xy / u_resolution.y;
          float dist = distance(st, mouse);
          float mouseInteraction = smoothstep(0.5, 0.0, dist) * 0.5;

          vec3 color = vec3(0.0);
          
          // Domain warping
          vec2 q = vec2(0.0);
          q.x = fbm(st + 0.00 * u_time);
          q.y = fbm(st + vec2(1.0));

          vec2 r = vec2(0.0);
          r.x = fbm(st + 1.0 * q + vec2(1.7, 9.2) + 0.15 * u_time + mouseInteraction);
          r.y = fbm(st + 1.0 * q + vec2(8.3, 2.8) + 0.126 * u_time);

          float f = fbm(st + r);

          // Mixing colors based on the warped noise value
          // Deep Blue / Purple / Pink palette
          vec3 color1 = vec3(0.101961, 0.619608, 0.666667); // Cyan
          vec3 color2 = vec3(0.666667, 0.666667, 0.498039); // Yellowish
          vec3 color3 = vec3(0.0, 0.0, 0.164706); // Deep Blue
          vec3 color4 = vec3(0.666667, 0.1, 0.4); // Magenta

          color = mix(color1, color2, clamp((f*f)*4.0,0.0,1.0));
          color = mix(color, color3, clamp(length(q),0.0,1.0));
          color = mix(color, color4, clamp(length(r.x),0.0,1.0));

          // Vignette
          float vignette = 1.0 - smoothstep(0.5, 1.5, length(vUv - 0.5) * 1.5);
          color *= vignette;

          gl_FragColor = vec4((f*f*f + 0.6 * f*f + 0.5 * f) * color, 1.0);
      }
    `;

    // Mesh
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
      uniforms.u_time.value += 0.005;
      renderer.render(scene, camera);
    };
    animate();

    // Event Listeners
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = 1.0 - (e.clientY / window.innerHeight); // Flip Y for shader coords
      uniforms.u_mouse.value.set(x, y);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return <div ref={mountRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};

export default FluidBackground;
