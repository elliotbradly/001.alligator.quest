import { createMachine, assign } from 'xstate';

const MAX_CHARACTERS = 5;

const hexagon = createMachine({
  id: 'terrainHex',
  initial: 'idle',
  context: {
    elevation: 0,
    moisture: 0,
    temperature: 20,
    resources: [],
    owner: null,
    developmentLevel: 0,
    terrain: 'plains',
    weatherEffects: [],
    // Updated character management properties
    characters: [], // Array of characters, max length 5
    characterLockTimer: null,
    lastCharacterMoveTime: null,
    isCharacterMovementLocked: false
  },
  states: {

    idle: {
      on: {
        BEGIN: {
          target: 'firstStep',
        },
      },
    },
    firstStep: {
      after: {
        3000: 'secondStep',
      },
    },
    secondStep: {
      after: {
        3000: 'thirdStep',
      },
    },
    thirdStep: {
      after: {
        3000: 'firstStep',
      },
    },

    unclaimed: {
      on: {
        CLAIM: {
          target: 'claimed',
          actions: assign({
            owner: (_, event) => event.player
          })
        },
        MODIFY_TERRAIN: {
          internal: true,
          actions: assign({
            terrain: (_, event) => event.newTerrain,
            elevation: (_, event) => event.newElevation || 0
          })
        },
        CHARACTER_ENTER: {
          internal: true,
          cond: (context) => (
            context.characters.length < MAX_CHARACTERS && 
            !context.isCharacterMovementLocked
          ),
          actions: assign({
            characters: (context, event) => [...context.characters, event.character],
            lastCharacterMoveTime: () => Date.now(),
            isCharacterMovementLocked: true,
            characterLockTimer: () => setTimeout(() => {
              return { type: 'UNLOCK_CHARACTER_MOVEMENT' };
            }, 500)
          })
        }
      }
    },
    claimed: {
      on: {
        DEVELOP: {
          target: 'developing',
          cond: (context) => context.developmentLevel < 3,
          actions: assign({
            developmentLevel: (context) => context.developmentLevel + 1
          })
        },
        ADD_RESOURCE: {
          internal: true,
          actions: assign({
            resources: (context, event) => [...context.resources, event.resource]
          })
        },
        WEATHER_EVENT: {
          internal: true,
          actions: assign({
            weatherEffects: (context, event) => [...context.weatherEffects, event.effect]
          })
        },
        ABANDONED: 'degrading',
        CHARACTER_ENTER: {
          internal: true,
          cond: (context) => (
            context.characters.length < MAX_CHARACTERS && 
            !context.isCharacterMovementLocked
          ),
          actions: assign({
            characters: (context, event) => [...context.characters, event.character],
            lastCharacterMoveTime: () => Date.now(),
            isCharacterMovementLocked: true,
            characterLockTimer: () => setTimeout(() => {
              return { type: 'UNLOCK_CHARACTER_MOVEMENT' };
            }, 500)
          })
        },
        CHARACTER_EXIT: {
          internal: true,
          cond: (context, event) => 
            context.characters.some(char => char.id === event.characterId),
          actions: assign({
            characters: (context, event) => 
              context.characters.filter(char => char.id !== event.characterId)
          })
        },
        FORMATION_CHANGE: {
          internal: true,
          actions: assign({
            characters: (context, event) => {
              const updatedCharacters = [...context.characters];
              // Reorder characters based on formation positions
              event.formation.forEach((charId, index) => {
                const charIndex = updatedCharacters.findIndex(c => c.id === charId);
                if (charIndex !== -1 && index < MAX_CHARACTERS) {
                  const temp = updatedCharacters[index];
                  updatedCharacters[index] = updatedCharacters[charIndex];
                  updatedCharacters[charIndex] = temp;
                }
              });
              return updatedCharacters;
            }
          })
        }
      }
    },
    developing: {
      after: {
        5000: 'claimed'
      },
      on: {
        CANCEL_DEVELOPMENT: {
          target: 'claimed',
          actions: assign({
            developmentLevel: (context) => Math.max(0, context.developmentLevel - 1)
          })
        },
        CHARACTER_ENTER: {
          internal: true,
          cond: (context) => (
            context.characters.length < MAX_CHARACTERS && 
            !context.isCharacterMovementLocked
          ),
          actions: assign({
            characters: (context, event) => [...context.characters, event.character],
            lastCharacterMoveTime: () => Date.now()
          })
        }
      }
    },
    degrading: {
      after: {
        10000: 'unclaimed'
      },
      entry: assign({
        owner: null,
        developmentLevel: 0,
        resources: [],
        weatherEffects: [],
        characters: [],
        characterLockTimer: null
      }),
      on: {
        RECLAIM: {
          target: 'claimed',
          actions: assign({
            owner: (_, event) => event.player
          })
        },
        CHARACTER_ENTER: {
          internal: true,
          cond: (context) => (
            context.characters.length < MAX_CHARACTERS && 
            !context.isCharacterMovementLocked
          ),
          actions: assign({
            characters: (context, event) => [...context.characters, event.character],
            lastCharacterMoveTime: () => Date.now()
          })
        }
      }
    }
  },
  on: {
    UPDATE_CLIMATE: {
      internal: true,
      actions: assign({
        temperature: (_, event) => event.temperature,
        moisture: (_, event) => event.moisture
      })
    },
    UNLOCK_CHARACTER_MOVEMENT: {
      internal: true,
      actions: assign({
        isCharacterMovementLocked: false,
        characterLockTimer: null
      })
    }
  }
});

// Example usage and event handlers
const hexTileEvents = {
  claim: (player) => ({ type: 'CLAIM', player }),
  develop: () => ({ type: 'DEVELOP' }),
  addResource: (resource) => ({ type: 'ADD_RESOURCE', resource }),
  updateClimate: (temperature, moisture) => ({
    type: 'UPDATE_CLIMATE',
    temperature,
    moisture
  }),
  modifyTerrain: (newTerrain, newElevation) => ({
    type: 'MODIFY_TERRAIN',
    newTerrain,
    newElevation
  }),
  triggerWeather: (effect) => ({
    type: 'WEATHER_EVENT',
    effect
  }),
  abandon: () => ({ type: 'ABANDONED' }),
  reclaim: (player) => ({ type: 'RECLAIM', player }),
  // Updated character-related events
  characterEnter: (character) => ({
    type: 'CHARACTER_ENTER',
    character // Should include at minimum { id, name, type }
  }),
  characterExit: (characterId) => ({
    type: 'CHARACTER_EXIT',
    characterId
  }),
  changeFormation: (formation) => ({
    type: 'FORMATION_CHANGE',
    formation // Array of character IDs in desired order
  })
};

export { hexagon, hexTileEvents };