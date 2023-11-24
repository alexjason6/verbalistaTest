import {type ReactNode} from 'react';
import {PropsItems} from './PropsItems';

export type PropsComponents = {
  name?: ReactNode;
  children?: ReactNode | undefined;
  nameItem?: string | undefined;
  placeholder?: string | undefined;
  value?: string | boolean | any;
  dropZone?: boolean;
  correct?: boolean;
  func?: (value: any, event: string, position: {x: number; y: number}) => void;
  item?: PropsItems | undefined;
};
