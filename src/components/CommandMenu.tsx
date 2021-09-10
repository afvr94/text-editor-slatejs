import React from 'react';
import ReactDOM from 'react-dom';
import { Transforms } from 'slate';
import { useSlate } from 'slate-react';

type Props = {
  isCommandMenuOpen: boolean;
  cursorPosition: DOMRect | null;
  setIsCommandMenuOpen: (isOpen: boolean) => void;
};

const CommandMenu: React.FC<Props> = ({
  cursorPosition,
  isCommandMenuOpen,
  setIsCommandMenuOpen,
}: Props) => {
  const editor = useSlate();

  const handleAddTodoList = () => {
    editor.deleteBackward('character');
    editor.insertBreak();
    Transforms.insertNodes(editor, [
      {
        type: 'check-list-item',
        children: [{ text: '' }],
        checked: false,
      },
    ]);
    editor.removeMark('/');
    setIsCommandMenuOpen(false);
  };

  const handleAddCode = () => {
    editor.deleteBackward('character');
    editor.insertBreak();
    Transforms.insertNodes(editor, [
      {
        type: 'paragraph',
        children: [{ text: '', code: true }],
      },
    ]);
    editor.removeMark('/');
    setIsCommandMenuOpen(false);
  };

  if (!isCommandMenuOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="w-72 absolute z-50 flex flex-col p-4 text-lg bg-gray-200 rounded-md shadow-sm"
      style={{
        left: cursorPosition ? cursorPosition.left + window.pageXOffset - 5 : -10000,
        top: cursorPosition ? cursorPosition.bottom + window.pageYOffset + 4 : -10000,
      }}
    >
      <p className="text-sm font-semibold text-gray-500 uppercase">Commands</p>
      <div className="my-2 -mx-4 border border-gray-300" />
      <button
        type="button"
        className="hover:bg-gray-300 p-2 text-left rounded"
        onClick={handleAddTodoList}
      >
        Todo list
      </button>
      <button
        type="button"
        className="hover:bg-gray-300 p-2 text-left rounded"
        onClick={handleAddCode}
      >
        Code block
      </button>
    </div>,
    document.body
  );
};

export default CommandMenu;
