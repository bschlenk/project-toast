import React, { useState, useEffect } from 'react'

import Button from '../Button'
import Toast from '../Toast'
import ToastShelf from '../ToastShelf'
import { useToasts } from '../ToastProvider'

import styles from './ToastPlayground.module.css'

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error']

function ToastPlayground() {
  const [message, setMessage] = useState('')
  const [variant, setVariant] = useState('notice')
  const toasts = useToasts()

  const inputRef = React.useRef(null)

  useEscapeHandler(() => {
    toasts.clear()
  })

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf>
        {toasts.toasts.map(({ message, variant, id }, i) => (
          <Toast key={id} variant={variant} onClose={() => toasts.remove(id)}>
            {message}
          </Toast>
        ))}
      </ToastShelf>

      <form
        className={styles.controlsWrapper}
        onSubmit={(e) => {
          e.preventDefault()

          toasts.add({ message, variant })
          setMessage('')
          setVariant('notice')

          inputRef.current.focus()
        }}
      >
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: 'baseline' }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              ref={inputRef}
              id="message"
              className={styles.messageInput}
              value={message}
              required
              onChange={(e) => {
                setMessage(e.target.value)
              }}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {VARIANT_OPTIONS.map((option) => {
              const id = `variant-${option}`
              return (
                <label htmlFor={id} key={id}>
                  <input
                    id={id}
                    type="radio"
                    name="variant"
                    value={option}
                    checked={option === variant}
                    onChange={(e) => {
                      setVariant(e.target.value)
                    }}
                  />
                  {option}
                </label>
              )
            })}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button type="submit">Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  )
}

function useEscapeHandler(fn) {
  useEffect(() => {
    function handleEscape(e) {
      if (e.key === 'Escape') {
        fn(e)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [fn])
}

export default ToastPlayground
