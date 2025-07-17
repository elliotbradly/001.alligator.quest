import { createMachine, assign } from 'xstate';

const supernaturalConsequenceSystem = {
  // Supernatural Effect Categories
  vampiricEffects: {
    BLOOD_MOON: {
      immediateEffects: ['FEEDING_FRENZY', 'HEIGHTENED_POWERS'],
      cascadingEffects: ['MASS_TURNINGS', 'TERRITORY_CHAOS'],
      realityEffects: ['NOCTURNAL_EXPANSION', 'SUNLIGHT_WEAKENING']
    },
    ANCIENT_AWAKENING: {
      immediateEffects: ['POWER_SURGE', 'LESSER_VAMPIRE_SUBJUGATION'],
      cascadingEffects: ['BLOODLINE_WARS', 'ANCIENT_KNOWLEDGE_REVEAL'],
      realityEffects: ['TIME_DISTORTION', 'PAST_BLEEDING']
    },
    BLOOD_PLAGUE: {
      immediateEffects: ['MASS_INFECTION', 'VAMPIRE_WEAKENING'],
      cascadingEffects: ['HUMAN_PANIC', 'SUPERNATURAL_QUARANTINE'],
      realityEffects: ['BLOOD_CORRUPTION', 'HEALING_NEGATION']
    }
  },

  occultEffects: {
    REALITY_BREACH: {
      immediateEffects: ['DIMENSIONAL_TEAR', 'ENTITY_MANIFESTATION'],
      cascadingEffects: ['REALITY_BLEED', 'LAW_PHYSICS_BREAKDOWN'],
      realityEffects: ['ZONE_ANOMALY', 'TIME_FRACTURES']
    },
    RITUAL_CATASTROPHE: {
      immediateEffects: ['MAGICAL_EXPLOSION', 'MASS_ENCHANTMENT'],
      cascadingEffects: ['ARCANE_CORRUPTION', 'LEYLINE_DISRUPTION'],
      realityEffects: ['PERMANENT_ENCHANTMENT', 'REALITY_REWRITE']
    },
    NECROMANTIC_SURGE: {
      immediateEffects: ['MASS_ANIMATION', 'DEATH_ENERGY_RELEASE'],
      cascadingEffects: ['SPIRIT_WORLD_MERGE', 'LIFE_FORCE_DRAIN'],
      realityEffects: ['DEATH_BARRIER_WEAKENING', 'IMMORTALITY_ZONES']
    }
  },

  cursedEffects: {
    ANCIENT_CURSE: {
      immediateEffects: ['MASS_AFFLICTION', 'SUPERNATURAL_MARKING'],
      cascadingEffects: ['CURSE_SPREAD', 'GENERATIONAL_EFFECT'],
      realityEffects: ['FATE_ALTERATION', 'KARMA_DISTORTION']
    },
    REALITY_CURSE: {
      immediateEffects: ['PROBABILITY_COLLAPSE', 'LUCK_INVERSION'],
      cascadingEffects: ['CHAOS_CASCADE', 'DESTINY_UNRAVEL'],
      realityEffects: ['NARRATIVE_BREAKDOWN', 'CAUSALITY_CORRUPTION']
    }
  },

  // Reality Stability Tracking
  realityStability: {
    zones: {
      STABLE: 'Normal reality physics',
      FLUCTUATING: 'Minor reality distortions',
      UNSTABLE: 'Major reality breaches',
      COLLAPSED: 'Complete reality failure'
    },
    effects: {
      MINOR_DISTORTION: {
        duration: '1d6 hours',
        radius: '100m',
        recovery: 'natural'
      },
      MAJOR_BREACH: {
        duration: '1d6 days',
        radius: '1km',
        recovery: 'intervention required'
      },
      REALITY_COLLAPSE: {
        duration: 'permanent',
        radius: 'expanding',
        recovery: 'special ritual required'
      }
    }
  }
};

const gameStateMachine = createMachine({
  // Previous configuration remains...
  context: {
    // Previous context remains...
    supernaturalState: {
      activeEffects: new Set(),
      realityZones: new Map(),
      dimensionalStability: 100,
      cursedLocations: new Set(),
      temporalAnomalies: [],
      supernaturalEntities: new Map(),
      magicalResonance: 0,
      bloodMoonPhase: 0,
      ancientAwakenings: [],
      realityBreaches: [],
      cursedObjects: new Set()
    }
  },
  states: {
    gameplay: {
      type: 'parallel',
      states: {
        supernaturalConsequences: {
          type: 'parallel',
          states: {
            vampiricManifestations: {
              initial: 'dormant',
              states: {
                dormant: {
                  on: {
                    BLOOD_MOON_RISE: 'bloodMoon',
                    ANCIENT_STIR: 'ancientAwakening'
                  }
                },
                bloodMoon: {
                  on: {
                    MOON_PHASE_END: 'dormant',
                    RITUAL_PROLONGING: 'extendedBloodMoon'
                  },
                  after: {
                    BLOOD_MOON_DURATION: {
                      target: 'dormant',
                      actions: 'cleanupBloodMoonEffects'
                    }
                  }
                },
                ancientAwakening: {
                  on: {
                    ANCIENT_DEFEATED: 'dormant',
                    ANCIENT_ASCENSION: 'vampiricApocalypse'
                  }
                },
                extendedBloodMoon: {
                  on: {
                    RITUAL_BROKEN: 'bloodMoon',
                    FULL_CORRUPTION: 'vampiricApocalypse'
                  }
                },
                vampiricApocalypse: {
                  type: 'final'
                }
              }
            },
            realityDistortions: {
              initial: 'stable',
              states: {
                stable: {
                  on: {
                    REALITY_CRACK: 'destabilizing'
                  }
                },
                destabilizing: {
                  on: {
                    STABILIZE: 'stable',
                    BREACH_WIDENS: 'breached'
                  }
                },
                breached: {
                  on: {
                    SEAL_BREACH: 'destabilizing',
                    COMPLETE_COLLAPSE: 'realityCollapse'
                  }
                },
                realityCollapse: {
                  type: 'final'
                }
              }
            },
            curseProliferation: {
              initial: 'contained',
              states: {
                contained: {
                  on: {
                    CURSE_RELEASE: 'spreading'
                  }
                },
                spreading: {
                  on: {
                    CONTAIN_CURSE: 'contained',
                    CURSE_MUTATION: 'mutating'
                  }
                },
                mutating: {
                  on: {
                    STABILIZE_CURSE: 'spreading',
                    CURSE_CRITICAL: 'curseApocalypse'
                  }
                },
                curseApocalypse: {
                  type: 'final'
                }
              }
            }
          }
        }
      }
    }
  }
}, {
  actions: {
    processSupernaturalEffect: assign({
      supernaturalState: (context, event) => {
        const effect = getSupernaturalEffect(event.effectType);
        const processedEffect = processEffect(effect, context);
        
        return {
          ...context.supernaturalState,
          activeEffects: new Set([...context.supernaturalState.activeEffects, event.effectType]),
          dimensionalStability: calculateNewStability(context, processedEffect),
          realityZones: updateRealityZones(context.supernaturalState.realityZones, processedEffect),
          temporalAnomalies: generateTemporalAnomalies(processedEffect),
          magicalResonance: calculateNewResonance(context, processedEffect)
        };
      }
    }),
    
    cleanupBloodMoonEffects: assign({
      supernaturalState: (context) => ({
        ...context.supernaturalState,
        bloodMoonPhase: 0,
        activeEffects: new Set([...context.supernaturalState.activeEffects].filter(effect => 
          !effect.startsWith('BLOOD_MOON')
        ))
      })
    })
  }
});

// Helper functions for supernatural processing
function processEffect(effect, context) {
  const processedEffect = {
    type: effect.type,
    manifestations: [],
    realityImpact: calculateRealityImpact(effect, context),
    temporalDistortions: calculateTemporalDistortions(effect, context),
    dimensionalBreaches: identifyDimensionalBreaches(effect, context)
  };

  // Process immediate supernatural manifestations
  effect.immediateEffects.forEach(manifestation => {
    processedEffect.manifestations.push(processSupernaturalManifestation(manifestation, context));
  });

  // Calculate reality stability impact
  processedEffect.stabilityChange = calculateStabilityChange(effect, context);

  // Track dimensional anomalies
  processedEffect.anomalies = trackDimensionalAnomalies(effect, context);

  return processedEffect;
}

function calculateRealityImpact(effect, context) {
  const baseImpact = effect.realityEffects.length * 10;
  const currentStability = context.supernaturalState.dimensionalStability;
  const activeEffectsMultiplier = 1 + (context.supernaturalState.activeEffects.size * 0.1);
  
  return Math.min(100, baseImpact * activeEffectsMultiplier * (1 - (currentStability / 100)));
}

function calculateTemporalDistortions(effect, context) {
  return effect.realityEffects
    .filter(e => e.includes('TIME') || e.includes('TEMPORAL'))
    .map(e => ({
      type: e,
      severity: calculateDistortionSeverity(e, context),
      radius: calculateDistortionRadius(e, context),
      duration: calculateDistortionDuration(e, context)
    }));
}

function identifyDimensionalBreaches(effect, context) {
  const breaches = [];
  const stabilityThreshold = context.supernaturalState.dimensionalStability;
  
  effect.realityEffects.forEach(e => {
    if (e.includes('BREACH') || e.includes('TEAR')) {
      breaches.push({
        type: e,
        location: calculateBreachLocation(e, context),
        size: calculateBreachSize(e, context),
        stability: Math.max(0, stabilityThreshold - calculateBreachSeverity(e, context))
      });
    }
  });
  
  return breaches;
}

function calculateNewStability(context, processedEffect) {
  const currentStability = context.supernaturalState.dimensionalStability;
  const stabilityChange = processedEffect.stabilityChange;
  
  return Math.max(0, Math.min(100, currentStability - stabilityChange));
}

function updateRealityZones(currentZones, processedEffect) {
  const updatedZones = new Map(currentZones);
  
  processedEffect.dimensionalBreaches.forEach(breach => {
    const zoneKey = `${breach.location.x},${breach.location.y}`;
    const existingZone = updatedZones.get(zoneKey);
    
    if (existingZone) {
      // Merge zones if they overlap
      updatedZones.set(zoneKey, mergeRealityZones(existingZone, breach));
    } else {
      // Create new zone
      updatedZones.set(zoneKey, createRealityZone(breach));
    }
  });
  
  return updatedZones;
}

export default gameStateMachine;