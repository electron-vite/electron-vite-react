import React, { type ReactNode } from 'react'
import { createPortal } from 'react-dom'

const ModalTemplate: React.FC<React.PropsWithChildren<{
  title?: ReactNode
  footer?: ReactNode
  cancelText?: string
  okText?: string
  onCancel?: () => void
  onOk?: () => void
  width?: number
}>> = props => {
  const {
    title,
    children,
    footer,
    cancelText = 'Cancel',
    okText = 'OK',
    onCancel,
    onOk,
    width = 530,
  } = props

  return (
    <div className='fixed inset-0 z-50'>
      <div className='absolute inset-0 bg-slate-950/70 backdrop-blur-sm' />
      <div className='absolute left-1/2 top-1/2 w-[min(calc(100vw-2rem),_530px)] -translate-x-1/2 -translate-y-1/2'>
        <div className='overflow-hidden rounded-[1.5rem] border border-white/10 bg-white shadow-2xl shadow-slate-950/50' style={{ width }}>
          <div className='flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-sky-500 px-5 py-3 text-white'>
            <div className='min-w-0 flex-1 font-semibold'>{title}</div>
            <span
              className='inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/15 transition hover:bg-white/25'
              onClick={onCancel}
            >
              <svg
                viewBox='0 0 1024 1024'
                version='1.1' xmlns='http://www.w3.org/2000/svg'
                className='h-4 w-4'
              >
                <path d='M557.312 513.248l265.28-263.904c12.544-12.48 12.608-32.704 0.128-45.248-12.512-12.576-32.704-12.608-45.248-0.128l-265.344 263.936-263.04-263.84C236.64 191.584 216.384 191.52 203.84 204 191.328 216.48 191.296 236.736 203.776 249.28l262.976 263.776L201.6 776.8c-12.544 12.48-12.608 32.704-0.128 45.248 6.24 6.272 14.464 9.44 22.688 9.44 8.16 0 16.32-3.104 22.56-9.312l265.216-263.808 265.44 266.24c6.24 6.272 14.432 9.408 22.656 9.408 8.192 0 16.352-3.136 22.592-9.344 12.512-12.48 12.544-32.704 0.064-45.248L557.312 513.248z' p-id='2764' fill='currentColor'>
                </path>
              </svg>
            </span>
          </div>
          <div className='bg-white px-5 py-5 text-slate-700'>{children}</div>
          {footer !== undefined ? (
            <div className='flex justify-end gap-3 bg-white px-5 pb-5'>
              <button onClick={onCancel} className='rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50'>{cancelText}</button>
              <button onClick={onOk} className='rounded-xl bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800'>{okText}</button>
            </div>
          ) : footer}
        </div>
      </div>
    </div>
  )
}

const Modal = (props: Parameters<typeof ModalTemplate>[0] & { open: boolean }) => {
  const { open, ...omit } = props

  return createPortal(
    open ? <ModalTemplate {...omit} /> : null,
    document.body,
  )
}

export default Modal
