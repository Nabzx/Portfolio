// fig. 0 — a loss landscape, mid-descent.
// Particles start as pure noise and converge onto an undulating surface,
// height-mapped with a Claude ramp: warm black valleys, terracotta
// slopes, ivory peaks. Every epoch, a better checkpoint.

import * as THREE from 'three';

const RAMP = [
  [0.165, 0.149, 0.133], // #2a2622 warm black
  [0.510, 0.314, 0.235], // #82503c deep clay
  [0.800, 0.471, 0.361], // #cc785c book cloth
  [0.851, 0.467, 0.341], // #d97757 crail
  [0.957, 0.929, 0.878], // #f4ede0 ivory peak
];

const VERT = /* glsl */ `
  uniform float uProgress;
  uniform float uTime;
  uniform float uSize;
  uniform vec2 uPointer;

  attribute vec3 aScatter;
  attribute vec2 aGrid;
  attribute float aDelay;
  attribute float aSize;

  varying float vHeight;
  varying float vFade;

  float terrain(vec2 p, float t) {
    float z = 0.0;
    z += 0.46 * sin(p.x * 1.6 + t * 0.30) * cos(p.y * 1.35 - t * 0.24);
    z += 0.26 * sin(p.x * 3.1 - t * 0.19 + 1.7) * sin(p.y * 2.7 + t * 0.26);
    z += 0.11 * sin(p.x * 6.2 + p.y * 5.1 + t * 0.5);
    z -= 0.62 * exp(-dot(p - vec2(0.6, -0.4), p - vec2(0.6, -0.4)) * 0.5);
    return z;
  }

  void main() {
    vec2 world = aGrid;
    float z = terrain(world * 0.62 + uPointer * 0.12, uTime);
    vec3 target = vec3(world.x, z, world.y);

    float p = smoothstep(aDelay * 0.72, aDelay * 0.72 + 0.28, uProgress);
    vec3 pos = mix(aScatter, target, p);

    vHeight = clamp((z + 1.05) / 1.9, 0.0, 1.0);
    float edge = max(abs(aGrid.x) / 7.2, abs(aGrid.y) / 5.2);
    vFade = 1.0 - smoothstep(0.72, 1.0, edge);

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * aSize * (1.0 / max(-mv.z, 0.1));
  }
`;

const FRAG = /* glsl */ `
  precision highp float;

  uniform vec3 uC1;
  uniform vec3 uC2;
  uniform vec3 uC3;
  uniform vec3 uC4;
  uniform vec3 uC5;

  varying float vHeight;
  varying float vFade;

  void main() {
    vec2 d = gl_PointCoord - 0.5;
    float r = length(d);
    if (r > 0.5) discard;
    float soft = smoothstep(0.5, 0.08, r);

    float h = vHeight;
    vec3 c = mix(uC1, uC2, smoothstep(0.00, 0.30, h));
    c = mix(c, uC3, smoothstep(0.30, 0.58, h));
    c = mix(c, uC4, smoothstep(0.58, 0.82, h));
    c = mix(c, uC5, smoothstep(0.82, 1.00, h));

    float alpha = soft * vFade * (0.30 + 0.70 * h);
    gl_FragColor = vec4(c, alpha);
  }
`;

function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function createHeroField(canvas, { reducedMotion = false } = {}) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'high-performance' });
  } catch (err) {
    canvas.style.display = 'none';
    return { setProgress() {}, dispose() {} };
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 60);
  camera.position.set(0, 2.9, 6.2);
  camera.lookAt(0, -0.35, 0);

  const isCoarse = window.matchMedia('(pointer: coarse)').matches;
  const small = Math.min(window.innerWidth, window.innerHeight) < 700;
  const COLS = small || isCoarse ? 110 : 170;
  const ROWS = small || isCoarse ? 66 : 100;
  const COUNT = COLS * ROWS;

  const grid = new Float32Array(COUNT * 2);
  const scatter = new Float32Array(COUNT * 3);
  const delay = new Float32Array(COUNT);
  const size = new Float32Array(COUNT);
  const rand = mulberry32(20260706);

  const EX = 7.2, EY = 5.2;
  let i2 = 0, i3 = 0;
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const gx = (x / (COLS - 1) * 2 - 1) * EX;
      const gy = (y / (ROWS - 1) * 2 - 1) * EY;
      grid[i2] = gx;
      grid[i2 + 1] = gy;

      // start life as a loose shell of noise around the camera's view
      const th = rand() * Math.PI * 2;
      const ph = Math.acos(rand() * 2 - 1);
      const rr = 5.5 + rand() * 5.5;
      scatter[i3] = rr * Math.sin(ph) * Math.cos(th);
      scatter[i3 + 1] = rr * Math.cos(ph) * 0.7 + 0.5;
      scatter[i3 + 2] = rr * Math.sin(ph) * Math.sin(th) * 0.7;

      delay[i2 / 2] = rand();
      size[i2 / 2] = 0.6 + rand() * 0.9;
      i2 += 2; i3 += 3;
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(COUNT * 3), 3));
  geo.setAttribute('aGrid', new THREE.BufferAttribute(grid, 2));
  geo.setAttribute('aScatter', new THREE.BufferAttribute(scatter, 3));
  geo.setAttribute('aDelay', new THREE.BufferAttribute(delay, 1));
  geo.setAttribute('aSize', new THREE.BufferAttribute(size, 1));
  geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 20);

  const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
  const mat = new THREE.ShaderMaterial({
    vertexShader: VERT,
    fragmentShader: FRAG,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uProgress: { value: reducedMotion ? 1 : 0 },
      uTime: { value: 0 },
      uSize: { value: 34 * dpr },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uC1: { value: new THREE.Vector3(...RAMP[0]) },
      uC2: { value: new THREE.Vector3(...RAMP[1]) },
      uC3: { value: new THREE.Vector3(...RAMP[2]) },
      uC4: { value: new THREE.Vector3(...RAMP[3]) },
      uC5: { value: new THREE.Vector3(...RAMP[4]) },
    },
  });

  const points = new THREE.Points(geo, mat);
  scene.add(points);

  renderer.setPixelRatio(dpr);

  function resize() {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  // gentle camera parallax toward the pointer (desktop only)
  const pointerTarget = new THREE.Vector2(0, 0);
  function onPointerMove(e) {
    pointerTarget.set(
      (e.clientX / window.innerWidth) * 2 - 1,
      (e.clientY / window.innerHeight) * 2 - 1
    );
  }
  if (!isCoarse && !reducedMotion) {
    window.addEventListener('pointermove', onPointerMove, { passive: true });
  }

  let running = true;
  let visible = true;
  const clock = new THREE.Clock();

  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
  });
  io.observe(canvas);

  document.addEventListener('visibilitychange', () => {
    running = !document.hidden;
  });

  let frame;
  function tick() {
    frame = requestAnimationFrame(tick);
    if (!running || !visible) return;
    const dt = clock.getDelta();
    if (!reducedMotion) {
      mat.uniforms.uTime.value += dt;
      mat.uniforms.uPointer.value.lerp(pointerTarget, 0.04);
      camera.position.x += (pointerTarget.x * 0.45 - camera.position.x) * 0.03;
      camera.position.y += (2.9 - pointerTarget.y * 0.3 - camera.position.y) * 0.03;
      camera.lookAt(0, -0.35, 0);
    }
    renderer.render(scene, camera);
  }
  tick();

  return {
    setProgress(v) { mat.uniforms.uProgress.value = v; },
    dispose() {
      cancelAnimationFrame(frame);
      io.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
    },
  };
}
