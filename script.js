const loader = document.querySelector(".loader");
const progress = document.querySelector(".scroll-progress");
const cursor = document.querySelector(".cursor-dot");
const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");

window.addEventListener("load", () => {
  window.setTimeout(() => loader?.classList.add("is-hidden"), 450);
});

if (window.AOS) {
  document.body.classList.add("aos-enabled");
  AOS.init({
    duration: 760,
    easing: "ease-out-cubic",
    once: true,
    offset: 90,
  });
} else {
  document.querySelectorAll("[data-aos]").forEach((element) => {
    element.removeAttribute("data-aos");
    element.removeAttribute("data-aos-delay");
  });
}

if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  gsap.to(".scroll-progress", {
    width: "100%",
    ease: "none",
    scrollTrigger: {
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.25,
    },
  });

  gsap.utils.toArray(".mockup").forEach((mockup) => {
    gsap.to(mockup, {
      y: -18,
      rotateX: 2,
      scrollTrigger: {
        trigger: mockup,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
  });
} else if (progress) {
  window.addEventListener("scroll", () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${(window.scrollY / max) * 100}%`;
  });
}

window.addEventListener("scroll", () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 20);
});

navToggle?.addEventListener("click", () => {
  const isOpen = nav?.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

if (window.matchMedia("(pointer: fine)").matches && cursor && window.gsap) {
  window.addEventListener("mousemove", (event) => {
    gsap.to(cursor, {
      x: event.clientX,
      y: event.clientY,
      duration: 0.16,
      ease: "power2.out",
    });
  });
}

const canvas = document.querySelector("#network-scene");

if (canvas && window.THREE) {
  window.__trebintechSceneReady = false;
  const scene = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    preserveDrawingBuffer: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));

  const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 100);
  camera.position.set(0, 0, 9);

  const group = new THREE.Group();
  scene.add(group);

  const purple = new THREE.Color("#7C3AED");
  const black = new THREE.Color("#111111");
  const white = new THREE.Color("#FFFFFF");

  const ambient = new THREE.AmbientLight("#ffffff", 0.8);
  const key = new THREE.PointLight("#7C3AED", 24, 16);
  key.position.set(2.5, 3, 4);
  scene.add(ambient, key);

  const cubeMaterial = new THREE.MeshStandardMaterial({
    color: "#7C3AED",
    metalness: 0.42,
    roughness: 0.28,
    transparent: true,
    opacity: 0.86,
  });

  const edgeMaterial = new THREE.LineBasicMaterial({
    color: "#FFFFFF",
    transparent: true,
    opacity: 0.52,
  });

  const cubes = [];
  const cubePositions = [
    [-2.7, 1.4, 0.1],
    [-1.2, -0.8, 1.2],
    [0.6, 1.1, -0.6],
    [2.2, -0.4, 0.8],
    [1.4, 2.2, -1.4],
    [-2.1, -2, -0.8],
    [2.8, 1.5, 0.2],
  ];

  cubePositions.forEach((position, index) => {
    const size = index % 2 === 0 ? 0.62 : 0.42;
    const cube = new THREE.Mesh(new THREE.BoxGeometry(size, size, size), cubeMaterial.clone());
    cube.position.set(...position);
    cube.rotation.set(index * 0.4, index * 0.24, index * 0.18);

    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(cube.geometry), edgeMaterial.clone());
    cube.add(edges);

    group.add(cube);
    cubes.push(cube);
  });

  const lineMaterial = new THREE.LineBasicMaterial({
    color: "#7C3AED",
    transparent: true,
    opacity: 0.38,
  });

  for (let index = 0; index < cubePositions.length - 1; index += 1) {
    const points = [
      new THREE.Vector3(...cubePositions[index]),
      new THREE.Vector3(...cubePositions[index + 1]),
    ];
    const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), lineMaterial.clone());
    group.add(line);
  }

  const particleCount = 560;
  const particleGeometry = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);
  const particleColors = new Float32Array(particleCount * 3);

  for (let index = 0; index < particleCount; index += 1) {
    const radius = 2.1 + Math.random() * 3.4;
    const angle = Math.random() * Math.PI * 2;
    const height = (Math.random() - 0.5) * 5;
    particlePositions[index * 3] = Math.cos(angle) * radius;
    particlePositions[index * 3 + 1] = height;
    particlePositions[index * 3 + 2] = Math.sin(angle) * radius;

    const color = index % 5 === 0 ? white : index % 7 === 0 ? black : purple;
    particleColors[index * 3] = color.r;
    particleColors[index * 3 + 1] = color.g;
    particleColors[index * 3 + 2] = color.b;
  }

  particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
  particleGeometry.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

  const particleMaterial = new THREE.PointsMaterial({
    size: 0.035,
    vertexColors: true,
    transparent: true,
    opacity: 0.86,
  });

  const particles = new THREE.Points(particleGeometry, particleMaterial);
  group.add(particles);

  const shaderPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(8, 8, 48, 48),
    new THREE.ShaderMaterial({
      transparent: true,
      opacity: 0.32,
      uniforms: {
        uTime: { value: 0 },
        uColorA: { value: new THREE.Color("#7C3AED") },
        uColorB: { value: new THREE.Color("#FFFFFF") },
      },
      vertexShader: `
        varying vec2 vUv;
        uniform float uTime;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z += sin((p.x + uTime) * 2.0) * 0.08;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform float uTime;
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        void main() {
          float wave = sin((vUv.x + vUv.y + uTime * 0.12) * 18.0) * 0.5 + 0.5;
          float mask = smoothstep(0.18, 0.72, wave) * (1.0 - distance(vUv, vec2(0.5)) * 1.25);
          vec3 color = mix(uColorA, uColorB, vUv.x);
          gl_FragColor = vec4(color, max(mask, 0.0) * 0.16);
        }
      `,
      depthWrite: false,
    })
  );
  shaderPlane.position.z = -2.2;
  group.add(shaderPlane);

  const pointer = { x: 0, y: 0 };

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    renderer.setSize(rect.width, rect.height, false);
    camera.aspect = rect.width / rect.height;
    camera.updateProjectionMatrix();
  };

  window.addEventListener("resize", resize);
  window.addEventListener("mousemove", (event) => {
    const rect = canvas.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    pointer.y = -((event.clientY - rect.top) / rect.height - 0.5) * 2;
  });

  resize();

  const clock = new THREE.Clock();

  const animate = () => {
    const elapsed = clock.getElapsedTime();
    shaderPlane.material.uniforms.uTime.value = elapsed;

    cubes.forEach((cube, index) => {
      cube.rotation.x += 0.004 + index * 0.0004;
      cube.rotation.y += 0.006;
      cube.position.y += Math.sin(elapsed + index) * 0.0015;
    });

    particles.rotation.y = elapsed * 0.055;
    particles.rotation.x = Math.sin(elapsed * 0.28) * 0.08;
    group.rotation.y += (pointer.x * 0.22 - group.rotation.y) * 0.035;
    group.rotation.x += (pointer.y * 0.16 - group.rotation.x) * 0.035;

    renderer.render(scene, camera);
    window.__trebintechSceneReady = true;
    requestAnimationFrame(animate);
  };

  animate();
} else if (canvas) {
  initNativeWebGLScene(canvas);
}

function initNativeWebGLScene(canvas) {
  const gl = canvas.getContext("webgl", { alpha: true, antialias: true, preserveDrawingBuffer: true });
  if (!gl) return;

  window.__trebintechSceneReady = false;

  const vertexShaderSource = `
    attribute vec3 aPosition;
    attribute vec3 aColor;
    uniform float uTime;
    uniform vec2 uPointer;
    uniform mat4 uProjection;
    varying vec3 vColor;
    void main() {
      vec3 p = aPosition;
      float drift = sin(uTime * 0.8 + p.x * 1.8 + p.y) * 0.08;
      p.x += uPointer.x * 0.45 + drift;
      p.y += uPointer.y * 0.28 + cos(uTime * 0.7 + p.z) * 0.06;
      gl_Position = uProjection * vec4(p, 1.0);
      gl_PointSize = 4.5 + sin(uTime + p.z) * 1.8;
      vColor = aColor;
    }
  `;

  const fragmentShaderSource = `
    precision mediump float;
    varying vec3 vColor;
    void main() {
      vec2 coord = gl_PointCoord - vec2(0.5);
      float alpha = 1.0 - smoothstep(0.14, 0.5, length(coord));
      gl_FragColor = vec4(vColor, alpha * 0.95);
    }
  `;

  const lineFragmentShaderSource = `
    precision mediump float;
    varying vec3 vColor;
    void main() {
      gl_FragColor = vec4(vColor, 0.28);
    }
  `;

  const createShader = (type, source) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
  };

  const createProgram = (fragmentSource) => {
    const program = gl.createProgram();
    gl.attachShader(program, createShader(gl.VERTEX_SHADER, vertexShaderSource));
    gl.attachShader(program, createShader(gl.FRAGMENT_SHADER, fragmentSource));
    gl.linkProgram(program);
    return program;
  };

  const pointProgram = createProgram(fragmentShaderSource);
  const lineProgram = createProgram(lineFragmentShaderSource);
  const particleCount = 420;
  const particleData = new Float32Array(particleCount * 6);
  const palette = [
    [0.49, 0.23, 0.93],
    [0.36, 0.13, 0.71],
    [1, 1, 1],
    [0.07, 0.07, 0.07],
  ];

  for (let index = 0; index < particleCount; index += 1) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 0.2 + Math.random() * 2.7;
    const color = palette[index % palette.length];
    particleData[index * 6] = Math.cos(angle) * radius;
    particleData[index * 6 + 1] = Math.sin(angle) * radius * 0.72;
    particleData[index * 6 + 2] = Math.random() * 2 - 1;
    particleData[index * 6 + 3] = color[0];
    particleData[index * 6 + 4] = color[1];
    particleData[index * 6 + 5] = color[2];
  }

  const lineData = new Float32Array(96 * 6);
  for (let index = 0; index < 96; index += 2) {
    const source = (index * 13) % particleCount;
    const target = (source + 37) % particleCount;
    lineData.set(particleData.slice(source * 6, source * 6 + 6), index * 6);
    lineData.set(particleData.slice(target * 6, target * 6 + 6), (index + 1) * 6);
  }

  const particleBuffer = gl.createBuffer();
  const lineBuffer = gl.createBuffer();
  const pointer = { x: 0, y: 0 };

  const bindBuffer = (program, buffer, data) => {
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

    const position = gl.getAttribLocation(program, "aPosition");
    const color = gl.getAttribLocation(program, "aColor");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 3, gl.FLOAT, false, 24, 0);
    gl.enableVertexAttribArray(color);
    gl.vertexAttribPointer(color, 3, gl.FLOAT, false, 24, 12);
  };

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.max(1, Math.floor(rect.width * Math.min(window.devicePixelRatio, 1.8)));
    canvas.height = Math.max(1, Math.floor(rect.height * Math.min(window.devicePixelRatio, 1.8)));
    gl.viewport(0, 0, canvas.width, canvas.height);
  };

  const projection = new Float32Array([
    0.38, 0, 0, 0,
    0, 0.58, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,
  ]);

  window.addEventListener("resize", resize);
  window.addEventListener("mousemove", (event) => {
    const rect = canvas.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    pointer.y = -((event.clientY - rect.top) / rect.height - 0.5) * 2;
  });

  resize();

  const render = (time) => {
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

    for (const [program, buffer, data, mode, count] of [
      [lineProgram, lineBuffer, lineData, gl.LINES, lineData.length / 6],
      [pointProgram, particleBuffer, particleData, gl.POINTS, particleCount],
    ]) {
      bindBuffer(program, buffer, data);
      gl.uniform1f(gl.getUniformLocation(program, "uTime"), time * 0.001);
      gl.uniform2f(gl.getUniformLocation(program, "uPointer"), pointer.x, pointer.y);
      gl.uniformMatrix4fv(gl.getUniformLocation(program, "uProjection"), false, projection);
      gl.drawArrays(mode, 0, count);
    }

    window.__trebintechSceneReady = true;
    requestAnimationFrame(render);
  };

  requestAnimationFrame(render);
}
