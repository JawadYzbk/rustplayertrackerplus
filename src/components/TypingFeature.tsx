"use client";

import { useEffect, useMemo, useState } from "react";
import { TextEffect } from "@/components/motion-primitives/text-effect";

const PHRASE_ROTATION_MS = 2600;

interface TypingFeatureProps {
  phrases: string[];
}

export default function TypingFeature({ phrases }: TypingFeatureProps) {
  const safePhrases = useMemo(
    () => phrases.filter((phrase) => phrase.trim().length > 0),
    [phrases]
  );
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    if (safePhrases.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setPhraseIndex((value) => (value + 1) % safePhrases.length);
    }, PHRASE_ROTATION_MS);

    return () => window.clearInterval(timer);
  }, [safePhrases]);

  if (safePhrases.length === 0) {
    return null;
  }

  const activePhrase = safePhrases[phraseIndex % safePhrases.length];

  return (
    <span className="inline-flex min-h-[1.3em] items-center gap-1 text-primary">
      <TextEffect
        key={activePhrase}
        per="char"
        as="span"
        preset="slide"
        speedReveal={1.15}
        speedSegment={1.2}
        className="inline-block"
      >
        {activePhrase}
      </TextEffect>
      <span className="typing-caret" aria-hidden="true" />
    </span>
  );
}
