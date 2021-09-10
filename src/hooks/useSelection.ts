import { useCallback, useState } from 'react';
import areEqual from 'deep-equal';
import { BaseSelection } from 'slate';
import { CustomEditor } from '../types';

const useSelection = (
  editor: CustomEditor
): [BaseSelection, (selection: BaseSelection) => void] => {
  const [selection, setSelection] = useState(editor.selection);
  const setSelectionOptimized = useCallback(
    (newSelection) => {
      // don't rerender component if selection is same
      if (areEqual(selection, newSelection)) {
        return;
      }
      setSelection(newSelection);
    },
    [setSelection, selection]
  );

  return [selection, setSelectionOptimized];
};

export default useSelection;
