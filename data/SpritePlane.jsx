"use client";

import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import * as PIXI from "pixi.js";

export function AdvancedPixiSpritePlane({
  width = 2,
  height = 2,
  spriteUrl = "/placeholder.svg?height=256&width=256",
  backgroundColor = 0x000000,
  backgroundAlpha = 0,
  effects = true,
}) {


  const meshRef = useRef < THREE.Mesh > null;
  const textureRef = (useRef < THREE.Texture) | (null > null);
  const pixiAppRef = (useRef < PIXI.Application) | (null > null);
  const pixiSpriteRef = (useRef < PIXI.Sprite) | (null > null);
  const canvasRef = (useRef < HTMLCanvasElement) | (null > null);
  const [isPixiReady, setIsPixiReady] = useState(false);

  // Initialize PIXI.js
  useEffect(() => {
    // Create a canvas element for PIXI
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    canvasRef.current = canvas;

    // Initialize PIXI application
    const pixiApp = new PIXI.Application({
      width: 512,
      height: 512,
      backgroundColor,
      backgroundAlpha,
      view: canvas,
      antialias: true,
    });
    pixiAppRef.current = pixiApp;

    // Load sprite texture
    PIXI.Assets.load(spriteUrl)
      .then((texture) => {
        if (!pixiApp.stage) {
          console.error("PIXI stage is not available");
          return;
        }

        // Create sprite
        const sprite = new PIXI.Sprite(texture);
        sprite.anchor.set(0.5);
        sprite.x = 256; // Half of canvas width
        sprite.y = 256; // Half of canvas height
        sprite.width = 256;
        sprite.height = 256;

        // Add filters if effects are enabled
        if (effects) {
          // Add a glow filter
          const glowFilter = new PIXI.BlurFilter(8);
          //glowFilter.blendMode = PIXI.BLEND_MODES.ADD

          // Add a color matrix filter for hue rotation
          const colorMatrix = new PIXI.ColorMatrixFilter();

          sprite.filters = [glowFilter, colorMatrix];
          pixiApp.ticker.add((delta) => {
            // Rotate hue over time
            const hueRotation = (pixiApp.ticker.lastTime / 1000) % 360;
            colorMatrix.hue(hueRotation, false);
          });
        }

        pixiApp.stage.addChild(sprite);
        pixiSpriteRef.current = sprite;

        // Create Three.js texture from PIXI canvas
        const threeTexture = new THREE.Texture(canvas);
        threeTexture.needsUpdate = true;
        textureRef.current = threeTexture;

        setIsPixiReady(true);
      })
      .catch((error) => {
        console.error("Failed to load sprite texture:", error);
      });

    // Cleanup function
    return () => {
      if (pixiAppRef.current) {
        pixiAppRef.current.destroy(true, { children: true, texture: true });
      }
      if (textureRef.current) {
        textureRef.current.dispose();
      }
    };
  }, [spriteUrl, backgroundColor, backgroundAlpha, effects]);

  // Animation loop
  useFrame((state, delta) => {
    // Only run animation if everything is initialized
    if (
      pixiSpriteRef.current &&
      pixiAppRef.current &&
      pixiAppRef.current.renderer &&
      pixiAppRef.current.stage &&
      textureRef.current
    ) {
      // Animate PIXI sprite
      pixiSpriteRef.current.rotation += delta * 0.5;

      // Scale the sprite with a sine wave
      const scale = 0.8 + Math.sin(state.clock.elapsedTime) * 0.2;
      pixiSpriteRef.current.scale.set(scale, scale);

      // Render PIXI stage to canvas
      pixiAppRef.current.renderer.render(pixiAppRef.current.stage);

      // Update Three.js texture
      textureRef.current.needsUpdate = true;
    }

    // Animate the plane
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[width, height]} />
      {isPixiReady && textureRef.current ? (
        <meshBasicMaterial map={textureRef.current} transparent={true} />
      ) : (
        <meshBasicMaterial color="gray" wireframe />
      )}
    </mesh>
  );
}
export default AdvancedPixiSpritePlane;