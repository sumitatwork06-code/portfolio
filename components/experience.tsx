"use client"

import * as React from "react"
import { BriefcaseIcon, CalendarBlankIcon } from "@phosphor-icons/react"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Reveal, RevealGroup } from "@/components/reveal"
import { SectionHead, SectionShell } from "@/components/section-shell"
import { EXPERIENCES } from "@/lib/content"
import { cn } from "@/lib/utils"

const EXP_THEMES = [
  {
    isCurrent: true,
    cardBorder: "border-emerald-300/90 dark:border-emerald-700/60 bg-surface-card shadow-[0_8px_32px_-6px_rgba(16,185,129,0.12)] dark:shadow-[0_8px_32px_-6px_rgba(16,185,129,0.25)]",
    iconBox: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/60",
    companyColor: "text-emerald-700 dark:text-emerald-400",
    badge: "border-emerald-200 dark:border-emerald-900/60 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300",
    achieveBox: "bg-emerald-50/50 dark:bg-emerald-950/25 border border-emerald-200/60 dark:border-emerald-900/40 rounded-xl p-4",
    bullet: "bg-emerald-500",
  },
  {
    isCurrent: false,
    cardBorder: "border-sky-200/80 dark:border-sky-900/50 bg-surface-card hover:border-sky-300 dark:hover:border-sky-700 shadow-[0_6px_24px_-6px_rgba(2,132,199,0.08)] dark:shadow-[0_6px_24px_-6px_rgba(2,132,199,0.2)]",
    iconBox: "bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-900/60",
    companyColor: "text-sky-700 dark:text-sky-400",
    badge: "border-sky-200 dark:border-sky-900/60 bg-sky-50 dark:bg-sky-950/50 text-sky-800 dark:text-sky-300",
    achieveBox: "bg-sky-50/50 dark:bg-sky-950/25 border border-sky-200/60 dark:border-sky-900/40 rounded-xl p-4",
    bullet: "bg-sky-500",
  },
  {
    isCurrent: false,
    cardBorder: "border-violet-200/80 dark:border-violet-900/50 bg-surface-card hover:border-violet-300 dark:hover:border-violet-700 shadow-[0_6px_24px_-6px_rgba(124,58,237,0.08)] dark:shadow-[0_6px_24px_-6px_rgba(124,58,237,0.2)]",
    iconBox: "bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 border-violet-200 dark:border-violet-900/60",
    companyColor: "text-violet-700 dark:text-violet-400",
    badge: "border-violet-200 dark:border-violet-900/60 bg-violet-50 dark:bg-violet-950/50 text-violet-800 dark:text-violet-300",
    achieveBox: "bg-violet-50/50 dark:bg-violet-950/25 border border-violet-200/60 dark:border-violet-900/40 rounded-xl p-4",
    bullet: "bg-violet-500",
  },
]

export function Experience(): React.ReactElement {
  return (
    <section id="experience" aria-labelledby="exp-h" className="relative py-20 sm:py-28 border-t border-hairline/80 scroll-mt-12 bg-gradient-to-b from-[#f9f8f3] via-[#f5f4ed] to-[#f0efe6] dark:from-[#12110e] dark:via-[#161512] dark:to-[#191814] overflow-hidden">
      <SectionShell>
        <SectionHead
          stacked
          numeral="03"
          label="Experience"
          aside="Career Timeline"
          titleId="exp-h"
          title="Professional Experience & Career History."
        />

        <RevealGroup className="flex flex-col gap-6">
          {EXPERIENCES.map((exp, idx) => {
            const theme = EXP_THEMES[idx] ?? EXP_THEMES[0]
            return (
              <Reveal key={exp.index}>
                <Card className={cn(
                  "group relative flex flex-col gap-6 rounded-2xl border p-7 ring-0 transition-all duration-300",
                  theme.cardBorder
                )}>
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-hairline/60 pb-5">
                    <div className="flex items-center gap-3.5">
                      <span className={cn("grid size-11 place-items-center rounded-xl border transition-transform duration-300 group-hover:scale-105", theme.iconBox)}>
                        <BriefcaseIcon size={22} weight="regular" />
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-muted-ink">
                            / {exp.index}
                          </span>
                          <h3 className="text-base sm:text-lg font-bold tracking-tight text-ink">
                            {exp.role}
                          </h3>
                        </div>
                        <p className={cn("mt-0.5 text-xs sm:text-sm font-semibold", theme.companyColor)}>
                          {exp.company}
                        </p>
                      </div>
                    </div>

                    <Badge
                      variant="outline"
                      className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[11px] font-medium shadow-xs", theme.badge)}
                    >
                      {theme.isCurrent ? (
                        <span className="relative flex size-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                        </span>
                      ) : (
                        <CalendarBlankIcon size={14} weight="regular" />
                      )}
                      <span>{exp.duration}</span>
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <h4 className="caption-uppercase mb-3 text-muted-ink">
                        Responsibilities
                      </h4>
                      <ul className="flex flex-col gap-2.5">
                        {exp.responsibilities.map((resp, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-body"
                          >
                            <span className={cn("mt-2 size-1.5 rounded-full shrink-0", theme.bullet)} />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className={theme.achieveBox}>
                      <h4 className="caption-uppercase mb-2.5 text-muted-ink">
                        Key Impact & Achievements
                      </h4>
                      <ul className="flex flex-col gap-2">
                        {exp.achievements.map((ach, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2.5 text-[13.5px] font-medium leading-relaxed text-ink"
                          >
                            <span className={cn("mt-2 size-1.5 rounded-full shrink-0", theme.bullet)} />
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              </Reveal>
            )
          })}
        </RevealGroup>
      </SectionShell>
    </section>
  )
}
