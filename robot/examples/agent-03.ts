import { createMachine, assign } from 'xstate';

const gameStateMachine = createMachine({
  id: 'nightsBlackAgents',
  context: {
    // Previous context remains...
    missionBranching: {
      activePath: null,
      unlockedPaths: [],
      branchHistory: [],
      consequenceStack: [],
      relationshipStates: {},
      discoveredLeads: new Set(),
      sacrificedAssets: [],
      compromisedContacts: [],
      vampireSuspicion: {
        individual: {},
        faction: {}
      },
      timelineAlterations: [],
      missionKnowledge: {
        criticalInfo: new Set(),
        optionalInfo: new Set(),
        falseLeads: new Set()
      }
    }
  },
  states: {
    gameplay: {
      type: 'parallel',
      states: {
        missionBranching: {
          initial: 'setup',
          states: {
            setup: {
              on: {
                INITIALIZE_BRANCHES: {
                  target: 'mainBranch',
                  actions: 'setupInitialBranches'
                }
              }
            },
            mainBranch: {
              type: 'parallel',
              states: {
                investigationPath: {
                  initial: 'gatherIntel',
                  states: {
                    gatherIntel: {
                      on: {
                        DISCOVER_VAMPIRE_NEST: 'nestInfiltration',
                        FIND_CORRUPT_OFFICIAL: 'politicalIntrigue',
                        UNCOVER_RITUAL: 'occultResearch'
                      }
                    },
                    nestInfiltration: {
                      on: {
                        SUCCESSFUL_INFILTRATION: {
                          target: 'vampireConfrontation',
                          actions: 'updateVampireSuspicion'
                        },
                        DETECTED: {
                          target: 'exposed',
                          actions: ['compromiseLocation', 'alertVampireFaction']
                        }
                      }
                    },
                    politicalIntrigue: {
                      on: {
                        BLACKMAIL_ACQUIRED: {
                          target: 'leveragePhase',
                          actions: 'updatePoliticalRelations'
                        },
                        OFFICIAL_TURNED: {
                          target: 'doubleAgent',
                          actions: 'gainPoliticalAsset'
                        },
                        COVER_BLOWN: {
                          target: 'exposed',
                          actions: ['compromisePoliticalContact', 'increaseSurveillance']
                        }
                      }
                    },
                    occultResearch: {
                      on: {
                        RITUAL_UNDERSTOOD: {
                          target: 'ritualCountermeasures',
                          actions: 'gainOccultKnowledge'
                        },
                        MIND_AFFECTED: {
                          target: 'psychicCompromise',
                          actions: 'applyMentalEffect'
                        }
                      }
                    }
                  }
                },
                consequenceTrack: {
                  initial: 'stable',
                  states: {
                    stable: {
                      on: {
                        CONSEQUENCE_TRIGGERED: {
                          target: 'cascading',
                          actions: 'initializeConsequenceChain'
                        }
                      }
                    },
                    cascading: {
                      on: {
                        RESOLVE_CONSEQUENCE: {
                          target: 'stable',
                          actions: 'processConsequenceStack'
                        },
                        NEW_CONSEQUENCE: {
                          actions: 'addToConsequenceStack'
                        }
                      }
                    }
                  }
                },
                relationshipWeb: {
                  type: 'parallel',
                  states: {
                    vampireFactions: {
                      initial: 'hidden',
                      states: {
                        hidden: {
                          on: {
                            DISCOVER_FACTION: 'revealed'
                          }
                        },
                        revealed: {
                          on: {
                            MANIPULATE_FACTION: {
                              actions: 'updateFactionRelations'
                            }
                          }
                        }
                      }
                    },
                    humanAssets: {
                      initial: 'available',
                      states: {
                        available: {
                          on: {
                            ASSET_COMPROMISED: 'compromised',
                            ASSET_SACRIFICED: 'sacrificed'
                          }
                        },
                        compromised: {
                          on: {
                            RECOVER_ASSET: {
                              target: 'available',
                              cond: 'canRecoverAsset'
                            }
                          }
                        },
                        sacrificed: {
                          type: 'final'
                        }
                      }
                    }
                  }
                }
              }
            },
            specialBranches: {
              type: 'parallel',
              states: {
                vampirePolitics: {
                  initial: 'locked',
                  states: {
                    locked: {
                      on: {
                        UNLOCK_VAMPIRE_POLITICS: {
                          target: 'active',
                          cond: 'hasRequiredIntel'
                        }
                      }
                    },
                    active: {
                      on: {
                        MANIPULATE_FACTIONS: {
                          actions: ['updateFactionRelations', 'triggerConsequences']
                        },
                        EXPOSE_VAMPIRE: {
                          actions: ['compromiseVampire', 'alertRivals']
                        }
                      }
                    }
                  }
                },
                occultConspiracy: {
                  initial: 'locked',
                  states: {
                    locked: {
                      on: {
                        UNLOCK_OCCULT_BRANCH: {
                          target: 'active',
                          cond: 'hasOccultKnowledge'
                        }
                      }
                    },
                    active: {
                      on: {
                        PERFORM_RITUAL: {
                          actions: ['alterTimestream', 'applyMysticConsequences']
                        },
                        COUNTER_RITUAL: {
                          actions: ['preventRitual', 'alertOccultists']
                        }
                      }
                    }
                  }
                },
                doubleAgentWeb: {
                  initial: 'locked',
                  states: {
                    locked: {
                      on: {
                        UNLOCK_DOUBLE_AGENT: {
                          target: 'active',
                          cond: 'hasDoubleAgent'
                        }
                      }
                    },
                    active: {
                      on: {
                        DEPLOY_AGENT: {
                          actions: ['gatherIntel', 'riskExposure']
                        },
                        EXTRACT_AGENT: {
                          actions: ['secureAsset', 'closeIntelChannel']
                        }
                      }
                    }
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
  guards: {
    hasRequiredIntel: (context) => 
      context.missionBranching.missionKnowledge.criticalInfo.size >= 3,
    hasOccultKnowledge: (context) => 
      context.missionBranching.discoveredLeads.has('occultRitual'),
    hasDoubleAgent: (context) => 
      context.missionBranching.relationshipStates.doubleAgents?.length > 0,
    canRecoverAsset: (context, event) => 
      !context.missionBranching.sacrificedAssets.includes(event.assetId)
  },
  actions: {
    setupInitialBranches: assign({
      missionBranching: (context) => ({
        ...context.missionBranching,
        activePath: 'investigation',
        unlockedPaths: ['investigation'],
        branchHistory: [{
          path: 'investigation',
          timestamp: context.gameTime,
          initialConditions: true
        }]
      })
    }),
    updateVampireSuspicion: assign({
      missionBranching: (context, event) => ({
        ...context.missionBranching,
        vampireSuspicion: {
          ...context.missionBranching.vampireSuspicion,
          individual: {
            ...context.missionBranching.vampireSuspicion.individual,
            [event.vampireId]: (context.missionBranching.vampireSuspicion.individual[event.vampireId] || 0) + event.suspicionIncrease
          }
        }
      })
    }),
    initializeConsequenceChain: assign({
      missionBranching: (context, event) => ({
        ...context.missionBranching,
        consequenceStack: [...context.missionBranching.consequenceStack, event.consequence]
      })
    }),
    processConsequenceStack: assign({
      missionBranching: (context) => {
        const [currentConsequence, ...remainingConsequences] = context.missionBranching.consequenceStack;
        // Process the current consequence and potentially generate new ones
        const newConsequences = processConsequence(currentConsequence, context);
        return {
          ...context.missionBranching,
          consequenceStack: [...remainingConsequences, ...newConsequences]
        };
      }
    }),
    alterTimestream: assign({
      missionBranching: (context, event) => ({
        ...context.missionBranching,
        timelineAlterations: [...context.missionBranching.timelineAlterations, {
          type: event.alterationType,
          timestamp: context.gameTime,
          effects: event.effects
        }]
      })
    })
  }
});

// Helper function to process consequences
function processConsequence(consequence, context) {
  const newConsequences = [];
  
  switch (consequence.type) {
    case 'FACTION_CONFLICT':
      // Generate inter-faction warfare consequences
      newConsequences.push({
        type: 'TERRITORY_CHANGE',
        affectedAreas: consequence.territories
      });
      break;
    case 'RITUAL_BACKLASH':
      // Generate mystical consequences
      newConsequences.push({
        type: 'REALITY_DISTORTION',
        severity: consequence.powerLevel
      });
      break;
    case 'NETWORK_COMPROMISE':
      // Generate cascading contact exposure
      consequence.compromisedContacts.forEach(contact => {
        newConsequences.push({
          type: 'CONTACT_EXPOSURE',
          contactId: contact,
          exposureLevel: 'critical'
        });
      });
      break;
  }
  
  return newConsequences;
}

export default gameStateMachine;