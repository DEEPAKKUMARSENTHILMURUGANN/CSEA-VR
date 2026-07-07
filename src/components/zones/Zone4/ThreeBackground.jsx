import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

/**
 * ThreeBackground — single faded torus knot, purely decorative.
 * ONE shape. Very low opacity. Stays completely out of the way.
 */
const ThreeBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    /* ── Scene / Camera ── */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000,
    );
    camera.position.z = 140;

    /* ── Single Torus Knot (3,5) with sparse edge lines ── */
    const geo = new THREE.TorusKnotGeometry(50, 14, 80, 8, 3, 5);
    const edges = new THREE.EdgesGeometry(geo);
    geo.dispose();

    const knot = new THREE.LineSegments(
      edges,
      new THREE.LineBasicMaterial({
        color: 0x5ef1df,
        transparent: true,
        opacity: 0.05,
        depthWrite: false,
      }),
    );
    scene.add(knot);

    /* ── Resize ── */
    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', onResize);

    /* ── Animate ── */
    let raf;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = performance.now() * 0.001;
      knot.rotation.x = t * 0.05;
      knot.rotation.y = t * 0.08;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      edges.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    />
  );
};

export default ThreeBackground;
