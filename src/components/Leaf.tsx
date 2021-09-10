import classNames from 'classnames';
import React from 'react';
import { RenderLeafProps } from 'slate-react';

const Leaf: React.FC<RenderLeafProps> = ({ leaf, attributes, children }: RenderLeafProps) => {
  return (
    <span
      {...attributes}
      className={classNames({
        'font-bold': leaf.bold,
        italic: leaf.italic,
        'font-mono p-1 bg-gray-300': leaf.code,
        underline: leaf.underline,
      })}
    >
      {children}
    </span>
  );
};

export default Leaf;
