import * as THREE from 'three';

const palettes = {
  light: { primary: 0x0077b6, secondary: 0x00b4d8, accent: 0x03045e, soft: 0x0096c7 },
  dark: { primary: 0x00b4d8, secondary: 0x90e0ef, accent: 0x48cae4, soft: 0x0096c7 }
};

function currentTheme() {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

function lineMat(mats, role, opacity = 0.9) {
  const material = new THREE.LineBasicMaterial({ transparent: true, opacity });
  mats.push([material, role]);
  return material;
}

function fillMat(mats, role, opacity = 0.1) {
  const material = new THREE.MeshBasicMaterial({ transparent: true, opacity, depthWrite: false });
  mats.push([material, role]);
  return material;
}

function pointsMat(mats, role, size = 0.055) {
  const material = new THREE.PointsMaterial({ size, transparent: true, opacity: 0.85, sizeAttenuation: true });
  mats.push([material, role]);
  return material;
}

function edgedBox(mats, w, h, d, fillRole = 'primary', edgeRole = 'secondary', fillOpacity = 0.08) {
  const geometry = new THREE.BoxGeometry(w, h, d);
  const mesh = new THREE.Mesh(geometry, fillMat(mats, fillRole, fillOpacity));
  const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geometry), lineMat(mats, edgeRole));
  mesh.add(edges);
  return mesh;
}

/* Marketing funnel: stacked rings with leads falling through. */
function buildFunnel(mats) {
  const group = new THREE.Group();
  const levels = [
    [2.35, 1.7],
    [1.85, 0.62],
    [1.4, -0.42],
    [0.95, -1.4]
  ];
  levels.forEach(([radius, y], index) => {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(radius, 0.028, 10, 72),
      fillMat(mats, index % 2 ? 'secondary' : 'primary', 0.95)
    );
    ring.rotation.x = Math.PI / 2;
    ring.position.y = y;
    group.add(ring);
  });

  const count = 110;
  const positions = new Float32Array(count * 3);
  const seeds = [];
  for (let i = 0; i < count; i += 1) {
    seeds.push({ angle: Math.random() * Math.PI * 2, speed: 0.35 + Math.random() * 0.5, phase: Math.random() });
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const points = new THREE.Points(geometry, pointsMat(mats, 'secondary'));
  group.add(points);

  return {
    group,
    update(t) {
      for (let i = 0; i < count; i += 1) {
        const seed = seeds[i];
        const progress = (t * seed.speed * 0.16 + seed.phase) % 1;
        const y = 2.1 - progress * 3.9;
        const radius = (2.3 - progress * 1.45) * (0.62 + 0.34 * Math.sin(seed.phase * 43));
        const angle = seed.angle + t * seed.speed * 0.7;
        positions[i * 3] = Math.cos(angle) * radius;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = Math.sin(angle) * radius;
      }
      geometry.attributes.position.needsUpdate = true;
      group.rotation.y = t * 0.14;
    }
  };
}

/* SaaS platform: floating layered planes. */
function buildStack(mats) {
  const group = new THREE.Group();
  const layers = [];
  for (let i = 0; i < 4; i += 1) {
    const layer = edgedBox(mats, 3.15 - i * 0.2, 0.16, 2.25 - i * 0.14, i % 2 ? 'secondary' : 'primary', 'secondary', 0.09);
    layer.position.y = -1.15 + i * 0.82;
    layer.rotation.y = i * 0.14;
    group.add(layer);
    layers.push(layer);
  }
  const beacon = new THREE.Mesh(new THREE.OctahedronGeometry(0.34), fillMat(mats, 'accent', 0.85));
  beacon.position.y = 1.85;
  group.add(beacon);
  group.rotation.x = 0.32;

  return {
    group,
    update(t) {
      layers.forEach((layer, i) => {
        layer.position.y = -1.15 + i * 0.82 + Math.sin(t * 0.9 + i * 0.9) * 0.07;
        layer.rotation.y = i * 0.14 + Math.sin(t * 0.35 + i) * 0.05;
      });
      beacon.position.y = 1.85 + Math.sin(t * 1.4) * 0.12;
      beacon.rotation.y = t * 0.8;
      group.rotation.y = t * 0.12;
    }
  };
}

/* AI voice: travelling waveform bars. */
function buildWaveform(mats) {
  const group = new THREE.Group();
  const bars = [];
  const barCount = 26;
  for (let i = 0; i < barCount; i += 1) {
    const bar = new THREE.Mesh(
      new THREE.BoxGeometry(0.13, 1, 0.13),
      fillMat(mats, i % 3 === 0 ? 'primary' : 'secondary', 0.85)
    );
    bar.position.x = -3 + (i / (barCount - 1)) * 6;
    group.add(bar);
    bars.push(bar);
  }
  const halo = new THREE.Mesh(new THREE.TorusGeometry(2.9, 0.016, 8, 90), fillMat(mats, 'soft', 0.5));
  group.add(halo);

  return {
    group,
    update(t) {
      bars.forEach((bar, i) => {
        const pulse = Math.sin(t * 2.3 - i * 0.52) * 0.5 + 0.5;
        const height = 0.22 + Math.pow(pulse, 1.7) * 2.1;
        bar.scale.y = height;
      });
      halo.rotation.x = Math.PI / 2 + Math.sin(t * 0.4) * 0.16;
      halo.rotation.z = t * 0.2;
      group.rotation.y = Math.sin(t * 0.22) * 0.28;
    }
  };
}

/* CRM: connected lead network. */
function buildNodes(mats) {
  const group = new THREE.Group();
  const nodeCount = 16;
  const nodes = [];
  const sphereGeo = new THREE.SphereGeometry(1, 14, 14);
  for (let i = 0; i < nodeCount; i += 1) {
    const dir = new THREE.Vector3().randomDirection();
    const base = dir.multiplyScalar(0.8 + Math.random() * 1.7);
    const size = i === 0 ? 0.3 : 0.07 + Math.random() * 0.1;
    const mesh = new THREE.Mesh(sphereGeo, fillMat(mats, i === 0 ? 'accent' : i % 2 ? 'secondary' : 'primary', i === 0 ? 0.9 : 0.8));
    mesh.scale.setScalar(size);
    if (i === 0) base.set(0, 0, 0);
    mesh.position.copy(base);
    group.add(mesh);
    nodes.push({ mesh, base, phase: Math.random() * Math.PI * 2, speed: 0.5 + Math.random() * 0.7 });
  }

  const pairs = [];
  for (let i = 0; i < nodeCount; i += 1) {
    for (let j = i + 1; j < nodeCount; j += 1) {
      const distance = nodes[i].base.distanceTo(nodes[j].base);
      if (i === 0 ? distance < 2.2 : distance < 1.55) pairs.push([i, j]);
    }
  }
  const linePositions = new Float32Array(pairs.length * 6);
  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
  group.add(new THREE.LineSegments(lineGeo, lineMat(mats, 'soft', 0.42)));

  return {
    group,
    update(t) {
      nodes.forEach((node) => {
        node.mesh.position.set(
          node.base.x + Math.sin(t * node.speed + node.phase) * 0.11,
          node.base.y + Math.cos(t * node.speed * 0.8 + node.phase) * 0.11,
          node.base.z + Math.sin(t * node.speed * 0.6 + node.phase * 2) * 0.11
        );
      });
      pairs.forEach(([a, b], index) => {
        nodes[a].mesh.position.toArray(linePositions, index * 6);
        nodes[b].mesh.position.toArray(linePositions, index * 6 + 3);
      });
      lineGeo.attributes.position.needsUpdate = true;
      group.rotation.y = t * 0.16;
    }
  };
}

/* Automation: looping flow with travelling packets. */
function buildFlow(mats) {
  const group = new THREE.Group();
  const anchors = [];
  for (let i = 0; i < 6; i += 1) {
    const angle = (i / 6) * Math.PI * 2;
    anchors.push(new THREE.Vector3(Math.cos(angle) * 2.15, Math.sin(angle * 2) * 0.55, Math.sin(angle) * 2.15));
  }
  const curve = new THREE.CatmullRomCurve3(anchors, true, 'centripetal', 0.9);
  group.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 130, 0.02, 8, true), fillMat(mats, 'soft', 0.6)));

  anchors.forEach((point, i) => {
    const node = edgedBox(mats, 0.42, 0.42, 0.42, i % 2 ? 'secondary' : 'primary', 'secondary', 0.14);
    node.position.copy(point);
    node.rotation.set(0.4, i, 0);
    group.add(node);
  });

  const packets = [];
  for (let i = 0; i < 9; i += 1) {
    const packet = new THREE.Mesh(new THREE.SphereGeometry(0.06, 10, 10), fillMat(mats, 'accent', 0.95));
    group.add(packet);
    packets.push({ mesh: packet, offset: i / 9, speed: 0.045 + (i % 3) * 0.012 });
  }

  return {
    group,
    update(t) {
      packets.forEach((packet) => {
        const u = (t * packet.speed + packet.offset) % 1;
        packet.mesh.position.copy(curve.getPointAt(u));
      });
      group.rotation.y = t * 0.15;
      group.rotation.x = 0.42 + Math.sin(t * 0.3) * 0.04;
    }
  };
}

/* Analytics: living 3D bar field with growth line. */
function buildBars(mats) {
  const group = new THREE.Group();
  const bars = [];
  const cols = 5;
  const rows = 3;
  for (let x = 0; x < cols; x += 1) {
    for (let z = 0; z < rows; z += 1) {
      const bar = edgedBox(mats, 0.5, 1, 0.5, (x + z) % 2 ? 'secondary' : 'primary', 'secondary', 0.14);
      bar.position.set(-1.7 + x * 0.85, 0, -0.85 + z * 0.85);
      group.add(bar);
      bars.push({ mesh: bar, phase: x * 0.9 + z * 1.7 });
    }
  }

  const trendPoints = [];
  for (let i = 0; i <= 20; i += 1) {
    const x = -2 + (i / 20) * 4;
    trendPoints.push(new THREE.Vector3(x, 1.35 + x * 0.32 + Math.sin(i * 0.8) * 0.1, 0));
  }
  const trend = new THREE.Line(new THREE.BufferGeometry().setFromPoints(trendPoints), lineMat(mats, 'accent', 0.95));
  group.add(trend);
  group.rotation.x = 0.34;
  group.position.y = -0.5;

  return {
    group,
    update(t) {
      bars.forEach(({ mesh, phase }) => {
        const height = 0.35 + (Math.sin(t * 0.9 + phase) * 0.5 + 0.5) * 1.9;
        mesh.scale.y = height;
        mesh.position.y = height / 2 - 0.55;
      });
      trend.position.y = Math.sin(t * 0.8) * 0.06;
      group.rotation.y = t * 0.14;
    }
  };
}

/* Services overview: connected core with orbiting systems. */
function buildOrbit(mats) {
  const group = new THREE.Group();
  const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.02, 1), fillMat(mats, 'primary', 0.1));
  core.add(new THREE.LineSegments(new THREE.EdgesGeometry(core.geometry), lineMat(mats, 'primary')));
  group.add(core);

  const rings = [];
  [
    [1.75, 0.42, 0],
    [2.15, -0.5, 0.7],
    [2.55, 1.1, -0.45]
  ].forEach(([radius, tiltX, tiltZ], i) => {
    const ring = new THREE.Group();
    const track = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.012, 8, 90), fillMat(mats, 'soft', 0.55));
    const moon = new THREE.Mesh(new THREE.SphereGeometry(0.14 - i * 0.02, 12, 12), fillMat(mats, i % 2 ? 'secondary' : 'accent', 0.95));
    moon.position.x = radius;
    ring.add(track, moon);
    ring.rotation.set(tiltX, 0, tiltZ);
    group.add(ring);
    rings.push({ ring, speed: 0.5 - i * 0.13 });
  });

  return {
    group,
    update(t) {
      core.rotation.y = t * 0.24;
      core.rotation.x = Math.sin(t * 0.3) * 0.2;
      rings.forEach(({ ring, speed }) => {
        ring.rotation.y = t * speed;
      });
    }
  };
}

/* Products overview: floating product modules. */
function buildModules(mats) {
  const group = new THREE.Group();
  const modules = [];
  const placements = [
    [0, 0.15, 0, 0],
    [-1.85, 1.05, -0.7, 0.35],
    [1.9, 1.2, -0.9, -0.3],
    [-1.55, -1.15, -0.5, -0.25],
    [1.6, -1.05, -0.8, 0.3]
  ];
  placements.forEach(([x, y, z, tilt], i) => {
    const card = edgedBox(mats, i === 0 ? 2 : 1.5, i === 0 ? 1.25 : 0.95, 0.07, i % 2 ? 'secondary' : 'primary', 'secondary', 0.1);
    card.position.set(x, y, z);
    card.rotation.set(tilt * 0.4, tilt, 0);
    const chip = new THREE.Mesh(new THREE.SphereGeometry(0.07, 10, 10), fillMat(mats, 'accent', 0.9));
    chip.position.set(-(i === 0 ? 0.75 : 0.5), (i === 0 ? 0.4 : 0.28), 0.08);
    card.add(chip);
    group.add(card);
    modules.push({ card, baseY: y, phase: i * 1.3 });
  });

  return {
    group,
    update(t) {
      modules.forEach(({ card, baseY, phase }) => {
        card.position.y = baseY + Math.sin(t * 0.9 + phase) * 0.1;
        card.rotation.y += Math.sin(t * 0.4 + phase) * 0.0009;
      });
      group.rotation.y = Math.sin(t * 0.25) * 0.3;
    }
  };
}

/* ArthaLeads: floating kanban pipeline. */
function buildKanban(mats) {
  const group = new THREE.Group();
  const columnX = [-1.7, 0, 1.7];
  columnX.forEach((x, columnIndex) => {
    const header = edgedBox(mats, 1.35, 0.3, 0.08, 'primary', 'secondary', 0.2);
    header.position.set(x, 1.55, 0);
    group.add(header);
    const cardsInColumn = 3 - (columnIndex === 2 ? 1 : 0);
    for (let i = 0; i < cardsInColumn; i += 1) {
      const card = edgedBox(mats, 1.35, 0.55, 0.07, i % 2 ? 'secondary' : 'primary', 'secondary', 0.1);
      card.position.set(x, 0.95 - i * 0.75, 0);
      group.add(card);
    }
  });

  const mover = edgedBox(mats, 1.35, 0.55, 0.07, 'accent', 'accent', 0.22);
  group.add(mover);
  group.rotation.set(0.16, -0.35, 0);

  return {
    group,
    update(t) {
      const cycle = (t * 0.22) % 3;
      const stage = Math.floor(cycle);
      const local = THREE.MathUtils.smoothstep(cycle - stage, 0.15, 0.85);
      const fromX = columnX[stage];
      const toX = columnX[(stage + 1) % 3];
      mover.position.set(
        THREE.MathUtils.lerp(fromX, stage === 2 ? columnX[2] + 2.6 : toX, local),
        -0.55 + Math.sin(local * Math.PI) * 0.55,
        0.25 + Math.sin(local * Math.PI) * 0.3
      );
      mover.visible = !(stage === 2 && local > 0.55);
      group.rotation.y = -0.35 + Math.sin(t * 0.3) * 0.08;
      group.position.y = Math.sin(t * 0.7) * 0.06;
    }
  };
}

/* Industries: wireframe globe with market pins. */
function buildGlobe(mats) {
  const group = new THREE.Group();
  const sphere = new THREE.Mesh(new THREE.IcosahedronGeometry(2.05, 2), fillMat(mats, 'primary', 0.035));
  sphere.add(new THREE.LineSegments(new THREE.EdgesGeometry(sphere.geometry), lineMat(mats, 'soft', 0.65)));
  group.add(sphere);

  const pins = [];
  for (let i = 0; i < 7; i += 1) {
    const dir = new THREE.Vector3().randomDirection();
    const pin = new THREE.Group();
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.09, 10, 10), fillMat(mats, i % 2 ? 'accent' : 'secondary', 0.95));
    head.position.copy(dir.clone().multiplyScalar(2.28));
    const stemGeo = new THREE.BufferGeometry().setFromPoints([
      dir.clone().multiplyScalar(2.05),
      dir.clone().multiplyScalar(2.28)
    ]);
    pin.add(head, new THREE.Line(stemGeo, lineMat(mats, 'secondary', 0.8)));
    group.add(pin);
    pins.push({ head, phase: i * 1.1 });
  }

  return {
    group,
    update(t) {
      group.rotation.y = t * 0.16;
      group.rotation.x = 0.24 + Math.sin(t * 0.25) * 0.05;
      pins.forEach(({ head, phase }) => {
        head.scale.setScalar(1 + Math.sin(t * 2 + phase) * 0.28);
      });
    }
  };
}

const builders = {
  funnel: buildFunnel,
  stack: buildStack,
  waveform: buildWaveform,
  nodes: buildNodes,
  flow: buildFlow,
  bars: buildBars,
  orbit: buildOrbit,
  modules: buildModules,
  kanban: buildKanban,
  globe: buildGlobe
};

export function mountHero3D(canvas, variant) {
  const build = builders[variant] || builders.orbit;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 60);
  camera.position.set(0, 0, 8.6);

  const mats = [];
  const built = build(mats);
  const root = new THREE.Group();
  root.add(built.group);
  scene.add(root);

  const applyTheme = () => {
    const palette = palettes[currentTheme()];
    mats.forEach(([material, role]) => material.color.set(palette[role] || palette.primary));
  };
  applyTheme();
  const themeObserver = new MutationObserver(() => {
    applyTheme();
    if (reduceMotion) renderer.render(scene, camera);
  });
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  let pointerX = 0;
  let pointerY = 0;
  const onPointerMove = (event) => {
    pointerX = event.clientX / window.innerWidth - 0.5;
    pointerY = event.clientY / window.innerHeight - 0.5;
  };
  window.addEventListener('pointermove', onPointerMove, { passive: true });

  const resize = () => {
    const width = canvas.clientWidth || canvas.parentElement.clientWidth;
    const height = canvas.clientHeight || canvas.parentElement.clientHeight;
    if (!width || !height) return;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    if (reduceMotion) renderer.render(scene, camera);
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas.parentElement || canvas);
  resize();

  let frameId = 0;
  let disposed = false;
  const clock = new THREE.Clock();
  const frame = () => {
    if (disposed) return;
    const t = clock.getElapsedTime();
    built.update(t);
    root.rotation.x += (pointerY * 0.22 - root.rotation.x) * 0.05;
    root.rotation.y += (pointerX * 0.34 - root.rotation.y) * 0.05;
    root.position.y = Math.min(window.scrollY * 0.0011, 0.9);
    renderer.render(scene, camera);
    frameId = requestAnimationFrame(frame);
  };

  if (reduceMotion) {
    built.update(1.6);
    renderer.render(scene, camera);
  } else {
    frame();
  }

  return () => {
    disposed = true;
    cancelAnimationFrame(frameId);
    themeObserver.disconnect();
    resizeObserver.disconnect();
    window.removeEventListener('pointermove', onPointerMove);
    scene.traverse((object) => {
      object.geometry?.dispose();
      if (Array.isArray(object.material)) object.material.forEach((m) => m.dispose());
      else object.material?.dispose();
    });
    renderer.dispose();
  };
}
