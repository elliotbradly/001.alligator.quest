import React, { useRef, useState, Suspense, useEffect } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import * as THREE from 'three';
import { MMDLoader } from 'three/examples/jsm/loaders/MMDLoader';
import { MMDAnimationHelper } from 'three/examples/jsm/animation/MMDAnimationHelper';

// Custom loader for MMD animations
const MMDAnimationLoader = {
  load: (url, onLoad, onProgress, onError) => {
    const loader = new MMDLoader();
    loader.loadAnimation(url, null, onLoad, onProgress, onError);
    return null; // Required for useLoader but we don't use this return value
  },
  parse: (data) => data
};

// Scene setup component
const MMDScene = ({ modelUrl, motionUrl }) => {
  const { scene } = useThree();
  const helper = useRef(new MMDAnimationHelper({ afterglow: 2.0 }));
  const clock = useRef(new THREE.Clock());
  
  // Load the model using useLoader
  const model = useLoader(MMDLoader, modelUrl);
  
  // Use custom loader for animation if motionUrl is provided
  const animation = motionUrl ? 
    useLoader(MMDAnimationLoader, motionUrl, (loader) => {
      // This configures the loader to know which model to target
      loader.parser = { meshes: [model] };
    }) : 
    null;
  
  // Setup model and animation
  useEffect(() => {
    if (!model) return;
    
    // Clone the model to avoid issues with multiple renders
    const modelClone = model.clone();
    
    // Position the model
    modelClone.position.y = -10;
    scene.add(modelClone);
    
    // Add model with physics
    helper.current.add(modelClone, { physics: true });
    
    // Add animation if loaded
    if (animation) {
      helper.current.add(modelClone, { animation: animation, physics: true });
    }
    
    return () => {
      helper.current.remove(modelClone);
      scene.remove(modelClone);
    };
  }, [model, animation, scene]);
  
  // Update animation on each frame
  useFrame(() => {
    if (helper.current) {
      helper.current.update(clock.current.getDelta());
    }
  });
  
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight 
        position={[-1, 1, 1]} 
        intensity={0.8} 
        color="#887766" 
      />
      
      {/* Grid for reference */}
      <Grid 
        args={[30, 30]} 
        cellSize={1} 
        cellThickness={0.6} 
        cellColor="#6f6f6f" 
        sectionSize={5}
      />
      
      {/* Camera controls */}
      <OrbitControls 
        minDistance={10} 
        maxDistance={100} 
        target={[0, 0, 0]} 
      />
    </>
  );
};

// Fallback component for Suspense
const LoadingFallback = () => {
  return (
    <mesh>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color="#ffffff" wireframe />
    </mesh>
  );
};

// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback(this.state.error);
    }
    return this.props.children;
  }
}

// Main component
const MMDModelViewer = ({ modelUrl, motionUrl }) => {
  const renderError = (error) => (
    <div 
      style={{ 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)',
        background: 'rgba(255,0,0,0.7)',
        color: 'white',
        padding: '20px',
        borderRadius: '8px'
      }}
    >
      Error: {error.message || "Failed to load MMD model"}
    </div>
  );

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <ErrorBoundary fallback={renderError}>
        <Canvas
          camera={{ position: [0, 0, 30], fov: 45 }}
        >
          <color attach="background" args={["#f0f0f0"]} />
          <Suspense fallback={<LoadingFallback />}>
            <MMDScene modelUrl={modelUrl} motionUrl={motionUrl} />
          </Suspense>
        </Canvas>
      </ErrorBoundary>
    </div>
  );
};

export default MMDModelViewer;