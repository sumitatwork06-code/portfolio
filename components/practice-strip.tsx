"use client"

import { Reveal, RevealGroup } from "@/components/reveal"
import { SectionShell } from "@/components/section-shell"
import { PRACTICE_AREAS } from "@/lib/content"
import { cn } from "@/lib/utils"

const PRACTICE_ACCENTS = [
  "bg-orange-500 shadow-orange-500/50",
  "bg-sky-500 shadow-sky-500/50",
  "bg-violet-500 shadow-violet-500/50",
  "bg-emerald-500 shadow-emerald-500/50",
  "bg-amber-500 shadow-amber-500/50",
]

export function PracticeStrip(): React.ReactElement {
  return (
    <section
      aria-label="Practice areas"
      className="border-y border-hairline/80 py-8 bg-gradient-to-r from-[#fcfbf9] via-[#f5f4ee] to-[#fcfbf9] dark:from-[#12110e] dark:via-[#181714] dark:to-[#12110e]"
    >
      <SectionShell>
        <RevealGroup
          as="ul"
          className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5 lg:gap-0"
        >
          {PRACTICE_AREAS.map((item, i) => (
            <Reveal
              as="li"
              key={item.v}
              className="flex flex-col gap-1.5 px-0 lg:px-5 lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:border-hairline"
              style={{ paddingLeft: i === 0 ? 0 : undefined }}
            >
              <span className="eyebrow flex items-center gap-2 text-muted-ink uppercase">
                <span className={cn("size-1.5 rounded-full shadow-xs", PRACTICE_ACCENTS[i] ?? "bg-primary")} />
                {item.k}
              </span>
              <span className="text-sm font-semibold tracking-tight text-ink">
                {item.v}
              </span>
            </Reveal>
          ))}
        </RevealGroup>
      </SectionShell>
    </section>
  )
}
