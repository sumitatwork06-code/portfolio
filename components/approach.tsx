"use client"

import { motion, useReducedMotion, type Variants } from "motion/react"

import { Reveal, RevealGroup } from "@/components/reveal"
import { SectionHead, SectionShell } from "@/components/section-shell"
import { APPROACH_STEPS } from "@/lib/content"
import { REVEAL_EASE } from "@/lib/motion"
import { cn } from "@/lib/utils"

// The top rule traces left-to-right as the steps land, reading the four moves
// as one ordered path rather than four separate cells.
const drawRule: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.7, ease: REVEAL_EASE } },
}

const APPROACH_ACCENTS = [
  { line: "bg-orange-500", text: "text-orange-600 dark:text-orange-400", dot: "bg-orange-500" },
  { line: "bg-sky-500", text: "text-sky-600 dark:text-sky-400", dot: "bg-sky-500" },
  { line: "bg-violet-500", text: "text-violet-600 dark:text-violet-400", dot: "bg-violet-500" },
  { line: "bg-emerald-500", text: "text-emerald-600 dark:text-emerald-400", dot: "bg-emerald-500" },
]

export function Approach(): React.ReactElement {
  const reduceMotion = useReducedMotion()

  return (
    <section id="process" aria-labelledby="appr-h" className="relative py-20 sm:py-28 border-t border-hairline/80 scroll-mt-12 bg-gradient-to-b from-[#f2f1e8] via-[#eceae0] to-[#e6e4d8] dark:from-[#13120f] dark:via-[#171612] dark:to-[#1a1915] overflow-hidden">
      <SectionShell>
        <SectionHead
          stacked
          numeral="04"
          label="Approach"
          aside="How I work"
          titleId="appr-h"
          title="Four moves, in order. Most of the work is removing things before adding them."
        />
        <RevealGroup
          as="ol"
          className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-0"
        >
          <motion.span
            aria-hidden
            variants={reduceMotion ? undefined : drawRule}
            className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left bg-hairline hidden lg:block"
          />
          {APPROACH_STEPS.map((step, idx) => {
            const accent = APPROACH_ACCENTS[idx] ?? APPROACH_ACCENTS[0]
            return (
              <Reveal
                as="li"
                key={step.t}
                className="group relative flex flex-col gap-3 rounded-xl border border-hairline/60 bg-white/60 dark:bg-surface-card/60 p-6 backdrop-blur-xs transition-all duration-300 hover:bg-white dark:hover:bg-surface-card hover:shadow-md lg:rounded-none lg:border-0 lg:bg-transparent lg:border-r lg:border-hairline/70 lg:last:border-r-0 lg:p-7"
              >
                <span
                  aria-hidden
                  className={cn(
                    "absolute top-0 left-0 h-1 w-8 transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full motion-reduce:transition-none rounded-t-xl lg:rounded-none",
                    accent.line
                  )}
                />
                <span className={cn("eyebrow flex items-center gap-1.5 pt-1", accent.text)}>
                  <span className={cn("size-1.5 rounded-full", accent.dot)} />
                  {step.k}
                </span>
                <h3 className="text-base sm:text-lg font-bold leading-snug tracking-tight text-ink">
                  {step.t}
                </h3>
                <p className="text-[13.5px] leading-relaxed text-body">{step.d}</p>
              </Reveal>
            )
          })}
        </RevealGroup>
      </SectionShell>
    </section>
  )
}
