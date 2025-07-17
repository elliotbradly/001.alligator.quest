import { createMachine, assign } from 'xstate';

const consequenceChainSystem = {
  consequences: {
    // Vampire Politics Consequences
    POWER_VACUUM: {
      immediateEffects: ['TERRITORY_DISPUTE', 'FEEDING_GROUND_CHANGE'],
      cascadingEffects: ['FACTION_WAR', 'HUMAN_CASUALTIES'],
      timeDelayedEffects: ['NEW_VAMPIRE_EMERGENCE', 'POWER_CONSOLIDATION']
    },
    EXPOSED_VAMPIRE: {
      immediateEffects: ['SUPERNATURAL_PANIC', 'MEDIA_COVERAGE'],
      cascadingEffects: ['GOVERNMENT_INTERVENTION', 'OCCULT_CRACKDOWN'],
      timeDelayedEffects: ['CONSPIRACY_THEORIES', 'HUNTER_EMERGENCE']
    },
    
    // Political Consequences
    CORRUPT_OFFICIAL_EXPOSED: {
      immediateEffects: ['POLITICAL_SCANDAL', 'MEDIA_FRENZY'],
      cascadingEffects: ['DEPARTMENT_INVESTIGATION', 'WITNESS_ELIMINATION'],
      timeDelayedEffects: ['POLICY_CHANGES', 'POWER_STRUCTURE_SHIFT']
    },
    AGENCY_COMPROMISE: {
      immediateEffects: ['OPERATION_SHUTDOWN', 'ASSET_FREEZING'],
      cascadingEffects: ['INTELLIGENCE_LEAK', 'AGENT_EXPOSURE'],
      timeDelayedEffects: ['PROTOCOL_CHANGES', 'DEEP_COVER_REQUIRED']
    },
    
    // Occult Consequences
    RITUAL_DISRUPTION: {
      immediateEffects: ['MAGICAL_BACKLASH', 'REALITY_DISTORTION'],
      cascadingEffects: ['DIMENSIONAL_BREACH', 'SUPERNATURAL_SURGE'],
      timeDelayedEffects: ['MYSTICAL_CORRUPTION', 'OCCULT_AWAKENING']
    },
    ARTIFACT_DESTRUCTION: {
      immediateEffects: ['POWER_RELEASE', 'WARD_COLLAPSE'],
      cascadingEffects: ['SUPERNATURAL_MANIFESTATION', 'BINDING_BREAK'],
      timeDelayedEffects: ['POWER_VACUUM', 'ARTIFACT_SEEKERS']
    }
  },

  consequenceChains: {
    vampirePolitics: {
      initial: 'stable',
      states: {
        stable: {
          on: {
            DESTABILIZE: 'unstable',
            POWER_SHIFT: 'powerStruggle'
          }
        },
        unstable: {
          on: {
            ESCALATE: 'chaotic',
            STABILIZE: 'stable'
          }
        },
        powerStruggle: {
          on: {
            FACTION_VICTORY: 'newOrder',
            CONTINUED_CONFLICT: 'chaotic'
          }
        },
        chaotic: {
          on: {
            MAJOR_INTERVENTION: 'intervention',
            COMPLETE_COLLAPSE: 'collapsed'
          }
        },
        newOrder: {
          on: {
            CHALLENGE_AUTHORITY: 'unstable',
            CONSOLIDATE_POWER: 'stable'
          }
        },
        intervention: {
          on: {
            SUCCESSFUL_CONTAINMENT: 'stable',
            INTERVENTION_FAILURE: 'collapsed'
          }
        },
        collapsed: {
          on: {
            POWER_VACUUM_FILLED: 'newOrder',
            CONTINUED_CHAOS: 'chaotic'
          }
        }
      }
    }
  }
};

const gameStateMachine = createMachine({
  // Previous configuration remains...
  context: {
    // Previous context remains...
    consequenceTracking: {
      activeConsequences: new Set(),
      consequenceHistory: [],
      pendingConsequences: [],
      consequenceChains: {},
      worldStateChanges: {},
      factionResponses: {},
      temporalRipples: [],
      cascadingEffects: [],
      consequenceStack: []
    }
  },
  states: {
    gameplay: {
      type: 'parallel',
      states: {
        consequenceManagement: {
          initial: 'monitoring',
          states: {
            monitoring: {
              on: {
                CONSEQUENCE_TRIGGERED: {
                  target: 'processing',
                  actions: 'initializeConsequenceChain'
                }
              }
            },
            processing: {
              on: {
                PROCESS_NEXT: {
                  target: 'evaluating',
                  actions: 'processNextConsequence'
                }
              }
            },
            evaluating: {
              on: {
                CHAIN_COMPLETE: 'monitoring',
                GENERATE_NEW_CONSEQUENCES: {
                  target: 'processing',
                  actions: 'addNewConsequences'
                }
              }
            }
          }
        },
        worldStateTracking: {
          type: 'parallel',
          states: {
            vampirePolitics: {
              initial: 'stable',
              states: {
                stable: {
                  on: {
                    POWER_STRUCTURE_CHANGE: 'shifting'
                  }
                },
                shifting: {
                  on: {
                    STABILIZE: 'stable',
                    DETERIORATE: 'unstable'
                  }
                },
                unstable: {
                  on: {
                    COLLAPSE: 'chaos',
                    RECOVERY: 'shifting'
                  }
                },
                chaos: {
                  on: {
                    NEW_ORDER: 'shifting',
                    CONTINUED_CHAOS: 'chaos'
                  }
                }
              }
            },
            supernaturalActivity: {
              initial: 'baseline',
              states: {
                baseline: {
                  on: {
                    ACTIVITY_SPIKE: 'elevated'
                  }
                },
                elevated: {
                  on: {
                    FURTHER_INCREASE: 'critical',
                    CONTAINMENT: 'baseline'
                  }
                },
                critical: {
                  on: {
                    BREACH: 'catastrophic',
                    STABILIZE: 'elevated'
                  }
                },
                catastrophic: {
                  on: {
                    REALITY_STABILIZE: 'critical',
                    DIMENSIONAL_COLLAPSE: 'gameOver'
                  }
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
    initializeConsequenceChain: assign({
      consequenceTracking: (context, event) => {
        const consequence = consequenceChainSystem.consequences[event.consequenceType];
        return {
          ...context.consequenceTracking,
          activeConsequences: new Set([...context.consequenceTracking.activeConsequences, event.consequenceType]),
          consequenceStack: [
            ...consequence.immediateEffects.map(effect => ({
              type: effect,
              timing: 'immediate',
              source: event.consequenceType
            })),
            ...consequence.cascadingEffects.map(effect => ({
              type: effect,
              timing: 'cascading',
              source: event.consequenceType
            })),
            ...consequence.timeDelayedEffects.map(effect => ({
              type: effect,
              timing: 'delayed',
              delay: calculateDelay(effect),
              source: event.consequenceType
            }))
          ]
        };
      }
    }),
    processNextConsequence: assign({
      consequenceTracking: (context) => {
        const [currentConsequence, ...remainingConsequences] = context.consequenceTracking.consequenceStack;
        
        // Process the current consequence
        const processedEffect = processConsequenceEffect(currentConsequence, context);
        
        // Generate any new consequences based on the processed effect
        const newConsequences = generateNewConsequences(processedEffect, context);
        
        return {
          ...context.consequenceTracking,
          consequenceStack: [...remainingConsequences, ...newConsequences],
          consequenceHistory: [...context.consequenceTracking.consequenceHistory, {
            effect: currentConsequence,
            timestamp: context.gameTime,
            results: processedEffect
          }]
        };
      }
    })
  }
});

// Helper functions for consequence processing
function processConsequenceEffect(consequence, context) {
  const processedEffect = {
    type: consequence.type,
    impacts: [],
    severity: calculateSeverity(consequence, context),
    affectedFactions: determineAffectedFactions(consequence, context),
    territorialChanges: calculateTerritorialChanges(consequence, context),
    powerShifts: calculatePowerShifts(consequence, context)
  };

  switch (consequence.timing) {
    case 'immediate':
      processedEffect.impacts = handleImmediateEffect(consequence, context);
      break;
    case 'cascading':
      processedEffect.impacts = handleCascadingEffect(consequence, context);
      break;
    case 'delayed':
      processedEffect.impacts = handleDelayedEffect(consequence, context);
      break;
  }

  return processedEffect;
}

function generateNewConsequences(processedEffect, context) {
  const newConsequences = [];
  
  // Generate faction responses
  processedEffect.affectedFactions.forEach(faction => {
    const response = calculateFactionResponse(faction, processedEffect, context);
    if (response) {
      newConsequences.push({
        type: response.type,
        timing: 'cascading',
        source: processedEffect.type,
        faction: faction
      });
    }
  });

  // Generate territorial disputes
  if (processedEffect.territorialChanges.length > 0) {
    newConsequences.push({
      type: 'TERRITORY_CONFLICT',
      timing: 'delayed',
      delay: calculateTerritorialConflictDelay(processedEffect.territorialChanges),
      territories: processedEffect.territorialChanges
    });
  }

  // Generate power vacuum effects
  if (processedEffect.powerShifts.significant) {
    newConsequences.push({
      type: 'POWER_VACUUM',
      timing: 'delayed',
      delay: calculatePowerVacuumDelay(processedEffect.powerShifts),
      regions: processedEffect.powerShifts.affectedRegions
    });
  }

  return newConsequences;
}

function calculateDelay(effectType) {
  // Calculate appropriate delay based on effect type
  const baseDelays = {
    NEW_VAMPIRE_EMERGENCE: 72, // hours
    POWER_CONSOLIDATION: 168,
    CONSPIRACY_THEORIES: 48,
    HUNTER_EMERGENCE: 120,
    POLICY_CHANGES: 96,
    POWER_STRUCTURE_SHIFT: 144,
    PROTOCOL_CHANGES: 72,
    DEEP_COVER_REQUIRED: 24,
    MYSTICAL_CORRUPTION: 48,
    OCCULT_AWAKENING: 120
  };

  return baseDelays[effectType] || 24; // Default 24-hour delay
}

export default gameStateMachine;