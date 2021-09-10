import classNames from 'classnames';
import React from 'react';
import { useSlate } from 'slate-react';
import Icon from 'react-icons-kit';
import { TextStyle } from '../types';
import { toggleTextStyle, isTextStyleActive, isTextBlockActive, toggleTextBlock } from '../utils';

type Props = {
  textStyle?: TextStyle;
  format?: 'heading-one' | 'heading-two';
  icon: unknown;
};

const ToolbarTextStyleButton: React.FC<Props> = ({ textStyle, format, icon }: Props) => {
  const editor = useSlate();
  const isBlock = typeof format !== 'undefined';
  const isMarker = typeof textStyle !== 'undefined';

  const handleOnMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (isBlock) {
      toggleTextBlock(editor, format);
    }
    if (isMarker) {
      toggleTextStyle(editor, textStyle);
    }
  };

  if (isBlock) {
    return (
      <button
        type="button"
        className={classNames(
          'px-6 py-1 rounded hover:bg-purple-800 hover:text-white border border-purple-400',
          isTextBlockActive(editor, format)
            ? 'bg-purple-600 text-white'
            : 'border border-purple-400 text-purple-400'
        )}
        onMouseDown={handleOnMouseDown}
      >
        <Icon icon={icon} />
      </button>
    );
  }

  return (
    <button
      type="button"
      className={classNames(
        'px-6 py-1 rounded hover:bg-purple-500 hover:text-white border border-purple-400',
        isMarker && isTextStyleActive(editor, textStyle)
          ? 'bg-purple-400 text-white'
          : 'border border-purple-400 text-purple-400'
      )}
      onMouseDown={handleOnMouseDown}
    >
      <Icon icon={icon} />
    </button>
  );
};

ToolbarTextStyleButton.defaultProps = {
  textStyle: undefined,
  format: undefined,
};

export default ToolbarTextStyleButton;
