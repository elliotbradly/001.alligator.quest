
//WANT: FUNFOOT
import { setup, createMachine } from 'xstate'
export const FIRST_STEP = 'FIRST_STEP'
export const SECOND_STEP = 'SECOND_STEP'
export const THIRD_STEP = 'THIRD_STEP'

export const MAIN_MENU = 'MAIN_MENU'

export const CHARACTER_CREATION = 'CHARACTER_CREATION'
export const BACKGROUND_SELECTION = 'BACKGROUND_SELECTION'
export const BACKGROUND_SUGGESTION = 'BACKGROUND_SUGGESTION'
export const TALENT_SELECTION = 'TALENT_SELECTION'
export const SKILL_SELECTION = 'SKILL_SELECTION'
export const CHARACTER_REVIEW = 'CHARACTER_REVIEW'
export const CHARACTER_ACCEPT = 'CHARACTER_ACCEPT'

export const NEW_GAMING = "NEW_GAMING";
export const RESETTING = "RESETTING";
export const FORWARDING = "FORWARDING";
export const BACKWARDING = "BACKWARDING";


export const FINISH = "FINISH";


//FUNCTION TYPE

export const ENTRY = "ENTRY";
export const TRACK = "TRACK";
export const EXIT = "EXIT";
