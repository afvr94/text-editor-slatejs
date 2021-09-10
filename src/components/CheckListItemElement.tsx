import React from 'react';
import { Element as SlateElement, Transforms } from 'slate';
import { ReactEditor, useSlateStatic, RenderElementProps } from 'slate-react';
import { CheckListElement } from '../types';

const CheckListItemElement: React.FC<RenderElementProps> = ({
  attributes,
  children,
  element,
}: RenderElementProps) => {
  const editor = useSlateStatic();
  const { checked } = element as CheckListElement;
  return (
    <div {...attributes} className="flex items-center">
      <span contentEditable={false} className="mr-3">
        <input
          type="checkbox"
          checked={checked}
          onChange={(event) => {
            const path = ReactEditor.findPath(editor, element);
            const newProperties: Partial<SlateElement> = {
              checked: event.target.checked,
            };
            Transforms.setNodes(editor, newProperties, { at: path });
          }}
        />
      </span>
      <span contentEditable suppressContentEditableWarning className="flex-1">
        {children}
      </span>
    </div>
  );
};

export default CheckListItemElement;
