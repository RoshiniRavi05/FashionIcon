"use client";

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { parseProductFor3D, WornOutfit } from '../data/products';

interface StyleLab3DProps {
  gender: 'male' | 'female';
  wornOutfit: WornOutfit;
  runwayMode: boolean;
  viewMode360: boolean;
  zoomLevel: number;
  cameraPreset: 'front' | 'side' | 'back';
}

/* Fabric Canvas Texture Generator helper */
const createFabricTexture = () => {
  if (typeof window === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, 128, 128);
  for (let x = 0; x < 128; x += 2) {
    for (let y = 0; y < 128; y += 2) {
      const val = Math.random() * 20;
      ctx.fillStyle = "rgb(" + (128 + val) + "," + (128 + val) + ",255)";
      ctx.fillRect(x, y, 1, 1);
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(12, 12);
  return texture;
};

export const StyleLab3D: React.FC<StyleLab3DProps> = ({
  gender,
  wornOutfit,
  runwayMode,
  viewMode360,
  zoomLevel,
  cameraPreset
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const clothesRef = useRef<Record<string, THREE.Mesh[]> | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  
  // Mannequin Joint/Part Refs for GSAP morphs & animations
  const headGroupRef = useRef<THREE.Group | null>(null);
  const torsoGroupRef = useRef<THREE.Group | null>(null);
  const neckGroupRef = useRef<THREE.Group | null>(null);
  const leftShoulderGroupRef = useRef<THREE.Group | null>(null);
  const rightShoulderGroupRef = useRef<THREE.Group | null>(null);
  const leftArmGroupRef = useRef<THREE.Group | null>(null);
  const rightArmGroupRef = useRef<THREE.Group | null>(null);
  const hipsGroupRef = useRef<THREE.Group | null>(null);
  const leftLegGroupRef = useRef<THREE.Group | null>(null);
  const rightLegGroupRef = useRef<THREE.Group | null>(null);
  const mannequinGroupRef = useRef<THREE.Group | null>(null);
  
  const runwayGroupRef = useRef<THREE.Group | null>(null);
  const gridHelperRef = useRef<THREE.GridHelper | null>(null);

  // Compute active clothing types and colors from wornOutfit prop
  const parsedTop = parseProductFor3D(wornOutfit.top);
  const parsedBottom = parseProductFor3D(wornOutfit.bottom);
  const parsedOuter = parseProductFor3D(wornOutfit.outer);
  const parsedShoes = parseProductFor3D(wornOutfit.shoes);

  const activeTop = parsedTop ? parsedTop.type : 'none';
  const topColor = parsedTop ? parsedTop.color : 'black';
  const activeBottom = parsedBottom ? parsedBottom.type : 'none';
  const bottomColor = parsedBottom ? parsedBottom.color : 'black';
  const activeOuter = parsedOuter ? parsedOuter.type : 'none';
  const outerColor = parsedOuter ? parsedOuter.color : 'black';
  const activeShoes = parsedShoes ? parsedShoes.type : 'none';

  // Setup Three.js scene
  useEffect(() => {
    if (!canvasRef.current) return;

    // Create scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0.8, 3.8);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(3, 5, 4);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.bias = -0.0005;
    scene.add(dirLight);

    // Standard Grid helper (visible in default mode)
    const gridHelper = new THREE.GridHelper(4, 24, 0x333333, 0x111111);
    gridHelper.position.y = -0.7;
    scene.add(gridHelper);
    gridHelperRef.current = gridHelper;

    // Shadow receiver plane
    const shadowPlaneGeo = new THREE.PlaneGeometry(10, 10);
    const shadowPlaneMat = new THREE.ShadowMaterial({ opacity: 0.35 });
    const shadowPlane = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -0.7;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    // Runway catwalk structure (visible in Runway Mode)
    const runwayGroup = new THREE.Group();
    runwayGroup.visible = false;
    scene.add(runwayGroup);
    runwayGroupRef.current = runwayGroup;

    // Catwalk floor
    const catwalkGeo = new THREE.PlaneGeometry(1.4, 8);
    const catwalkMat = new THREE.MeshStandardMaterial({
      color: 0x0c0c0e,
      roughness: 0.18,
      metalness: 0.8
    });
    const catwalk = new THREE.Mesh(catwalkGeo, catwalkMat);
    catwalk.rotation.x = -Math.PI / 2;
    catwalk.position.y = -0.69;
    catwalk.receiveShadow = true;
    runwayGroup.add(catwalk);

    // Glowing border lines on catwalk sides
    const borderGeo = new THREE.BoxGeometry(0.02, 0.01, 8);
    const borderMat = new THREE.MeshBasicMaterial({ color: 0xc10e1d }); // Brand Red glow
    
    const borderL = new THREE.Mesh(borderGeo, borderMat);
    borderL.position.set(-0.7, -0.685, 0);
    runwayGroup.add(borderL);

    const borderR = borderL.clone();
    borderR.position.x = 0.7;
    runwayGroup.add(borderR);

    // --- MANNEQUIN RIGGED AVATAR STRUCTURE ---
    const mannequinGroup = new THREE.Group();
    mannequinGroup.position.y = -0.5;
    scene.add(mannequinGroup);
    mannequinGroupRef.current = mannequinGroup;

    // Physical skin material (premium physical bone matte finish)
    const skinMat = new THREE.MeshPhysicalMaterial({
      color: 0xf5f5f7,
      roughness: 0.5,
      metalness: 0.05,
      clearcoat: 0.15,
      clearcoatRoughness: 0.4
    });

    const goldJointMat = new THREE.MeshStandardMaterial({
      color: 0xc10e1d, // Accent Brand Red joint detailing
      metalness: 0.95,
      roughness: 0.12
    });

    // Create skeleton pivot groups
    const headGroup = new THREE.Group(); headGroup.position.y = 1.35;
    const neckGroup = new THREE.Group(); neckGroup.position.y = 1.18;
    const torsoGroup = new THREE.Group(); torsoGroup.position.y = 0.85;
    const hipsGroup = new THREE.Group(); hipsGroup.position.y = 0.52;
    const leftShoulderGroup = new THREE.Group(); leftShoulderGroup.position.set(-0.25, 1.05, 0);
    const rightShoulderGroup = new THREE.Group(); rightShoulderGroup.position.set(0.25, 1.05, 0);
    const leftArmGroup = new THREE.Group(); leftArmGroup.position.set(-0.27, 0.82, 0);
    const rightArmGroup = new THREE.Group(); rightArmGroup.position.set(0.27, 0.82, 0);
    const leftLegGroup = new THREE.Group(); leftLegGroup.position.set(-0.1, 0.24, 0);
    const rightLegGroup = new THREE.Group(); rightLegGroup.position.set(0.1, 0.24, 0);

    mannequinGroup.add(headGroup);
    mannequinGroup.add(neckGroup);
    mannequinGroup.add(torsoGroup);
    mannequinGroup.add(hipsGroup);
    mannequinGroup.add(leftShoulderGroup);
    mannequinGroup.add(rightShoulderGroup);
    mannequinGroup.add(leftArmGroup);
    mannequinGroup.add(rightArmGroup);
    mannequinGroup.add(leftLegGroup);
    mannequinGroup.add(rightLegGroup);

    headGroupRef.current = headGroup;
    neckGroupRef.current = neckGroup;
    torsoGroupRef.current = torsoGroup;
    hipsGroupRef.current = hipsGroup;
    leftShoulderGroupRef.current = leftShoulderGroup;
    rightShoulderGroupRef.current = rightShoulderGroup;
    leftArmGroupRef.current = leftArmGroup;
    rightArmGroupRef.current = rightArmGroup;
    leftLegGroupRef.current = leftLegGroup;
    rightLegGroupRef.current = rightLegGroup;

    // Rig body meshes to pivot groups
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.18, 32, 32), skinMat);
    head.scale.set(1, 1.25, 1.1);
    head.castShadow = true;
    headGroup.add(head);

    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.08, 0.12, 16), skinMat);
    neck.castShadow = true;
    neckGroup.add(neck);

    const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.15, 0.55, 16), skinMat);
    torso.castShadow = true;
    torsoGroup.add(torso);

    const goldJointL = new THREE.Mesh(new THREE.SphereGeometry(0.065, 16, 16), goldJointMat);
    goldJointL.position.set(-0.25, 1.05, 0);
    mannequinGroup.add(goldJointL);

    const goldJointR = goldJointL.clone();
    goldJointR.position.x = 0.25;
    mannequinGroup.add(goldJointR);

    // Left Arm
    const leftArmMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.045, 0.42, 16), skinMat);
    leftArmMesh.position.y = -0.21;
    leftArmMesh.castShadow = true;
    leftArmGroup.add(leftArmMesh);

    // Right Arm
    const rightArmMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.045, 0.42, 16), skinMat);
    rightArmMesh.position.y = -0.21;
    rightArmMesh.castShadow = true;
    rightArmGroup.add(rightArmMesh);

    // Hips
    const hips = new THREE.Mesh(new THREE.SphereGeometry(0.17, 16, 16), skinMat);
    hips.castShadow = true;
    hipsGroup.add(hips);

    // Left Leg
    const leftLegMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.06, 0.52, 16), skinMat);
    leftLegMesh.position.y = -0.26;
    leftLegMesh.castShadow = true;
    leftLegGroup.add(leftLegMesh);

    // Right Leg
    const rightLegMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.06, 0.52, 16), skinMat);
    rightLegMesh.position.y = -0.26;
    rightLegMesh.castShadow = true;
    rightLegGroup.add(rightLegMesh);

    // --- PROCEDURAL CLOTHING PLACEMENT ---
    const fabricTex = createFabricTexture();
    
    // Materials
    const topMat = new THREE.MeshStandardMaterial({ roughness: 0.9, normalMap: fabricTex || null, normalScale: new THREE.Vector2(0.07, 0.07), side: THREE.DoubleSide });
    const shirtMat = new THREE.MeshPhysicalMaterial({ roughness: 0.65, clearcoat: 0.1, side: THREE.DoubleSide });
    const jacketMat = new THREE.MeshStandardMaterial({ roughness: 0.45, metalness: 0.15, side: THREE.DoubleSide });
    const bottomMat = new THREE.MeshStandardMaterial({ roughness: 0.95, normalMap: fabricTex || null, normalScale: new THREE.Vector2(0.08, 0.08), side: THREE.DoubleSide });
    const shoeMat = new THREE.MeshStandardMaterial({ color: 0xf0f0f0, roughness: 0.5 });
    const bootMat = new THREE.MeshPhysicalMaterial({ color: 0x111111, roughness: 0.35, clearcoat: 0.2 });

    const clothes: Record<string, THREE.Mesh[]> = {
      tshirt: [],
      oversizedTee: [],
      shirt: [],
      hoodie: [],
      jacket: [],
      cargoPants: [],
      jeans: [],
      trousers: [],
      sneakers: [],
      boots: []
    };

    // 1. T-shirt meshes
    const teeBody = new THREE.Mesh(new THREE.CylinderGeometry(0.205, 0.185, 0.44, 24), topMat);
    teeBody.castShadow = true;
    torsoGroup.add(teeBody);
    clothes.tshirt.push(teeBody);

    const teeSleeveL = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.06, 0.14, 16), topMat);
    teeSleeveL.position.y = -0.06;
    teeSleeveL.rotation.z = Math.PI / 12;
    leftArmGroup.add(teeSleeveL);
    clothes.tshirt.push(teeSleeveL);

    const teeSleeveR = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.06, 0.14, 16), topMat);
    teeSleeveR.position.y = -0.06;
    teeSleeveR.rotation.z = -Math.PI / 12;
    rightArmGroup.add(teeSleeveR);
    clothes.tshirt.push(teeSleeveR);

    // 2. Oversized Tee meshes
    const oTeeBody = new THREE.Mesh(new THREE.CylinderGeometry(0.23, 0.22, 0.49, 24), topMat);
    oTeeBody.castShadow = true;
    torsoGroup.add(oTeeBody);
    clothes.oversizedTee.push(oTeeBody);

    const oTeeSleeveL = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.07, 0.22, 16), topMat);
    oTeeSleeveL.position.y = -0.09;
    oTeeSleeveL.rotation.z = Math.PI / 8;
    leftArmGroup.add(oTeeSleeveL);
    clothes.oversizedTee.push(oTeeSleeveL);

    const oTeeSleeveR = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.07, 0.22, 16), topMat);
    oTeeSleeveR.position.y = -0.09;
    oTeeSleeveR.rotation.z = -Math.PI / 8;
    rightArmGroup.add(oTeeSleeveR);
    clothes.oversizedTee.push(oTeeSleeveR);

    // 3. Shirt meshes
    const shirtBody = new THREE.Mesh(new THREE.CylinderGeometry(0.205, 0.17, 0.45, 24), shirtMat);
    shirtBody.castShadow = true;
    torsoGroup.add(shirtBody);
    clothes.shirt.push(shirtBody);

    const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.10, 0.05, 16), shirtMat);
    collar.position.y = 0.28;
    torsoGroup.add(collar);
    clothes.shirt.push(collar);

    const shirtSleeveL = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.05, 0.40, 16), shirtMat);
    shirtSleeveL.position.y = -0.16;
    leftArmGroup.add(shirtSleeveL);
    clothes.shirt.push(shirtSleeveL);

    const shirtSleeveR = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.05, 0.40, 16), shirtMat);
    shirtSleeveR.position.y = -0.16;
    rightArmGroup.add(shirtSleeveR);
    clothes.shirt.push(shirtSleeveR);

    // 4. Hoodie meshes
    const hoodBody = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.21, 0.50, 24), topMat);
    hoodBody.castShadow = true;
    torsoGroup.add(hoodBody);
    clothes.hoodie.push(hoodBody);

    const hoodSleeveL = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.065, 0.40, 16), topMat);
    hoodSleeveL.position.y = -0.16;
    leftArmGroup.add(hoodSleeveL);
    clothes.hoodie.push(hoodSleeveL);

    const hoodSleeveR = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.065, 0.40, 16), topMat);
    hoodSleeveR.position.y = -0.16;
    rightArmGroup.add(hoodSleeveR);
    clothes.hoodie.push(hoodSleeveR);

    const hoodBack = new THREE.Mesh(new THREE.SphereGeometry(0.14, 16, 16), topMat);
    hoodBack.position.set(0, 0.35, -0.06);
    torsoGroup.add(hoodBack);
    clothes.hoodie.push(hoodBack);

    const hoodPocket = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.12, 0.05), topMat);
    hoodPocket.position.set(0, -0.12, 0.16);
    torsoGroup.add(hoodPocket);
    clothes.hoodie.push(hoodPocket);

    // 5. Jacket meshes
    const jackBody = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.22, 0.50, 24, 1, true, 0, Math.PI * 1.6), jacketMat);
    jackBody.rotation.y = -Math.PI * 0.8;
    jackBody.castShadow = true;
    torsoGroup.add(jackBody);
    clothes.jacket.push(jackBody);

    const jackSleeveL = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.06, 0.42, 16), jacketMat);
    jackSleeveL.position.y = -0.16;
    leftArmGroup.add(jackSleeveL);
    clothes.jacket.push(jackSleeveL);

    const jackSleeveR = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.06, 0.42, 16), jacketMat);
    jackSleeveR.position.y = -0.16;
    rightArmGroup.add(jackSleeveR);
    clothes.jacket.push(jackSleeveR);

    // 6. Cargo Pants meshes
    const cargoWaist = new THREE.Mesh(new THREE.CylinderGeometry(0.185, 0.175, 0.12, 24), bottomMat);
    cargoWaist.position.y = 0;
    hipsGroup.add(cargoWaist);
    clothes.cargoPants.push(cargoWaist);

    const cargoLegL = new THREE.Mesh(new THREE.CylinderGeometry(0.095, 0.078, 0.52, 16), bottomMat);
    cargoLegL.position.y = -0.24;
    cargoLegL.castShadow = true;
    leftLegGroup.add(cargoLegL);
    clothes.cargoPants.push(cargoLegL);

    const cargoLegR = new THREE.Mesh(new THREE.CylinderGeometry(0.095, 0.078, 0.52, 16), bottomMat);
    cargoLegR.position.y = -0.24;
    cargoLegR.castShadow = true;
    rightLegGroup.add(cargoLegR);
    clothes.cargoPants.push(cargoLegR);

    const cargoPocketL = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.08, 0.03), bottomMat);
    cargoPocketL.position.set(-0.09, -0.2, 0);
    leftLegGroup.add(cargoPocketL);
    clothes.cargoPants.push(cargoPocketL);

    const cargoPocketR = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.08, 0.03), bottomMat);
    cargoPocketR.position.set(0.09, -0.2, 0);
    rightLegGroup.add(cargoPocketR);
    clothes.cargoPants.push(cargoPocketR);

    // 7. Jeans meshes
    const jeansWaist = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.17, 0.12, 24), bottomMat);
    hipsGroup.add(jeansWaist);
    clothes.jeans.push(jeansWaist);

    const jeansLegL = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.07, 0.52, 16), bottomMat);
    jeansLegL.position.y = -0.24;
    jeansLegL.castShadow = true;
    leftLegGroup.add(jeansLegL);
    clothes.jeans.push(jeansLegL);

    const jeansLegR = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.07, 0.52, 16), bottomMat);
    jeansLegR.position.y = -0.24;
    jeansLegR.castShadow = true;
    rightLegGroup.add(jeansLegR);
    clothes.jeans.push(jeansLegR);

    // 8. Trousers meshes
    const trouserWaist = new THREE.Mesh(new THREE.CylinderGeometry(0.175, 0.165, 0.12, 24), bottomMat);
    hipsGroup.add(trouserWaist);
    clothes.trousers.push(trouserWaist);

    const trouserLegL = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.065, 0.52, 16), bottomMat);
    trouserLegL.position.y = -0.24;
    trouserLegL.castShadow = true;
    leftLegGroup.add(trouserLegL);
    clothes.trousers.push(trouserLegL);

    const trouserLegR = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.065, 0.52, 16), bottomMat);
    trouserLegR.position.y = -0.24;
    trouserLegR.castShadow = true;
    rightLegGroup.add(trouserLegR);
    clothes.trousers.push(trouserLegR);

    // 9. Sneakers meshes
    const sneakerL = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.07, 0.20), shoeMat);
    sneakerL.position.set(0, -0.52, 0.04);
    leftLegGroup.add(sneakerL);
    clothes.sneakers.push(sneakerL);

    const sneakerR = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.07, 0.20), shoeMat);
    sneakerR.position.set(0, -0.52, 0.04);
    rightLegGroup.add(sneakerR);
    clothes.sneakers.push(sneakerR);

    const soleL = new THREE.Mesh(new THREE.BoxGeometry(0.115, 0.02, 0.215), new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 }));
    soleL.position.set(0, -0.56, 0.04);
    leftLegGroup.add(soleL);
    clothes.sneakers.push(soleL);

    const soleR = soleL.clone();
    soleR.position.set(0, -0.56, 0.04);
    rightLegGroup.add(soleR);
    clothes.sneakers.push(soleR);

    // 10. Boots meshes
    const bootL = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.08, 0.21), bootMat);
    bootL.position.set(0, -0.52, 0.04);
    leftLegGroup.add(bootL);
    clothes.boots.push(bootL);

    const bootR = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.08, 0.21), bootMat);
    bootR.position.set(0, -0.52, 0.04);
    rightLegGroup.add(bootR);
    clothes.boots.push(bootR);

    const cuffL = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.065, 0.10, 16), bootMat);
    cuffL.position.y = -0.44;
    leftLegGroup.add(cuffL);
    clothes.boots.push(cuffL);

    const cuffR = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.065, 0.10, 16), bootMat);
    cuffR.position.y = -0.44;
    rightLegGroup.add(cuffR);
    clothes.boots.push(cuffR);

    clothesRef.current = clothes;

    // Drag-to-rotate interaction listeners
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleCanvasMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleCanvasMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaMove = {
        x: e.clientX - previousMousePosition.x,
        y: e.clientY - previousMousePosition.y
      };
      mannequinGroup.rotation.y += deltaMove.x * 0.007;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleCanvasMouseUp = () => {
      isDragging = false;
    };

    // Mobile touch interaction listeners
    let isTouchDragging = false;
    let previousTouchPosition = { x: 0, y: 0 };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isTouchDragging = true;
        previousTouchPosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isTouchDragging || e.touches.length !== 1) return;
      const deltaMove = {
        x: e.touches[0].clientX - previousTouchPosition.x,
        y: e.touches[0].clientY - previousTouchPosition.y
      };
      mannequinGroup.rotation.y += deltaMove.x * 0.009;
      previousTouchPosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = () => {
      isTouchDragging = false;
    };

    // Scroll wheel zoom listener
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomSpeed = 0.003;
      camera.position.z += e.deltaY * zoomSpeed;
      camera.position.z = Math.max(2.2, Math.min(6.0, camera.position.z));
    };

    const canvas = canvasRef.current;
    canvas.addEventListener('mousedown', handleCanvasMouseDown);
    window.addEventListener('mousemove', handleCanvasMouseMove);
    window.addEventListener('mouseup', handleCanvasMouseUp);
    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('touchend', handleTouchEnd);
    canvas.addEventListener('wheel', handleWheel, { passive: false });

    // Resize handler
    const handleResize = () => {
      if (!canvasRef.current) return;
      const width = canvasRef.current.clientWidth;
      const height = canvasRef.current.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Subtle breathing motion for model (torso raises/lowers on Y, chest expands)
      if (!runwayMode) {
        const breathe = Math.sin(time * 2.2);
        torso.scale.set(1.0 + breathe * 0.008, 1.0 + breathe * 0.005, 1.0 + breathe * 0.008);
        
        // Reset walks back to standing pose
        mannequinGroup.position.y = -0.5;
        
        // Asymmetric idle swaying
        if (!isDragging && !isTouchDragging && !viewMode360) {
          mannequinGroup.rotation.y = Math.sin(time * 0.4) * 0.12;
        }
      } else {
        // WALKING RUNWAY PRESENTATION ANIMATION LOOP
        const walkSpeed = 5.2;
        const stride = 0.28; // stride swing amplitude
        
        // Catwalk walking gait leg swings
        leftLegGroup.rotation.x = Math.sin(time * walkSpeed) * stride;
        rightLegGroup.rotation.x = -Math.sin(time * walkSpeed) * stride;
        
        // Natural arm counter-balance swings
        leftArmGroup.rotation.x = -Math.sin(time * walkSpeed) * stride * 1.1;
        rightArmGroup.rotation.x = Math.sin(time * walkSpeed) * stride * 1.1;
        
        // Catwalk model hip swaying
        if (gender === 'female') {
          hipsGroup.rotation.y = Math.sin(time * walkSpeed) * 0.16;
          hipsGroup.rotation.z = Math.cos(time * walkSpeed) * 0.08;
        } else {
          hipsGroup.rotation.y = Math.sin(time * walkSpeed) * 0.05;
          hipsGroup.rotation.z = 0;
        }

        // Torso bobs up/down during walks
        mannequinGroup.position.y = -0.5 + Math.abs(Math.sin(time * walkSpeed * 2)) * 0.025;
      }

      // Auto rotation in 360 View Mode
      if (viewMode360 && !isDragging && !isTouchDragging && !runwayMode) {
        mannequinGroup.rotation.y += 0.005;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousedown', handleCanvasMouseDown);
      window.removeEventListener('mousemove', handleCanvasMouseMove);
      window.removeEventListener('mouseup', handleCanvasMouseUp);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
      canvas.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [runwayMode, viewMode360, gender]);

  // Update active visibility & color palettes on selection changes
  useEffect(() => {
    if (!clothesRef.current) return;

    const clothes = clothesRef.current;

    // Toggle clothing categories visibility based on active selections
    Object.keys(clothes).forEach(cat => {
      const isVisible = 
        (cat === 'tshirt' && activeTop === 'tshirt') ||
        (cat === 'oversizedTee' && activeTop === 'oversizedTee') ||
        (cat === 'shirt' && activeTop === 'shirt') ||
        (cat === 'hoodie' && activeTop === 'hoodie') ||
        (cat === 'jacket' && activeOuter === 'jacket') ||
        (cat === 'cargoPants' && activeBottom === 'cargoPants') ||
        (cat === 'jeans' && activeBottom === 'jeans') ||
        (cat === 'trousers' && activeBottom === 'trousers') ||
        (cat === 'sneakers' && activeShoes === 'sneakers') ||
        (cat === 'boots' && activeShoes === 'boots');

      clothes[cat].forEach(mesh => {
        mesh.visible = isVisible;
      });
    });

    // Define color mappings for swatches
    const swatches: Record<string, number> = {
      black: 0x0a0a0a,
      beige: 0xc5a880,
      sage: 0x82937e,
      cream: 0xf5f5f7,
      navy: 0x1a2f52,
      washedGray: 0x444444,
      lavender: 0xa89fba
    };

    const topCol = swatches[topColor] || 0xffffff;
    const outerCol = swatches[outerColor] || 0xffffff;
    const bottomCol = swatches[bottomColor] || 0xffffff;

    // Apply color values to active clothing meshes
    clothes.tshirt.forEach(mesh => {
      if (mesh.material && 'color' in mesh.material) (mesh.material as any).color.setHex(topCol);
    });
    clothes.oversizedTee.forEach(mesh => {
      if (mesh.material && 'color' in mesh.material) (mesh.material as any).color.setHex(topCol);
    });
    clothes.shirt.forEach(mesh => {
      if (mesh.material && 'color' in mesh.material) (mesh.material as any).color.setHex(topCol);
    });
    clothes.hoodie.forEach(mesh => {
      if (mesh.material && 'color' in mesh.material) (mesh.material as any).color.setHex(topCol);
    });
    clothes.jacket.forEach(mesh => {
      if (mesh.material && 'color' in mesh.material) (mesh.material as any).color.setHex(outerCol);
    });
    clothes.cargoPants.forEach(mesh => {
      if (mesh.material && 'color' in mesh.material) (mesh.material as any).color.setHex(bottomCol);
    });
    clothes.jeans.forEach(mesh => {
      if (mesh.material && 'color' in mesh.material) (mesh.material as any).color.setHex(bottomCol);
    });
    clothes.trousers.forEach(mesh => {
      if (mesh.material && 'color' in mesh.material) (mesh.material as any).color.setHex(bottomCol);
    });

  }, [activeTop, activeBottom, activeOuter, activeShoes, topColor, bottomColor, outerColor]);

  // Gender Proportions & Posture morph animations
  useEffect(() => {
    if (!mannequinGroupRef.current) return;

    const head = headGroupRef.current;
    const neck = neckGroupRef.current;
    const torso = torsoGroupRef.current;
    const hips = hipsGroupRef.current;
    const leftShoulder = leftShoulderGroupRef.current;
    const rightShoulder = rightShoulderGroupRef.current;
    const leftArm = leftArmGroupRef.current;
    const rightArm = rightArmGroupRef.current;
    const leftLeg = leftLegGroupRef.current;
    const rightLeg = rightLegGroupRef.current;

    if (!head || !neck || !torso || !hips || !leftShoulder || !rightShoulder || !leftArm || !rightArm || !leftLeg || !rightLeg) return;

    const duration = 0.8;
    const ease = "power2.inOut";

    if (gender === 'female') {
      // Proportions: narrower shoulders, wider hips, curved back, elegant posture
      gsap.to(head.scale, { x: 0.85, y: 1.1, z: 0.9, duration, ease });
      gsap.to(torso.scale, { x: 0.82, y: 0.92, z: 0.8, duration, ease });
      gsap.to(leftShoulder.position, { x: -0.21, y: 0.98, duration, ease });
      gsap.to(rightShoulder.position, { x: 0.21, y: 0.98, duration, ease });
      gsap.to(leftArm.position, { x: -0.23, y: 0.78, duration, ease });
      gsap.to(rightArm.position, { x: 0.23, y: 0.78, duration, ease });
      gsap.to(hips.scale, { x: 1.10, y: 0.94, z: 1.12, duration, ease });
      gsap.to(leftLeg.position, { x: -0.09, duration, ease });
      gsap.to(rightLeg.position, { x: 0.09, duration, ease });

      // Joints rotation mapping
      gsap.to(torso.rotation, { x: 0.02, y: 0.06, z: -0.04, duration, ease });
      gsap.to(hips.rotation, { x: 0.0, y: -0.02, z: 0.06, duration, ease });
      gsap.to(leftLeg.rotation, { x: 0.12, y: 0.04, z: 0.03, duration, ease });
      gsap.to(rightLeg.rotation, { x: -0.04, y: -0.02, z: -0.02, duration, ease });
      gsap.to(leftArm.rotation, { x: -0.12, y: 0.08, z: -0.15, duration, ease });
      gsap.to(rightArm.rotation, { x: 0.08, y: -0.04, z: 0.12, duration, ease });
    } else {
      // Proportions: broader athletic shoulders, larger chest/waist ratio
      gsap.to(head.scale, { x: 1.0, y: 1.25, z: 1.1, duration, ease });
      gsap.to(torso.scale, { x: 1.1, y: 1.0, z: 1.0, duration, ease });
      gsap.to(leftShoulder.position, { x: -0.25, y: 1.05, duration, ease });
      gsap.to(rightShoulder.position, { x: 0.25, y: 1.05, duration, ease });
      gsap.to(leftArm.position, { x: -0.27, y: 0.82, duration, ease });
      gsap.to(rightArm.position, { x: 0.27, y: 0.82, duration, ease });
      gsap.to(hips.scale, { x: 1.0, y: 1.0, z: 1.0, duration, ease });
      gsap.to(leftLeg.position, { x: -0.1, duration, ease });
      gsap.to(rightLeg.position, { x: 0.1, duration, ease });

      // Standard athletic stance rotations
      gsap.to(torso.rotation, { x: 0, y: 0, z: 0, duration, ease });
      gsap.to(hips.rotation, { x: 0, y: 0, z: 0, duration, ease });
      gsap.to(leftLeg.rotation, { x: 0, y: 0, z: 0, duration, ease });
      gsap.to(rightLeg.rotation, { x: 0, y: 0, z: 0, duration, ease });
      gsap.to(leftArm.rotation, { x: 0, y: 0, z: 0, duration, ease });
      gsap.to(rightArm.rotation, { x: 0, y: 0, z: 0, duration, ease });
    }

    // Camera switch animation (slow pan orbit)
    if (cameraRef.current) {
      gsap.fromTo(cameraRef.current.position, 
        { x: gender === 'female' ? -0.45 : 0.45, y: 0.95, z: 3.1 },
        { x: 0, y: 0.8, z: 3.8 * zoomLevel, duration: 1.1, ease: "power3.out" }
      );
    }
  }, [gender]);

  // Adjust zoom levels
  useEffect(() => {
    if (!cameraRef.current) return;
    const baseZ = runwayMode ? 4.8 : 3.8;
    const baseY = runwayMode ? 0.9 : 0.8;
    
    gsap.to(cameraRef.current.position, {
      z: baseZ * zoomLevel,
      y: baseY * (2 - zoomLevel),
      duration: 0.5,
      ease: "power2.out"
    });
  }, [zoomLevel, runwayMode]);

  // Handle camera presets
  useEffect(() => {
    if (!mannequinGroupRef.current) return;
    if (runwayMode) return;
    
    let targetY = 0;
    if (cameraPreset === 'side') {
      targetY = Math.PI / 2;
    } else if (cameraPreset === 'back') {
      targetY = Math.PI;
    } else if (cameraPreset === 'front') {
      targetY = 0;
    }
    
    gsap.to(mannequinGroupRef.current.rotation, {
      y: targetY,
      duration: 0.9,
      ease: "power2.inOut"
    });
  }, [cameraPreset, runwayMode]);

  // Toggle runway platform visibility
  useEffect(() => {
    if (runwayGroupRef.current) runwayGroupRef.current.visible = runwayMode;
    if (gridHelperRef.current) gridHelperRef.current.visible = !runwayMode;
  }, [runwayMode]);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full min-h-[500px] outline-none touch-none" 
    />
  );
};
