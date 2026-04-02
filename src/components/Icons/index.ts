import createIconSet from '@expo/vector-icons/createIconSet';
import glyphMap from './glyphmap.json';
import type { ComponentProps } from 'react';

export type IconName = keyof typeof glyphMap;

export { glyphMap };

const UntitledUI = createIconSet<IconName, 'UntitledUI'>(
  glyphMap,
  'UntitledUI',
  'untitledui.ttf'
);
export type UntitledUIIconName = ComponentProps<typeof UntitledUI>['name'];

export default UntitledUI;
