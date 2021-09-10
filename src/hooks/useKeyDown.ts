import { useCallback, KeyboardEvent } from 'react';
import isHotkey from 'is-hotkey';
import { CustomEditor } from '../types';
import { toggleTextStyle } from '../utils';

const useKeyDown = (
  editor: CustomEditor
): [onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void] => {
  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (isHotkey('mod+b', event)) {
        toggleTextStyle(editor, 'bold');
        return;
      }
      if (isHotkey('mod+i', event)) {
        toggleTextStyle(editor, 'italic');
        return;
      }
      if (isHotkey('mod+c', event)) {
        toggleTextStyle(editor, 'code');
        return;
      }
      if (isHotkey('mod+u', event)) {
        toggleTextStyle(editor, 'underline');
      }
    },
    [editor]
  );
  return [onKeyDown];
};

export default useKeyDown;
