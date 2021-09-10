import React, { useState, useCallback, useEffect, KeyboardEvent } from 'react';
import { createEditor, Descendant } from 'slate';
import { Slate, Editable } from 'slate-react';
import withPlugins from './plugins';
import { Leaf, Element, Toolbar, CommandMenu } from './components';
import { useSelection, useKeyDown, useCommandMenu } from './hooks';

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

const App: React.FC = () => {
  const [editor] = useState(withPlugins(createEditor()));
  const [value, setValue] = useState<Descendant[]>(initialValue);
  const [cursorPosition, setCursorPosition] = useState<DOMRect | null>(null);
  const [isCommandMenuOpen, setIsCommandMenuOpen, checkKeyForMenu] = useCommandMenu();
  const [selection, setSelection] = useSelection(editor);
  const [onKeyDown] = useKeyDown(editor);

  useEffect(() => {
    // get cursor position for the command menu
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    setCursorPosition(sel.getRangeAt(0).getBoundingClientRect());
  }, [value]);

  const handleOnChange = useCallback(
    (_value: Descendant[]) => {
      setValue(_value);
      setSelection(editor.selection);
    },
    [editor.selection, setSelection]
  );

  // we need to handle the onBlur because when we use `react-select`
  // we loss focus of the editor and selection of the text
  const onBlur = useCallback(() => {
    editor.savedSelection = selection;
  }, [editor, selection]);

  const handleOnKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown(event);
    checkKeyForMenu(event);
  };

  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  return (
    <div className="flex h-full">
      <div className="flex items-center w-64 px-4 text-xl bg-gray-200">
        Here goes the page management
      </div>
      <div className="flex-grow px-32 py-24 bg-gray-100">
        <Slate editor={editor} value={value} onChange={handleOnChange}>
          <Toolbar />
          <Editable
            placeholder="Type '/' for commands"
            renderElement={renderElement}
            autoFocus
            renderLeaf={renderLeaf}
            className="mt-8"
            onKeyDown={handleOnKeyDown}
            onBlur={onBlur}
          />
          <CommandMenu
            cursorPosition={cursorPosition}
            isCommandMenuOpen={isCommandMenuOpen}
            setIsCommandMenuOpen={setIsCommandMenuOpen}
          />
        </Slate>
      </div>
    </div>
  );
};

export default App;
