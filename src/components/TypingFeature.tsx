"use client";

import { useEffect, useMemo, useState } from "react";

const TYPING_SPEED_MS = 65;
const DELETING_SPEED_MS = 35;
const HOLD_MS = 1500;

interface TypingFeatureProps {
  phrases: string[];
}

export default function TypingFeature({ phrases }: TypingFeatureProps) {
  const safePhrases = useMemo(
    () => phrases.filter((phrase) => phrase.trim().length > 0),
    [phrases]
  );
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (safePhrases.length === 0) {
      return;
    }

    const currentPhrase = safePhrases[phraseIndex % safePhrases.length];

    if (!isDeleting && displayText === currentPhrase) {
      const holdTimer = window.setTimeout(() => setIsDeleting(true), HOLD_MS);
      return () => window.clearTimeout(holdTimer);
    }

    if (isDeleting && displayText.length === 0) {
      const resetTimer = window.setTimeout(() => {
        setIsDeleting(false);
        setPhraseIndex((value) => (value + 1) % safePhrases.length);
      }, 0);
      return () => window.clearTimeout(resetTimer);
    }

    const nextText = isDeleting
      ? currentPhrase.slice(0, displayText.length - 1)
      : currentPhrase.slice(0, displayText.length + 1);

    const timer = window.setTimeout(
      () => setDisplayText(nextText),
      isDeleting ? DELETING_SPEED_MS : TYPING_SPEED_MS
    );

    return () => window.clearTimeout(timer);
  }, [displayText, isDeleting, phraseIndex, safePhrases]);

  if (safePhrases.length === 0) {
    return null;
  }

  return (
    <span className="inline-flex min-h-[1.3em] items-center gap-1 text-primary">
      <span>{displayText}</span>
      <span className="typing-caret" aria-hidden="true" />
    </span>
  );
}
