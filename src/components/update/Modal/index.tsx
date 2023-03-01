import { createPortal } from 'react-dom';
import { ModalChildType, ModalPropsType } from './type';
import modalScss from './modal.module.scss'
const ModalTemplate = (child: ModalChildType) => {
  return (
    <div className={modalScss.modal}>
      <div className='modal-bg' onClick={child.onCanCel} />
      <div className='modal-outboard'>
        <div className='modal-panel'>
          {child.isHeaderShow ? (
            <div className='modal-header'>
              <div className='modal-header-text'>{child.titleText}</div>
              <svg
                onClick={child.onCanCel}
                className='icon'
                viewBox='0 0 1026 1024'
                version='1.1'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M585.781589 510.748226l423.38657-423.38657A51.071963
            51.071963 0 0 0 937.156692 14.839469L513.770122 438.736759
            90.383552 14.839469A51.071963 51.071963 0 0 0 17.861365 87.361656L441.758655 
            510.748226l-423.89729 423.38657A51.071963 51.071963 0 1 0 89.872832 1006.146263l423.89729-423.38657 
            423.38657 423.38657a51.071963 51.071963 0 0 0 72.011467-72.011467z'
                />
              </svg>
            </div>
          ) : null}

          <div className='modal-body'>{child.body}</div>
          {child.isFooterShow ? (
            <div className='modal-footer'>
              {(child.isSubmitShow ?? true) ?<button onClick={child.onSubmit}>{child.submitText ?? '确认'}</button> : null}
              {(child.isCanCelShow ?? true) ? <button onClick={child.onCanCel}>{child.canCelText ?? '取消'}</button> : null}
            </div>
          ) : null}
        </div> 
      </div>
    </div>
  );
};

const Modal = (props: ModalPropsType) => {
  return  createPortal(
    props.isOpenModal?
      ModalTemplate({
        titleText: props.titleText,
        isHeaderShow: props.isHeaderShow ?? true,
        isFooterShow: props.isFooterShow ?? true,
        isCanCelShow: props.isCanCelShow ?? true,
        isSubmitShow: props.isSubmitShow ?? true,
        body: props.children,
        submitText: props.submitText,
        canCelText: props.canCelText,
        onCanCel: props.onCanCel,
        onSubmit: props.onSubmit,
      }): <div></div>,
      document.body,
    );
};
export default Modal;
