import React, { useCallback, useMemo } from 'react';
import { useSlate } from 'slate-react';
import Select from 'react-select';
import { OptionTypeBase } from 'react-select/src/types';
import { Transforms } from 'slate';
import { getTextBlock, toggleTextBlock } from '../utils';
import { options, styles } from '../selectUtils';

const ToolbarTextBlockSelect: React.FC = () => {
  const editor = useSlate();

  const onChange = useCallback(
    (option: OptionTypeBase | null) => {
      if (option) {
        toggleTextBlock(editor, option.value);
      }
    },
    [editor]
  );

  const blockType = getTextBlock(editor);
  const selectedOption = useMemo(
    () => options.find((option) => option.value === blockType),
    [blockType]
  );

  return (
    <Select
      defaultValue={options[0]}
      isSearchable={false}
      options={options}
      styles={styles}
      components={{
        IndicatorSeparator: () => null,
      }}
      value={selectedOption}
      onChange={onChange}
      onMenuOpen={() => {
        // little hack to maintain the selection of the text
        if (editor.savedSelection) {
          Transforms.select(editor, editor.savedSelection);
        }
        const sel = editor.selection;

        Transforms.deselect(editor);

        setTimeout(() => {
          if (sel) {
            Transforms.select(editor, sel);
          }
        }, 10);
      }}
    />
  );
};

export default ToolbarTextBlockSelect;
