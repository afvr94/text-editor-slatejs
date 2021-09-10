import React from 'react';
import { bold, italic, underline, code } from 'react-icons-kit/feather';
import ToolbarTextBlockSelect from './ToolbarTextBlockSelect';
import ToolbarTextStyleButton from './ToolbarTextStyleButton';

const Toolbar: React.FC = () => {
  return (
    <div className="flex p-4 space-x-4 border-b border-gray-200">
      <ToolbarTextBlockSelect />
      <ToolbarTextStyleButton textStyle="bold" icon={bold} />
      <ToolbarTextStyleButton textStyle="italic" icon={italic} />
      <ToolbarTextStyleButton textStyle="underline" icon={underline} />
      <ToolbarTextStyleButton textStyle="code" icon={code} />
    </div>
  );
};

export default Toolbar;
