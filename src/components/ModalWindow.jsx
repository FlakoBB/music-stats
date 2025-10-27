import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'

const ModalWindow = ({ isOpen, onClose, children }) => {
  const modalRoot = document.getElementById('modal-root') || createModalRoot()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  if (!isOpen) return null

  return createPortal(
    <div
      style={{
        position: 'fixed',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(5px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        inset: 0
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#333',
          borderRadius: '1rem',
          padding: '1rem',
          maxWidth: '30rem',
          width: '100%',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    modalRoot
  )
}

const createModalRoot = () => {
  const modalRoot = document.createElement('div')
  modalRoot.id = 'modal-root'
  document.body.appendChild(modalRoot)
  return modalRoot
}

export default ModalWindow
