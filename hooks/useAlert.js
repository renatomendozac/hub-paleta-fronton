import Alert from '@/components/Alert'
import { useRef, useState } from 'react'

const useAlert = () => {
  const timerIdRef = useRef()
  const [components, setComponents] = useState(null)

  const open = ({ type, content }) => {
    const alertComponent = <Alert type={type}>{content}</Alert>
    setComponents(alertComponent)

    if (timerIdRef.current) {
      clearTimeout(timerIdRef.current)
    }

    timerIdRef.current = setTimeout(() => setComponents(null), 5_000)
  }

  return { open, holder: components }
}

export default useAlert
