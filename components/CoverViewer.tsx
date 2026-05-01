'use client';

import { Canvas, useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import {
  Box3,
  DoubleSide,
  Group,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  Vector3,
} from 'three';
import { useEffect, useMemo, useRef } from 'react';

type DragState = { active: boolean; x: number; y: number };
type FrontDesign = 'plain' | 'bird' | 'floral' | 'pattern';

function cloneAndCenter(object: Object3D) {
  const cloned = object.clone(true);
  const box = new Box3().setFromObject(cloned);
  const center = new Vector3();
  box.getCenter(center);
  cloned.position.sub(center);
  return cloned;
}

function applyMaterial(object: Object3D, color: string) {
  object.traverse((child) => {
    if ((child as Mesh).isMesh) {
      (child as Mesh).material = new MeshStandardMaterial({
        color,
        roughness: 0.36,
        metalness: 0.04,
        side: DoubleSide,
      });
    }
  });
}

function Model({
  coverColor,
  longStrapColor,
  shortStrapColor,
  design,
}: {
  coverColor: string;
  longStrapColor: string;
  shortStrapColor: string;
  design: FrontDesign;
}) {
  const plainCoverObj = useLoader(OBJLoader, '/models/Coverproto.obj');
  const floralCoverObj = useLoader(OBJLoader, '/models/Coverproto-floral.obj');
  const longStrapObj = useLoader(OBJLoader, '/models/strap-long.obj');
  const shortStrapObj = useLoader(OBJLoader, '/models/strap-short.obj');

  const coverRotationGroup = useRef<Group>(null);
  const drag = useRef<DragState>({ active: false, x: 0, y: 0 });

  const cover = useMemo(() => {
    const source = design === 'floral' ? floralCoverObj : plainCoverObj;
    return cloneAndCenter(source);
  }, [plainCoverObj, floralCoverObj, design]);

  const longStrap = useMemo(() => cloneAndCenter(longStrapObj), [longStrapObj]);
  const shortStrap = useMemo(() => cloneAndCenter(shortStrapObj), [shortStrapObj]);

  useEffect(() => applyMaterial(cover, coverColor), [cover, coverColor]);
  useEffect(() => applyMaterial(longStrap, longStrapColor), [longStrap, longStrapColor]);
  useEffect(() => applyMaterial(shortStrap, shortStrapColor), [shortStrap, shortStrapColor]);

  return (
    <group rotation={[0, 0, 0]}>
      <group
        onPointerDown={(e) => {
          e.stopPropagation();
          drag.current = { active: true, x: e.clientX, y: e.clientY };
        }}
        onPointerMove={(e) => {
          if (!drag.current.active || !coverRotationGroup.current) return;
          e.stopPropagation();

          const dx = e.clientX - drag.current.x;
          const dy = e.clientY - drag.current.y;
          drag.current = { active: true, x: e.clientX, y: e.clientY };

          // Rotate the cover around its own centered pivot. The floral OBJ's
          // fixed upright correction is inside the child group, so dragging
          // will not knock it onto its back.
          coverRotationGroup.current.rotation.y += dx * 0.012;
          coverRotationGroup.current.rotation.x -= dy * 0.004;
          coverRotationGroup.current.rotation.x = Math.max(-0.48, Math.min(0.48, coverRotationGroup.current.rotation.x));
        }}
        onPointerUp={() => {
          drag.current.active = false;
        }}
        onPointerCancel={() => {
          drag.current.active = false;
        }}
        onPointerLeave={() => {
          drag.current.active = false;
        }}
      >
        <group ref={coverRotationGroup}>
          <group
            scale={design === 'floral' ? 26.9 : 0.255}
            rotation={design === 'floral' ? [-Math.PI / 2, 0, Math.PI / 2] : [0, 0, 0]}
          >
            <primitive object={cover} />
          </group>
        </group>
      </group>

      {/* Longer strap on the left side of the cover; fixed vertical */}
      <group position={[-3.25, 0, 0]} rotation={[0, 0, 0]} scale={14.9}>
        <primitive object={longStrap} />
      </group>

      {/* Shorter strap on the right side. Same thickness scale as long strap, shorter length. */}
      <group position={[3.25, 0, 0]} rotation={[0, 0, 0]} scale={14.9}>
        <primitive object={shortStrap} />
      </group>
    </group>
  );
}

export default function CoverViewer({
  color,
  design = 'plain',
  longStrapColor = '#111827',
  shortStrapColor = '#ffffff',
}: {
  color: string;
  design?: FrontDesign;
  longStrapColor?: string;
  shortStrapColor?: string;
}) {
  return (
    <div className="h-[680px] w-full touch-none overflow-hidden rounded-2xl bg-white shadow-soft">
      <Canvas camera={{ position: [0, 0.35, 28], fov: 24 }}>
        <ambientLight intensity={0.62} />
        <directionalLight position={[0, 12, 6]} intensity={2.1} />
        <directionalLight position={[4, 6, 8]} intensity={1.15} />
        <directionalLight position={[-5, 2, -4]} intensity={0.45} />
        <Model
          coverColor={color}
          design={design}
          longStrapColor={longStrapColor}
          shortStrapColor={shortStrapColor}
        />
      </Canvas>
    </div>
  );
}
