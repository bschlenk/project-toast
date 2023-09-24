import React, { createContext, useMemo, useState, useCallback } from 'react'

const ToastContext = createContext()

let TOAST_ID = 0

function ToastProvider({ children }) {
  const value = useToastState()
  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}

export function useToasts() {
  return React.useContext(ToastContext)
}

function useToastState() {
  const [toasts, setToasts] = useState([])

  const add = useCallback((props) => {
    setToasts((toasts) => [...toasts, { ...props, id: TOAST_ID++ }])
  }, [])

  const remove = useCallback((id) => {
    setToasts((toasts) => toasts.filter((t) => t.id !== id))
  }, [])

  const clear = useCallback(() => {
    setToasts([])
  }, [])

  return useMemo(
    () => ({ toasts, add, remove, clear }),
    [add, clear, remove, toasts],
  )
}

export default ToastProvider
