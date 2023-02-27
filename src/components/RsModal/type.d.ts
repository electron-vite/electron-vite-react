import { ReactNode } from 'react';
interface childrens {
  titleText?: string;
  isHeaderShow?: boolean;
  isFooterShow?: boolean;
  canCelText?: string;
  submitText?: string;
  onSubmit?: () => void;
  onCanCel?: () => void;
}
export interface ModalChildType extends childrens {
  body: ReactNode | null;
}

export interface ModalPropsType extends childrens {
  isOpenModal: boolean;
  children: ReactNode | null;
}
