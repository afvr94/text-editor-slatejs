import React from 'react';
import { RenderElementProps, DefaultElement } from 'slate-react';
import CheckListItemElement from './CheckListItemElement';
import { ElementType } from '../types';

const Element: React.FC<RenderElementProps> = (props: RenderElementProps) => {
  const { attributes, children, element } = props;
  switch (element.type) {
    case ElementType.PARAGRAPH: {
      return <p {...attributes}>{children}</p>;
    }
    case ElementType.HEADING_ONE: {
      return (
        <h1 className="text-3xl font-bold" {...attributes}>
          {children}
        </h1>
      );
    }
    case ElementType.HEADING_TWO: {
      return (
        <h2 className="text-2xl font-bold" {...attributes}>
          {children}
        </h2>
      );
    }
    case ElementType.HEADING_THREE: {
      return (
        <h3 className="text-xl font-semibold" {...attributes}>
          {children}
        </h3>
      );
    }
    case ElementType.HEADING_FOUR: {
      return (
        <h4 className="text-lg font-semibold" {...attributes}>
          {children}
        </h4>
      );
    }
    case ElementType.CHECK_LIST_ITEM: {
      return <CheckListItemElement {...props} />;
    }
    default: {
      return <DefaultElement {...props} />;
    }
  }
};

export default Element;
