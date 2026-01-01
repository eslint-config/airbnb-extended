import type { InitialReturnValue } from 'prompts';

// Handle Sigterm function

export type HandleSigTerm = () => void;

// On Prompt State function

interface PromptStateProps {
  value: InitialReturnValue;
  aborted: boolean;
  exited: boolean;
}

export type PromptState = (state: PromptStateProps) => void;

// On Cancel function

export type OnCancel = () => void;

// Run Function Catch Block

export type Exit = (error: Error) => void;
