import React, { useRef, Suspense, useState, useMemo } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import * as THREE from 'three'
import { OBJLoader, MTLLoader } from 'three-stdlib'
import { resolveAssetPath } from '../utils/paths'

const LogoModel = () => {
    const groupRef = useRef()

    // Load materials and then object
    const materials = useLoader(MTLLoader, resolveAssetPath('/assets/3d/pcdLogo.mtl'))
    const obj = useLoader(OBJLoader, resolveAssetPath('/assets/3d/pcdLogo.obj'), (loader) => {
        materials.preload()
        loader.setMaterials(materials)
    })

    // Center and Scale the model once it's loaded
    useMemo(() => {
        if (obj) {
            const box = new THREE.Box3().setFromObject(obj);
            const size = box.getSize(new THREE.Vector3());
            const center = box.getCenter(new THREE.Vector3());

            // Center geometry
            obj.position.x = -center.x;
            obj.position.y = -center.y;
            obj.position.z = -center.z;

            // Autoscale
            const maxDim = Math.max(size.x, size.y, size.z);
            const targetSize = 2.5;
            const scaleFactor = targetSize / (maxDim || 1);
            obj.scale.set(scaleFactor, scaleFactor, scaleFactor);
        }
    }, [obj]);

    useFrame((state) => {
        if (groupRef.current) {
            const { x, y } = state.mouse;

            // Calculate proximity to center (the logo is centered)
            // state.mouse goes from -1 to 1 across the viewport
            const dist = Math.hypot(x, y);
            const isHovered = dist < 0.6;

            // Sinking Effect (Vertical weight)
            const targetZ = isHovered ? -0.8 : 0; // Moves "away" into the screen

            // Weighted Tilt
            // We tilt towards the mouse to simulate "sinking" under its weight
            const targetRotX = (Math.PI / 2) + (isHovered ? -y * 0.5 : 0);
            const targetRotY = isHovered ? x * 0.5 : 0;

            // Smooth interpolation for "weighted" feel
            groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.04);
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.04);
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.04);
        }
    });

    return (
        <group ref={groupRef}>
            <primitive object={obj} />
        </group>
    );
};

const LogoBackdrop = () => {
    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
            pointerEvents: 'none', // Wrapper allows click-through to content
            opacity: 0.5
        }}>
            <Canvas
                style={{ pointerEvents: 'auto' }} // Canvas itself handles internal raycasting
                camera={{ position: [0, 0, 6], fov: 45 }}
            >
                <ambientLight intensity={0.6} />
                <pointLight position={[10, 10, 10]} intensity={1.5} />
                <directionalLight position={[-10, 10, 5]} intensity={0.8} />
                <Suspense fallback={null}>
                    <LogoModel />
                    <Environment preset="city" />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default LogoBackdrop
