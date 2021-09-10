import { Editor, Transforms, Range, Point, Element as SlateElement } from 'slate';
import { withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { CustomEditor, TextBlockType } from './types';

const Markdown: { [key: string]: TextBlockType } = {
  '#': 'heading-one',
  '##': 'heading-two',
  '###': 'heading-three',
  '####': 'heading-four',
};

const withShortcuts = (editor: CustomEditor): CustomEditor => {
  const { deleteBackward, insertText } = editor;

  // eslint-disable-next-line no-param-reassign
  editor.insertText = (text) => {
    const { selection } = editor;

    if (text === ' ' && selection && Range.isCollapsed(selection)) {
      const { anchor } = selection;
      const block = Editor.above(editor, {
        match: (n) => Editor.isBlock(editor, n),
      });
      const path = block ? block[1] : [];
      const start = Editor.start(editor, path);
      const range = { anchor, focus: start };
      const beforeText = Editor.string(editor, range);
      const type = Markdown[beforeText];

      if (type) {
        Transforms.select(editor, range);
        Transforms.delete(editor);
        const newProperties: Partial<SlateElement> = {
          type,
        };
        Transforms.setNodes(editor, newProperties, {
          match: (n) => Editor.isBlock(editor, n),
        });
        return;
      }
    }

    insertText(text);
  };

  // eslint-disable-next-line no-param-reassign
  editor.deleteBackward = (...args) => {
    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      const match = Editor.above(editor, {
        match: (n) => Editor.isBlock(editor, n),
      });

      if (match) {
        const [block, path] = match;
        const start = Editor.start(editor, path);

        if (
          !Editor.isEditor(block) &&
          SlateElement.isElement(block) &&
          block.type !== 'paragraph' &&
          Point.equals(selection.anchor, start)
        ) {
          const newProperties: Partial<SlateElement> = {
            type: 'paragraph',
          };
          Transforms.setNodes(editor, newProperties);

          return;
        }
      }

      deleteBackward(...args);
    }
  };

  return editor;
};

const withChecklists = (editor: CustomEditor): CustomEditor => {
  const { deleteBackward } = editor;

  // eslint-disable-next-line no-param-reassign
  editor.deleteBackward = (...args) => {
    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      const nodes = Editor.nodes(editor, {
        match: (n) =>
          !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'check-list-item',
      });
      const node = nodes.next();
      if (!node.done && Array.isArray(node.value)) {
        const [, path] = node.value;
        const start = Editor.start(editor, path);

        if (Point.equals(selection.anchor, start)) {
          const newProperties: Partial<SlateElement> = {
            type: 'paragraph',
          };
          Transforms.setNodes(editor, newProperties, {
            match: (n) =>
              !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'check-list-item',
          });
          return;
        }
      }
    }

    deleteBackward(...args);
  };

  return editor;
};

// Every new plugin must be added here
const plugins = [withReact, withHistory, withChecklists, withShortcuts];

const withPlugins = (editor: CustomEditor): CustomEditor => {
  // eslint-disable-next-line no-restricted-syntax
  for (const plugin in plugins) {
    if (typeof plugins[plugin] === 'function') {
      const pluginEditor = plugins[plugin](editor);
      if (pluginEditor === editor) {
        // eslint-disable-next-line no-param-reassign
        editor = pluginEditor;
      }
    }
  }
  return editor;
};

export default withPlugins;
