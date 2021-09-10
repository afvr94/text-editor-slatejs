import { BaseEditor, BaseSelection } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';

export type CustomEditor = BaseEditor &
  ReactEditor &
  HistoryEditor & { savedSelection: BaseSelection };

export enum ElementType {
  HEADING_ONE = 'heading-one',
  HEADING_TWO = 'heading-two',
  HEADING_THREE = 'heading-three',
  HEADING_FOUR = 'heading-four',
  PARAGRAPH = 'paragraph',
  CHECK_LIST_ITEM = 'check-list-item',
}
export type TextBlockType = `${ElementType}`;

export enum TextStyleType {
  BOLD = 'bold',
  ITALIC = 'italic',
  CODE = 'code',
  UNDERLINE = 'underline',
}

export type TextStyle = `${TextStyleType}`;

export type FormattedText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  code?: boolean;
  underline?: boolean;
};

export type CustomText = FormattedText;

export type ParagraphElement = {
  type: `${ElementType.PARAGRAPH}`;
  children: CustomText[];
};

export type HeadingOneElement = {
  type: `${ElementType.HEADING_ONE}`;
  children: CustomText[];
};

export type HeadingTwoElement = {
  type: `${ElementType.HEADING_TWO}`;
  children: CustomText[];
};

export type HeadingThreeElement = {
  type: `${ElementType.HEADING_THREE}`;
  children: CustomText[];
};

export type HeadingFourElement = {
  type: `${ElementType.HEADING_FOUR}`;
  children: CustomText[];
};

export type CheckListElement = {
  type: `${ElementType.CHECK_LIST_ITEM}`;
  checked: boolean;
  children: CustomText[];
};

export type CustomElement =
  | ParagraphElement
  | HeadingTwoElement
  | HeadingOneElement
  | HeadingThreeElement
  | HeadingFourElement
  | CheckListElement;

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
