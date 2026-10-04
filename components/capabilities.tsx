"use client"

import { Card } from "@/components/ui/card"
import { CAPABILITY_ICONS } from "@/components/capability-icons"
import { Reveal, RevealGroup } from "@/components/reveal"
import { SectionHead, SectionShell } from "@/components/section-shell"
import { CAPABILITIES } from "@/lib/content"
import { cn } from "@/lib/utils"

const CAPABILITY_THEMES = [
  {
    gradient: "from-orange-500 to-amber-500",
    border: "border-orange-200/80 dark:border-orange-900/50 hover:border-orange-300 dark:hover:border-orange-700 shadow-[0_8px_30px_rgba(249,115,22,0.06)] dark:shadow-[0_8px_30px_rgba(249,115,22,0.15)]",
    iconBox: "bg-orange-50 dark:bg-orange-950/40 border-orange-200 dark:border-orange-900/60 text-orange-600 dark:text-orange-400",
    numColor: "text-orange-600 dark:text-orange-400 font-bold",
    tagBg: "bg-orange-50/70 dark:bg-orange-950/30 border-orange-100 dark:border-orange-900/40 text-orange-950 dark:text-orange-200",
    dot: "bg-orange-500",
  },
  {
    gradient: "from-emerald-500 to-teal-500",
    border: "border-emerald-200/80 dark:border-emerald-900/50 hover:border-emerald-300 dark:hover:border-emerald-700 shadow-[0_8px_30px_rgba(16,185,129,0.06)] dark:shadow-[0_8px_30px_rgba(16,185,129,0.15)]",
    iconBox: "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900/60 text-emerald-600 dark:text-emerald-400",
    numColor: "text-emerald-600 dark:text-emerald-400 font-bold",
    tagBg: "bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-900/40 text-emerald-950 dark:text-emerald-200",
    dot: "bg-emerald-500",
  },
  {
    gradient: "from-violet-500 to-indigo-500",
    border: "border-violet-200/80 dark:border-violet-900/50 hover:border-violet-300 dark:hover:border-violet-700 shadow-[0_8px_30px_rgba(139,92,246,0.06)] dark:shadow-[0_8px_30px_rgba(139,92,246,0.15)]",
    iconBox: "bg-violet-50 dark:bg-violet-950/40 border-violet-200 dark:border-violet-900/60 text-violet-600 dark:text-violet-400",
    numColor: "text-violet-600 dark:text-violet-400 font-bold",
    tagBg: "bg-violet-50/70 dark:bg-violet-950/30 border-violet-100 dark:border-violet-900/40 text-violet-950 dark:text-violet-200",
    dot: "bg-violet-500",
  },
]

export function Capabilities(): React.ReactElement {
  return (
    <section id="skills" aria-labelledby="skills-h" className="relative py-20 sm:py-28 border-t border-hairline/80 scroll-mt-12 bg-gradient-to-b from-[#f5f4ec] via-[#efeee4] to-[#eae8dc] dark:from-[#141310] dark:via-[#181713] dark:to-[#1b1a15] overflow-hidden">
      <div id="capabilities" className="sr-only" />
      <SectionShell>
        <SectionHead
          stacked
          numeral="02"
          label="Skills & HR Knowledge"
          aside="Core Capabilities"
          titleId="skills-h"
          title="Core HR operations, statutory knowledge, and modern AI & tech capabilities."
        />

        <RevealGroup className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((cap, i) => {
            const Icon = CAPABILITY_ICONS[i]
            const theme = CAPABILITY_THEMES[i] ?? CAPABILITY_THEMES[0]
            return (
              <Reveal key={cap.title}>
                <Card className={cn(
                  "group relative flex h-full flex-col gap-5 rounded-2xl border bg-surface-card/95 p-7 ring-0 transition-all duration-300 overflow-hidden",
                  theme.border
                )}>
                  {/* Top accent bar */}
                  <div className={cn("absolute inset-x-0 top-0 h-1 bg-gradient-to-r", theme.gradient)} />

                  <div className="flex items-start justify-between">
                    <span className={cn("grid size-12 place-items-center rounded-xl border transition-transform duration-300 group-hover:scale-105", theme.iconBox)}>
                      <Icon />
                    </span>
                    <span className={cn("eyebrow", theme.numColor)}>{cap.num}</span>
                  </div>
                  <h3 className="text-lg sm:text-[1.25rem] font-bold tracking-tight text-ink">
                    {cap.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-body">
                    {cap.body}
                  </p>
                  <ul className="grid grid-cols-2 gap-2 border-t border-hairline/60 pt-4 mt-auto">
                    {cap.items.map((item) => (
                      <li
                        key={item}
                        className={cn("flex items-center gap-1.5 rounded-md border px-2 py-1 font-mono text-[10.5px] font-medium transition-colors", theme.tagBg)}
                      >
                        <span className={cn("size-1.5 rounded-full shrink-0", theme.dot)} />
                        <span className="truncate">{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            )
          })}
        </RevealGroup>
      </SectionShell>
    </section>
  )
}
