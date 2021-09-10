import { Editor, Element as SlateElement, Transforms, Range } from 'slate';
import { TextStyle, TextBlockType, CustomEditor } from './types';

export const isTextStyleActive = (editor: Editor, mark: TextStyle): boolean => {
  const marks = Editor.marks(editor);
  return marks ? marks[mark] === true : false;
};

export const toggleTextStyle = (editor: Editor, mark: TextStyle): void => {
  const isActive = isTextStyleActive(editor, mark);

  if (isActive) {
    Editor.removeMark(editor, mark);
    return;
  }

  Editor.addMark(editor, mark, true);
};

export const getTextBlock = (editor: CustomEditor): TextBlockType | 'multiple' | null => {
  const { selection } = editor;

  if (!selection) {
    return null;
  }

  const [start, end] = Range.edges(selection);

  let startTopLevelBlockIndex = start.path[0];
  const endTopLevelBlockIndex = end.path[0];

  let blockType = null;
  while (startTopLevelBlockIndex <= endTopLevelBlockIndex) {
    const [node] = Editor.node(editor, [startTopLevelBlockIndex]);
    if (blockType === null && SlateElement.isElement(node)) {
      blockType = node.type;
    } else if (SlateElement.isElement(node) && blockType !== node.type) {
      return 'multiple';
    }
    startTopLevelBlockIndex += 1;
  }

  return blockType;
};

export const isTextBlockActive = (editor: Editor, blockType: string): boolean => {
  const nodes = Editor.nodes(editor, {
    match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === blockType,
  });
  return !!nodes.next().value;
};

export const toggleTextBlock = (editor: Editor, blockType: TextBlockType): void => {
  const currentBlockType = getTextBlock(editor);
  const newBlockType = currentBlockType === blockType ? 'paragraph' : blockType;
  Transforms.setNodes(
    editor,
    { type: newBlockType },
    { at: editor.selection || undefined, match: (n) => Editor.isBlock(editor, n) }
  );
};
