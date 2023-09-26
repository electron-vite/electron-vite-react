import React, { ReactNode } from "react";
import { createPortal } from "react-dom";

const ModalTemplate: React.FC<
  React.PropsWithChildren<{
    title?: ReactNode;
    footer?: ReactNode;
    cancelText?: string;
    okText?: string;
    onCancel?: () => void;
    onOk?: () => void;
    width?: number;
  }>
> = (props) => {
  const {
    title,
    children,
    footer,
    cancelText = "Cancel",
    okText = "OK",
    onCancel,
    onOk,
    width = 530,
  } = props;

  return (
    <div>
      <div className="w-screen h-screen fixed top-0 left-0 z-10 bg-modalMask" />
      <div className="fixed top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
        <div
          className="shadow-modalContent overflow-hidden -border-r-4"
          style={{ width }}
        >
          <div className="flex leading-[38px] bg-crimson">
            <div className="font-bold w-0 flex-grow">{title}</div>
            <span
              className="w-[30px] h-[30px] m-[4px] text-center cursor-pointer leading-[30px]"
              onClick={onCancel}
            >
              <svg
                className="w-[17px] h-[17px]"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M557.312 513.248l265.28-263.904c12.544-12.48 12.608-32.704 0.128-45.248-12.512-12.576-32.704-12.608-45.248-0.128l-265.344 263.936-263.04-263.84C236.64 191.584 216.384 191.52 203.84 204 191.328 216.48 191.296 236.736 203.776 249.28l262.976 263.776L201.6 776.8c-12.544 12.48-12.608 32.704-0.128 45.248 6.24 6.272 14.464 9.44 22.688 9.44 8.16 0 16.32-3.104 22.56-9.312l265.216-263.808 265.44 266.24c6.24 6.272 14.432 9.408 22.656 9.408 8.192 0 16.352-3.136 22.592-9.344 12.512-12.48 12.544-32.704 0.064-45.248L557.312 513.248z"
                  p-id="2764"
                  fill="currentColor"
                ></path>
              </svg>
            </span>
          </div>
          <div className="p-[10px] bg-white text-darkGrey1">{children}</div>
          {typeof footer !== "undefined" ? (
            <div className="p-[10px] bg-white flex justify-end">
              <button
                className="p-[7px] bg-crimson text-sm ml-[10px] first:ml-0"
                onClick={onCancel}
              >
                {cancelText}
              </button>
              <button
                className="p-[7px] bg-crimson text-sm ml-[10px] first:ml-0"
                onClick={onOk}
              >
                {okText}
              </button>
            </div>
          ) : (
            footer
          )}
        </div>
      </div>
    </div>
  );
};

const Modal = (
  props: Parameters<typeof ModalTemplate>[0] & { open: boolean },
) => {
  const { open, ...omit } = props;

  return createPortal(open ? ModalTemplate(omit) : null, document.body);
};

export default Modal;
