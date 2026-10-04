"use client"

import * as React from "react"
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "motion/react"

import { Card } from "@/components/ui/card"
import { Reveal, RevealGroup } from "@/components/reveal"
import { SectionHead, SectionShell } from "@/components/section-shell"
import { STACK_PANES } from "@/lib/content"
import { REVEAL_EASE, viewportOnce } from "@/lib/motion"
import { cn } from "@/lib/utils"

// Each line fades up as the editor "reads" the file. Panes cascade, then the
// rows within each pane cascade — like a config populating top-to-bottom.
const lineItem: Variants = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: REVEAL_EASE } },
}

const paneStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
}

const lineStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
}

const PANE_COLORS = [
  { dot: "bg-sky-400", title: "text-sky-300", tag: "bg-sky-950/60 text-sky-300 border-sky-800/60" },
  { dot: "bg-orange-400", title: "text-orange-300", tag: "bg-orange-950/60 text-orange-300 border-orange-800/60" },
  { dot: "bg-violet-400", title: "text-violet-300", tag: "bg-violet-950/60 text-violet-300 border-violet-800/60" },
  { dot: "bg-emerald-400", title: "text-emerald-300", tag: "bg-emerald-950/60 text-emerald-300 border-emerald-800/60" },
]

export function Stack(): React.ReactElement {
  const reduceMotion = useReducedMotion()
  const editorRef = React.useRef<HTMLDivElement>(null)
  const editorInView = useInView(editorRef, { once: true, margin: "-80px" })
  const [timerDone, setTimerDone] = React.useState(false)
  const saved = reduceMotion || timerDone

  React.useEffect(() => {
    if (reduceMotion || !editorInView) return
    const id = window.setTimeout(() => setTimerDone(true), 900)
    return () => window.clearTimeout(id)
  }, [editorInView, reduceMotion])

  return (
    <section id="stack" aria-labelledby="stack-h" className="relative py-20 sm:py-28 border-t border-hairline/80 scroll-mt-12 bg-gradient-to-b from-[#f7f6f0] via-[#f1f0e6] to-[#eae8dc] dark:from-[#11100d] dark:via-[#161511] dark:to-[#1a1915] overflow-hidden">
      <SectionShell>
        <SectionHead
          stacked
          numeral="05"
          label="HR & Tech Stack"
          aside="Tools & Platforms"
          titleId="stack-h"
          title="A reliable toolkit to connect people, data, and modern technology."
        />

        <RevealGroup className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <h3 className="text-lg sm:text-[1.25rem] font-bold tracking-tight text-ink">
              Tech-enabled HR workflows.
            </h3>
            <p className="mt-3 max-w-[36ch] text-[14px] leading-relaxed text-body">
              Combining foundational HR systems with data tools, no-code
              solutions, and AI intelligence to streamline operations and
              accelerate talent delivery.
            </p>
          </Reveal>

          <Reveal className="lg:col-span-8">
            <Card className="overflow-hidden rounded-2xl border border-[#2d2b24] bg-[#141310] p-0 shadow-2xl ring-0 text-[#e8e6df]">
              <div
                ref={editorRef}
                className="flex items-center gap-2.5 border-b border-[#2d2b24] bg-[#1c1a16] px-4 py-3 font-mono text-[11px] text-[#a09c92]"
              >
                <span className="flex gap-1.5" aria-hidden>
                  <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="size-2.5 rounded-full bg-[#febc2e]" />
                  <span className="size-2.5 rounded-full bg-[#28c840]" />
                </span>
                <span className="ml-1.5 tracking-[0.04em] text-[#d4d1c8]">
                  ~/nityam / hr-stack.config.ts
                </span>
                <span className="ml-auto flex items-center gap-1.5 text-xs text-[#807d72]">
                  <motion.span
                    aria-hidden
                    className={cn(
                      "size-1.5 rounded-full transition-colors duration-300",
                      saved ? "bg-emerald-400" : "bg-amber-400"
                    )}
                    animate={
                      !reduceMotion && saved
                        ? { scale: [1, 1.5, 1] }
                        : undefined
                    }
                    transition={{ duration: 0.4, ease: REVEAL_EASE }}
                  />
                  {saved ? "saved" : "editing"}
                </span>
              </div>
              <motion.div
                variants={paneStagger}
                initial={reduceMotion ? false : "hidden"}
                whileInView={reduceMotion ? undefined : "show"}
                viewport={viewportOnce}
                className="grid grid-cols-1 divide-y divide-[#26241e] md:grid-cols-2 md:divide-y-0"
              >
                {STACK_PANES.map((pane, i) => {
                  const paneColor = PANE_COLORS[i] ?? PANE_COLORS[0]
                  return (
                    <motion.div
                      key={pane.title}
                      variants={lineStagger}
                      className={
                        "group/pane p-6 transition-colors hover:bg-white/[0.02] " +
                        (i % 2 === 0 ? "md:border-r md:border-[#26241e] " : "") +
                        (i >= 2 ? "md:border-t md:border-[#26241e]" : "")
                      }
                    >
                      <motion.div
                        variants={lineItem}
                        className={cn(
                          "eyebrow mb-3.5 flex items-center gap-2 uppercase tracking-[0.14em] font-semibold",
                          paneColor.title
                        )}
                      >
                        <span className={cn("size-1.5 rounded-full", paneColor.dot)} />
                        {pane.title}
                      </motion.div>
                      <motion.ul
                        variants={lineStagger}
                        className="flex flex-col gap-2.5"
                      >
                        {pane.items.map(([name, tag]) => (
                          <motion.li
                            key={name}
                            variants={lineItem}
                            className="group/row flex items-baseline gap-2 font-mono text-[13px] text-[#f2efe8]"
                          >
                            <span>{name}</span>
                            <span className={cn(
                              "ml-auto text-[10px] tracking-[0.08em] uppercase rounded-md border px-1.5 py-0.5 font-medium transition-colors",
                              paneColor.tag
                            )}>
                              {tag}
                            </span>
                          </motion.li>
                        ))}
                      </motion.ul>
                    </motion.div>
                  )
                })}
              </motion.div>
            </Card>
          </Reveal>
        </RevealGroup>
      </SectionShell>
    </section>
  )
}
