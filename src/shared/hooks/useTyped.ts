import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

export function useTyped(words: string[], typeSpeed = 65, backSpeed = 40, hold = 2200) {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(words[0]);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduced) {
      setText(words[0]);
      return;
    }
    const word = words[index % words.length];
    let timer: number;
    if (!deleting && text === word) {
      timer = window.setTimeout(() => setDeleting(true), hold);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((v) => (v + 1) % words.length);
    } else {
      timer = window.setTimeout(
        () => setText(word.slice(0, text.length + (deleting ? -1 : 1))),
        deleting ? backSpeed : typeSpeed
      );
    }
    return () => window.clearTimeout(timer);
  }, [text, deleting, index, words, typeSpeed, backSpeed, hold, reduced]);

  return text;
}
