import { useEffect, useState } from 'react'

/**
 * useTypewriter — cycles through `words`, typing then deleting each.
 * @param {string[]} words
 * @param {object} opts  typeSpeed / deleteSpeed / pause (ms)
 */
export function useTypewriter(words, { typeSpeed = 85, deleteSpeed = 40, pause = 1700 } = {}) {
  const [text, setText] = useState('')
  const [index, setIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[index % words.length]
    let timer

    if (!deleting && text === word) {
      timer = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && text === '') {
      setDeleting(false)
      setIndex((i) => i + 1)
    } else {
      timer = setTimeout(
        () => setText(word.substring(0, text.length + (deleting ? -1 : 1))),
        deleting ? deleteSpeed : typeSpeed,
      )
    }

    return () => clearTimeout(timer)
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, pause])

  return text
}
