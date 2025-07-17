import { createMachine, assign } from 'xstate';

const BLOOD_EFFECTS = {
  arterial_spray: {
    pattern: 'pulsing',
    pressure: 'high',
    distance: 'far',
    splatterRadius: 'wide',
    color: '#8B0000',
    particleCount: 200,
    decayRate: 0.8
  },
  venous_bleeding: {
    pattern: 'steady',
    pressure: 'medium',
    distance: 'medium',
    splatterRadius: 'medium',
    color: '#AA0000',
    particleCount: 150,
    decayRate: 0.6
  },
  capillary_seepage: {
    pattern: 'pooling',
    pressure: 'low',
    distance: 'close',
    splatterRadius: 'small',
    color: '#CC0000',
    particleCount: 100,
    decayRate: 0.4
  }
};

const BLOOD_STATES = {
  fresh: {
    color: '#8B0000',
    viscosity: 1.0,
    coagulationRate: 0
  },
  coagulating: {
    color: '#4A0404',
    viscosity: 1.5,
    coagulationRate: 0.5
  },
  clotted: {
    color: '#2F0000',
    viscosity: 2.0,
    coagulationRate: 1.0
  }
};

const bloodEffects = createMachine({
  // Previous configuration remains...
  context: {
    // Previous context remains...
    bloodEffects: {
      pools: [],
      sprays: [],
      drips: [],
      splatters: []
    },
    bloodVolume: 100,
    bloodPressure: 100,
    bloodViscosity: 1.0,
    activeBleedingPoints: [],
    coagulationFactor: 1.0,
    bloodTrailDensity: 0,
    surfaceBloodMap: new Map(),
    arterialSprayPatterns: [],
    bloodInteractionPhysics: {
      surfaceTension: 1.0,
      gravity: 9.81,
      airResistance: 0.02
    }
  },
  states: {
    // Previous states remain...
    evisceration: {
      // Previous configuration remains...
      invoke: {
        src: 'simulateBloodPhysics'
      },
      on: {
        BLOOD_VESSEL_CUT: {
          actions: [
            'initiateBloodSpray',
            'trackBleedingPoint',
            'updateBloodVolume',
            'generateBloodSplatter'
          ]
        },
        ORGAN_PUNCTURE: {
          actions: [
            'triggerInternalBleeding',
            'createBloodPool',
            'updateOrganBloodContent'
          ]
        },
        SURFACE_BLOOD_INTERACTION: {
          actions: [
            'updateSurfaceBlood',
            'simulateBloodFlow',
            'handleBloodCollision'
          ]
        }
      }
    }
  }
}, {
  actions: {
    // Previous actions remain...
    initiateBloodSpray: assign({
      sprays: (context, event) => {
        const sprayType = determineBleedingType(event.vesselType);
        const newSpray = {
          id: generateUniqueId(),
          type: sprayType,
          ...BLOOD_EFFECTS[sprayType],
          position: event.position,
          direction: event.direction,
          startTime: Date.now()
        };
        return [...context.sprays, newSpray];
      }
    }),
    createBloodPool: assign({
      pools: (context, event) => {
        const newPool = {
          id: generateUniqueId(),
          position: event.position,
          radius: 0,
          depth: 0,
          viscosity: BLOOD_STATES.fresh.viscosity,
          color: BLOOD_STATES.fresh.color,
          lastUpdate: Date.now(),
          growthRate: calculatePoolGrowthRate(context.bloodPressure),
          surfaceNormal: event.surfaceNormal
        };
        return [...context.pools, newPool];
      }
    }),
    updateBloodVolume: assign({
      bloodVolume: (context, event) => {
        const lossRate = calculateBloodLossRate(event.vesselType, context.bloodPressure);
        return Math.max(0, context.bloodVolume - lossRate);
      },
      bloodPressure: (context) => {
        const pressureDrop = (100 - context.bloodVolume) * 0.8;
        return Math.max(0, context.bloodPressure - pressureDrop);
      }
    }),
    generateBloodSplatter: assign({
      splatters: (context, event) => {
        const newSplatter = generateSplatterPattern(
          event.position,
          event.direction,
          context.bloodPressure,
          context.bloodViscosity
        );
        return [...context.splatters, newSplatter];
      }
    }),
    simulateBloodFlow: assign({
      pools: (context) => {
        return context.pools.map(pool => {
          const timeDelta = Date.now() - pool.lastUpdate;
          return {
            ...pool,
            radius: calculatePoolSpread(pool, timeDelta, context.bloodInteractionPhysics),
            depth: calculatePoolDepth(pool, timeDelta),
            viscosity: updateViscosity(pool, timeDelta),
            color: updateBloodColor(pool, timeDelta),
            lastUpdate: Date.now()
          };
        });
      }
    }),
    handleBloodCollision: assign({
      surfaceBloodMap: (context, event) => {
        const updatedMap = new Map(context.surfaceBloodMap);
        const collisionPoint = `${event.x},${event.y}`;
        
        const existingBlood = updatedMap.get(collisionPoint) || {
          amount: 0,
          state: 'fresh'
        };

        updatedMap.set(collisionPoint, {
          amount: existingBlood.amount + event.volume,
          state: determineBloodState(existingBlood, event.time)
        });

        return updatedMap;
      }
    }),
    triggerInternalBleeding: assign({
      activeBleedingPoints: (context, event) => {
        const newPoint = {
          location: event.position,
          severity: calculateBleedingSeverity(event.damageType),
          type: determineBleedingType(event.vesselType),
          startTime: Date.now(),
          pressureModifier: context.bloodPressure / 100
        };
        return [...context.activeBleedingPoints, newPoint];
      }
    })
  },
  services: {
    simulateBloodPhysics: (context) => (callback) => {
      const interval = setInterval(() => {
        // Update blood physics every frame
        callback({
          type: 'UPDATE_BLOOD_PHYSICS',
          timestamp: Date.now(),
          deltaTime: 16.67 // Assuming 60fps
        });
      }, 16.67);
      
      return () => clearInterval(interval);
    }
  }
});

// Utility functions
function determineBleedingType(vesselType) {
  const typeMap = {
    artery: 'arterial_spray',
    vein: 'venous_bleeding',
    capillary: 'capillary_seepage'
  };
  return typeMap[vesselType] || 'venous_bleeding';
}

function calculatePoolGrowthRate(bloodPressure) {
  return (bloodPressure / 100) * 0.5 + 0.1;
}

function calculateBloodLossRate(vesselType, pressure) {
  const baseRates = {
    artery: 2.0,
    vein: 1.0,
    capillary: 0.2
  };
  return baseRates[vesselType] * (pressure / 100);
}

function generateSplatterPattern(position, direction, pressure, viscosity) {
  // Calculate splatter properties based on physics
  const particleCount = Math.floor(pressure * 2);
  const spreadAngle = (1 - viscosity) * 45;
  const velocity = pressure * 0.5;

  return {
    id: generateUniqueId(),
    particles: Array.from({ length: particleCount }, () => ({
      angle: direction + (Math.random() - 0.5) * spreadAngle,
      speed: velocity * (0.8 + Math.random() * 0.4),
      size: 1 + Math.random() * 3
    })),
    position,
    startTime: Date.now()
  };
}

function calculatePoolSpread(pool, timeDelta, physics) {
  const gravity = physics.gravity;
  const surfaceTension = physics.surfaceTension;
  const spreadRate = (pool.growthRate * gravity) / (surfaceTension * pool.viscosity);
  return pool.radius + (spreadRate * timeDelta / 1000);
}

function updateViscosity(pool, timeDelta) {
  const coagulationRate = 0.0001; // blood coagulation rate per millisecond
  return Math.min(BLOOD_STATES.clotted.viscosity, 
    pool.viscosity + (coagulationRate * timeDelta));
}

function generateUniqueId() {
  return Math.random().toString(36).substr(2, 9);
}

export default bloodEffects;