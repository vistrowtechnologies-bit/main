/* eslint-disable react/no-unknown-property */
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, useGLTF, useTexture } from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";
import styles from "./lanyard.module.css";

extend({ MeshLineGeometry, MeshLineMaterial });

const CARD_GLB = "/assets/lanyard/card.glb";
const DEFAULT_LANYARD = "/assets/lanyard/lanyard.png";
const BLANK_PIXEL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
const FRONT_UV_RECT = { x: 0, y: 0, w: 0.5, h: 0.755 };
const BACK_UV_RECT = { x: 0.5, y: 0, w: 0.5, h: 0.757 };

/**
 * @typedef {Object} LanyardProps
 * @property {[number, number, number]=} position
 * @property {[number, number, number]=} gravity
 * @property {number=} fov
 * @property {boolean=} transparent
 * @property {string | null=} frontImage
 * @property {string | null=} backImage
 * @property {"cover" | "contain"=} imageFit
 * @property {string | null=} lanyardImage
 * @property {number=} lanyardWidth
 * @property {boolean=} brandCard
 * @property {"light" | "dark"=} brandTheme
 */

/** @param {LanyardProps} props */
export default function Lanyard({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
  frontImage = null,
  backImage = null,
  imageFit = "cover",
  lanyardImage = null,
  lanyardWidth = 1,
  brandCard = false,
  brandTheme = "light",
}) {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768,
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.wrapper} aria-hidden="true">
      <Canvas
        camera={{ position, fov }}
        dpr={[1, isMobile ? 1.35 : 1.75]}
        gl={{ alpha: transparent, antialias: true }}
        onCreated={({ gl }) =>
          gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)
        }
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
          <Band
            isMobile={isMobile}
            frontImage={frontImage}
            backImage={backImage}
            imageFit={imageFit}
            lanyardImage={lanyardImage}
            lanyardWidth={lanyardWidth}
            brandCard={brandCard}
            brandTheme={brandTheme}
          />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={10}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}

function roundedRect(context, x, y, width, height, radius) {
  const safeRadius = Math.min(radius, width / 2, height / 2);
  context.beginPath();
  context.moveTo(x + safeRadius, y);
  context.lineTo(x + width - safeRadius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + safeRadius);
  context.lineTo(x + width, y + height - safeRadius);
  context.quadraticCurveTo(
    x + width,
    y + height,
    x + width - safeRadius,
    y + height,
  );
  context.lineTo(x + safeRadius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - safeRadius);
  context.lineTo(x, y + safeRadius);
  context.quadraticCurveTo(x, y, x + safeRadius, y);
  context.closePath();
}

function drawContainedImage(context, image, x, y, width, height) {
  const scale = Math.min(width / image.width, height / image.height);
  const drawWidth = image.width * scale;
  const drawHeight = image.height * scale;
  context.drawImage(
    image,
    x + (width - drawWidth) / 2,
    y + (height - drawHeight) / 2,
    drawWidth,
    drawHeight,
  );
}

function drawQrPattern(context, x, y, size, ink, background) {
  const cells = 9;
  const cell = size / cells;
  const pattern = [
    "111011101",
    "101010101",
    "111010111",
    "000111000",
    "101101101",
    "010010010",
    "111011111",
    "101110101",
    "111010111",
  ];

  context.fillStyle = background;
  roundedRect(context, x, y, size, size, cell * 0.8);
  context.fill();
  context.fillStyle = ink;
  pattern.forEach((row, rowIndex) => {
    [...row].forEach((value, columnIndex) => {
      if (value === "1") {
        context.fillRect(
          x + columnIndex * cell + cell * 0.14,
          y + rowIndex * cell + cell * 0.14,
          cell * 0.72,
          cell * 0.72,
        );
      }
    });
  });
}

function drawVistrowCardFaces(context, canvasWidth, canvasHeight, logo, theme) {
  const dark = theme === "dark";
  const palette = dark
    ? {
        background: "#0d0d0d",
        panel: "#1c1c1e",
        ink: "#f7f8fa",
        muted: "#a7adb8",
        line: "#37373b",
        accent: "#c6ff00",
        accentInk: "#0d0d0d",
      }
    : {
        background: "#f7f8fa",
        panel: "#ffffff",
        ink: "#0d0d0d",
        muted: "#6b7280",
        line: "#dfe2e8",
        accent: "#c6ff00",
        accentInk: "#0d0d0d",
      };

  const getFace = (rect) => ({
    x: rect.x * canvasWidth,
    y: rect.y * canvasHeight,
    width: rect.w * canvasWidth,
    height: rect.h * canvasHeight,
  });
  const front = getFace(FRONT_UV_RECT);
  const back = getFace(BACK_UV_RECT);

  const paintBase = (face) => {
    context.fillStyle = palette.background;
    context.fillRect(face.x, face.y, face.width, face.height);
    const glow = context.createRadialGradient(
      face.x + face.width * 0.82,
      face.y + face.height * 0.1,
      0,
      face.x + face.width * 0.82,
      face.y + face.height * 0.1,
      face.width * 0.8,
    );
    glow.addColorStop(0, dark ? "rgba(198,255,0,0.16)" : "rgba(198,255,0,0.26)");
    glow.addColorStop(1, "rgba(198,255,0,0)");
    context.fillStyle = glow;
    context.fillRect(face.x, face.y, face.width, face.height);
  };

  paintBase(front);
  context.fillStyle = palette.accent;
  context.fillRect(front.x, front.y, front.width, front.height * 0.018);

  context.save();
  context.globalAlpha = dark ? 0.13 : 0.2;
  context.fillStyle = palette.accent;
  const dotRadius = front.width * 0.006;
  for (let row = 0; row < 8; row += 1) {
    for (let column = 0; column < 6; column += 1) {
      context.beginPath();
      context.arc(
        front.x + front.width * (0.66 + column * 0.055),
        front.y + front.height * (0.68 + row * 0.035),
        dotRadius,
        0,
        Math.PI * 2,
      );
      context.fill();
    }
  }
  context.restore();

  drawContainedImage(
    context,
    logo,
    front.x + front.width * 0.1,
    front.y + front.height * 0.12,
    front.width * 0.8,
    front.height * 0.16,
  );

  context.fillStyle = palette.accent;
  roundedRect(
    context,
    front.x + front.width * 0.1,
    front.y + front.height * 0.36,
    front.width * 0.38,
    front.height * 0.07,
    front.height * 0.035,
  );
  context.fill();
  context.fillStyle = palette.accentInk;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.font = `700 ${front.width * 0.032}px Inter, sans-serif`;
  context.fillText(
    "CAREERS PASS",
    front.x + front.width * 0.29,
    front.y + front.height * 0.395,
  );

  context.textAlign = "left";
  context.textBaseline = "alphabetic";
  context.fillStyle = palette.ink;
  context.font = `800 ${front.width * 0.115}px Manrope, sans-serif`;
  context.fillText("BUILD", front.x + front.width * 0.1, front.y + front.height * 0.56);
  context.fillText("WHAT", front.x + front.width * 0.1, front.y + front.height * 0.67);
  context.fillStyle = palette.accent;
  context.fillText("GROWS.", front.x + front.width * 0.1, front.y + front.height * 0.78);

  context.fillStyle = palette.muted;
  context.font = `600 ${front.width * 0.027}px Inter, sans-serif`;
  context.fillText(
    "VST / REMOTE / 2026",
    front.x + front.width * 0.1,
    front.y + front.height * 0.93,
  );

  paintBase(back);
  context.fillStyle = palette.accent;
  context.fillRect(back.x, back.y, back.width, back.height * 0.018);
  drawContainedImage(
    context,
    logo,
    back.x + back.width * 0.07,
    back.y + back.height * 0.065,
    back.width * 0.5,
    back.height * 0.105,
  );

  context.fillStyle = palette.muted;
  context.textAlign = "right";
  context.textBaseline = "middle";
  context.font = `700 ${back.width * 0.027}px Inter, sans-serif`;
  context.fillText(
    "TEAM ID",
    back.x + back.width * 0.91,
    back.y + back.height * 0.117,
  );

  context.fillStyle = palette.panel;
  roundedRect(
    context,
    back.x + back.width * 0.07,
    back.y + back.height * 0.22,
    back.width * 0.86,
    back.height * 0.31,
    back.width * 0.035,
  );
  context.fill();
  context.strokeStyle = palette.line;
  context.lineWidth = back.width * 0.003;
  context.stroke();

  context.fillStyle = palette.accent;
  roundedRect(
    context,
    back.x + back.width * 0.11,
    back.y + back.height * 0.275,
    back.width * 0.25,
    back.width * 0.25,
    back.width * 0.045,
  );
  context.fill();
  context.fillStyle = palette.accentInk;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.font = `800 ${back.width * 0.095}px Manrope, sans-serif`;
  context.fillText(
    "V",
    back.x + back.width * 0.235,
    back.y + back.height * 0.275 + back.width * 0.125,
  );

  context.textAlign = "left";
  context.fillStyle = palette.muted;
  context.font = `700 ${back.width * 0.024}px Inter, sans-serif`;
  context.fillText(
    "CANDIDATE",
    back.x + back.width * 0.42,
    back.y + back.height * 0.3,
  );
  context.fillStyle = palette.ink;
  context.font = `800 ${back.width * 0.054}px Manrope, sans-serif`;
  context.fillText(
    "FUTURE",
    back.x + back.width * 0.42,
    back.y + back.height * 0.365,
  );
  context.fillText(
    "BUILDER",
    back.x + back.width * 0.42,
    back.y + back.height * 0.425,
  );
  context.fillStyle = palette.accent;
  context.beginPath();
  context.arc(
    back.x + back.width * 0.435,
    back.y + back.height * 0.485,
    back.width * 0.012,
    0,
    Math.PI * 2,
  );
  context.fill();
  context.fillStyle = palette.muted;
  context.font = `600 ${back.width * 0.022}px Inter, sans-serif`;
  context.fillText(
    "OPEN TO GREAT WORK",
    back.x + back.width * 0.46,
    back.y + back.height * 0.485,
  );

  const details = [
    ["PASS TYPE", "CAREERS"],
    ["ACCESS", "ALL IDEAS"],
    ["LOCATION", "REMOTE"],
  ];
  details.forEach(([label, value], index) => {
    const rowY = back.y + back.height * (0.61 + index * 0.095);
    context.fillStyle = palette.muted;
    context.font = `700 ${back.width * 0.022}px Inter, sans-serif`;
    context.textAlign = "left";
    context.fillText(label, back.x + back.width * 0.08, rowY);
    context.fillStyle = palette.ink;
    context.font = `700 ${back.width * 0.028}px Inter, sans-serif`;
    context.fillText(value, back.x + back.width * 0.34, rowY);
    context.strokeStyle = palette.line;
    context.lineWidth = back.width * 0.002;
    context.beginPath();
    context.moveTo(back.x + back.width * 0.08, rowY + back.height * 0.035);
    context.lineTo(back.x + back.width * 0.66, rowY + back.height * 0.035);
    context.stroke();
  });

  drawQrPattern(
    context,
    back.x + back.width * 0.72,
    back.y + back.height * 0.655,
    back.width * 0.2,
    palette.ink,
    palette.panel,
  );
  context.fillStyle = palette.muted;
  context.textAlign = "right";
  context.font = `600 ${back.width * 0.019}px Inter, sans-serif`;
  context.fillText(
    "VST-CAREERS-01",
    back.x + back.width * 0.92,
    back.y + back.height * 0.9,
  );
}

function Band({
  maxSpeed = 50,
  minSpeed = 0,
  isMobile = false,
  frontImage = null,
  backImage = null,
  imageFit = "cover",
  lanyardImage = null,
  lanyardWidth = 1,
  brandCard = false,
  brandTheme = "light",
}) {
  const band = useRef();
  const fixed = useRef();
  const j1 = useRef();
  const j2 = useRef();
  const j3 = useRef();
  const card = useRef();
  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();
  const segmentProps = {
    type: "dynamic",
    canSleep: true,
    colliders: false,
    angularDamping: 4,
    linearDamping: 4,
  };
  const { nodes, materials } = useGLTF(CARD_GLB);
  const texture = useTexture(lanyardImage || DEFAULT_LANYARD);
  const frontTex = useTexture(frontImage || BLANK_PIXEL);
  const backTex = useTexture(backImage || BLANK_PIXEL);

  const cardMap = useMemo(() => {
    const baseMap = materials.base.map;
    if (!brandCard && !frontImage && !backImage) return baseMap;

    const baseImg = baseMap.image;
    const width = baseImg.width;
    const height = baseImg.height;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    if (!context) return baseMap;
    context.drawImage(baseImg, 0, 0, width, height);

    const drawFitted = (image, rect) => {
      const rectX = rect.x * width;
      const rectY = rect.y * height;
      const rectWidth = rect.w * width;
      const rectHeight = rect.h * height;
      const pick = imageFit === "contain" ? Math.min : Math.max;
      const scale = pick(rectWidth / image.width, rectHeight / image.height);
      const drawWidth = image.width * scale;
      const drawHeight = image.height * scale;
      const drawX = rectX + (rectWidth - drawWidth) / 2;
      const drawY = rectY + (rectHeight - drawHeight) / 2;
      context.save();
      context.beginPath();
      context.rect(rectX, rectY, rectWidth, rectHeight);
      context.clip();
      context.drawImage(image, drawX, drawY, drawWidth, drawHeight);
      context.restore();
    };

    if (brandCard && frontTex.image) {
      drawVistrowCardFaces(
        context,
        width,
        height,
        frontTex.image,
        brandTheme,
      );
    } else {
      if (frontImage && frontTex.image) drawFitted(frontTex.image, FRONT_UV_RECT);
      if (backImage && backTex.image) drawFitted(backTex.image, BACK_UV_RECT);
    }

    const composite = new THREE.CanvasTexture(canvas);
    composite.colorSpace = THREE.SRGBColorSpace;
    composite.flipY = baseMap.flipY;
    composite.anisotropy = 16;
    composite.needsUpdate = true;
    return composite;
  }, [
    frontImage,
    backImage,
    imageFit,
    frontTex,
    backTex,
    materials.base.map,
    brandCard,
    brandTheme,
  ]);

  useEffect(() => {
    const baseMap = materials.base.map;
    return () => {
      if (cardMap !== baseMap) cardMap.dispose();
    };
  }, [cardMap, materials.base.map]);

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ]),
  );
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.5, 0]]);

  useEffect(() => {
    if (!hovered) return undefined;
    document.body.style.cursor = dragged ? "grabbing" : "grab";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }

    if (fixed.current) {
      [j1, j2].forEach((ref) => {
        if (!ref.current.lerped) {
          ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        }
        const clampedDistance = Math.max(
          0.1,
          Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())),
        );
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)),
        );
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = "chordal";
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? "kinematicPosition" : "dynamic"}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(event) => {
              event.target.releasePointerCapture(event.pointerId);
              drag(false);
            }}
            onPointerDown={(event) => {
              event.target.setPointerCapture(event.pointerId);
              drag(
                new THREE.Vector3()
                  .copy(event.point)
                  .sub(vec.copy(card.current.translation())),
              );
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={cardMap}
                map-anisotropy={16}
                clearcoat={isMobile ? 0 : 1}
                clearcoatRoughness={0.15}
                roughness={0.9}
                metalness={0.8}
              />
            </mesh>
            <mesh
              geometry={nodes.clip.geometry}
              material={materials.metal}
              material-roughness={0.3}
            />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={texture}
          repeat={[-4, 1]}
          lineWidth={lanyardWidth}
        />
      </mesh>
    </>
  );
}

useGLTF.preload(CARD_GLB);
