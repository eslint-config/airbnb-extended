import { InitialReturnValue } from 'prompts';
import pc from 'picocolors';

// Handle Sigterm function

export const handleSigTerm = (): void => process.exit(0);

/**
 * On Prompt State function
 * @see https://github.com/vercel/next.js/blob/canary/packages/create-next-app/index.ts#L26C1-L38C2
 */

interface PromptStateProps {
  value: InitialReturnValue;
  aborted: boolean;
  exited: boolean;
}

export const onPromptState = (state: PromptStateProps): void => {
  if (state.aborted) {
    // If we don't re-enable the terminal cursor before exiting
    // the program, the cursor will remain hidden
    process.stdout.write('\u001B[?25h');
    process.stdout.write('\n');
    process.exit(1);
  }
};

/**
 * On Cancel function
 * User inputs Ctrl+C or Ctrl+D to exit the prompt. We should close the
 * process and not write to the file system.
 */
export const onCancel = (): void => {
  console.error('👋 Exiting, bye bye.');
  process.exit(1);
};

/**
 * Run Function Catch Block
 * @see https://github.com/vercel/next.js/blob/canary/packages/create-next-app/index.ts#L499
 */
export const exit = (error: Error): void => {
  console.log('Aborting installation.');

  if (error.cause === 'package-failed') {
    console.log(`${pc.red(error.message)} has failed.`);
  } else {
    console.log(`${pc.red('Unexpected error. Please report it as a bug:')}\n`, error);
  }

  process.exit(1);
};
