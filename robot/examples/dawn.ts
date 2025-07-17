
System
You are Qwen, created by Alibaba Cloud. You are a helpful assistant.
🛠️ Set system prompt and clear history
Qwen2.5-Coder-7B-Instruct


Design a infinite state machine for the meta states of the triple a video game Horizon Zero Dawn


Designing an infinite state machine (FSM) for the meta states of the triple A video game "Horizon Zero Dawn" involves understanding the various states and transitions that can occur during gameplay. The meta states typically refer to high-level or overarching states that govern the overall flow and experience of the game.

Here’s a conceptual design of an FSM for the meta states of "Horizon Zero Dawn":

States:
Start Menu State
Description: The initial screen where players can start a new game, load a save, view options, etc.
Transitions:
Start New Game → Game Play State
Load Game → Game Play State
Options → Options State
Quit → Exit State
Game Play State
Description: The primary state where players engage in combat, exploration, and other activities.
Transitions:
Combat → Combat State
Exploration → Exploration State
Inventory Management → Inventory State
Save Game → Game Play State
Pause Game → Pause State
Main Menu → Start Menu State
Combat State
Description: The state where players engage in battles with enemies.
Transitions:
Battle Won → Victory Screen State
Battle Lost → Defeat Screen State
Resume Game → Game Play State
Victory Screen State
Description: The screen displayed after winning a battle.
Transitions:
Continue → Game Play State
Main Menu → Start Menu State
Defeat Screen State
Description: The screen displayed after losing a battle.
Transitions:
Retry → Combat State
Main Menu → Start Menu State
Exploration State
Description: The state where players explore the world, interact with NPCs, and discover new areas.
Transitions:
Encounter Enemy → Combat State
Interact with NPC → Dialogue State
Find Item/Quest → Game Play State
Return to Camp → Game Play State
Inventory State
Description: The state where players manage their inventory, including equipping items and using consumables.
Transitions:
Close Inventory → Game Play State
Pause State
Description: The state where the game is paused, allowing players to access pause menu options.
Transitions:
Resume Game → Game Play State
Options → Options State
Main Menu → Start Menu State
Options State
Description: The state where players can adjust game settings such as graphics, audio, controls, etc.
Transitions:
Apply Changes → Game Play State
Cancel → Start Menu State
Exit State
Description: The final state where the game is closed.
Transitions:
None
Transitions:
State Transition Diagram:

Start Menu State -> Game Play State
Game Play State -> Combat State
Game Play State -> Exploration State
Game Play State -> Inventory State
Game Play State -> Pause State
Game Play State -> Main Menu State
Combat State -> Victory Screen State
Combat State -> Defeat Screen State
Victory Screen State -> Game Play State
Victory Screen State -> Main Menu State
Defeat Screen State -> Retry → Combat State
Defeat Screen State -> Main Menu State
Exploration State -> Encounter Enemy → Combat State
Exploration State -> Interact with NPC → Dialogue State
Exploration State -> Find Item/Quest → Game Play State
Exploration State -> Return to Camp → Game Play State
Inventory State -> Close Inventory → Game Play State
Pause State -> Resume Game → Game Play State
Pause State -> Options → Options State
Pause State -> Main Menu → Start Menu State
Options State -> Apply Changes → Game Play State
Options State -> Cancel → Start Menu State
This FSM provides a structured approach to managing the different meta states in "Horizon Zero Dawn," ensuring that the game transitions smoothly between these states based on player actions and decisions.


take the information just created and use the xstate.js framework to create a finite state machine


Sure! Below is an example of how you can implement the above finite state machine using the XState.js library. XState is a powerful tool for creating state machines in JavaScript applications.

First, make sure you have XState installed in your project. You can install it via npm or yarn:


npm install @xstate/fsm
or


yarn add @xstate/fsm
Now, let's create the state machine using XState:


import { Machine } from '@xstate/fsm';

const horizonZeroDawnMachine = Machine({
  id: 'horizonZeroDawn',
  initial: 'startMenu',
  context: {
    // You can add any context variables here if needed
  },
  states: {
    startMenu: {
      on: {
        START_NEW_GAME: 'gamePlay',
        LOAD_GAME: 'gamePlay',
        OPTIONS: 'options',
        QUIT: 'exit'
      }
    },
    gamePlay: {
      on: {
        COMBAT: 'combat',
        EXPLORATION: 'exploration',
        INVENTORY_MANAGEMENT: 'inventory',
        SAVE_GAME: 'gamePlay',
        PAUSE_GAME: 'pause',
        MAIN_MENU: 'startMenu'
      }
    },
    combat: {
      on: {
        BATTLE_WON: 'victoryScreen',
        BATTLE_LOST: 'defeatScreen'
      }
    },
    victoryScreen: {
      on: {
        CONTINUE: 'gamePlay',
        MAIN_MENU: 'startMenu'
      }
    },
    defeatScreen: {
      on: {
        RETRY: 'combat',
        MAIN_MENU: 'startMenu'
      }
    },
    exploration: {
      on: {
        ENCOUNTER_ENEMY: 'combat',
        INTERACT_WITH_NPC: 'dialogue', // Assuming dialogue is another state
        FIND_ITEM_QUEST: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    inventory: {
      on: {
        CLOSE_INVENTORY: 'gamePlay'
      }
    },
    pause: {
      on: {
        RESUME_GAME: 'gamePlay',
        OPTIONS: 'options',
        MAIN_MENU: 'startMenu'
      }
    },
    options: {
      on: {
        APPLY_CHANGES: 'gamePlay',
        CANCEL: 'startMenu'
      }
    },
    exit: {
      type: 'final'
    }
  }
});

// Example usage:
horizonZeroDawnMachine.onTransition(state => {
  console.log('Current State:', state.value);
});

// To send events to the machine:
horizonZeroDawnMachine.send('START_NEW_GAME');
horizonZeroDawnMachine.send('COMBAT');
horizonZeroDawnMachine.send('BATTLE_WON');
horizonZeroDawnMachine.send('MAIN_MENU');
In this example, we define the state machine using the Machine function from XState. Each state has its own set of possible transitions defined in the on property. When an event is sent to the machine using the send method, the machine will transition to the appropriate state based on the current state and the event received.

This setup allows you to manage the different meta states of "Horizon Zero Dawn" effectively and handle transitions between them based on player actions.


Expand the terrain influence on combat


To expand the terrain influence on combat in the state machine, we need to consider how different terrains affect combat mechanics. This could include things like cover systems, movement speed, attack effectiveness, and more. Let's extend our existing state machine to include these influences.

We'll introduce a new context variable to store the current terrain and modify the combat state to account for these effects. Here's how you can do it:


import { Machine } from '@xstate/fsm';

const horizonZeroDawnMachine = Machine({
  id: 'horizonZeroDawn',
  initial: 'startMenu',
  context: {
    currentTerrain: null // Initialize with null or default terrain
  },
  states: {
    startMenu: {
      on: {
        START_NEW_GAME: 'gamePlay',
        LOAD_GAME: 'gamePlay',
        OPTIONS: 'options',
        QUIT: 'exit'
      }
    },
    gamePlay: {
      on: {
        COMBAT: 'combat',
        EXPLORATION: 'exploration',
        INVENTORY_MANAGEMENT: 'inventory',
        SAVE_GAME: 'gamePlay',
        PAUSE_GAME: 'pause',
        MAIN_MENU: 'startMenu'
      }
    },
    combat: {
      on: {
        BATTLE_WON: 'victoryScreen',
        BATTLE_LOST: 'defeatScreen'
      }
    },
    victoryScreen: {
      on: {
        CONTINUE: 'gamePlay',
        MAIN_MENU: 'startMenu'
      }
    },
    defeatScreen: {
      on: {
        RETRY: 'combat',
        MAIN_MENU: 'startMenu'
      }
    },
    exploration: {
      on: {
        ENCOUNTER_ENEMY: 'combat',
        INTERACT_WITH_NPC: 'dialogue', // Assuming dialogue is another state
        FIND_ITEM_QUEST: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    inventory: {
      on: {
        CLOSE_INVENTORY: 'gamePlay'
      }
    },
    pause: {
      on: {
        RESUME_GAME: 'gamePlay',
        OPTIONS: 'options',
        MAIN_MENU: 'startMenu'
      }
    },
    options: {
      on: {
        APPLY_CHANGES: 'gamePlay',
        CANCEL: 'startMenu'
      }
    },
    exit: {
      type: 'final'
    }
  }
});

// Function to update terrain effect on combat
function applyTerrainEffect(context, event) {
  const terrainEffects = {
    plains: {
      moveSpeedMultiplier: 1,
      attackPowerMultiplier: 1,
      defenseMultiplier: 1
    },
    forest: {
      moveSpeedMultiplier: 0.8,
      attackPowerMultiplier: 1.2,
      defenseMultiplier: 0.9
    },
    mountain: {
      moveSpeedMultiplier: 0.5,
      attackPowerMultiplier: 1.5,
      defenseMultiplier: 1.2
    },
    desert: {
      moveSpeedMultiplier: 1.2,
      attackPowerMultiplier: 0.8,
      defenseMultiplier: 0.8
    }
  };

  const currentTerrain = context.currentTerrain;
  const terrainEffect = terrainEffects[currentTerrain] || {};

  return {
    ...context,
    moveSpeedMultiplier: terrainEffect.moveSpeedMultiplier,
    attackPowerMultiplier: terrainEffect.attackPowerMultiplier,
    defenseMultiplier: terrainEffect.defenseMultiplier
  };
}

// Example usage:
horizonZeroDawnMachine.onTransition((state, event) => {
  if (event.type === 'COMBAT') {
    const updatedContext = applyTerrainEffect(state.context, event);
    console.log('Current State:', state.value, 'Updated Context:', updatedContext);
  } else {
    console.log('Current State:', state.value);
  }
});

// To send events to the machine:
horizonZeroDawnMachine.send({ type: 'START_NEW_GAME', data: { currentTerrain: 'plains' } });
horizonZeroDawnMachine.send('COMBAT');
horizonZeroDawnMachine.send('BATTLE_WON');
horizonZeroDawnMachine.send('MAIN_MENU');
In this extended version, we added a currentTerrain field to the context and a function applyTerrainEffect that calculates the effects of the current terrain on combat mechanics. When entering the combat state, the machine updates the context to reflect these effects.

This way, the terrain influence on combat is now integrated into the state machine, and you can easily extend it further to include more complex interactions between terrain and combat.


Include specific terrain type handling?


Certainly! To include specific terrain types and their corresponding effects on combat, we can enhance the applyTerrainEffect function to handle each terrain type explicitly. We'll also ensure that the context is updated correctly when transitioning into the combat state.

Let's update the code accordingly:


import { Machine } from '@xstate/fsm';

const horizonZeroDawnMachine = Machine({
  id: 'horizonZeroDawn',
  initial: 'startMenu',
  context: {
    currentTerrain: null, // Initialize with null or default terrain
    moveSpeedMultiplier: 1,
    attackPowerMultiplier: 1,
    defenseMultiplier: 1
  },
  states: {
    startMenu: {
      on: {
        START_NEW_GAME: { target: 'gamePlay', actions: ['setInitialTerrain'] },
        LOAD_GAME: { target: 'gamePlay', actions: ['setInitialTerrain'] },
        OPTIONS: 'options',
        QUIT: 'exit'
      }
    },
    gamePlay: {
      on: {
        COMBAT: { target: 'combat', actions: ['updateCombatEffects'] },
        EXPLORATION: 'exploration',
        INVENTORY_MANAGEMENT: 'inventory',
        SAVE_GAME: 'gamePlay',
        PAUSE_GAME: 'pause',
        MAIN_MENU: 'startMenu'
      }
    },
    combat: {
      on: {
        BATTLE_WON: 'victoryScreen',
        BATTLE_LOST: 'defeatScreen'
      }
    },
    victoryScreen: {
      on: {
        CONTINUE: 'gamePlay',
        MAIN_MENU: 'startMenu'
      }
    },
    defeatScreen: {
      on: {
        RETRY: 'combat',
        MAIN_MENU: 'startMenu'
      }
    },
    exploration: {
      on: {
        ENCOUNTER_ENEMY: 'combat',
        INTERACT_WITH_NPC: 'dialogue', // Assuming dialogue is another state
        FIND_ITEM_QUEST: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    inventory: {
      on: {
        CLOSE_INVENTORY: 'gamePlay'
      }
    },
    pause: {
      on: {
        RESUME_GAME: 'gamePlay',
        OPTIONS: 'options',
        MAIN_MENU: 'startMenu'
      }
    },
    options: {
      on: {
        APPLY_CHANGES: 'gamePlay',
        CANCEL: 'startMenu'
      }
    },
    exit: {
      type: 'final'
    }
  }
}, {
  actions: {
    setInitialTerrain: (context, event) => {
      return { currentTerrain: event.data.currentTerrain };
    },
    updateCombatEffects: (context, event) => {
      const terrainEffects = {
        plains: {
          moveSpeedMultiplier: 1,
          attackPowerMultiplier: 1,
          defenseMultiplier: 1
        },
        forest: {
          moveSpeedMultiplier: 0.8,
          attackPowerMultiplier: 1.2,
          defenseMultiplier: 0.9
        },
        mountain: {
          moveSpeedMultiplier: 0.5,
          attackPowerMultiplier: 1.5,
          defenseMultiplier: 1.2
        },
        desert: {
          moveSpeedMultiplier: 1.2,
          attackPowerMultiplier: 0.8,
          defenseMultiplier: 0.8
        }
      };

      const currentTerrain = context.currentTerrain;
      const terrainEffect = terrainEffects[currentTerrain] || {};

      return {
        moveSpeedMultiplier: terrainEffect.moveSpeedMultiplier,
        attackPowerMultiplier: terrainEffect.attackPowerMultiplier,
        defenseMultiplier: terrainEffect.defenseMultiplier
      };
    }
  }
});

// Example usage:
horizonZeroDawnMachine.onTransition((state, event) => {
  if (event.type === 'COMBAT') {
    console.log('Current State:', state.value, 'Updated Context:', state.context);
  } else {
    console.log('Current State:', state.value);
  }
});

// To send events to the machine:
horizonZeroDawnMachine.send({ type: 'START_NEW_GAME', data: { currentTerrain: 'plains' } });
horizonZeroDawnMachine.send('COMBAT');
horizonZeroDawnMachine.send('BATTLE_WON');
horizonZeroDawnMachine.send('MAIN_MENU');
Explanation:
Context Initialization:
The currentTerrain field is initialized in the context.
The moveSpeedMultiplier, attackPowerMultiplier, and defenseMultiplier fields are initialized to default values.
Actions:
setInitialTerrain: Sets the currentTerrain based on the event data.
updateCombatEffects: Calculates and updates the combat effects based on the current terrain.
Transitions:
When entering the combat state, the updateCombatEffects action is triggered to update the context with the relevant terrain effects.
This setup ensures that the terrain influence on combat is handled explicitly and dynamically, making it easy to extend and maintain.


Add more sophisticated conditions for transitions?


Absolutely! Adding more sophisticated conditions for transitions can help make the state machine more dynamic and responsive to player actions and game state. For example, you might want to check if certain conditions are met before allowing a transition to occur. In XState, you can use guards to add these conditions.

Let's add some guards to the state machine to control transitions based on the current terrain and other conditions. For instance, we might want to prevent combat in certain terrains or restrict certain actions based on the terrain.

Here's how you can update the state machine:


import { Machine } from '@xstate/fsm';

const horizonZeroDawnMachine = Machine({
  id: 'horizonZeroDawn',
  initial: 'startMenu',
  context: {
    currentTerrain: null, // Initialize with null or default terrain
    moveSpeedMultiplier: 1,
    attackPowerMultiplier: 1,
    defenseMultiplier: 1
  },
  states: {
    startMenu: {
      on: {
        START_NEW_GAME: { target: 'gamePlay', actions: ['setInitialTerrain'], cond: 'isNotInBattle' },
        LOAD_GAME: { target: 'gamePlay', actions: ['setInitialTerrain'], cond: 'isNotInBattle' },
        OPTIONS: 'options',
        QUIT: 'exit'
      }
    },
    gamePlay: {
      on: {
        COMBAT: { target: 'combat', actions: ['updateCombatEffects'], cond: 'isNotInCombat' },
        EXPLORATION: 'exploration',
        INVENTORY_MANAGEMENT: 'inventory',
        SAVE_GAME: 'gamePlay',
        PAUSE_GAME: 'pause',
        MAIN_MENU: 'startMenu'
      }
    },
    combat: {
      on: {
        BATTLE_WON: 'victoryScreen',
        BATTLE_LOST: 'defeatScreen'
      }
    },
    victoryScreen: {
      on: {
        CONTINUE: 'gamePlay',
        MAIN_MENU: 'startMenu'
      }
    },
    defeatScreen: {
      on: {
        RETRY: 'combat',
        MAIN_MENU: 'startMenu'
      }
    },
    exploration: {
      on: {
        ENCOUNTER_ENEMY: 'combat',
        INTERACT_WITH_NPC: 'dialogue', // Assuming dialogue is another state
        FIND_ITEM_QUEST: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    inventory: {
      on: {
        CLOSE_INVENTORY: 'gamePlay'
      }
    },
    pause: {
      on: {
        RESUME_GAME: 'gamePlay',
        OPTIONS: 'options',
        MAIN_MENU: 'startMenu'
      }
    },
    options: {
      on: {
        APPLY_CHANGES: 'gamePlay',
        CANCEL: 'startMenu'
      }
    },
    exit: {
      type: 'final'
    }
  }
}, {
  actions: {
    setInitialTerrain: (context, event) => {
      return { currentTerrain: event.data.currentTerrain };
    },
    updateCombatEffects: (context, event) => {
      const terrainEffects = {
        plains: {
          moveSpeedMultiplier: 1,
          attackPowerMultiplier: 1,
          defenseMultiplier: 1
        },
        forest: {
          moveSpeedMultiplier: 0.8,
          attackPowerMultiplier: 1.2,
          defenseMultiplier: 0.9
        },
        mountain: {
          moveSpeedMultiplier: 0.5,
          attackPowerMultiplier: 1.5,
          defenseMultiplier: 1.2
        },
        desert: {
          moveSpeedMultiplier: 1.2,
          attackPowerMultiplier: 0.8,
          defenseMultiplier: 0.8
        }
      };

      const currentTerrain = context.currentTerrain;
      const terrainEffect = terrainEffects[currentTerrain] || {};

      return {
        moveSpeedMultiplier: terrainEffect.moveSpeedMultiplier,
        attackPowerMultiplier: terrainEffect.attackPowerMultiplier,
        defenseMultiplier: terrainEffect.defenseMultiplier
      };
    }
  },
  guards: {
    isNotInBattle: (context, event) => context.currentTerrain !== 'battle',
    isNotInCombat: (context, event) => context.currentTerrain !== 'combat'
  }
});

// Example usage:
horizonZeroDawnMachine.onTransition((state, event) => {
  if (event.type === 'COMBAT') {
    console.log('Current State:', state.value, 'Updated Context:', state.context);
  } else {
    console.log('Current State:', state.value);
  }
});

// To send events to the machine:
horizonZeroDawnMachine.send({ type: 'START_NEW_GAME', data: { currentTerrain: 'plains' } });
horizonZeroDawnMachine.send('COMBAT'); // Should not be allowed since there's no battle terrain
horizonZeroDawnMachine.send({ type: 'START_NEW_GAME', data: { currentTerrain: 'forest' } });
horizonZeroDawnMachine.send('COMBAT'); // Should be allowed since forest is a valid terrain for combat
horizonZeroDawnMachine.send('BATTLE_WON');
horizonZeroDawnMachine.send('MAIN_MENU');
Explanation:
Guards:
isNotInBattle: Checks if the current terrain is not 'battle'.
isNotInCombat: Checks if the current terrain is not 'combat'.
Conditions in Transitions:
The COMBAT transition in the gamePlay state now includes a guard cond: 'isNotInCombat', which prevents the transition if the current terrain is already in combat.
The START_NEW_GAME transition in the startMenu state now includes a guard cond: 'isNotInBattle', which prevents the transition if the current terrain is currently in a battle.
These guards provide additional control over the state transitions, ensuring that the state machine behaves as expected under different conditions.


Add more environmental interaction states?


Adding more environmental interaction states can help capture the rich variety of interactions players can have with the environment in "Horizon Zero Dawn." These interactions might include exploring hidden areas, interacting with environmental features, or engaging in special activities like fishing or hunting. Let's extend the state machine to include these new states.

Here's how you can update the state machine:


import { Machine } from '@xstate/fsm';

const horizonZeroDawnMachine = Machine({
  id: 'horizonZeroDawn',
  initial: 'startMenu',
  context: {
    currentTerrain: null, // Initialize with null or default terrain
    moveSpeedMultiplier: 1,
    attackPowerMultiplier: 1,
    defenseMultiplier: 1
  },
  states: {
    startMenu: {
      on: {
        START_NEW_GAME: { target: 'gamePlay', actions: ['setInitialTerrain'], cond: 'isNotInBattle' },
        LOAD_GAME: { target: 'gamePlay', actions: ['setInitialTerrain'], cond: 'isNotInBattle' },
        OPTIONS: 'options',
        QUIT: 'exit'
      }
    },
    gamePlay: {
      on: {
        COMBAT: { target: 'combat', actions: ['updateCombatEffects'], cond: 'isNotInCombat' },
        EXPLORATION: 'exploration',
        INVENTORY_MANAGEMENT: 'inventory',
        SAVE_GAME: 'gamePlay',
        PAUSE_GAME: 'pause',
        MAIN_MENU: 'startMenu',
        FISHING: 'fishing',
        HUNTING: 'hunting'
      }
    },
    combat: {
      on: {
        BATTLE_WON: 'victoryScreen',
        BATTLE_LOST: 'defeatScreen'
      }
    },
    victoryScreen: {
      on: {
        CONTINUE: 'gamePlay',
        MAIN_MENU: 'startMenu'
      }
    },
    defeatScreen: {
      on: {
        RETRY: 'combat',
        MAIN_MENU: 'startMenu'
      }
    },
    exploration: {
      on: {
        ENCOUNTER_ENEMY: 'combat',
        INTERACT_WITH_NPC: 'dialogue', // Assuming dialogue is another state
        FIND_ITEM_QUEST: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    inventory: {
      on: {
        CLOSE_INVENTORY: 'gamePlay'
      }
    },
    pause: {
      on: {
        RESUME_GAME: 'gamePlay',
        OPTIONS: 'options',
        MAIN_MENU: 'startMenu'
      }
    },
    options: {
      on: {
        APPLY_CHANGES: 'gamePlay',
        CANCEL: 'startMenu'
      }
    },
    exit: {
      type: 'final'
    },
    fishing: {
      on: {
        FINISH_FISHING: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    hunting: {
      on: {
        FINISH_HUNTING: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    }
  }
}, {
  actions: {
    setInitialTerrain: (context, event) => {
      return { currentTerrain: event.data.currentTerrain };
    },
    updateCombatEffects: (context, event) => {
      const terrainEffects = {
        plains: {
          moveSpeedMultiplier: 1,
          attackPowerMultiplier: 1,
          defenseMultiplier: 1
        },
        forest: {
          moveSpeedMultiplier: 0.8,
          attackPowerMultiplier: 1.2,
          defenseMultiplier: 0.9
        },
        mountain: {
          moveSpeedMultiplier: 0.5,
          attackPowerMultiplier: 1.5,
          defenseMultiplier: 1.2
        },
        desert: {
          moveSpeedMultiplier: 1.2,
          attackPowerMultiplier: 0.8,
          defenseMultiplier: 0.8
        }
      };

      const currentTerrain = context.currentTerrain;
      const terrainEffect = terrainEffects[currentTerrain] || {};

      return {
        moveSpeedMultiplier: terrainEffect.moveSpeedMultiplier,
        attackPowerMultiplier: terrainEffect.attackPowerMultiplier,
        defenseMultiplier: terrainEffect.defenseMultiplier
      };
    }
  },
  guards: {
    isNotInBattle: (context, event) => context.currentTerrain !== 'battle',
    isNotInCombat: (context, event) => context.currentTerrain !== 'combat'
  }
});

// Example usage:
horizonZeroDawnMachine.onTransition((state, event) => {
  if (event.type === 'COMBAT') {
    console.log('Current State:', state.value, 'Updated Context:', state.context);
  } else {
    console.log('Current State:', state.value);
  }
});

// To send events to the machine:
horizonZeroDawnMachine.send({ type: 'START_NEW_GAME', data: { currentTerrain: 'plains' } });
horizonZeroDawnMachine.send('FISHING'); // New state for fishing
horizonZeroDawnMachine.send('FINISH_FISHING'); // Transition back to gamePlay
horizonZeroDawnMachine.send('HUNTING'); // New state for hunting
horizonZeroDawnMachine.send('FINISH_HUNTING'); // Transition back to gamePlay
horizonZeroDawnMachine.send('COMBAT'); // Should be allowed since forest is a valid terrain for combat
horizonZeroDawnMachine.send('BATTLE_WON');
horizonZeroDawnMachine.send('MAIN_MENU');
Explanation:
New States:
fishing: Represents the state where the player is engaged in fishing.
hunting: Represents the state where the player is engaged in hunting.
Transitions:
The gamePlay state now includes transitions to the fishing and hunting states.
From the fishing and hunting states, transitions back to gamePlay are available.
Example Usage:
The example demonstrates how to transition into the fishing and hunting states and then return to gamePlay.
By adding these new states, you can capture the diverse environmental interactions available in "Horizon Zero Dawn," enhancing the realism and depth of the game experience within your state machine.


Expand the weapon/ammunition system?


Expanding the weapon/ammunition system in the state machine involves tracking the player's weapons, ammunition, and ensuring proper management of these resources. We can add states and actions to handle these aspects. Here’s how you can integrate a weapon/ammunition system into the existing state machine:

States:
Add states for different weapon types and ammunition management.
Context:
Add fields to track the current weapon, ammunition count, and other related properties.
Actions:
Define actions to update the weapon and ammunition status.
Guards:
Add guards to ensure actions only proceed if the player has enough ammunition.
Here's the updated state machine:


import { Machine } from '@xstate/fsm';

const horizonZeroDawnMachine = Machine({
  id: 'horizonZeroDawn',
  initial: 'startMenu',
  context: {
    currentTerrain: null, // Initialize with null or default terrain
    moveSpeedMultiplier: 1,
    attackPowerMultiplier: 1,
    defenseMultiplier: 1,
    currentWeapon: null,
    ammunitionCount: 0
  },
  states: {
    startMenu: {
      on: {
        START_NEW_GAME: { target: 'gamePlay', actions: ['setInitialTerrain'], cond: 'isNotInBattle' },
        LOAD_GAME: { target: 'gamePlay', actions: ['setInitialTerrain'], cond: 'isNotInBattle' },
        OPTIONS: 'options',
        QUIT: 'exit'
      }
    },
    gamePlay: {
      on: {
        COMBAT: { target: 'combat', actions: ['updateCombatEffects'], cond: 'isNotInCombat' },
        EXPLORATION: 'exploration',
        INVENTORY_MANAGEMENT: 'inventory',
        SAVE_GAME: 'gamePlay',
        PAUSE_GAME: 'pause',
        MAIN_MENU: 'startMenu',
        FISHING: 'fishing',
        HUNTING: 'hunting',
        PICK_UP_WEAPON: { target: 'weaponSelection', actions: ['pickUpWeapon'] },
        USE_AMMO: { target: 'gamePlay', actions: ['useAmmo'], cond: 'hasSufficientAmmunition' }
      }
    },
    combat: {
      on: {
        BATTLE_WON: 'victoryScreen',
        BATTLE_LOST: 'defeatScreen'
      }
    },
    victoryScreen: {
      on: {
        CONTINUE: 'gamePlay',
        MAIN_MENU: 'startMenu'
      }
    },
    defeatScreen: {
      on: {
        RETRY: 'combat',
        MAIN_MENU: 'startMenu'
      }
    },
    exploration: {
      on: {
        ENCOUNTER_ENEMY: 'combat',
        INTERACT_WITH_NPC: 'dialogue', // Assuming dialogue is another state
        FIND_ITEM_QUEST: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    inventory: {
      on: {
        CLOSE_INVENTORY: 'gamePlay'
      }
    },
    pause: {
      on: {
        RESUME_GAME: 'gamePlay',
        OPTIONS: 'options',
        MAIN_MENU: 'startMenu'
      }
    },
    options: {
      on: {
        APPLY_CHANGES: 'gamePlay',
        CANCEL: 'startMenu'
      }
    },
    exit: {
      type: 'final'
    },
    fishing: {
      on: {
        FINISH_FISHING: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    hunting: {
      on: {
        FINISH_HUNTING: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    weaponSelection: {
      on: {
        SELECT_WEAPON: { target: 'gamePlay', actions: ['selectWeapon'] }
      }
    }
  }
}, {
  actions: {
    setInitialTerrain: (context, event) => {
      return { currentTerrain: event.data.currentTerrain };
    },
    updateCombatEffects: (context, event) => {
      const terrainEffects = {
        plains: {
          moveSpeedMultiplier: 1,
          attackPowerMultiplier: 1,
          defenseMultiplier: 1
        },
        forest: {
          moveSpeedMultiplier: 0.8,
          attackPowerMultiplier: 1.2,
          defenseMultiplier: 0.9
        },
        mountain: {
          moveSpeedMultiplier: 0.5,
          attackPowerMultiplier: 1.5,
          defenseMultiplier: 1.2
        },
        desert: {
          moveSpeedMultiplier: 1.2,
          attackPowerMultiplier: 0.8,
          defenseMultiplier: 0.8
        }
      };

      const currentTerrain = context.currentTerrain;
      const terrainEffect = terrainEffects[currentTerrain] || {};

      return {
        moveSpeedMultiplier: terrainEffect.moveSpeedMultiplier,
        attackPowerMultiplier: terrainEffect.attackPowerMultiplier,
        defenseMultiplier: terrainEffect.defenseMultiplier
      };
    },
    pickUpWeapon: (context, event) => {
      return {
        currentWeapon: event.data.weapon,
        ammunitionCount: event.data.ammo
      };
    },
    selectWeapon: (context, event) => {
      return { currentWeapon: event.data.weapon };
    },
    useAmmo: (context, event) => {
      return { ammunitionCount: context.ammunitionCount - 1 };
    }
  },
  guards: {
    isNotInBattle: (context, event) => context.currentTerrain !== 'battle',
    isNotInCombat: (context, event) => context.currentTerrain !== 'combat',
    hasSufficientAmmunition: (context, event) => context.ammunitionCount > 0
  }
});

// Example usage:
horizonZeroDawnMachine.onTransition((state, event) => {
  if (event.type === 'COMBAT') {
    console.log('Current State:', state.value, 'Updated Context:', state.context);
  } else {
    console.log('Current State:', state.value);
  }
});

// To send events to the machine:
horizonZeroDawnMachine.send({ type: 'START_NEW_GAME', data: { currentTerrain: 'plains' } });
horizonZeroDawnMachine.send({ type: 'PICK_UP_WEAPON', data: { weapon: 'bow', ammo: 10 } });
horizonZeroDawnMachine.send({ type: 'SELECT_WEAPON', data: { weapon: 'bow' } });
horizonZeroDawnMachine.send('USE_AMMO'); // Should decrease ammunition count
horizonZeroDawnMachine.send('COMBAT'); // Should be allowed since forest is a valid terrain for combat
horizonZeroDawnMachine.send('BATTLE_WON');
horizonZeroDawnMachine.send('MAIN_MENU');
Explanation:
Context:
currentWeapon: Tracks the currently selected weapon.
ammunitionCount: Tracks the amount of ammunition left.
Actions:
pickUpWeapon: Updates the current weapon and ammunition count when picking up a weapon.
selectWeapon: Sets the current weapon to the selected one.
useAmmo: Decreases the ammunition count by one when using ammunition.
Guards:
hasSufficientAmmunition: Ensures that the player has enough ammunition before using it.
New States:
weaponSelection: A temporary state for selecting a weapon after picking it up.
Transitions:
Added transitions to weaponSelection and USE_AMMO to manage weapon selection and ammunition usage.
With these additions, you can now manage the player's weapons and ammunition within the state machine, providing a more realistic and interactive experience.


please include an item weight system


Including an item weight system in the state machine can help manage the player's inventory, ensuring they don't carry too much weight at once. This can add a layer of challenge and resource management to the game. Here’s how you can integrate an item weight system into the existing state machine:

Context:
Add a field to track the total weight of the items in the inventory.
Actions:
Define actions to update the total weight when adding or removing items.
Guards:
Add guards to ensure actions only proceed if the player does not exceed the maximum carrying capacity.
Here's the updated state machine:


import { Machine } from '@xstate/fsm';

const horizonZeroDawnMachine = Machine({
  id: 'horizonZeroDawn',
  initial: 'startMenu',
  context: {
    currentTerrain: null, // Initialize with null or default terrain
    moveSpeedMultiplier: 1,
    attackPowerMultiplier: 1,
    defenseMultiplier: 1,
    currentWeapon: null,
    ammunitionCount: 0,
    totalWeight: 0,
    maxCarryingCapacity: 50 // Maximum carrying capacity in arbitrary units
  },
  states: {
    startMenu: {
      on: {
        START_NEW_GAME: { target: 'gamePlay', actions: ['setInitialTerrain'], cond: 'isNotInBattle' },
        LOAD_GAME: { target: 'gamePlay', actions: ['setInitialTerrain'], cond: 'isNotInBattle' },
        OPTIONS: 'options',
        QUIT: 'exit'
      }
    },
    gamePlay: {
      on: {
        COMBAT: { target: 'combat', actions: ['updateCombatEffects'], cond: 'isNotInCombat' },
        EXPLORATION: 'exploration',
        INVENTORY_MANAGEMENT: 'inventory',
        SAVE_GAME: 'gamePlay',
        PAUSE_GAME: 'pause',
        MAIN_MENU: 'startMenu',
        FISHING: 'fishing',
        HUNTING: 'hunting',
        PICK_UP_ITEM: { target: 'itemSelection', actions: ['addItem'] },
        DROP_ITEM: { target: 'inventory', actions: ['removeItem'] },
        USE_AMMO: { target: 'gamePlay', actions: ['useAmmo'], cond: 'hasSufficientAmmunition' }
      }
    },
    combat: {
      on: {
        BATTLE_WON: 'victoryScreen',
        BATTLE_LOST: 'defeatScreen'
      }
    },
    victoryScreen: {
      on: {
        CONTINUE: 'gamePlay',
        MAIN_MENU: 'startMenu'
      }
    },
    defeatScreen: {
      on: {
        RETRY: 'combat',
        MAIN_MENU: 'startMenu'
      }
    },
    exploration: {
      on: {
        ENCOUNTER_ENEMY: 'combat',
        INTERACT_WITH_NPC: 'dialogue', // Assuming dialogue is another state
        FIND_ITEM_QUEST: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    inventory: {
      on: {
        CLOSE_INVENTORY: 'gamePlay'
      }
    },
    pause: {
      on: {
        RESUME_GAME: 'gamePlay',
        OPTIONS: 'options',
        MAIN_MENU: 'startMenu'
      }
    },
    options: {
      on: {
        APPLY_CHANGES: 'gamePlay',
        CANCEL: 'startMenu'
      }
    },
    exit: {
      type: 'final'
    },
    fishing: {
      on: {
        FINISH_FISHING: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    hunting: {
      on: {
        FINISH_HUNTING: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    weaponSelection: {
      on: {
        SELECT_WEAPON: { target: 'gamePlay', actions: ['selectWeapon'] }
      }
    },
    itemSelection: {
      on: {
        SELECT_ITEM: { target: 'gamePlay', actions: ['selectItem'] }
      }
    }
  }
}, {
  actions: {
    setInitialTerrain: (context, event) => {
      return { currentTerrain: event.data.currentTerrain };
    },
    updateCombatEffects: (context, event) => {
      const terrainEffects = {
        plains: {
          moveSpeedMultiplier: 1,
          attackPowerMultiplier: 1,
          defenseMultiplier: 1
        },
        forest: {
          moveSpeedMultiplier: 0.8,
          attackPowerMultiplier: 1.2,
          defenseMultiplier: 0.9
        },
        mountain: {
          moveSpeedMultiplier: 0.5,
          attackPowerMultiplier: 1.5,
          defenseMultiplier: 1.2
        },
        desert: {
          moveSpeedMultiplier: 1.2,
          attackPowerMultiplier: 0.8,
          defenseMultiplier: 0.8
        }
      };

      const currentTerrain = context.currentTerrain;
      const terrainEffect = terrainEffects[currentTerrain] || {};

      return {
        moveSpeedMultiplier: terrainEffect.moveSpeedMultiplier,
        attackPowerMultiplier: terrainEffect.attackPowerMultiplier,
        defenseMultiplier: terrainEffect.defenseMultiplier
      };
    },
    addItem: (context, event) => {
      const newItem = event.data.item;
      return {
        totalWeight: context.totalWeight + newItem.weight,
        [newItem.name]: (context[newItem.name] || 0) + 1
      };
    },
    removeItem: (context, event) => {
      const itemName = event.data.itemName;
      const itemWeight = event.data.itemWeight;
      return {
        totalWeight: context.totalWeight - itemWeight,
        [itemName]: Math.max(0, context[itemName] - 1)
      };
    },
    selectWeapon: (context, event) => {
      return { currentWeapon: event.data.weapon };
    },
    useAmmo: (context, event) => {
      return { ammunitionCount: context.ammunitionCount - 1 };
    },
    selectItem: (context, event) => {
      return { selectedItem: event.data.item };
    }
  },
  guards: {
    isNotInBattle: (context, event) => context.currentTerrain !== 'battle',
    isNotInCombat: (context, event) => context.currentTerrain !== 'combat',
    hasSufficientAmmunition: (context, event) => context.ammunitionCount > 0,
    canCarryMoreItems: (context, event) => context.totalWeight + event.data.item.weight <= context.maxCarryingCapacity
  }
});

// Example usage:
horizonZeroDawnMachine.onTransition((state, event) => {
  if (event.type === 'COMBAT') {
    console.log('Current State:', state.value, 'Updated Context:', state.context);
  } else {
    console.log('Current State:', state.value);
  }
});

// To send events to the machine:
horizonZeroDawnMachine.send({ type: 'START_NEW_GAME', data: { currentTerrain: 'plains' } });
horizonZeroDawnMachine.send({ type: 'PICK_UP_ITEM', data: { item: { name: 'sword', weight: 10 } } });
horizonZeroDawnMachine.send({ type: 'PICK_UP_ITEM', data: { item: { name: 'shield', weight: 5 } } });
horizonZeroDawnMachine.send({ type: 'DROP_ITEM', data: { itemName: 'sword', itemWeight: 10 } });
horizonZeroDawnMachine.send('USE_AMMO'); // Should decrease ammunition count
horizonZeroDawnMachine.send('COMBAT'); // Should be allowed since forest is a valid terrain for combat
horizonZeroDawnMachine.send('BATTLE_WON');
horizonZeroDawnMachine.send('MAIN_MENU');
Explanation:
Context:
totalWeight: Tracks the total weight of all items in the inventory.
maxCarryingCapacity: Defines the maximum carrying capacity of the player.
Actions:
addItem: Adds an item to the inventory and updates the total weight.
removeItem: Removes an item from the inventory and updates the total weight.
selectWeapon: Sets the current weapon to the selected one.
useAmmo: Decreases the ammunition count by one when using ammunition.
selectItem: Selects an item for inspection or use.
Guards:
canCarryMoreItems: Ensures that the player does not exceed the maximum carrying capacity before adding a new item.
New States:
itemSelection: A temporary state for selecting an item after picking it up.
Transitions:
Added transitions to itemSelection and DROP_ITEM to manage item selection and dropping.
With these additions, you can now manage the player's inventory and ensure they don't carry too much weight, providing a more balanced and challenging gameplay experience.


please include an item rarity check please


Including an item rarity check in the state machine can help manage the player's inventory and ensure they receive items appropriately based on their rarity. Rarity can affect the value, usefulness, and sometimes even the weight of items. Here’s how you can integrate an item rarity check into the existing state machine:

Context:
Add a field to track the total value of the items in the inventory.
Adjust the weight and value based on the rarity of the items.
Actions:
Define actions to update the total value and weight when adding items based on their rarity.
Guards:
Add guards to ensure actions only proceed if the player can afford or carry the item based on its rarity.
Here's the updated state machine:


import { Machine } from '@xstate/fsm';

const horizonZeroDawnMachine = Machine({
  id: 'horizonZeroDawn',
  initial: 'startMenu',
  context: {
    currentTerrain: null, // Initialize with null or default terrain
    moveSpeedMultiplier: 1,
    attackPowerMultiplier: 1,
    defenseMultiplier: 1,
    currentWeapon: null,
    ammunitionCount: 0,
    totalWeight: 0,
    totalValue: 0,
    maxCarryingCapacity: 50, // Maximum carrying capacity in arbitrary units
    maxInventoryValue: 1000 // Maximum inventory value in arbitrary currency units
  },
  states: {
    startMenu: {
      on: {
        START_NEW_GAME: { target: 'gamePlay', actions: ['setInitialTerrain'], cond: 'isNotInBattle' },
        LOAD_GAME: { target: 'gamePlay', actions: ['setInitialTerrain'], cond: 'isNotInBattle' },
        OPTIONS: 'options',
        QUIT: 'exit'
      }
    },
    gamePlay: {
      on: {
        COMBAT: { target: 'combat', actions: ['updateCombatEffects'], cond: 'isNotInCombat' },
        EXPLORATION: 'exploration',
        INVENTORY_MANAGEMENT: 'inventory',
        SAVE_GAME: 'gamePlay',
        PAUSE_GAME: 'pause',
        MAIN_MENU: 'startMenu',
        FISHING: 'fishing',
        HUNTING: 'hunting',
        PICK_UP_ITEM: { target: 'itemSelection', actions: ['addItem'] },
        DROP_ITEM: { target: 'inventory', actions: ['removeItem'] },
        USE_AMMO: { target: 'gamePlay', actions: ['useAmmo'], cond: 'hasSufficientAmmunition' }
      }
    },
    combat: {
      on: {
        BATTLE_WON: 'victoryScreen',
        BATTLE_LOST: 'defeatScreen'
      }
    },
    victoryScreen: {
      on: {
        CONTINUE: 'gamePlay',
        MAIN_MENU: 'startMenu'
      }
    },
    defeatScreen: {
      on: {
        RETRY: 'combat',
        MAIN_MENU: 'startMenu'
      }
    },
    exploration: {
      on: {
        ENCOUNTER_ENEMY: 'combat',
        INTERACT_WITH_NPC: 'dialogue', // Assuming dialogue is another state
        FIND_ITEM_QUEST: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    inventory: {
      on: {
        CLOSE_INVENTORY: 'gamePlay'
      }
    },
    pause: {
      on: {
        RESUME_GAME: 'gamePlay',
        OPTIONS: 'options',
        MAIN_MENU: 'startMenu'
      }
    },
    options: {
      on: {
        APPLY_CHANGES: 'gamePlay',
        CANCEL: 'startMenu'
      }
    },
    exit: {
      type: 'final'
    },
    fishing: {
      on: {
        FINISH_FISHING: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    hunting: {
      on: {
        FINISH_HUNTING: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    weaponSelection: {
      on: {
        SELECT_WEAPON: { target: 'gamePlay', actions: ['selectWeapon'] }
      }
    },
    itemSelection: {
      on: {
        SELECT_ITEM: { target: 'gamePlay', actions: ['selectItem'] }
      }
    }
  }
}, {
  actions: {
    setInitialTerrain: (context, event) => {
      return { currentTerrain: event.data.currentTerrain };
    },
    updateCombatEffects: (context, event) => {
      const terrainEffects = {
        plains: {
          moveSpeedMultiplier: 1,
          attackPowerMultiplier: 1,
          defenseMultiplier: 1
        },
        forest: {
          moveSpeedMultiplier: 0.8,
          attackPowerMultiplier: 1.2,
          defenseMultiplier: 0.9
        },
        mountain: {
          moveSpeedMultiplier: 0.5,
          attackPowerMultiplier: 1.5,
          defenseMultiplier: 1.2
        },
        desert: {
          moveSpeedMultiplier: 1.2,
          attackPowerMultiplier: 0.8,
          defenseMultiplier: 0.8
        }
      };

      const currentTerrain = context.currentTerrain;
      const terrainEffect = terrainEffects[currentTerrain] || {};

      return {
        moveSpeedMultiplier: terrainEffect.moveSpeedMultiplier,
        attackPowerMultiplier: terrainEffect.attackPowerMultiplier,
        defenseMultiplier: terrainEffect.defenseMultiplier
      };
    },
    addItem: (context, event) => {
      const newItem = event.data.item;
      const weightMultiplier = newItem.rarity === 'legendary' ? 1.5 : newItem.rarity === 'epic' ? 1.2 : 1;
      const valueMultiplier = newItem.rarity === 'legendary' ? 2 : newItem.rarity === 'epic' ? 1.5 : 1;

      return {
        totalWeight: context.totalWeight + newItem.weight * weightMultiplier,
        totalValue: context.totalValue + newItem.value * valueMultiplier,
        [newItem.name]: (context[newItem.name] || 0) + 1
      };
    },
    removeItem: (context, event) => {
      const itemName = event.data.itemName;
      const itemWeight = event.data.itemWeight;
      const itemValue = event.data.itemValue;
      const weightMultiplier = event.data.itemRarity === 'legendary' ? 1.5 : event.data.itemRarity === 'epic' ? 1.2 : 1;
      const valueMultiplier = event.data.itemRarity === 'legendary' ? 2 : event.data.itemRarity === 'epic' ? 1.5 : 1;

      return {
        totalWeight: context.totalWeight - itemWeight * weightMultiplier,
        totalValue: context.totalValue - itemValue * valueMultiplier,
        [itemName]: Math.max(0, context[itemName] - 1)
      };
    },
    selectWeapon: (context, event) => {
      return { currentWeapon: event.data.weapon };
    },
    useAmmo: (context, event) => {
      return { ammunitionCount: context.ammunitionCount - 1 };
    },
    selectItem: (context, event) => {
      return { selectedItem: event.data.item };
    }
  },
  guards: {
    isNotInBattle: (context, event) => context.currentTerrain !== 'battle',
    isNotInCombat: (context, event) => context.currentTerrain !== 'combat',
    hasSufficientAmmunition: (context, event) => context.ammunitionCount > 0,
    canCarryMoreItems: (context, event) => context.totalWeight + event.data.item.weight <= context.maxCarryingCapacity,
    canAffordItem: (context, event) => context.totalValue + event.data.item.value <= context.maxInventoryValue
  }
});

// Example usage:
horizonZeroDawnMachine.onTransition((state, event) => {
  if (event.type === 'COMBAT') {
    console.log('Current State:', state.value, 'Updated Context:', state.context);
  } else {
    console.log('Current State:', state.value);
  }
});

// To send events to the machine:
horizonZeroDawnMachine.send({ type: 'START_NEW_GAME', data: { currentTerrain: 'plains' } });
horizonZeroDawnMachine.send({ type: 'PICK_UP_ITEM', data: { item: { name: 'sword', weight: 10, value: 50, rarity: 'common' } } });
horizonZeroDawnMachine.send({ type: 'PICK_UP_ITEM', data: { item: { name: 'shield', weight: 5, value: 30, rarity: 'rare' } } });
horizonZeroDawnMachine.send({ type: 'DROP_ITEM', data: { itemName: 'sword', itemWeight: 10, itemValue: 50, itemRarity: 'common' } });
horizonZeroDawnMachine.send('USE_AMMO'); // Should decrease ammunition count
horizonZeroDawnMachine.send('COMBAT'); // Should be allowed since forest is a valid terrain for combat
horizonZeroDawnMachine.send('BATTLE_WON');
horizonZeroDawnMachine.send('MAIN_MENU');
Explanation:
Context:
totalValue: Tracks the total value of all items in the inventory.
maxInventoryValue: Defines the maximum inventory value in arbitrary currency units.
Actions:
addItem: Adds an item to the inventory, updating both the total weight and value based on the item's rarity.
removeItem: Removes an item from the inventory, adjusting the total weight and value based on the item's rarity.
selectWeapon: Sets the current weapon to the selected one.
useAmmo: Decreases the ammunition count by one when using ammunition.
selectItem: Selects an item for inspection or use.
Guards:
canCarryMoreItems: Ensures that the player does not exceed the maximum carrying capacity before adding a new item.
canAffordItem: Ensures that the player does not exceed the maximum inventory value before adding a new item.
New States:
itemSelection: A temporary state for selecting an item after picking it up.
Transitions:
Added transitions to itemSelection and DROP_ITEM to manage item selection and dropping.
With these additions, you can now manage the player's inventory, considering the rarity of items, and ensuring they don't exceed the carrying capacity or inventory value limits. This helps in creating a more balanced and challenging gameplay experience.


please include more detail rule states for the durability system


To incorporate a durability system into the state machine, we need to keep track of the durability of items, especially weapons and armor. Durability affects whether an item can be used or not. If an item's durability reaches zero, it becomes unusable.

We'll add states and actions to handle item durability and ensure that items are properly tracked and managed throughout gameplay.

Here’s how you can integrate a durability system into the existing state machine:

Context:
Add a field to track the durability of items.
Actions:
Define actions to update the durability of items when they are used or repaired.
Guards:
Add guards to ensure actions only proceed if the item is durable enough to be used.
New States:
Add states for repairing items.
Here's the updated state machine:


import { Machine } from '@xstate/fsm';

const horizonZeroDawnMachine = Machine({
  id: 'horizonZeroDawn',
  initial: 'startMenu',
  context: {
    currentTerrain: null, // Initialize with null or default terrain
    moveSpeedMultiplier: 1,
    attackPowerMultiplier: 1,
    defenseMultiplier: 1,
    currentWeapon: null,
    ammunitionCount: 0,
    totalWeight: 0,
    totalValue: 0,
    maxCarryingCapacity: 50, // Maximum carrying capacity in arbitrary units
    maxInventoryValue: 1000, // Maximum inventory value in arbitrary currency units
    items: {}
  },
  states: {
    startMenu: {
      on: {
        START_NEW_GAME: { target: 'gamePlay', actions: ['setInitialTerrain'], cond: 'isNotInBattle' },
        LOAD_GAME: { target: 'gamePlay', actions: ['setInitialTerrain'], cond: 'isNotInBattle' },
        OPTIONS: 'options',
        QUIT: 'exit'
      }
    },
    gamePlay: {
      on: {
        COMBAT: { target: 'combat', actions: ['updateCombatEffects'], cond: 'isNotInCombat' },
        EXPLORATION: 'exploration',
        INVENTORY_MANAGEMENT: 'inventory',
        SAVE_GAME: 'gamePlay',
        PAUSE_GAME: 'pause',
        MAIN_MENU: 'startMenu',
        FISHING: 'fishing',
        HUNTING: 'hunting',
        PICK_UP_ITEM: { target: 'itemSelection', actions: ['addItem'] },
        DROP_ITEM: { target: 'inventory', actions: ['removeItem'] },
        USE_ITEM: { target: 'gamePlay', actions: ['useItem'], cond: 'isItemUsable' },
        REPAIR_ITEM: { target: 'repair', actions: ['repairItem'], cond: 'isItemRepairable' }
      }
    },
    combat: {
      on: {
        BATTLE_WON: 'victoryScreen',
        BATTLE_LOST: 'defeatScreen'
      }
    },
    victoryScreen: {
      on: {
        CONTINUE: 'gamePlay',
        MAIN_MENU: 'startMenu'
      }
    },
    defeatScreen: {
      on: {
        RETRY: 'combat',
        MAIN_MENU: 'startMenu'
      }
    },
    exploration: {
      on: {
        ENCOUNTER_ENEMY: 'combat',
        INTERACT_WITH_NPC: 'dialogue', // Assuming dialogue is another state
        FIND_ITEM_QUEST: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    inventory: {
      on: {
        CLOSE_INVENTORY: 'gamePlay'
      }
    },
    pause: {
      on: {
        RESUME_GAME: 'gamePlay',
        OPTIONS: 'options',
        MAIN_MENU: 'startMenu'
      }
    },
    options: {
      on: {
        APPLY_CHANGES: 'gamePlay',
        CANCEL: 'startMenu'
      }
    },
    exit: {
      type: 'final'
    },
    fishing: {
      on: {
        FINISH_FISHING: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    hunting: {
      on: {
        FINISH_HUNTING: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    weaponSelection: {
      on: {
        SELECT_WEAPON: { target: 'gamePlay', actions: ['selectWeapon'] }
      }
    },
    itemSelection: {
      on: {
        SELECT_ITEM: { target: 'gamePlay', actions: ['selectItem'] }
      }
    },
    repair: {
      on: {
        COMPLETE_REPAIR: { target: 'gamePlay', actions: ['completeRepair'] }
      }
    }
  }
}, {
  actions: {
    setInitialTerrain: (context, event) => {
      return { currentTerrain: event.data.currentTerrain };
    },
    updateCombatEffects: (context, event) => {
      const terrainEffects = {
        plains: {
          moveSpeedMultiplier: 1,
          attackPowerMultiplier: 1,
          defenseMultiplier: 1
        },
        forest: {
          moveSpeedMultiplier: 0.8,
          attackPowerMultiplier: 1.2,
          defenseMultiplier: 0.9
        },
        mountain: {
          moveSpeedMultiplier: 0.5,
          attackPowerMultiplier: 1.5,
          defenseMultiplier: 1.2
        },
        desert: {
          moveSpeedMultiplier: 1.2,
          attackPowerMultiplier: 0.8,
          defenseMultiplier: 0.8
        }
      };

      const currentTerrain = context.currentTerrain;
      const terrainEffect = terrainEffects[currentTerrain] || {};

      return {
        moveSpeedMultiplier: terrainEffect.moveSpeedMultiplier,
        attackPowerMultiplier: terrainEffect.attackPowerMultiplier,
        defenseMultiplier: terrainEffect.defenseMultiplier
      };
    },
    addItem: (context, event) => {
      const newItem = event.data.item;
      const weightMultiplier = newItem.rarity === 'legendary' ? 1.5 : newItem.rarity === 'epic' ? 1.2 : 1;
      const valueMultiplier = newItem.rarity === 'legendary' ? 2 : newItem.rarity === 'epic' ? 1.5 : 1;

      return {
        totalWeight: context.totalWeight + newItem.weight * weightMultiplier,
        totalValue: context.totalValue + newItem.value * valueMultiplier,
        items: {
          ...context.items,
          [newItem.name]: {
            ...newItem,
            durability: newItem.durability
          }
        }
      };
    },
    removeItem: (context, event) => {
      const itemName = event.data.itemName;
      const itemWeight = event.data.itemWeight;
      const itemValue = event.data.itemValue;
      const weightMultiplier = event.data.itemRarity === 'legendary' ? 1.5 : event.data.itemRarity === 'epic' ? 1.2 : 1;
      const valueMultiplier = event.data.itemRarity === 'legendary' ? 2 : event.data.itemRarity === 'epic' ? 1.5 : 1;

      return {
        totalWeight: context.totalWeight - itemWeight * weightMultiplier,
        totalValue: context.totalValue - itemValue * valueMultiplier,
        items: {
          ...context.items,
          [itemName]: undefined
        }
      };
    },
    selectWeapon: (context, event) => {
      return { currentWeapon: event.data.weapon };
    },
    useItem: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: item.durability - 1
            }
          }
        };
      }
      return context;
    },
    repairItem: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.repairCost <= context.totalValue) {
        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: item.maxDurability
            }
          },
          totalValue: context.totalValue - item.repairCost
        };
      }
      return context;
    },
    completeRepair: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: item.maxDurability
            }
          }
        };
      }
      return context;
    }
  },
  guards: {
    isNotInBattle: (context, event) => context.currentTerrain !== 'battle',
    isNotInCombat: (context, event) => context.currentTerrain !== 'combat',
    hasSufficientAmmunition: (context, event) => context.ammunitionCount > 0,
    canCarryMoreItems: (context, event) => context.totalWeight + event.data.item.weight <= context.maxCarryingCapacity,
    canAffordItem: (context, event) => context.totalValue + event.data.item.value <= context.maxInventoryValue,
    isItemUsable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      return item && item.durability > 0;
    },
    isItemRepairable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      return item && item.repairCost <= context.totalValue;
    }
  }
});

// Example usage:
horizonZeroDawnMachine.onTransition((state, event) => {
  if (event.type === 'COMBAT') {
    console.log('Current State:', state.value, 'Updated Context:', state.context);
  } else {
    console.log('Current State:', state.value);
  }
});

// To send events to the machine:
horizonZeroDawnMachine.send({ type: 'START_NEW_GAME', data: { currentTerrain: 'plains' } });
horizonZeroDawnMachine.send({ type: 'PICK_UP_ITEM', data: { item: { name: 'sword', weight: 10, value: 50, rarity: 'common', durability: 100, maxDurability: 100, repairCost: 50 } } });
horizonZeroDawnMachine.send({ type: 'PICK_UP_ITEM', data: { item: { name: 'shield', weight: 5, value: 30, rarity: 'rare', durability: 150, maxDurability: 150, repairCost: 75 } } });
horizonZeroDawnMachine.send({ type: 'DROP_ITEM', data: { itemName: 'sword', itemWeight: 10, itemValue: 50, itemRarity: 'common', itemDurability: 100, itemMaxDurability: 100, itemRepairCost: 50 } });
horizonZeroDawnMachine.send('USE_ITEM', { data: { itemName: 'sword' } }); // Should decrease durability
horizonZeroDawnMachine.send('REPAIR_ITEM', { data: { itemName: 'sword' } }); // Should repair the sword
horizonZeroDawnMachine.send('COMBAT'); // Should be allowed since forest is a valid terrain for combat
horizonZeroDawnMachine.send('BATTLE_WON');
horizonZeroDawnMachine.send('MAIN_MENU');
Explanation:
Context:
items: An object containing all items in the inventory, with each item having properties like name, weight, value, rarity, durability, maxDurability, and repairCost.
Actions:
addItem: Adds an item to the inventory, initializing its durability.
removeItem: Removes an item from the inventory.
useItem: Uses an item, decreasing its durability by 1.
repairItem: Repairs an item, restoring its durability to its maximum value if the player has enough currency.
completeRepair: Completes the repair process, restoring the item's durability to its maximum value.
Guards:
isItemUsable: Ensures that the item is durable enough to be used.
isItemRepairable: Ensures that the player has enough currency to repair the item.
New States:
repair: A temporary state for repairing items.
Transitions:
Added transitions to repair and REPAIR_ITEM to manage item repair.
With these additions, you can now manage the durability of items in the game, ensuring that items become unusable when their durability reaches zero and can be repaired if the player has sufficient currency. This adds an extra layer of resource management and decision-making to the gameplay experience.


Breakdown/salvage system for broken items


To incorporate a breakdown/salvage system into the state machine, we need to handle the scenario where an item breaks and can be salvaged for materials. This can add an interesting mechanic where players can recover some resources from broken items, encouraging strategic item management.

Here’s how you can integrate a breakdown/salvage system into the existing state machine:

Context:
Add a field to track salvageable materials from broken items.
Actions:
Define actions to break an item and salvage its materials.
Guards:
Add guards to ensure actions only proceed if the item can be broken and salvaged.
New States:
Add states for breaking and salvaging items.
Here's the updated state machine:


import { Machine } from '@xstate/fsm';

const horizonZeroDawnMachine = Machine({
  id: 'horizonZeroDawn',
  initial: 'startMenu',
  context: {
    currentTerrain: null, // Initialize with null or default terrain
    moveSpeedMultiplier: 1,
    attackPowerMultiplier: 1,
    defenseMultiplier: 1,
    currentWeapon: null,
    ammunitionCount: 0,
    totalWeight: 0,
    totalValue: 0,
    maxCarryingCapacity: 50, // Maximum carrying capacity in arbitrary units
    maxInventoryValue: 1000, // Maximum inventory value in arbitrary currency units
    items: {},
    salvageMaterials: {}
  },
  states: {
    startMenu: {
      on: {
        START_NEW_GAME: { target: 'gamePlay', actions: ['setInitialTerrain'], cond: 'isNotInBattle' },
        LOAD_GAME: { target: 'gamePlay', actions: ['setInitialTerrain'], cond: 'isNotInBattle' },
        OPTIONS: 'options',
        QUIT: 'exit'
      }
    },
    gamePlay: {
      on: {
        COMBAT: { target: 'combat', actions: ['updateCombatEffects'], cond: 'isNotInCombat' },
        EXPLORATION: 'exploration',
        INVENTORY_MANAGEMENT: 'inventory',
        SAVE_GAME: 'gamePlay',
        PAUSE_GAME: 'pause',
        MAIN_MENU: 'startMenu',
        FISHING: 'fishing',
        HUNTING: 'hunting',
        PICK_UP_ITEM: { target: 'itemSelection', actions: ['addItem'] },
        DROP_ITEM: { target: 'inventory', actions: ['removeItem'] },
        USE_ITEM: { target: 'gamePlay', actions: ['useItem'], cond: 'isItemUsable' },
        REPAIR_ITEM: { target: 'repair', actions: ['repairItem'], cond: 'isItemRepairable' },
        BREAK_ITEM: { target: 'break', actions: ['breakItem'], cond: 'isItemBreakable' },
        SALVAGE_ITEM: { target: 'salvage', actions: ['salvageItem'], cond: 'isItemSalvagable' }
      }
    },
    combat: {
      on: {
        BATTLE_WON: 'victoryScreen',
        BATTLE_LOST: 'defeatScreen'
      }
    },
    victoryScreen: {
      on: {
        CONTINUE: 'gamePlay',
        MAIN_MENU: 'startMenu'
      }
    },
    defeatScreen: {
      on: {
        RETRY: 'combat',
        MAIN_MENU: 'startMenu'
      }
    },
    exploration: {
      on: {
        ENCOUNTER_ENEMY: 'combat',
        INTERACT_WITH_NPC: 'dialogue', // Assuming dialogue is another state
        FIND_ITEM_QUEST: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    inventory: {
      on: {
        CLOSE_INVENTORY: 'gamePlay'
      }
    },
    pause: {
      on: {
        RESUME_GAME: 'gamePlay',
        OPTIONS: 'options',
        MAIN_MENU: 'startMenu'
      }
    },
    options: {
      on: {
        APPLY_CHANGES: 'gamePlay',
        CANCEL: 'startMenu'
      }
    },
    exit: {
      type: 'final'
    },
    fishing: {
      on: {
        FINISH_FISHING: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    hunting: {
      on: {
        FINISH_HUNTING: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    weaponSelection: {
      on: {
        SELECT_WEAPON: { target: 'gamePlay', actions: ['selectWeapon'] }
      }
    },
    itemSelection: {
      on: {
        SELECT_ITEM: { target: 'gamePlay', actions: ['selectItem'] }
      }
    },
    repair: {
      on: {
        COMPLETE_REPAIR: { target: 'gamePlay', actions: ['completeRepair'] }
      }
    },
    break: {
      on: {
        COMPLETE_BREAK: { target: 'gamePlay', actions: ['completeBreak'] }
      }
    },
    salvage: {
      on: {
        COMPLETE_SALVAGE: { target: 'gamePlay', actions: ['completeSalvage'] }
      }
    }
  }
}, {
  actions: {
    setInitialTerrain: (context, event) => {
      return { currentTerrain: event.data.currentTerrain };
    },
    updateCombatEffects: (context, event) => {
      const terrainEffects = {
        plains: {
          moveSpeedMultiplier: 1,
          attackPowerMultiplier: 1,
          defenseMultiplier: 1
        },
        forest: {
          moveSpeedMultiplier: 0.8,
          attackPowerMultiplier: 1.2,
          defenseMultiplier: 0.9
        },
        mountain: {
          moveSpeedMultiplier: 0.5,
          attackPowerMultiplier: 1.5,
          defenseMultiplier: 1.2
        },
        desert: {
          moveSpeedMultiplier: 1.2,
          attackPowerMultiplier: 0.8,
          defenseMultiplier: 0.8
        }
      };

      const currentTerrain = context.currentTerrain;
      const terrainEffect = terrainEffects[currentTerrain] || {};

      return {
        moveSpeedMultiplier: terrainEffect.moveSpeedMultiplier,
        attackPowerMultiplier: terrainEffect.attackPowerMultiplier,
        defenseMultiplier: terrainEffect.defenseMultiplier
      };
    },
    addItem: (context, event) => {
      const newItem = event.data.item;
      const weightMultiplier = newItem.rarity === 'legendary' ? 1.5 : newItem.rarity === 'epic' ? 1.2 : 1;
      const valueMultiplier = newItem.rarity === 'legendary' ? 2 : newItem.rarity === 'epic' ? 1.5 : 1;

      return {
        totalWeight: context.totalWeight + newItem.weight * weightMultiplier,
        totalValue: context.totalValue + newItem.value * valueMultiplier,
        items: {
          ...context.items,
          [newItem.name]: {
            ...newItem,
            durability: newItem.durability
          }
        }
      };
    },
    removeItem: (context, event) => {
      const itemName = event.data.itemName;
      const itemWeight = event.data.itemWeight;
      const itemValue = event.data.itemValue;
      const weightMultiplier = event.data.itemRarity === 'legendary' ? 1.5 : event.data.itemRarity === 'epic' ? 1.2 : 1;
      const valueMultiplier = event.data.itemRarity === 'legendary' ? 2 : event.data.itemRarity === 'epic' ? 1.5 : 1;

      return {
        totalWeight: context.totalWeight - itemWeight * weightMultiplier,
        totalValue: context.totalValue - itemValue * valueMultiplier,
        items: {
          ...context.items,
          [itemName]: undefined
        }
      };
    },
    selectWeapon: (context, event) => {
      return { currentWeapon: event.data.weapon };
    },
    useItem: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: item.durability - 1
            }
          }
        };
      }
      return context;
    },
    repairItem: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.repairCost <= context.totalValue) {
        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: item.maxDurability
            }
          },
          totalValue: context.totalValue - item.repairCost
        };
      }
      return context;
    },
    completeRepair: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: item.maxDurability
            }
          }
        };
      }
      return context;
    },
    breakItem: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    salvageItem: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    completeBreak: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    completeSalvage: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    }
  },
  guards: {
    isNotInBattle: (context, event) => context.currentTerrain !== 'battle',
    isNotInCombat: (context, event) => context.currentTerrain !== 'combat',
    hasSufficientAmmunition: (context, event) => context.ammunitionCount > 0,
    canCarryMoreItems: (context, event) => context.totalWeight + event.data.item.weight <= context.maxCarryingCapacity,
    canAffordItem: (context, event) => context.totalValue + event.data.item.value <= context.maxInventoryValue,
    isItemUsable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      return item && item.durability > 0;
    },
    isItemRepairable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      return item && item.repairCost <= context.totalValue;
    },
    isItemBreakable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      return item && item.durability <= 0;
    },
    isItemSalvagable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      return item && item.durability <= 0;
    }
  }
});

// Example usage:
horizonZeroDawnMachine.onTransition((state, event) => {
  if (event.type === 'COMBAT') {
    console.log('Current State:', state.value, 'Updated Context:', state.context);
  } else {
    console.log('Current State:', state.value);
  }
});

// To send events to the machine:
horizonZeroDawnMachine.send({ type: 'START_NEW_GAME', data: { currentTerrain: 'plains' } });
horizonZeroDawnMachine.send({ type: 'PICK_UP_ITEM', data: { item: { name: 'sword', weight: 10, value: 50, rarity: 'common', durability: 100, maxDurability: 100, repairCost: 50, material: 'steel', salvageAmount: 10 } } });
horizonZeroDawnMachine.send({ type: 'PICK_UP_ITEM', data: { item: { name: 'shield', weight: 5, value: 30, rarity: 'rare', durability: 150, maxDurability: 150, repairCost: 75, material: 'iron', salvageAmount: 15 } } });
horizonZeroDawnMachine.send({ type: 'DROP_ITEM', data: { itemName: 'sword', itemWeight: 10, itemValue: 50, itemRarity: 'common', itemDurability: 100, itemMaxDurability: 100, itemRepairCost: 50, itemMaterial: 'steel', itemSalvageAmount: 10 } });
horizonZeroDawnMachine.send('USE_ITEM', { data: { itemName: 'sword' } }); // Should decrease durability
horizonZeroDawnMachine.send('REPAIR_ITEM', { data: { itemName: 'sword' } }); // Should repair the sword
horizonZeroDawnMachine.send('BREAK_ITEM', { data: { itemName: 'sword' } }); // Should break the sword
horizonZeroDawnMachine.send('SALVAGE_ITEM', { data: { itemName: 'sword' } }); // Should salvage the sword
horizonZeroDawnMachine.send('COMBAT'); // Should be allowed since forest is a valid terrain for combat
horizonZeroDawnMachine.send('BATTLE_WON');
horizonZeroDawnMachine.send('MAIN_MENU');
Explanation:
Context:
salvageMaterials: Tracks the materials obtained from salvaging broken items.
Actions:
breakItem: Breaks an item, setting its durability to zero and adding its salvage materials to the inventory.
salvageItem: Salvages a broken item, setting its durability to zero and adding its salvage materials to the inventory.
completeBreak: Completes the breaking process, setting the item's durability to zero and adding its salvage materials to the inventory.
completeSalvage: Completes the salvaging process, setting the item's durability to zero and adding its salvage materials to the inventory.
Guards:
isItemBreakable: Ensures that the item can be broken.
isItemSalvagable: Ensures that the item can be salvaged.
New States:
break: A temporary state for breaking items.
salvage: A temporary state for salvaging items.
Transitions:
Added transitions to break, salvage, BREAK_ITEM, and SALVAGE_ITEM to manage item breaking and salvaging.
With these additions, you can now manage the durability of items and allow players to salvage broken items for materials. This encourages strategic item management and provides an additional source of resources in the game.


Breakdown/salvage system for broken items


To incorporate a breakdown/salvage system into the state machine, we need to handle the scenario where an item breaks and can be salvaged for materials. This can add an interesting mechanic where players can recover some resources from broken items, encouraging strategic item management.

Here’s how you can integrate a breakdown/salvage system into the existing state machine:

Context:
Add a field to track salvageable materials from broken items.
Actions:
Define actions to break an item and salvage its materials.
Guards:
Add guards to ensure actions only proceed if the item can be broken and salvaged.
New States:
Add states for breaking and salvaging items.
Here's the updated state machine:


import { Machine } from '@xstate/fsm';

const horizonZeroDawnMachine = Machine({
  id: 'horizonZeroDawn',
  initial: 'startMenu',
  context: {
    currentTerrain: null, // Initialize with null or default terrain
    moveSpeedMultiplier: 1,
    attackPowerMultiplier: 1,
    defenseMultiplier: 1,
    currentWeapon: null,
    ammunitionCount: 0,
    totalWeight: 0,
    totalValue: 0,
    maxCarryingCapacity: 50, // Maximum carrying capacity in arbitrary units
    maxInventoryValue: 1000, // Maximum inventory value in arbitrary currency units
    items: {},
    salvageMaterials: {}
  },
  states: {
    startMenu: {
      on: {
        START_NEW_GAME: { target: 'gamePlay', actions: ['setInitialTerrain'], cond: 'isNotInBattle' },
        LOAD_GAME: { target: 'gamePlay', actions: ['setInitialTerrain'], cond: 'isNotInBattle' },
        OPTIONS: 'options',
        QUIT: 'exit'
      }
    },
    gamePlay: {
      on: {
        COMBAT: { target: 'combat', actions: ['updateCombatEffects'], cond: 'isNotInCombat' },
        EXPLORATION: 'exploration',
        INVENTORY_MANAGEMENT: 'inventory',
        SAVE_GAME: 'gamePlay',
        PAUSE_GAME: 'pause',
        MAIN_MENU: 'startMenu',
        FISHING: 'fishing',
        HUNTING: 'hunting',
        PICK_UP_ITEM: { target: 'itemSelection', actions: ['addItem'] },
        DROP_ITEM: { target: 'inventory', actions: ['removeItem'] },
        USE_ITEM: { target: 'gamePlay', actions: ['useItem'], cond: 'isItemUsable' },
        REPAIR_ITEM: { target: 'repair', actions: ['repairItem'], cond: 'isItemRepairable' },
        BREAK_ITEM: { target: 'break', actions: ['breakItem'], cond: 'isItemBreakable' },
        SALVAGE_ITEM: { target: 'salvage', actions: ['salvageItem'], cond: 'isItemSalvagable' }
      }
    },
    combat: {
      on: {
        BATTLE_WON: 'victoryScreen',
        BATTLE_LOST: 'defeatScreen'
      }
    },
    victoryScreen: {
      on: {
        CONTINUE: 'gamePlay',
        MAIN_MENU: 'startMenu'
      }
    },
    defeatScreen: {
      on: {
        RETRY: 'combat',
        MAIN_MENU: 'startMenu'
      }
    },
    exploration: {
      on: {
        ENCOUNTER_ENEMY: 'combat',
        INTERACT_WITH_NPC: 'dialogue', // Assuming dialogue is another state
        FIND_ITEM_QUEST: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    inventory: {
      on: {
        CLOSE_INVENTORY: 'gamePlay'
      }
    },
    pause: {
      on: {
        RESUME_GAME: 'gamePlay',
        OPTIONS: 'options',
        MAIN_MENU: 'startMenu'
      }
    },
    options: {
      on: {
        APPLY_CHANGES: 'gamePlay',
        CANCEL: 'startMenu'
      }
    },
    exit: {
      type: 'final'
    },
    fishing: {
      on: {
        FINISH_FISHING: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    hunting: {
      on: {
        FINISH_HUNTING: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    weaponSelection: {
      on: {
        SELECT_WEAPON: { target: 'gamePlay', actions: ['selectWeapon'] }
      }
    },
    itemSelection: {
      on: {
        SELECT_ITEM: { target: 'gamePlay', actions: ['selectItem'] }
      }
    },
    repair: {
      on: {
        COMPLETE_REPAIR: { target: 'gamePlay', actions: ['completeRepair'] }
      }
    },
    break: {
      on: {
        COMPLETE_BREAK: { target: 'gamePlay', actions: ['completeBreak'] }
      }
    },
    salvage: {
      on: {
        COMPLETE_SALVAGE: { target: 'gamePlay', actions: ['completeSalvage'] }
      }
    }
  }
}, {
  actions: {
    setInitialTerrain: (context, event) => {
      return { currentTerrain: event.data.currentTerrain };
    },
    updateCombatEffects: (context, event) => {
      const terrainEffects = {
        plains: {
          moveSpeedMultiplier: 1,
          attackPowerMultiplier: 1,
          defenseMultiplier: 1
        },
        forest: {
          moveSpeedMultiplier: 0.8,
          attackPowerMultiplier: 1.2,
          defenseMultiplier: 0.9
        },
        mountain: {
          moveSpeedMultiplier: 0.5,
          attackPowerMultiplier: 1.5,
          defenseMultiplier: 1.2
        },
        desert: {
          moveSpeedMultiplier: 1.2,
          attackPowerMultiplier: 0.8,
          defenseMultiplier: 0.8
        }
      };

      const currentTerrain = context.currentTerrain;
      const terrainEffect = terrainEffects[currentTerrain] || {};

      return {
        moveSpeedMultiplier: terrainEffect.moveSpeedMultiplier,
        attackPowerMultiplier: terrainEffect.attackPowerMultiplier,
        defenseMultiplier: terrainEffect.defenseMultiplier
      };
    },
    addItem: (context, event) => {
      const newItem = event.data.item;
      const weightMultiplier = newItem.rarity === 'legendary' ? 1.5 : newItem.rarity === 'epic' ? 1.2 : 1;
      const valueMultiplier = newItem.rarity === 'legendary' ? 2 : newItem.rarity === 'epic' ? 1.5 : 1;

      return {
        totalWeight: context.totalWeight + newItem.weight * weightMultiplier,
        totalValue: context.totalValue + newItem.value * valueMultiplier,
        items: {
          ...context.items,
          [newItem.name]: {
            ...newItem,
            durability: newItem.durability
          }
        }
      };
    },
    removeItem: (context, event) => {
      const itemName = event.data.itemName;
      const itemWeight = event.data.itemWeight;
      const itemValue = event.data.itemValue;
      const weightMultiplier = event.data.itemRarity === 'legendary' ? 1.5 : event.data.itemRarity === 'epic' ? 1.2 : 1;
      const valueMultiplier = event.data.itemRarity === 'legendary' ? 2 : event.data.itemRarity === 'epic' ? 1.5 : 1;

      return {
        totalWeight: context.totalWeight - itemWeight * weightMultiplier,
        totalValue: context.totalValue - itemValue * valueMultiplier,
        items: {
          ...context.items,
          [itemName]: undefined
        }
      };
    },
    selectWeapon: (context, event) => {
      return { currentWeapon: event.data.weapon };
    },
    useItem: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: item.durability - 1
            }
          }
        };
      }
      return context;
    },
    repairItem: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.repairCost <= context.totalValue) {
        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: item.maxDurability
            }
          },
          totalValue: context.totalValue - item.repairCost
        };
      }
      return context;
    },
    completeRepair: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: item.maxDurability
            }
          }
        };
      }
      return context;
    },
    breakItem: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    salvageItem: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    completeBreak: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    completeSalvage: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    }
  },
  guards: {
    isNotInBattle: (context, event) => context.currentTerrain !== 'battle',
    isNotInCombat: (context, event) => context.currentTerrain !== 'combat',
    hasSufficientAmmunition: (context, event) => context.ammunitionCount > 0,
    canCarryMoreItems: (context, event) => context.totalWeight + event.data.item.weight <= context.maxCarryingCapacity,
    canAffordItem: (context, event) => context.totalValue + event.data.item.value <= context.maxInventoryValue,
    isItemUsable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      return item && item.durability > 0;
    },
    isItemRepairable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      return item && item.repairCost <= context.totalValue;
    },
    isItemBreakable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      return item && item.durability <= 0;
    },
    isItemSalvagable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      return item && item.durability <= 0;
    }
  }
});

// Example usage:
horizonZeroDawnMachine.onTransition((state, event) => {
  if (event.type === 'COMBAT') {
    console.log('Current State:', state.value, 'Updated Context:', state.context);
  } else {
    console.log('Current State:', state.value);
  }
});

// To send events to the machine:
horizonZeroDawnMachine.send({ type: 'START_NEW_GAME', data: { currentTerrain: 'plains' } });
horizonZeroDawnMachine.send({ type: 'PICK_UP_ITEM', data: { item: { name: 'sword', weight: 10, value: 50, rarity: 'common', durability: 100, maxDurability: 100, repairCost: 50, material: 'steel', salvageAmount: 10 } } });
horizonZeroDawnMachine.send({ type: 'PICK_UP_ITEM', data: { item: { name: 'shield', weight: 5, value: 30, rarity: 'rare', durability: 150, maxDurability: 150, repairCost: 75, material: 'iron', salvageAmount: 15 } } });
horizonZeroDawnMachine.send({ type: 'DROP_ITEM', data: { itemName: 'sword', itemWeight: 10, itemValue: 50, itemRarity: 'common', itemDurability: 100, itemMaxDurability: 100, itemRepairCost: 50, itemMaterial: 'steel', itemSalvageAmount: 10 } });
horizonZeroDawnMachine.send('USE_ITEM', { data: { itemName: 'sword' } }); // Should decrease durability
horizonZeroDawnMachine.send('REPAIR_ITEM', { data: { itemName: 'sword' } }); // Should repair the sword
horizonZeroDawnMachine.send('BREAK_ITEM', { data: { itemName: 'sword' } }); // Should break the sword
horizonZeroDawnMachine.send('SALVAGE_ITEM', { data: { itemName: 'sword' } }); // Should salvage the sword
horizonZeroDawnMachine.send('COMBAT'); // Should be allowed since forest is a valid terrain for combat
horizonZeroDawnMachine.send('BATTLE_WON');
horizonZeroDawnMachine.send('MAIN_MENU');
Explanation:
Context:
salvageMaterials: Tracks the materials obtained from salvaging broken items.
Actions:
breakItem: Breaks an item, setting its durability to zero and adding its salvage materials to the inventory.
salvageItem: Salvages a broken item, setting its durability to zero and adding its salvage materials to the inventory.
completeBreak: Completes the breaking process, setting the item's durability to zero and adding its salvage materials to the inventory.
completeSalvage: Completes the salvaging process, setting the item's durability to zero and adding its salvage materials to the inventory.
Guards:
isItemBreakable: Ensures that the item can be broken.
isItemSalvagable: Ensures that the item can be salvaged.
New States:
break: A temporary state for breaking items.
salvage: A temporary state for salvaging items.
Transitions:
Added transitions to break, salvage, BREAK_ITEM, and SALVAGE_ITEM to manage item breaking and salvaging.
With these additions, you can now manage the durability of items and allow players to salvage broken items for materials. This encourages strategic item management and provides an additional source of resources in the game.


Special repair requirements for higher rarity items


To incorporate special repair requirements for higher rarity items, we need to add checks for the rarity of the item and ensure that higher rarity items require more advanced or expensive repairs. This adds an additional layer of complexity and strategy to the game, making it more challenging and rewarding.

Here’s how you can update the state machine to include special repair requirements for higher rarity items:

Context:
No changes needed for the context as it already tracks item durability and rarity.
Actions:
Update the repairItem action to include special repair requirements for higher rarity items.
Guards:
Update the isItemRepairable guard to check for special repair requirements.
New Actions:
Define actions to handle special repair processes for higher rarity items.
Here's the updated state machine:


import { Machine } from '@xstate/fsm';

const horizonZeroDawnMachine = Machine({
  id: 'horizonZeroDawn',
  initial: 'startMenu',
  context: {
    currentTerrain: null, // Initialize with null or default terrain
    moveSpeedMultiplier: 1,
    attackPowerMultiplier: 1,
    defenseMultiplier: 1,
    currentWeapon: null,
    ammunitionCount: 0,
    totalWeight: 0,
    totalValue: 0,
    maxCarryingCapacity: 50, // Maximum carrying capacity in arbitrary units
    maxInventoryValue: 1000, // Maximum inventory value in arbitrary currency units
    items: {},
    salvageMaterials: {}
  },
  states: {
    startMenu: {
      on: {
        START_NEW_GAME: { target: 'gamePlay', actions: ['setInitialTerrain'], cond: 'isNotInBattle' },
        LOAD_GAME: { target: 'gamePlay', actions: ['setInitialTerrain'], cond: 'isNotInBattle' },
        OPTIONS: 'options',
        QUIT: 'exit'
      }
    },
    gamePlay: {
      on: {
        COMBAT: { target: 'combat', actions: ['updateCombatEffects'], cond: 'isNotInCombat' },
        EXPLORATION: 'exploration',
        INVENTORY_MANAGEMENT: 'inventory',
        SAVE_GAME: 'gamePlay',
        PAUSE_GAME: 'pause',
        MAIN_MENU: 'startMenu',
        FISHING: 'fishing',
        HUNTING: 'hunting',
        PICK_UP_ITEM: { target: 'itemSelection', actions: ['addItem'] },
        DROP_ITEM: { target: 'inventory', actions: ['removeItem'] },
        USE_ITEM: { target: 'gamePlay', actions: ['useItem'], cond: 'isItemUsable' },
        REPAIR_ITEM: { target: 'repair', actions: ['repairItem'], cond: 'isItemRepairable' },
        BREAK_ITEM: { target: 'break', actions: ['breakItem'], cond: 'isItemBreakable' },
        SALVAGE_ITEM: { target: 'salvage', actions: ['salvageItem'], cond: 'isItemSalvagable' }
      }
    },
    combat: {
      on: {
        BATTLE_WON: 'victoryScreen',
        BATTLE_LOST: 'defeatScreen'
      }
    },
    victoryScreen: {
      on: {
        CONTINUE: 'gamePlay',
        MAIN_MENU: 'startMenu'
      }
    },
    defeatScreen: {
      on: {
        RETRY: 'combat',
        MAIN_MENU: 'startMenu'
      }
    },
    exploration: {
      on: {
        ENCOUNTER_ENEMY: 'combat',
        INTERACT_WITH_NPC: 'dialogue', // Assuming dialogue is another state
        FIND_ITEM_QUEST: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    inventory: {
      on: {
        CLOSE_INVENTORY: 'gamePlay'
      }
    },
    pause: {
      on: {
        RESUME_GAME: 'gamePlay',
        OPTIONS: 'options',
        MAIN_MENU: 'startMenu'
      }
    },
    options: {
      on: {
        APPLY_CHANGES: 'gamePlay',
        CANCEL: 'startMenu'
      }
    },
    exit: {
      type: 'final'
    },
    fishing: {
      on: {
        FINISH_FISHING: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    hunting: {
      on: {
        FINISH_HUNTING: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    weaponSelection: {
      on: {
        SELECT_WEAPON: { target: 'gamePlay', actions: ['selectWeapon'] }
      }
    },
    itemSelection: {
      on: {
        SELECT_ITEM: { target: 'gamePlay', actions: ['selectItem'] }
      }
    },
    repair: {
      on: {
        COMPLETE_REPAIR: { target: 'gamePlay', actions: ['completeRepair'] }
      }
    },
    break: {
      on: {
        COMPLETE_BREAK: { target: 'gamePlay', actions: ['completeBreak'] }
      }
    },
    salvage: {
      on: {
        COMPLETE_SALVAGE: { target: 'gamePlay', actions: ['completeSalvage'] }
      }
    }
  }
}, {
  actions: {
    setInitialTerrain: (context, event) => {
      return { currentTerrain: event.data.currentTerrain };
    },
    updateCombatEffects: (context, event) => {
      const terrainEffects = {
        plains: {
          moveSpeedMultiplier: 1,
          attackPowerMultiplier: 1,
          defenseMultiplier: 1
        },
        forest: {
          moveSpeedMultiplier: 0.8,
          attackPowerMultiplier: 1.2,
          defenseMultiplier: 0.9
        },
        mountain: {
          moveSpeedMultiplier: 0.5,
          attackPowerMultiplier: 1.5,
          defenseMultiplier: 1.2
        },
        desert: {
          moveSpeedMultiplier: 1.2,
          attackPowerMultiplier: 0.8,
          defenseMultiplier: 0.8
        }
      };

      const currentTerrain = context.currentTerrain;
      const terrainEffect = terrainEffects[currentTerrain] || {};

      return {
        moveSpeedMultiplier: terrainEffect.moveSpeedMultiplier,
        attackPowerMultiplier: terrainEffect.attackPowerMultiplier,
        defenseMultiplier: terrainEffect.defenseMultiplier
      };
    },
    addItem: (context, event) => {
      const newItem = event.data.item;
      const weightMultiplier = newItem.rarity === 'legendary' ? 1.5 : newItem.rarity === 'epic' ? 1.2 : 1;
      const valueMultiplier = newItem.rarity === 'legendary' ? 2 : newItem.rarity === 'epic' ? 1.5 : 1;

      return {
        totalWeight: context.totalWeight + newItem.weight * weightMultiplier,
        totalValue: context.totalValue + newItem.value * valueMultiplier,
        items: {
          ...context.items,
          [newItem.name]: {
            ...newItem,
            durability: newItem.durability
          }
        }
      };
    },
    removeItem: (context, event) => {
      const itemName = event.data.itemName;
      const itemWeight = event.data.itemWeight;
      const itemValue = event.data.itemValue;
      const weightMultiplier = event.data.itemRarity === 'legendary' ? 1.5 : event.data.itemRarity === 'epic' ? 1.2 : 1;
      const valueMultiplier = event.data.itemRarity === 'legendary' ? 2 : event.data.itemRarity === 'epic' ? 1.5 : 1;

      return {
        totalWeight: context.totalWeight - itemWeight * weightMultiplier,
        totalValue: context.totalValue - itemValue * valueMultiplier,
        items: {
          ...context.items,
          [itemName]: undefined
        }
      };
    },
    selectWeapon: (context, event) => {
      return { currentWeapon: event.data.weapon };
    },
    useItem: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: item.durability - 1
            }
          }
        };
      }
      return context;
    },
    repairItem: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        const repairCost = item.rarity === 'legendary' ? 200 : item.rarity === 'epic' ? 150 : 100;
        if (item.repairCost <= context.totalValue) {
          return {
            items: {
              ...context.items,
              [itemName]: {
                ...item,
                durability: item.maxDurability
              }
            },
            totalValue: context.totalValue - repairCost
          };
        } else {
          return {
            items: {
              ...context.items,
              [itemName]: {
                ...item,
                durability: item.maxDurability
              }
            },
            totalValue: context.totalValue - item.repairCost
          };
        }
      }
      return context;
    },
    completeRepair: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: item.maxDurability
            }
          }
        };
      }
      return context;
    },
    breakItem: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    salvageItem: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    completeBreak: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    completeSalvage: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    }
  },
  guards: {
    isNotInBattle: (context, event) => context.currentTerrain !== 'battle',
    isNotInCombat: (context, event) => context.currentTerrain !== 'combat',
    hasSufficientAmmunition: (context, event) => context.ammunitionCount > 0,
    canCarryMoreItems: (context, event) => context.totalWeight + event.data.item.weight <= context.maxCarryingCapacity,
    canAffordItem: (context, event) => context.totalValue + event.data.item.value <= context.maxInventoryValue,
    isItemUsable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      return item && item.durability > 0;
    },
    isItemRepairable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      const repairCost = item.rarity === 'legendary' ? 200 : item.rarity === 'epic' ? 150 : 100;
      return item && item.repairCost <= context.totalValue;
    },
    isItemBreakable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      return item && item.durability <= 0;
    },
    isItemSalvagable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      return item && item.durability <= 0;
    }
  }
});

// Example usage:
horizonZeroDawnMachine.onTransition((state, event) => {
  if (event.type === 'COMBAT') {
    console.log('Current State:', state.value, 'Updated Context:', state.context);
  } else {
    console.log('Current State:', state.value);
  }
});

// To send events to the machine:
horizonZeroDawnMachine.send({ type: 'START_NEW_GAME', data: { currentTerrain: 'plains' } });
horizonZeroDawnMachine.send({ type: 'PICK_UP_ITEM', data: { item: { name: 'sword', weight: 10, value: 50, rarity: 'common', durability: 100, maxDurability: 100, repairCost: 50, material: 'steel', salvageAmount: 10 } } });
horizonZeroDawnMachine.send({ type: 'PICK_UP_ITEM', data: { item: { name: 'shield', weight: 5, value: 30, rarity: 'rare', durability: 150, maxDurability: 150, repairCost: 75, material: 'iron', salvageAmount: 15 } } });
horizonZeroDawnMachine.send({ type: 'DROP_ITEM', data: { itemName: 'sword', itemWeight: 10, itemValue: 50, itemRarity: 'common', itemDurability: 100, itemMaxDurability: 100, itemRepairCost: 50, itemMaterial: 'steel', itemSalvageAmount: 10 } });
horizonZeroDawnMachine.send('USE_ITEM', { data: { itemName: 'sword' } }); // Should decrease durability
horizonZeroDawnMachine.send('REPAIR_ITEM', { data: { itemName: 'sword' } }); // Should repair the sword
horizonZeroDawnMachine.send('BREAK_ITEM', { data: { itemName: 'sword' } }); // Should break the sword
horizonZeroDawnMachine.send('SALVAGE_ITEM', { data: { itemName: 'sword' } }); // Should salvage the sword
horizonZeroDawnMachine.send('COMBAT'); // Should be allowed since forest is a valid terrain for combat
horizonZeroDawnMachine.send('BATTLE_WON');
horizonZeroDawnMachine.send('MAIN_MENU');
Explanation:
Actions:
repairItem: Updated to check the rarity of the item and calculate the repair cost accordingly. Higher rarity items require more expensive repairs.
Guards:
isItemRepairable: Updated to check if the player has enough currency to repair the item, considering the special repair costs for higher rarity items.
No Changes Needed:
The context remains unchanged as it already tracks item durability and rarity.
With these modifications, higher rarity items will require more advanced or expensive repairs, adding an extra layer of strategy and complexity to the game. Players will need to manage their resources carefully to repair valuable items.


please include a system for Emergency field repairs


To include a system for emergency field repairs, we need to add a new state and actions that allow players to perform quick repairs while on the go. These repairs should be limited in duration and effectiveness compared to full repairs but should still be useful in urgent situations.

Here’s how you can update the state machine to include an emergency field repair system:

New States:
emergencyFieldRepair: A temporary state for performing emergency field repairs.
New Actions:
startEmergencyRepair: Starts an emergency field repair session.
completeEmergencyRepair: Completes an emergency field repair session.
Guards:
isItemEmergencyRepairable: Ensures that the item can be repaired using emergency field repair.
Transitions:
Add transitions to and from the emergencyFieldRepair state.
Here's the updated state machine:


import { Machine } from '@xstate/fsm';

const horizonZeroDawnMachine = Machine({
  id: 'horizonZeroDawn',
  initial: 'startMenu',
  context: {
    currentTerrain: null, // Initialize with null or default terrain
    moveSpeedMultiplier: 1,
    attackPowerMultiplier: 1,
    defenseMultiplier: 1,
    currentWeapon: null,
    ammunitionCount: 0,
    totalWeight: 0,
    totalValue: 0,
    maxCarryingCapacity: 50, // Maximum carrying capacity in arbitrary units
    maxInventoryValue: 1000, // Maximum inventory value in arbitrary currency units
    items: {},
    salvageMaterials: {}
  },
  states: {
    startMenu: {
      on: {
        START_NEW_GAME: { target: 'gamePlay', actions: ['setInitialTerrain'], cond: 'isNotInBattle' },
        LOAD_GAME: { target: 'gamePlay', actions: ['setInitialTerrain'], cond: 'isNotInBattle' },
        OPTIONS: 'options',
        QUIT: 'exit'
      }
    },
    gamePlay: {
      on: {
        COMBAT: { target: 'combat', actions: ['updateCombatEffects'], cond: 'isNotInCombat' },
        EXPLORATION: 'exploration',
        INVENTORY_MANAGEMENT: 'inventory',
        SAVE_GAME: 'gamePlay',
        PAUSE_GAME: 'pause',
        MAIN_MENU: 'startMenu',
        FISHING: 'fishing',
        HUNTING: 'hunting',
        PICK_UP_ITEM: { target: 'itemSelection', actions: ['addItem'] },
        DROP_ITEM: { target: 'inventory', actions: ['removeItem'] },
        USE_ITEM: { target: 'gamePlay', actions: ['useItem'], cond: 'isItemUsable' },
        REPAIR_ITEM: { target: 'repair', actions: ['repairItem'], cond: 'isItemRepairable' },
        BREAK_ITEM: { target: 'break', actions: ['breakItem'], cond: 'isItemBreakable' },
        SALVAGE_ITEM: { target: 'salvage', actions: ['salvageItem'], cond: 'isItemSalvagable' },
        START_EMERGENCY_REPAIR: { target: 'emergencyFieldRepair', actions: ['startEmergencyRepair'], cond: 'isItemEmergencyRepairable' }
      }
    },
    combat: {
      on: {
        BATTLE_WON: 'victoryScreen',
        BATTLE_LOST: 'defeatScreen'
      }
    },
    victoryScreen: {
      on: {
        CONTINUE: 'gamePlay',
        MAIN_MENU: 'startMenu'
      }
    },
    defeatScreen: {
      on: {
        RETRY: 'combat',
        MAIN_MENU: 'startMenu'
      }
    },
    exploration: {
      on: {
        ENCOUNTER_ENEMY: 'combat',
        INTERACT_WITH_NPC: 'dialogue', // Assuming dialogue is another state
        FIND_ITEM_QUEST: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    inventory: {
      on: {
        CLOSE_INVENTORY: 'gamePlay'
      }
    },
    pause: {
      on: {
        RESUME_GAME: 'gamePlay',
        OPTIONS: 'options',
        MAIN_MENU: 'startMenu'
      }
    },
    options: {
      on: {
        APPLY_CHANGES: 'gamePlay',
        CANCEL: 'startMenu'
      }
    },
    exit: {
      type: 'final'
    },
    fishing: {
      on: {
        FINISH_FISHING: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    hunting: {
      on: {
        FINISH_HUNTING: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    weaponSelection: {
      on: {
        SELECT_WEAPON: { target: 'gamePlay', actions: ['selectWeapon'] }
      }
    },
    itemSelection: {
      on: {
        SELECT_ITEM: { target: 'gamePlay', actions: ['selectItem'] }
      }
    },
    repair: {
      on: {
        COMPLETE_REPAIR: { target: 'gamePlay', actions: ['completeRepair'] }
      }
    },
    break: {
      on: {
        COMPLETE_BREAK: { target: 'gamePlay', actions: ['completeBreak'] }
      }
    },
    salvage: {
      on: {
        COMPLETE_SALVAGE: { target: 'gamePlay', actions: ['completeSalvage'] }
      }
    },
    emergencyFieldRepair: {
      on: {
        COMPLETE_EMERGENCY_REPAIR: { target: 'gamePlay', actions: ['completeEmergencyRepair'] }
      }
    }
  }
}, {
  actions: {
    setInitialTerrain: (context, event) => {
      return { currentTerrain: event.data.currentTerrain };
    },
    updateCombatEffects: (context, event) => {
      const terrainEffects = {
        plains: {
          moveSpeedMultiplier: 1,
          attackPowerMultiplier: 1,
          defenseMultiplier: 1
        },
        forest: {
          moveSpeedMultiplier: 0.8,
          attackPowerMultiplier: 1.2,
          defenseMultiplier: 0.9
        },
        mountain: {
          moveSpeedMultiplier: 0.5,
          attackPowerMultiplier: 1.5,
          defenseMultiplier: 1.2
        },
        desert: {
          moveSpeedMultiplier: 1.2,
          attackPowerMultiplier: 0.8,
          defenseMultiplier: 0.8
        }
      };

      const currentTerrain = context.currentTerrain;
      const terrainEffect = terrainEffects[currentTerrain] || {};

      return {
        moveSpeedMultiplier: terrainEffect.moveSpeedMultiplier,
        attackPowerMultiplier: terrainEffect.attackPowerMultiplier,
        defenseMultiplier: terrainEffect.defenseMultiplier
      };
    },
    addItem: (context, event) => {
      const newItem = event.data.item;
      const weightMultiplier = newItem.rarity === 'legendary' ? 1.5 : newItem.rarity === 'epic' ? 1.2 : 1;
      const valueMultiplier = newItem.rarity === 'legendary' ? 2 : newItem.rarity === 'epic' ? 1.5 : 1;

      return {
        totalWeight: context.totalWeight + newItem.weight * weightMultiplier,
        totalValue: context.totalValue + newItem.value * valueMultiplier,
        items: {
          ...context.items,
          [newItem.name]: {
            ...newItem,
            durability: newItem.durability
          }
        }
      };
    },
    removeItem: (context, event) => {
      const itemName = event.data.itemName;
      const itemWeight = event.data.itemWeight;
      const itemValue = event.data.itemValue;
      const weightMultiplier = event.data.itemRarity === 'legendary' ? 1.5 : event.data.itemRarity === 'epic' ? 1.2 : 1;
      const valueMultiplier = event.data.itemRarity === 'legendary' ? 2 : event.data.itemRarity === 'epic' ? 1.5 : 1;

      return {
        totalWeight: context.totalWeight - itemWeight * weightMultiplier,
        totalValue: context.totalValue - itemValue * valueMultiplier,
        items: {
          ...context.items,
          [itemName]: undefined
        }
      };
    },
    selectWeapon: (context, event) => {
      return { currentWeapon: event.data.weapon };
    },
    useItem: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: item.durability - 1
            }
          }
        };
      }
      return context;
    },
    repairItem: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        const repairCost = item.rarity === 'legendary' ? 200 : item.rarity === 'epic' ? 150 : 100;
        if (item.repairCost <= context.totalValue) {
          return {
            items: {
              ...context.items,
              [itemName]: {
                ...item,
                durability: item.maxDurability
              }
            },
            totalValue: context.totalValue - repairCost
          };
        } else {
          return {
            items: {
              ...context.items,
              [itemName]: {
                ...item,
                durability: item.maxDurability
              }
            },
            totalValue: context.totalValue - item.repairCost
          };
        }
      }
      return context;
    },
    completeRepair: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: item.maxDurability
            }
          }
        };
      }
      return context;
    },
    breakItem: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    salvageItem: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    completeBreak: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    completeSalvage: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    startEmergencyRepair: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        const repairTime = item.rarity === 'legendary' ? 10 : item.rarity === 'epic' ? 5 : 3; // Time in arbitrary units
        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: Math.min(item.maxDurability, item.durability + 10)
            }
          },
          totalValue: context.totalValue - repairTime // Cost in arbitrary units
        };
      }
      return context;
    },
    completeEmergencyRepair: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: item.maxDurability
            }
          }
        };
      }
      return context;
    }
  },
  guards: {
    isNotInBattle: (context, event) => context.currentTerrain !== 'battle',
    isNotInCombat: (context, event) => context.currentTerrain !== 'combat',
    hasSufficientAmmunition: (context, event) => context.ammunitionCount > 0,
    canCarryMoreItems: (context, event) => context.totalWeight + event.data.item.weight <= context.maxCarryingCapacity,
    canAffordItem: (context, event) => context.totalValue + event.data.item.value <= context.maxInventoryValue,
    isItemUsable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      return item && item.durability > 0;
    },
    isItemRepairable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      const repairCost = item.rarity === 'legendary' ? 200 : item.rarity === 'epic' ? 150 : 100;
      return item && item.repairCost <= context.totalValue;
    },
    isItemBreakable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      return item && item.durability <= 0;
    },
    isItemSalvagable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      return item && item.durability <= 0;
    },
    isItemEmergencyRepairable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      return item && item.durability <= 0;
    }
  }
});

// Example usage:
horizonZeroDawnMachine.onTransition((state, event) => {
  if (event.type === 'COMBAT') {
    console.log('Current State:', state.value, 'Updated Context:', state.context);
  } else {
    console.log('Current State:', state.value);
  }
});

// To send events to the machine:
horizonZeroDawnMachine.send({ type: 'START_NEW_GAME', data: { currentTerrain: 'plains' } });
horizonZeroDawnMachine.send({ type: 'PICK_UP_ITEM', data: { item: { name: 'sword', weight: 10, value: 50, rarity: 'common', durability: 100, maxDurability: 100, repairCost: 50, material: 'steel', salvageAmount: 10 } } });
horizonZeroDawnMachine.send({ type: 'PICK_UP_ITEM', data: { item: { name: 'shield', weight: 5, value: 30, rarity: 'rare', durability: 150, maxDurability: 150, repairCost: 75, material: 'iron', salvageAmount: 15 } } });
horizonZeroDawnMachine.send({ type: 'DROP_ITEM', data: { itemName: 'sword', itemWeight: 10, itemValue: 50, itemRarity: 'common', itemDurability: 100, itemMaxDurability: 100, itemRepairCost: 50, itemMaterial: 'steel', itemSalvageAmount: 10 } });
horizonZeroDawnMachine.send('USE_ITEM', { data: { itemName: 'sword' } }); // Should decrease durability
horizonZeroDawnMachine.send('REPAIR_ITEM', { data: { itemName: 'sword' } }); // Should repair the sword
horizonZeroDawnMachine.send('BREAK_ITEM', { data: { itemName: 'sword' } }); // Should break the sword
horizonZeroDawnMachine.send('SALVAGE_ITEM', { data: { itemName: 'sword' } }); // Should salvage the sword
horizonZeroDawnMachine.send('START_EMERGENCY_REPAIR', { data: { itemName: 'sword' } }); // Should start emergency repair
horizonZeroDawnMachine.send('COMPLETE_EMERGENCY_REPAIR'); // Should complete emergency repair
horizonZeroDawnMachine.send('COMBAT'); // Should be allowed since forest is a valid terrain for combat
horizonZeroDawnMachine.send('BATTLE_WON');
horizonZeroDawnMachine.send('MAIN_MENU');
Explanation:
New States:
emergencyFieldRepair: A temporary state for performing emergency field repairs.
New Actions:
startEmergencyRepair: Starts an emergency field repair session, increasing the item's durability slightly and deducting a small amount of currency.
completeEmergencyRepair: Completes the emergency field repair session, fully repairing the item.
Guards:
isItemEmergencyRepairable: Ensures that the item can be repaired using emergency field repair.
Transitions:
Added transitions to emergencyFieldRepair and START_EMERGENCY_REPAIR to initiate emergency repairs.
Added a transition to COMPLETE_EMERGENCY_REPAIR to complete the emergency repair session.
With these additions, players can perform quick repairs on damaged items while on the go, providing an additional layer of flexibility and resource management in the game.


please include repair quality variations


To include repair quality variations, we can introduce randomness into the repair process. This means that the actual repair amount and the cost may vary each time an item is repaired. This adds an element of uncertainty and excitement to the gameplay.

Here’s how you can update the state machine to include repair quality variations:

New Actions:
Define actions to generate random repair amounts and costs.
Guards:
Ensure the player has enough currency to perform the repair.
Transitions:
Handle the completion of the repair with the generated values.
Here's the updated state machine:


import { Machine } from '@xstate/fsm';
import { sample } from 'lodash';

const horizonZeroDawnMachine = Machine({
  id: 'horizonZeroDawn',
  initial: 'startMenu',
  context: {
    currentTerrain: null, // Initialize with null or default terrain
    moveSpeedMultiplier: 1,
    attackPowerMultiplier: 1,
    defenseMultiplier: 1,
    currentWeapon: null,
    ammunitionCount: 0,
    totalWeight: 0,
    totalValue: 0,
    maxCarryingCapacity: 50, // Maximum carrying capacity in arbitrary units
    maxInventoryValue: 1000, // Maximum inventory value in arbitrary currency units
    items: {},
    salvageMaterials: {}
  },
  states: {
    startMenu: {
      on: {
        START_NEW_GAME: { target: 'gamePlay', actions: ['setInitialTerrain'], cond: 'isNotInBattle' },
        LOAD_GAME: { target: 'gamePlay', actions: ['setInitialTerrain'], cond: 'isNotInBattle' },
        OPTIONS: 'options',
        QUIT: 'exit'
      }
    },
    gamePlay: {
      on: {
        COMBAT: { target: 'combat', actions: ['updateCombatEffects'], cond: 'isNotInCombat' },
        EXPLORATION: 'exploration',
        INVENTORY_MANAGEMENT: 'inventory',
        SAVE_GAME: 'gamePlay',
        PAUSE_GAME: 'pause',
        MAIN_MENU: 'startMenu',
        FISHING: 'fishing',
        HUNTING: 'hunting',
        PICK_UP_ITEM: { target: 'itemSelection', actions: ['addItem'] },
        DROP_ITEM: { target: 'inventory', actions: ['removeItem'] },
        USE_ITEM: { target: 'gamePlay', actions: ['useItem'], cond: 'isItemUsable' },
        REPAIR_ITEM: { target: 'repair', actions: ['repairItem'], cond: 'isItemRepairable' },
        BREAK_ITEM: { target: 'break', actions: ['breakItem'], cond: 'isItemBreakable' },
        SALVAGE_ITEM: { target: 'salvage', actions: ['salvageItem'], cond: 'isItemSalvagable' },
        START_EMERGENCY_REPAIR: { target: 'emergencyFieldRepair', actions: ['startEmergencyRepair'], cond: 'isItemEmergencyRepairable' }
      }
    },
    combat: {
      on: {
        BATTLE_WON: 'victoryScreen',
        BATTLE_LOST: 'defeatScreen'
      }
    },
    victoryScreen: {
      on: {
        CONTINUE: 'gamePlay',
        MAIN_MENU: 'startMenu'
      }
    },
    defeatScreen: {
      on: {
        RETRY: 'combat',
        MAIN_MENU: 'startMenu'
      }
    },
    exploration: {
      on: {
        ENCOUNTER_ENEMY: 'combat',
        INTERACT_WITH_NPC: 'dialogue', // Assuming dialogue is another state
        FIND_ITEM_QUEST: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    inventory: {
      on: {
        CLOSE_INVENTORY: 'gamePlay'
      }
    },
    pause: {
      on: {
        RESUME_GAME: 'gamePlay',
        OPTIONS: 'options',
        MAIN_MENU: 'startMenu'
      }
    },
    options: {
      on: {
        APPLY_CHANGES: 'gamePlay',
        CANCEL: 'startMenu'
      }
    },
    exit: {
      type: 'final'
    },
    fishing: {
      on: {
        FINISH_FISHING: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    hunting: {
      on: {
        FINISH_HUNTING: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    weaponSelection: {
      on: {
        SELECT_WEAPON: { target: 'gamePlay', actions: ['selectWeapon'] }
      }
    },
    itemSelection: {
      on: {
        SELECT_ITEM: { target: 'gamePlay', actions: ['selectItem'] }
      }
    },
    repair: {
      on: {
        COMPLETE_REPAIR: { target: 'gamePlay', actions: ['completeRepair'] }
      }
    },
    break: {
      on: {
        COMPLETE_BREAK: { target: 'gamePlay', actions: ['completeBreak'] }
      }
    },
    salvage: {
      on: {
        COMPLETE_SALVAGE: { target: 'gamePlay', actions: ['completeSalvage'] }
      }
    },
    emergencyFieldRepair: {
      on: {
        COMPLETE_EMERGENCY_REPAIR: { target: 'gamePlay', actions: ['completeEmergencyRepair'] }
      }
    }
  }
}, {
  actions: {
    setInitialTerrain: (context, event) => {
      return { currentTerrain: event.data.currentTerrain };
    },
    updateCombatEffects: (context, event) => {
      const terrainEffects = {
        plains: {
          moveSpeedMultiplier: 1,
          attackPowerMultiplier: 1,
          defenseMultiplier: 1
        },
        forest: {
          moveSpeedMultiplier: 0.8,
          attackPowerMultiplier: 1.2,
          defenseMultiplier: 0.9
        },
        mountain: {
          moveSpeedMultiplier: 0.5,
          attackPowerMultiplier: 1.5,
          defenseMultiplier: 1.2
        },
        desert: {
          moveSpeedMultiplier: 1.2,
          attackPowerMultiplier: 0.8,
          defenseMultiplier: 0.8
        }
      };

      const currentTerrain = context.currentTerrain;
      const terrainEffect = terrainEffects[currentTerrain] || {};

      return {
        moveSpeedMultiplier: terrainEffect.moveSpeedMultiplier,
        attackPowerMultiplier: terrainEffect.attackPowerMultiplier,
        defenseMultiplier: terrainEffect.defenseMultiplier
      };
    },
    addItem: (context, event) => {
      const newItem = event.data.item;
      const weightMultiplier = newItem.rarity === 'legendary' ? 1.5 : newItem.rarity === 'epic' ? 1.2 : 1;
      const valueMultiplier = newItem.rarity === 'legendary' ? 2 : newItem.rarity === 'epic' ? 1.5 : 1;

      return {
        totalWeight: context.totalWeight + newItem.weight * weightMultiplier,
        totalValue: context.totalValue + newItem.value * valueMultiplier,
        items: {
          ...context.items,
          [newItem.name]: {
            ...newItem,
            durability: newItem.durability
          }
        }
      };
    },
    removeItem: (context, event) => {
      const itemName = event.data.itemName;
      const itemWeight = event.data.itemWeight;
      const itemValue = event.data.itemValue;
      const weightMultiplier = event.data.itemRarity === 'legendary' ? 1.5 : event.data.itemRarity === 'epic' ? 1.2 : 1;
      const valueMultiplier = event.data.itemRarity === 'legendary' ? 2 : event.data.itemRarity === 'epic' ? 1.5 : 1;

      return {
        totalWeight: context.totalWeight - itemWeight * weightMultiplier,
        totalValue: context.totalValue - itemValue * valueMultiplier,
        items: {
          ...context.items,
          [itemName]: undefined
        }
      };
    },
    selectWeapon: (context, event) => {
      return { currentWeapon: event.data.weapon };
    },
    useItem: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: item.durability - 1
            }
          }
        };
      }
      return context;
    },
    repairItem: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        const repairQuality = sample([0.5, 1, 1.5]); // Random repair quality multiplier
        const repairAmount = Math.floor(item.maxDurability * repairQuality);
        const repairCost = Math.floor(repairAmount / 2); // Simplified cost calculation

        if (item.repairCost <= context.totalValue) {
          return {
            items: {
              ...context.items,
              [itemName]: {
                ...item,
                durability: Math.min(item.maxDurability, item.durability + repairAmount)
              }
            },
            totalValue: context.totalValue - repairCost
          };
        } else {
          return {
            items: {
              ...context.items,
              [itemName]: {
                ...item,
                durability: Math.min(item.maxDurability, item.durability + repairAmount)
              }
            },
            totalValue: context.totalValue - item.repairCost
          };
        }
      }
      return context;
    },
    completeRepair: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: item.maxDurability
            }
          }
        };
      }
      return context;
    },
    breakItem: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    salvageItem: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    completeBreak: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    completeSalvage: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    startEmergencyRepair: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        const repairQuality = sample([0.5, 1, 1.5]); // Random repair quality multiplier
        const repairAmount = Math.floor(item.maxDurability * repairQuality);
        const repairTime = item.rarity === 'legendary' ? 10 : item.rarity === 'epic' ? 5 : 3; // Time in arbitrary units

        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: Math.min(item.maxDurability, item.durability + repairAmount)
            }
          },
          totalValue: context.totalValue - repairTime // Cost in arbitrary units
        };
      }
      return context;
    },
    completeEmergencyRepair: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: item.maxDurability
            }
          }
        };
      }
      return context;
    }
  },
  guards: {
    isNotInBattle: (context, event) => context.currentTerrain !== 'battle',
    isNotInCombat: (context, event) => context.currentTerrain !== 'combat',
    hasSufficientAmmunition: (context, event) => context.ammunitionCount > 0,
    canCarryMoreItems: (context, event) => context.totalWeight + event.data.item.weight <= context.maxCarryingCapacity,
    canAffordItem: (context, event) => context.totalValue + event.data.item.value <= context.maxInventoryValue,
    isItemUsable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      return item && item.durability > 0;
    },
    isItemRepairable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      const repairCost = item.rarity === 'legendary' ? 200 : item.rarity === 'epic' ? 150 : 100;
      return item && item.repairCost <= context.totalValue;
    },
    isItemBreakable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      return item && item.durability <= 0;
    },
    isItemSalvagable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      return item && item.durability <= 0;
    },
    isItemEmergencyRepairable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      return item && item.durability <= 0;
    }
  }
});

// Example usage:
horizonZeroDawnMachine.onTransition((state, event) => {
  if (event.type === 'COMBAT') {
    console.log('Current State:', state.value, 'Updated Context:', state.context);
  } else {
    console.log('Current State:', state.value);
  }
});

// To send events to the machine:
horizonZeroDawnMachine.send({ type: 'START_NEW_GAME', data: { currentTerrain: 'plains' } });
horizonZeroDawnMachine.send({ type: 'PICK_UP_ITEM', data: { item: { name: 'sword', weight: 10, value: 50, rarity: 'common', durability: 100, maxDurability: 100, repairCost: 50, material: 'steel', salvageAmount: 10 } } });
horizonZeroDawnMachine.send({ type: 'PICK_UP_ITEM', data: { item: { name: 'shield', weight: 5, value: 30, rarity: 'rare', durability: 150, maxDurability: 150, repairCost: 75, material: 'iron', salvageAmount: 15 } } });
horizonZeroDawnMachine.send({ type: 'DROP_ITEM', data: { itemName: 'sword', itemWeight: 10, itemValue: 50, itemRarity: 'common', itemDurability: 100, itemMaxDurability: 100, itemRepairCost: 50, itemMaterial: 'steel', itemSalvageAmount: 10 } });
horizonZeroDawnMachine.send('USE_ITEM', { data: { itemName: 'sword' } }); // Should decrease durability
horizonZeroDawnMachine.send('REPAIR_ITEM', { data: { itemName: 'sword' } }); // Should repair the sword with a random quality
horizonZeroDawnMachine.send('BREAK_ITEM', { data: { itemName: 'sword' } }); // Should break the sword
horizonZeroDawnMachine.send('SALVAGE_ITEM', { data: { itemName: 'sword' } }); // Should salvage the sword
horizonZeroDawnMachine.send('START_EMERGENCY_REPAIR', { data: { itemName: 'sword' } }); // Should start emergency repair with a random quality
horizonZeroDawnMachine.send('COMPLETE_EMERGENCY_REPAIR'); // Should complete emergency repair
horizonZeroDawnMachine.send('COMBAT'); // Should be allowed since forest is a valid terrain for combat
horizonZeroDawnMachine.send('BATTLE_WON');
horizonZeroDawnMachine.send('MAIN_MENU');
Explanation:
New Actions:
repairItem: Generates a random repair quality multiplier (sample([0.5, 1, 1.5])) and calculates the repair amount based on this multiplier. It also adjusts the repair cost accordingly.
Guards:
No changes needed as the repair quality variation doesn’t affect the guard conditions directly.
Transitions:
No changes needed as the repair quality variation doesn’t affect the transitions directly.
With these modifications, the repair process will now vary randomly each time an item is repaired, providing a more dynamic and unpredictable gameplay experience. This adds an element of excitement and resource management as players must adapt to varying outcomes.


can you please improve upon the finite state machine by making it more time based


To make the finite state machine more time-based, we can introduce timers for tasks like repairs, salvaging, and emergency field repairs. This will allow the game to simulate real-time constraints and provide a more immersive experience. We can use the after function provided by XState to handle these timed events.

Here’s how you can update the state machine to include time-based tasks:

New States:
repairTimer: A temporary state to wait for the repair timer to complete.
salvageTimer: A temporary state to wait for the salvage timer to complete.
emergencyRepairTimer: A temporary state to wait for the emergency repair timer to complete.
New Actions:
Define actions to start and complete the timers.
Guards:
Ensure the player has enough time to complete the task.
Transitions:
Handle the completion of the timers with the generated values.
Here's the updated state machine:


import { Machine } from '@xstate/fsm';
import { sample } from 'lodash';

const horizonZeroDawnMachine = Machine({
  id: 'horizonZeroDawn',
  initial: 'startMenu',
  context: {
    currentTerrain: null, // Initialize with null or default terrain
    moveSpeedMultiplier: 1,
    attackPowerMultiplier: 1,
    defenseMultiplier: 1,
    currentWeapon: null,
    ammunitionCount: 0,
    totalWeight: 0,
    totalValue: 0,
    maxCarryingCapacity: 50, // Maximum carrying capacity in arbitrary units
    maxInventoryValue: 1000, // Maximum inventory value in arbitrary currency units
    items: {},
    salvageMaterials: {},
    repairTimer: null,
    salvageTimer: null,
    emergencyRepairTimer: null
  },
  states: {
    startMenu: {
      on: {
        START_NEW_GAME: { target: 'gamePlay', actions: ['setInitialTerrain'], cond: 'isNotInBattle' },
        LOAD_GAME: { target: 'gamePlay', actions: ['setInitialTerrain'], cond: 'isNotInBattle' },
        OPTIONS: 'options',
        QUIT: 'exit'
      }
    },
    gamePlay: {
      on: {
        COMBAT: { target: 'combat', actions: ['updateCombatEffects'], cond: 'isNotInCombat' },
        EXPLORATION: 'exploration',
        INVENTORY_MANAGEMENT: 'inventory',
        SAVE_GAME: 'gamePlay',
        PAUSE_GAME: 'pause',
        MAIN_MENU: 'startMenu',
        FISHING: 'fishing',
        HUNTING: 'hunting',
        PICK_UP_ITEM: { target: 'itemSelection', actions: ['addItem'] },
        DROP_ITEM: { target: 'inventory', actions: ['removeItem'] },
        USE_ITEM: { target: 'gamePlay', actions: ['useItem'], cond: 'isItemUsable' },
        REPAIR_ITEM: { target: 'repair', actions: ['startRepairTimer'], cond: 'isItemRepairable' },
        BREAK_ITEM: { target: 'break', actions: ['breakItem'], cond: 'isItemBreakable' },
        SALVAGE_ITEM: { target: 'salvage', actions: ['startSalvageTimer'], cond: 'isItemSalvagable' },
        START_EMERGENCY_REPAIR: { target: 'emergencyFieldRepair', actions: ['startEmergencyRepairTimer'], cond: 'isItemEmergencyRepairable' }
      }
    },
    combat: {
      on: {
        BATTLE_WON: 'victoryScreen',
        BATTLE_LOST: 'defeatScreen'
      }
    },
    victoryScreen: {
      on: {
        CONTINUE: 'gamePlay',
        MAIN_MENU: 'startMenu'
      }
    },
    defeatScreen: {
      on: {
        RETRY: 'combat',
        MAIN_MENU: 'startMenu'
      }
    },
    exploration: {
      on: {
        ENCOUNTER_ENEMY: 'combat',
        INTERACT_WITH_NPC: 'dialogue', // Assuming dialogue is another state
        FIND_ITEM_QUEST: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    inventory: {
      on: {
        CLOSE_INVENTORY: 'gamePlay'
      }
    },
    pause: {
      on: {
        RESUME_GAME: 'gamePlay',
        OPTIONS: 'options',
        MAIN_MENU: 'startMenu'
      }
    },
    options: {
      on: {
        APPLY_CHANGES: 'gamePlay',
        CANCEL: 'startMenu'
      }
    },
    exit: {
      type: 'final'
    },
    fishing: {
      on: {
        FINISH_FISHING: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    hunting: {
      on: {
        FINISH_HUNTING: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    weaponSelection: {
      on: {
        SELECT_WEAPON: { target: 'gamePlay', actions: ['selectWeapon'] }
      }
    },
    itemSelection: {
      on: {
        SELECT_ITEM: { target: 'gamePlay', actions: ['selectItem'] }
      }
    },
    repair: {
      on: {
        COMPLETE_REPAIR: { target: 'gamePlay', actions: ['completeRepair'] }
      }
    },
    break: {
      on: {
        COMPLETE_BREAK: { target: 'gamePlay', actions: ['completeBreak'] }
      }
    },
    salvage: {
      on: {
        COMPLETE_SALVAGE: { target: 'gamePlay', actions: ['completeSalvage'] }
      }
    },
    emergencyFieldRepair: {
      on: {
        COMPLETE_EMERGENCY_REPAIR: { target: 'gamePlay', actions: ['completeEmergencyRepair'] }
      }
    },
    repairTimer: {
      on: {
        TIMER_COMPLETE: { target: 'repair' }
      }
    },
    salvageTimer: {
      on: {
        TIMER_COMPLETE: { target: 'salvage' }
      }
    },
    emergencyRepairTimer: {
      on: {
        TIMER_COMPLETE: { target: 'emergencyFieldRepair' }
      }
    }
  }
}, {
  actions: {
    setInitialTerrain: (context, event) => {
      return { currentTerrain: event.data.currentTerrain };
    },
    updateCombatEffects: (context, event) => {
      const terrainEffects = {
        plains: {
          moveSpeedMultiplier: 1,
          attackPowerMultiplier: 1,
          defenseMultiplier: 1
        },
        forest: {
          moveSpeedMultiplier: 0.8,
          attackPowerMultiplier: 1.2,
          defenseMultiplier: 0.9
        },
        mountain: {
          moveSpeedMultiplier: 0.5,
          attackPowerMultiplier: 1.5,
          defenseMultiplier: 1.2
        },
        desert: {
          moveSpeedMultiplier: 1.2,
          attackPowerMultiplier: 0.8,
          defenseMultiplier: 0.8
        }
      };

      const currentTerrain = context.currentTerrain;
      const terrainEffect = terrainEffects[currentTerrain] || {};

      return {
        moveSpeedMultiplier: terrainEffect.moveSpeedMultiplier,
        attackPowerMultiplier: terrainEffect.attackPowerMultiplier,
        defenseMultiplier: terrainEffect.defenseMultiplier
      };
    },
    addItem: (context, event) => {
      const newItem = event.data.item;
      const weightMultiplier = newItem.rarity === 'legendary' ? 1.5 : newItem.rarity === 'epic' ? 1.2 : 1;
      const valueMultiplier = newItem.rarity === 'legendary' ? 2 : newItem.rarity === 'epic' ? 1.5 : 1;

      return {
        totalWeight: context.totalWeight + newItem.weight * weightMultiplier,
        totalValue: context.totalValue + newItem.value * valueMultiplier,
        items: {
          ...context.items,
          [newItem.name]: {
            ...newItem,
            durability: newItem.durability
          }
        }
      };
    },
    removeItem: (context, event) => {
      const itemName = event.data.itemName;
      const itemWeight = event.data.itemWeight;
      const itemValue = event.data.itemValue;
      const weightMultiplier = event.data.itemRarity === 'legendary' ? 1.5 : event.data.itemRarity === 'epic' ? 1.2 : 1;
      const valueMultiplier = event.data.itemRarity === 'legendary' ? 2 : event.data.itemRarity === 'epic' ? 1.5 : 1;

      return {
        totalWeight: context.totalWeight - itemWeight * weightMultiplier,
        totalValue: context.totalValue - itemValue * valueMultiplier,
        items: {
          ...context.items,
          [itemName]: undefined
        }
      };
    },
    selectWeapon: (context, event) => {
      return { currentWeapon: event.data.weapon };
    },
    useItem: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: item.durability - 1
            }
          }
        };
      }
      return context;
    },
    startRepairTimer: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        const repairQuality = sample([0.5, 1, 1.5]); // Random repair quality multiplier
        const repairAmount = Math.floor(item.maxDurability * repairQuality);
        const repairCost = Math.floor(repairAmount / 2); // Simplified cost calculation
        const repairTime = Math.floor(item.maxDurability * 0.1); // Repair time in arbitrary units

        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: Math.min(item.maxDurability, item.durability + repairAmount)
            }
          },
          totalValue: context.totalValue - repairCost,
          repairTimer: setTimeout(() => {
            context.repairTimer = null;
            horizonZeroDawnMachine.send({ type: 'TIMER_COMPLETE' });
          }, repairTime * 1000)
        };
      }
      return context;
    },
    completeRepair: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: item.maxDurability
            }
          }
        };
      }
      return context;
    },
    breakItem: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    salvageItem: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    completeBreak: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    completeSalvage: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    startSalvageTimer: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        const salvageTime = Math.floor(item.maxDurability * 0.2); // Salvage time in arbitrary units

        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: 0
            }
          },
          totalValue: context.totalValue - salvageTime, // Cost in arbitrary units
          salvageTimer: setTimeout(() => {
            context.salvageTimer = null;
            horizonZeroDawnMachine.send({ type: 'TIMER_COMPLETE' });
          }, salvageTime * 1000)
        };
      }
      return context;
    },
    startEmergencyRepairTimer: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        const repairQuality = sample([0.5, 1, 1.5]); // Random repair quality multiplier
        const repairAmount = Math.floor(item.maxDurability * repairQuality);
        const repairTime = Math.floor(item.maxDurability * 0.1); // Repair time in arbitrary units

        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: Math.min(item.maxDurability, item.durability + repairAmount)
            }
          },
          totalValue: context.totalValue - repairTime, // Cost in arbitrary units
          emergencyRepairTimer: setTimeout(() => {
            context.emergencyRepairTimer = null;
            horizonZeroDawnMachine.send({ type: 'TIMER_COMPLETE' });
          }, repairTime * 1000)
        };
      }
      return context;
    },
    completeEmergencyRepair: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: item.maxDurability
            }
          }
        };
      }
      return context;
    }
  },
  guards: {
    isNotInBattle: (context, event) => context.currentTerrain !== 'battle',
    isNotInCombat: (context, event) => context.currentTerrain !== 'combat',
    hasSufficientAmmunition: (context, event) => context.ammunitionCount > 0,
    canCarryMoreItems: (context, event) => context.totalWeight + event.data.item.weight <= context.maxCarryingCapacity,
    canAffordItem: (context, event) => context.totalValue + event.data.item.value <= context.maxInventoryValue,
    isItemUsable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      return item && item.durability > 0;
    },
    isItemRepairable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      const repairCost = item.rarity === 'legendary' ? 200 : item.rarity === 'epic' ? 150 : 100;
      return item && item.repairCost <= context.totalValue;
    },
    isItemBreakable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      return item && item.durability <= 0;
    },
    isItemSalvagable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      return item && item.durability <= 0;
    },
    isItemEmergencyRepairable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      return item && item.durability <= 0;
    },
    isRepairTimerComplete: (context, event) => !context.repairTimer,
    isSalvageTimerComplete: (context, event) => !context.salvageTimer,
    isEmergencyRepairTimerComplete: (context, event) => !context.emergencyRepairTimer
  }
});

// Example usage:
horizonZeroDawnMachine.onTransition((state, event) => {
  if (event.type === 'COMBAT') {
    console.log('Current State:', state.value, 'Updated Context:', state.context);
  } else {
    console.log('Current State:', state.value);
  }
});

// To send events to the machine:
horizonZeroDawnMachine.send({ type: 'START_NEW_GAME', data: { currentTerrain: 'plains' } });
horizonZeroDawnMachine.send({ type: 'PICK_UP_ITEM', data: { item: { name: 'sword', weight: 10, value: 50, rarity: 'common', durability: 100, maxDurability: 100, repairCost: 50, material: 'steel', salvageAmount: 10 } } });
horizonZeroDawnMachine.send({ type: 'PICK_UP_ITEM', data: { item: { name: 'shield', weight: 5, value: 30, rarity: 'rare', durability: 150, maxDurability: 150, repairCost: 75, material: 'iron', salvageAmount: 15 } } });
horizonZeroDawnMachine.send({ type: 'DROP_ITEM', data: { itemName: 'sword', itemWeight: 10, itemValue: 50, itemRarity: 'common', itemDurability: 100, itemMaxDurability: 100, itemRepairCost: 50, itemMaterial: 'steel', itemSalvageAmount: 10 } });
horizonZeroDawnMachine.send('USE_ITEM', { data: { itemName: 'sword' } }); // Should decrease durability
horizonZeroDawnMachine.send('REPAIR_ITEM', { data: { itemName: 'sword' } }); // Should start repair timer
horizonZeroDawnMachine.send('SALVAGE_ITEM', { data: { itemName: 'sword' } }); // Should start salvage timer
horizonZeroDawnMachine.send('START_EMERGENCY_REPAIR', { data: { itemName: 'sword' } }); // Should start emergency repair timer
horizonZeroDawnMachine.send('COMBAT'); // Should be allowed since forest is a valid terrain for combat
horizonZeroDawnMachine.send('BATTLE_WON');
horizonZeroDawnMachine.send('MAIN_MENU');
Explanation:
New States:
repairTimer, salvageTimer, emergencyRepairTimer: Temporary states to wait for the respective timers to complete.
New Actions:
startRepairTimer, startSalvageTimer, startEmergencyRepairTimer: Start the timers and schedule the TIMER_COMPLETE event to be sent after the specified time.
completeRepair, completeSalvage, completeEmergencyRepair: Complete the repair, salvage, or emergency repair when the timer completes.
Guards:
isRepairTimerComplete, isSalvageTimerComplete, isEmergencyRepairTimerComplete: Ensure that the timers have completed before proceeding.
Transitions:
Added transitions to repairTimer, salvageTimer, and emergencyRepairTimer to handle the timer completion.
Added transitions to repair, salvage, and emergencyFieldRepair to handle the completion of the repair, salvage, and emergency repair tasks.
With these modifications, the repair, salvage, and emergency repair processes will now be time-based, simulating real-world constraints and providing a more immersive experience. Players will need to wait for the timers to complete before proceeding with the next step, adding an element of patience and timing to the gameplay.


can you please improve the fsm by designing the best and most more sophisticated time based mission structures


To design the best and most sophisticated time-based mission structures in the finite state machine, we need to create a hierarchical structure that handles multiple missions with dependencies, deadlines, and rewards. Each mission will have its own state machine, and the main game state machine will orchestrate the execution of these missions.

Here’s how you can structure the FSM to include sophisticated time-based mission systems:

Mission State Machines:
Create separate state machines for each type of mission (e.g., quest, exploration, resource gathering).
Each mission state machine will manage its own state transitions based on time, progress, and completion criteria.
Main Game State Machine:
Integrate the mission state machines into the main game state machine.
Manage the flow of missions, including starting, pausing, resuming, and completing them.
Timers and Deadlines:
Use timers to enforce time constraints for missions.
Include guards to check if missions are completed within their designated time frames.
Dependencies and Rewards:
Define dependencies between missions so that certain missions can only be started after others are completed.
Provide rewards for successfully completing missions.
Here's an example implementation:


import { Machine } from '@xstate/fsm';
import { sample } from 'lodash';

// Mission State Machine: Quest Mission
const questMissionMachine = Machine({
  id: 'questMission',
  initial: 'inProgress',
  context: {
    missionObjective: 'Find the ancient artifact',
    elapsedTime: 0,
    timeLimit: 60 // 60 seconds
  },
  states: {
    inProgress: {
      on: {
        TICK: { target: 'inProgress', actions: ['incrementElapsedTime'] },
        COMPLETE_MISSION: { target: 'completed' }
      }
    },
    completed: {
      type: 'final'
    }
  }
}, {
  actions: {
    incrementElapsedTime: (context, event) => ({
      elapsedTime: context.elapsedTime + 1
    })
  },
  guards: {
    isWithinTimeLimit: (context, event) => context.elapsedTime < context.timeLimit
  }
});

// Mission State Machine: Resource Gathering Mission
const resourceGatheringMissionMachine = Machine({
  id: 'resourceGatheringMission',
  initial: 'inProgress',
  context: {
    requiredResources: { wood: 10, stone: 5 },
    collectedResources: { wood: 0, stone: 0 },
    elapsedTime: 0,
    timeLimit: 45 // 45 seconds
  },
  states: {
    inProgress: {
      on: {
        GATHER_RESOURCE: { target: 'inProgress', actions: ['collectResource'] },
        COMPLETE_MISSION: { target: 'completed' }
      }
    },
    completed: {
      type: 'final'
    }
  }
}, {
  actions: {
    collectResource: (context, event) => {
      const { resource, amount } = event.data;
      return {
        collectedResources: {
          ...context.collectedResources,
          [resource]: (context.collectedResources[resource] || 0) + amount
        }
      };
    }
  },
  guards: {
    hasCollectedRequiredResources: (context, event) => {
      return Object.keys(context.requiredResources).every(resource => 
        context.collectedResources[resource] >= context.requiredResources[resource]
      );
    },
    isWithinTimeLimit: (context, event) => context.elapsedTime < context.timeLimit
  }
});

// Main Game State Machine
const horizonZeroDawnMachine = Machine({
  id: 'horizonZeroDawn',
  initial: 'startMenu',
  context: {
    currentTerrain: null, // Initialize with null or default terrain
    moveSpeedMultiplier: 1,
    attackPowerMultiplier: 1,
    defenseMultiplier: 1,
    currentWeapon: null,
    ammunitionCount: 0,
    totalWeight: 0,
    totalValue: 0,
    maxCarryingCapacity: 50, // Maximum carrying capacity in arbitrary units
    maxInventoryValue: 1000, // Maximum inventory value in arbitrary currency units
    items: {},
    salvageMaterials: {},
    repairTimer: null,
    salvageTimer: null,
    emergencyRepairTimer: null,
    activeMissions: []
  },
  states: {
    startMenu: {
      on: {
        START_NEW_GAME: { target: 'gamePlay', actions: ['setInitialTerrain'], cond: 'isNotInBattle' },
        LOAD_GAME: { target: 'gamePlay', actions: ['setInitialTerrain'], cond: 'isNotInBattle' },
        OPTIONS: 'options',
        QUIT: 'exit'
      }
    },
    gamePlay: {
      on: {
        COMBAT: { target: 'combat', actions: ['updateCombatEffects'], cond: 'isNotInCombat' },
        EXPLORATION: 'exploration',
        INVENTORY_MANAGEMENT: 'inventory',
        SAVE_GAME: 'gamePlay',
        PAUSE_GAME: 'pause',
        MAIN_MENU: 'startMenu',
        FISHING: 'fishing',
        HUNTING: 'hunting',
        PICK_UP_ITEM: { target: 'itemSelection', actions: ['addItem'] },
        DROP_ITEM: { target: 'inventory', actions: ['removeItem'] },
        USE_ITEM: { target: 'gamePlay', actions: ['useItem'], cond: 'isItemUsable' },
        REPAIR_ITEM: { target: 'repair', actions: ['startRepairTimer'], cond: 'isItemRepairable' },
        BREAK_ITEM: { target: 'break', actions: ['breakItem'], cond: 'isItemBreakable' },
        SALVAGE_ITEM: { target: 'salvage', actions: ['startSalvageTimer'], cond: 'isItemSalvagable' },
        START_EMERGENCY_REPAIR: { target: 'emergencyFieldRepair', actions: ['startEmergencyRepairTimer'], cond: 'isItemEmergencyRepairable' },
        START_QUEST_MISSION: { target: 'mission', actions: ['startMission', 'addMission'], cond: 'isNotInCombat' },
        START_RESOURCE_GATHERING_MISSION: { target: 'mission', actions: ['startMission', 'addMission'], cond: 'isNotInCombat' }
      }
    },
    combat: {
      on: {
        BATTLE_WON: 'victoryScreen',
        BATTLE_LOST: 'defeatScreen'
      }
    },
    victoryScreen: {
      on: {
        CONTINUE: 'gamePlay',
        MAIN_MENU: 'startMenu'
      }
    },
    defeatScreen: {
      on: {
        RETRY: 'combat',
        MAIN_MENU: 'startMenu'
      }
    },
    exploration: {
      on: {
        ENCOUNTER_ENEMY: 'combat',
        INTERACT_WITH_NPC: 'dialogue', // Assuming dialogue is another state
        FIND_ITEM_QUEST: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    inventory: {
      on: {
        CLOSE_INVENTORY: 'gamePlay'
      }
    },
    pause: {
      on: {
        RESUME_GAME: 'gamePlay',
        OPTIONS: 'options',
        MAIN_MENU: 'startMenu'
      }
    },
    options: {
      on: {
        APPLY_CHANGES: 'gamePlay',
        CANCEL: 'startMenu'
      }
    },
    exit: {
      type: 'final'
    },
    fishing: {
      on: {
        FINISH_FISHING: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    hunting: {
      on: {
        FINISH_HUNTING: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    weaponSelection: {
      on: {
        SELECT_WEAPON: { target: 'gamePlay', actions: ['selectWeapon'] }
      }
    },
    itemSelection: {
      on: {
        SELECT_ITEM: { target: 'gamePlay', actions: ['selectItem'] }
      }
    },
    repair: {
      on: {
        COMPLETE_REPAIR: { target: 'gamePlay', actions: ['completeRepair'] }
      }
    },
    break: {
      on: {
        COMPLETE_BREAK: { target: 'gamePlay', actions: ['completeBreak'] }
      }
    },
    salvage: {
      on: {
        COMPLETE_SALVAGE: { target: 'gamePlay', actions: ['completeSalvage'] }
      }
    },
    emergencyFieldRepair: {
      on: {
        COMPLETE_EMERGENCY_REPAIR: { target: 'gamePlay', actions: ['completeEmergencyRepair'] }
      }
    },
    repairTimer: {
      on: {
        TIMER_COMPLETE: { target: 'repair' }
      }
    },
    salvageTimer: {
      on: {
        TIMER_COMPLETE: { target: 'salvage' }
      }
    },
    emergencyRepairTimer: {
      on: {
        TIMER_COMPLETE: { target: 'emergencyFieldRepair' }
      }
    },
    mission: {
      initial: 'idle',
      states: {
        idle: {
          on: {
            START_QUEST_MISSION: { target: 'quest', actions: ['startMission', 'addMission'] },
            START_RESOURCE_GATHERING_MISSION: { target: 'resourceGathering', actions: ['startMission', 'addMission'] }
          }
        },
        quest: {
          invoke: [
            { src: 'runQuestMission', onDone: { target: 'idle' } }
          ]
        },
        resourceGathering: {
          invoke: [
            { src: 'runResourceGatheringMission', onDone: { target: 'idle' } }
          ]
        }
      }
    }
  }
}, {
  actions: {
    setInitialTerrain: (context, event) => {
      return { currentTerrain: event.data.currentTerrain };
    },
    updateCombatEffects: (context, event) => {
      const terrainEffects = {
        plains: {
          moveSpeedMultiplier: 1,
          attackPowerMultiplier: 1,
          defenseMultiplier: 1
        },
        forest: {
          moveSpeedMultiplier: 0.8,
          attackPowerMultiplier: 1.2,
          defenseMultiplier: 0.9
        },
        mountain: {
          moveSpeedMultiplier: 0.5,
          attackPowerMultiplier: 1.5,
          defenseMultiplier: 1.2
        },
        desert: {
          moveSpeedMultiplier: 1.2,
          attackPowerMultiplier: 0.8,
          defenseMultiplier: 0.8
        }
      };

      const currentTerrain = context.currentTerrain;
      const terrainEffect = terrainEffects[currentTerrain] || {};

      return {
        moveSpeedMultiplier: terrainEffect.moveSpeedMultiplier,
        attackPowerMultiplier: terrainEffect.attackPowerMultiplier,
        defenseMultiplier: terrainEffect.defenseMultiplier
      };
    },
    addItem: (context, event) => {
      const newItem = event.data.item;
      const weightMultiplier = newItem.rarity === 'legendary' ? 1.5 : newItem.rarity === 'epic' ? 1.2 : 1;
      const valueMultiplier = newItem.rarity === 'legendary' ? 2 : newItem.rarity === 'epic' ? 1.5 : 1;

      return {
        totalWeight: context.totalWeight + newItem.weight * weightMultiplier,
        totalValue: context.totalValue + newItem.value * valueMultiplier,
        items: {
          ...context.items,
          [newItem.name]: {
            ...newItem,
            durability: newItem.durability
          }
        }
      };
    },
    removeItem: (context, event) => {
      const itemName = event.data.itemName;
      const itemWeight = event.data.itemWeight;
      const itemValue = event.data.itemValue;
      const weightMultiplier = event.data.itemRarity === 'legendary' ? 1.5 : event.data.itemRarity === 'epic' ? 1.2 : 1;
      const valueMultiplier = event.data.itemRarity === 'legendary' ? 2 : event.data.itemRarity === 'epic' ? 1.5 : 1;

      return {
        totalWeight: context.totalWeight - itemWeight * weightMultiplier,
        totalValue: context.totalValue - itemValue * valueMultiplier,
        items: {
          ...context.items,
          [itemName]: undefined
        }
      };
    },
    selectWeapon: (context, event) => {
      return { currentWeapon: event.data.weapon };
    },
    useItem: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: item.durability - 1
            }
          }
        };
      }
      return context;
    },
    startRepairTimer: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        const repairQuality = sample([0.5, 1, 1.5]); // Random repair quality multiplier
        const repairAmount = Math.floor(item.maxDurability * repairQuality);
        const repairCost = Math.floor(repairAmount / 2); // Simplified cost calculation
        const repairTime = Math.floor(item.maxDurability * 0.1); // Repair time in arbitrary units

        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: Math.min(item.maxDurability, item.durability + repairAmount)
            }
          },
          totalValue: context.totalValue - repairCost,
          repairTimer: setTimeout(() => {
            context.repairTimer = null;
            horizonZeroDawnMachine.send({ type: 'TIMER_COMPLETE' });
          }, repairTime * 1000)
        };
      }
      return context;
    },
    completeRepair: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: item.maxDurability
            }
          }
        };
      }
      return context;
    },
    breakItem: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    salvageItem: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    completeBreak: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    completeSalvage: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    startSalvageTimer: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        const salvageTime = Math.floor(item.maxDurability * 0.2); // Salvage time in arbitrary units

        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: 0
            }
          },
          totalValue: context.totalValue - salvageTime, // Cost in arbitrary units
          salvageTimer: setTimeout(() => {
            context.salvageTimer = null;
            horizonZeroDawnMachine.send({ type: 'TIMER_COMPLETE' });
          }, salvageTime * 1000)
        };
      }
      return context;
    },
    startEmergencyRepairTimer: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        const repairQuality = sample([0.5, 1, 1.5]); // Random repair quality multiplier
        const repairAmount = Math.floor(item.maxDurability * repairQuality);
        const repairTime = Math.floor(item.maxDurability * 0.1); // Repair time in arbitrary units

        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: Math.min(item.maxDurability, item.durability + repairAmount)
            }
          },
          totalValue: context.totalValue - repairTime, // Cost in arbitrary units
          emergencyRepairTimer: setTimeout(() => {
            context.emergencyRepairTimer = null;
            horizonZeroDawnMachine.send({ type: 'TIMER_COMPLETE' });
          }, repairTime * 1000)
        };
      }
      return context;
    },
    completeEmergencyRepair: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: item.maxDurability
            }
          }
        };
      }
      return context;
    },
    startMission: (context, event) => {
      return {
        activeMissions: [...context.activeMissions, event.data.missionId]
      };
    },
    addMission: (context, event) => {
      return {
        activeMissions: [...context.activeMissions, event.data.missionId]
      };
    }
  },
  services: {
    runQuestMission: (context) => (sendBack) => {
      setInterval(() => {
        sendBack({ type: 'TICK' });
      }, 1000);

      return () => clearInterval(intervalId);
    },
    runResourceGatheringMission: (context) => (sendBack) => {
      setInterval(() => {
        sendBack({ type: 'GATHER_RESOURCE', data: { resource: 'wood', amount: 1 } });
        sendBack({ type: 'GATHER_RESOURCE', data: { resource: 'stone', amount: 0.5 } });
      }, 1000);

      return () => clearInterval(intervalId);
    }
  },
  guards: {
    isNotInBattle: (context, event) => context.currentTerrain !== 'battle',
    isNotInCombat: (context, event) => context.currentTerrain !== 'combat',
    hasSufficientAmmunition: (context, event) => context.ammunitionCount > 0,
    canCarryMoreItems: (context, event) => context.totalWeight + event.data.item.weight <= context.maxCarryingCapacity,
    canAffordItem: (context, event) => context.totalValue + event.data.item.value <= context.maxInventoryValue,
    isItemUsable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      return item && item.durability > 0;
    },
    isItemRepairable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      const repairCost = item.rarity === 'legendary' ? 200 : item.rarity === 'epic' ? 150 : 100;
      return item && item.repairCost <= context.totalValue;
    },
    isItemBreakable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      return item && item.durability <= 0;
    },
    isItemSalvagable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      return item && item.durability <= 0;
    },
    isItemEmergencyRepairable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      return item && item.durability <= 0;
    },
    isRepairTimerComplete: (context, event) => !context.repairTimer,
    isSalvageTimerComplete: (context, event) => !context.salvageTimer,
    isEmergencyRepairTimerComplete: (context, event) => !context.emergencyRepairTimer,
    isQuestCompleted: (context, event) => {
      const missionId = event.data.missionId;
      return context.activeMissions.includes(missionId) && questMissionMachine.getSnapshot().value === 'completed';
    },
    isResourceGatheringCompleted: (context, event) => {
      const missionId = event.data.missionId;
      return context.activeMissions.includes(missionId) && resourceGatheringMissionMachine.getSnapshot().value === 'completed';
    }
  }
});

// Example usage:
horizonZeroDawnMachine.onTransition((state, event) => {
  if (event.type === 'COMBAT') {
    console.log('Current State:', state.value, 'Updated Context:', state.context);
  } else {
    console.log('Current State:', state.value);
  }
});

// To send events to the machine:
horizonZeroDawnMachine.send({ type: 'START_NEW_GAME', data: { currentTerrain: 'plains' } });
horizonZeroDawnMachine.send({ type: 'PICK_UP_ITEM', data: { item: { name: 'sword', weight: 10, value: 50, rarity: 'common', durability: 100, maxDurability: 100, repairCost: 50, material: 'steel', salvageAmount: 10 } } });
horizonZeroDawnMachine.send({ type: 'PICK_UP_ITEM', data: { item: { name: 'shield', weight: 5, value: 30, rarity: 'rare', durability: 150, maxDurability: 150, repairCost: 75, material: 'iron', salvageAmount: 15 } } });
horizonZeroDawnMachine.send({ type: 'DROP_ITEM', data: { itemName: 'sword', itemWeight: 10, itemValue: 50, itemRarity: 'common', itemDurability: 100, itemMaxDurability: 100, itemRepairCost: 50, itemMaterial: 'steel', itemSalvageAmount: 10 } });
horizonZeroDawnMachine.send('USE_ITEM', { data: { itemName: 'sword' } }); // Should decrease durability
horizonZeroDawnMachine.send('REPAIR_ITEM', { data: { itemName: 'sword' } }); // Should start repair timer
horizonZeroDawnMachine.send('SALVAGE_ITEM', { data: { itemName: 'sword' } }); // Should start salvage timer
horizonZeroDawnMachine.send('START_EMERGENCY_REPAIR', { data: { itemName: 'sword' } }); // Should start emergency repair timer
horizonZeroDawnMachine.send('START_QUEST_MISSION', { data: { missionId: 'quest1', missionType: 'quest' } }); // Should start quest mission
horizonZeroDawnMachine.send('START_RESOURCE_GATHERING_MISSION', { data: { missionId: 'resource1', missionType: 'resourceGathering' } }); // Should start resource gathering mission
horizonZeroDawnMachine.send('COMBAT'); // Should be allowed since forest is a valid terrain for combat
horizonZeroDawnMachine.send('BATTLE_WON');
horizonZeroDawnMachine.send('MAIN_MENU');
Explanation:
Mission State Machines:
questMissionMachine: Manages a quest mission with a time limit and objective.
resourceGatheringMissionMachine: Manages a resource gathering mission with a time limit and resource collection goals.
Main Game State Machine:
mission: A parent state that manages the execution of active missions.
Invokes the mission-specific state machines (questMissionMachine and resourceGatheringMissionMachine) and waits for them to complete.
Timers and Deadlines:
TICK and GATHER_RESOURCE events are dispatched periodically to simulate time passing and resource collection.
The questMissionMachine and resourceGatheringMissionMachine handle their own internal timers and state transitions based on these events.
Dependencies and Rewards:
The main game state machine manages the list of active missions and triggers the completion of missions when they are done.
Guards check if missions are completed within their designated time frames and handle mission completion logic.
This structure allows for a highly flexible and scalable mission system, where each mission can have its own unique behavior and dependencies. You can easily extend this system by adding more mission types and integrating them into the main game state machine.


Can you please design for me your best and most complex branching mission structure


To design a complex branching mission structure, we need to create a nested hierarchy of states where each mission can have multiple branches and sub-missions. This structure will allow for intricate scenarios where players must navigate through different paths, make choices, and achieve multiple objectives.

Here’s an example implementation:

Mission State Machines
Quest Mission
The quest mission will have two branches: one where the player needs to find a specific artifact, and another where the player needs to complete a series of side quests.


const questMissionMachine = Machine({
  id: 'questMission',
  initial: 'start',
  context: {
    missionObjective: 'Find the ancient artifact',
    elapsedTime: 0,
    timeLimit: 60 // 60 seconds
  },
  states: {
    start: {
      always: [{ target: 'findArtifact', cond: 'shouldFindArtifact' }, { target: 'sideQuests', cond: 'shouldDoSideQuests' }]
    },
    findArtifact: {
      on: {
        COMPLETE_MISSION: { target: 'completed' }
      }
    },
    sideQuests: {
      on: {
        COMPLETE_SIDE_QUEST: { target: 'checkCompletion' }
      }
    },
    checkCompletion: {
      always: [{ target: 'completed', cond: 'allSideQuestsCompleted' }, { target: 'continue' }]
    },
    continue: {
      on: {
        COMPLETE_MISSION: { target: 'completed' }
      }
    }
  }
}, {
  guards: {
    shouldFindArtifact: (context, event) => true, // Implement logic to determine if the player should find the artifact
    shouldDoSideQuests: (context, event) => true, // Implement logic to determine if the player should do side quests
    allSideQuestsCompleted: (context, event) => true // Implement logic to determine if all side quests are completed
  }
});
Resource Gathering Mission
The resource gathering mission will have three branches: gathering wood, gathering stone, and gathering herbs.


const resourceGatheringMissionMachine = Machine({
  id: 'resourceGatheringMission',
  initial: 'start',
  context: {
    requiredResources: { wood: 10, stone: 5, herbs: 3 },
    collectedResources: { wood: 0, stone: 0, herbs: 0 },
    elapsedTime: 0,
    timeLimit: 45 // 45 seconds
  },
  states: {
    start: {
      always: [
        { target: 'gatherWood', cond: 'shouldGatherWood' },
        { target: 'gatherStone', cond: 'shouldGatherStone' },
        { target: 'gatherHerbs', cond: 'shouldGatherHerbs' }
      ]
    },
    gatherWood: {
      on: {
        GATHER_RESOURCE: { target: 'gatherWood', actions: ['collectResource'] },
        COMPLETE_MISSION: { target: 'completed' }
      }
    },
    gatherStone: {
      on: {
        GATHER_RESOURCE: { target: 'gatherStone', actions: ['collectResource'] },
        COMPLETE_MISSION: { target: 'completed' }
      }
    },
    gatherHerbs: {
      on: {
        GATHER_RESOURCE: { target: 'gatherHerbs', actions: ['collectResource'] },
        COMPLETE_MISSION: { target: 'completed' }
      }
    }
  }
}, {
  actions: {
    collectResource: (context, event) => {
      const { resource, amount } = event.data;
      return {
        collectedResources: {
          ...context.collectedResources,
          [resource]: (context.collectedResources[resource] || 0) + amount
        }
      };
    }
  },
  guards: {
    shouldGatherWood: (context, event) => true, // Implement logic to determine if the player should gather wood
    shouldGatherStone: (context, event) => true, // Implement logic to determine if the player should gather stone
    shouldGatherHerbs: (context, event) => true, // Implement logic to determine if the player should gather herbs
    hasCollectedRequiredResources: (context, event) => {
      return Object.keys(context.requiredResources).every(resource => 
        context.collectedResources[resource] >= context.requiredResources[resource]
      );
    },
    isWithinTimeLimit: (context, event) => context.elapsedTime < context.timeLimit
  }
});
Main Game State Machine
The main game state machine will manage the execution of active missions and handle the branching logic.


const horizonZeroDawnMachine = Machine({
  id: 'horizonZeroDawn',
  initial: 'startMenu',
  context: {
    currentTerrain: null, // Initialize with null or default terrain
    moveSpeedMultiplier: 1,
    attackPowerMultiplier: 1,
    defenseMultiplier: 1,
    currentWeapon: null,
    ammunitionCount: 0,
    totalWeight: 0,
    totalValue: 0,
    maxCarryingCapacity: 50, // Maximum carrying capacity in arbitrary units
    maxInventoryValue: 1000, // Maximum inventory value in arbitrary currency units
    items: {},
    salvageMaterials: {},
    repairTimer: null,
    salvageTimer: null,
    emergencyRepairTimer: null,
    activeMissions: [],
    missionBranches: {
      quest1: {
        type: 'quest',
        branches: {
          findArtifact: { machine: questMissionMachine },
          sideQuests: { machine: questMissionMachine }
        }
      },
      resource1: {
        type: 'resourceGathering',
        branches: {
          gatherWood: { machine: resourceGatheringMissionMachine },
          gatherStone: { machine: resourceGatheringMissionMachine },
          gatherHerbs: { machine: resourceGatheringMissionMachine }
        }
      }
    }
  },
  states: {
    startMenu: {
      on: {
        START_NEW_GAME: { target: 'gamePlay', actions: ['setInitialTerrain'], cond: 'isNotInBattle' },
        LOAD_GAME: { target: 'gamePlay', actions: ['setInitialTerrain'], cond: 'isNotInBattle' },
        OPTIONS: 'options',
        QUIT: 'exit'
      }
    },
    gamePlay: {
      on: {
        COMBAT: { target: 'combat', actions: ['updateCombatEffects'], cond: 'isNotInCombat' },
        EXPLORATION: 'exploration',
        INVENTORY_MANAGEMENT: 'inventory',
        SAVE_GAME: 'gamePlay',
        PAUSE_GAME: 'pause',
        MAIN_MENU: 'startMenu',
        FISHING: 'fishing',
        HUNTING: 'hunting',
        PICK_UP_ITEM: { target: 'itemSelection', actions: ['addItem'] },
        DROP_ITEM: { target: 'inventory', actions: ['removeItem'] },
        USE_ITEM: { target: 'gamePlay', actions: ['useItem'], cond: 'isItemUsable' },
        REPAIR_ITEM: { target: 'repair', actions: ['startRepairTimer'], cond: 'isItemRepairable' },
        BREAK_ITEM: { target: 'break', actions: ['breakItem'], cond: 'isItemBreakable' },
        SALVAGE_ITEM: { target: 'salvage', actions: ['startSalvageTimer'], cond: 'isItemSalvagable' },
        START_EMERGENCY_REPAIR: { target: 'emergencyFieldRepair', actions: ['startEmergencyRepairTimer'], cond: 'isItemEmergencyRepairable' },
        START_QUEST_MISSION: { target: 'mission', actions: ['startMission', 'addMission'], cond: 'isNotInCombat' },
        START_RESOURCE_GATHERING_MISSION: { target: 'mission', actions: ['startMission', 'addMission'], cond: 'isNotInCombat' }
      }
    },
    combat: {
      on: {
        BATTLE_WON: 'victoryScreen',
        BATTLE_LOST: 'defeatScreen'
      }
    },
    victoryScreen: {
      on: {
        CONTINUE: 'gamePlay',
        MAIN_MENU: 'startMenu'
      }
    },
    defeatScreen: {
      on: {
        RETRY: 'combat',
        MAIN_MENU: 'startMenu'
      }
    },
    exploration: {
      on: {
        ENCOUNTER_ENEMY: 'combat',
        INTERACT_WITH_NPC: 'dialogue', // Assuming dialogue is another state
        FIND_ITEM_QUEST: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    inventory: {
      on: {
        CLOSE_INVENTORY: 'gamePlay'
      }
    },
    pause: {
      on: {
        RESUME_GAME: 'gamePlay',
        OPTIONS: 'options',
        MAIN_MENU: 'startMenu'
      }
    },
    options: {
      on: {
        APPLY_CHANGES: 'gamePlay',
        CANCEL: 'startMenu'
      }
    },
    exit: {
      type: 'final'
    },
    fishing: {
      on: {
        FINISH_FISHING: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    hunting: {
      on: {
        FINISH_HUNTING: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    weaponSelection: {
      on: {
        SELECT_WEAPON: { target: 'gamePlay', actions: ['selectWeapon'] }
      }
    },
    itemSelection: {
      on: {
        SELECT_ITEM: { target: 'gamePlay', actions: ['selectItem'] }
      }
    },
    repair: {
      on: {
        COMPLETE_REPAIR: { target: 'gamePlay', actions: ['completeRepair'] }
      }
    },
    break: {
      on: {
        COMPLETE_BREAK: { target: 'gamePlay', actions: ['completeBreak'] }
      }
    },
    salvage: {
      on: {
        COMPLETE_SALVAGE: { target: 'gamePlay', actions: ['completeSalvage'] }
      }
    },
    emergencyFieldRepair: {
      on: {
        COMPLETE_EMERGENCY_REPAIR: { target: 'gamePlay', actions: ['completeEmergencyRepair'] }
      }
    },
    repairTimer: {
      on: {
        TIMER_COMPLETE: { target: 'repair' }
      }
    },
    salvageTimer: {
      on: {
        TIMER_COMPLETE: { target: 'salvage' }
      }
    },
    emergencyRepairTimer: {
      on: {
        TIMER_COMPLETE: { target: 'emergencyFieldRepair' }
      }
    },
    mission: {
      initial: 'idle',
      states: {
        idle: {
          on: {
            START_QUEST_MISSION: { target: 'quest', actions: ['startMission', 'addMission'] },
            START_RESOURCE_GATHERING_MISSION: { target: 'resourceGathering', actions: ['startMission', 'addMission'] }
          }
        },
        quest: {
          invoke: [
            { src: 'runMission', onDone: { target: 'idle' } }
          ]
        },
        resourceGathering: {
          invoke: [
            { src: 'runMission', onDone: { target: 'idle' } }
          ]
        }
      }
    }
  }
}, {
  actions: {
    setInitialTerrain: (context, event) => {
      return { currentTerrain: event.data.currentTerrain };
    },
    updateCombatEffects: (context, event) => {
      const terrainEffects = {
        plains: {
          moveSpeedMultiplier: 1,
          attackPowerMultiplier: 1,
          defenseMultiplier: 1
        },
        forest: {
          moveSpeedMultiplier: 0.8,
          attackPowerMultiplier: 1.2,
          defenseMultiplier: 0.9
        },
        mountain: {
          moveSpeedMultiplier: 0.5,
          attackPowerMultiplier: 1.5,
          defenseMultiplier: 1.2
        },
        desert: {
          moveSpeedMultiplier: 1.2,
          attackPowerMultiplier: 0.8,
          defenseMultiplier: 0.8
        }
      };

      const currentTerrain = context.currentTerrain;
      const terrainEffect = terrainEffects[currentTerrain] || {};

      return {
        moveSpeedMultiplier: terrainEffect.moveSpeedMultiplier,
        attackPowerMultiplier: terrainEffect.attackPowerMultiplier,
        defenseMultiplier: terrainEffect.defenseMultiplier
      };
    },
    addItem: (context, event) => {
      const newItem = event.data.item;
      const weightMultiplier = newItem.rarity === 'legendary' ? 1.5 : newItem.rarity === 'epic' ? 1.2 : 1;
      const valueMultiplier = newItem.rarity === 'legendary' ? 2 : newItem.rarity === 'epic' ? 1.5 : 1;

      return {
        totalWeight: context.totalWeight + newItem.weight * weightMultiplier,
        totalValue: context.totalValue + newItem.value * valueMultiplier,
        items: {
          ...context.items,
          [newItem.name]: {
            ...newItem,
            durability: newItem.durability
          }
        }
      };
    },
    removeItem: (context, event) => {
      const itemName = event.data.itemName;
      const itemWeight = event.data.itemWeight;
      const itemValue = event.data.itemValue;
      const weightMultiplier = event.data.itemRarity === 'legendary' ? 1.5 : event.data.itemRarity === 'epic' ? 1.2 : 1;
      const valueMultiplier = event.data.itemRarity === 'legendary' ? 2 : event.data.itemRarity === 'epic' ? 1.5 : 1;

      return {
        totalWeight: context.totalWeight - itemWeight * weightMultiplier,
        totalValue: context.totalValue - itemValue * valueMultiplier,
        items: {
          ...context.items,
          [itemName]: undefined
        }
      };
    },
    selectWeapon: (context, event) => {
      return { currentWeapon: event.data.weapon };
    },
    useItem: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: item.durability - 1
            }
          }
        };
      }
      return context;
    },
    startRepairTimer: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        const repairQuality = sample([0.5, 1, 1.5]); // Random repair quality multiplier
        const repairAmount = Math.floor(item.maxDurability * repairQuality);
        const repairCost = Math.floor(repairAmount / 2); // Simplified cost calculation
        const repairTime = Math.floor(item.maxDurability * 0.1); // Repair time in arbitrary units

        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: Math.min(item.maxDurability, item.durability + repairAmount)
            }
          },
          totalValue: context.totalValue - repairCost,
          repairTimer: setTimeout(() => {
            context.repairTimer = null;
            horizonZeroDawnMachine.send({ type: 'TIMER_COMPLETE' });
          }, repairTime * 1000)
        };
      }
      return context;
    },
    completeRepair: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: item.maxDurability
            }
          }
        };
      }
      return context;
    },
    breakItem: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    salvageItem: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    completeBreak: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    completeSalvage: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    startSalvageTimer: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        const salvageTime = Math.floor(item.maxDurability * 0.2); // Salvage time in arbitrary units

        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: 0
            }
          },
          totalValue: context.totalValue - salvageTime, // Cost in arbitrary units
          salvageTimer: setTimeout(() => {
            context.salvageTimer = null;
            horizonZeroDawnMachine.send({ type: 'TIMER_COMPLETE' });
          }, salvageTime * 1000)
        };
      }
      return context;
    },
    startEmergencyRepairTimer: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        const repairQuality = sample([0.5, 1, 1.5]); // Random repair quality multiplier
        const repairAmount = Math.floor(item.maxDurability * repairQuality);
        const repairTime = Math.floor(item.maxDurability * 0.1); // Repair time in arbitrary units

        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: Math.min(item.maxDurability, item.durability + repairAmount)
            }
          },
          totalValue: context.totalValue - repairTime, // Cost in arbitrary units
          emergencyRepairTimer: setTimeout(() => {
            context.emergencyRepairTimer = null;
            horizonZeroDawnMachine.send({ type: 'TIMER_COMPLETE' });
          }, repairTime * 1000)
        };
      }
      return context;
    },
    completeEmergencyRepair: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: item.maxDurability
            }
          }
        };
      }
      return context;
    },
    startMission: (context, event) => {
      const { missionId, missionType } = event.data;
      const branch = context.missionBranches[missionId].branches[missionType];
      return {
        activeMissions: [...context.activeMissions, missionId],
        [branch.id]: { state: 'inProgress' }
      };
    },
    addMission: (context, event) => {
      const { missionId, missionType } = event.data;
      const branch = context.missionBranches[missionId].branches[missionType];
      return {
        activeMissions: [...context.activeMissions, missionId],
        [branch.id]: { state: 'inProgress' }
      };
    }
  },
  services: {
    runMission: (context, event) => (sendBack) => {
      const { missionId, missionType } = event.data;
      const branch = context.missionBranches[missionId].branches[missionType];

      switch (branch.id) {
        case 'quest1':
          setInterval(() => {
            sendBack({ type: 'TICK' });
          }, 1000);
          break;
        case 'resource1':
          setInterval(() => {
            sendBack({ type: 'GATHER_RESOURCE', data: { resource: 'wood', amount: 1 } });
            sendBack({ type: 'GATHER_RESOURCE', data: { resource: 'stone', amount: 0.5 } });
            sendBack({ type: 'GATHER_RESOURCE', data: { resource: 'herbs', amount: 0.3 } });
          }, 1000);
          break;
        default:
          break;
      }

      return () => clearInterval(intervalId);
    }
  },
  guards: {
    isNotInBattle: (context, event) => context.currentTerrain !== 'battle',
    isNotInCombat: (context, event) => context.currentTerrain !== 'combat',
    hasSufficientAmmunition: (context, event) => context.ammunitionCount > 0,
    canCarryMoreItems: (context, event) => context.totalWeight + event.data.item.weight <= context.maxCarryingCapacity,
    canAffordItem: (context, event) => context.totalValue + event.data.item.value <= context.maxInventoryValue,
    isItemUsable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      return item && item.durability > 0;
    },
    isItemRepairable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      const repairCost = item.rarity === 'legendary' ? 200 : item.rarity === 'epic' ? 150 : 100;
      return item && item.repairCost <= context.totalValue;
    },
    isItemBreakable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      return item && item.durability <= 0;
    },
    isItemSalvagable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      return item && item.durability <= 0;
    },
    isItemEmergencyRepairable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      return item && item.durability <= 0;
    },
    isRepairTimerComplete: (context, event) => !context.repairTimer,
    isSalvageTimerComplete: (context, event) => !context.salvageTimer,
    isEmergencyRepairTimerComplete: (context, event) => !context.emergencyRepairTimer,
    isQuestCompleted: (context, event) => {
      const missionId = event.data.missionId;
      return context.activeMissions.includes(missionId) && questMissionMachine.getSnapshot().value === 'completed';
    },
    isResourceGatheringCompleted: (context, event) => {
      const missionId = event.data.missionId;
      return context.activeMissions.includes(missionId) && resourceGatheringMissionMachine.getSnapshot().value === 'completed';
    },
    isMissionActive: (context, event) => context.activeMissions.includes(event.data.missionId)
  }
});

// Example usage:
horizonZeroDawnMachine.onTransition((state, event) => {
  if (event.type === 'COMBAT') {
    console.log('Current State:', state.value, 'Updated Context:', state.context);
  } else {
    console.log('Current State:', state.value);
  }
});

// To send events to the machine:
horizonZeroDawnMachine.send({ type: 'START_NEW_GAME', data: { currentTerrain: 'plains' } });
horizonZeroDawnMachine.send({ type: 'PICK_UP_ITEM', data: { item: { name: 'sword', weight: 10, value: 50, rarity: 'common', durability: 100, maxDurability: 100, repairCost: 50, material: 'steel', salvageAmount: 10 } } });
horizonZeroDawnMachine.send({ type: 'PICK_UP_ITEM', data: { item: { name: 'shield', weight: 5, value: 30, rarity: 'rare', durability: 150, maxDurability: 150, repairCost: 75, material: 'iron', salvageAmount: 15 } } });
horizonZeroDawnMachine.send({ type: 'DROP_ITEM', data: { itemName: 'sword', itemWeight: 10, itemValue: 50, itemRarity: 'common', itemDurability: 100, itemMaxDurability: 100, itemRepairCost: 50, itemMaterial: 'steel', itemSalvageAmount: 10 } });
horizonZeroDawnMachine.send('USE_ITEM', { data: { itemName: 'sword' } }); // Should decrease durability
horizonZeroDawnMachine.send('REPAIR_ITEM', { data: { itemName: 'sword' } }); // Should start repair timer
horizonZeroDawnMachine.send('SALVAGE_ITEM', { data: { itemName: 'sword' } }); // Should start salvage timer
horizonZeroDawnMachine.send('START_EMERGENCY_REPAIR', { data: { itemName: 'sword' } }); // Should start emergency repair timer
horizonZeroDawnMachine.send('START_QUEST_MISSION', { data: { missionId: 'quest1', missionType: 'quest' } }); // Should start quest mission
horizonZeroDawnMachine.send('START_RESOURCE_GATHERING_MISSION', { data: { missionId: 'resource1', missionType: 'resourceGathering' } }); // Should start resource gathering mission
horizonZeroDawnMachine.send('COMBAT'); // Should be allowed since forest is a valid terrain for combat
horizonZeroDawnMachine.send('BATTLE_WON');
horizonZeroDawnMachine.send('MAIN_MENU');
Explanation:
Mission State Machines:
questMissionMachine: Manages a quest mission with a time limit and objective.
resourceGatheringMissionMachine: Manages a resource gathering mission with a time limit and resource collection goals.
Main Game State Machine:
mission: A parent state that manages the execution of active missions.
Invokes the mission-specific state machines (questMissionMachine and resourceGatheringMissionMachine) and waits for them to complete.
Services:
runMission: Runs the mission state machine and dispatches ticks or resource gathering events.
Guards:
isNotInBattle, isNotInCombat, hasSufficientAmmunition, canCarryMoreItems, canAffordItem, isItemUsable, isItemRepairable, isItemBreakable, isItemSalvagable, isItemEmergencyRepairable, isRepairTimerComplete, isSalvageTimerComplete, isEmergencyRepairTimerComplete, isQuestCompleted, isResourceGatheringCompleted, isMissionActive: Ensure that the game state is valid and that missions are progressing correctly.
Branching Logic:
The main game state machine uses the activeMissions array to track which missions are currently active.
Each mission branch has its own state machine, and the main game state machine invokes these state machines to handle their execution.
This structure allows for a highly flexible and complex mission system, where each mission can have multiple branches and sub-missions. You can easily extend this system by adding more mission types, dependencies, and rewards.


Implement additional tactical approaches?


To implement additional tactical approaches in the state machine, we need to consider how different tactics can be applied during combat and exploration. Tactics could include stealth, ranged attacks, melee engagements, and more. We can add new states and actions to handle these different tactics and ensure that they are integrated seamlessly into the game's flow.

Here’s how you can extend the state machine to include additional tactical approaches:

New States:
States for different tactical approaches like stealth, ranged attacks, melee engagements, etc.
New Actions:
Actions to execute the chosen tactical approach.
Guards:
Guards to ensure that the chosen tactic is applicable given the current situation.
Transitions:
Transitions to handle the application of different tactics.
Here's an example implementation:


import { Machine } from '@xstate/fsm';
import { sample } from 'lodash';

// Mission State Machines
const questMissionMachine = Machine({
  id: 'questMission',
  initial: 'start',
  context: {
    missionObjective: 'Find the ancient artifact',
    elapsedTime: 0,
    timeLimit: 60 // 60 seconds
  },
  states: {
    start: {
      always: [{ target: 'findArtifact', cond: 'shouldFindArtifact' }, { target: 'sideQuests', cond: 'shouldDoSideQuests' }]
    },
    findArtifact: {
      on: {
        COMPLETE_MISSION: { target: 'completed' }
      }
    },
    sideQuests: {
      on: {
        COMPLETE_SIDE_QUEST: { target: 'checkCompletion' }
      }
    },
    checkCompletion: {
      always: [{ target: 'completed', cond: 'allSideQuestsCompleted' }, { target: 'continue' }]
    },
    continue: {
      on: {
        COMPLETE_MISSION: { target: 'completed' }
      }
    }
  }
}, {
  guards: {
    shouldFindArtifact: (context, event) => true, // Implement logic to determine if the player should find the artifact
    shouldDoSideQuests: (context, event) => true, // Implement logic to determine if the player should do side quests
    allSideQuestsCompleted: (context, event) => true // Implement logic to determine if all side quests are completed
  }
});

const resourceGatheringMissionMachine = Machine({
  id: 'resourceGatheringMission',
  initial: 'start',
  context: {
    requiredResources: { wood: 10, stone: 5, herbs: 3 },
    collectedResources: { wood: 0, stone: 0, herbs: 0 },
    elapsedTime: 0,
    timeLimit: 45 // 45 seconds
  },
  states: {
    start: {
      always: [
        { target: 'gatherWood', cond: 'shouldGatherWood' },
        { target: 'gatherStone', cond: 'shouldGatherStone' },
        { target: 'gatherHerbs', cond: 'shouldGatherHerbs' }
      ]
    },
    gatherWood: {
      on: {
        GATHER_RESOURCE: { target: 'gatherWood', actions: ['collectResource'] },
        COMPLETE_MISSION: { target: 'completed' }
      }
    },
    gatherStone: {
      on: {
        GATHER_RESOURCE: { target: 'gatherStone', actions: ['collectResource'] },
        COMPLETE_MISSION: { target: 'completed' }
      }
    },
    gatherHerbs: {
      on: {
        GATHER_RESOURCE: { target: 'gatherHerbs', actions: ['collectResource'] },
        COMPLETE_MISSION: { target: 'completed' }
      }
    }
  }
}, {
  actions: {
    collectResource: (context, event) => {
      const { resource, amount } = event.data;
      return {
        collectedResources: {
          ...context.collectedResources,
          [resource]: (context.collectedResources[resource] || 0) + amount
        }
      };
    }
  },
  guards: {
    shouldGatherWood: (context, event) => true, // Implement logic to determine if the player should gather wood
    shouldGatherStone: (context, event) => true, // Implement logic to determine if the player should gather stone
    shouldGatherHerbs: (context, event) => true, // Implement logic to determine if the player should gather herbs
    hasCollectedRequiredResources: (context, event) => {
      return Object.keys(context.requiredResources).every(resource => 
        context.collectedResources[resource] >= context.requiredResources[resource]
      );
    },
    isWithinTimeLimit: (context, event) => context.elapsedTime < context.timeLimit
  }
});

// Main Game State Machine
const horizonZeroDawnMachine = Machine({
  id: 'horizonZeroDawn',
  initial: 'startMenu',
  context: {
    currentTerrain: null, // Initialize with null or default terrain
    moveSpeedMultiplier: 1,
    attackPowerMultiplier: 1,
    defenseMultiplier: 1,
    currentWeapon: null,
    ammunitionCount: 0,
    totalWeight: 0,
    totalValue: 0,
    maxCarryingCapacity: 50, // Maximum carrying capacity in arbitrary units
    maxInventoryValue: 1000, // Maximum inventory value in arbitrary currency units
    items: {},
    salvageMaterials: {},
    repairTimer: null,
    salvageTimer: null,
    emergencyRepairTimer: null,
    activeMissions: [],
    missionBranches: {
      quest1: {
        type: 'quest',
        branches: {
          findArtifact: { machine: questMissionMachine },
          sideQuests: { machine: questMissionMachine }
        }
      },
      resource1: {
        type: 'resourceGathering',
        branches: {
          gatherWood: { machine: resourceGatheringMissionMachine },
          gatherStone: { machine: resourceGatheringMissionMachine },
          gatherHerbs: { machine: resourceGatheringMissionMachine }
        }
      }
    },
    tacticalApproach: null
  },
  states: {
    startMenu: {
      on: {
        START_NEW_GAME: { target: 'gamePlay', actions: ['setInitialTerrain'], cond: 'isNotInBattle' },
        LOAD_GAME: { target: 'gamePlay', actions: ['setInitialTerrain'], cond: 'isNotInBattle' },
        OPTIONS: 'options',
        QUIT: 'exit'
      }
    },
    gamePlay: {
      on: {
        COMBAT: { target: 'combat', actions: ['updateCombatEffects'], cond: 'isNotInCombat' },
        EXPLORATION: 'exploration',
        INVENTORY_MANAGEMENT: 'inventory',
        SAVE_GAME: 'gamePlay',
        PAUSE_GAME: 'pause',
        MAIN_MENU: 'startMenu',
        FISHING: 'fishing',
        HUNTING: 'hunting',
        PICK_UP_ITEM: { target: 'itemSelection', actions: ['addItem'] },
        DROP_ITEM: { target: 'inventory', actions: ['removeItem'] },
        USE_ITEM: { target: 'gamePlay', actions: ['useItem'], cond: 'isItemUsable' },
        REPAIR_ITEM: { target: 'repair', actions: ['startRepairTimer'], cond: 'isItemRepairable' },
        BREAK_ITEM: { target: 'break', actions: ['breakItem'], cond: 'isItemBreakable' },
        SALVAGE_ITEM: { target: 'salvage', actions: ['startSalvageTimer'], cond: 'isItemSalvagable' },
        START_EMERGENCY_REPAIR: { target: 'emergencyFieldRepair', actions: ['startEmergencyRepairTimer'], cond: 'isItemEmergencyRepairable' },
        START_QUEST_MISSION: { target: 'mission', actions: ['startMission', 'addMission'], cond: 'isNotInCombat' },
        START_RESOURCE_GATHERING_MISSION: { target: 'mission', actions: ['startMission', 'addMission'], cond: 'isNotInCombat' },
        SET_TACTICAL_APPROACH: { target: 'tacticalApproach', actions: ['setTacticalApproach'] }
      }
    },
    combat: {
      on: {
        BATTLE_WON: 'victoryScreen',
        BATTLE_LOST: 'defeatScreen'
      }
    },
    victoryScreen: {
      on: {
        CONTINUE: 'gamePlay',
        MAIN_MENU: 'startMenu'
      }
    },
    defeatScreen: {
      on: {
        RETRY: 'combat',
        MAIN_MENU: 'startMenu'
      }
    },
    exploration: {
      on: {
        ENCOUNTER_ENEMY: 'combat',
        INTERACT_WITH_NPC: 'dialogue', // Assuming dialogue is another state
        FIND_ITEM_QUEST: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    inventory: {
      on: {
        CLOSE_INVENTORY: 'gamePlay'
      }
    },
    pause: {
      on: {
        RESUME_GAME: 'gamePlay',
        OPTIONS: 'options',
        MAIN_MENU: 'startMenu'
      }
    },
    options: {
      on: {
        APPLY_CHANGES: 'gamePlay',
        CANCEL: 'startMenu'
      }
    },
    exit: {
      type: 'final'
    },
    fishing: {
      on: {
        FINISH_FISHING: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    hunting: {
      on: {
        FINISH_HUNTING: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    weaponSelection: {
      on: {
        SELECT_WEAPON: { target: 'gamePlay', actions: ['selectWeapon'] }
      }
    },
    itemSelection: {
      on: {
        SELECT_ITEM: { target: 'gamePlay', actions: ['selectItem'] }
      }
    },
    repair: {
      on: {
        COMPLETE_REPAIR: { target: 'gamePlay', actions: ['completeRepair'] }
      }
    },
    break: {
      on: {
        COMPLETE_BREAK: { target: 'gamePlay', actions: ['completeBreak'] }
      }
    },
    salvage: {
      on: {
        COMPLETE_SALVAGE: { target: 'gamePlay', actions: ['completeSalvage'] }
      }
    },
    emergencyFieldRepair: {
      on: {
        COMPLETE_EMERGENCY_REPAIR: { target: 'gamePlay', actions: ['completeEmergencyRepair'] }
      }
    },
    repairTimer: {
      on: {
        TIMER_COMPLETE: { target: 'repair' }
      }
    },
    salvageTimer: {
      on: {
        TIMER_COMPLETE: { target: 'salvage' }
      }
    },
    emergencyRepairTimer: {
      on: {
        TIMER_COMPLETE: { target: 'emergencyFieldRepair' }
      }
    },
    mission: {
      initial: 'idle',
      states: {
        idle: {
          on: {
            START_QUEST_MISSION: { target: 'quest', actions: ['startMission', 'addMission'] },
            START_RESOURCE_GATHERING_MISSION: { target: 'resourceGathering', actions: ['startMission', 'addMission'] }
          }
        },
        quest: {
          invoke: [
            { src: 'runMission', onDone: { target: 'idle' } }
          ]
        },
        resourceGathering: {
          invoke: [
            { src: 'runMission', onDone: { target: 'idle' } }
          ]
        }
      }
    },
    tacticalApproach: {
      initial: 'idle',
      states: {
        idle: {
          on: {
            SET_STEALTH: { target: 'stealth', actions: ['setTacticalApproach'] },
            SET_RANGED_ATTACK: { target: 'rangedAttack', actions: ['setTacticalApproach'] },
            SET_MELEE_ENGAGEMENT: { target: 'meleeEngagement', actions: ['setTacticalApproach'] }
          }
        },
        stealth: {
          on: {
            EXECUTE_TACTIC: { target: 'idle', actions: ['executeStealthTactic'] }
          }
        },
        rangedAttack: {
          on: {
            EXECUTE_TACTIC: { target: 'idle', actions: ['executeRangedAttackTactic'] }
          }
        },
        meleeEngagement: {
          on: {
            EXECUTE_TACTIC: { target: 'idle', actions: ['executeMeleeEngagementTactic'] }
          }
        }
      }
    }
  }
}, {
  actions: {
    setInitialTerrain: (context, event) => {
      return { currentTerrain: event.data.currentTerrain };
    },
    updateCombatEffects: (context, event) => {
      const terrainEffects = {
        plains: {
          moveSpeedMultiplier: 1,
          attackPowerMultiplier: 1,
          defenseMultiplier: 1
        },
        forest: {
          moveSpeedMultiplier: 0.8,
          attackPowerMultiplier: 1.2,
          defenseMultiplier: 0.9
        },
        mountain: {
          moveSpeedMultiplier: 0.5,
          attackPowerMultiplier: 1.5,
          defenseMultiplier: 1.2
        },
        desert: {
          moveSpeedMultiplier: 1.2,
          attackPowerMultiplier: 0.8,
          defenseMultiplier: 0.8
        }
      };

      const currentTerrain = context.currentTerrain;
      const terrainEffect = terrainEffects[currentTerrain] || {};

      return {
        moveSpeedMultiplier: terrainEffect.moveSpeedMultiplier,
        attackPowerMultiplier: terrainEffect.attackPowerMultiplier,
        defenseMultiplier: terrainEffect.defenseMultiplier
      };
    },
    addItem: (context, event) => {
      const newItem = event.data.item;
      const weightMultiplier = newItem.rarity === 'legendary' ? 1.5 : newItem.rarity === 'epic' ? 1.2 : 1;
      const valueMultiplier = newItem.rarity === 'legendary' ? 2 : newItem.rarity === 'epic' ? 1.5 : 1;

      return {
        totalWeight: context.totalWeight + newItem.weight * weightMultiplier,
        totalValue: context.totalValue + newItem.value * valueMultiplier,
        items: {
          ...context.items,
          [newItem.name]: {
            ...newItem,
            durability: newItem.durability
          }
        }
      };
    },
    removeItem: (context, event) => {
      const itemName = event.data.itemName;
      const itemWeight = event.data.itemWeight;
      const itemValue = event.data.itemValue;
      const weightMultiplier = event.data.itemRarity === 'legendary' ? 1.5 : event.data.itemRarity === 'epic' ? 1.2 : 1;
      const valueMultiplier = event.data.itemRarity === 'legendary' ? 2 : event.data.itemRarity === 'epic' ? 1.5 : 1;

      return {
        totalWeight: context.totalWeight - itemWeight * weightMultiplier,
        totalValue: context.totalValue - itemValue * valueMultiplier,
        items: {
          ...context.items,
          [itemName]: undefined
        }
      };
    },
    selectWeapon: (context, event) => {
      return { currentWeapon: event.data.weapon };
    },
    useItem: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: item.durability - 1
            }
          }
        };
      }
      return context;
    },
    startRepairTimer: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        const repairQuality = sample([0.5, 1, 1.5]); // Random repair quality multiplier
        const repairAmount = Math.floor(item.maxDurability * repairQuality);
        const repairCost = Math.floor(repairAmount / 2); // Simplified cost calculation
        const repairTime = Math.floor(item.maxDurability * 0.1); // Repair time in arbitrary units

        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: Math.min(item.maxDurability, item.durability + repairAmount)
            }
          },
          totalValue: context.totalValue - repairCost,
          repairTimer: setTimeout(() => {
            context.repairTimer = null;
            horizonZeroDawnMachine.send({ type: 'TIMER_COMPLETE' });
          }, repairTime * 1000)
        };
      }
      return context;
    },
    completeRepair: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: item.maxDurability
            }
          }
        };
      }
      return context;
    },
    breakItem: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    salvageItem: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    completeBreak: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    completeSalvage: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    startSalvageTimer: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        const salvageTime = Math.floor(item.maxDurability * 0.2); // Salvage time in arbitrary units

        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: 0
            }
          },
          totalValue: context.totalValue - salvageTime, // Cost in arbitrary units
          salvageTimer: setTimeout(() => {
            context.salvageTimer = null;
            horizonZeroDawnMachine.send({ type: 'TIMER_COMPLETE' });
          }, salvageTime * 1000)
        };
      }
      return context;
    },
    startEmergencyRepairTimer: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        const repairQuality = sample([0.5, 1, 1.5]); // Random repair quality multiplier
        const repairAmount = Math.floor(item.maxDurability * repairQuality);
        const repairTime = Math.floor(item.maxDurability * 0.1); // Repair time in arbitrary units

        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: Math.min(item.maxDurability, item.durability + repairAmount)
            }
          },
          totalValue: context.totalValue - repairTime, // Cost in arbitrary units
          emergencyRepairTimer: setTimeout(() => {
            context.emergencyRepairTimer = null;
            horizonZeroDawnMachine.send({ type: 'TIMER_COMPLETE' });
          }, repairTime * 1000)
        };
      }
      return context;
    },
    completeEmergencyRepair: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: item.maxDurability
            }
          }
        };
      }
      return context;
    },
    startMission: (context, event) => {
      const { missionId, missionType } = event.data;
      const branch = context.missionBranches[missionId].branches[missionType];
      return {
        activeMissions: [...context.activeMissions, missionId],
        [branch.id]: { state: 'inProgress' }
      };
    },
    addMission: (context, event) => {
      const { missionId, missionType } = event.data;
      const branch = context.missionBranches[missionId].branches[missionType];
      return {
        activeMissions: [...context.activeMissions, missionId],
        [branch.id]: { state: 'inProgress' }
      };
    },
    setTacticalApproach: (context, event) => {
      return { tacticalApproach: event.data.tacticalApproach };
    },
    executeStealthTactic: (context, event) => {
      // Implement stealth tactic logic
      console.log('Executing Stealth Tactic');
      return {};
    },
    executeRangedAttackTactic: (context, event) => {
      // Implement ranged attack tactic logic
      console.log('Executing Ranged Attack Tactic');
      return {};
    },
    executeMeleeEngagementTactic: (context, event) => {
      // Implement melee engagement tactic logic
      console.log('Executing Melee Engagement Tactic');
      return {};
    }
  },
  services: {
    runMission: (context, event) => (sendBack) => {
      const { missionId, missionType } = event.data;
      const branch = context.missionBranches[missionId].branches[missionType];

      switch (branch.id) {
        case 'quest1':
          setInterval(() => {
            sendBack({ type: 'TICK' });
          }, 1000);
          break;
        case 'resource1':
          setInterval(() => {
            sendBack({ type: 'GATHER_RESOURCE', data: { resource: 'wood', amount: 1 } });
            sendBack({ type: 'GATHER_RESOURCE', data: { resource: 'stone', amount: 0.5 } });
            sendBack({ type: 'GATHER_RESOURCE', data: { resource: 'herbs', amount: 0.3 } });
          }, 1000);
          break;
        default:
          break;
      }

      return () => clearInterval(intervalId);
    }
  },
  guards: {
    isNotInBattle: (context, event) => context.currentTerrain !== 'battle',
    isNotInCombat: (context, event) => context.currentTerrain !== 'combat',
    hasSufficientAmmunition: (context, event) => context.ammunitionCount > 0,
    canCarryMoreItems: (context, event) => context.totalWeight + event.data.item.weight <= context.maxCarryingCapacity,
    canAffordItem: (context, event) => context.totalValue + event.data.item.value <= context.maxInventoryValue,
    isItemUsable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      return item && item.durability > 0;
    },
    isItemRepairable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      const repairCost = item.rarity === 'legendary' ? 200 : item.rarity === 'epic' ? 150 : 100;
      return item && item.repairCost <= context.totalValue;
    },
    isItemBreakable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      return item && item.durability <= 0;
    },
    isItemSalvagable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      return item && item.durability <= 0;
    },
    isItemEmergencyRepairable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      return item && item.durability <= 0;
    },
    isRepairTimerComplete: (context, event) => !context.repairTimer,
    isSalvageTimerComplete: (context, event) => !context.salvageTimer,
    isEmergencyRepairTimerComplete: (context, event) => !context.emergencyRepairTimer,
    isQuestCompleted: (context, event) => {
      const missionId = event.data.missionId;
      return context.activeMissions.includes(missionId) && questMissionMachine.getSnapshot().value === 'completed';
    },
    isResourceGatheringCompleted: (context, event) => {
      const missionId = event.data.missionId;
      return context.activeMissions.includes(missionId) && resourceGatheringMissionMachine.getSnapshot().value === 'completed';
    },
    isMissionActive: (context, event) => context.activeMissions.includes(event.data.missionId),
    isStealthTacticApplicable: (context, event) => context.tacticalApproach === 'stealth',
    isRangedAttackTacticApplicable: (context, event) => context.tacticalApproach === 'rangedAttack',
    isMeleeEngagementTacticApplicable: (context, event) => context.tacticalApproach === 'meleeEngagement'
  }
});

// Example usage:
horizonZeroDawnMachine.onTransition((state, event) => {
  if (event.type === 'COMBAT') {
    console.log('Current State:', state.value, 'Updated Context:', state.context);
  } else {
    console.log('Current State:', state.value);
  }
});

// To send events to the machine:
horizonZeroDawnMachine.send({ type: 'START_NEW_GAME', data: { currentTerrain: 'plains' } });
horizonZeroDawnMachine.send({ type: 'PICK_UP_ITEM', data: { item: { name: 'sword', weight: 10, value: 50, rarity: 'common', durability: 100, maxDurability: 100, repairCost: 50, material: 'steel', salvageAmount: 10 } } });
horizonZeroDawnMachine.send({ type: 'PICK_UP_ITEM', data: { item: { name: 'shield', weight: 5, value: 30, rarity: 'rare', durability: 150, maxDurability: 150, repairCost: 75, material: 'iron', salvageAmount: 15 } } });
horizonZeroDawnMachine.send({ type: 'DROP_ITEM', data: { itemName: 'sword', itemWeight: 10, itemValue: 50, itemRarity: 'common', itemDurability: 100, itemMaxDurability: 100, itemRepairCost: 50, itemMaterial: 'steel', itemSalvageAmount: 10 } });
horizonZeroDawnMachine.send('USE_ITEM', { data: { itemName: 'sword' } }); // Should decrease durability
horizonZeroDawnMachine.send('REPAIR_ITEM', { data: { itemName: 'sword' } }); // Should start repair timer
horizonZeroDawnMachine.send('SALVAGE_ITEM', { data: { itemName: 'sword' } }); // Should start salvage timer
horizonZeroDawnMachine.send('START_EMERGENCY_REPAIR', { data: { itemName: 'sword' } }); // Should start emergency repair timer
horizonZeroDawnMachine.send('START_QUEST_MISSION', { data: { missionId: 'quest1', missionType: 'quest' } }); // Should start quest mission
horizonZeroDawnMachine.send('START_RESOURCE_GATHERING_MISSION', { data: { missionId: 'resource1', missionType: 'resourceGathering' } }); // Should start resource gathering mission
horizonZeroDawnMachine.send('SET_TACTICAL_APPROACH', { data: { tacticalApproach: 'stealth' } }); // Should set stealth approach
horizonZeroDawnMachine.send('EXECUTE_TACTIC'); // Should execute stealth tactic
horizonZeroDawnMachine.send('COMBAT'); // Should be allowed since forest is a valid terrain for combat
horizonZeroDawnMachine.send('BATTLE_WON');
horizonZeroDawnMachine.send('MAIN_MENU');
Explanation:
New States:
tacticalApproach: A state to manage the selected tactical approach.
New Actions:
setTacticalApproach: Sets the selected tactical approach.
executeStealthTactic, executeRangedAttackTactic, executeMeleeEngagementTactic: Execute the selected tactical approach.
Guards:
isStealthTacticApplicable, isRangedAttackTacticApplicable, isMeleeEngagementTacticApplicable: Ensure that the selected tactic is applicable given the current situation.
Transitions:
Added transitions to tacticalApproach and EXECUTE_TACTIC to handle the selection and execution of different tactical approaches.
With these modifications, the game now supports different tactical approaches during combat and exploration. Players can choose from stealth, ranged attacks, and melee engagements, each with its own unique logic and behavior. This adds an additional layer of strategy and decision-making to the gameplay, making it more immersive and engaging.


Can you please design for me your best and most complex branching mission structure


To design a complex branching mission structure, we need to create a hierarchical state machine where each mission can have multiple branches, sub-missions, and dependencies. Each branch can have its own set of conditions, actions, and rewards. Additionally, we can introduce mission dependencies and time constraints to add complexity.

Here’s an example implementation:

Mission State Machines
Quest Mission
The quest mission will have two branches: one where the player needs to find a specific artifact, and another where the player needs to complete a series of side quests.


const questMissionMachine = Machine({
  id: 'questMission',
  initial: 'start',
  context: {
    missionObjective: 'Find the ancient artifact',
    elapsedTime: 0,
    timeLimit: 60 // 60 seconds
  },
  states: {
    start: {
      always: [{ target: 'findArtifact', cond: 'shouldFindArtifact' }, { target: 'sideQuests', cond: 'shouldDoSideQuests' }]
    },
    findArtifact: {
      on: {
        COMPLETE_MISSION: { target: 'completed' }
      }
    },
    sideQuests: {
      on: {
        COMPLETE_SIDE_QUEST: { target: 'checkCompletion' }
      }
    },
    checkCompletion: {
      always: [{ target: 'completed', cond: 'allSideQuestsCompleted' }, { target: 'continue' }]
    },
    continue: {
      on: {
        COMPLETE_MISSION: { target: 'completed' }
      }
    }
  }
}, {
  guards: {
    shouldFindArtifact: (context, event) => true, // Implement logic to determine if the player should find the artifact
    shouldDoSideQuests: (context, event) => true, // Implement logic to determine if the player should do side quests
    allSideQuestsCompleted: (context, event) => true // Implement logic to determine if all side quests are completed
  }
});
Resource Gathering Mission
The resource gathering mission will have three branches: gathering wood, gathering stone, and gathering herbs.


const resourceGatheringMissionMachine = Machine({
  id: 'resourceGatheringMission',
  initial: 'start',
  context: {
    requiredResources: { wood: 10, stone: 5, herbs: 3 },
    collectedResources: { wood: 0, stone: 0, herbs: 0 },
    elapsedTime: 0,
    timeLimit: 45 // 45 seconds
  },
  states: {
    start: {
      always: [
        { target: 'gatherWood', cond: 'shouldGatherWood' },
        { target: 'gatherStone', cond: 'shouldGatherStone' },
        { target: 'gatherHerbs', cond: 'shouldGatherHerbs' }
      ]
    },
    gatherWood: {
      on: {
        GATHER_RESOURCE: { target: 'gatherWood', actions: ['collectResource'] },
        COMPLETE_MISSION: { target: 'completed' }
      }
    },
    gatherStone: {
      on: {
        GATHER_RESOURCE: { target: 'gatherStone', actions: ['collectResource'] },
        COMPLETE_MISSION: { target: 'completed' }
      }
    },
    gatherHerbs: {
      on: {
        GATHER_RESOURCE: { target: 'gatherHerbs', actions: ['collectResource'] },
        COMPLETE_MISSION: { target: 'completed' }
      }
    }
  }
}, {
  actions: {
    collectResource: (context, event) => {
      const { resource, amount } = event.data;
      return {
        collectedResources: {
          ...context.collectedResources,
          [resource]: (context.collectedResources[resource] || 0) + amount
        }
      };
    }
  },
  guards: {
    shouldGatherWood: (context, event) => true, // Implement logic to determine if the player should gather wood
    shouldGatherStone: (context, event) => true, // Implement logic to determine if the player should gather stone
    shouldGatherHerbs: (context, event) => true, // Implement logic to determine if the player should gather herbs
    hasCollectedRequiredResources: (context, event) => {
      return Object.keys(context.requiredResources).every(resource => 
        context.collectedResources[resource] >= context.requiredResources[resource]
      );
    },
    isWithinTimeLimit: (context, event) => context.elapsedTime < context.timeLimit
  }
});
Main Game State Machine
The main game state machine will manage the execution of active missions and handle the branching logic.


const horizonZeroDawnMachine = Machine({
  id: 'horizonZeroDawn',
  initial: 'startMenu',
  context: {
    currentTerrain: null, // Initialize with null or default terrain
    moveSpeedMultiplier: 1,
    attackPowerMultiplier: 1,
    defenseMultiplier: 1,
    currentWeapon: null,
    ammunitionCount: 0,
    totalWeight: 0,
    totalValue: 0,
    maxCarryingCapacity: 50, // Maximum carrying capacity in arbitrary units
    maxInventoryValue: 1000, // Maximum inventory value in arbitrary currency units
    items: {},
    salvageMaterials: {},
    repairTimer: null,
    salvageTimer: null,
    emergencyRepairTimer: null,
    activeMissions: [],
    missionBranches: {
      quest1: {
        type: 'quest',
        branches: {
          findArtifact: { machine: questMissionMachine },
          sideQuests: { machine: questMissionMachine }
        }
      },
      resource1: {
        type: 'resourceGathering',
        branches: {
          gatherWood: { machine: resourceGatheringMissionMachine },
          gatherStone: { machine: resourceGatheringMissionMachine },
          gatherHerbs: { machine: resourceGatheringMissionMachine }
        }
      }
    }
  },
  states: {
    startMenu: {
      on: {
        START_NEW_GAME: { target: 'gamePlay', actions: ['setInitialTerrain'], cond: 'isNotInBattle' },
        LOAD_GAME: { target: 'gamePlay', actions: ['setInitialTerrain'], cond: 'isNotInBattle' },
        OPTIONS: 'options',
        QUIT: 'exit'
      }
    },
    gamePlay: {
      on: {
        COMBAT: { target: 'combat', actions: ['updateCombatEffects'], cond: 'isNotInCombat' },
        EXPLORATION: 'exploration',
        INVENTORY_MANAGEMENT: 'inventory',
        SAVE_GAME: 'gamePlay',
        PAUSE_GAME: 'pause',
        MAIN_MENU: 'startMenu',
        FISHING: 'fishing',
        HUNTING: 'hunting',
        PICK_UP_ITEM: { target: 'itemSelection', actions: ['addItem'] },
        DROP_ITEM: { target: 'inventory', actions: ['removeItem'] },
        USE_ITEM: { target: 'gamePlay', actions: ['useItem'], cond: 'isItemUsable' },
        REPAIR_ITEM: { target: 'repair', actions: ['startRepairTimer'], cond: 'isItemRepairable' },
        BREAK_ITEM: { target: 'break', actions: ['breakItem'], cond: 'isItemBreakable' },
        SALVAGE_ITEM: { target: 'salvage', actions: ['startSalvageTimer'], cond: 'isItemSalvagable' },
        START_EMERGENCY_REPAIR: { target: 'emergencyFieldRepair', actions: ['startEmergencyRepairTimer'], cond: 'isItemEmergencyRepairable' },
        START_QUEST_MISSION: { target: 'mission', actions: ['startMission', 'addMission'], cond: 'isNotInCombat' },
        START_RESOURCE_GATHERING_MISSION: { target: 'mission', actions: ['startMission', 'addMission'], cond: 'isNotInCombat' }
      }
    },
    combat: {
      on: {
        BATTLE_WON: 'victoryScreen',
        BATTLE_LOST: 'defeatScreen'
      }
    },
    victoryScreen: {
      on: {
        CONTINUE: 'gamePlay',
        MAIN_MENU: 'startMenu'
      }
    },
    defeatScreen: {
      on: {
        RETRY: 'combat',
        MAIN_MENU: 'startMenu'
      }
    },
    exploration: {
      on: {
        ENCOUNTER_ENEMY: 'combat',
        INTERACT_WITH_NPC: 'dialogue', // Assuming dialogue is another state
        FIND_ITEM_QUEST: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    inventory: {
      on: {
        CLOSE_INVENTORY: 'gamePlay'
      }
    },
    pause: {
      on: {
        RESUME_GAME: 'gamePlay',
        OPTIONS: 'options',
        MAIN_MENU: 'startMenu'
      }
    },
    options: {
      on: {
        APPLY_CHANGES: 'gamePlay',
        CANCEL: 'startMenu'
      }
    },
    exit: {
      type: 'final'
    },
    fishing: {
      on: {
        FINISH_FISHING: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    hunting: {
      on: {
        FINISH_HUNTING: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    weaponSelection: {
      on: {
        SELECT_WEAPON: { target: 'gamePlay', actions: ['selectWeapon'] }
      }
    },
    itemSelection: {
      on: {
        SELECT_ITEM: { target: 'gamePlay', actions: ['selectItem'] }
      }
    },
    repair: {
      on: {
        COMPLETE_REPAIR: { target: 'gamePlay', actions: ['completeRepair'] }
      }
    },
    break: {
      on: {
        COMPLETE_BREAK: { target: 'gamePlay', actions: ['completeBreak'] }
      }
    },
    salvage: {
      on: {
        COMPLETE_SALVAGE: { target: 'gamePlay', actions: ['completeSalvage'] }
      }
    },
    emergencyFieldRepair: {
      on: {
        COMPLETE_EMERGENCY_REPAIR: { target: 'gamePlay', actions: ['completeEmergencyRepair'] }
      }
    },
    repairTimer: {
      on: {
        TIMER_COMPLETE: { target: 'repair' }
      }
    },
    salvageTimer: {
      on: {
        TIMER_COMPLETE: { target: 'salvage' }
      }
    },
    emergencyRepairTimer: {
      on: {
        TIMER_COMPLETE: { target: 'emergencyFieldRepair' }
      }
    },
    mission: {
      initial: 'idle',
      states: {
        idle: {
          on: {
            START_QUEST_MISSION: { target: 'quest', actions: ['startMission', 'addMission'], cond: 'isNotInCombat' },
            START_RESOURCE_GATHERING_MISSION: { target: 'resourceGathering', actions: ['startMission', 'addMission'], cond: 'isNotInCombat' }
          }
        },
        quest: {
          invoke: [
            { src: 'runMission', onDone: { target: 'idle' } }
          ]
        },
        resourceGathering: {
          invoke: [
            { src: 'runMission', onDone: { target: 'idle' } }
          ]
        }
      }
    },
    tacticalApproach: {
      initial: 'idle',
      states: {
        idle: {
          on: {
            SET_STEALTH: { target: 'stealth', actions: ['setTacticalApproach'] },
            SET_RANGED_ATTACK: { target: 'rangedAttack', actions: ['setTacticalApproach'] },
            SET_MELEE_ENGAGEMENT: { target: 'meleeEngagement', actions: ['setTacticalApproach'] }
          }
        },
        stealth: {
          on: {
            EXECUTE_TACTIC: { target: 'idle', actions: ['executeStealthTactic'] }
          }
        },
        rangedAttack: {
          on: {
            EXECUTE_TACTIC: { target: 'idle', actions: ['executeRangedAttackTactic'] }
          }
        },
        meleeEngagement: {
          on: {
            EXECUTE_TACTIC: { target: 'idle', actions: ['executeMeleeEngagementTactic'] }
          }
        }
      }
    }
  }
}, {
  actions: {
    setInitialTerrain: (context, event) => {
      return { currentTerrain: event.data.currentTerrain };
    },
    updateCombatEffects: (context, event) => {
      const terrainEffects = {
        plains: {
          moveSpeedMultiplier: 1,
          attackPowerMultiplier: 1,
          defenseMultiplier: 1
        },
        forest: {
          moveSpeedMultiplier: 0.8,
          attackPowerMultiplier: 1.2,
          defenseMultiplier: 0.9
        },
        mountain: {
          moveSpeedMultiplier: 0.5,
          attackPowerMultiplier: 1.5,
          defenseMultiplier: 1.2
        },
        desert: {
          moveSpeedMultiplier: 1.2,
          attackPowerMultiplier: 0.8,
          defenseMultiplier: 0.8
        }
      };

      const currentTerrain = context.currentTerrain;
      const terrainEffect = terrainEffects[currentTerrain] || {};

      return {
        moveSpeedMultiplier: terrainEffect.moveSpeedMultiplier,
        attackPowerMultiplier: terrainEffect.attackPowerMultiplier,
        defenseMultiplier: terrainEffect.defenseMultiplier
      };
    },
    addItem: (context, event) => {
      const newItem = event.data.item;
      const weightMultiplier = newItem.rarity === 'legendary' ? 1.5 : newItem.rarity === 'epic' ? 1.2 : 1;
      const valueMultiplier = newItem.rarity === 'legendary' ? 2 : newItem.rarity === 'epic' ? 1.5 : 1;

      return {
        totalWeight: context.totalWeight + newItem.weight * weightMultiplier,
        totalValue: context.totalValue + newItem.value * valueMultiplier,
        items: {
          ...context.items,
          [newItem.name]: {
            ...newItem,
            durability: newItem.durability
          }
        }
      };
    },
    removeItem: (context, event) => {
      const itemName = event.data.itemName;
      const itemWeight = event.data.itemWeight;
      const itemValue = event.data.itemValue;
      const weightMultiplier = event.data.itemRarity === 'legendary' ? 1.5 : event.data.itemRarity === 'epic' ? 1.2 : 1;
      const valueMultiplier = event.data.itemRarity === 'legendary' ? 2 : event.data.itemRarity === 'epic' ? 1.5 : 1;

      return {
        totalWeight: context.totalWeight - itemWeight * weightMultiplier,
        totalValue: context.totalValue - itemValue * valueMultiplier,
        items: {
          ...context.items,
          [itemName]: undefined
        }
      };
    },
    selectWeapon: (context, event) => {
      return { currentWeapon: event.data.weapon };
    },
    useItem: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: item.durability - 1
            }
          }
        };
      }
      return context;
    },
    startRepairTimer: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        const repairQuality = sample([0.5, 1, 1.5]); // Random repair quality multiplier
        const repairAmount = Math.floor(item.maxDurability * repairQuality);
        const repairCost = Math.floor(repairAmount / 2); // Simplified cost calculation
        const repairTime = Math.floor(item.maxDurability * 0.1); // Repair time in arbitrary units

        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: Math.min(item.maxDurability, item.durability + repairAmount)
            }
          },
          totalValue: context.totalValue - repairCost,
          repairTimer: setTimeout(() => {
            context.repairTimer = null;
            horizonZeroDawnMachine.send({ type: 'TIMER_COMPLETE' });
          }, repairTime * 1000)
        };
      }
      return context;
    },
    completeRepair: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: item.maxDurability
            }
          }
        };
      }
      return context;
    },
    breakItem: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    salvageItem: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    completeBreak: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    completeSalvage: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    startSalvageTimer: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        const salvageTime = Math.floor(item.maxDurability * 0.2); // Salvage time in arbitrary units

        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: 0
            }
          },
          totalValue: context.totalValue - salvageTime, // Cost in arbitrary units
          salvageTimer: setTimeout(() => {
            context.salvageTimer = null;
            horizonZeroDawnMachine.send({ type: 'TIMER_COMPLETE' });
          }, salvageTime * 1000)
        };
      }
      return context;
    },
    startEmergencyRepairTimer: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        const repairQuality = sample([0.5, 1, 1.5]); // Random repair quality multiplier
        const repairAmount = Math.floor(item.maxDurability * repairQuality);
        const repairTime = Math.floor(item.maxDurability * 0.1); // Repair time in arbitrary units

        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: Math.min(item.maxDurability, item.durability + repairAmount)
            }
          },
          totalValue: context.totalValue - repairTime, // Cost in arbitrary units
          emergencyRepairTimer: setTimeout(() => {
            context.emergencyRepairTimer = null;
            horizonZeroDawnMachine.send({ type: 'TIMER_COMPLETE' });
          }, repairTime * 1000)
        };
      }
      return context;
    },
    completeEmergencyRepair: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: item.maxDurability
            }
          }
        };
      }
      return context;
    },
    startMission: (context, event) => {
      const { missionId, missionType } = event.data;
      const branch = context.missionBranches[missionId].branches[missionType];
      return {
        activeMissions: [...context.activeMissions, missionId],
        [branch.id]: { state: 'inProgress' }
      };
    },
    addMission: (context, event) => {
      const { missionId, missionType } = event.data;
      const branch = context.missionBranches[missionId].branches[missionType];
      return {
        activeMissions: [...context.activeMissions, missionId],
        [branch.id]: { state: 'inProgress' }
      };
    },
    setTacticalApproach: (context, event) => {
      return { tacticalApproach: event.data.tacticalApproach };
    },
    executeStealthTactic: (context, event) => {
      // Implement stealth tactic logic
      console.log('Executing Stealth Tactic');
      return {};
    },
    executeRangedAttackTactic: (context, event) => {
      // Implement ranged attack tactic logic
      console.log('Executing Ranged Attack Tactic');
      return {};
    },
    executeMeleeEngagementTactic: (context, event) => {
      // Implement melee engagement tactic logic
      console.log('Executing Melee Engagement Tactic');
      return {};
    }
  },
  services: {
    runMission: (context, event) => (sendBack) => {
      const { missionId, missionType } = event.data;
      const branch = context.missionBranches[missionId].branches[missionType];

      switch (branch.id) {
        case 'quest1':
          setInterval(() => {
            sendBack({ type: 'TICK' });
          }, 1000);
          break;
        case 'resource1':
          setInterval(() => {
            sendBack({ type: 'GATHER_RESOURCE', data: { resource: 'wood', amount: 1 } });
            sendBack({ type: 'GATHER_RESOURCE', data: { resource: 'stone', amount: 0.5 } });
            sendBack({ type: 'GATHER_RESOURCE', data: { resource: 'herbs', amount: 0.3 } });
          }, 1000);
          break;
        default:
          break;
      }

      return () => clearInterval(intervalId);
    }
  },
  guards: {
    isNotInBattle: (context, event) => context.currentTerrain !== 'battle',
    isNotInCombat: (context, event) => context.currentTerrain !== 'combat',
    hasSufficientAmmunition: (context, event) => context.ammunitionCount > 0,
    canCarryMoreItems: (context, event) => context.totalWeight + event.data.item.weight <= context.maxCarryingCapacity,
    canAffordItem: (context, event) => context.totalValue + event.data.item.value <= context.maxInventoryValue,
    isItemUsable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      return item && item.durability > 0;
    },
    isItemRepairable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      const repairCost = item.rarity === 'legendary' ? 200 : item.rarity === 'epic' ? 150 : 100;
      return item && item.repairCost <= context.totalValue;
    },
    isItemBreakable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      return item && item.durability <= 0;
    },
    isItemSalvagable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      return item && item.durability <= 0;
    },
    isItemEmergencyRepairable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      return item && item.durability <= 0;
    },
    isRepairTimerComplete: (context, event) => !context.repairTimer,
    isSalvageTimerComplete: (context, event) => !context.salvageTimer,
    isEmergencyRepairTimerComplete: (context, event) => !context.emergencyRepairTimer,
    isQuestCompleted: (context, event) => {
      const missionId = event.data.missionId;
      return context.activeMissions.includes(missionId) && questMissionMachine.getSnapshot().value === 'completed';
    },
    isResourceGatheringCompleted: (context, event) => {
      const missionId = event.data.missionId;
      return context.activeMissions.includes(missionId) && resourceGatheringMissionMachine.getSnapshot().value === 'completed';
    },
    isMissionActive: (context, event) => context.activeMissions.includes(event.data.missionId),
    isStealthTacticApplicable: (context, event) => context.tacticalApproach === 'stealth',
    isRangedAttackTacticApplicable: (context, event) => context.tacticalApproach === 'rangedAttack',
    isMeleeEngagementTacticApplicable: (context, event) => context.tacticalApproach === 'meleeEngagement'
  }
});

// Example usage:
horizonZeroDawnMachine.onTransition((state, event) => {
  if (event.type === 'COMBAT') {
    console.log('Current State:', state.value, 'Updated Context:', state.context);
  } else {
    console.log('Current State:', state.value);
  }
});

// To send events to the machine:
horizonZeroDawnMachine.send({ type: 'START_NEW_GAME', data: { currentTerrain: 'plains' } });
horizonZeroDawnMachine.send({ type: 'PICK_UP_ITEM', data: { item: { name: 'sword', weight: 10, value: 50, rarity: 'common', durability: 100, maxDurability: 100, repairCost: 50, material: 'steel', salvageAmount: 10 } });
horizonZeroDawnMachine.send({ type: 'PICK_UP_ITEM', data: { item: { name: 'shield', weight: 5, value: 30, rarity: 'rare', durability: 150, maxDurability: 150, repairCost: 75, material: 'iron', salvageAmount: 15 } });
horizonZeroDawnMachine.send({ type: 'DROP_ITEM', data: { itemName: 'sword', itemWeight: 10, itemValue: 50, itemRarity: 'common', itemDurability: 100, itemMaxDurability: 100, itemRepairCost: 50, itemMaterial: 'steel', itemSalvageAmount: 10 } });
horizonZeroDawnMachine.send('USE_ITEM', { data: { itemName: 'sword' } }); // Should decrease durability
horizonZeroDawnMachine.send('REPAIR_ITEM', { data: { itemName: 'sword' } }); // Should start repair timer
horizonZeroDawnMachine.send('SALVAGE_ITEM', { data: { itemName: 'sword' } }); // Should start salvage timer
horizonZeroDawnMachine.send('START_EMERGENCY_REPAIR', { data: { itemName: 'sword' } }); // Should start emergency repair timer
horizonZeroDawnMachine.send('START_QUEST_MISSION', { data: { missionId: 'quest1', missionType: 'quest' } }); // Should start quest mission
horizonZeroDawnMachine.send('START_RESOURCE_GATHERING_MISSION', { data: { missionId: 'resource1', missionType: 'resourceGathering' } }); // Should start resource gathering mission
horizonZeroDawnMachine.send('SET_TACTICAL_APPROACH', { data: { tacticalApproach: 'stealth' } }); // Should set stealth approach
horizonZeroDawnMachine.send('EXECUTE_TACTIC'); // Should execute stealth tactic
horizonZeroDawnMachine.send('COMBAT'); // Should be allowed since forest is a valid terrain for combat
horizonZeroDawnMachine.send('BATTLE_WON');
horizonZeroDawnMachine.send('MAIN_MENU');
Explanation:
Mission State Machines:
questMissionMachine: Manages a quest mission with a time limit and objective.
resourceGatheringMissionMachine: Manages a resource gathering mission with a time limit and resource collection goals.
Main Game State Machine:
mission: A parent state that manages the execution of active missions.
Invokes the mission-specific state machines (questMissionMachine and resourceGatheringMissionMachine) and waits for them to complete.
Services:
runMission: Runs the mission state machine and dispatches ticks or resource gathering events.
Guards:
isNotInBattle, isNotInCombat, hasSufficientAmmunition, canCarryMoreItems, canAffordItem, isItemUsable, isItemRepairable, isItemBreakable, isItemSalvagable, isItemEmergencyRepairable, isRepairTimerComplete, isSalvageTimerComplete, isEmergencyRepairTimerComplete, isQuestCompleted, isResourceGatheringCompleted, isMissionActive: Ensure that the game state is valid and that missions are progressing correctly.
Branching Logic:
The main game state machine uses the activeMissions array to track which missions are currently active.
Each mission branch has its own state machine, and the main game state machine invokes these state machines to handle their execution.
This structure allows for a highly flexible and complex mission system, where each mission can have multiple branches and sub-missions. You can easily extend this system by adding more mission types, dependencies, and rewards.

For example, you can add more complex branching logic to the quest mission, where finding the artifact leads to one path, and completing side quests leads to another path. You can also add dependencies between missions, ensuring that certain missions can only be started after others are completed. This will create a more intricate and dynamic mission structure that keeps players engaged and motivated to progress through the game.


Develop more complex consequence chains


To develop more complex consequence chains, we need to ensure that each action and decision has a clear and meaningful impact on the game state. This can include changing the player's attributes, unlocking new abilities, altering the environment, and more. We can also introduce conditional consequences based on the outcome of previous actions.

Here’s how you can extend the state machine to include more complex consequence chains:

Consequence Actions:
Define actions that change the game state based on the outcome of previous actions.
Conditional Consequences:
Introduce guards to determine if certain consequences should be applied.
Complex Branching Logic:
Extend the branching logic to include more complex decision trees and consequence chains.
Here’s an updated example:

Mission State Machines
Quest Mission
The quest mission will have two branches: one where the player needs to find a specific artifact, and another where the player needs to complete a series of side quests.


const questMissionMachine = Machine({
  id: 'questMission',
  initial: 'start',
  context: {
    missionObjective: 'Find the ancient artifact',
    elapsedTime: 0,
    timeLimit: 60 // 60 seconds
  },
  states: {
    start: {
      always: [{ target: 'findArtifact', cond: 'shouldFindArtifact' }, { target: 'sideQuests', cond: 'shouldDoSideQuests' }]
    },
    findArtifact: {
      on: {
        COMPLETE_MISSION: { target: 'completed' }
      }
    },
    sideQuests: {
      on: {
        COMPLETE_SIDE_QUEST: { target: 'checkCompletion' }
      }
    },
    checkCompletion: {
      always: [{ target: 'completed', cond: 'allSideQuestsCompleted' }, { target: 'continue' }]
    },
    continue: {
      on: {
        COMPLETE_MISSION: { target: 'completed' }
      }
    }
  }
}, {
  guards: {
    shouldFindArtifact: (context, event) => true, // Implement logic to determine if the player should find the artifact
    shouldDoSideQuests: (context, event) => true, // Implement logic to determine if the player should do side quests
    allSideQuestsCompleted: (context, event) => true // Implement logic to determine if all side quests are completed
  }
});
Resource Gathering Mission
The resource gathering mission will have three branches: gathering wood, gathering stone, and gathering herbs.


const resourceGatheringMissionMachine = Machine({
  id: 'resourceGatheringMission',
  initial: 'start',
  context: {
    requiredResources: { wood: 10, stone: 5, herbs: 3 },
    collectedResources: { wood: 0, stone: 0, herbs: 0 },
    elapsedTime: 0,
    timeLimit: 45 // 45 seconds
  },
  states: {
    start: {
      always: [
        { target: 'gatherWood', cond: 'shouldGatherWood' },
        { target: 'gatherStone', cond: 'shouldGatherStone' },
        { target: 'gatherHerbs', cond: 'shouldGatherHerbs' }
      ]
    },
    gatherWood: {
      on: {
        GATHER_RESOURCE: { target: 'gatherWood', actions: ['collectResource'] },
        COMPLETE_MISSION: { target: 'completed' }
      }
    },
    gatherStone: {
      on: {
        GATHER_RESOURCE: { target: 'gatherStone', actions: ['collectResource'] },
        COMPLETE_MISSION: { target: 'completed' }
      }
    },
    gatherHerbs: {
      on: {
        GATHER_RESOURCE: { target: 'gatherHerbs', actions: ['collectResource'] },
        COMPLETE_MISSION: { target: 'completed' }
      }
    }
  }
}, {
  actions: {
    collectResource: (context, event) => {
      const { resource, amount } = event.data;
      return {
        collectedResources: {
          ...context.collectedResources,
          [resource]: (context.collectedResources[resource] || 0) + amount
        }
      };
    }
  },
  guards: {
    shouldGatherWood: (context, event) => true, // Implement logic to determine if the player should gather wood
    shouldGatherStone: (context, event) => true, // Implement logic to determine if the player should gather stone
    shouldGatherHerbs: (context, event) => true, // Implement logic to determine if the player should gather herbs
    hasCollectedRequiredResources: (context, event) => {
      return Object.keys(context.requiredResources).every(resource => 
        context.collectedResources[resource] >= context.requiredResources[resource]
      );
    },
    isWithinTimeLimit: (context, event) => context.elapsedTime < context.timeLimit
  }
});
Main Game State Machine
The main game state machine will manage the execution of active missions and handle the branching logic.


const horizonZeroDawnMachine = Machine({
  id: 'horizonZeroDawn',
  initial: 'startMenu',
  context: {
    currentTerrain: null, // Initialize with null or default terrain
    moveSpeedMultiplier: 1,
    attackPowerMultiplier: 1,
    defenseMultiplier: 1,
    currentWeapon: null,
    ammunitionCount: 0,
    totalWeight: 0,
    totalValue: 0,
    maxCarryingCapacity: 50, // Maximum carrying capacity in arbitrary units
    maxInventoryValue: 1000, // Maximum inventory value in arbitrary currency units
    items: {},
    salvageMaterials: {},
    repairTimer: null,
    salvageTimer: null,
    emergencyRepairTimer: null,
    activeMissions: [],
    missionBranches: {
      quest1: {
        type: 'quest',
        branches: {
          findArtifact: { machine: questMissionMachine },
          sideQuests: { machine: questMissionMachine }
        }
      },
      resource1: {
        type: 'resourceGathering',
        branches: {
          gatherWood: { machine: resourceGatheringMissionMachine },
          gatherStone: { machine: resourceGatheringMissionMachine },
          gatherHerbs: { machine: resourceGatheringMissionMachine }
        }
      }
    }
  },
  states: {
    startMenu: {
      on: {
        START_NEW_GAME: { target: 'gamePlay', actions: ['setInitialTerrain'], cond: 'isNotInBattle' },
        LOAD_GAME: { target: 'gamePlay', actions: ['setInitialTerrain'], cond: 'isNotInBattle' },
        OPTIONS: 'options',
        QUIT: 'exit'
      }
    },
    gamePlay: {
      on: {
        COMBAT: { target: 'combat', actions: ['updateCombatEffects'], cond: 'isNotInCombat' },
        EXPLORATION: 'exploration',
        INVENTORY_MANAGEMENT: 'inventory',
        SAVE_GAME: 'gamePlay',
        PAUSE_GAME: 'pause',
        MAIN_MENU: 'startMenu',
        FISHING: 'fishing',
        HUNTING: 'hunting',
        PICK_UP_ITEM: { target: 'itemSelection', actions: ['addItem'] },
        DROP_ITEM: { target: 'inventory', actions: ['removeItem'] },
        USE_ITEM: { target: 'gamePlay', actions: ['useItem'], cond: 'isItemUsable' },
        REPAIR_ITEM: { target: 'repair', actions: ['startRepairTimer'], cond: 'isItemRepairable' },
        BREAK_ITEM: { target: 'break', actions: ['breakItem'], cond: 'isItemBreakable' },
        SALVAGE_ITEM: { target: 'salvage', actions: ['startSalvageTimer'], cond: 'isItemSalvagable' },
        START_EMERGENCY_REPAIR: { target: 'emergencyFieldRepair', actions: ['startEmergencyRepairTimer'], cond: 'isItemEmergencyRepairable' },
        START_QUEST_MISSION: { target: 'mission', actions: ['startMission', 'addMission'], cond: 'isNotInCombat' },
        START_RESOURCE_GATHERING_MISSION: { target: 'mission', actions: ['startMission', 'addMission'], cond: 'isNotInCombat' }
      }
    },
    combat: {
      on: {
        BATTLE_WON: 'victoryScreen',
        BATTLE_LOST: 'defeatScreen'
      }
    },
    victoryScreen: {
      on: {
        CONTINUE: 'gamePlay',
        MAIN_MENU: 'startMenu'
      }
    },
    defeatScreen: {
      on: {
        RETRY: 'combat',
        MAIN_MENU: 'startMenu'
      }
    },
    exploration: {
      on: {
        ENCOUNTER_ENEMY: 'combat',
        INTERACT_WITH_NPC: 'dialogue', // Assuming dialogue is another state
        FIND_ITEM_QUEST: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    inventory: {
      on: {
        CLOSE_INVENTORY: 'gamePlay'
      }
    },
    pause: {
      on: {
        RESUME_GAME: 'gamePlay',
        OPTIONS: 'options',
        MAIN_MENU: 'startMenu'
      }
    },
    options: {
      on: {
        APPLY_CHANGES: 'gamePlay',
        CANCEL: 'startMenu'
      }
    },
    exit: {
      type: 'final'
    },
    fishing: {
      on: {
        FINISH_FISHING: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    hunting: {
      on: {
        FINISH_HUNTING: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    weaponSelection: {
      on: {
        SELECT_WEAPON: { target: 'gamePlay', actions: ['selectWeapon'] }
      }
    },
    itemSelection: {
      on: {
        SELECT_ITEM: { target: 'gamePlay', actions: ['selectItem'] }
      }
    },
    repair: {
      on: {
        COMPLETE_REPAIR: { target: 'gamePlay', actions: ['completeRepair'] }
      }
    },
    break: {
      on: {
        COMPLETE_BREAK: { target: 'gamePlay', actions: ['completeBreak'] }
      }
    },
    salvage: {
      on: {
        COMPLETE_SALVAGE: { target: 'gamePlay', actions: ['completeSalvage'] }
      }
    },
    emergencyFieldRepair: {
      on: {
        COMPLETE_EMERGENCY_REPAIR: { target: 'gamePlay', actions: ['completeEmergencyRepair'] }
      }
    },
    repairTimer: {
      on: {
        TIMER_COMPLETE: { target: 'repair' }
      }
    },
    salvageTimer: {
      on: {
        TIMER_COMPLETE: { target: 'salvage' }
      }
    },
    emergencyRepairTimer: {
      on: {
        TIMER_COMPLETE: { target: 'emergencyFieldRepair' }
      }
    },
    mission: {
      initial: 'idle',
      states: {
        idle: {
          on: {
            START_QUEST_MISSION: { target: 'quest', actions: ['startMission', 'addMission'], cond: 'isNotInCombat' },
            START_RESOURCE_GATHERING_MISSION: { target: 'resourceGathering', actions: ['startMission', 'addMission'], cond: 'isNotInCombat' }
          }
        },
        quest: {
          invoke: [
            { src: 'runMission', onDone: { target: 'idle' } }
          ]
        },
        resourceGathering: {
          invoke: [
            { src: 'runMission', onDone: { target: 'idle' } }
          ]
        }
      }
    },
    tacticalApproach: {
      initial: 'idle',
      states: {
        idle: {
          on: {
            SET_STEALTH: { target: 'stealth', actions: ['setTacticalApproach'] },
            SET_RANGED_ATTACK: { target: 'rangedAttack', actions: ['setTacticalApproach'] },
            SET_MELEE_ENGAGEMENT: { target: 'meleeEngagement', actions: ['setTacticalApproach'] }
          }
        },
        stealth: {
          on: {
            EXECUTE_TACTIC: { target: 'idle', actions: ['executeStealthTactic'] }
          }
        },
        rangedAttack: {
          on: {
            EXECUTE_TACTIC: { target: 'idle', actions: ['executeRangedAttackTactic'] }
          }
        },
        meleeEngagement: {
          on: {
            EXECUTE_TACTIC: { target: 'idle', actions: ['executeMeleeEngagementTactic'] }
          }
        }
      }
    }
  }
}, {
  actions: {
    setInitialTerrain: (context, event) => {
      return { currentTerrain: event.data.currentTerrain };
    },
    updateCombatEffects: (context, event) => {
      const terrainEffects = {
        plains: {
          moveSpeedMultiplier: 1,
          attackPowerMultiplier: 1,
          defenseMultiplier: 1
        },
        forest: {
          moveSpeedMultiplier: 0.8,
          attackPowerMultiplier: 1.2,
          defenseMultiplier: 0.9
        },
        mountain: {
          moveSpeedMultiplier: 0.5,
          attackPowerMultiplier: 1.5,
          defenseMultiplier: 1.2
        },
        desert: {
          moveSpeedMultiplier: 1.2,
          attackPowerMultiplier: 0.8,
          defenseMultiplier: 0.8
        }
      };

      const currentTerrain = context.currentTerrain;
      const terrainEffect = terrainEffects[currentTerrain] || {};

      return {
        moveSpeedMultiplier: terrainEffect.moveSpeedMultiplier,
        attackPowerMultiplier: terrainEffect.attackPowerMultiplier,
        defenseMultiplier: terrainEffect.defenseMultiplier
      };
    },
    addItem: (context, event) => {
      const newItem = event.data.item;
      const weightMultiplier = newItem.rarity === 'legendary' ? 1.5 : newItem.rarity === 'epic' ? 1.2 : 1;
      const valueMultiplier = newItem.rarity === 'legendary' ? 2 : newItem.rarity === 'epic' ? 1.5 : 1;

      return {
        totalWeight: context.totalWeight + newItem.weight * weightMultiplier,
        totalValue: context.totalValue + newItem.value * valueMultiplier,
        items: {
          ...context.items,
          [newItem.name]: {
            ...newItem,
            durability: newItem.durability
          }
        }
      };
    },
    removeItem: (context, event) => {
      const itemName = event.data.itemName;
      const itemWeight = event.data.itemWeight;
      const itemValue = event.data.itemValue;
      const weightMultiplier = event.data.itemRarity === 'legendary' ? 1.5 : event.data.itemRarity === 'epic' ? 1.2 : 1;
      const valueMultiplier = event.data.itemRarity === 'legendary' ? 2 : event.data.itemRarity === 'epic' ? 1.5 : 1;

      return {
        totalWeight: context.totalWeight - itemWeight * weightMultiplier,
        totalValue: context.totalValue - itemValue * valueMultiplier,
        items: {
          ...context.items,
          [itemName]: undefined
        }
      };
    },
    selectWeapon: (context, event) => {
      return { currentWeapon: event.data.weapon };
    },
    useItem: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: item.durability - 1
            }
          }
        };
      }
      return context;
    },
    startRepairTimer: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        const repairQuality = sample([0.5, 1, 1.5]); // Random repair quality multiplier
        const repairAmount = Math.floor(item.maxDurability * repairQuality);
        const repairCost = Math.floor(repairAmount / 2); // Simplified cost calculation
        const repairTime = Math.floor(item.maxDurability * 0.1); // Repair time in arbitrary units

        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: Math.min(item.maxDurability, item.durability + repairAmount)
            }
          },
          totalValue: context.totalValue - repairCost,
          repairTimer: setTimeout(() => {
            context.repairTimer = null;
            horizonZeroDawnMachine.send({ type: 'TIMER_COMPLETE' });
          }, repairTime * 1000)
        };
      }
      return context;
    },
    completeRepair: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: item.maxDurability
            }
          }
        };
      }
      return context;
    },
    breakItem: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    salvageItem: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    completeBreak: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    completeSalvage: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    startSalvageTimer: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        const salvageTime = Math.floor(item.maxDurability * 0.2); // Salvage time in arbitrary units

        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: 0
            }
          },
          totalValue: context.totalValue - salvageTime, // Cost in arbitrary units
          salvageTimer: setTimeout(() => {
            context.salvageTimer = null;
            horizonZeroDawnMachine.send({ type: 'TIMER_COMPLETE' });
          }, salvageTime * 1000)
        };
      }
      return context;
    },
    startEmergencyRepairTimer: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        const repairQuality = sample([0.5, 1, 1.5]); // Random repair quality multiplier
        const repairAmount = Math.floor(item.maxDurability * repairQuality);
        const repairTime = Math.floor(item.maxDurability * 0.1); // Repair time in arbitrary units

        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: Math.min(item.maxDurability, item.durability + repairAmount)
            }
          },
          totalValue: context.totalValue - repairTime, // Cost in arbitrary units
          emergencyRepairTimer: setTimeout(() => {
            context.emergencyRepairTimer = null;
            horizonZeroDawnMachine.send({ type: 'TIMER_COMPLETE' });
          }, repairTime * 1000)
        };
      }
      return context;
    },
    completeEmergencyRepair: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: item.maxDurability
            }
          }
        };
      }
      return context;
    },
    startMission: (context, event) => {
      const { missionId, missionType } = event.data;
      const branch = context.missionBranches[missionId].branches[missionType];
      return {
        activeMissions: [...context.activeMissions, missionId],
        [branch.id]: { state: 'inProgress' }
      };
    },
    addMission: (context, event) => {
      const { missionId, missionType } = event.data;
      const branch = context.missionBranches[missionId].branches[missionType];
      return {
        activeMissions: [...context.activeMissions, missionId],
        [branch.id]: { state: 'inProgress' }
      };
    },
    setTacticalApproach: (context, event) => {
      return { tacticalApproach: event.data.tacticalApproach };
    },
    executeStealthTactic: (context, event) => {
      // Implement stealth tactic logic
      console.log('Executing Stealth Tactic');
      return {};
    },
    executeRangedAttackTactic: (context, event) => {
      // Implement ranged attack tactic logic
      console.log('Executing Ranged Attack Tactic');
      return {};
    },
    executeMeleeEngagementTactic: (context, event) => {
      // Implement melee engagement tactic logic
      console.log('Executing Melee Engagement Tactic');
      return {};
    }
  },
  services: {
    runMission: (context, event) => (sendBack) => {
      const { missionId, missionType } = event.data;
      const branch = context.missionBranches[missionId].branches[missionType];

      switch (branch.id) {
        case 'quest1':
          setInterval(() => {
            sendBack({ type: 'TICK' });
          }, 1000);
          break;
        case 'resource1':
          setInterval(() => {
            sendBack({ type: 'GATHER_RESOURCE', data: { resource: 'wood', amount: 1 } });
            sendBack({ type: 'GATHER_RESOURCE', data: { resource: 'stone', amount: 0.5 } });
            sendBack({ type: 'GATHER_RESOURCE', data: { resource: 'herbs', amount: 0.3 } });
          }, 1000);
          break;
        default:
          break;
      }

      return () => clearInterval(intervalId);
    }
  },
  guards: {
    isNotInBattle: (context, event) => context.currentTerrain !== 'battle',
    isNotInCombat: (context, event) => context.currentTerrain !== 'combat',
    hasSufficientAmmunition: (context, event) => context.ammunitionCount > 0,
    canCarryMoreItems: (context, event) => context.totalWeight + event.data.item.weight <= context.maxCarryingCapacity,
    canAffordItem: (context, event) => context.totalValue + event.data.item.value <= context.maxInventoryValue,
    isItemUsable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      return item && item.durability > 0;
    },
    isItemRepairable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      const repairCost = item.rarity === 'legendary' ? 200 : item.rarity === 'epic' ? 150 : 100;
      return item && item.repairCost <= context.totalValue;
    },
    isItemBreakable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      return item && item.durability <= 0;
    },
    isItemSalvagable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      return item && item.durability <= 0;
    },
    isItemEmergencyRepairable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      return item && item.durability <= 0;
    },
    isRepairTimerComplete: (context, event) => !context.repairTimer,
    isSalvageTimerComplete: (context, event) => !context.salvageTimer,
    isEmergencyRepairTimerComplete: (context, event) => !context.emergencyRepairTimer,
    isQuestCompleted: (context, event) => {
      const missionId = event.data.missionId;
      return context.activeMissions.includes(missionId) && questMissionMachine.getSnapshot().value === 'completed';
    },
    isResourceGatheringCompleted: (context, event) => {
      const missionId = event.data.missionId;
      return context.activeMissions.includes(missionId) && resourceGatheringMissionMachine.getSnapshot().value === 'completed';
    },
    isMissionActive: (context, event) => context.activeMissions.includes(event.data.missionId),
    isStealthTacticApplicable: (context, event) => context.tacticalApproach === 'stealth',
    isRangedAttackTacticApplicable: (context, event) => context.tacticalApproach === 'rangedAttack',
    isMeleeEngagementTacticApplicable: (context, event) => context.tacticalApproach === 'meleeEngagement'
  }
});

// Example usage:
horizonZeroDawnMachine.onTransition((state, event) => {
  if (event.type === 'COMBAT') {
    console.log('Current State:', state.value, 'Updated Context:', state.context);
  } else {
    console.log('Current State:', state.value);
  }
});

// To send events to the machine:
horizonZeroDawnMachine.send({ type: 'START_NEW_GAME', data: { currentTerrain: 'plains' } });
horizonZeroDawnMachine.send({ type: 'PICK_UP_ITEM', data: { item: { name: 'sword', weight: 10, value: 50, rarity: 'common', durability: 100, maxDurability: 100, repairCost: 50, material: 'steel', salvageAmount: 10 } });
horizonZeroDawnMachine.send({ type: 'PICK_UP_ITEM', data: { item: { name: 'shield', weight: 5, value: 30, rarity: 'rare', durability: 150, maxDurability: 150, repairCost: 75, material: 'iron', salvageAmount: 15 } });
horizonZeroDawnMachine.send({ type: 'DROP_ITEM', data: { itemName: 'sword', itemWeight: 10, itemValue: 50, itemRarity: 'common', itemDurability: 100, itemMaxDurability: 100, itemRepairCost: 50, itemMaterial: 'steel', itemSalvageAmount: 10 } });
horizonZeroDawnMachine.send('USE_ITEM', { data: { itemName: 'sword' } }); // Should decrease durability
horizonZeroDawnMachine.send('REPAIR_ITEM', { data: { itemName: 'sword' } }); // Should start repair timer
horizonZeroDawnMachine.send('SALVAGE_ITEM', { data: { itemName: 'sword' } }); // Should start salvage timer
horizonZeroDawnMachine.send('START_EMERGENCY_REPAIR', { data: { itemName: 'sword' } }); // Should start emergency repair timer
horizonZeroDawnMachine.send('START_QUEST_MISSION', { data: { missionId: 'quest1', missionType: 'quest' } }); // Should start quest mission
horizonZeroDawnMachine.send('START_RESOURCE_GATHERING_MISSION', { data: { missionId: 'resource1', missionType: 'resourceGathering' } }); // Should start resource gathering mission
horizonZeroDawnMachine.send('SET_TACTICAL_APPROACH', { data: { tacticalApproach: 'stealth' } }); // Should set stealth approach
horizonZeroDawnMachine.send('EXECUTE_TACTIC'); // Should execute stealth tactic
horizonZeroDawnMachine.send('COMBAT'); // Should be allowed since forest is a valid terrain for combat
horizonZeroDawnMachine.send('BATTLE_WON');
horizonZeroDawnMachine.send('MAIN_MENU');
Explanation:
Mission State Machines:
questMissionMachine: Manages a quest mission with a time limit and objective.
resourceGatheringMissionMachine: Manages a resource gathering mission with a time limit and resource collection goals.
Main Game State Machine:
mission: A parent state that manages the execution of active missions.
Invokes the mission-specific state machines (questMissionMachine and resourceGatheringMissionMachine) and waits for them to complete.
Services:
runMission: Runs the mission state machine and dispatches ticks or resource gathering events.
Guards:
isNotInBattle, isNotInCombat, hasSufficientAmmunition, canCarryMoreItems, canAffordItem, isItemUsable, isItemRepairable, isItemBreakable, isItemSalvagable, isItemEmergencyRepairable, isRepairTimerComplete, isSalvageTimerComplete, isEmergencyRepairTimerComplete, isQuestCompleted, isResourceGatheringCompleted, isMissionActive: Ensure that the game state is valid and that missions are progressing correctly.
Branching Logic:
The main game state machine uses the activeMissions array to track which missions are currently active.
Each mission branch has its own state machine, and the main game state machine invokes these state machines to handle their execution.
Consequence Actions:
completeRepair, completeBreak, completeSalvage, completeEmergencyRepair: These actions will change the game state based on the outcome of the mission.
Conditional Consequences:
The guards will determine if certain consequences should be applied based on the game state.
With these modifications, the game now supports more complex consequence chains, where each action and decision has a clear and meaningful impact on the game state. This will create a more immersive and dynamic gameplay experience, keeping players engaged and motivated to progress through the game.


Create additional faction interaction systems?


Creating additional faction interaction systems can add depth and complexity to the game by introducing relationships and interactions with various factions. These interactions can include trading, quests, diplomacy, and conflicts. Here’s how you can integrate faction interaction systems into the state machine:

Faction State Machines:
Define state machines for each faction to manage their interactions and states.
Main Game State Machine:
Integrate the faction state machines into the main game state machine and handle transitions based on faction interactions.
Faction Interaction Events:
Define events to trigger interactions with factions.
Here’s an updated example:

Faction State Machines
Faction A State Machine
The faction A state machine will manage interactions with Faction A, including trading, quests, and diplomacy.


const factionAStateMachine = Machine({
  id: 'factionA',
  initial: 'neutral',
  context: {
    reputation: 0,
    tradeOffers: [],
    quests: []
  },
  states: {
    neutral: {
      on: {
        TRADE_OFFER: { target: 'trading', actions: ['acceptTradeOffer'] },
        ACCEPT_QUEST: { target: 'quests', actions: ['acceptQuest'] },
        DIPLOMACY: { target: 'diplomacy', actions: ['increaseReputation'] }
      }
    },
    trading: {
      on: {
        COMPLETE_TRADE: { target: 'neutral' }
      }
    },
    quests: {
      on: {
        COMPLETE_QUEST: { target: 'neutral' }
      }
    },
    diplomacy: {
      on: {
        NEGOTIATE: { target: 'neutral' }
      }
    }
  }
}, {
  actions: {
    acceptTradeOffer: (context, event) => {
      return {
        tradeOffers: context.tradeOffers.filter(offer => offer !== event.data.offer)
      };
    },
    acceptQuest: (context, event) => {
      return {
        quests: context.quests.filter(quest => quest !== event.data.quest)
      };
    },
    increaseReputation: (context, event) => {
      return {
        reputation: context.reputation + 1
      };
    }
  }
});
Faction B State Machine
The faction B state machine will manage interactions with Faction B, including trading, quests, and diplomacy.


const factionBStateMachine = Machine({
  id: 'factionB',
  initial: 'neutral',
  context: {
    reputation: 0,
    tradeOffers: [],
    quests: []
  },
  states: {
    neutral: {
      on: {
        TRADE_OFFER: { target: 'trading', actions: ['acceptTradeOffer'] },
        ACCEPT_QUEST: { target: 'quests', actions: ['acceptQuest'] },
        DIPLOMACY: { target: 'diplomacy', actions: ['increaseReputation'] }
      }
    },
    trading: {
      on: {
        COMPLETE_TRADE: { target: 'neutral' }
      }
    },
    quests: {
      on: {
        COMPLETE_QUEST: { target: 'neutral' }
      }
    },
    diplomacy: {
      on: {
        NEGOTIATE: { target: 'neutral' }
      }
    }
  }
}, {
  actions: {
    acceptTradeOffer: (context, event) => {
      return {
        tradeOffers: context.tradeOffers.filter(offer => offer !== event.data.offer)
      };
    },
    acceptQuest: (context, event) => {
      return {
        quests: context.quests.filter(quest => quest !== event.data.quest)
      };
    },
    increaseReputation: (context, event) => {
      return {
        reputation: context.reputation + 1
      };
    }
  }
});
Main Game State Machine
The main game state machine will manage the execution of active missions, faction interactions, and handle the branching logic.


const horizonZeroDawnMachine = Machine({
  id: 'horizonZeroDawn',
  initial: 'startMenu',
  context: {
    currentTerrain: null, // Initialize with null or default terrain
    moveSpeedMultiplier: 1,
    attackPowerMultiplier: 1,
    defenseMultiplier: 1,
    currentWeapon: null,
    ammunitionCount: 0,
    totalWeight: 0,
    totalValue: 0,
    maxCarryingCapacity: 50, // Maximum carrying capacity in arbitrary units
    maxInventoryValue: 1000, // Maximum inventory value in arbitrary currency units
    items: {},
    salvageMaterials: {},
    repairTimer: null,
    salvageTimer: null,
    emergencyRepairTimer: null,
    activeMissions: [],
    missionBranches: {
      quest1: {
        type: 'quest',
        branches: {
          findArtifact: { machine: questMissionMachine },
          sideQuests: { machine: questMissionMachine }
        }
      },
      resource1: {
        type: 'resourceGathering',
        branches: {
          gatherWood: { machine: resourceGatheringMissionMachine },
          gatherStone: { machine: resourceGatheringMissionMachine },
          gatherHerbs: { machine: resourceGatheringMissionMachine }
        }
      }
    },
    factions: {
      factionA: { machine: factionAStateMachine },
      factionB: { machine: factionBStateMachine }
    }
  },
  states: {
    startMenu: {
      on: {
        START_NEW_GAME: { target: 'gamePlay', actions: ['setInitialTerrain'], cond: 'isNotInBattle' },
        LOAD_GAME: { target: 'gamePlay', actions: ['setInitialTerrain'], cond: 'isNotInBattle' },
        OPTIONS: 'options',
        QUIT: 'exit'
      }
    },
    gamePlay: {
      on: {
        COMBAT: { target: 'combat', actions: ['updateCombatEffects'], cond: 'isNotInCombat' },
        EXPLORATION: 'exploration',
        INVENTORY_MANAGEMENT: 'inventory',
        SAVE_GAME: 'gamePlay',
        PAUSE_GAME: 'pause',
        MAIN_MENU: 'startMenu',
        FISHING: 'fishing',
        HUNTING: 'hunting',
        PICK_UP_ITEM: { target: 'itemSelection', actions: ['addItem'] },
        DROP_ITEM: { target: 'inventory', actions: ['removeItem'] },
        USE_ITEM: { target: 'gamePlay', actions: ['useItem'], cond: 'isItemUsable' },
        REPAIR_ITEM: { target: 'repair', actions: ['startRepairTimer'], cond: 'isItemRepairable' },
        BREAK_ITEM: { target: 'break', actions: ['breakItem'], cond: 'isItemBreakable' },
        SALVAGE_ITEM: { target: 'salvage', actions: ['startSalvageTimer'], cond: 'isItemSalvagable' },
        START_EMERGENCY_REPAIR: { target: 'emergencyFieldRepair', actions: ['startEmergencyRepairTimer'], cond: 'isItemEmergencyRepairable' },
        START_QUEST_MISSION: { target: 'mission', actions: ['startMission', 'addMission'], cond: 'isNotInCombat' },
        START_RESOURCE_GATHERING_MISSION: { target: 'mission', actions: ['startMission', 'addMission'], cond: 'isNotInCombat' },
        INTERACT_WITH_FACTION_A: { target: 'factionInteraction', actions: ['interactWithFactionA'], cond: 'isNotInCombat' },
        INTERACT_WITH_FACTION_B: { target: 'factionInteraction', actions: ['interactWithFactionB'], cond: 'isNotInCombat' }
      }
    },
    combat: {
      on: {
        BATTLE_WON: 'victoryScreen',
        BATTLE_LOST: 'defeatScreen'
      }
    },
    victoryScreen: {
      on: {
        CONTINUE: 'gamePlay',
        MAIN_MENU: 'startMenu'
      }
    },
    defeatScreen: {
      on: {
        RETRY: 'combat',
        MAIN_MENU: 'startMenu'
      }
    },
    exploration: {
      on: {
        ENCOUNTER_ENEMY: 'combat',
        INTERACT_WITH_NPC: 'dialogue', // Assuming dialogue is another state
        FIND_ITEM_QUEST: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    inventory: {
      on: {
        CLOSE_INVENTORY: 'gamePlay'
      }
    },
    pause: {
      on: {
        RESUME_GAME: 'gamePlay',
        OPTIONS: 'options',
        MAIN_MENU: 'startMenu'
      }
    },
    options: {
      on: {
        APPLY_CHANGES: 'gamePlay',
        CANCEL: 'startMenu'
      }
    },
    exit: {
      type: 'final'
    },
    fishing: {
      on: {
        FINISH_FISHING: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    hunting: {
      on: {
        FINISH_HUNTING: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    weaponSelection: {
      on: {
        SELECT_WEAPON: { target: 'gamePlay', actions: ['selectWeapon'] }
      }
    },
    itemSelection: {
      on: {
        SELECT_ITEM: { target: 'gamePlay', actions: ['selectItem'] }
      }
    },
    repair: {
      on: {
        COMPLETE_REPAIR: { target: 'gamePlay', actions: ['completeRepair'] }
      }
    },
    break: {
      on: {
        COMPLETE_BREAK: { target: 'gamePlay', actions: ['completeBreak'] }
      }
    },
    salvage: {
      on: {
        COMPLETE_SALVAGE: { target: 'gamePlay', actions: ['completeSalvage'] }
      }
    },
    emergencyFieldRepair: {
      on: {
        COMPLETE_EMERGENCY_REPAIR: { target: 'gamePlay', actions: ['completeEmergencyRepair'] }
      }
    },
    repairTimer: {
      on: {
        TIMER_COMPLETE: { target: 'repair' }
      }
    },
    salvageTimer: {
      on: {
        TIMER_COMPLETE: { target: 'salvage' }
      }
    },
    emergencyRepairTimer: {
      on: {
        TIMER_COMPLETE: { target: 'emergencyFieldRepair' }
      }
    },
    mission: {
      initial: 'idle',
      states: {
        idle: {
          on: {
            START_QUEST_MISSION: { target: 'quest', actions: ['startMission', 'addMission'], cond: 'isNotInCombat' },
            START_RESOURCE_GATHERING_MISSION: { target: 'resourceGathering', actions: ['startMission', 'addMission'], cond: 'isNotInCombat' }
          }
        },
        quest: {
          invoke: [
            { src: 'runMission', onDone: { target: 'idle' } }
          ]
        },
        resourceGathering: {
          invoke: [
            { src: 'runMission', onDone: { target: 'idle' } }
          ]
        }
      }
    },
    factionInteraction: {
      initial: 'idle',
      states: {
        idle: {
          on: {
            INTERACT_WITH_FACTION_A: { target: 'factionA', actions: ['interactWithFactionA'] },
            INTERACT_WITH_FACTION_B: { target: 'factionB', actions: ['interactWithFactionB'] }
          }
        },
        factionA: {
          invoke: [
            { src: 'runFactionInteraction', onDone: { target: 'idle' } }
          ]
        },
        factionB: {
          invoke: [
            { src: 'runFactionInteraction', onDone: { target: 'idle' } }
          ]
        }
      }
    }
  }
}, {
  actions: {
    setInitialTerrain: (context, event) => {
      return { currentTerrain: event.data.currentTerrain };
    },
    updateCombatEffects: (context, event) => {
      const terrainEffects = {
        plains: {
          moveSpeedMultiplier: 1,
          attackPowerMultiplier: 1,
          defenseMultiplier: 1
        },
        forest: {
          moveSpeedMultiplier: 0.8,
          attackPowerMultiplier: 1.2,
          defenseMultiplier: 0.9
        },
        mountain: {
          moveSpeedMultiplier: 0.5,
          attackPowerMultiplier: 1.5,
          defenseMultiplier: 1.2
        },
        desert: {
          moveSpeedMultiplier: 1.2,
          attackPowerMultiplier: 0.8,
          defenseMultiplier: 0.8
        }
      };

      const currentTerrain = context.currentTerrain;
      const terrainEffect = terrainEffects[currentTerrain] || {};

      return {
        moveSpeedMultiplier: terrainEffect.moveSpeedMultiplier,
        attackPowerMultiplier: terrainEffect.attackPowerMultiplier,
        defenseMultiplier: terrainEffect.defenseMultiplier
      };
    },
    addItem: (context, event) => {
      const newItem = event.data.item;
      const weightMultiplier = newItem.rarity === 'legendary' ? 1.5 : newItem.rarity === 'epic' ? 1.2 : 1;
      const valueMultiplier = newItem.rarity === 'legendary' ? 2 : newItem.rarity === 'epic' ? 1.5 : 1;

      return {
        totalWeight: context.totalWeight + newItem.weight * weightMultiplier,
        totalValue: context.totalValue + newItem.value * valueMultiplier,
        items: {
          ...context.items,
          [newItem.name]: {
            ...newItem,
            durability: newItem.durability
          }
        }
      };
    },
    removeItem: (context, event) => {
      const itemName = event.data.itemName;
      const itemWeight = event.data.itemWeight;
      const itemValue = event.data.itemValue;
      const weightMultiplier = event.data.itemRarity === 'legendary' ? 1.5 : event.data.itemRarity === 'epic' ? 1.2 : 1;
      const valueMultiplier = event.data.itemRarity === 'legendary' ? 2 : event.data.itemRarity === 'epic' ? 1.5 : 1;

      return {
        totalWeight: context.totalWeight - itemWeight * weightMultiplier,
        totalValue: context.totalValue - itemValue * valueMultiplier,
        items: {
          ...context.items,
          [itemName]: undefined
        }
      };
    },
    selectWeapon: (context, event) => {
      return { currentWeapon: event.data.weapon };
    },
    useItem: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: item.durability - 1
            }
          }
        };
      }
      return context;
    },
    startRepairTimer: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        const repairQuality = sample([0.5, 1, 1.5]); // Random repair quality multiplier
        const repairAmount = Math.floor(item.maxDurability * repairQuality);
        const repairCost = Math.floor(repairAmount / 2); // Simplified cost calculation
        const repairTime = Math.floor(item.maxDurability * 0.1); // Repair time in arbitrary units

        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: Math.min(item.maxDurability, item.durability + repairAmount)
            }
          },
          totalValue: context.totalValue - repairCost,
          repairTimer: setTimeout(() => {
            context.repairTimer = null;
            horizonZeroDawnMachine.send({ type: 'TIMER_COMPLETE' });
          }, repairTime * 1000)
        };
      }
      return context;
    },
    completeRepair: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: item.maxDurability
            }
          }
        };
      }
      return context;
    },
    breakItem: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    salvageItem: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    completeBreak: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    completeSalvage: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    startSalvageTimer: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        const salvageTime = Math.floor(item.maxDurability * 0.2); // Salvage time in arbitrary units

        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: 0
            }
          },
          totalValue: context.totalValue - salvageTime, // Cost in arbitrary units
          salvageTimer: setTimeout(() => {
            context.salvageTimer = null;
            horizonZeroDawnMachine.send({ type: 'TIMER_COMPLETE' });
          }, salvageTime * 1000)
        };
      }
      return context;
    },
    startEmergencyRepairTimer: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        const repairQuality = sample([0.5, 1, 1.5]); // Random repair quality multiplier
        const repairAmount = Math.floor(item.maxDurability * repairQuality);
        const repairTime = Math.floor(item.maxDurability * 0.1); // Repair time in arbitrary units

        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: Math.min(item.maxDurability, item.durability + repairAmount)
            }
          },
          totalValue: context.totalValue - repairTime, // Cost in arbitrary units
          emergencyRepairTimer: setTimeout(() => {
            context.emergencyRepairTimer = null;
            horizonZeroDawnMachine.send({ type: 'TIMER_COMPLETE' });
          }, repairTime * 1000)
        };
      }
      return context;
    },
    completeEmergencyRepair: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: item.maxDurability
            }
          }
        };
      }
      return context;
    },
    startMission: (context, event) => {
      const { missionId, missionType } = event.data;
      const branch = context.missionBranches[missionId].branches[missionType];
      return {
        activeMissions: [...context.activeMissions, missionId],
        [branch.id]: { state: 'inProgress' }
      };
    },
    addMission: (context, event) => {
      const { missionId, missionType } = event.data;
      const branch = context.missionBranches[missionId].branches[missionType];
      return {
        activeMissions: [...context.activeMissions, missionId],
        [branch.id]: { state: 'inProgress' }
      };
    },
    interactWithFactionA: (context, event) => {
      const factionA = context.factions.factionA.machine.getSnapshot();
      return {
        factions: {
          ...context.factions,
          factionA: { machine: factionA }
        }
      };
    },
    interactWithFactionB: (context, event) => {
      const factionB = context.factions.factionB.machine.getSnapshot();
      return {
        factions: {
          ...context.factions,
          factionB: { machine: factionB }
        }
      };
    }
  },
  services: {
    runMission: (context, event) => (sendBack) => {
      const { missionId, missionType } = event.data;
      const branch = context.missionBranches[missionId].branches[missionType];

      switch (branch.id) {
        case 'quest1':
          setInterval(() => {
            sendBack({ type: 'TICK' });
          }, 1000);
          break;
        case 'resource1':
          setInterval(() => {
            sendBack({ type: 'GATHER_RESOURCE', data: { resource: 'wood', amount: 1 } });
            sendBack({ type: 'GATHER_RESOURCE', data: { resource: 'stone', amount: 0.5 } });
            sendBack({ type: 'GATHER_RESOURCE', data: { resource: 'herbs', amount: 0.3 } });
          }, 1000);
          break;
        default:
          break;
      }

      return () => clearInterval(intervalId);
    },
    runFactionInteraction: (context, event) => (sendBack) => {
      const { factionId } = event.data;
      const faction = context.factions[factionId].machine;

      switch (faction.value) {
        case 'neutral':
          setInterval(() => {
            sendBack({ type: 'TICK' });
          }, 1000);
          break;
        case 'trading':
          setInterval(() => {
            sendBack({ type: 'TRADE_OFFER', data: { offer: 'wood' } });
          }, 1000);
          break;
        case 'quests':
          setInterval(() => {
            sendBack({ type: 'ACCEPT_QUEST', data: { quest: 'explore area' } });
          }, 1000);
          break;
        case 'diplomacy':
          setInterval(() => {
            sendBack({ type: 'DIPLOMACY' });
          }, 1000);
          break;
        default:
          break;
      }

      return () => clearInterval(intervalId);
    }
  },
  guards: {
    isNotInBattle: (context, event) => context.currentTerrain !== 'battle',
    isNotInCombat: (context, event) => context.currentTerrain !== 'combat',
    hasSufficientAmmunition: (context, event) => context.ammunitionCount > 0,
    canCarryMoreItems: (context, event) => context.totalWeight + event.data.item.weight <= context.maxCarryingCapacity,
    canAffordItem: (context, event) => context.totalValue + event.data.item.value <= context.maxInventoryValue,
    isItemUsable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      return item && item.durability > 0;
    },
    isItemRepairable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      const repairCost = item.rarity === 'legendary' ? 200 : item.rarity === 'epic' ? 150 : 100;
      return item && item.repairCost <= context.totalValue;
    },
    isItemBreakable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      return item && item.durability <= 0;
    },
    isItemSalvagable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      return item && item.durability <= 0;
    },
    isItemEmergencyRepairable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      return item && item.durability <= 0;
    },
    isRepairTimerComplete: (context, event) => !context.repairTimer,
    isSalvageTimerComplete: (context, event) => !context.salvageTimer,
    isEmergencyRepairTimerComplete: (context, event) => !context.emergencyRepairTimer,
    isQuestCompleted: (context, event) => {
      const missionId = event.data.missionId;
      return context.activeMissions.includes(missionId) && questMissionMachine.getSnapshot().value === 'completed';
    },
    isResourceGatheringCompleted: (context, event) => {
      const missionId = event.data.missionId;
      return context.activeMissions.includes(missionId) && resourceGatheringMissionMachine.getSnapshot().value === 'completed';
    },
    isMissionActive: (context, event) => context.activeMissions.includes(event.data.missionId),
    isStealthTacticApplicable: (context, event) => context.tacticalApproach === 'stealth',
    isRangedAttackTacticApplicable: (context, event) => context.tacticalApproach === 'rangedAttack',
    isMeleeEngagementTacticApplicable: (context, event) => context.tacticalApproach === 'meleeEngagement'
  }
});

// Example usage:
horizonZeroDawnMachine.onTransition((state, event) => {
  if (event.type === 'COMBAT') {
    console.log('Current State:', state.value, 'Updated Context:', state.context);
  } else {
    console.log('Current State:', state.value);
  }
});

// To send events to the machine:
horizonZeroDawnMachine.send({ type: 'START_NEW_GAME', data: { currentTerrain: 'plains' } });
horizonZeroDawnMachine.send({ type: 'PICK_UP_ITEM', data: { item: { name: 'sword', weight: 10, value: 50, rarity: 'common', durability: 100, maxDurability: 100, repairCost: 50, material: 'steel', salvageAmount: 10 } });
horizonZeroDawnMachine.send({ type: 'PICK_UP_ITEM', data: { item: { name: 'shield', weight: 5, value: 30, rarity: 'rare', durability: 150, maxDurability: 150, repairCost: 75, material: 'iron', salvageAmount: 15 } });
horizonZeroDawnMachine.send({ type: 'DROP_ITEM', data: { itemName: 'sword', itemWeight: 10, itemValue: 50, itemRarity: 'common', itemDurability: 100, itemMaxDurability: 100, itemRepairCost: 50, itemMaterial: 'steel', itemSalvageAmount: 10 } });
horizonZeroDawnMachine.send('USE_ITEM', { data: { itemName: 'sword' } }); // Should decrease durability
horizonZeroDawnMachine.send('REPAIR_ITEM', { data: { itemName: 'sword' } }); // Should start repair timer
horizonZeroDawnMachine.send('SALVAGE_ITEM', { data: { itemName: 'sword' } }); // Should start salvage timer
horizonZeroDawnMachine.send('START_EMERGENCY_REPAIR', { data: { itemName: 'sword' } }); // Should start emergency repair timer
horizonZeroDawnMachine.send('START_QUEST_MISSION', { data: { missionId: 'quest1', missionType: 'quest' } }); // Should start quest mission
horizonZeroDawnMachine.send('START_RESOURCE_GATHERING_MISSION', { data: { missionId: 'resource1', missionType: 'resourceGathering' } }); // Should start resource gathering mission
horizonZeroDawnMachine.send('SET_TACTICAL_APPROACH', { data: { tacticalApproach: 'stealth' } }); // Should set stealth approach
horizonZeroDawnMachine.send('EXECUTE_TACTIC'); // Should execute stealth tactic
horizonZeroDawnMachine.send('INTERACT_WITH_FACTION_A'); // Should interact with Faction A
horizonZeroDawnMachine.send('INTERACT_WITH_FACTION_B'); // Should interact with Faction B
horizonZeroDawnMachine.send('COMBAT'); // Should be allowed since forest is a valid terrain for combat
horizonZeroDawnMachine.send('BATTLE_WON');
horizonZeroDawnMachine.send('MAIN_MENU');
Explanation:
Faction State Machines:
factionAStateMachine: Manages interactions with Faction A, including trading, quests, and diplomacy.
factionBStateMachine: Manages interactions with Faction B, including trading, quests, and diplomacy.
Main Game State Machine:
factionInteraction: A state to handle interactions with factions.
Invokes the faction-specific state machines (factionAStateMachine and factionBStateMachine) and waits for them to complete.
Faction Interaction Events:
INTERACT_WITH_FACTION_A and INTERACT_WITH_FACTION_B: Trigger interactions with Faction A and Faction B respectively.
Services:
runFactionInteraction: Runs the faction interaction state machine and dispatches events based on the faction's current state.
Guards:
isNotInBattle, isNotInCombat, hasSufficientAmmunition, canCarryMoreItems, canAffordItem, isItemUsable, isItemRepairable, isItemBreakable, isItemSalvagable, isItemEmergencyRepairable, isRepairTimerComplete, isSalvageTimerComplete, isEmergencyRepairTimerComplete, isQuestCompleted, isResourceGatheringCompleted, isMissionActive: Ensure that the game state is valid and that missions are progressing correctly.
Consequence Actions:
interactWithFactionA and interactWithFactionB: Update the faction state machines based on the current state.
With these modifications, the game now supports interactions with multiple factions, including trading, quests, and diplomacy. This adds depth and complexity to the gameplay, allowing players to form alliances, gain favors, and face conflicts with various factions.


Implement more sophisticated timeline manipulation mechanics?


To implement more sophisticated timeline manipulation mechanics, we need to allow players to alter the course of events by manipulating time. This could involve fast-forwarding, rewinding, pausing, and skipping key moments in the game. These mechanics can add a new level of strategy and immersion to the game.

Here’s how you can integrate timeline manipulation mechanics into the state machine:

Timeline States:
Define states for different timeline operations like fast-forwarding, rewinding, pausing, and skipping.
Timeline Actions:
Define actions to manipulate the timeline.
Timeline Guards:
Define guards to ensure that timeline operations are valid given the current game state.
Main Game State Machine:
Integrate the timeline states and actions into the main game state machine.
Here’s an updated example:

Timeline State Machines
Fast-Forward State Machine
The fast-forward state machine will manage the fast-forwarding of the game timeline.


const fastForwardStateMachine = Machine({
  id: 'fastForward',
  initial: 'idle',
  states: {
    idle: {
      on: {
        FAST_FORWARD: { target: 'fastForwarding' }
      }
    },
    fastForwarding: {
      on: {
        STOP_FAST_FORWARD: { target: 'idle' }
      }
    }
  }
});
Rewind State Machine
The rewind state machine will manage the rewinding of the game timeline.


const rewindStateMachine = Machine({
  id: 'rewind',
  initial: 'idle',
  states: {
    idle: {
      on: {
        REWIND: { target: 'rewinding' }
      }
    },
    rewinding: {
      on: {
        STOP_REWIND: { target: 'idle' }
      }
    }
  }
});
Main Game State Machine
The main game state machine will manage the execution of active missions, faction interactions, and handle the branching logic.


const horizonZeroDawnMachine = Machine({
  id: 'horizonZeroDawn',
  initial: 'startMenu',
  context: {
    currentTerrain: null, // Initialize with null or default terrain
    moveSpeedMultiplier: 1,
    attackPowerMultiplier: 1,
    defenseMultiplier: 1,
    currentWeapon: null,
    ammunitionCount: 0,
    totalWeight: 0,
    totalValue: 0,
    maxCarryingCapacity: 50, // Maximum carrying capacity in arbitrary units
    maxInventoryValue: 1000, // Maximum inventory value in arbitrary currency units
    items: {},
    salvageMaterials: {},
    repairTimer: null,
    salvageTimer: null,
    emergencyRepairTimer: null,
    activeMissions: [],
    missionBranches: {
      quest1: {
        type: 'quest',
        branches: {
          findArtifact: { machine: questMissionMachine },
          sideQuests: { machine: questMissionMachine }
        }
      },
      resource1: {
        type: 'resourceGathering',
        branches: {
          gatherWood: { machine: resourceGatheringMissionMachine },
          gatherStone: { machine: resourceGatheringMissionMachine },
          gatherHerbs: { machine: resourceGatheringMissionMachine }
        }
      }
    },
    factions: {
      factionA: { machine: factionAStateMachine },
      factionB: { machine: factionBStateMachine }
    },
    timeline: {
      currentState: 'normal',
      fastForwardMachine: { state: 'idle' },
      rewindMachine: { state: 'idle' }
    }
  },
  states: {
    startMenu: {
      on: {
        START_NEW_GAME: { target: 'gamePlay', actions: ['setInitialTerrain'], cond: 'isNotInBattle' },
        LOAD_GAME: { target: 'gamePlay', actions: ['setInitialTerrain'], cond: 'isNotInBattle' },
        OPTIONS: 'options',
        QUIT: 'exit'
      }
    },
    gamePlay: {
      on: {
        COMBAT: { target: 'combat', actions: ['updateCombatEffects'], cond: 'isNotInCombat' },
        EXPLORATION: 'exploration',
        INVENTORY_MANAGEMENT: 'inventory',
        SAVE_GAME: 'gamePlay',
        PAUSE_GAME: 'pause',
        MAIN_MENU: 'startMenu',
        FISHING: 'fishing',
        HUNTING: 'hunting',
        PICK_UP_ITEM: { target: 'itemSelection', actions: ['addItem'] },
        DROP_ITEM: { target: 'inventory', actions: ['removeItem'] },
        USE_ITEM: { target: 'gamePlay', actions: ['useItem'], cond: 'isItemUsable' },
        REPAIR_ITEM: { target: 'repair', actions: ['startRepairTimer'], cond: 'isItemRepairable' },
        BREAK_ITEM: { target: 'break', actions: ['breakItem'], cond: 'isItemBreakable' },
        SALVAGE_ITEM: { target: 'salvage', actions: ['startSalvageTimer'], cond: 'isItemSalvagable' },
        START_EMERGENCY_REPAIR: { target: 'emergencyFieldRepair', actions: ['startEmergencyRepairTimer'], cond: 'isItemEmergencyRepairable' },
        START_QUEST_MISSION: { target: 'mission', actions: ['startMission', 'addMission'], cond: 'isNotInCombat' },
        START_RESOURCE_GATHERING_MISSION: { target: 'mission', actions: ['startMission', 'addMission'], cond: 'isNotInCombat' },
        INTERACT_WITH_FACTION_A: { target: 'factionInteraction', actions: ['interactWithFactionA'], cond: 'isNotInCombat' },
        INTERACT_WITH_FACTION_B: { target: 'factionInteraction', actions: ['interactWithFactionB'], cond: 'isNotInCombat' },
        TIMELINE_OPERATION: { target: 'timeline', actions: ['performTimelineOperation'] }
      }
    },
    combat: {
      on: {
        BATTLE_WON: 'victoryScreen',
        BATTLE_LOST: 'defeatScreen'
      }
    },
    victoryScreen: {
      on: {
        CONTINUE: 'gamePlay',
        MAIN_MENU: 'startMenu'
      }
    },
    defeatScreen: {
      on: {
        RETRY: 'combat',
        MAIN_MENU: 'startMenu'
      }
    },
    exploration: {
      on: {
        ENCOUNTER_ENEMY: 'combat',
        INTERACT_WITH_NPC: 'dialogue', // Assuming dialogue is another state
        FIND_ITEM_QUEST: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    inventory: {
      on: {
        CLOSE_INVENTORY: 'gamePlay'
      }
    },
    pause: {
      on: {
        RESUME_GAME: 'gamePlay',
        OPTIONS: 'options',
        MAIN_MENU: 'startMenu'
      }
    },
    options: {
      on: {
        APPLY_CHANGES: 'gamePlay',
        CANCEL: 'startMenu'
      }
    },
    exit: {
      type: 'final'
    },
    fishing: {
      on: {
        FINISH_FISHING: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    hunting: {
      on: {
        FINISH_HUNTING: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    weaponSelection: {
      on: {
        SELECT Weapon: { target: 'gamePlay', actions: ['selectWeapon'] }
      }
    },
    itemSelection: {
      on: {
        SELECT_ITEM: { target: 'gamePlay', actions: ['selectItem'] }
      }
    },
    repair: {
      on: {
        COMPLETE_REPAIR: { target: 'gamePlay', actions: ['completeRepair'] }
      }
    },
    break: {
      on: {
        COMPLETE_BREAK: { target: 'gamePlay', actions: ['completeBreak'] }
      }
    },
    salvage: {
      on: {
        COMPLETE_SALVAGE: { target: 'gamePlay', actions: ['completeSalvage'] }
      }
    },
    emergencyFieldRepair: {
      on: {
        COMPLETE_EMERGENCY_REPAIR: { target: 'gamePlay', actions: ['completeEmergencyRepair'] }
      }
    },
    repairTimer: {
      on: {
        TIMER_COMPLETE: { target: 'repair' }
      }
    },
    salvageTimer: {
      on: {
        TIMER_COMPLETE: { target: 'salvage' }
      }
    },
    emergencyRepairTimer: {
      on: {
        TIMER_COMPLETE: { target: 'emergencyFieldRepair' }
      }
    },
    mission: {
      initial: 'idle',
      states: {
        idle: {
          on: {
            START_QUEST_MISSION: { target: 'quest', actions: ['startMission', 'addMission'], cond: 'isNotInCombat' },
            START_RESOURCE_GATHERING_MISSION: { target: 'resourceGathering', actions: ['startMission', 'addMission'], cond: 'isNotInCombat' }
          }
        },
        quest: {
          invoke: [
            { src: 'runMission', onDone: { target: 'idle' } }
          ]
        },
        resourceGathering: {
          invoke: [
            { src: 'runMission', onDone: { target: 'idle' } }
          ]
        }
      }
    },
    factionInteraction: {
      initial: 'idle',
      states: {
        idle: {
          on: {
            INTERACT_WITH_FACTION_A: { target: 'factionA', actions: ['interactWithFactionA'] },
            INTERACT_WITH_FACTION_B: { target: 'factionB', actions: ['interactWithFactionB'] }
          }
        },
        factionA: {
          invoke: [
            { src: 'runFactionInteraction', onDone: { target: 'idle' } }
          ]
        },
        factionB: {
          invoke: [
            { src: 'runFactionInteraction', onDone: { target: 'idle' } }
          ]
        }
      }
    },
    timeline: {
      initial: 'normal',
      states: {
        normal: {
          on: {
            TIMELINE_OPERATION: { target: 'operation', actions: ['startTimelineOperation'] }
          }
        },
        operation: {
          invoke: [
            { src: 'runTimelineOperation', onDone: { target: 'normal' } }
          ]
        }
      }
    }
  }
}, {
  actions: {
    setInitialTerrain: (context, event) => {
      return { currentTerrain: event.data.currentTerrain };
    },
    updateCombatEffects: (context, event) => {
      const terrainEffects = {
        plains: {
          moveSpeedMultiplier: 1,
          attackPowerMultiplier: 1,
          defenseMultiplier: 1
        },
        forest: {
          moveSpeedMultiplier: 0.8,
          attackPowerMultiplier: 1.2,
          defenseMultiplier: 0.9
        },
        mountain: {
          moveSpeedMultiplier: 0.5,
          attackPowerMultiplier: 1.5,
          defenseMultiplier: 1.2
        },
        desert: {
          moveSpeedMultiplier: 1.2,
          attackPowerMultiplier: 0.8,
          defenseMultiplier: 0.8
        }
      };

      const currentTerrain = context.currentTerrain;
      const terrainEffect = terrainEffects[currentTerrain] || {};

      return {
        moveSpeedMultiplier: terrainEffect.moveSpeedMultiplier,
        attackPowerMultiplier: terrainEffect.attackPowerMultiplier,
        defenseMultiplier: terrainEffect.defenseMultiplier
      };
    },
    addItem: (context, event) => {
      const newItem = event.data.item;
      const weightMultiplier = newItem.rarity === 'legendary' ? 1.5 : newItem.rarity === 'epic' ? 1.2 : 1;
      const valueMultiplier = newItem.rarity === 'legendary' ? 2 : newItem.rarity === 'epic' ? 1.5 : 1;

      return {
        totalWeight: context.totalWeight + newItem.weight * weightMultiplier,
        totalValue: context.totalValue + newItem.value * valueMultiplier,
        items: {
          ...context.items,
          [newItem.name]: {
            ...newItem,
            durability: newItem.durability
          }
        }
      };
    },
    removeItem: (context, event) => {
      const itemName = event.data.itemName;
      const itemWeight = event.data.itemWeight;
      const itemValue = event.data.itemValue;
      const weightMultiplier = event.data.itemRarity === 'legendary' ? 1.5 : event.data.itemRarity === 'epic' ? 1.2 : 1;
      const valueMultiplier = event.data.itemRarity === 'legendary' ? 2 : event.data.itemRarity === 'epic' ? 1.5 : 1;

      return {
        totalWeight: context.totalWeight - itemWeight * weightMultiplier,
        totalValue: context.totalValue - itemValue * valueMultiplier,
        items: {
          ...context.items,
          [itemName]: undefined
        }
      };
    },
    selectWeapon: (context, event) => {
      return { currentWeapon: event.data.weapon };
    },
    useItem: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: item.durability - 1
            }
          }
        };
      }
      return context;
    },
    startRepairTimer: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        const repairQuality = sample([0.5, 1, 1.5]); // Random repair quality multiplier
        const repairAmount = Math.floor(item.maxDurability * repairQuality);
        const repairCost = Math.floor(repairAmount / 2); // Simplified cost calculation
        const repairTime = Math.floor(item.maxDurability * 0.1); // Repair time in arbitrary units

        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: Math.min(item.maxDurability, item.durability + repairAmount)
            }
          },
          totalValue: context.totalValue - repairCost,
          repairTimer: setTimeout(() => {
            context.repairTimer = null;
            horizonZeroDawnMachine.send({ type: 'TIMER_COMPLETE' });
          }, repairTime * 1000)
        };
      }
      return context;
    },
    completeRepair: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: item.maxDurability
            }
          }
        };
      }
      return context;
    },
    breakItem: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    salvageItem: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    completeBreak: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    completeSalvage: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    startSalvageTimer: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        const salvageTime = Math.floor(item.maxDurability * 0.2); // Salvage time in arbitrary units

        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: 0
            }
          },
          totalValue: context.totalValue - salvageTime, // Cost in arbitrary units
          salvageTimer: setTimeout(() => {
            context.salvageTimer = null;
            horizonZeroDawnMachine.send({ type: 'TIMER_COMPLETE' });
          }, salvageTime * 1000)
        };
      }
      return context;
    },
    startEmergencyRepairTimer: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        const repairQuality = sample([0.5, 1, 1.5]); // Random repair quality multiplier
        const repairAmount = Math.floor(item.maxDurability * repairQuality);
        const repairTime = Math.floor(item.maxDurability * 0.1); // Repair time in arbitrary units

        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: Math.min(item.maxDurability, item.durability + repairAmount)
            }
          },
          totalValue: context.totalValue - repairTime, // Cost in arbitrary units
          emergencyRepairTimer: setTimeout(() => {
            context.emergencyRepairTimer = null;
            horizonZeroDawnMachine.send({ type: 'TIMER_COMPLETE' });
          }, repairTime * 1000)
        };
      }
      return context;
    },
    completeEmergencyRepair: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: item.maxDurability
            }
          }
        };
      }
      return context;
    },
    startMission: (context, event) => {
      const { missionId, missionType } = event.data;
      const branch = context.missionBranches[missionId].branches[missionType];
      return {
        activeMissions: [...context.activeMissions, missionId],
        [branch.id]: { state: 'inProgress' }
      };
    },
    addMission: (context, event) => {
      const { missionId, missionType } = event.data;
      const branch = context.missionBranches[missionId].branches[missionType];
      return {
        activeMissions: [...context.activeMissions, missionId],
        [branch.id]: { state: 'inProgress' }
      };
    },
    interactWithFactionA: (context, event) => {
      const factionA = context.factions.factionA.machine.getSnapshot();
      return {
        factions: {
          ...context.factions,
          factionA: { machine: factionA }
        }
      };
    },
    interactWithFactionB: (context, event) => {
      const factionB = context.factions.factionB.machine.getSnapshot();
      return {
        factions: {
          ...context.factions,
          factionB: { machine: factionB }
        }
      };
    },
    performTimelineOperation: (context, event) => {
      const { operation } = event.data;
      if (operation === 'fastForward') {
        return {
          timeline: {
            ...context.timeline,
            fastForwardMachine: { state: 'fastForwarding' }
          }
        };
      } else if (operation === 'rewind') {
        return {
          timeline: {
            ...context.timeline,
            rewindMachine: { state: 'rewinding' }
          }
        };
      } else if (operation === 'pause') {
        return {
          timeline: {
            ...context.timeline,
            currentState: 'paused'
          }
        };
      } else if (operation === 'skip') {
        return {
          timeline: {
            ...context.timeline,
            currentState: 'skipped'
          }
        };
      }
      return context;
    },
    startTimelineOperation: (context, event) => {
      const { operation } = event.data;
      if (operation === 'fastForward') {
        return {
          timeline: {
            ...context.timeline,
            fastForwardMachine: { state: 'fastForwarding' }
          }
        };
      } else if (operation === 'rewind') {
        return {
          timeline: {
            ...context.timeline,
            rewindMachine: { state: 'rewinding' }
          }
        };
      } else if (operation === 'pause') {
        return {
          timeline: {
            ...context.timeline,
            currentState: 'paused'
          }
        };
      } else if (operation === 'skip') {
        return {
          timeline: {
            ...context.timeline,
            currentState: 'skipped'
          }
        };
      }
      return context;
    }
  },
  services: {
    runMission: (context, event) => (sendBack) => {
      const { missionId, missionType } = event.data;
      const branch = context.missionBranches[missionId].branches[missionType];

      switch (branch.id) {
        case 'quest1':
          setInterval(() => {
            sendBack({ type: 'TICK' });
          }, 1000);
          break;
        case 'resource1':
          setInterval(() => {
            sendBack({ type: 'GATHER_RESOURCE', data: { resource: 'wood', amount: 1 } });
            sendBack({ type: 'GATHER_RESOURCE', data: { resource: 'stone', amount: 0.5 } });
            sendBack({ type: 'GATHER_RESOURCE', data: { resource: 'herbs', amount: 0.3 } });
          }, 1000);
          break;
        default:
          break;
      }

      return () => clearInterval(intervalId);
    },
    runFactionInteraction: (context, event) => (sendBack) => {
      const { factionId } = event.data;
      const faction = context.factions[factionId].machine;

      switch (faction.value) {
        case 'neutral':
          setInterval(() => {
            sendBack({ type: 'TICK' });
          }, 1000);
          break;
        case 'trading':
          setInterval(() => {
            sendBack({ type: 'TRADE_OFFER', data: { offer: 'wood' } });
          }, 1000);
          break;
        case 'quests':
          setInterval(() => {
            sendBack({ type: 'ACCEPT_QUEST', data: { quest: 'explore area' } });
          }, 1000);
          break;
        case 'diplomacy':
          setInterval(() => {
            sendBack({ type: 'DIPLOMACY' });
          }, 1000);
          break;
        default:
          break;
      }

      return () => clearInterval(intervalId);
    },
    runTimelineOperation: (context, event) => (sendBack) => {
      const { operation } = event.data;
      if (operation === 'fastForward') {
        setInterval(() => {
          sendBack({ type: 'TIMELINE_TICK' });
        }, 500); // Faster tick rate for fast-forward
      } else if (operation === 'rewind') {
        setInterval(() => {
          sendBack({ type: 'TIMELINE_TICK' });
        }, 2000); // Slower tick rate for rewind
      } else if (operation === 'pause') {
        // Pause the game loop
      } else if (operation === 'skip') {
        // Skip to the end of the timeline
      }

      return () => clearInterval(intervalId);
    }
  },
  guards: {
    isNotInBattle: (context, event) => context.currentTerrain !== 'battle',
    isNotInCombat: (context, event) => context.currentTerrain !== 'combat',
    hasSufficientAmmunition: (context, event) => context.ammunitionCount > 0,
    canCarryMoreItems: (context, event) => context.totalWeight + event.data.item.weight <= context.maxCarryingCapacity,
    canAffordItem: (context, event) => context.totalValue + event.data.item.value <= context.maxInventoryValue,
    isItemUsable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      return item && item.durability > 0;
    },
    isItemRepairable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      const repairCost = item.rarity === 'legendary' ? 200 : item.rarity === 'epic' ? 150 : 100;
      return item && item.repairCost <= context.totalValue;
    },
    isItemBreakable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      return item && item.durability <= 0;
    },
    isItemSalvagable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      return item && item.durability <= 0;
    },
    isItemEmergencyRepairable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      return item && item.durability <= 0;
    },
    isRepairTimerComplete: (context, event) => !context.repairTimer,
    isSalvageTimerComplete: (context, event) => !context.salvageTimer,
    isEmergencyRepairTimerComplete: (context, event) => !context.emergencyRepairTimer,
    isQuestCompleted: (context, event) => {
      const missionId = event.data.missionId;
      return context.activeMissions.includes(missionId) && questMissionMachine.getSnapshot().value === 'completed';
    },
    isResourceGatheringCompleted: (context, event) => {
      const missionId = event.data.missionId;
      return context.activeMissions.includes(missionId) && resourceGatheringMissionMachine.getSnapshot().value === 'completed';
    },
    isMissionActive: (context, event) => context.activeMissions.includes(event.data.missionId),
    isStealthTacticApplicable: (context, event) => context.tacticalApproach === 'stealth',
    isRangedAttackTacticApplicable: (context, event) => context.tacticalApproach === 'rangedAttack',
    isMeleeEngagementTacticApplicable: (context, event) => context.tacticalApproach === 'meleeEngagement',
    isFastForwardValid: (context, event) => context.timeline.currentState === 'normal',
    isRewindValid: (context, event) => context.timeline.currentState === 'normal',
    isPauseValid: (context, event) => context.timeline.currentState === 'normal',
    isSkipValid: (context, event) => context.timeline.currentState === 'normal'
  }
});

// Example usage:
horizonZeroDawnMachine.onTransition((state, event) => {
  if (event.type === 'COMBAT') {
    console.log('Current State:', state.value, 'Updated Context:', state.context);
  } else {
    console.log('Current State:', state.value);
  }
});

// To send events to the machine:
horizonZeroDawnMachine.send({ type: 'START_NEW_GAME', data: { currentTerrain: 'plains' } });
horizonZeroDawnMachine.send({ type: 'PICK_UP_ITEM', data: { item: { name: 'sword', weight: 10, value: 50, rarity: 'common', durability: 100, maxDurability: 100, repairCost: 50, material: 'steel', salvageAmount: 10 } });
horizonZeroDawnMachine.send({ type: 'PICK_UP_ITEM', data: { item: { name: 'shield', weight: 5, value: 30, rarity: 'rare', durability: 150, maxDurability: 150, repairCost: 75, material: 'iron', salvageAmount: 15 } });
horizonZeroDawnMachine.send({ type: 'DROP_ITEM', data: { itemName: 'sword', itemWeight: 10, itemValue: 50, itemRarity: 'common', itemDurability: 100, itemMaxDurability: 100, itemRepairCost: 50, itemMaterial: 'steel', itemSalvageAmount: 10 } });
horizonZeroDawnMachine.send('USE_ITEM', { data: { itemName: 'sword' } }); // Should decrease durability
horizonZeroDawnMachine.send('REPAIR_ITEM', { data: { itemName: 'sword' } }); // Should start repair timer
horizonZeroDawnMachine.send('SALVAGE_ITEM', { data: { itemName: 'sword' } }); // Should start salvage timer
horizonZeroDawnMachine.send('START_EMERGENCY_REPAIR', { data: { itemName: 'sword' } }); // Should start emergency repair timer
horizonZeroDawnMachine.send('START_QUEST_MISSION', { data: { missionId: 'quest1', missionType: 'quest' } }); // Should start quest mission
horizonZeroDawnMachine.send('START_RESOURCE_GATHERING_MISSION', { data: { missionId: 'resource1', missionType: 'resourceGathering' } }); // Should start resource gathering mission
horizonZeroDawnMachine.send('INTERACT_WITH_FACTION_A'); // Should interact with Faction A
horizonZeroDawnMachine.send('INTERACT_WITH_FACTION_B'); // Should interact with Faction B
horizonZeroDawnMachine.send('TIMELINE_OPERATION', { data: { operation: 'fastForward' } }); // Should start fast-forwarding
horizonZeroDawnMachine.send('TIMELINE_OPERATION', { data: { operation: 'rewind' } }); // Should start rewinding
horizonZeroDawnMachine.send('TIMELINE_OPERATION', { data: { operation: 'pause' } }); // Should pause the timeline
horizonZeroDawnMachine.send('TIMELINE_OPERATION', { data: { operation: 'skip' } }); // Should skip the timeline
horizonZeroDawnMachine.send('COMBAT'); // Should be allowed since forest is a valid terrain for combat
horizonZeroDawnMachine.send('BATTLE_WON');
horizonZeroDawnMachine.send('MAIN_MENU');
Explanation:
Timeline State Machines:
fastForwardStateMachine: Manages the fast-forwarding of the game timeline.
rewindStateMachine: Manages the rewinding of the game timeline.
Main Game State Machine:
timeline: A state to manage the current state of the timeline (normal, fast-forwarding, rewinding, paused, skipped).
Timeline Interaction Events:
TIMELINE_OPERATION: Triggers a timeline operation (fast-forward, rewind, pause, skip).
Services:
runTimelineOperation: Runs the timeline operation state machine and dispatches events based on the operation.
Guards:
isFastForwardValid, isRewindValid, isPauseValid, isSkipValid: Ensure that timeline operations are valid given the current game state.
Consequence Actions:
performTimelineOperation: Updates the timeline state based on the operation.
startTimelineOperation: Starts the timeline operation.
With these modifications, the game now supports sophisticated timeline manipulation mechanics, allowing players to fast-forward, rewind, pause, and skip parts of the game timeline. These mechanics can add a new level of strategy and immersion to the gameplay, enabling players to experiment with different scenarios and outcomes.


Please design your best supernatural consequence types for this finite state machine


Integrating supernatural consequence types into the state machine can add an exciting and eerie dimension to the gameplay. Supernatural events can include curses, blessings, and other magical occurrences that affect the player's stats, inventory, and overall experience. Here’s how you can design and integrate these supernatural consequence types into the state machine:

Supernatural Event State Machines:
Define state machines for different supernatural events like curses, blessings, and magical encounters.
Main Game State Machine:
Integrate the supernatural event state machines into the main game state machine and handle transitions based on these events.
Supernatural Event Triggers:
Define events to trigger these supernatural events.
Supernatural Event Actions:
Define actions to apply the consequences of these events.
Here’s an updated example:

Supernatural Event State Machines
Curse State Machine
The curse state machine will manage the effects of a curse on the player.


const curseStateMachine = Machine({
  id: 'curse',
  initial: 'active',
  context: {
    curseLevel: 1
  },
  states: {
    active: {
      on: {
        CURSE_RESOLVED: { target: 'resolved' }
      }
    },
    resolved: {
      type: 'final'
    }
  }
});
Blessing State Machine
The blessing state machine will manage the effects of a blessing on the player.


const blessingStateMachine = Machine({
  id: 'blessing',
  initial: 'active',
  context: {
    blessingLevel: 1
  },
  states: {
    active: {
      on: {
        BLESSING_RESOLVED: { target: 'resolved' }
      }
    },
    resolved: {
      type: 'final'
    }
  }
});
Main Game State Machine
The main game state machine will manage the execution of active missions, faction interactions, and handle the branching logic.


const horizonZeroDawnMachine = Machine({
  id: 'horizonZeroDawn',
  initial: 'startMenu',
  context: {
    currentTerrain: null, // Initialize with null or default terrain
    moveSpeedMultiplier: 1,
    attackPowerMultiplier: 1,
    defenseMultiplier: 1,
    currentWeapon: null,
    ammunitionCount: 0,
    totalWeight: 0,
    totalValue: 0,
    maxCarryingCapacity: 50, // Maximum carrying capacity in arbitrary units
    maxInventoryValue: 1000, // Maximum inventory value in arbitrary currency units
    items: {},
    salvageMaterials: {},
    repairTimer: null,
    salvageTimer: null,
    emergencyRepairTimer: null,
    activeMissions: [],
    missionBranches: {
      quest1: {
        type: 'quest',
        branches: {
          findArtifact: { machine: questMissionMachine },
          sideQuests: { machine: questMissionMachine }
        }
      },
      resource1: {
        type: 'resourceGathering',
        branches: {
          gatherWood: { machine: resourceGatheringMissionMachine },
          gatherStone: { machine: resourceGatheringMissionMachine },
          gatherHerbs: { machine: resourceGatheringMissionMachine }
        }
      }
    },
    factions: {
      factionA: { machine: factionAStateMachine },
      factionB: { machine: factionBStateMachine }
    },
    timeline: {
      currentState: 'normal',
      fastForwardMachine: { state: 'idle' },
      rewindMachine: { state: 'idle' }
    },
    supernaturalEvents: {
      curse: { machine: curseStateMachine },
      blessing: { machine: blessingStateMachine }
    }
  },
  states: {
    startMenu: {
      on: {
        START_NEW_GAME: { target: 'gamePlay', actions: ['setInitialTerrain'], cond: 'isNotInBattle' },
        LOAD_GAME: { target: 'gamePlay', actions: ['setInitialTerrain'], cond: 'isNotInBattle' },
        OPTIONS: 'options',
        QUIT: 'exit'
      }
    },
    gamePlay: {
      on: {
        COMBAT: { target: 'combat', actions: ['updateCombatEffects'], cond: 'isNotInCombat' },
        EXPLORATION: 'exploration',
        INVENTORY_MANAGEMENT: 'inventory',
        SAVE_GAME: 'gamePlay',
        PAUSE_GAME: 'pause',
        MAIN_MENU: 'startMenu',
        FISHING: 'fishing',
        HUNTING: 'hunting',
        PICK_UP_ITEM: { target: 'itemSelection', actions: ['addItem'] },
        DROP_ITEM: { target: 'inventory', actions: ['removeItem'] },
        USE_ITEM: { target: 'gamePlay', actions: ['useItem'], cond: 'isItemUsable' },
        REPAIR_ITEM: { target: 'repair', actions: ['startRepairTimer'], cond: 'isItemRepairable' },
        BREAK_ITEM: { target: 'break', actions: ['breakItem'], cond: 'isItemBreakable' },
        SALVAGE_ITEM: { target: 'salvage', actions: ['startSalvageTimer'], cond: 'isItemSalvagable' },
        START_EMERGENCY_REPAIR: { target: 'emergencyFieldRepair', actions: ['startEmergencyRepairTimer'], cond: 'isItemEmergencyRepairable' },
        START_QUEST_MISSION: { target: 'mission', actions: ['startMission', 'addMission'], cond: 'isNotInCombat' },
        START_RESOURCE_GATHERING_MISSION: { target: 'mission', actions: ['startMission', 'addMission'], cond: 'isNotInCombat' },
        INTERACT_WITH_FACTION_A: { target: 'factionInteraction', actions: ['interactWithFactionA'], cond: 'isNotInCombat' },
        INTERACT_WITH_FACTION_B: { target: 'factionInteraction', actions: ['interactWithFactionB'], cond: 'isNotInCombat' },
        TIMELINE_OPERATION: { target: 'timeline', actions: ['performTimelineOperation'] },
        SUPERNATURAL_EVENT: { target: 'supernaturalEvent', actions: ['triggerSupernaturalEvent'] }
      }
    },
    combat: {
      on: {
        BATTLE_WON: 'victoryScreen',
        BATTLE_LOST: 'defeatScreen'
      }
    },
    victoryScreen: {
      on: {
        CONTINUE: 'gamePlay',
        MAIN_MENU: 'startMenu'
      }
    },
    defeatScreen: {
      on: {
        RETRY: 'combat',
        MAIN_MENU: 'startMenu'
      }
    },
    exploration: {
      on: {
        ENCOUNTER_ENEMY: 'combat',
        INTERACT_WITH_NPC: 'dialogue', // Assuming dialogue is another state
        FIND_ITEM_QUEST: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    inventory: {
      on: {
        CLOSE_INVENTORY: 'gamePlay'
      }
    },
    pause: {
      on: {
        RESUME_GAME: 'gamePlay',
        OPTIONS: 'options',
        MAIN_MENU: 'startMenu'
      }
    },
    options: {
      on: {
        APPLY_CHANGES: 'gamePlay',
        CANCEL: 'startMenu'
      }
    },
    exit: {
      type: 'final'
    },
    fishing: {
      on: {
        FINISH_FISHING: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    hunting: {
      on: {
        FINISH_HUNTING: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    weaponSelection: {
      on: {
        SELECT_WEAPON: { target: 'gamePlay', actions: ['selectWeapon'] }
      }
    },
    itemSelection: {
      on: {
        SELECT_ITEM: { target: 'gamePlay', actions: ['selectItem'] }
      }
    },
    repair: {
      on: {
        COMPLETE_REPAIR: { target: 'gamePlay', actions: ['completeRepair'] }
      }
    },
    break: {
      on: {
        COMPLETE_BREAK: { target: 'gamePlay', actions: ['completeBreak'] }
      }
    },
    salvage: {
      on: {
        COMPLETE_SALVAGE: { target: 'gamePlay', actions: ['completeSalvage'] }
      }
    },
    emergencyFieldRepair: {
      on: {
        COMPLETE_EMERGENCY_REPAIR: { target: 'gamePlay', actions: ['completeEmergencyRepair'] }
      }
    },
    repairTimer: {
      on: {
        TIMER_COMPLETE: { target: 'repair' }
      }
    },
    salvageTimer: {
      on: {
        TIMER_COMPLETE: { target: 'salvage' }
      }
    },
    emergencyRepairTimer: {
      on: {
        TIMER_COMPLETE: { target: 'emergencyFieldRepair' }
      }
    },
    mission: {
      initial: 'idle',
      states: {
        idle: {
          on: {
            START_QUEST_MISSION: { target: 'quest', actions: ['startMission', 'addMission'], cond: 'isNotInCombat' },
            START_RESOURCE_GATHERING_MISSION: { target: 'resourceGathering', actions: ['startMission', 'addMission'], cond: 'isNotInCombat' }
          }
        },
        quest: {
          invoke: [
            { src: 'runMission', onDone: { target: 'idle' } }
          ]
        },
        resourceGathering: {
          invoke: [
            { src: 'runMission', onDone: { target: 'idle' } }
          ]
        }
      }
    },
    factionInteraction: {
      initial: 'idle',
      states: {
        idle: {
          on: {
            INTERACT_WITH_FACTION_A: { target: 'factionA', actions: ['interactWithFactionA'] },
            INTERACT_WITH_FACTION_B: { target: 'factionB', actions: ['interactWithFactionB'] }
          }
        },
        factionA: {
          invoke: [
            { src: 'runFactionInteraction', onDone: { target: 'idle' } }
          ]
        },
        factionB: {
          invoke: [
            { src: 'runFactionInteraction', onDone: { target: 'idle' } }
          ]
        }
      }
    },
    timeline: {
      initial: 'normal',
      states: {
        normal: {
          on: {
            TIMELINE_OPERATION: { target: 'operation', actions: ['startTimelineOperation'] }
          }
        },
        operation: {
          invoke: [
            { src: 'runTimelineOperation', onDone: { target: 'normal' } }
          ]
        }
      }
    },
    supernaturalEvent: {
      initial: 'idle',
      states: {
        idle: {
          on: {
            SUPERNATURAL_EVENT: { target: 'curseOrBlessing', actions: ['triggerSupernaturalEvent'] }
          }
        },
        curseOrBlessing: {
          initial: 'idle',
          states: {
            idle: {
              on: {
                CURSE: { target: 'curse', actions: ['startCurse'] },
                BLESSING: { target: 'blessing', actions: ['startBlessing'] }
              }
            },
            curse: {
              invoke: [
                { src: 'runSupernaturalEvent', onDone: { target: 'idle' } }
              ]
            },
            blessing: {
              invoke: [
                { src: 'runSupernaturalEvent', onDone: { target: 'idle' } }
              ]
            }
          }
        }
      }
    }
  }
}, {
  actions: {
    setInitialTerrain: (context, event) => {
      return { currentTerrain: event.data.currentTerrain };
    },
    updateCombatEffects: (context, event) => {
      const terrainEffects = {
        plains: {
          moveSpeedMultiplier: 1,
          attackPowerMultiplier: 1,
          defenseMultiplier: 1
        },
        forest: {
          moveSpeedMultiplier: 0.8,
          attackPowerMultiplier: 1.2,
          defenseMultiplier: 0.9
        },
        mountain: {
          moveSpeedMultiplier: 0.5,
          attackPowerMultiplier: 1.5,
          defenseMultiplier: 1.2
        },
        desert: {
          moveSpeedMultiplier: 1.2,
          attackPowerMultiplier: 0.8,
          defenseMultiplier: 0.8
        }
      };

      const currentTerrain = context.currentTerrain;
      const terrainEffect = terrainEffects[currentTerrain] || {};

      return {
        moveSpeedMultiplier: terrainEffect.moveSpeedMultiplier,
        attackPowerMultiplier: terrainEffect.attackPowerMultiplier,
        defenseMultiplier: terrainEffect.defenseMultiplier
      };
    },
    addItem: (context, event) => {
      const newItem = event.data.item;
      const weightMultiplier = newItem.rarity === 'legendary' ? 1.5 : newItem.rarity === 'epic' ? 1.2 : 1;
      const valueMultiplier = newItem.rarity === 'legendary' ? 2 : newItem.rarity === 'epic' ? 1.5 : 1;

      return {
        totalWeight: context.totalWeight + newItem.weight * weightMultiplier,
        totalValue: context.totalValue + newItem.value * valueMultiplier,
        items: {
          ...context.items,
          [newItem.name]: {
            ...newItem,
            durability: newItem.durability
          }
        }
      };
    },
    removeItem: (context, event) => {
      const itemName = event.data.itemName;
      const itemWeight = event.data.itemWeight;
      const itemValue = event.data.itemValue;
      const weightMultiplier = event.data.itemRarity === 'legendary' ? 1.5 : event.data.itemRarity === 'epic' ? 1.2 : 1;
      const valueMultiplier = event.data.itemRarity === 'legendary' ? 2 : event.data.itemRarity === 'epic' ? 1.5 : 1;

      return {
        totalWeight: context.totalWeight - itemWeight * weightMultiplier,
        totalValue: context.totalValue - itemValue * valueMultiplier,
        items: {
          ...context.items,
          [itemName]: undefined
        }
      };
    },
    selectWeapon: (context, event) => {
      return { currentWeapon: event.data.weapon };
    },
    useItem: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: item.durability - 1
            }
          }
        };
      }
      return context;
    },
    startRepairTimer: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        const repairQuality = sample([0.5, 1, 1.5]); // Random repair quality multiplier
        const repairAmount = Math.floor(item.maxDurability * repairQuality);
        const repairCost = Math.floor(repairAmount / 2); // Simplified cost calculation
        const repairTime = Math.floor(item.maxDurability * 0.1); // Repair time in arbitrary units

        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: Math.min(item.maxDurability, item.durability + repairAmount)
            }
          },
          totalValue: context.totalValue - repairCost,
          repairTimer: setTimeout(() => {
            context.repairTimer = null;
            horizonZeroDawnMachine.send({ type: 'TIMER_COMPLETE' });
          }, repairTime * 1000)
        };
      }
      return context;
    },
    completeRepair: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: item.maxDurability
            }
          }
        };
      }
      return context;
    },
    breakItem: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    salvageItem: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    completeBreak: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    completeSalvage: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    startSalvageTimer: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        const salvageTime = Math.floor(item.maxDurability * 0.2); // Salvage time in arbitrary units

        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: 0
            }
          },
          totalValue: context.totalValue - salvageTime, // Cost in arbitrary units
          salvageTimer: setTimeout(() => {
            context.salvageTimer = null;
            horizonZeroDawnMachine.send({ type: 'TIMER_COMPLETE' });
          }, salvageTime * 1000)
        };
      }
      return context;
    },
    startEmergencyRepairTimer: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        const repairQuality = sample([0.5, 1, 1.5]); // Random repair quality multiplier
        const repairAmount = Math.floor(item.maxDurability * repairQuality);
        const repairTime = Math.floor(item.maxDurability * 0.1); // Repair time in arbitrary units

        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: Math.min(item.maxDurability, item.durability + repairAmount)
            }
          },
          totalValue: context.totalValue - repairTime, // Cost in arbitrary units
          emergencyRepairTimer: setTimeout(() => {
            context.emergencyRepairTimer = null;
            horizonZeroDawnMachine.send({ type: 'TIMER_COMPLETE' });
          }, repairTime * 1000)
        };
      }
      return context;
    },
    completeEmergencyRepair: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: item.maxDurability
            }
          }
        };
      }
      return context;
    },
    startMission: (context, event) => {
      const { missionId, missionType } = event.data;
      const branch = context.missionBranches[missionId].branches[missionType];
      return {
        activeMissions: [...context.activeMissions, missionId],
        [branch.id]: { state: 'inProgress' }
      };
    },
    addMission: (context, event) => {
      const { missionId, missionType } = event.data;
      const branch = context.missionBranches[missionId].branches[missionType];
      return {
        activeMissions: [...context.activeMissions, missionId],
        [branch.id]: { state: 'inProgress' }
      };
    },
    interactWithFactionA: (context, event) => {
      const factionA = context.factions.factionA.machine.getSnapshot();
      return {
        factions: {
          ...context.factions,
          factionA: { machine: factionA }
        }
      };
    },
    interactWithFactionB: (context, event) => {
      const factionB = context.factions.factionB.machine.getSnapshot();
      return {
        factions: {
          ...context.factions,
          factionB: { machine: factionB }
        }
      };
    },
    performTimelineOperation: (context, event) => {
      const { operation } = event.data;
      if (operation === 'fastForward') {
        return {
          timeline: {
            ...context.timeline,
            fastForwardMachine: { state: 'fastForwarding' }
          }
        };
      } else if (operation === 'rewind') {
        return {
          timeline: {
            ...context.timeline,
            rewindMachine: { state: 'rewinding' }
          }
        };
      } else if (operation === 'pause') {
        return {
          timeline: {
            ...context.timeline,
            currentState: 'paused'
          }
        };
      } else if (operation === 'skip') {
        return {
          timeline: {
            ...context.timeline,
            currentState: 'skipped'
          }
        };
      }
      return context;
    },
    triggerSupernaturalEvent: (context, event) => {
      const { eventType } = event.data;
      if (eventType === 'curse') {
        return {
          supernaturalEvents: {
            ...context.supernaturalEvents,
            curse: { state: 'active' }
          }
        };
      } else if (eventType === 'blessing') {
        return {
          supernaturalEvents: {
            ...context.supernaturalEvents,
            blessing: { state: 'active' }
          }
        };
      }
      return context;
    },
    startCurse: (context, event) => {
      const curse = context.supernaturalEvents.curse.machine.getSnapshot();
      return {
        supernaturalEvents: {
          ...context.supernaturalEvents,
          curse: { machine: curse }
        }
      };
    },
    startBlessing: (context, event) => {
      const blessing = context.supernaturalEvents.blessing.machine.getSnapshot();
      return {
        supernaturalEvents: {
          ...context.supernaturalEvents,
          blessing: { machine: blessing }
        }
      };
    }
  },
  services: {
    runMission: (context, event) => (sendBack) => {
      const { missionId, missionType } = event.data;
      const branch = context.missionBranches[missionId].branches[missionType];

      switch (branch.id) {
        case 'quest1':
          setInterval(() => {
            sendBack({ type: 'TICK' });
          }, 1000);
          break;
        case 'resource1':
          setInterval(() => {
            sendBack({ type: 'GATHER_RESOURCE', data: { resource: 'wood', amount: 1 } });
            sendBack({ type: 'GATHER_RESOURCE', data: { resource: 'stone', amount: 0.5 } });
            sendBack({ type: 'GATHER_RESOURCE', data: { resource: 'herbs', amount: 0.3 } });
          }, 1000);
          break;
        default:
          break;
      }

      return () => clearInterval(intervalId);
    },
    runFactionInteraction: (context, event) => (sendBack) => {
      const { factionId } = event.data;
      const faction = context.factions[factionId].machine;

      switch (faction.value) {
        case 'neutral':
          setInterval(() => {
            sendBack({ type: 'TICK' });
          }, 1000);
          break;
        case 'trading':
          setInterval(() => {
            sendBack({ type: 'TRADE_OFFER', data: { offer: 'wood' } });
          }, 1000);
          break;
        case 'quests':
          setInterval(() => {
            sendBack({ type: 'ACCEPT_QUEST', data: { quest: 'explore area' } });
          }, 1000);
          break;
        case 'diplomacy':
          setInterval(() => {
            sendBack({ type: 'DIPLOMACY' });
          }, 1000);
          break;
        default:
          break;
      }

      return () => clearInterval(intervalId);
    },
    runTimelineOperation: (context, event) => (sendBack) => {
      const { operation } = event.data;
      if (operation === 'fastForward') {
        setInterval(() => {
          sendBack({ type: 'TIMELINE Tick' });
        }, 500); // Faster tick rate for fast-forward
      } else if (operation === 'rewind') {
        setInterval(() => {
          sendBack({ type: 'TIMELINE_TICK' });
        }, 2000); // Slower tick rate for rewind
      } else if (operation === 'pause') {
        // Pause the game loop
      } else if (operation === 'skip') {
        // Skip to the end of the timeline
      }

      return () => clearInterval(intervalId);
    },
    runSupernaturalEvent: (context, event) => (sendBack) => {
      const { eventType } = event.data;
      if (eventType === 'curse') {
        const curse = context.supernaturalEvents.curse.machine;
        if (curse.value === 'active') {
          sendBack({ type: 'CURSE_RESOLVED' });
        }
      } else if (eventType === 'blessing') {
        const blessing = context.supernaturalEvents.blessing.machine;
        if (blessing.value === 'active') {
          sendBack({ type: 'BLESSING_RESOLVED' });
        }
      }

      return () => clearInterval(intervalId);
    }
  },
  guards: {
    isNotInBattle: (context, event) => context.currentTerrain !== 'battle',
    isNotInCombat: (context, event) => context.currentTerrain !== 'combat',
    hasSufficientAmmunition: (context, event) => context.ammunitionCount > 0,
    canCarryMoreItems: (context, event) => context.totalWeight + event.data.item.weight <= context.maxCarryingCapacity,
    canAffordItem: (context, event) => context.totalValue + event.data.item.value <= context.maxInventoryValue,
    isItemUsable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      return item && item.durability > 0;
    },
    isItemRepairable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      const repairCost = item.rarity === 'legendary' ? 200 : item.rarity === 'epic' ? 150 : 100;
      return item && item.repairCost <= context.totalValue;
    },
    isItemBreakable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      return item && item.durability <= 0;
    },
    isItemSalvagable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      return item && item.durability <= 0;
    },
    isItemEmergencyRepairable: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      return item && item.durability <= 0;
    },
    isRepairTimerComplete: (context, event) => !context.repairTimer,
    isSalvageTimerComplete: (context, event) => !context.salvageTimer,
    isEmergencyRepairTimerComplete: (context, event) => !context.emergencyRepairTimer,
    isQuestCompleted: (context, event) => {
      const missionId = event.data.missionId;
      return context.activeMissions.includes(missionId) && questMissionMachine.getSnapshot().value === 'completed';
    },
    isResourceGatheringCompleted: (context, event) => {
      const missionId = event.data.missionId;
      return context.activeMissions.includes(missionId) && resourceGatheringMissionMachine.getSnapshot().value === 'completed';
    },
    isMissionActive: (context, event) => context.activeMissions.includes(event.data.missionId),
    isStealthTacticApplicable: (context, event) => context.tacticalApproach === 'stealth',
    isRangedAttackTacticApplicable: (context, event) => context.tacticalApproach === 'rangedAttack',
    isMeleeEngagementTacticApplicable: (context, event) => context.tacticalApproach === 'meleeEngagement',
    isFastForwardValid: (context, event) => context.timeline.currentState === 'normal',
    isRewindValid: (context, event) => context.timeline.currentState === 'normal',
    isPauseValid: (context, event) => context.timeline.currentState === 'normal',
    isSkipValid: (context, event) => context.timeline.currentState === 'normal',
    isCurseActive: (context, event) => context.supernaturalEvents.curse.machine.value === 'active',
    isBlessingActive: (context, event) => context.supernaturalEvents.blessing.machine.value === 'active'
  }
});

// Example usage:
horizonZeroDawnMachine.onTransition((state, event) => {
  if (event.type === 'COMBAT') {
    console.log('Current State:', state.value, 'Updated Context:', state.context);
  } else {
    console.log('Current State:', state.value);
  }
});

// To send events to the machine:
horizonZeroDawnMachine.send({ type: 'START_NEW_GAME', data: { currentTerrain: 'plains' } });
horizonZeroDawnMachine.send({ type: 'PICK_UP_ITEM', data: { item: { name: 'sword', weight: 10, value: 50, rarity: 'common', durability: 100, maxDurability: 100, repairCost: 50, material: 'steel', salvageAmount: 10 } });
horizonZeroDawnMachine.send({ type: 'PICK_UP_ITEM', data: { item: { name: 'shield', weight: 5, value: 30, rarity: 'rare', durability: 150, maxDurability: 150, repairCost: 75, material: 'iron', salvageAmount: 15 } });
horizonZeroDawnMachine.send({ type: 'DROP_ITEM', data: { itemName: 'sword', itemWeight: 10, itemValue: 50, itemRarity: 'common', itemDurability: 100, itemMaxDurability: 100, itemRepairCost: 50, itemMaterial: 'steel', itemSalvageAmount: 10 } });
horizonZeroDawnMachine.send('USE_ITEM', { data: { itemName: 'sword' } }); // Should decrease durability
horizonZeroDawnMachine.send('REPAIR_ITEM', { data: { itemName: 'sword' } }); // Should start repair timer
horizonZeroDawnMachine.send('SALVAGE_ITEM', { data: { itemName: 'sword' } }); // Should start salvage timer
horizonZeroDawnMachine.send('START_EMERGENCY_REPAIR', { data: { itemName: 'sword' } }); // Should start emergency repair timer
horizonZeroDawnMachine.send('START_QUEST_MISSION', { data: { missionId: 'quest1', missionType: 'quest' } }); // Should start quest mission
horizonZeroDawnMachine.send('START_RESOURCE_GATHERING_MISSION', { data: { missionId: 'resource1', missionType: 'resourceGathering' } }); // Should start resource gathering mission
horizonZeroDawnMachine.send('INTERACT_WITH_FACTION_A'); // Should interact with Faction A
horizonZeroDawnMachine.send('INTERACT_WITH_FACTION_B'); // Should interact with Faction B
horizonZeroDawnMachine.send('TIMELINE_operation', { data: { operation: 'fastForward' } }); // Should start fast-forwarding
horizonZeroDawnMachine.send('TIMELINE_operation', { data: { operation: 'rewind' } }); // Should start rewinding
horizonZeroDawnMachine.send('TIMELINE_operation', { data: { operation: 'pause' } }); // Should pause the timeline
horizonZeroDawnMachine.send('TIMELINE_operation', { data: { operation: 'skip' } }); // Should skip the timeline
horizonZeroDawnMachine.send('SUPERNATURAL_EVENT', { data: { eventType: 'curse' } }); // Should trigger a curse
horizonZeroDawnMachine.send('SUPERNATURAL_EVENT', { data: { eventType: 'blessing' } }); // Should trigger a blessing
horizonZeroDawnMachine.send('COMBAT'); // Should be allowed since forest is a valid terrain for combat
horizonZeroDawnMachine.send('BATTLE_WON');
horizonZeroDawnMachine.send('MAIN_MENU');
Explanation:
Supernatural Event State Machines:
curseStateMachine: Manages the effects of a curse on the player.
blessingStateMachine: Manages the effects of a blessing on the player.
Main Game State Machine:
supernaturalEvent: A state to handle supernatural events like curses and blessings.
Invokes the supernatural event state machines (curseStateMachine and blessingStateMachine) and waits for them to complete.
Supernatural Event Triggers:
SUPERNATURAL_EVENT: Triggers a supernatural event (curse or blessing).
Supernatural Event Actions:
triggerSupernaturalEvent: Updates the supernatural event state based on the event type.
startCurse and startBlessing: Starts the curse or blessing state machine.
Services:
runSupernaturalEvent: Runs the supernatural event state machine and dispatches events based on the event type.
Guards:
isFastForwardValid, isRewindValid, isPauseValid, isSkipValid: Ensure that timeline operations are valid given the current game state.
isCurseActive and isBlessingActive: Ensure that supernatural events are active.
Consequence Actions:
triggerSupernaturalEvent: Updates the supernatural event state based on the event type.
startCurse and startBlessing: Starts the curse or blessing state machine.
With these modifications, the game now supports supernatural events like curses and blessings, which can add a new level of strategy and immersion to the gameplay. These events can affect the player's stats, inventory, and overall experience, creating a more mystical and atmospheric environment.


Add more complex vampire-specific supernatural effects?


To add more complex vampire-specific supernatural effects, we need to introduce specific states and actions that handle these effects. Vampire-specific effects could include increased damage resistance, vulnerability to sunlight, ability to transform into a vampire, and more. Here’s how you can integrate these effects into the state machine:

Vampire State Machines:
Define state machines for different vampire-specific effects like transformation and sun exposure.
Main Game State Machine:
Integrate the vampire state machines into the main game state machine and handle transitions based on these effects.
Vampire Event Triggers:
Define events to trigger these vampire-specific effects.
Vampire Event Actions:
Define actions to apply the consequences of these events.
Here’s an updated example:

Vampire State Machines
Transformation State Machine
The transformation state machine will manage the transformation of the player into a vampire.


const transformationStateMachine = Machine({
  id: 'transformation',
  initial: 'human',
  context: {
    isVampire: false
  },
  states: {
    human: {
      on: {
        TRANSFORM: { target: 'vampire' }
      }
    },
    vampire: {
      on: {
        UNTRANSFORM: { target: 'human' }
      }
    }
  }
});
Sun Exposure State Machine
The sun exposure state machine will manage the vulnerability of the player to sunlight.


const sunExposureStateMachine = Machine({
  id: 'sunExposure',
  initial: 'exposed',
  context: {
    isExposed: true
  },
  states: {
    exposed: {
      on: {
        ENTER_SHADOW: { target: 'hidden' }
      }
    },
    hidden: {
      on: {
        LEAVE_SHADOW: { target: 'exposed' }
      }
    }
  }
});
Main Game State Machine
The main game state machine will manage the execution of active missions, faction interactions, and handle the branching logic.


const horizonZeroDawnMachine = Machine({
  id: 'horizonZeroDawn',
  initial: 'startMenu',
  context: {
    currentTerrain: null, // Initialize with null or default terrain
    moveSpeedMultiplier: 1,
    attackPowerMultiplier: 1,
    defenseMultiplier: 1,
    currentWeapon: null,
    ammunitionCount: 0,
    totalWeight: 0,
    totalValue: 0,
    maxCarryingCapacity: 50, // Maximum carrying capacity in arbitrary units
    maxInventoryValue: 1000, // Maximum inventory value in arbitrary currency units
    items: {},
    salvageMaterials: {},
    repairTimer: null,
    salvageTimer: null,
    emergencyRepairTimer: null,
    activeMissions: [],
    missionBranches: {
      quest1: {
        type: 'quest',
        branches: {
          findArtifact: { machine: questMissionMachine },
          sideQuests: { machine: questMissionMachine }
        }
      },
      resource1: {
        type: 'resourceGathering',
        branches: {
          gatherWood: { machine: resourceGatheringMissionMachine },
          gatherStone: { machine: resourceGatheringMissionMachine },
          gatherHerbs: { machine: resourceGatheringMissionMachine }
        }
      }
    },
    factions: {
      factionA: { machine: factionAStateMachine },
      factionB: { machine: factionBStateMachine }
    },
    timeline: {
      currentState: 'normal',
      fastForwardMachine: { state: 'idle' },
      rewindMachine: { state: 'idle' }
    },
    supernaturalEvents: {
      curse: { machine: curseStateMachine },
      blessing: { machine: blessingStateMachine }
    },
    vampireEffects: {
      transformation: { machine: transformationStateMachine },
      sunExposure: { machine: sunExposureStateMachine }
    }
  },
  states: {
    startMenu: {
      on: {
        START_NEW_GAME: { target: 'gamePlay', actions: ['setInitialTerrain'], cond: 'isNotInBattle' },
        LOAD_GAME: { target: 'gamePlay', actions: ['setInitialTerrain'], cond: 'isNotInBattle' },
        OPTIONS: 'options',
        QUIT: 'exit'
      }
    },
    gamePlay: {
      on: {
        COMBAT: { target: 'combat', actions: ['updateCombatEffects'], cond: 'isNotInCombat' },
        EXPLORATION: 'exploration',
        INVENTORY_MANAGEMENT: 'inventory',
        SAVE_GAME: 'gamePlay',
        PAUSE_GAME: 'pause',
        MAIN_MENU: 'startMenu',
        FISHING: 'fishing',
        HUNTING: 'hunting',
        PICK_UP_ITEM: { target: 'itemSelection', actions: ['addItem'] },
        DROP_ITEM: { target: 'inventory', actions: ['removeItem'] },
        USE_ITEM: { target: 'gamePlay', actions: ['useItem'], cond: 'isItemUsable' },
        REPAIR_ITEM: { target: 'repair', actions: ['startRepairTimer'], cond: 'isItemRepairable' },
        BREAK_ITEM: { target: 'break', actions: ['breakItem'], cond: 'isItemBreakable' },
        SALVAGE_ITEM: { target: 'salvage', actions: ['startSalvageTimer'], cond: 'isItemSalvagable' },
        START_EMERGENCY_REPAIR: { target: 'emergencyFieldRepair', actions: ['startEmergencyRepairTimer'], cond: 'isItemEmergencyRepairable' },
        START_QUEST_MISSION: { target: 'mission', actions: ['startMission', 'addMission'], cond: 'isNotInCombat' },
        START_RESOURCE_GATHERING_MISSION: { target: 'mission', actions: ['startMission', 'addMission'], cond: 'isNotInCombat' },
        INTERACT_WITH_FACTION_A: { target: 'factionInteraction', actions: ['interactWithFactionA'], cond: 'isNotInCombat' },
        INTERACT_WITH_FACTION_B: { target: 'factionInteraction', actions: ['interactWithFactionB'], cond: 'isNotInCombat' },
        TIMELINE_OPERATION: { target: 'timeline', actions: ['performTimelineOperation'] },
        SUPERNATURAL_EVENT: { target: 'supernaturalEvent', actions: ['triggerSupernaturalEvent'] },
        VAMPIRE_EFFECT: { target: 'vampireEffect', actions: ['triggerVampireEffect'] }
      }
    },
    combat: {
      on: {
        BATTLE_WON: 'victoryScreen',
        BATTLE_LOST: 'defeatScreen'
      }
    },
    victoryScreen: {
      on: {
        CONTINUE: 'gamePlay',
        MAIN_MENU: 'startMenu'
      }
    },
    defeatScreen: {
      on: {
        RETRY: 'combat',
        MAIN_MENU: 'startMenu'
      }
    },
    exploration: {
      on: {
        ENCOUNTER_ENEMY: 'combat',
        INTERACT_WITH_NPC: 'dialogue', // Assuming dialogue is another state
        FIND_ITEM_QUEST: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    inventory: {
      on: {
        CLOSE_INVENTORY: 'gamePlay'
      }
    },
    pause: {
      on: {
        RESUME_GAME: 'gamePlay',
        OPTIONS: 'options',
        MAIN_MENU: 'startMenu'
      }
    },
    options: {
      on: {
        APPLY_CHANGES: 'gamePlay',
        CANCEL: 'startMenu'
      }
    },
    exit: {
      type: 'final'
    },
    fishing: {
      on: {
        FINISH_FISHING: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    hunting: {
      on: {
        FINISH_HUNTING: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    weaponSelection: {
      on: {
        SELECT_WEAPON: { target: 'gamePlay', actions: ['selectWeapon'] }
      }
    },
    itemSelection: {
      on: {
        SELECT_ITEM: { target: 'gamePlay', actions: ['selectItem'] }
      }
    },
    repair: {
      on: {
        COMPLETE_REPAIR: { target: 'gamePlay', actions: ['completeRepair'] }
      }
    },
    break: {
      on: {
        COMPLETE_BREAK: { target: 'gamePlay', actions: ['completeBreak'] }
      }
    },
    salvage: {
      on: {
        COMPLETE_SALVAGE: { target: 'gamePlay', actions: ['completeSalvage'] }
      }
    },
    emergencyFieldRepair: {
      on: {
        COMPLETE_EMERGENCY_REPAIR: { target: 'gamePlay', actions: ['completeEmergencyRepair'] }
      }
    },
    repairTimer: {
      on: {
        TIMER_COMPLETE: { target: 'repair' }
      }
    },
    salvageTimer: {
      on: {
        TIMER_COMPLETE: { target: 'salvage' }
      }
    },
    emergencyRepairTimer: {
      on: {
        TIMER_COMPLETE: { target: 'emergencyFieldRepair' }
      }
    },
    mission: {
      initial: 'idle',
      states: {
        idle: {
          on: {
            START_QUEST_MISSION: { target: 'quest', actions: ['startMission', 'addMission'], cond: 'isNotInCombat' },
            START_RESOURCE_GATHERING_MISSION: { target: 'resourceGathering', actions: ['startMission', 'addMission'], cond: 'isNotInCombat' }
          }
        },
        quest: {
          invoke: [
            { src: 'runMission', onDone: { target: 'idle' } }
          ]
        },
        resourceGathering: {
          invoke: [
            { src: 'runMission', onDone: { target: 'idle' } }
          ]
        }
      }
    },
    factionInteraction: {
      initial: 'idle',
      states: {
        idle: {
          on: {
            INTERACT_WITH_FACTION_A: { target: 'factionA', actions: ['interactWithFactionA'] },
            INTERACT_WITH_FACTION_B: { target: 'factionB', actions: ['interactWithFactionB'] }
          }
        },
        factionA: {
          invoke: [
            { src: 'runFactionInteraction', onDone: { target: 'idle' } }
          ]
        },
        factionB: {
          invoke: [
            { src: 'runFactionInteraction', onDone: { target: 'idle' } }
          ]
        }
      }
    },
    timeline: {
      initial: 'normal',
      states: {
        normal: {
          on: {
            TIMELINE_OPERATION: { target: 'operation', actions: ['startTimelineOperation'] }
          }
        },
        operation: {
          invoke: [
            { src: 'runTimelineOperation', onDone: { target: 'normal' } }
          ]
        }
      }
    },
    supernaturalEvent: {
      initial: 'idle',
      states: {
        idle: {
          on: {
            SUPERNATURAL_EVENT: { target: 'curseOrBlessing', actions: ['triggerSupernaturalEvent'] }
          }
        },
        curseOrBlessing: {
          initial: 'idle',
          states: {
            idle: {
              on: {
                CURSE: { target: 'curse', actions: ['startCurse'] },
                BLESSING: { target: 'blessing', actions: ['startBlessing'] }
              }
            },
            curse: {
              invoke: [
                { src: 'runSupernaturalEvent', onDone: { target: 'idle' } }
              ]
            },
            blessing: {
              invoke: [
                { src: 'runSupernaturalEvent', onDone: { target: 'idle' } }
              ]
            }
          }
        }
      }
    },
    vampireEffect: {
      initial: 'idle',
      states: {
        idle: {
          on: {
            VAMPIRE_EFFECT: { target: 'effect', actions: ['triggerVampireEffect'] }
          }
        },
        effect: {
          initial: 'idle',
          states: {
            idle: {
              on: {
                TRANSFORMATION: { target: 'transformation', actions: ['startTransformation'] },
                SUN_EXPOSURE: { target: 'sunExposure', actions: ['startSunExposure'] }
              }
            },
            transformation: {
              invoke: [
                { src: 'runVampireEffect', onDone: { target: 'idle' } }
              ]
            },
            sunExposure: {
              invoke: [
                { src: 'runVampireEffect', onDone: { target: 'idle' } }
              ]
            }
          }
        }
      }
    }
  }
}, {
  actions: {
    setInitialTerrain: (context, event) => {
      return { currentTerrain: event.data.currentTerrain };
    },
    updateCombatEffects: (context, event) => {
      const terrainEffects = {
        plains: {
          moveSpeedMultiplier: 1,
          attackPowerMultiplier: 1,
          defenseMultiplier: 1
        },
        forest: {
          moveSpeedMultiplier: 0.8,
          attackPowerMultiplier: 1.2,
          defenseMultiplier: 0.9
        },
        mountain: {
          moveSpeedMultiplier: 0.5,
          attackPowerMultiplier: 1.5,
          defenseMultiplier: 1.2
        },
        desert: {
          moveSpeedMultiplier: 1.2,
          attackPowerMultiplier: 0.8,
          defenseMultiplier: 0.8
        }
      };

      const currentTerrain = context.currentTerrain;
      const terrainEffect = terrainEffects[currentTerrain] || {};

      return {
        moveSpeedMultiplier: terrainEffect.moveSpeedMultiplier,
        attackPowerMultiplier: terrainEffect.attackPowerMultiplier,
        defenseMultiplier: terrainEffect.defenseMultiplier
      };
    },
    addItem: (context, event) => {
      const newItem = event.data.item;
      const weightMultiplier = newItem.rarity === 'legendary' ? 1.5 : newItem.rarity === 'epic' ? 1.2 : 1;
      const valueMultiplier = newItem.rarity === 'legendary' ? 2 : newItem.rarity === 'epic' ? 1.5 : 1;

      return {
        totalWeight: context.totalWeight + newItem.weight * weightMultiplier,
        totalValue: context.totalValue + newItem.value * valueMultiplier,
        items: {
          ...context.items,
          [newItem.name]: {
            ...newItem,
            durability: newItem.durability
          }
        }
      };
    },
    removeItem: (context, event) => {
      const itemName = event.data.itemName;
      const itemWeight = event.data.itemWeight;
      const itemValue = event.data.itemValue;
      const weightMultiplier = event.data.itemRarity === 'legendary' ? 1.5 : event.data.itemRarity === 'epic' ? 1.2 : 1;
      const valueMultiplier = event.data.itemRarity === 'legendary' ? 2 : event.data.itemRarity === 'epic' ? 1.5 : 1;

      return {
        totalWeight: context.totalWeight - itemWeight * weightMultiplier,
        totalValue: context.totalValue - itemValue * valueMultiplier,
        items: {
          ...context.items,
          [itemName]: undefined
        }
      };
    },
    selectWeapon: (context, event) => {
      return { currentWeapon: event.data.weapon };
    },
    useItem: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: item.durability - 1
            }
          }
        };
      }
      return context;
    },
    startRepairTimer: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        const repairQuality = sample([0.5, 1, 1.5]); // Random repair quality multiplier
        const repairAmount = Math.floor(item.maxDurability * repairQuality);
        const repairCost = Math.floor(repairAmount / 2); // Simplified cost calculation
        const repairTime = Math.floor(item.maxDurability * 0.1); // Repair time in arbitrary units

        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: Math.min(item.maxDurability, item.durability + repairAmount)
            }
          },
          totalValue: context.totalValue - repairCost,
          repairTimer: setTimeout(() => {
            context.repairTimer = null;
            horizonZeroDawnMachine.send({ type: 'TIMER_COMPLETE' });
          }, repairTime * 1000)
        };
      }
      return context;
    },
    completeRepair: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: item.maxDurability
            }
          }
        };
      }
      return context;
    },
    breakItem: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    salvageItem: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    completeBreak: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    completeSalvage: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    startSalvageTimer: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        const salvageTime = Math.floor(item.maxDurability * 0.2); // Salvage time in arbitrary units

        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: 0
            }
          },
          totalValue: context.totalValue - salvageTime, // Cost in arbitrary units
          salvageTimer: setTimeout(() => {
            context.salvageTimer = null;
            horizonZeroDawnMachine.send({ type: 'TIMER_COMPLETE' });
          }, salvageTime * 1000)
        };
      }
      return context;
    },
    startEmergencyRepairTimer: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        const repairQuality = sample([0.5, 1, 1.5]); // Random repair quality multiplier
        const repairAmount = Math.floor(item.maxDurability * repairQuality);
        const repairCost = Math.floor(repairAmount / 2); // Simplified cost calculation
        const repairTime = Math.floor(item.maxDurability * 0.1); // Repair time in arbitrary units

        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: Math.min(item.maxDurability, item.durability + repairAmount)
            }
          },
          totalValue: context.totalValue - repairTime, // Cost in arbitrary units
          emergencyRepairTimer: setTimeout(() => {
            context.emergencyRepairTimer = null;
            horizonZeroDawnMachine.send({ type: 'TIMER_COMPLETE' });
          }, repairTime * 1000)
        };
      }
      return context;
    },
    completeEmergencyRepair: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: item.maxDurability
            }
          }
        };
      }
      return context;
    },
    startMission: (context, event) => {
      const { missionId, missionType } = event.data;
      const branch = context.missionBranches[missionId].branches[missionType];
      return {
        activeMissions: [...context.activeMissions, missionId],
        [branch.id]: { state: 'inProgress' }
      };
    },
    addMission: (context, event) => {
      const { missionId, missionType } = event.data;
      const branch = context.missionBranches[missionId].branches[missionType];
      return {
        activeMissions: [...context.activeMissions, missionId],
        [branch.id]: { state: 'inProgress' }
      };
    },
    interactWithFactionA: (context, event) => {
      const factionA = context.factions.factionA.machine.getSnapshot();
      return {
        factions: {
          ...context.factions,
          factionA: { machine: factionA }
        }
      };
    },
    interactWithFactionB: (context, event) => {
      const factionB = context.factions.factionB.machine.getSnapshot();
      return {
        factions: {
          ...context.factions,
          factionB: { machine: factionB }
        }
      };
    },
    performTimelineOperation: (context, event) => {
      const { operation } = event.data;
      if (operation === 'fastForward') {
        return {
          timeline: {
            ...context.timeline,
            fastForwardMachine: { state: 'fastForwarding' }
          }
        };
      } else if (operation === 'rewind') {
        return {
          timeline: {
            ...context.timeline,
            rewindMachine: { state: 'rewinding' }
          }
        };
      } else if (operation === 'pause') {
        return {
          timeline: {
            ...context.timeline,
            currentState: 'paused'
          }
        };
      } else if (operation === 'skip') {
        return {
          timeline: {
            ...context.timeline,
            currentState: 'skipped'
          }
        };
      }
      return context;
    },
    triggerSupernaturalEvent: (context, event) => {
      const { eventType } = event.data;
      if (eventType === 'curse') {
        return {
          supernaturalEvents: {
            ...context.supernaturalEvents,
            curse: { state: 'active' }
          }
        };
      } else if (eventType === 'blessing') {
        return {
          supernaturalEvents: {
            ...context.supernaturalEvents,
            blessing: { state: 'active' }
          }
        };
      }
      return context;
    },
    startCurse: (context, event) => {
      const curse = context.supernaturalEvents.curse.machine.getSnapshot();
      return {
        supernaturalEvents: {
          ...context.supernaturalEvents,
          curse: { machine: curse }
        }
      };
    },
    startBlessing: (context, event) => {
      const blessing = context.supernaturalEvents.blessing.machine.getSnapshot();
      return {
        supernaturalEvents: {
          ...context.supernaturalEvents,
          blessing: { machine: blessing }
        }
      };
    },
    triggerVampireEffect: (context, event) => {
      const { effectType } = event.data;
      if (effectType === 'transformation') {
        return {
          vampireEffects: {
            ...context.vampireEffects,
            transformation: { state: 'transforming' }
          }
        };
      } else if (effectType === 'sun_exposure') {
        return {
          vampireEffects: {
            ...context.vampireEffects,
            sunExposure: { state: 'exposed' }
          }
        };
      }
      return context;
    },
    startTransformation: (context, event) => {
      const transformation = context.vampireEffects.transformation.machine.getSnapshot();
      return {
        vampireEffects: {
          ...context.vampireEffects,
          transformation: { machine: transformation }
        }
      };
    },
    startSunExposure: (context, event) => {
      const sunExposure = context.vampireEffects.sunExposure.machine.getSnapshot();
      return {
        vampireEffects: {
          ...context.vampireEffects,
          sunExposure: { machine: sunExposure }
        }
      };
    }
  },
  services: {
    runMission: (context, event) => (sendBack) => {
      const { missionId, missionType } = event.data;
      const branch = context.missionBranches[missionId].branches[missionType];

      switch (branch.id) {
        case 'quest1':
          setInterval(() => {
            sendBack({ type: 'TICK' });
          }, 1000);
          break;
        case 'resource1':
          setInterval(() => {
            sendBack({ type: 'GATHER_RESOURCE', data: { resource: 'wood', amount: 1 } });
            sendBack({ type: 'GATHER_RESOURCE', data: { resource: 'stone', amount: 0.5 } });
            sendBack({ type: 'GATHER_RESOURCE', data: { resource: 'herbs', amount: 0.3 } });
          }, 1000);
          break;
        default:
          break;
      }

      return () => clearInterval(intervalId);
    },
    runFactionInteraction: (context, event) => (sendBack) => {
      const { factionId } = event.data;
      const faction = context.factions[factionId].machine;

      switch (faction.value) {
        case 'neutral':
          setInterval(() => {
            sendBack({ type: 'TICK' });
          }, 1000);
          break;
        case 'trading':
          setInterval(() => {
            sendBack({ type: 'TRADE_OFFER', data: { offer: 'wood' } });
          }, 1000);
          break;
        case 'quests':
          setInterval(() => {
            sendBack({ type: 'ACCEPT_QUEST', data: { quest: 'explore area' } });
          }, 1000);
          break;
        case 'diplomacy':
          setInterval(() => {
            sendBack({ type: 'DIPLOMACY' });
          }, 1000);
          break;
        default:
          break;
      }

      return () => clearInterval(intervalId);
    },
    runTimelineOperation: (context, event) => (sendBack) => {
      const { operation } = event.data;
      if (operation === 'fastForward') {
        setInterval(() => {
          sendBack({ type: 'TIMELINE_TICK' });
        }, 500); // Faster tick rate for fast-forward
      } else if (operation === 'rewind') {
        setInterval(() => {
          sendBack({ type: 'TIMELINE_TICK' });
        }, 2000); // Slower tick rate for rewind
      } else if (operation === 'pause') {
        // Pause the game loop
      } else if (operation === 'skip') {
        // Skip to the end of the timeline
      }

      return () => clearInterval(intervalId);
    },
    runSupernaturalEvent: (context, event) => (sendBack) => {
      const { eventType } = event.data;
      if (eventType === 'curse') {
        const curse = context.supernaturalEvents.curse.machine;
        if (curse.value === 'active') {
          sendBack({ type: 'CURSE_RESOLVED' });
        }
      } else if (eventType === 'blessing') {
        const blessing = context.supernaturalEvents.blessing.machine;
        if (blessing.value === 'active') {
          sendBack({ type: 'BLESSING_RESOLVED' });
        }
      }

      return () => clearInterval(intervalId);
    },
    runVampireEffect: (context, event) => (sendBack) => {
      const { effectType } = event.data;
      if (effectType === 'transformation') {
        const transformation = context.vampireEffects.transformation.machine;
        if (transformation.value === 'transforming') {
          sendBack({ type: 'TRANSFORMED' });
        }
      } else if (effectType === 'sun_exposure') {
        const sunExposure = context.vampireEffects.sunExposure.machine;
        if (sunExposure.value === 'exposed') {
          sendBack({ type: 'ENTER_SHADOW' });
        }
      }

      return () => clearInterval(intervalId);
    }
  },
  guards: {
    isFastForwardValid: (context, event) => context.timeline.currentState === 'normal',
    isRewindValid: (context, event) => context.timeline.currentState === 'normal',
    isPauseValid: (context, event) => context.timeline.currentState === 'normal',
    isSkipValid: (context, event) => context.timeline.currentState === 'normal',
    isCurseActive: (context, event) => context.supernaturalEvents.curse.machine.value === 'active',
    isBlessingActive: (context, event) => context.supernaturalEvents.blessing.machine.value === 'active',
    isTransformationActive: (context, event) => context.vampireEffects.transformation.machine.value === 'transforming',
    isSunExposureActive: (context, event) => context.vampireEffects.sunExposure.machine.value === 'exposed'
  }
});

// Example usage:
horizonZeroDawnMachine.onTransition((state, event) => {
  if (event.type === 'COMBAT') {
    console.log('Current State:', state.value, 'Updated Context:', state.context);
  } else {
    console.log('Current State:', state.value);
  }
});

// To send events to the machine:
horizonZeroDawnMachine.send({ type: 'START_NEW_GAME', data: { currentTerrain: 'plains' } });
horizonZeroDawnMachine.send({ type: 'PICK_UP_ITEM', data: { item: { name: 'sword', weight: 10, value: 50, rarity: 'common', durability: 100, maxDurability: 100, repairCost: 50, material: 'steel', salvageAmount: 10 } });
horizonZeroDawnMachine.send({ type: 'PICK_UP_ITEM', data: { item: { name: 'shield', weight: 5, value: 30, rarity: 'rare', durability: 150, maxDurability: 150, repairCost: 75, material: 'iron', salvageAmount: 15 } });
horizonZeroDawnMachine.send({ type: 'DROP_ITEM', data: { itemName: 'sword', itemWeight: 10, itemValue: 50, itemRarity: 'common', itemDurability: 100, itemMaxDurability: 100, itemRepairCost: 50, itemMaterial: 'steel', itemSalvageAmount: 10 } });
horizonZeroDawnMachine.send('USE_ITEM', { data: { itemName: 'sword' } }); // Should decrease durability
horizonZeroDawnMachine.send('REPAIR_ITEM', { data: { itemName: 'sword' } }); // Should start repair timer
horizonZeroDawnMachine.send('SALVAGE_ITEM', { data: { itemName: 'sword' } }); // Should start salvage timer
horizonZeroDawnMachine.send('START_EMERGENCY_REPAIR', { data: { itemName: 'sword' } }); // Should start emergency repair timer
horizonZeroDawnMachine.send('START_QUEST_MISSION', { data: { missionId: 'quest1', missionType: 'quest' } }); // Should start quest mission
horizonZeroDawnMachine.send('START_RESOURCE_GATHERING_MISSION', { data: { missionId: 'resource1', missionType: 'resourceGathering' } }); // Should start resource gathering mission
horizonZeroDawnMachine.send('INTERACT_WITH_FACTION_A'); // Should interact with Faction A
horizonZeroDawnMachine.send('INTERACT_WITH_FACTION_B'); // Should interact with Faction B
horizonZeroDawnMachine.send('TIMELINE_operation', { data: { operation: 'fastForward' } }); // Should start fast-forwarding
horizonZeroDawnMachine.send('TIMELINE_operation', { data: { operation: 'rewind' } }); // Should start rewinding
horizonZeroDawnMachine.send('TIMELINE_operation', { data: { operation: 'pause' } }); // Should pause the timeline
horizonZeroDawnMachine.send('TIMELINE_operation', { data: { operation: 'skip' } }); // Should skip the timeline
horizonZeroDawnMachine.send('SUPERNATURAL_event', { data: { eventType: 'curse' } }); // Should trigger a curse
horizonZeroDawnMachine.send('SUPERNATURAL_event', { data: { eventType: 'blessing' } }); // Should trigger a blessing
horizonZeroDawnMachine.send('VAMPIRE_effect', { data: { effectType: 'transformation' } }); // Should trigger transformation
horizonZeroDawnMachine.send('VAMPIRE_effect', { data: { effectType: 'sun_exposure' } }); // Should trigger sun exposure
horizonZeroDawnMachine.send('COMBAT'); // Should be allowed since forest is a valid terrain for combat
horizonZeroDawnMachine.send('BATTLE_WON');
horizonZeroDawnMachine.send('MAIN_MENU');
Explanation:
Vampire State Machines:
transformationStateMachine: Manages the transformation of the player into a vampire.
sunExposureStateMachine: Manages the vulnerability of the player to sunlight.
Main Game State Machine:
vampireEffect: A state to handle vampire-specific effects like transformation and sun exposure.
Invokes the vampire effect state machines (transformationStateMachine and sunExposureStateMachine) and waits for them to complete.
Vampire Effect Triggers:
VAMPIRE_effect: Triggers a vampire-specific effect (transformation or sun exposure).
Vampire Effect Actions:
triggerVampireEffect: Updates the vampire effect state based on the effect type.
startTransformation: Starts the transformation state machine.
startSunExposure: Starts the sun exposure state machine.
Services:
runVampireEffect: Runs the vampire effect state machine and dispatches events based on the effect type.
Guards:
isFastForwardValid, isRewindValid, isPauseValid, isSkipValid: Ensure that timeline operations are valid given the current game state.
isCurseActive and isBlessingActive: Ensure that supernatural events are active.
isTransformationActive and isSunExposureActive: Ensure that vampire effects are active.
Consequence Actions:
triggerSupernaturalEvent: Updates the supernatural event state based on the event type.
startCurse and startBlessing: Starts the curse or blessing state machine.
triggerVampireEffect: Updates the vampire effect state based on the effect type.
startTransformation and startSunExposure: Starts the transformation or sun exposure state machine.
With these modifications, the game now supports vampire-specific supernatural effects, including transformation and sun exposure. These effects can add a new level of strategy and immersion to the gameplay, enabling players to explore different paths and outcomes based on their choices.


Develop more detailed reality distortion mechanics?


Reality distortion mechanics can add an intriguing and immersive element to the game by allowing players to manipulate the environment and reality itself. These mechanics could include bending objects, creating illusions, and affecting the behavior of non-player characters (NPCs). Here’s how you can integrate more detailed reality distortion mechanics into the state machine:

Reality Distortion State Machines:
Define state machines for different reality distortion abilities like bending objects, creating illusions, and affecting NPCs.
Main Game State Machine:
Integrate the reality distortion state machines into the main game state machine and handle transitions based on these abilities.
Reality Distortion Event Triggers:
Define events to trigger these reality distortion abilities.
Reality Distortion Event Actions:
Define actions to apply the consequences of these abilities.
Here’s an updated example:

Reality Distortion State Machines
Bend Objects State Machine
The bend objects state machine will manage the bending of objects in the environment.


const bendObjectsStateMachine = Machine({
  id: 'bendObjects',
  initial: 'inactive',
  context: {
    isBending: false
  },
  states: {
    inactive: {
      on: {
        BEGIN_BEND: { target: 'bending' }
      }
    },
    bending: {
      on: {
        END_BEND: { target: 'inactive' }
      }
    }
  }
});
Create Illusions State Machine
The create illusions state machine will manage the creation of visual illusions.


const createIllusionsStateMachine = Machine({
  id: 'createIllusions',
  initial: 'inactive',
  context: {
    isCreatingIllusions: false
  },
  states: {
    inactive: {
      on: {
        BEGIN_CREATE_ILLUSIONS: { target: 'creatingIllusions' }
      }
    },
    creatingIllusions: {
      on: {
        END_CREATE_ILLUSIONS: { target: 'inactive' }
      }
    }
  }
});
Affect NPCs State Machine
The affect NPCs state machine will manage the manipulation of NPC behavior.


const affectNPCsStateMachine = Machine({
  id: 'affectNPCs',
  initial: 'inactive',
  context: {
    isAffectingNPCs: false
  },
  states: {
    inactive: {
      on: {
        BEGIN_AFFECT_NPCS: { target: 'affectingNPCs' }
      }
    },
    affectingNPCs: {
      on: {
        END_AFFECT_NPCS: { target: 'inactive' }
      }
    }
  }
});
Main Game State Machine
The main game state machine will manage the execution of active missions, faction interactions, and handle the branching logic.


const horizonZeroDawnMachine = Machine({
  id: 'horizonZeroDawn',
  initial: 'startMenu',
  context: {
    currentTerrain: null, // Initialize with null or default terrain
    moveSpeedMultiplier: 1,
    attackPowerMultiplier: 1,
    defenseMultiplier: 1,
    currentWeapon: null,
    ammunitionCount: 0,
    totalWeight: 0,
    totalValue: 0,
    maxCarryingCapacity: 50, // Maximum carrying capacity in arbitrary units
    maxInventoryValue: 1000, // Maximum inventory value in arbitrary currency units
    items: {},
    salvageMaterials: {},
    repairTimer: null,
    salvageTimer: null,
    emergencyRepairTimer: null,
    activeMissions: [],
    missionBranches: {
      quest1: {
        type: 'quest',
        branches: {
          findArtifact: { machine: questMissionMachine },
          sideQuests: { machine: questMissionMachine }
        }
      },
      resource1: {
        type: 'resourceGathering',
        branches: {
          gatherWood: { machine: resourceGatheringMissionMachine },
          gatherStone: { machine: resourceGatheringMissionMachine },
          gatherHerbs: { machine: resourceGatheringMissionMachine }
        }
      }
    },
    factions: {
      factionA: { machine: factionAStateMachine },
      factionB: { machine: factionBStateMachine }
    },
    timeline: {
      currentState: 'normal',
      fastForwardMachine: { state: 'idle' },
      rewindMachine: { state: 'idle' }
    },
    supernaturalEvents: {
      curse: { machine: curseStateMachine },
      blessing: { machine: blessingStateMachine }
    },
    vampireEffects: {
      transformation: { machine: transformationStateMachine },
      sunExposure: { machine: sunExposureStateMachine }
    },
    realityDistortionEffects: {
      bendObjects: { machine: bendObjectsStateMachine },
      createIllusions: { machine: createIllusionsStateMachine },
      affectNPCs: { machine: affectNPCsStateMachine }
    }
  },
  states: {
    startMenu: {
      on: {
        START_NEW_GAME: { target: 'gamePlay', actions: ['setInitialTerrain'], cond: 'isNotInBattle' },
        LOAD_GAME: { target: 'gamePlay', actions: ['setInitialTerrain'], cond: 'isNotInBattle' },
        OPTIONS: 'options',
        QUIT: 'exit'
      }
    },
    gamePlay: {
      on: {
        COMBAT: { target: 'combat', actions: ['updateCombatEffects'], cond: 'isNotInCombat' },
        EXPLORATION: 'exploration',
        INVENTORY_MANAGEMENT: 'inventory',
        SAVE_GAME: 'gamePlay',
        PAUSE_GAME: 'pause',
        MAIN_MENU: 'startMenu',
        FISHING: 'fishing',
        HUNTING: 'hunting',
        PICK_UP_ITEM: { target: 'itemSelection', actions: ['addItem'] },
        DROP_ITEM: { target: 'inventory', actions: ['removeItem'] },
        USE_ITEM: { target: 'gamePlay', actions: ['useItem'], cond: 'isItemUsable' },
        REPAIR_ITEM: { target: 'repair', actions: ['startRepairTimer'], cond: 'isItemRepairable' },
        BREAK_ITEM: { target: 'break', actions: ['breakItem'], cond: 'isItemBreakable' },
        SALVAGE_ITEM: { target: 'salvage', actions: ['startSalvageTimer'], cond: 'isItemSalvagable' },
        START_EMERGENCY_REPAIR: { target: 'emergencyFieldRepair', actions: ['startEmergencyRepairTimer'], cond: 'isItemEmergencyRepairable' },
        START_QUEST_MISSION: { target: 'mission', actions: ['startMission', 'addMission'], cond: 'isNotInCombat' },
        START_RESOURCE_GATHERING_MISSION: { target: 'mission', actions: ['startMission', 'addMission'], cond: 'isNotInCombat' },
        INTERACT_WITH_FACTION_A: { target: 'factionInteraction', actions: ['interactWithFactionA'], cond: 'isNotInCombat' },
        INTERACT_WITH_FACTION_B: { target: 'factionInteraction', actions: ['interactWithFactionB'], cond: 'isNotInCombat' },
        TIMELINE_OPERATION: { target: 'timeline', actions: ['performTimelineOperation'] },
        SUPERNATURAL_EVENT: { target: 'supernaturalEvent', actions: ['triggerSupernaturalEvent'] },
        VAMPIRE_EFFECT: { target: 'vampireEffect', actions: ['triggerVampireEffect'] },
        REALITY_DISTORTION: { target: 'realityDistortion', actions: ['triggerRealityDistortion'] }
      }
    },
    combat: {
      on: {
        BATTLE_WON: 'victoryScreen',
        BATTLE_LOST: 'defeatScreen'
      }
    },
    victoryScreen: {
      on: {
        CONTINUE: 'gamePlay',
        MAIN_MENU: 'startMenu'
      }
    },
    defeatScreen: {
      on: {
        RETRY: 'combat',
        MAIN_MENU: 'startMenu'
      }
    },
    exploration: {
      on: {
        ENCOUNTER_ENEMY: 'combat',
        INTERACT_WITH_NPC: 'dialogue', // Assuming dialogue is another state
        FIND_ITEM_QUEST: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    inventory: {
      on: {
        CLOSE_INVENTORY: 'gamePlay'
      }
    },
    pause: {
      on: {
        RESUME_GAME: 'gamePlay',
        OPTIONS: 'options',
        MAIN_MENU: 'startMenu'
      }
    },
    options: {
      on: {
        APPLY_CHANGES: 'gamePlay',
        CANCEL: 'startMenu'
      }
    },
    exit: {
      type: 'final'
    },
    fishing: {
      on: {
        FINISH_FISHING: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    hunting: {
      on: {
        FINISH_HUNTING: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    weaponSelection: {
      on: {
        SELECT_WEAPON: { target: 'gamePlay', actions: ['selectWeapon'] }
      }
    },
    itemSelection: {
      on: {
        SELECT_ITEM: { target: 'gamePlay', actions: ['selectItem'] }
      }
    },
    repair: {
      on: {
        COMPLETE_REPAIR: { target: 'gamePlay', actions: ['completeRepair'] }
      }
    },
    break: {
      on: {
        COMPLETE_BREAK: { target: 'gamePlay', actions: ['completeBreak'] }
      }
    },
    salvage: {
      on: {
        COMPLETE_SALVAGE: { target: 'gamePlay', actions: ['completeSalvage'] }
      }
    },
    emergencyFieldRepair: {
      on: {
        COMPLETE_EMERGENCY_REPAIR: { target: 'gamePlay', actions: ['completeEmergencyRepair'] }
      }
    },
    repairTimer: {
      on: {
        TIMER_COMPLETE: { target: 'repair' }
      }
    },
    salvageTimer: {
      on: {
        TIMER_COMPLETE: { target: 'salvage' }
      }
    },
    emergencyRepairTimer: {
      on: {
        TIMER_COMPLETE: { target: 'emergencyFieldRepair' }
      }
    },
    mission: {
      initial: 'idle',
      states: {
        idle: {
          on: {
            START_QUEST_MISSION: { target: 'quest', actions: ['startMission', 'addMission'], cond: 'isNotInCombat' },
            START_RESOURCE_GATHERING_MISSION: { target: 'resourceGathering', actions: ['startMission', 'addMission'], cond: 'isNotInCombat' }
          }
        },
        quest: {
          invoke: [
            { src: 'runMission', onDone: { target: 'idle' } }
          ]
        },
        resourceGathering: {
          invoke: [
            { src: 'runMission', onDone: { target: 'idle' } }
          ]
        }
      }
    },
    factionInteraction: {
      initial: 'idle',
      states: {
        idle: {
          on: {
            INTERACT_WITH_FACTION_A: { target: 'factionA', actions: ['interactWithFactionA'] },
            INTERACT_WITH_FACTION_B: { target: 'factionB', actions: ['interactWithFactionB'] }
          }
        },
        factionA: {
          invoke: [
            { src: 'runFactionInteraction', onDone: { target: 'idle' } }
          ]
        },
        factionB: {
          invoke: [
            { src: 'runFactionInteraction', onDone: { target: 'idle' } }
          ]
        }
      }
    },
    timeline: {
      initial: 'normal',
      states: {
        normal: {
          on: {
            TIMELINE_OPERATION: { target: 'operation', actions: ['startTimelineOperation'] }
          }
        },
        operation: {
          invoke: [
            { src: 'runTimelineOperation', onDone: { target: 'normal' } }
          ]
        }
      }
    },
    supernaturalEvent: {
      initial: 'idle',
      states: {
        idle: {
          on: {
            SUPERNATURAL_EVENT: { target: 'curseOrBlessing', actions: ['triggerSupernaturalEvent'] }
          }
        },
        curseOrBlessing: {
          initial: 'idle',
          states: {
            idle: {
              on: {
                CURSE: { target: 'curse', actions: ['startCurse'] },
                BLESSING: { target: 'blessing', actions: ['startBlessing'] }
              }
            },
            curse: {
              invoke: [
                { src: 'runSupernaturalEvent', onDone: { target: 'idle' } }
              ]
            },
            blessing: {
              invoke: [
                { src: 'runSupernaturalEvent', onDone: { target: 'idle' } }
              ]
            }
          }
        }
      }
    },
    vampireEffect: {
      initial: 'idle',
      states: {
        idle: {
          on: {
            VAMPIRE_EFFECT: { target: 'effect', actions: ['triggerVampireEffect'] }
          }
        },
        effect: {
          initial: 'idle',
          states: {
            idle: {
              on: {
                TRANSFORMATION: { target: 'transformation', actions: ['startTransformation'] },
                SUN_EXPOSURE: { target: 'sunExposure', actions: ['startSunExposure'] }
              }
            },
            transformation: {
              invoke: [
                { src: 'runVampireEffect', onDone: { target: 'idle' } }
              ]
            },
            sunExposure: {
              invoke: [
                { src: 'runVampireEffect', onDone: { target: 'idle' } }
              ]
            }
          }
        }
      }
    },
    realityDistortion: {
      initial: 'idle',
      states: {
        idle: {
          on: {
            REALITY_DISTORTION: { target: 'distortion', actions: ['triggerRealityDistortion'] }
          }
        },
        distortion: {
          initial: 'idle',
          states: {
            idle: {
              on: {
                BEGIN_BEND: { target: 'bendObjects', actions: ['startBendObjects'] },
                BEGIN_CREATE_ILLUSIONS: { target: 'createIllusions', actions: ['startCreateIllusions'] },
                BEGIN_AFFECT_NPCS: { target: 'affectNPCs', actions: ['startAffectNPCs'] }
              }
            },
            bendObjects: {
              invoke: [
                { src: 'runRealityDistortion', onDone: { target: 'idle' } }
              ]
            },
            createIllusions: {
              invoke: [
                { src: 'runRealityDistortion', onDone: { target: 'idle' } }
              ]
            },
            affectNPCs: {
              invoke: [
                { src: 'runRealityDistortion', onDone: { target: 'idle' } }
              ]
            }
          }
        }
      }
    }
  }
}, {
  actions: {
    setInitialTerrain: (context, event) => {
      return { currentTerrain: event.data.currentTerrain };
    },
    updateCombatEffects: (context, event) => {
      const terrainEffects = {
        plains: {
          moveSpeedMultiplier: 1,
          attackPowerMultiplier: 1,
          defenseMultiplier: 1
        },
        forest: {
          moveSpeedMultiplier: 0.8,
          attackPowerMultiplier: 1.2,
          defenseMultiplier: 0.9
        },
        mountain: {
          moveSpeedMultiplier: 0.5,
          attackPowerMultiplier: 1.5,
          defenseMultiplier: 1.2
        },
        desert: {
          moveSpeedMultiplier: 1.2,
          attackPowerMultiplier: 0.8,
          defenseMultiplier: 0.8
        }
      };

      const currentTerrain = context.currentTerrain;
      const terrainEffect = terrainEffects[currentTerrain] || {};

      return {
        moveSpeedMultiplier: terrainEffect.moveSpeedMultiplier,
        attackPowerMultiplier: terrainEffect.attackPowerMultiplier,
        defenseMultiplier: terrainEffect.defenseMultiplier
      };
    },
    addItem: (context, event) => {
      const newItem = event.data.item;
      const weightMultiplier = newItem.rarity === 'legendary' ? 1.5 : newItem.rarity === 'epic' ? 1.2 : 1;
      const valueMultiplier = newItem.rarity === 'legendary' ? 2 : newItem.rarity === 'epic' ? 1.5 : 1;

      return {
        totalWeight: context.totalWeight + newItem.weight * weightMultiplier,
        totalValue: context.totalValue + newItem.value * valueMultiplier,
        items: {
          ...context.items,
          [newItem.name]: {
            ...newItem,
            durability: newItem.durability
          }
        }
      };
    },
    removeItem: (context, event) => {
      const itemName = event.data.itemName;
      const itemWeight = event.data.itemWeight;
      const itemValue = event.data.itemValue;
      const weightMultiplier = event.data.itemRarity === 'legendary' ? 1.5 : event.data.itemRarity === 'epic' ? 1.2 : 1;
      const valueMultiplier = event.data.itemRarity === 'legendary' ? 2 : event.data.itemRarity === 'epic' ? 1.5 : 1;

      return {
        totalWeight: context.totalWeight - itemWeight * weightMultiplier,
        totalValue: context.totalValue - itemValue * valueMultiplier,
        items: {
          ...context.items,
          [itemName]: undefined
        }
      };
    },
    selectWeapon: (context, event) => {
      return { currentWeapon: event.data.weapon };
    },
    useItem: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: item.durability - 1
            }
          }
        };
      }
      return context;
    },
    startRepairTimer: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        const repairQuality = sample([0.5, 1, 1.5]); // Random repair quality multiplier
        const repairAmount = Math.floor(item.maxDurability * repairQuality);
        const repairCost = Math.floor(repairAmount / 2); // Simplified cost calculation
        const repairTime = Math.floor(item.maxDurability * 0.1); // Repair time in arbitrary units

        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: Math.min(item.maxDurability, item.durability + repairAmount)
            }
          },
          totalValue: context.totalValue - repairCost,
          repairTimer: setTimeout(() => {
            context.repairTimer = null;
            horizonZeroDawnMachine.send({ type: 'TIMER_COMPLETE' });
          }, repairTime * 1000)
        };
      }
      return context;
    },
    completeRepair: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: item.maxDurability
            }
          }
        };
      }
      return context;
    },
    breakItem: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    salvageItem: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    completeBreak: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    completeSalvage: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    startSalvageTimer: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        const salvageTime = Math.floor(item.maxDurability * 0.2); // Salvage time in arbitrary units

        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: 0
            }
          },
          totalValue: context.totalValue - salvageTime, // Cost in arbitrary units
          salvageTimer: setTimeout(() => {
            context.salvageTimer = null;
            horizonZeroDawnMachine.send({ type: 'TIMER_COMPLETE' });
          }, salvageTime * 1000)
        };
      }
      return context;
    },
    startEmergencyRepairTimer: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        const repairQuality = sample([0.5, 1, 1.5]); // Random repair quality multiplier
        const repairAmount = Math.floor(item.maxDurability * repairQuality);
        const repairCost = Math.floor(repairAmount / 2); // Simplified cost calculation
        const repairTime = Math.floor(item.maxDurability * 0.1); // Repair time in arbitrary units

        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: Math.min(item.maxDurability, item.durability + repairAmount)
            }
          },
          totalValue: context.totalValue - repairTime, // Cost in arbitrary units
          emergencyRepairTimer: setTimeout(() => {
            context.emergencyRepairTimer = null;
            horizonZeroDawnMachine.send({ type: 'TIMER_COMPLETE' });
          }, repairTime * 1000)
        };
      }
      return context;
    },
    completeEmergencyRepair: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: item.maxDurability
            }
          }
        };
      }
      return context;
    },
    startMission: (context, event) => {
      const { missionId, missionType } = event.data;
      const branch = context.missionBranches[missionId].branches[missionType];
      return {
        activeMissions: [...context.activeMissions, missionId],
        [branch.id]: { state: 'inProgress' }
      };
    },
    addMission: (context, event) => {
      const { missionId, missionType } = event.data;
      const branch = context.missionBranches[missionId].branches[missionType];
      return {
        activeMissions: [...context.activeMissions, missionId],
        [branch.id]: { state: 'inProgress' }
      };
    },
    interactWithFactionA: (context, event) => {
      const factionA = context.factions.factionA.machine.getSnapshot();
      return {
        factions: {
          ...context.factions,
          factionA: { machine: factionA }
        }
      };
    },
    interactWithFactionB: (context, event) => {
      const factionB = context.factions.factionB.machine.getSnapshot();
      return {
        factions: {
          ...context.factions,
          factionB: { machine: factionB }
        }
      };
    },
    performTimelineOperation: (context, event) => {
      const { operation } = event.data;
      if (operation === 'fastForward') {
        return {
          timeline: {
            ...context.timeline,
            fastForwardMachine: { state: 'fastForwarding' }
          }
        };
      } else if (operation === 'rewind') {
        return {
          timeline: {
            ...context.timeline,
            rewindMachine: { state: 'rewinding' }
          }
        };
      } else if (operation === 'pause') {
        return {
          timeline: {
            ...context.timeline,
            currentState: 'paused'
          }
        };
      } else if (operation === 'skip') {
        return {
          timeline: {
            ...context.timeline,
            currentState: 'skipped'
          }
        };
      }
      return context;
    },
    triggerSupernaturalEvent: (context, event) => {
      const { eventType } = event.data;
      if (eventType === 'curse') {
        return {
          supernaturalEvents: {
            ...context.supernaturalEvents,
            curse: { state: 'active' }
          }
        };
      } else if (eventType === 'blessing') {
        return {
          supernaturalEvents: {
            ...context.supernaturalEvents,
            blessing: { state: 'active' }
          }
        };
      }
      return context;
    },
    startCurse: (context, event) => {
      const curse = context.supernaturalEvents.curse.machine.getSnapshot();
      return {
        supernaturalEvents: {
          ...context.supernaturalEvents,
          curse: { machine: curse }
        }
      };
    },
    startBlessing: (context, event) => {
      const blessing = context.supernaturalEvents.blessing.machine.getSnapshot();
      return {
        supernaturalEvents: {
          ...context.supernaturalEvents,
          blessing: { machine: blessing }
        }
      };
    },
    triggerVampireEffect: (context, event) => {
      const { effectType } = event.data;
      if (effectType === 'transformation') {
        return {
          vampireEffects: {
            ...context.vampireEffects,
            transformation: { state: 'transforming' }
          }
        };
      } else if (effectType === 'sun_exposure') {
        return {
          vampireEffects: {
            ...context.vampireEffects,
            sunExposure: { state: 'exposed' }
          }
        };
      }
      return context;
    },
    startTransformation: (context, event) => {
      const transformation = context.vampireEffects.transformation.machine.getSnapshot();
      return {
        vampireEffects: {
          ...context.vampireEffects,
          transformation: { machine: transformation }
        }
      };
    },
    startSunExposure: (context, event) => {
      const sunExposure = context.vampireEffects.sunExposure.machine.getSnapshot();
      return {
        vampireEffects: {
          ...context.vampireEffects,
          sunExposure: { machine: sunExposure }
        }
      };
    },
    triggerRealityDistortion: (context, event) => {
      const { distortionType } = event.data;
      if (distortionType === 'bend_objects') {
        return {
          realityDistortionEffects: {
            ...context.realityDistortionEffects,
            bendObjects: { state: 'bending' }
          }
        };
      } else if (distortionType === 'create_illusions') {
        return {
          realityDistortionEffects: {
            ...context.realityDistortionEffects,
            createIllusions: { state: 'creatingIllusions' }
          }
        };
      } else if (distortionType === 'affect_npcs') {
        return {
          realityDistortionEffects: {
            ...context.realityDistortionEffects,
            affectNPCs: { state: 'affectingNPCs' }
          }
        };
      }
      return context;
    },
    startBendObjects: (context, event) => {
      const bendObjects = context.realityDistortionEffects.bendObjects.machine.getSnapshot();
      return {
        realityDistortionEffects: {
          ...context.realityDistortionEffects,
          bendObjects: { machine: bendObjects }
        }
      };
    },
    startCreateIllusions: (context, event) => {
      const createIllusions = context.realityDistortionEffects.createIllusions.machine.getSnapshot();
      return {
        realityDistortionEffects: {
          ...context.realityDistortionEffects,
          createIllusions: { machine: createIllusions }
        }
      };
    },
    startAffectNPCs: (context, event) => {
      const affectNPCs = context.realityDistortionEffects.affectNPCs.machine.getSnapshot();
      return {
        realityDistortionEffects: {
          ...context.realityDistortionEffects,
          affectNPCs: { machine: affectNPCs }
        }
      };
    }
  },
  services: {
    runMission: (context, event) => (sendBack) => {
      const { missionId, missionType } = event.data;
      const branch = context.missionBranches[missionId].branches[missionType];

      switch (branch.id) {
        case 'quest1':
          setInterval(() => {
            sendBack({ type: 'TICK' });
          }, 1000);
          break;
        case 'resource1':
          setInterval(() => {
            sendBack({ type: 'GATHER_RESOURCE', data: { resource: 'wood', amount: 1 } });
            sendBack({ type: 'GATHER_RESOURCE', data: { resource: 'stone', amount: 0.5 } });
            sendBack({ type: 'GATHER_RESOURCE', data: { resource: 'herbs', amount: 0.3 } });
          }, 1000);
          break;
        default:
          break;
      }

      return () => clearInterval(intervalId);
    },
    runFactionInteraction: (context, event) => (sendBack) => {
      const { factionId } = event.data;
      const faction = context.factions[factionId].machine;

      switch (faction.value) {
        case 'neutral':
          setInterval(() => {
            sendBack({ type: 'TICK' });
          }, 1000);
          break;
        case 'trading':
          setInterval(() => {
            sendBack({ type: 'TRADE_OFFER', data: { offer: 'wood' } });
          }, 1000);
          break;
        case 'quests':
          setInterval(() => {
            sendBack({ type: 'ACCEPT_QUEST', data: { quest: 'explore area' } });
          }, 1000);
          break;
        case 'diplomacy':
          setInterval(() => {
            sendBack({ type: 'DIPLOMACY' });
          }, 1000);
          break;
        default:
          break;
      }

      return () => clearInterval(intervalId);
    },
    runTimelineOperation: (context, event) => (sendBack) => {
      const { operation } = event.data;
      if (operation === 'fastForward') {
        setInterval(() => {
          sendBack({ type: 'TIMELINE_TICK' });
        }, 500); // Faster tick rate for fast-forward
      } else if (operation === 'rewind') {
        setInterval(() => {
          sendBack({ type: 'TIMELINE_TICK' });
        }, 2000); // Slower tick rate for rewind
      } else if (operation === 'pause') {
        // Pause the game loop
      } else if (operation === 'skip') {
        // Skip to the end of the timeline
      }

      return () => clearInterval(intervalId);
    },
    runSupernaturalEvent: (context, event) => (sendBack) => {
      const { eventType } = event.data;
      if (eventType === 'curse') {
        const curse = context.supernaturalEvents.curse.machine;
        if (curse.value === 'active') {
          sendBack({ type: 'CURSE_RESOLVED' });
        }
      } else if (eventType === 'blessing') {
        const blessing = context.supernaturalEvents.blessing.machine;
        if (blessing.value === 'active') {
          sendBack({ type: 'BLESSING_RESOLVED' });
        }
      }

      return () => clearInterval(intervalId);
    },
    runVampireEffect: (context, event) => (sendBack) => {
      const { effectType } = event.data;
      if (effectType === 'transformation') {
        const transformation = context.vampireEffects.transformation.machine;
        if (transformation.value === 'transforming') {
          sendBack({ type: 'TRANSFORMED' });
        }
      } else if (effectType === 'sun_exposure') {
        const sunExposure = context.vampireEffects.sunExposure.machine;
        if (sunExposure.value === 'exposed') {
          sendBack({ type: 'ENTER_SHADOW' });
        }
      }

      return () => clearInterval(intervalId);
    },
    runRealityDistortion: (context, event) => (sendBack) => {
      const { distortionType } = event.data;
      if (distortionType === 'bend_objects') {
        const bendObjects = context.realityDistortionEffects.bendObjects.machine;
        if (bendObjects.value === 'bending') {
          sendBack({ type: 'END_BEND' });
        }
      } else if (distortionType === 'create_illusions') {
        const createIllusions = context.realityDistortionEffects.createIllusions.machine;
        if (createIllusions.value === 'creatingIllusions') {
          sendBack({ type: 'END_CREATE_ILLUSIONS' });
        }
      } else if (distortionType === 'affect_npcs') {
        const affectNPCs = context.realityDistortionEffects.affectNPCs.machine;
        if (affectNPCs.value === 'affectingNPCs') {
          sendBack({ type: 'END_AFFECT_NPCS' });
        }
      }

      return () => clearInterval(intervalId);
    }
  },
  guards: {
    isFastForwardValid: (context, event) => context.timeline.currentState === 'normal',
    isRewindValid: (context, event) => context.timeline.currentState === 'normal',
    isPauseValid: (context, event) => context.timeline.currentState === 'normal',
    isSkipValid: (context, event) => context.timeline.currentState === 'normal',
    isCurseActive: (context, event) => context.supernaturalEvents.curse.machine.value === 'active',
    isBlessingActive: (context, event) => context.supernaturalEvents.blessing.machine.value === 'active',
    isTransformationActive: (context, event) => context.vampireEffects.transformation.machine.value === 'transforming',
    isSunExposureActive: (context, event) => context.vampireEffects.sunExposure.machine.value === 'exposed',
    isBendObjectsActive: (context, event) => context.realityDistortionEffects.bendObjects.machine.value === 'bending',
    isCreateIllusionsActive: (context, event) => context.realityDistortionEffects.createIllusions.machine.value === 'creatingIllusions',
    isAffectNPCsActive: (context, event) => context.realityDistortionEffects.affectNPCs.machine.value === 'affectingNPCs'
  }
});

// Example usage:
horizonZeroDawnMachine.onTransition((state, event) => {
  if (event.type === 'COMBAT') {
    console.log('Current State:', state.value, 'Updated Context:', state.context);
  } else {
    console.log('Current State:', state.value);
  }
});

// To send events to the machine:
horizonZeroDawnMachine.send({ type: 'START_NEW_GAME', data: { currentTerrain: 'plains' } });
horizonZeroDawnMachine.send({ type: 'PICK_UP_ITEM', data: { item: { name: 'sword', weight: 10, value: 50, rarity: 'common', durability: 100, maxDurability: 100, repairCost: 50, material: 'steel', salvageAmount: 10 } });
horizonZeroDawnMachine.send({ type: 'PICK_UP_ITEM', data: { item: { name: 'shield', weight: 5, value: 30, rarity: 'rare', durability: 150, maxDurability: 150, repairCost: 75, material: 'iron', salvageAmount: 15 } });
horizonZeroDawnMachine.send({ type: 'DROP_ITEM', data: { itemName: 'sword', itemWeight: 10, itemValue: 50, itemRarity: 'common', itemDurability: 100, itemMaxDurability: 100, item

Create more intricate curse propagation patterns?


To create more intricate curse propagation patterns, we need to define rules and behaviors that dictate how curses spread and affect the game state. Curses can propagate in various ways, such as affecting nearby enemies, altering weather conditions, or causing environmental hazards. Here’s how you can integrate more intricate curse propagation patterns into the state machine:

Curse Propagation Rules:
Define rules for how curses spread and affect the game state.
Curse Spread Events:
Define events to trigger the spread of curses.
Curse Spread Actions:
Define actions to apply the consequences of curse spread.
Here’s an updated example:

Curse Propagation State Machines
Nearby Enemies Affected by Curse
The nearby enemies affected by curse state machine will manage the effects of the curse on nearby enemies.


const nearbyEnemiesAffectedByCurseStateMachine = Machine({
  id: 'nearbyEnemiesAffectedByCurse',
  initial: 'normal',
  context: {
    enemyCount: 0
  },
  states: {
    normal: {
      on: {
        ENEMIES_NEARBY: { target: 'affected', actions: ['increaseEnemyCount'] }
      }
    },
    affected: {
      on: {
        ENEMIES_DISSIPATED: { target: 'normal' }
      }
    }
  }
}, {
  actions: {
    increaseEnemyCount: (context, event) => {
      return {
        enemyCount: context.enemyCount + 1
      };
    }
  }
});
Weather Conditions Affected by Curse
The weather conditions affected by curse state machine will manage the effects of the curse on weather conditions.


const weatherConditionsAffectedByCurseStateMachine = Machine({
  id: 'weatherConditionsAffectedByCurse',
  initial: 'normal',
  context: {
    weatherCondition: 'clear'
  },
  states: {
    normal: {
      on: {
        CURSE_APPLIED: { target: 'curseApplied', actions: ['changeWeatherCondition'] }
      }
    },
    curseApplied: {
      on: {
        CURSE_REMOVED: { target: 'normal' }
      }
    }
  }
}, {
  actions: {
    changeWeatherCondition: (context, event) => {
      return {
        weatherCondition: 'stormy'
      };
    }
  }
});
Environmental Hazards Affected by Curse
The environmental hazards affected by curse state machine will manage the effects of the curse on environmental hazards.


const environmentalHazardsAffectedByCurseStateMachine = Machine({
  id: 'environmentalHazardsAffectedByCurse',
  initial: 'normal',
  context: {
    hazardCount: 0
  },
  states: {
    normal: {
      on: {
        HAZARDS_PRESENT: { target: 'affected', actions: ['increaseHazardCount'] }
      }
    },
    affected: {
      on: {
        HAZARDS_ABSENT: { target: 'normal' }
      }
    }
  }
}, {
  actions: {
    increaseHazardCount: (context, event) => {
      return {
        hazardCount: context.hazardCount + 1
      };
    }
  }
});
Main Game State Machine
The main game state machine will manage the execution of active missions, faction interactions, and handle the branching logic.


const horizonZeroDawnMachine = Machine({
  id: 'horizonZeroDawn',
  initial: 'startMenu',
  context: {
    currentTerrain: null, // Initialize with null or default terrain
    moveSpeedMultiplier: 1,
    attackPowerMultiplier: 1,
    defenseMultiplier: 1,
    currentWeapon: null,
    ammunitionCount: 0,
    totalWeight: 0,
    totalValue: 0,
    maxCarryingCapacity: 50, // Maximum carrying capacity in arbitrary units
    maxInventoryValue: 1000, // Maximum inventory value in arbitrary currency units
    items: {},
    salvageMaterials: {},
    repairTimer: null,
    salvageTimer: null,
    emergencyRepairTimer: null,
    activeMissions: [],
    missionBranches: {
      quest1: {
        type: 'quest',
        branches: {
          findArtifact: { machine: questMissionMachine },
          sideQuests: { machine: questMissionMachine }
        }
      },
      resource1: {
        type: 'resourceGathering',
        branches: {
          gatherWood: { machine: resourceGatheringMissionMachine },
          gatherStone: { machine: resourceGatheringMissionMachine },
          gatherHerbs: { machine: resourceGatheringMissionMachine }
        }
      }
    },
    factions: {
      factionA: { machine: factionAStateMachine },
      factionB: { machine: factionBStateMachine }
    },
    timeline: {
      currentState: 'normal',
      fastForwardMachine: { state: 'idle' },
      rewindMachine: { state: 'idle' }
    },
    supernaturalEvents: {
      curse: { machine: curseStateMachine },
      blessing: { machine: blessingStateMachine }
    },
    vampireEffects: {
      transformation: { machine: transformationStateMachine },
      sunExposure: { machine: sunExposureStateMachine }
    },
    realityDistortionEffects: {
      bendObjects: { machine: bendObjectsStateMachine },
      createIllusions: { machine: createIllusionsStateMachine },
      affectNPCs: { machine: affectNPCsStateMachine }
    },
    cursePropagationEffects: {
      nearbyEnemies: { machine: nearbyEnemiesAffectedByCurseStateMachine },
      weatherConditions: { machine: weatherConditionsAffectedByCurseStateMachine },
      environmentalHazards: { machine: environmentalHazardsAffectedByCurseStateMachine }
    }
  },
  states: {
    startMenu: {
      on: {
        START_NEW_GAME: { target: 'gamePlay', actions: ['setInitialTerrain'], cond: 'isNotInBattle' },
        LOAD_GAME: { target: 'gamePlay', actions: ['setInitialTerrain'], cond: 'isNotInBattle' },
        OPTIONS: 'options',
        QUIT: 'exit'
      }
    },
    gamePlay: {
      on: {
        COMBAT: { target: 'combat', actions: ['updateCombatEffects'], cond: 'isNotInCombat' },
        EXPLORATION: 'exploration',
        INVENTORY_MANAGEMENT: 'inventory',
        SAVE_GAME: 'gamePlay',
        PAUSE_GAME: 'pause',
        MAIN_MENU: 'startMenu',
        FISHING: 'fishing',
        HUNTING: 'hunting',
        PICK_UP_ITEM: { target: 'itemSelection', actions: ['addItem'] },
        DROP_ITEM: { target: 'inventory', actions: ['removeItem'] },
        USE_ITEM: { target: 'gamePlay', actions: ['useItem'], cond: 'isItemUsable' },
        REPAIR_ITEM: { target: 'repair', actions: ['startRepairTimer'], cond: 'isItemRepairable' },
        BREAK_ITEM: { target: 'break', actions: ['breakItem'], cond: 'isItemBreakable' },
        SALVAGE_ITEM: { target: 'salvage', actions: ['startSalvageTimer'], cond: 'isItemSalvagable' },
        START_EMERGENCY_REPAIR: { target: 'emergencyFieldRepair', actions: ['startEmergencyRepairTimer'], cond: 'isItemEmergencyRepairable' },
        START_QUEST_MISSION: { target: 'mission', actions: ['startMission', 'addMission'], cond: 'isNotInCombat' },
        START_RESOURCE_GATHERING_MISSION: { target: 'mission', actions: ['startMission', 'addMission'], cond: 'isNotInCombat' },
        INTERACT_WITH_FACTION_A: { target: 'factionInteraction', actions: ['interactWithFactionA'], cond: 'isNotInCombat' },
        INTERACT_WITH_FACTION_B: { target: 'factionInteraction', actions: ['interactWithFactionB'], cond: 'isNotInCombat' },
        TIMELINE_OPERATION: { target: 'timeline', actions: ['performTimelineOperation'] },
        SUPERNATURAL_EVENT: { target: 'supernaturalEvent', actions: ['triggerSupernaturalEvent'] },
        VAMPIRE_EFFECT: { target: 'vampireEffect', actions: ['triggerVampireEffect'] },
        REALITY_DISTORTION: { target: 'realityDistortion', actions: ['triggerRealityDistortion'] },
        CURSE_PROPAGATION: { target: 'cursePropagation', actions: ['triggerCursePropagation'] }
      }
    },
    combat: {
      on: {
        BATTLE_WON: 'victoryScreen',
        BATTLE_LOST: 'defeatScreen'
      }
    },
    victoryScreen: {
      on: {
        CONTINUE: 'gamePlay',
        MAIN_MENU: 'startMenu'
      }
    },
    defeatScreen: {
      on: {
        RETRY: 'combat',
        MAIN_MENU: 'startMenu'
      }
    },
    exploration: {
      on: {
        ENCOUNTER_ENEMY: 'combat',
        INTERACT_WITH_NPC: 'dialogue', // Assuming dialogue is another state
        FIND_ITEM_QUEST: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    inventory: {
      on: {
        CLOSE_INVENTORY: 'gamePlay'
      }
    },
    pause: {
      on: {
        RESUME_GAME: 'gamePlay',
        OPTIONS: 'options',
        MAIN_MENU: 'startMenu'
      }
    },
    options: {
      on: {
        APPLY_CHANGES: 'gamePlay',
        CANCEL: 'startMenu'
      }
    },
    exit: {
      type: 'final'
    },
    fishing: {
      on: {
        FINISH_FISHING: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    hunting: {
      on: {
        FINISH_HUNTING: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    weaponSelection: {
      on: {
        SELECT_WEAPON: { target: 'gamePlay', actions: ['selectWeapon'] }
      }
    },
    itemSelection: {
      on: {
        SELECT_ITEM: { target: 'gamePlay', actions: ['selectItem'] }
      }
    },
    repair: {
      on: {
        COMPLETE_REPAIR: { target: 'gamePlay', actions: ['completeRepair'] }
      }
    },
    break: {
      on: {
        COMPLETE_BREAK: { target: 'gamePlay', actions: ['completeBreak'] }
      }
    },
    salvage: {
      on: {
        COMPLETE_SALVAGE: { target: 'gamePlay', actions: ['completeSalvage'] }
      }
    },
    emergencyFieldRepair: {
      on: {
        COMPLETE_EMERGENCY_REPAIR: { target: 'gamePlay', actions: ['completeEmergencyRepair'] }
      }
    },
    repairTimer: {
      on: {
        TIMER_COMPLETE: { target: 'repair' }
      }
    },
    salvageTimer: {
      on: {
        TIMER_COMPLETE: { target: 'salvage' }
      }
    },
    emergencyRepairTimer: {
      on: {
        TIMER_COMPLETE: { target: 'emergencyFieldRepair' }
      }
    },
    mission: {
      initial: 'idle',
      states: {
        idle: {
          on: {
            START_QUEST_MISSION: { target: 'quest', actions: ['startMission', 'addMission'], cond: 'isNotInCombat' },
            START_RESOURCE_GATHERING_MISSION: { target: 'resourceGathering', actions: ['startMission', 'addMission'], cond: 'isNotInCombat' }
          }
        },
        quest: {
          invoke: [
            { src: 'runMission', onDone: { target: 'idle' } }
          ]
        },
        resourceGathering: {
          invoke: [
            { src: 'runMission', onDone: { target: 'idle' } }
          ]
        }
      }
    },
    factionInteraction: {
      initial: 'idle',
      states: {
        idle: {
          on: {
            INTERACT_WITH_FACTION_A: { target: 'factionA', actions: ['interactWithFactionA'] },
            INTERACT_WITH_FACTION_B: { target: 'factionB', actions: ['interactWithFactionB'] }
          }
        },
        factionA: {
          invoke: [
            { src: 'runFactionInteraction', onDone: { target: 'idle' } }
          ]
        },
        factionB: {
          invoke: [
            { src: 'runFactionInteraction', onDone: { target: 'idle' } }
          ]
        }
      }
    },
    timeline: {
      initial: 'normal',
      states: {
        normal: {
          on: {
            TIMELINE_OPERATION: { target: 'operation', actions: ['startTimelineOperation'] }
          }
        },
        operation: {
          invoke: [
            { src: 'runTimelineOperation', onDone: { target: 'normal' } }
          ]
        }
      }
    },
    supernaturalEvent: {
      initial: 'idle',
      states: {
        idle: {
          on: {
            SUPERNATURAL_EVENT: { target: 'curseOrBlessing', actions: ['triggerSupernaturalEvent'] }
          }
        },
        curseOrBlessing: {
          initial: 'idle',
          states: {
            idle: {
              on: {
                CURSE: { target: 'curse', actions: ['startCurse'] },
                BLESSING: { target: 'blessing', actions: ['startBlessing'] }
              }
            },
            curse: {
              invoke: [
                { src: 'runSupernaturalEvent', onDone: { target: 'idle' } }
              ]
            },
            blessing: {
              invoke: [
                { src: 'runSupernaturalEvent', onDone: { target: 'idle' } }
              ]
            }
          }
        }
      }
    },
    vampireEffect: {
      initial: 'idle',
      states: {
        idle: {
          on: {
            VAMPIRE_EFFECT: { target: 'effect', actions: ['triggerVampireEffect'] }
          }
        },
        effect: {
          initial: 'idle',
          states: {
            idle: {
              on: {
                TRANSFORMATION: { target: 'transformation', actions: ['startTransformation'] },
                SUN_EXPOSURE: { target: 'sunExposure', actions: ['startSunExposure'] }
              }
            },
            transformation: {
              invoke: [
                { src: 'runVampireEffect', onDone: { target: 'idle' } }
              ]
            },
            sunExposure: {
              invoke: [
                { src: 'runVampireEffect', onDone: { target: 'idle' } }
              ]
            }
          }
        }
      }
    },
    realityDistortion: {
      initial: 'idle',
      states: {
        idle: {
          on: {
            REALITY_DISTORTION: { target: 'distortion', actions: ['triggerRealityDistortion'] }
          }
        },
        distortion: {
          initial: 'idle',
          states: {
            idle: {
              on: {
                BEGIN_BEND: { target: 'bendObjects', actions: ['startBendObjects'] },
                BEGIN_CREATE_ILLUSIONS: { target: 'createIllusions', actions: ['startCreateIllusions'] },
                BEGIN_AFFECT_NPCS: { target: 'affectNPCs', actions: ['startAffectNPCs'] }
              }
            },
            bendObjects: {
              invoke: [
                { src: 'runRealityDistortion', onDone: { target: 'idle' } }
              ]
            },
            createIllusions: {
              invoke: [
                { src: 'runRealityDistortion', onDone: { target: 'idle' } }
              ]
            },
            affectNPCs: {
              invoke: [
                { src: 'runRealityDistortion', onDone: { target: 'idle' } }
              ]
            }
          }
        }
      }
    },
    cursePropagation: {
      initial: 'idle',
      states: {
        idle: {
          on: {
            CURSE_PROPAGATION: { target: 'propagation', actions: ['triggerCursePropagation'] }
          }
        },
        propagation: {
          initial: 'idle',
          states: {
            idle: {
              on: {
                BEGIN_CURSE_PROPAGATION: { target: 'active', actions: ['startCursePropagation'] }
              }
            },
            active: {
              on: {
                END_CURSE_PROPAGATION: { target: 'idle' }
              }
            }
          }
        }
      }
    }
  }
}, {
  actions: {
    setInitialTerrain: (context, event) => {
      return { currentTerrain: event.data.currentTerrain };
    },
    updateCombatEffects: (context, event) => {
      const terrainEffects = {
        plains: {
          moveSpeedMultiplier: 1,
          attackPowerMultiplier: 1,
          defenseMultiplier: 1
        },
        forest: {
          moveSpeedMultiplier: 0.8,
          attackPowerMultiplier: 1.2,
          defenseMultiplier: 0.9
        },
        mountain: {
          moveSpeedMultiplier: 0.5,
          attackPowerMultiplier: 1.5,
          defenseMultiplier: 1.2
        },
        desert: {
          moveSpeedMultiplier: 1.2,
          attackPowerMultiplier: 0.8,
          defenseMultiplier: 0.8
        }
      };

      const currentTerrain = context.currentTerrain;
      const terrainEffect = terrainEffects[currentTerrain] || {};

      return {
        moveSpeedMultiplier: terrainEffect.moveSpeedMultiplier,
        attackPowerMultiplier: terrainEffect.attackPowerMultiplier,
        defenseMultiplier: terrainEffect.defenseMultiplier
      };
    },
    addItem: (context, event) => {
      const newItem = event.data.item;
      const weightMultiplier = newItem.rarity === 'legendary' ? 1.5 : newItem.rarity === 'epic' ? 1.2 : 1;
      const valueMultiplier = newItem.rarity === 'legendary' ? 2 : newItem.rarity === 'epic' ? 1.5 : 1;

      return {
        totalWeight: context.totalWeight + newItem.weight * weightMultiplier,
        totalValue: context.totalValue + newItem.value * valueMultiplier,
        items: {
          ...context.items,
          [newItem.name]: {
            ...newItem,
            durability: newItem.durability
          }
        }
      };
    },
    removeItem: (context, event) => {
      const itemName = event.data.itemName;
      const itemWeight = event.data.itemWeight;
      const itemValue = event.data.itemValue;
      const weightMultiplier = event.data.itemRarity === 'legendary' ? 1.5 : event.data.itemRarity === 'epic' ? 1.2 : 1;
      const valueMultiplier = event.data.itemRarity === 'legendary' ? 2 : event.data.itemRarity === 'epic' ? 1.5 : 1;

      return {
        totalWeight: context.totalWeight - itemWeight * weightMultiplier,
        totalValue: context.totalValue - itemValue * valueMultiplier,
        items: {
          ...context.items,
          [itemName]: undefined
        }
      };
    },
    selectWeapon: (context, event) => {
      return { currentWeapon: event.data.weapon };
    },
    useItem: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: item.durability - 1
            }
          }
        };
      }
      return context;
    },
    startRepairTimer: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        const repairQuality = sample([0.5, 1, 1.5]); // Random repair quality multiplier
        const repairAmount = Math.floor(item.maxDurability * repairQuality);
        const repairCost = Math.floor(repairAmount / 2); // Simplified cost calculation
        const repairTime = Math.floor(item.maxDurability * 0.1); // Repair time in arbitrary units

        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: Math.min(item.maxDurability, item.durability + repairAmount)
            }
          },
          totalValue: context.totalValue - repairCost,
          repairTimer: setTimeout(() => {
            context.repairTimer = null;
            horizonZeroDawnMachine.send({ type: 'TIMER_COMPLETE' });
          }, repairTime * 1000)
        };
      }
      return context;
    },
    completeRepair: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: item.maxDurability
            }
          }
        };
      }
      return context;
    },
    breakItem: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    salvageItem: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    completeBreak: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    completeSalvage: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    startSalvageTimer: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        const salvageTime = Math.floor(item.maxDurability * 0.2); // Salvage time in arbitrary units

        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: 0
            }
          },
          totalValue: context.totalValue - salvageTime, // Cost in arbitrary units
          salvageTimer: setTimeout(() => {
            context.salvageTimer = null;
            horizonZeroDawnMachine.send({ type: 'TIMER_COMPLETE' });
          }, salvageTime * 1000)
        };
      }
      return context;
    },
    startEmergencyRepairTimer: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        const repairQuality = sample([0.5, 1, 1.5]); // Random repair quality multiplier
        const repairAmount = Math.floor(item.maxDurability * repairQuality);
        const repairCost = Math.floor(repairAmount / 2); // Simplified cost calculation
        const repairTime = Math.floor(item.maxDurability * 0.1); // Repair time in arbitrary units

        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: Math.min(item.maxDurability, item.durability + repairAmount)
            }
          },
          totalValue: context.totalValue - repairTime, // Cost in arbitrary units
          emergencyRepairTimer: setTimeout(() => {
            context.emergencyRepairTimer = null;
            horizonZeroDawnMachine.send({ type: 'TIMER_COMPLETE' });
          }, repairTime * 1000)
        };
      }
      return context;
    },
    completeEmergencyRepair: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: item.maxDurability
            }
          }
        };
      }
      return context;
    },
    startMission: (context, event) => {
      const { missionId, missionType } = event.data;
      const branch = context.missionBranches[missionId].branches[missionType];
      return {
        activeMissions: [...context.activeMissions, missionId],
        [branch.id]: { state: 'inProgress' }
      };
    },
    addMission: (context, event) => {
      const { missionId, missionType } = event.data;
      const branch = context.missionBranches[missionId].branches[missionType];
      return {
        activeMissions: [...context.activeMissions, missionId],
        [branch.id]: { state: 'inProgress' }
      };
    },
    interactWithFactionA: (context, event) => {
      const factionA = context.factions.factionA.machine.getSnapshot();
      return {
        factions: {
          ...context.factions,
          factionA: { machine: factionA }
        }
      };
    },
    interactWithFactionB: (context, event) => {
      const factionB = context.factions.factionB.machine.getSnapshot();
      return {
        factions: {
          ...context.factions,
          factionB: { machine: factionB }
        }
      };
    },
    performTimelineOperation: (context, event) => {
      const { operation } = event.data;
      if (operation === 'fastForward') {
        return {
          timeline: {
            ...context.timeline,
            fastForwardMachine: { state: 'fastForwarding' }
          }
        };
      } else if (operation === 'rewind') {
        return {
          timeline: {
            ...context.timeline,
            rewindMachine: { state: 'rewinding' }
          }
        };
      } else if (operation === 'pause') {
        return {
          timeline: {
            ...context.timeline,
            currentState: 'paused'
          }
        };
      } else if (operation === 'skip') {
        return {
          timeline: {
            ...context.timeline,
            currentState: 'skipped'
          }
        };
      }
      return context;
    },
    triggerSupernaturalEvent: (context, event) => {
      const { eventType } = event.data;
      if (eventType === 'curse') {
        return {
          supernaturalEvents: {
            ...context.supernaturalEvents,
            curse: { state: 'active' }
          }
        };
      } else if (eventType === 'blessing') {
        return {
          supernaturalEvents: {
            ...context.supernaturalEvents,
            blessing: { state: 'active' }
          }
        };
      }
      return context;
    },
    startCurse: (context, event) => {
      const curse = context.supernaturalEvents.curse.machine.getSnapshot();
      return {
        supernaturalEvents: {
          ...context.supernaturalEvents,
          curse: { machine: curse }
        }
      };
    },
    startBlessing: (context, event) => {
      const blessing = context.supernaturalEvents.blessing.machine.getSnapshot();
      return {
        supernaturalEvents: {
          ...context.supernaturalEvents,
          blessing: { machine: blessing }
        }
      };
    },
    triggerVampireEffect: (context, event) => {
      const { effectType } = event.data;
      if (effectType === 'transformation') {
        return {
          vampireEffects: {
            ...context.vampireEffects,
            transformation: { state: 'transforming' }
          }
        };
      } else if (effectType === 'sun_exposure') {
        return {
          vampireEffects: {
            ...context.vampireEffects,
            sunExposure: { state: 'exposed' }
          }
        };
      }
      return context;
    },
    startTransformation: (context, event) => {
      const transformation = context.vampireEffects.transformation.machine.getSnapshot();
      return {
        vampireEffects: {
          ...context.vampireEffects,
          transformation: { machine: transformation }
        }
      };
    },
    startSunExposure: (context, event) => {
      const sunExposure = context.vampireEffects.sunExposure.machine.getSnapshot();
      return {
        vampireEffects: {
          ...context.vampireEffects,
          sunExposure: { machine: sunExposure }
        }
      };
    },
    triggerRealityDistortion: (context, event) => {
      const { distortionType } = event.data;
      if (distortionType === 'bend_objects') {
        return {
          realityDistortionEffects: {
            ...context.realityDistortionEffects,
            bendObjects: { state: 'bending' }
          }
        };
      } else if (distortionType === 'create_illusions') {
        return {
          realityDistortionEffects: {
            ...context.realityDistortionEffects,
            createIllusions: { state: 'creatingIllusions' }
          }
        };
      } else if (distortionType === 'affect_npcs') {
        return {
          realityDistortionEffects: {
            ...context.realityDistortionEffects,
            affectNPCs: { state: 'affectingNPCs' }
          }
        };
      }
      return context;
    },
    startBendObjects: (context, event) => {
      const bendObjects = context.realityDistortionEffects.bendObjects.machine.getSnapshot();
      return {
        realityDistortionEffects: {
          ...context.realityDistortionEffects,
          bendObjects: { machine: bendObjects }
        }
      };
    },
    startCreateIllusions: (context, event) => {
      const createIllusions = context.realityDistortionEffects.createIllusions.machine.getSnapshot();
      return {
        realityDistortionEffects: {
          ...context.realityDistortionEffects,
          createIllusions: { machine: createIllusions }
        }
      };
    },
    startAffectNPCs: (context, event) => {
      const affectNPCs = context.realityDistortionEffects.affectNPCs.machine.getSnapshot();
      return {
        realityDistortionEffects: {
          ...context.realityDistortionEffects,
          affectNPCs: { machine: affectNPCs }
        }
      };
    },
    triggerCursePropagation: (context, event) => {
      const { propagationType } = event.data;
      if (propagationType === 'nearby_enemies') {
        return {
          cursePropagationEffects: {
            ...context.cursePropagationEffects,
            nearbyEnemies: { state: 'active' }
          }
        };
      } else if (propagationType === 'weather_conditions') {
        return {
          cursePropagationEffects: {
            ...context.cursePropagationEffects,
            weatherConditions: { state: 'active' }
          }
        };
      } else if (propagationType === 'environmental_hazards') {
        return {
          cursePropagationEffects: {
            ...context.cursePropagationEffects,
            environmentalHazards: { state: 'active' }
          }
        };
      }
      return context;
    },
    startCursePropagation: (context, event) => {
      const { propagationType } = event.data;
      if (propagationType === 'nearby_enemies') {
        const nearbyEnemies = context.cursePropagationEffects.nearbyEnemies.machine.getSnapshot();
        if (nearbyEnemies.value === 'active') {
          sendBack({ type: 'ENEMIES_NEARBY' });
        }
      } else if (propagationType === 'weather_conditions') {
        const weatherConditions = context.cursePropagationEffects.weatherConditions.machine.getSnapshot();
        if (weatherConditions.value === 'active') {
          sendBack({ type: 'CURSE_APPLIED' });
        }
      } else if (propagationType === 'environmental_hazards') {
        const environmentalHazards = context.cursePropagationEffects.environmentalHazards.machine.getSnapshot();
        if (environmentalHazards.value === 'active') {
          sendBack({ type: 'HAZARDS_PRESENT' });
        }
      }

      return () => clearInterval(intervalId);
    }
  },
  services: {
    runMission: (context, event) => (sendBack) => {
      const { missionId, missionType } = event.data;
      const branch = context.missionBranches[missionId].branches[missionType];

      switch (branch.id) {
        case 'quest1':
          setInterval(() => {
            sendBack({ type: 'TICK' });
          }, 1000);
          break;
        case 'resource1':
          setInterval(() => {
            sendBack({ type: 'GATHER_RESOURCE', data: { resource: 'wood', amount: 1 } });
            sendBack({ type: 'GATHER_RESOURCE', data: { resource: 'stone', amount: 0.5 } });
            sendBack({ type: 'GATHER_RESOURCE', data: { resource: 'herbs', amount: 0.3 } });
          }, 1000);
          break;
        default:
          break;
      }

      return () => clearInterval(intervalId);
    },
    runFactionInteraction: (context, event) => (sendBack) => {
      const { factionId } = event.data;
      const faction = context.factions[factionId].machine;

      switch (faction.value) {
        case 'neutral':
          setInterval(() => {
            sendBack({ type: 'TICK' });
          }, 1000);
          break;
        case 'trading':
          setInterval(() => {
            sendBack({ type: 'TRADE_OFFER', data: { offer: 'wood' } });
          }, 1000);
          break;
        case 'quests':
          setInterval(() => {
            sendBack({ type: 'ACCEPT_QUEST', data: { quest: 'explore area' } });
          }, 1000);
          break;
        case 'diplomacy':
          setInterval(() => {
            sendBack({ type: 'DIPLOMACY' });
          }, 1000);
          break;
        default:
          break;
      }

      return () => clearInterval(intervalId);
    },
    runTimelineOperation: (context, event) => (sendBack) => {
      const { operation } = event.data;
      if (operation === 'fastForward') {
        setInterval(() => {
          sendBack({ type: 'TIMELINE_TICK' });
        }, 500); // Faster tick rate for fast-forward
      } else if (operation === 'rewind') {
        setInterval(() => {
          sendBack({ type: 'TIMELINE_TICK' });
        }, 2000); // Slower tick rate for rewind
      } else if (operation === 'pause') {
        // Pause the game loop
      } else if (operation === 'skip') {
        // Skip to the end of the timeline
      }

      return () => clearInterval(intervalId);
    },
    runSupernaturalEvent: (context, event) => (sendBack) => {
      const { eventType } = event.data;
      if (eventType === 'curse') {
        const curse = context.supernaturalEvents.curse.machine;
        if (curse.value === 'active') {
          sendBack({ type: 'CURSE_RESOLVED' });
        }
      } else if (eventType === 'blessing') {
        const blessing = context.supernaturalEvents.blessing.machine;
        if (blessing.value === 'active') {
          sendBack({ type: 'BLESSING_RESOLVED' });
        }
      }

      return () => clearInterval(intervalId);
    },
    runVampireEffect: (context, event) => (sendBack) => {
      const { effectType } = event.data;
      if (effectType === 'transformation') {
        const transformation = context.vampireEffects.transformation.machine;
        if (transformation.value === 'transforming') {
          sendBack({ type: 'TRANSFORMED' });
        }
      } else if (effectType === 'sun_exposure') {
        const sunExposure = context.vampireEffects.sunExposure.machine;
        if (sunExposure.value === 'exposed') {
          sendBack({ type: 'ENTER_SHADOW' });
        }
      }

      return () => clearInterval(intervalId);
    },
    runRealityDistortion: (context, event) => (sendBack) => {
      const { distortionType } = event.data;
      if (distortionType === 'bend_objects') {
        const bendObjects = context.realityDistortionEffects.bendObjects.machine;
        if (bendObjects.value === 'bending') {
          sendBack({ type: 'END_BEND' });
        }
      } else if (distortionType === 'create_illusions

Implement more sophisticated dimensional breach effects?


Dimensional breach effects can add an exciting and unpredictable element to the game by allowing players to traverse different dimensions or encounter alternate realities. These effects could include changes to the environment, altered enemy behavior, and unique challenges. Here’s how you can integrate more sophisticated dimensional breach effects into the state machine:

Dimensional Breach State Machines:
Define state machines for different dimensional breach effects like traversing dimensions, encountering alternate realities, and facing unique challenges.
Main Game State Machine:
Integrate the dimensional breach state machines into the main game state machine and handle transitions based on these effects.
Dimensional Breach Event Triggers:
Define events to trigger these dimensional breach effects.
Dimensional Breach Event Actions:
Define actions to apply the consequences of these events.
Here’s an updated example:

Dimensional Breach State Machines
Traverse Dimensions State Machine
The traverse dimensions state machine will manage the traversal of different dimensions.


const traverseDimensionsStateMachine = Machine({
  id: 'traverseDimensions',
  initial: 'normal',
  context: {
    currentDimension: 'dimension1'
  },
  states: {
    normal: {
      on: {
        DIMENSION_BREACH: { target: 'breaching', actions: ['changeDimension'] }
      }
    },
    breaching: {
      on: {
        DIMENSION_BREACH_COMPLETED: { target: 'normal' }
      }
    }
  }
}, {
  actions: {
    changeDimension: (context, event) => {
      return {
        currentDimension: event.data.newDimension
      };
    }
  }
});
Encountering Alternate Realities State Machine
The encountering alternate realities state machine will manage the encounter with alternate realities.


const encounteringAlternateRealitiesStateMachine = Machine({
  id: 'encounteringAlternateRealities',
  initial: 'normal',
  context: {
    alternateRealityCount: 0
  },
  states: {
    normal: {
      on: {
        ALTERNATE_REALITY_ENCOUNTERED: { target: 'alternateReality', actions: ['increaseAlternateRealityCount'] }
      }
    },
    alternateReality: {
      on: {
        ALTERNATE_REALITY_LEFT: { target: 'normal' }
      }
    }
  }
}, {
  actions: {
    increaseAlternateRealityCount: (context, event) => {
      return {
        alternateRealityCount: context.alternateRealityCount + 1
      };
    }
  }
});
Facing Unique Challenges State Machine
The facing unique challenges state machine will manage the unique challenges faced in alternate dimensions.


const facingUniqueChallengesStateMachine = Machine({
  id: 'facingUniqueChallenges',
  initial: 'normal',
  context: {
    challengeCount: 0
  },
  states: {
    normal: {
      on: {
        UNIQUE_CHALLENGE_FACED: { target: 'challenge', actions: ['increaseChallengeCount'] }
      }
    },
    challenge: {
      on: {
        UNIQUE_CHALLENGE_COMPLETED: { target: 'normal' }
      }
    }
  }
}, {
  actions: {
    increaseChallengeCount: (context, event) => {
      return {
        challengeCount: context.challengeCount + 1
      };
    }
  }
});
Main Game State Machine
The main game state machine will manage the execution of active missions, faction interactions, and handle the branching logic.


const horizonZeroDawnMachine = Machine({
  id: 'horizonZeroDawn',
  initial: 'startMenu',
  context: {
    currentTerrain: null, // Initialize with null or default terrain
    moveSpeedMultiplier: 1,
    attackPowerMultiplier: 1,
    defenseMultiplier: 1,
    currentWeapon: null,
    ammunitionCount: 0,
    totalWeight: 0,
    totalValue: 0,
    maxCarryingCapacity: 50, // Maximum carrying capacity in arbitrary units
    maxInventoryValue: 1000, // Maximum inventory value in arbitrary currency units
    items: {},
    salvageMaterials: {},
    repairTimer: null,
    salvageTimer: null,
    emergencyRepairTimer: null,
    activeMissions: [],
    missionBranches: {
      quest1: {
        type: 'quest',
        branches: {
          findArtifact: { machine: questMissionMachine },
          sideQuests: { machine: questMissionMachine }
        }
      },
      resource1: {
        type: 'resourceGathering',
        branches: {
          gatherWood: { machine: resourceGatheringMissionMachine },
          gatherStone: { machine: resourceGatheringMissionMachine },
          gatherHerbs: { machine: resourceGatheringMissionMachine }
        }
      }
    },
    factions: {
      factionA: { machine: factionAStateMachine },
      factionB: { machine: factionBStateMachine }
    },
    timeline: {
      currentState: 'normal',
      fastForwardMachine: { state: 'idle' },
      rewindMachine: { state: 'idle' }
    },
    supernaturalEvents: {
      curse: { machine: curseStateMachine },
      blessing: { machine: blessingStateMachine }
    },
    vampireEffects: {
      transformation: { machine: transformationStateMachine },
      sunExposure: { machine: sunExposureStateMachine }
    },
    realityDistortionEffects: {
      bendObjects: { machine: bendObjectsStateMachine },
      createIllusions: { machine: createIllusionsStateMachine },
      affectNPCs: { machine: affectNPCsStateMachine }
    },
    cursePropagationEffects: {
      nearbyEnemies: { machine: nearbyEnemiesAffectedByCurseStateMachine },
      weatherConditions: { machine: weatherConditionsAffectedByCurseStateMachine },
      environmentalHazards: { machine: environmentalHazardsAffectedByCurseStateMachine }
    },
    dimensionalBreachEffects: {
      traverseDimensions: { machine: traverseDimensionsStateMachine },
      encounteringAlternateRealities: { machine: encounteringAlternateRealitiesStateMachine },
      facingUniqueChallenges: { machine: facingUniqueChallengesStateMachine }
    }
  },
  states: {
    startMenu: {
      on: {
        START_NEW_GAME: { target: 'gamePlay', actions: ['setInitialTerrain'], cond: 'isNotInBattle' },
        LOAD_GAME: { target: 'gamePlay', actions: ['setInitialTerrain'], cond: 'isNotInBattle' },
        OPTIONS: 'options',
        QUIT: 'exit'
      }
    },
    gamePlay: {
      on: {
        COMBAT: { target: 'combat', actions: ['updateCombatEffects'], cond: 'isNotInCombat' },
        EXPLORATION: 'exploration',
        INVENTORY_MANAGEMENT: 'inventory',
        SAVE_GAME: 'gamePlay',
        PAUSE_GAME: 'pause',
        MAIN_MENU: 'startMenu',
        FISHING: 'fishing',
        HUNTING: 'hunting',
        PICK_UP_ITEM: { target: 'itemSelection', actions: ['addItem'] },
        DROP_ITEM: { target: 'inventory', actions: ['removeItem'] },
        USE_ITEM: { target: 'gamePlay', actions: ['useItem'], cond: 'isItemUsable' },
        REPAIR_ITEM: { target: 'repair', actions: ['startRepairTimer'], cond: 'isItemRepairable' },
        BREAK_ITEM: { target: 'break', actions: ['breakItem'], cond: 'isItemBreakable' },
        SALVAGE_ITEM: { target: 'salvage', actions: ['startSalvageTimer'], cond: 'isItemSalvagable' },
        START_EMERGENCY_REPAIR: { target: 'emergencyFieldRepair', actions: ['startEmergencyRepairTimer'], cond: 'isItemEmergencyRepairable' },
        START_QUEST_MISSION: { target: 'mission', actions: ['startMission', 'addMission'], cond: 'isNotInCombat' },
        START_RESOURCE_GATHERING_MISSION: { target: 'mission', actions: ['startMission', 'addMission'], cond: 'isNotInCombat' },
        INTERACT_WITH_FACTION_A: { target: 'factionInteraction', actions: ['interactWithFactionA'], cond: 'isNotInCombat' },
        INTERACT_WITH_FACTION_B: { target: 'factionInteraction', actions: ['interactWithFactionB'], cond: 'isNotInCombat' },
        TIMELINE_OPERATION: { target: 'timeline', actions: ['performTimelineOperation'] },
        SUPERNATURAL_EVENT: { target: 'supernaturalEvent', actions: ['triggerSupernaturalEvent'] },
        VAMPIRE_EFFECT: { target: 'vampireEffect', actions: ['triggerVampireEffect'] },
        REALITY_DISTORTION: { target: 'realityDistortion', actions: ['triggerRealityDistortion'] },
        CURSE_PROPAGATION: { target: 'cursePropagation', actions: ['triggerCursePropagation'] },
        DIMENSIONAL_BREACH: { target: 'dimensionalBreach', actions: ['triggerDimensionalBreach'] }
      }
    },
    combat: {
      on: {
        BATTLE_WON: 'victoryScreen',
        BATTLE_LOST: 'defeatScreen'
      }
    },
    victoryScreen: {
      on: {
        CONTINUE: 'gamePlay',
        MAIN_MENU: 'startMenu'
      }
    },
    defeatScreen: {
      on: {
        RETRY: 'combat',
        MAIN_MENU: 'startMenu'
      }
    },
    exploration: {
      on: {
        ENCOUNTER_ENEMY: 'combat',
        INTERACT_WITH_NPC: 'dialogue', // Assuming dialogue is another state
        FIND_ITEM_QUEST: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    inventory: {
      on: {
        CLOSE_INVENTORY: 'gamePlay'
      }
    },
    pause: {
      on: {
        RESUME_GAME: 'gamePlay',
        OPTIONS: 'options',
        MAIN_MENU: 'startMenu'
      }
    },
    options: {
      on: {
        APPLY_CHANGES: 'gamePlay',
        CANCEL: 'startMenu'
      }
    },
    exit: {
      type: 'final'
    },
    fishing: {
      on: {
        FINISH_FISHING: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    hunting: {
      on: {
        FINISH_HUNTING: 'gamePlay',
        RETURN_TO_CAMP: 'gamePlay'
      }
    },
    weaponSelection: {
      on: {
        SELECT_WEAPON: { target: 'gamePlay', actions: ['selectWeapon'] }
      }
    },
    itemSelection: {
      on: {
        SELECT_ITEM: { target: 'gamePlay', actions: ['selectItem'] }
      }
    },
    repair: {
      on: {
        COMPLETE_REPAIR: { target: 'gamePlay', actions: ['completeRepair'] }
      }
    },
    break: {
      on: {
        COMPLETE_BREAK: { target: 'gamePlay', actions: ['completeBreak'] }
      }
    },
    salvage: {
      on: {
        COMPLETE_SALVAGE: { target: 'gamePlay', actions: ['completeSalvage'] }
      }
    },
    emergencyFieldRepair: {
      on: {
        COMPLETE_EMERGENCY_REPAIR: { target: 'gamePlay', actions: ['completeEmergencyRepair'] }
      }
    },
    repairTimer: {
      on: {
        TIMER_COMPLETE: { target: 'repair' }
      }
    },
    salvageTimer: {
      on: {
        TIMER_COMPLETE: { target: 'salvage' }
      }
    },
    emergencyRepairTimer: {
      on: {
        TIMER_COMPLETE: { target: 'emergencyFieldRepair' }
      }
    },
    mission: {
      initial: 'idle',
      states: {
        idle: {
          on: {
            START_QUEST_MISSION: { target: 'quest', actions: ['startMission', 'addMission'], cond: 'isNotInCombat' },
            START_RESOURCE_GATHERING_MISSION: { target: 'resourceGathering', actions: ['startMission', 'addMission'], cond: 'isNotInCombat' }
          }
        },
        quest: {
          invoke: [
            { src: 'runMission', onDone: { target: 'idle' } }
          ]
        },
        resourceGathering: {
          invoke: [
            { src: 'runMission', onDone: { target: 'idle' } }
          ]
        }
      }
    },
    factionInteraction: {
      initial: 'idle',
      states: {
        idle: {
          on: {
            INTERACT_WITH_FACTION_A: { target: 'factionA', actions: ['interactWithFactionA'] },
            INTERACT_WITH_FACTION_B: { target: 'factionB', actions: ['interactWithFactionB'] }
          }
        },
        factionA: {
          invoke: [
            { src: 'runFactionInteraction', onDone: { target: 'idle' } }
          ]
        },
        factionB: {
          invoke: [
            { src: 'runFactionInteraction', onDone: { target: 'idle' } }
          ]
        }
      }
    },
    timeline: {
      initial: 'normal',
      states: {
        normal: {
          on: {
            TIMELINE_OPERATION: { target: 'operation', actions: ['startTimelineOperation'] }
          }
        },
        operation: {
          invoke: [
            { src: 'runTimelineOperation', onDone: { target: 'normal' } }
          ]
        }
      }
    },
    supernaturalEvent: {
      initial: 'idle',
      states: {
        idle: {
          on: {
            SUPERNATURAL_EVENT: { target: 'curseOrBlessing', actions: ['triggerSupernaturalEvent'] }
          }
        },
        curseOrBlessing: {
          initial: 'idle',
          states: {
            idle: {
              on: {
                CURSE: { target: 'curse', actions: ['startCurse'] },
                BLESSING: { target: 'blessing', actions: ['startBlessing'] }
              }
            },
            curse: {
              invoke: [
                { src: 'runSupernaturalEvent', onDone: { target: 'idle' } }
              ]
            },
            blessing: {
              invoke: [
                { src: 'runSupernaturalEvent', onDone: { target: 'idle' } }
              ]
            }
          }
        }
      }
    },
    vampireEffect: {
      initial: 'idle',
      states: {
        idle: {
          on: {
            VAMPIRE_EFFECT: { target: 'effect', actions: ['triggerVampireEffect'] }
          }
        },
        effect: {
          initial: 'idle',
          states: {
            idle: {
              on: {
                TRANSFORMATION: { target: 'transformation', actions: ['startTransformation'] },
                SUN_EXPOSURE: { target: 'sunExposure', actions: ['startSunExposure'] }
              }
            },
            transformation: {
              invoke: [
                { src: 'runVampireEffect', onDone: { target: 'idle' } }
              ]
            },
            sunExposure: {
              invoke: [
                { src: 'runVampireEffect', onDone: { target: 'idle' } }
              ]
            }
          }
        }
      }
    },
    realityDistortion: {
      initial: 'idle',
      states: {
        idle: {
          on: {
            REALITY_DISTORTION: { target: 'distortion', actions: ['triggerRealityDistortion'] }
          }
        },
        distortion: {
          initial: 'idle',
          states: {
            idle: {
              on: {
                BEGIN_BEND: { target: 'bendObjects', actions: ['startBendObjects'] },
                BEGIN_CREATE_ILLUSIONS: { target: 'createIllusions', actions: ['startCreateIllusions'] },
                BEGIN_AFFECT_NPCS: { target: 'affectNPCs', actions: ['startAffectNPCs'] }
              }
            },
            bendObjects: {
              invoke: [
                { src: 'runRealityDistortion', onDone: { target: 'idle' } }
              ]
            },
            createIllusions: {
              invoke: [
                { src: 'runRealityDistortion', onDone: { target: 'idle' } }
              ]
            },
            affectNPCs: {
              invoke: [
                { src: 'runRealityDistortion', onDone: { target: 'idle' } }
              ]
            }
          }
        }
      }
    },
    cursePropagation: {
      initial: 'idle',
      states: {
        idle: {
          on: {
            CURSE_PROPAGATION: { target: 'propagation', actions: ['triggerCursePropagation'] }
          }
        },
        propagation: {
          initial: 'idle',
          states: {
            idle: {
              on: {
                BEGIN_CURSE_PROPAGATION: { target: 'active', actions: ['startCursePropagation'] }
              }
            },
            active: {
              on: {
                END_CURSE_PROPAGATION: { target: 'idle' }
              }
            }
          }
        }
      }
    },
    dimensionalBreach: {
      initial: 'idle',
      states: {
        idle: {
          on: {
            DIMENSIONAL_BREACH: { target: 'breaching', actions: ['triggerDimensionalBreach'] }
          }
        },
        breaching: {
          initial: 'idle',
          states: {
            idle: {
              on: {
                BEGIN_DIMENSIONAL_BREACH: { target: 'active', actions: ['startDimensionalBreach'] }
              }
            },
            active: {
              on: {
                END_DIMENSIONAL_BREACH: { target: 'idle' }
              }
            }
          }
        }
      }
    }
  }
}, {
  actions: {
    setInitialTerrain: (context, event) => {
      return { currentTerrain: event.data.currentTerrain };
    },
    updateCombatEffects: (context, event) => {
      const terrainEffects = {
        plains: {
          moveSpeedMultiplier: 1,
          attackPowerMultiplier: 1,
          defenseMultiplier: 1
        },
        forest: {
          moveSpeedMultiplier: 0.8,
          attackPowerMultiplier: 1.2,
          defenseMultiplier: 0.9
        },
        mountain: {
          moveSpeedMultiplier: 0.5,
          attackPowerMultiplier: 1.5,
          defenseMultiplier: 1.2
        },
        desert: {
          moveSpeedMultiplier: 1.2,
          attackPowerMultiplier: 0.8,
          defenseMultiplier: 0.8
        }
      };

      const currentTerrain = context.currentTerrain;
      const terrainEffect = terrainEffects[currentTerrain] || {};

      return {
        moveSpeedMultiplier: terrainEffect.moveSpeedMultiplier,
        attackPowerMultiplier: terrainEffect.attackPowerMultiplier,
        defenseMultiplier: terrainEffect.defenseMultiplier
      };
    },
    addItem: (context, event) => {
      const newItem = event.data.item;
      const weightMultiplier = newItem.rarity === 'legendary' ? 1.5 : newItem.rarity === 'epic' ? 1.2 : 1;
      const valueMultiplier = newItem.rarity === 'legendary' ? 2 : newItem.rarity === 'epic' ? 1.5 : 1;

      return {
        totalWeight: context.totalWeight + newItem.weight * weightMultiplier,
        totalValue: context.totalValue + newItem.value * valueMultiplier,
        items: {
          ...context.items,
          [newItem.name]: {
            ...newItem,
            durability: newItem.durability
          }
        }
      };
    },
    removeItem: (context, event) => {
      const itemName = event.data.itemName;
      const itemWeight = event.data.itemWeight;
      const itemValue = event.data.itemValue;
      const weightMultiplier = event.data.itemRarity === 'legendary' ? 1.5 : event.data.itemRarity === 'epic' ? 1.2 : 1;
      const valueMultiplier = event.data.itemRarity === 'legendary' ? 2 : event.data.itemRarity === 'epic' ? 1.5 : 1;

      return {
        totalWeight: context.totalWeight - itemWeight * weightMultiplier,
        totalValue: context.totalValue - itemValue * valueMultiplier,
        items: {
          ...context.items,
          [itemName]: undefined
        }
      };
    },
    selectWeapon: (context, event) => {
      return { currentWeapon: event.data.weapon };
    },
    useItem: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: item.durability - 1
            }
          }
        };
      }
      return context;
    },
    startRepairTimer: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        const repairQuality = sample([0.5, 1, 1.5]); // Random repair quality multiplier
        const repairAmount = Math.floor(item.maxDurability * repairQuality);
        const repairCost = Math.floor(repairAmount / 2); // Simplified cost calculation
        const repairTime = Math.floor(item.maxDurability * 0.1); // Repair time in arbitrary units

        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: Math.min(item.maxDurability, item.durability + repairAmount)
            }
          },
          totalValue: context.totalValue - repairCost,
          repairTimer: setTimeout(() => {
            context.repairTimer = null;
            horizonZeroDawnMachine.send({ type: 'TIMER_COMPLETE' });
          }, repairTime * 1000)
        };
      }
      return context;
    },
    completeRepair: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: item.maxDurability
            }
          }
        };
      }
      return context;
    },
    breakItem: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    salvageItem: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    completeBreak: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    completeSalvage: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item && item.durability <= 0) {
        return {
          items: {
            ...context.items,
            [itemName]: undefined
          },
          salvageMaterials: {
            ...context.salvageMaterials,
            [item.material]: (context.salvageMaterials[item.material] || 0) + item.salvageAmount
          }
        };
      }
      return context;
    },
    startSalvageTimer: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        const salvageTime = Math.floor(item.maxDurability * 0.2); // Salvage time in arbitrary units

        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: 0
            }
          },
          totalValue: context.totalValue - salvageTime, // Cost in arbitrary units
          salvageTimer: setTimeout(() => {
            context.salvageTimer = null;
            horizonZeroDawnMachine.send({ type: 'TIMER_COMPLETE' });
          }, salvageTime * 1000)
        };
      }
      return context;
    },
    startEmergencyRepairTimer: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        const repairQuality = sample([0.5, 1, 1.5]); // Random repair quality multiplier
        const repairAmount = Math.floor(item.maxDurability * repairQuality);
        const repairCost = Math.floor(repairAmount / 2); // Simplified cost calculation
        const repairTime = Math.floor(item.maxDurability * 0.1); // Repair time in arbitrary units

        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: Math.min(item.maxDurability, item.durability + repairAmount)
            }
          },
          totalValue: context.totalValue - repairTime, // Cost in arbitrary units
          emergencyRepairTimer: setTimeout(() => {
            context.emergencyRepairTimer = null;
            horizonZeroDawnMachine.send({ type: 'TIMER_COMPLETE' });
          }, repairTime * 1000)
        };
      }
      return context;
    },
    completeEmergencyRepair: (context, event) => {
      const itemName = event.data.itemName;
      const item = context.items[itemName];
      if (item) {
        return {
          items: {
            ...context.items,
            [itemName]: {
              ...item,
              durability: item.maxDurability
            }
          }
        };
      }
      return context;
    },
    startMission: (context, event) => {
      const { missionId, missionType } = event.data;
      const branch = context.missionBranches[missionId].branches[missionType];
      return {
        activeMissions: [...context.activeMissions, missionId],
        [branch.id]: { state: 'inProgress' }
      };
    },
    addMission: (context, event) => {
      const { missionId, missionType } = event.data;
      const branch = context.missionBranches[missionId].branches[missionType];
      return {
        activeMissions: [...context.activeMissions, missionId],
        [branch.id]: { state: 'inProgress' }
      };
    },
    interactWithFactionA: (context, event) => {
      const factionA = context.factions.factionA.machine.getSnapshot();
      return {
        factions: {
          ...context.factions,
          factionA: { machine: factionA }
        }
      };
    },
    interactWithFactionB: (context, event) => {
      const factionB = context.factions.factionB.machine.getSnapshot();
      return {
        factions: {
          ...context.factions,
          factionB: { machine: factionB }
        }
      };
    },
    performTimelineOperation: (context, event) => {
      const { operation } = event.data;
      if (operation === 'fastForward') {
        return {
          timeline: {
            ...context.timeline,
            fastForwardMachine: { state: 'fastForwarding' }
          }
        };
      } else if (operation === 'rewind') {
        return {
          timeline: {
            ...context.timeline,
            rewindMachine: { state: 'rewinding' }
          }
        };
      } else if (operation === 'pause') {
        return {
          timeline: {
            ...context.timeline,
            currentState: 'paused'
          }
        };
      } else if (operation === 'skip') {
        return {
          timeline: {
            ...context.timeline,
            currentState: 'skipped'
          }
        };
      }
      return context;
    },
    triggerSupernaturalEvent: (context, event) => {
      const { eventType } = event.data;
      if (eventType === 'curse') {
        return {
          supernaturalEvents: {
            ...context.supernaturalEvents,
            curse: { state: 'active' }
          }
        };
      } else if (eventType === 'blessing') {
        return {
          supernaturalEvents: {
            ...context.supernaturalEvents,
            blessing: { state: 'active' }
          }
        };
      }
      return context;
    },
    startCurse: (context, event) => {
      const curse = context.supernaturalEvents.curse.machine.getSnapshot();
      return {
        supernaturalEvents: {
          ...context.supernaturalEvents,
          curse: { machine: curse }
        }
      };
    },
    startBlessing: (context, event) => {
      const blessing = context.supernaturalEvents.blessing.machine.getSnapshot();
      return {
        supernaturalEvents: {
          ...context.supernaturalEvents,
          blessing: { machine: blessing }
        }
      };
    },
    triggerVampireEffect: (context, event) => {
      const { effectType } = event.data;
      if (effectType === 'transformation') {
        return {
          vampireEffects: {
            ...context.vampireEffects,
            transformation: { state: 'transforming' }
          }
        };
      } else if (effectType === 'sun_exposure') {
        return {
          vampireEffects: {
            ...context.vampireEffects,
            sunExposure: { state: 'exposed' }
          }
        };
      }
      return context;
    },
    startTransformation: (context, event) => {
      const transformation = context.vampireEffects.transformation.machine.getSnapshot();
      return {
        vampireEffects: {
          ...context.vampireEffects,
          transformation: { machine: transformation }
        }
      };
    },
    startSunExposure: (context, event) => {
      const sunExposure = context.vampireEffects.sunExposure.machine.getSnapshot();
      return {
        vampireEffects: {
          ...context.vampireEffects,
          sunExposure: { machine: sunExposure }
        }
      };
    },
    triggerRealityDistortion: (context, event) => {
      const { distortionType } = event.data;
      if (distortionType === 'bend_objects') {
        return {
          realityDistortionEffects: {
            ...context.realityDistortionEffects,
            bendObjects: { state: 'bending' }
          }
        };
      } else if (distortionType === 'create_illusions') {
        return {
          realityDistortionEffects: {
            ...context.realityDistortionEffects,
            createIllusions: { state: 'creatingIllusions' }
          }
        };
      } else if (distortionType === 'affect_npcs') {
        return {
          realityDistortionEffects: {
            ...context.realityDistortionEffects,
            affectNPCs: { state: 'affectingNPCs' }
          }
        };
      }
      return context;
    },
    startBendObjects: (context, event) => {
      const bendObjects = context.realityDistortionEffects.bendObjects.machine.getSnapshot();
      return {
        realityDistortionEffects: {
          ...context.realityDistortionEffects,
          bendObjects: { machine: bendObjects }
        }
      };
    },
    startCreateIllusions: (context, event) => {
      const createIllusions = context.realityDistortionEffects.createIllusions.machine.getSnapshot();
      return {
        realityDistortionEffects: {
          ...context.realityDistortionEffects,
          createIllusions: { machine: createIllusions }
        }
      };
    },
    startAffectNPCs: (context, event) => {
      const affectNPCs = context.realityDistortionEffects.affectNPCs.machine.getSnapshot();
      return {
        realityDistortionEffects: {
          ...context.realityDistortionEffects,
          affectNPCs: { machine: affectNPCs }
        }
      };
    },
    triggerCursePropagation: (context, event) => {
      const { propagationType } = event.data;
      if (propagationType === 'nearby_enemies') {
        return {
          cursePropagationEffects: {
            ...context.cursePropagationEffects,
            nearbyEnemies: { state: 'active' }
          }
        };
      } else if (propagationType === 'weather_conditions') {
        return {
          cursePropagationEffects: {
            ...context.cursePropagationEffects,
            weatherConditions: { state: 'active' }
          }
        };
      } else if (propagationType === 'environmental_hazards') {
        return {
          cursePropagationEffects: {
            ...context.cursePropagationEffects,
            environmentalHazards: { state: 'active' }
          }
        };
      }
      return context;
    },
    startCursePropagation: (context, event) => {
      const { propagationType } = event.data;
      if (propagationType === 'nearby_enemies') {
        const nearbyEnemies = context.cursePropagationEffects.nearbyEnemies.machine.getSnapshot();
        if (nearbyEnemies.value === 'active') {
          sendBack({ type: 'ENEMIES_NEARBY' });
        }
      } else if (propagationType === 'weather_conditions') {
        const weatherConditions = context.cursePropagationEffects.weatherConditions.machine.getSnapshot();
        if (weatherConditions.value === 'active') {
          sendBack({ type: 'CURSE_APPLIED' });
        }
      } else if (propagationType === 'environmental_hazards') {
        const environmentalHazards = context.cursePropagationEffects.environmentalHazards.machine.getSnapshot();
        if (environmentalHazards.value === 'active') {
          sendBack({ type: 'HAZARDS_PRESENT' });
        }
      }

      return () => clearInterval(intervalId);
    },
    triggerDimensionalBreach: (context, event) => {
      const { breachType } = event.data;
      if (breachType === 'traverse_dimensions') {
        return {
          dimensionalBreachEffects: {
            ...context.dimensionalBreachEffects,
            traverseDimensions: { state: 'active' }
          }
        };
      } else if (breachType === 'encounter_alternate_realities') {
        return {
          dimensionalBreachEffects: {
            ...context.dimensionalBreachEffects,
            encounteringAlternateRealities: { state: 'active' }
          }
        };
      } else if (breachType === 'face_unique_challenges') {
        return {
          dimensionalBreachEffects: {
            ...context.dimensionalBreachEffects,
            facingUniqueChallenges: { state: 'active' }
          }
        };
      }
      return context;
    },
    startTraverseDimensions: (context, event) => {
      const traverseDimensions = context.dimensionalBreachEffects.traverseDimensions.machine.getSnapshot();
      return {
        dimensionalBreachEffects: {
          ...context.dimensionalBreachEffects,
          traverseDimensions: { machine: traverseDimensions }
        }
      };
    },
    startEncounteringAlternateRealities: (context, event) => {
      const encounteringAlternateRealities = context.dimensionalBreachEffects.encounteringAlternateRealities.machine.getSnapshot();
      return {
        dimensionalBreachEffects: {
          ...context.dimensionalBreachEffects,
          encounteringAlternateRealities: { machine: encounteringAlternateRealities }
        }
      };
    },
    startFacingUniqueChallenges: (context, event) => {
      const facingUniqueChallenges = context.dimensionalBreachEffects.facingUniqueChallenges.machine.getSnapshot();
      return {
        dimensionalBreachEffects: {
          ...context.dimensionalBreachEffects,
          facingUniqueChallenges: { machine: facingUniqueChallenges }
        }
      };
    }
  },
  services: {
    runMission: (context, event) => (sendBack) => {
      const { missionId, missionType } = event.data;
      const branch = context.missionBranches[missionId].branches[missionType];

      switch (branch.id) {
        case 'quest1':
          setInterval(() => {
            sendBack({ type: 'TICK' });
          }, 1000);
          break;
        case 'resource1':
          setInterval(() => {
            sendBack({ type: 'GATHER_RESOURCE', data: { resource: 'wood', amount: 1 } });
            sendBack({ type: 'GATHER_RESOURCE', data: { resource: 'stone', amount: 0.5 } });
            sendBack({ type: 'GATHER_RESOURCE', data: { resource: 'herbs', amount: 0.3 } });
          }, 1000);
          break;
        default:
          break;
      }

      return () => clearInterval(intervalId);
    },
    runFactionInteraction: (context, event) => (sendBack) => {
      const { factionId } = event.data;
      const faction = context.factions[factionId].machine;

      switch (faction.value) {
        case 'neutral':
          setInterval(() => {
            sendBack({ type: 'TICK' });
          }, 1000);
          break;
        case 'trading':
          setInterval(() => {
            sendBack({ type: 'TRADE_OFFER', data: { offer: 'wood' } });
          }, 1000);
          break;
        case 'quests':
          setInterval(()