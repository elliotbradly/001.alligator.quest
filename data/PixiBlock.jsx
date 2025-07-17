import React from "react";
import { useEffect, useRef, useState } from "react";
import * as PIXI from "pixi.js";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Container, Graphics, Text, WebGLRenderer } from "pixi.js";

function PixiBlock() {

  var width = 1920;
  var height = 1080;
  var backgroundColor = 0xFF00FF;
  var backgroundAlpha = 1;


  const pixiAppRef = useRef(null);
  const meshRef = useRef(null);
  const textureRef = useRef(null);
  const pixiSpriteRef = useRef(null);
  const canvasRef = useRef(null);
  const [isPixiReady, setIsPixiReady] = useState(false);


  //<mesh ref={meshRef}>

  const setup = async () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1920;
    canvas.height = 1080;
    canvasRef.current = canvas;

    
    // Initialize PIXI application
    const pixiApp = new PIXI.Application({
      width: 1920,
      height: 1080,
      //backgroundColor,
      //backgroundAlpha,
      view: canvas,
      antialias: true,
      transparent:false
    });
    pixiAppRef.current = pixiApp;

    // Create PixiJS scene graph
    const stage = new Container();
    const uiLayer = new Graphics()
      .roundRect(20, 80, 300, 300, 20)
      .fill(0xffff00);

    // Add text overlay
    const text = new Text({
      text: "Pixi and Three.js",
      style: { fontFamily: "Arial", fontSize: 24, fill: "black" },
    });

    uiLayer.addChild(text);
    stage.addChild(uiLayer);
    pixiApp.stage.addChild(stage);

    const threeTexture = new THREE.Texture(canvas);
    threeTexture.needsUpdate = true;
    textureRef.current = threeTexture;

    setIsPixiReady(true);
  };

  useEffect(() => {
    setup();
  });

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
      pixiSpriteRef.current.rotation += delta * 0.5

      // Scale the sprite with a sine wave
      const scale = 0.8 + Math.sin(state.clock.elapsedTime) * 0.2
      pixiSpriteRef.current.scale.set(scale, scale)

      // Render PIXI stage to canvas
      pixiAppRef.current.renderer.render(pixiAppRef.current.stage)

      // Update Three.js texture
      textureRef.current.needsUpdate = true
    }

    // Animate the plane
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1
    }
  })


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

export default PixiBlock;
