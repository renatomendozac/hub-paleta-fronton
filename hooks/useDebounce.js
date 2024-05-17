import { useEffect, useState } from 'react'

const useDebounce = (value, delay) => {
  const [debounceValue, setDebounceVal] = useState(value)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounceVal(value)
    }, delay)

    return () => clearTimeout(timeoutId)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return debounceValue
}

export default useDebounce
