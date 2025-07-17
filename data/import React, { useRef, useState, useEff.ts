import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { MMDLoader } from 'three/examples/jsm/loaders/MMDLoader';
import { MMDAnimationHelper } from 'three/examples/jsm/animation/MMDAnimationHelper';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const MMDModelViewer = ({ modelUrl, motionUrl, cameraUrl = null }) => {
  const mountRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (!mountRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45, window.innerWidth / window.innerHeight, 1, 2000
    );
    camera.position.z = 30;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);
    
    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 10;
    controls.maxDistance = 100;
    
    // Lighting
    const ambient = new THREE.AmbientLight(0x666666);
    scene.add(ambient);
    
    const directionalLight = new THREE.DirectionalLight(0x887766);
    directionalLight.position.set(-1, 1, 1).normalize();
    scene.add(directionalLight);
    
    // Grid helper
    const gridHelper = new THREE.GridHelper(30, 30);
    scene.add(gridHelper);
    
    // MMD Helper
    const helper = new MMDAnimationHelper({ afterglow: 2.0 });
    
    // Load MMD model, motion, and camera
    const loader = new MMDLoader();
    
    setLoading(true);
    
    const loadModel = async () => {
      try {
        // Load model
        const model = await new Promise((resolve, reject) => {
          loader.load(
            modelUrl,
            (mesh) => resolve(mesh),
            (xhr) => {
              // Progress callback
              console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            (error) => reject(new Error(`Model loading error: ${error}`))
          );
        });
        
        // Load motion if provided
        if (motionUrl) {
          await new Promise((resolve, reject) => {
            loader.loadAnimation(
              motionUrl,
              model,
              (motion) => {
                helper.add(model, { animation: motion, physics: true });
                resolve();
              },
              (xhr) => {
                // Progress callback
                console.log((xhr.loaded / xhr.total * 100) + '% motion loaded');
              },
              (error) => reject(new Error(`Motion loading error: ${error}`))
            );
          });
        } else {
          // Add model without animation
          helper.add(model, { physics: true });
        }
        
        // Load camera if provided
        if (cameraUrl) {
          await new Promise((resolve, reject) => {
            loader.loadCamera(
              cameraUrl,
              (cameraData) => {
                helper.add(camera, { animation: cameraData.animation });
                camera.add(audioListener);
                resolve();
              },
              (xhr) => {
                // Progress callback
                console.log((xhr.loaded / xhr.total * 100) + '% camera loaded');
              },
              (error) => reject(new Error(`Camera loading error: ${error}`))
            );
          });
        }
        
        // Center model
        model.position.y = -10;
        scene.add(model);
        
        setLoading(false);
      } catch (err) {
        console.error("Failed to load MMD content:", err);
        setError(err.message);
        setLoading(false);
      }
    };
    
    loadModel();
    
    // Animation loop
    const clock = new THREE.Clock();
    
    const animate = () => {
      requestAnimationFrame(animate);
      
      if (helper) {
        helper.update(clock.getDelta());
      }
      
      controls.update();
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      scene.dispose();
      renderer.dispose();
    };
  }, [modelUrl, motionUrl, cameraUrl]);
  
  return (
    <div className="mmd-viewer">
      <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />
      {loading && (
        <div style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)',
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: '20px',
          borderRadius: '8px'
        }}>
          Loading MMD Model...
        </div>
      )}
      {error && (
        <div style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)',
          background: 'rgba(255,0,0,0.7)',
          color: 'white',
          padding: '20px',
          borderRadius: '8px'
        }}>
          Error: {error}
        </div>
      )}
    </div>
  );
};

export default MMDModelViewer;