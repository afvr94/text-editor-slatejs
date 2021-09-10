import { StylesConfig } from 'react-select';
import { OptionTypeBase } from 'react-select/src/types';
import { ElementType } from './types';

export const styles: StylesConfig<OptionTypeBase, false> = {
  control: (css) => ({
    ...css,
    backgroundColor: '#A78BFA',
    borderRadius: '0.25rem',
    border: '1px solid #A78BFA',
    boxSizing: 'border-box',
    boxShadow: '0px',
    width: '130px',
  }),
  dropdownIndicator: (css) => ({
    ...css,
    color: 'white',
  }),
  singleValue: (css) => ({
    ...css,
    color: 'white',
    border: '1px solid #A78BFA',
  }),
  option: (css, { isFocused, isSelected }: { isFocused: boolean; isSelected: boolean }) => {
    let optionColor = isFocused ? '#E1E5EF' : '';
    if (isSelected) {
      optionColor = '#F0F2F7';
    }
    return {
      ...css,
      backgroundColor: optionColor,
      color: '#2B3230',
    };
  },
  menu: (css) => ({
    ...css,
    borderRadius: '0.25rem',
  }),
};

export const options = [
  {
    label: 'paragraph',
    value: `${ElementType.PARAGRAPH}`,
  },
  {
    label: 'h1',
    value: `${ElementType.HEADING_ONE}`,
  },
  {
    label: 'h2',
    value: `${ElementType.HEADING_TWO}`,
  },
  {
    label: 'h3',
    value: `${ElementType.HEADING_THREE}`,
  },
  {
    label: 'h4',
    value: `${ElementType.HEADING_FOUR}`,
  },
  // for when we detect multiple text blocks
  {
    label: 'multiple',
    value: 'multiple',
  },
];
