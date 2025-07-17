import { createMachine, assign } from 'xstate';

const gameStateMachine = createMachine({
  id: 'nightsBlackAgents',
  initial: 'mainMenu',
  context: {
    // Previous context remains...
    // New mission-specific context
    activeMissions: [],
    missionHistory: [],
    globalMissionTimer: 0,
    missionStates: {
      primaryObjective: null,
      secondaryObjectives: [],
      timeWindows: [],
      branchingPaths: [],
      contingencies: [],
      missionPhase: 'planning'
    },
    timeConstraints: {
      missionDeadline: null,
      objectiveTimeWindows: {},
      contactAvailability: {},
      surveillanceSchedules: {},
      guardRotations: {},
      vampireFeedings: {}
    },
    missionResources: {
      intel: 0,
      contacts: {},
      equipment: {},
      timeDelayTokens: 3,
      timeAccelerationTokens: 2
    }
  },
  states: {
    // Previous states remain...
    gameplay: {
      type: 'parallel',
      states: {
        // Previous parallel states remain...
        missionState: {
          initial: 'missionPlanning',
          states: {
            missionPlanning: {
              on: {
                START_MISSION: {
                  target: 'missionInProgress',
                  actions: ['initializeMissionTimer', 'setupTimeWindows']
                },
                GATHER_INTEL: {
                  actions: ['updatePreMissionIntel', 'adjustTimeWindows']
                }
              }
            },
            missionInProgress: {
              type: 'parallel',
              states: {
                primaryObjective: {
                  initial: 'active',
                  states: {
                    active: {
                      on: {
                        OBJECTIVE_COMPLETE: 'completed',
                        OBJECTIVE_FAILED: 'failed',
                        OBJECTIVE_COMPROMISED: 'contingency'
                      }
                    },
                    completed: {
                      type: 'final'
                    },
                    failed: {
                      type: 'final'
                    },
                    contingency: {
                      on: {
                        ACTIVATE_BACKUP_PLAN: 'active',
                        ABORT_MISSION: '#nightsBlackAgents.gameplay.missionState.missionAborted'
                      }
                    }
                  }
                },
                secondaryObjectives: {
                  type: 'parallel',
                  states: {
                    intelligence: {
                      initial: 'pending',
                      states: {
                        pending: {
                          on: {
                            INTEL_OPPORTUNITY: 'available'
                          }
                        },
                        available: {
                          after: {
                            INTEL_WINDOW_DURATION: 'expired'
                          },
                          on: {
                            COLLECT_INTEL: 'completed'
                          }
                        },
                        completed: {
                          type: 'final'
                        },
                        expired: {
                          type: 'final'
                        }
                      }
                    },
                    assets: {
                      initial: 'pending',
                      states: {
                        pending: {
                          on: {
                            ASSET_AVAILABLE: 'available'
                          }
                        },
                        available: {
                          after: {
                            ASSET_WINDOW_DURATION: 'expired'
                          },
                          on: {
                            SECURE_ASSET: 'completed'
                          }
                        },
                        completed: {
                          type: 'final'
                        },
                        expired: {
                          type: 'final'
                        }
                      }
                    }
                  }
                },
                timeManagement: {
                  initial: 'normal',
                  states: {
                    normal: {
                      on: {
                        USE_TIME_DELAY: {
                          target: 'delayed',
                          cond: 'hasTimeDelayTokens',
                          actions: ['consumeTimeDelayToken', 'pauseObjectiveTimers']
                        },
                        USE_TIME_ACCELERATION: {
                          target: 'accelerated',
                          cond: 'hasTimeAccelerationTokens',
                          actions: ['consumeTimeAccelerationToken', 'accelerateObjectiveTimers']
                        }
                      }
                    },
                    delayed: {
                      after: {
                        TIME_DELAY_DURATION: 'normal'
                      }
                    },
                    accelerated: {
                      after: {
                        TIME_ACCELERATION_DURATION: 'normal'
                      }
                    }
                  }
                },
                tacticalOptions: {
                  initial: 'available',
                  states: {
                    available: {
                      on: {
                        SELECT_INFILTRATION: 'infiltration',
                        SELECT_SURVEILLANCE: 'surveillance',
                        SELECT_SOCIAL: 'social'
                      }
                    },
                    infiltration: {
                      on: {
                        CHANGE_APPROACH: 'available',
                        INFILTRATION_FAILED: 'compromised'
                      }
                    },
                    surveillance: {
                      on: {
                        CHANGE_APPROACH: 'available',
                        SURVEILLANCE_COMPLETE: 'available'
                      }
                    },
                    social: {
                      on: {
                        CHANGE_APPROACH: 'available',
                        SOCIAL_FAILED: 'compromised'
                      }
                    },
                    compromised: {
                      after: {
                        COMPROMISE_RECOVERY_TIME: 'available'
                      }
                    }
                  }
                }
              }
            },
            missionPaused: {
              on: {
                RESUME_MISSION: 'missionInProgress'
              }
            },
            missionAborted: {
              on: {
                DEBRIEF: 'missionDebrief'
              }
            },
            missionDebrief: {
              entry: ['calculateMissionScore', 'updateMissionHistory'],
              on: {
                START_NEW_MISSION: 'missionPlanning',
                RETURN_TO_HUB: 'missionPlanning'
              }
            }
          }
        },
        timeEvents: {
          initial: 'monitoring',
          states: {
            monitoring: {
              on: {
                TIME_WINDOW_OPENED: {
                  actions: 'handleTimeWindowOpening'
                },
                TIME_WINDOW_CLOSED: {
                  actions: 'handleTimeWindowClosing'
                },
                GUARD_ROTATION_CHANGED: {
                  actions: 'updateGuardPatterns'
                },
                VAMPIRE_ACTIVITY_DETECTED: {
                  actions: 'updateVampireSchedule'
                },
                CONTACT_AVAILABILITY_CHANGED: {
                  actions: 'updateContactWindow'
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
    // Previous guards remain...
    hasTimeDelayTokens: (context) => context.missionResources.timeDelayTokens > 0,
    hasTimeAccelerationTokens: (context) => context.missionResources.timeAccelerationTokens > 0,
    isWithinTimeWindow: (context, event) => {
      const window = context.timeConstraints.objectiveTimeWindows[event.objectiveId];
      return context.globalMissionTimer >= window.start && context.globalMissionTimer <= window.end;
    }
  },
  actions: {
    // Previous actions remain...
    initializeMissionTimer: assign({
      globalMissionTimer: 0,
      missionStates: (context) => ({
        ...context.missionStates,
        missionPhase: 'active'
      })
    }),
    setupTimeWindows: assign({
      timeConstraints: (context, event) => ({
        ...context.timeConstraints,
        objectiveTimeWindows: event.timeWindows,
        guardRotations: event.guardSchedule,
        vampireFeedings: event.vampireSchedule
      })
    }),
    handleTimeWindowOpening: assign({
      missionStates: (context, event) => ({
        ...context.missionStates,
        availableObjectives: [...context.missionStates.availableObjectives, event.objectiveId]
      })
    }),
    handleTimeWindowClosing: assign({
      missionStates: (context, event) => ({
        ...context.missionStates,
        availableObjectives: context.missionStates.availableObjectives
          .filter(id => id !== event.objectiveId)
      })
    }),
    consumeTimeDelayToken: assign({
      missionResources: (context) => ({
        ...context.missionResources,
        timeDelayTokens: context.missionResources.timeDelayTokens - 1
      })
    }),
    consumeTimeAccelerationToken: assign({
      missionResources: (context) => ({
        ...context.missionResources,
        timeAccelerationTokens: context.missionResources.timeAccelerationTokens - 1
      })
    }),
    pauseObjectiveTimers: (context) => {
      // Implementation for pausing all active objective timers
    },
    accelerateObjectiveTimers: (context) => {
      // Implementation for accelerating all active objective timers
    },
    calculateMissionScore: assign({
      missionHistory: (context) => {
        const newMissionRecord = {
          timeCompleted: context.globalMissionTimer,
          objectivesCompleted: context.missionStates.secondaryObjectives
            .filter(obj => obj.status === 'completed'),
          timeTokensUsed: 3 - context.missionResources.timeDelayTokens,
          // Additional scoring metrics
        };
        return [...context.missionHistory, newMissionRecord];
      }
    })
  }
});

export default gameStateMachine;