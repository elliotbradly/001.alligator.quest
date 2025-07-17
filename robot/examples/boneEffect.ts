import { createMachine, assign } from 'xstate';

const BONE_STRUCTURES = {
  ribs: {
    segments: ['1-2', '3-5', '6-8', '9-12'],
    breakTypes: ['fracture', 'compound', 'shatter'],
    marrowContent: 'high',
    structuralImportance: 'vital'
  },
  spine: {
    segments: ['cervical', 'thoracic', 'lumbar', 'sacral'],
    breakTypes: ['compression', 'burst', 'severance'],
    marrowContent: 'high',
    structuralImportance: 'critical'
  },
  pelvis: {
    segments: ['ilium', 'ischium', 'pubis'],
    breakTypes: ['crush', 'fragment', 'split'],
    marrowContent: 'medium',
    structuralImportance: 'major'
  },
  limbs: {
    segments: ['humerus', 'radius', 'ulna', 'femur', 'tibia', 'fibula'],
    breakTypes: ['spiral', 'compound', 'splinter'],
    marrowContent: 'medium',
    structuralImportance: 'moderate'
  }
};

const BREAK_EFFECTS = {
  fracture: {
    soundIntensity: 0.6,
    fragmentCount: 2,
    marrowExposure: 0.3,
    shardVelocity: 2
  },
  compound: {
    soundIntensity: 0.8,
    fragmentCount: 4,
    marrowExposure: 0.7,
    shardVelocity: 5
  },
  shatter: {
    soundIntensity: 1.0,
    fragmentCount: 8,
    marrowExposure: 1.0,
    shardVelocity: 8
  }
};

const boneEffect = createMachine({
  // Previous configuration remains...
  context: {
    // Previous context remains...
    boneStructures: {
      ribs: { integrity: 100, fragments: [], exposedMarrow: false },
      spine: { integrity: 100, fragments: [], exposedMarrow: false },
      pelvis: { integrity: 100, fragments: [], exposedMarrow: false },
      limbs: { integrity: 100, fragments: [], exposedMarrow: false }
    },
    activeBreakPoints: [],
    boneSplinters: [],
    marrowExposurePoints: [],
    structuralIntegrity: 100,
    fracturePatterns: [],
    boneShardTrajectories: []
  },
  states: {
    // Previous states remain...
    boneBreaking: {
      initial: 'analyzing',
      states: {
        analyzing: {
          entry: ['assessBoneStructure', 'calculateBreakPoints'],
          after: {
            1000: 'initialImpact'
          }
        },
        initialImpact: {
          entry: ['triggerImpactForce', 'initiateFracture'],
          on: {
            BONE_CRACKED: 'fracturing'
          }
        },
        fracturing: {
          entry: ['propagateFractures', 'generateCrackingSound'],
          on: {
            STRUCTURAL_FAILURE: 'shattering',
            PARTIAL_BREAK: 'splintering'
          }
        },
        splintering: {
          entry: ['createBoneSplinters', 'exposeMarrow'],
          on: {
            COMPLETE_BREAK: 'shattering',
            CONTINUE_BREAK: 'fracturing'
          }
        },
        shattering: {
          entry: [
            'explodeBoneStructure', 
            'projectBoneShards',
            'maximizeMarrowExposure'
          ],
          after: {
            2000: '#werewolfWarrior.evisceration'
          }
        }
      }
    }
  }
}, {
  actions: {
    // Previous actions remain...
    assessBoneStructure: assign({
      activeBreakPoints: (context, event) => {
        const bone = event.targetBone;
        const structure = BONE_STRUCTURES[bone];
        return structure.segments.map(segment => ({
          segment,
          position: calculateBreakPosition(segment),
          resistance: calculateBoneResistance(bone, segment),
          marrowContent: structure.marrowContent
        }));
      }
    }),
    initiateFracture: assign({
      fracturePatterns: (context, event) => {
        const newFracture = {
          origin: event.impactPoint,
          type: determineFractureType(event.force),
          propagation: [],
          timeStart: Date.now()
        };
        return [...context.fracturePatterns, newFracture];
      }
    }),
    propagateFractures: assign({
      fracturePatterns: (context) => {
        return context.fracturePatterns.map(fracture => {
          const newPropagation = calculateFracturePropagation(
            fracture,
            context.structuralIntegrity
          );
          return {
            ...fracture,
            propagation: [...fracture.propagation, newPropagation]
          };
        });
      }
    }),
    createBoneSplinters: assign({
      boneSplinters: (context, event) => {
        const splinterCount = BREAK_EFFECTS[event.breakType].fragmentCount;
        const newSplinters = Array.from({ length: splinterCount }, () => ({
          size: Math.random() * 3 + 1,
          velocity: calculateSplinterVelocity(event.force),
          trajectory: calculateSplinterTrajectory(),
          spin: Math.random() * 360,
          sharpness: Math.random()
        }));
        return [...context.boneSplinters, ...newSplinters];
      }
    }),
    exposeMarrow: assign({
      marrowExposurePoints: (context, event) => {
        const exposureLevel = BREAK_EFFECTS[event.breakType].marrowExposure;
        const newExposure = {
          position: event.breakPoint,
          radius: exposureLevel * 2,
          flow: calculateMarrowFlow(exposureLevel),
          viscosity: 0.7
        };
        return [...context.marrowExposurePoints, newExposure];
      }
    }),
    explodeBoneStructure: assign({
      boneShardTrajectories: (context, event) => {
        const shardCount = Math.floor(Math.random() * 10) + 15;
        return Array.from({ length: shardCount }, () => ({
          origin: event.centerPoint,
          velocity: BREAK_EFFECTS.shatter.shardVelocity * (0.8 + Math.random() * 0.4),
          angle: Math.random() * 360,
          rotation: {
            x: Math.random() * 360,
            y: Math.random() * 360,
            z: Math.random() * 360
          },
          size: Math.random() * 2 + 0.5
        }));
      },
      structuralIntegrity: (context) => {
        return Math.max(0, context.structuralIntegrity - 50);
      }
    }),
    projectBoneShards: (context) => {
      context.boneShardTrajectories.forEach(shard => {
        simulateShardPhysics(shard);
        handleShardCollisions(shard);
        createShardParticles(shard);
      });
    },
    maximizeMarrowExposure: assign({
      marrowExposurePoints: (context, event) => {
        const majorExposurePoints = calculateMajorExposurePoints(event.breakPattern);
        return majorExposurePoints.map(point => ({
          position: point,
          radius: 3,
          flow: 1.0,
          viscosity: 0.5
        }));
      }
    })
  }
});

// Utility functions
function calculateBreakPosition(segment) {
  return {
    x: Math.random() * 10 - 5,
    y: Math.random() * 10 - 5,
    z: Math.random() * 10 - 5
  };
}

function calculateBoneResistance(bone, segment) {
  const baseResistance = {
    ribs: 0.6,
    spine: 0.9,
    pelvis: 0.8,
    limbs: 0.7
  };
  return baseResistance[bone] * (0.8 + Math.random() * 0.4);
}

function determineFractureType(force) {
  if (force > 80) return 'shatter';
  if (force > 50) return 'compound';
  return 'fracture';
}

function calculateFracturePropagation(fracture, structuralIntegrity) {
  const propagationSpeed = (100 - structuralIntegrity) * 0.1;
  const direction = {
    x: Math.random() * 2 - 1,
    y: Math.random() * 2 - 1,
    z: Math.random() * 2 - 1
  };
  return {
    speed: propagationSpeed,
    direction,
    timestamp: Date.now()
  };
}

function calculateSplinterVelocity(force) {
  return Math.min(force * 0.2, 10);
}

function calculateSplinterTrajectory() {
  return {
    x: Math.random() * 360,
    y: Math.random() * 360,
    z: Math.random() * 360
  };
}

function calculateMarrowFlow(exposureLevel) {
  return Math.min(exposureLevel * 1.5, 1);
}

function simulateShardPhysics(shard) {
  // Implement physics simulation for bone shards
  // - Gravity effects
  // - Air resistance
  // - Rotation dynamics
}

function handleShardCollisions(shard) {
  // Implement collision detection and response
  // - Surface impacts
  // - Secondary fractures
  // - Momentum transfer
}

function createShardParticles(shard) {
  // Generate particle effects for bone shards
  // - Dust particles
  // - Small bone fragments
  // - Marrow droplets
}

function calculateMajorExposurePoints(breakPattern) {
  // Calculate major marrow exposure points based on break pattern
  return Array.from({ length: 5 }, () => ({
    x: Math.random() * 10 - 5,
    y: Math.random() * 10 - 5,
    z: Math.random() * 10 - 5
  }));
}

export default boneEffect;