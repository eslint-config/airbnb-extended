import { stripVTControlCharacters } from 'node:util';

import { describe, expect, it, vi } from 'vitest';

import { ExitError, mockProcessExit } from '@/tests/fixtures/cli';
import { exit, handleSigTerm, onCancel, onPromptState } from '@/utils';

describe('utils/functions', () => {
  describe('handleSigTerm', () => {
    it('exits with code 0', () => {
      mockProcessExit();

      expect(() => handleSigTerm()).toThrow(expect.objectContaining({ code: 0 }));
    });
  });

  describe('onPromptState', () => {
    it('does nothing while the prompt is active', () => {
      const exitSpy = mockProcessExit();
      const write = vi.spyOn(process.stdout, 'write').mockImplementation(() => true);

      onPromptState({ value: 'x', aborted: false, exited: false });

      expect(exitSpy).not.toHaveBeenCalled();
      expect(write).not.toHaveBeenCalled();
    });

    it('does nothing when the prompt is only exited', () => {
      const exitSpy = mockProcessExit();

      onPromptState({ value: 'x', aborted: false, exited: true });

      expect(exitSpy).not.toHaveBeenCalled();
    });

    it('shows the cursor again and exits with code 1 when aborted', () => {
      mockProcessExit();
      const write = vi.spyOn(process.stdout, 'write').mockImplementation(() => true);

      expect(() => onPromptState({ value: 'x', aborted: true, exited: false })).toThrow(
        expect.objectContaining({ code: 1 }),
      );

      expect(write).toHaveBeenNthCalledWith(1, '\u001B[?25h');
      expect(write).toHaveBeenNthCalledWith(2, '\n');
    });
  });

  describe('onCancel', () => {
    it('says goodbye and exits with code 1', () => {
      mockProcessExit();
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => onCancel()).toThrow(ExitError);
      expect(consoleError).toHaveBeenCalledWith('👋 Exiting, bye bye.');
    });
  });

  describe('exit', () => {
    it('names the failed command for a package-failed error', () => {
      const exitSpy = mockProcessExit();
      const log = vi.spyOn(console, 'log').mockImplementation(() => {});

      expect(() => exit(new Error('pnpm install -D eslint', { cause: 'package-failed' }))).toThrow(
        ExitError,
      );

      expect(exitSpy).toHaveBeenCalledWith(1);
      expect(log).toHaveBeenNthCalledWith(1, 'Aborting installation.');
      expect(stripVTControlCharacters(String(log.mock.calls[1]?.[0]))).toBe(
        'pnpm install -D eslint has failed.',
      );
    });

    it('asks to report a bug for any other error and prints the error', () => {
      mockProcessExit();
      const log = vi.spyOn(console, 'log').mockImplementation(() => {});
      const error = new Error('boom');

      expect(() => exit(error)).toThrow(ExitError);

      expect(log).toHaveBeenNthCalledWith(1, 'Aborting installation.');
      expect(stripVTControlCharacters(String(log.mock.calls[1]?.[0]))).toBe(
        'Unexpected error. Please report it as a bug:\n',
      );
      expect(log.mock.calls[1]?.[1]).toBe(error);
    });

    it('always exits with code 1', () => {
      const exitSpy = mockProcessExit();
      vi.spyOn(console, 'log').mockImplementation(() => {});

      expect(() => exit(new Error('x', { cause: 'other' }))).toThrow(ExitError);
      expect(exitSpy).toHaveBeenCalledWith(1);
    });
  });
});
