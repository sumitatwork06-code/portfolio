"use client"

import * as React from "react"
import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  UsersThreeIcon,
  DatabaseIcon,
  CpuIcon,
  GearSixIcon,
  TrendUpIcon,
} from "@phosphor-icons/react"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { SectionShell } from "@/components/section-shell"
import { HR_AI_FLOW, type HrAiStep } from "@/lib/content"
import { REVEAL_EASE } from "@/lib/motion"
import { cn } from "@/lib/utils"

const SLIDE_SECONDS = 7
const RING_SIZE = 26
const SEGMENT_FRACTION = 1 / HR_AI_FLOW.length

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

const STAGE_THEMES = [
  {
    color: "#f43f5e", // Rose (People)
    dot: "bg-rose-500",
    bgGradient: "from-rose-500/12 via-rose-500/5 to-transparent dark:from-rose-500/20 dark:via-rose-500/8 dark:to-transparent",
    iconBox: "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900/60 shadow-sm",
    badge: "bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-900/60",
    bannerPill: "bg-rose-600 text-white shadow-md shadow-rose-600/25",
    activeCardBorder: "border-rose-300 dark:border-rose-700/60 shadow-[0_12px_36px_-8px_rgba(244,63,94,0.18)] dark:shadow-[0_12px_36px_-8px_rgba(244,63,94,0.3)]",
    activeListItem: "bg-rose-50/80 dark:bg-rose-950/30 border-rose-200/80 dark:border-rose-800/50 text-rose-950 dark:text-rose-200 font-semibold shadow-xs",
    accentText: "text-rose-600 dark:text-rose-400",
  },
  {
    color: "#0284c7", // Sky (Data)
    dot: "bg-sky-500",
    bgGradient: "from-sky-500/12 via-sky-500/5 to-transparent dark:from-sky-500/20 dark:via-sky-500/8 dark:to-transparent",
    iconBox: "bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-900/60 shadow-sm",
    badge: "bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-900/60",
    bannerPill: "bg-sky-600 text-white shadow-md shadow-sky-600/25",
    activeCardBorder: "border-sky-300 dark:border-sky-700/60 shadow-[0_12px_36px_-8px_rgba(2,132,199,0.18)] dark:shadow-[0_12px_36px_-8px_rgba(2,132,199,0.3)]",
    activeListItem: "bg-sky-50/80 dark:bg-sky-950/30 border-sky-200/80 dark:border-sky-800/50 text-sky-950 dark:text-sky-200 font-semibold shadow-xs",
    accentText: "text-sky-600 dark:text-sky-400",
  },
  {
    color: "#7c3aed", // Violet (AI)
    dot: "bg-violet-500",
    bgGradient: "from-violet-500/12 via-violet-500/5 to-transparent dark:from-violet-500/20 dark:via-violet-500/8 dark:to-transparent",
    iconBox: "bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 border-violet-200 dark:border-violet-900/60 shadow-sm",
    badge: "bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-900/60",
    bannerPill: "bg-violet-600 text-white shadow-md shadow-violet-600/25",
    activeCardBorder: "border-violet-300 dark:border-violet-700/60 shadow-[0_12px_36px_-8px_rgba(124,58,237,0.18)] dark:shadow-[0_12px_36px_-8px_rgba(124,58,237,0.3)]",
    activeListItem: "bg-violet-50/80 dark:bg-violet-950/30 border-violet-200/80 dark:border-violet-800/50 text-violet-950 dark:text-violet-200 font-semibold shadow-xs",
    accentText: "text-violet-600 dark:text-violet-400",
  },
  {
    color: "#059669", // Emerald (Automation)
    dot: "bg-emerald-500",
    bgGradient: "from-emerald-500/12 via-emerald-500/5 to-transparent dark:from-emerald-500/20 dark:via-emerald-500/8 dark:to-transparent",
    iconBox: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/60 shadow-sm",
    badge: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900/60",
    bannerPill: "bg-emerald-600 text-white shadow-md shadow-emerald-600/25",
    activeCardBorder: "border-emerald-300 dark:border-emerald-700/60 shadow-[0_12px_36px_-8px_rgba(5,150,105,0.18)] dark:shadow-[0_12px_36px_-8px_rgba(5,150,105,0.3)]",
    activeListItem: "bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-200/80 dark:border-emerald-800/50 text-emerald-950 dark:text-emerald-200 font-semibold shadow-xs",
    accentText: "text-emerald-600 dark:text-emerald-400",
  },
  {
    color: "#d97706", // Amber (Better Decisions)
    dot: "bg-amber-500",
    bgGradient: "from-amber-500/12 via-amber-500/5 to-transparent dark:from-amber-500/20 dark:via-amber-500/8 dark:to-transparent",
    iconBox: "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900/60 shadow-sm",
    badge: "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-900/60",
    bannerPill: "bg-amber-600 text-white shadow-md shadow-amber-600/25",
    activeCardBorder: "border-amber-300 dark:border-amber-700/60 shadow-[0_12px_36px_-8px_rgba(217,119,6,0.18)] dark:shadow-[0_12px_36px_-8px_rgba(217,119,6,0.3)]",
    activeListItem: "bg-amber-50/80 dark:bg-amber-950/30 border-amber-200/80 dark:border-amber-800/50 text-amber-950 dark:text-amber-200 font-semibold shadow-xs",
    accentText: "text-amber-600 dark:text-amber-400",
  },
]


function CarouselArrows({
  onPrev,
  onNext,
  className,
}: {
  onPrev: () => void
  onNext: () => void
  className?: string
}): React.ReactElement {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <button
        type="button"
        onClick={onPrev}
        aria-label="Previous step"
        className="grid size-10 place-items-center rounded-full border border-hairline-strong bg-surface-card/90 text-ink shadow-xs transition-colors hover:border-ink hover:bg-surface-strong"
      >
        <ArrowLeftIcon size={16} weight="bold" />
      </button>

      <button
        type="button"
        onClick={onNext}
        aria-label="Next step"
        className="grid size-10 place-items-center rounded-full border border-hairline-strong bg-surface-card/90 text-ink shadow-xs transition-colors hover:border-ink hover:bg-surface-strong"
      >
        <ArrowRightIcon size={16} weight="bold" />
      </button>
    </div>
  )
}

function StepGraphic({ index }: { index: number }): React.ReactElement {
  const icons = [UsersThreeIcon, DatabaseIcon, CpuIcon, GearSixIcon, TrendUpIcon]
  const Icon = icons[index] ?? UsersThreeIcon
  const theme = STAGE_THEMES[index] ?? STAGE_THEMES[0]

  return (
    <div className={cn(
      "relative flex h-full min-h-[260px] w-full flex-col items-center justify-center overflow-hidden p-8 transition-colors duration-500",
      `bg-gradient-to-br ${theme.bgGradient} bg-surface-card/60`
    )}>
      {/* Editorial geometric grid background */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-surface-card)_0%,transparent_70%)] opacity-80"
        aria-hidden
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--color-hairline)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-hairline)_1px,transparent_1px)] bg-[size:28px_28px] opacity-40"
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className={cn(
          "relative grid size-20 place-items-center rounded-2xl border transition-all duration-300",
          theme.iconBox
        )}>
          <Icon size={40} weight="duotone" />
        </div>
        <span className="eyebrow mt-5 font-mono text-[11px] tracking-[0.16em] text-muted-ink uppercase">
          Stage 0{index + 1}
        </span>
        <span className={cn("mt-1 font-mono text-xs font-semibold tracking-wide", theme.accentText)}>
          {HR_AI_FLOW[index]?.title}
        </span>
      </div>
    </div>
  )
}

function FlowCard({
  step,
  index,
  isActive,
  reduceMotion,
}: {
  step: HrAiStep
  index: number
  isActive: boolean
  reduceMotion: boolean | null
}): React.ReactElement {
  const theme = STAGE_THEMES[index] ?? STAGE_THEMES[0]

  return (
    <motion.div
      aria-hidden={!isActive}
      className="[grid-area:1/1]"
      initial={false}
      animate={
        reduceMotion
          ? { opacity: isActive ? 1 : 0 }
          : {
              opacity: isActive ? 1 : 0,
              y: isActive ? 0 : 14,
              scale: isActive ? 1 : 0.97,
            }
      }
      transition={{ duration: 0.5, ease: REVEAL_EASE }}
      style={{
        zIndex: isActive ? 10 : 1,
        pointerEvents: isActive ? "auto" : "none",
        transformOrigin: "top center",
        willChange: isActive ? "transform, opacity" : "auto",
      }}
    >
      <Card
        className={cn(
          "relative flex h-full flex-col overflow-hidden rounded-2xl border bg-surface-card/95 backdrop-blur-sm p-0 ring-0 transition-all duration-500",
          isActive ? theme.activeCardBorder : "border-hairline"
        )}
      >
        <div className="relative z-10 grid h-full grid-cols-1 md:grid-cols-2">
          {/* Visual stage illustration on left/top */}
          <div className="relative overflow-hidden border-b border-hairline md:border-r md:border-b-0">
            <StepGraphic index={index} />
          </div>

          <div className="flex flex-col p-6 sm:p-7">
            <div className="flex flex-wrap items-center gap-2">
              <span className="eyebrow text-muted-ink">/ {step.step}</span>

              <Badge
                variant="outline"
                className={cn("ml-auto rounded-full px-2.5 py-0.5 font-mono text-[10px] tracking-[0.12em] uppercase font-semibold", theme.badge)}
              >
                {step.tag}
              </Badge>
            </div>

            <h3 className="mt-5 text-xl sm:text-[1.35rem] font-bold tracking-tight text-ink">
              {step.title}
            </h3>

            <span className={cn("mt-1 font-mono text-xs tracking-wide font-semibold", theme.accentText)}>
              {step.subtitle}
            </span>

            <p className="mt-2.5 max-w-[46ch] text-[14px] leading-relaxed text-body">
              {step.description}
            </p>

            <div className="mt-auto flex items-center justify-between gap-3 border-t border-hairline-soft pt-5">
              <Link
                href="#contact"
                tabIndex={isActive ? undefined : -1}
                className="group/link inline-flex items-center gap-2 border-b border-transparent pb-0.5 text-sm font-medium text-ink transition-[gap,border-color] hover:gap-3 hover:border-ink"
              >
                Discuss in a call
                <ArrowUpRightIcon
                  size={14}
                  weight="bold"
                  className="transition-transform group-hover/link:translate-x-0.5"
                />
              </Link>

              <span className="font-mono text-[11px] tracking-[0.08em] text-muted-ink">
                Flow Stage {step.step} of 05
              </span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

function CountdownRing({
  label,
  reduceMotion,
}: {
  label: string
  reduceMotion: boolean | null
}): React.ReactElement {
  const size = RING_SIZE
  const stroke = 1.5
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius

  return (
    <span
      className="relative grid shrink-0 place-items-center"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="absolute -rotate-90"
        aria-hidden
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          className="stroke-hairline/70"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          className="stroke-ink"
          strokeDasharray={circumference}
          style={
            reduceMotion
              ? { strokeDashoffset: 0 }
              : {
                  ["--cd-circumference" as string]: circumference,
                  animation: `selected-work-ring ${SLIDE_SECONDS}s linear forwards`,
                }
          }
        />
      </svg>

      <span className="font-mono text-[11px] text-ink tabular-nums">
        {label}
      </span>
    </span>
  )
}

function Timeline({
  orientation,
  active,
  reduceMotion,
}: {
  orientation: "horizontal" | "vertical"
  active: number
  reduceMotion: boolean | null
}): React.ReactElement {
  const isHorizontal = orientation === "horizontal"
  const baseFraction = clamp(active / HR_AI_FLOW.length, 0, 1)

  return (
    <div
      className={cn(
        "relative bg-hairline",
        isHorizontal ? "h-px w-full" : "h-full w-px"
      )}
    >
      {isHorizontal ? (
        <>
          <div
            className="absolute inset-y-0 left-0 origin-left bg-ink"
            style={{ width: `${baseFraction * 100}%` }}
          />
          {!reduceMotion && (
            <div
              key={active}
              className="absolute inset-y-0 origin-left bg-ink"
              style={{
                left: `${baseFraction * 100}%`,
                width: `${SEGMENT_FRACTION * 100}%`,
                animation: `selected-work-fill ${SLIDE_SECONDS}s linear forwards`,
              }}
            />
          )}
        </>
      ) : (
        <>
          <div
            className="absolute inset-x-0 top-0 origin-top bg-ink"
            style={{ height: `${baseFraction * 100}%` }}
          />
          {!reduceMotion && (
            <div
              key={active}
              className="absolute inset-x-0 origin-top bg-ink"
              style={{
                top: `${baseFraction * 100}%`,
                height: `${SEGMENT_FRACTION * 100}%`,
                animation: `selected-work-fill-y ${SLIDE_SECONDS}s linear forwards`,
              }}
            />
          )}
        </>
      )}

      {HR_AI_FLOW.map((item, index) => {
        const isActive = index === active
        const offset = `${((index + 0.5) / HR_AI_FLOW.length) * 100}%`

        return (
          <div
            key={item.title}
            className={cn(
              "absolute",
              isHorizontal
                ? "top-1/2 -translate-x-1/2 -translate-y-1/2"
                : "left-1/2 flex -translate-x-1/2 items-center"
            )}
            style={isHorizontal ? { left: offset } : { top: offset }}
          >
            <motion.span
              className={cn(
                "block size-1.5 rounded-full transition-colors",
                isActive ? "bg-ink" : "bg-hairline-strong"
              )}
              animate={{ scale: isActive ? 1.4 : 1 }}
              transition={{ duration: 0.3, ease: REVEAL_EASE }}
            />

            <span
              className={cn(
                "absolute font-mono text-[10px] tracking-[0.1em] tabular-nums transition-colors",
                isHorizontal ? "top-3 left-1/2 -translate-x-1/2" : "left-3",
                isActive ? "text-muted-ink" : "text-muted-soft/70"
              )}
            >
              {item.step}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export function SelectedWork(): React.ReactElement {
  const reduceMotion = useReducedMotion()
  const [active, setActive] = React.useState(0)

  const activeLabelRef = React.useRef<HTMLButtonElement | null>(null)
  const labelStripRef = React.useRef<HTMLOListElement | null>(null)

  const goTo = React.useCallback((index: number) => {
    setActive(((index % HR_AI_FLOW.length) + HR_AI_FLOW.length) % HR_AI_FLOW.length)
  }, [])

  const goNext = React.useCallback(() => {
    setActive((previous) => (previous + 1) % HR_AI_FLOW.length)
  }, [])
  const goPrev = React.useCallback(() => {
    setActive((previous) => (previous - 1 + HR_AI_FLOW.length) % HR_AI_FLOW.length)
  }, [])

  React.useEffect(() => {
    const strip = labelStripRef.current
    const label = activeLabelRef.current
    if (!strip || !label) return
    if (strip.scrollWidth <= strip.clientWidth) return

    const target =
      label.offsetLeft - strip.clientWidth / 2 + label.clientWidth / 2

    strip.scrollTo({
      left: clamp(target, 0, strip.scrollWidth - strip.clientWidth),
      behavior: reduceMotion ? "auto" : "smooth",
    })
  }, [active, reduceMotion])

  React.useEffect(() => {
    if (reduceMotion) return

    const timer = setTimeout(() => {
      setActive((previous) => (previous + 1) % HR_AI_FLOW.length)
    }, SLIDE_SECONDS * 1000)

    return () => clearTimeout(timer)
  }, [active, reduceMotion])

  return (
    <section
      id="hr-ai"
      aria-labelledby="hr-ai-h"
      className="relative border-t border-hairline/80 scroll-mt-12 bg-gradient-to-b from-[#faf9f4] via-[#f5f3ec] to-[#edebe2] dark:from-[#11100d] dark:via-[#161511] dark:to-[#1a1914] overflow-hidden"
    >
      <div id="work" className="sr-only" />

      {/* Dynamic ambient color glow that shifts with active stage */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-1/4 h-[500px] w-[500px] rounded-full blur-3xl opacity-25 transition-colors duration-700"
        style={{ backgroundColor: STAGE_THEMES[active]?.color ?? "#f54e00" }}
      />

      {/* Intro */}
      <SectionShell className="relative z-10 pt-20 sm:pt-28">
        <div className="flex items-start justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="eyebrow text-muted-ink">01</span>
            <span className="eyebrow text-ink uppercase">HR + AI</span>
          </div>

          <span className="hidden font-mono text-[11px] tracking-[0.1em] text-muted-ink uppercase md:block">
            Modern Practice
          </span>
        </div>

        <h2
          id="hr-ai-h"
          className="mt-8 max-w-[28ch] text-[clamp(1.5rem,2.6vw,2.15rem)] font-bold tracking-[-0.02em] leading-[1.2] text-ink"
        >
          Connecting People, Data and Technology for Better HR Decisions.
        </h2>

        <p className="mt-4 max-w-[58ch] text-[14px] leading-relaxed text-body sm:text-[15px]">
          AI, automation, and data are transforming the way organizations understand
          people and make decisions. Modern HR can combine human expertise with
          technology to create smarter, faster, and more effective processes.
        </p>

        {/* Visual Flow Banner: PEOPLE → DATA → AI → AUTOMATION → BETTER DECISIONS */}
        <div className="mt-10 overflow-x-auto pb-2">
          <div className="inline-flex min-w-full items-center justify-between gap-2 rounded-2xl border border-hairline/80 bg-surface-card/85 p-2.5 backdrop-blur-md shadow-xs sm:gap-3 sm:p-3">
            {HR_AI_FLOW.map((step, idx) => {
              const isCurrent = idx === active
              const theme = STAGE_THEMES[idx] ?? STAGE_THEMES[0]
              return (
                <React.Fragment key={step.step}>
                  <button
                    type="button"
                    onClick={() => goTo(idx)}
                    className={cn(
                      "group flex flex-1 items-center justify-center gap-2 rounded-xl px-2.5 py-2 text-center transition-all sm:px-3",
                      isCurrent
                        ? theme.bannerPill
                        : "hover:bg-foreground/[0.04] text-body hover:text-ink"
                    )}
                  >
                    <span className={cn(
                      "font-mono text-[10px] tracking-wider sm:text-[11px]",
                      isCurrent ? "opacity-90 font-bold" : "opacity-75"
                    )}>
                      {step.step}
                    </span>
                    <span className="text-xs font-semibold tracking-wide uppercase sm:text-sm">
                      {step.title}
                    </span>
                  </button>

                  {idx < HR_AI_FLOW.length - 1 && (
                    <span
                      aria-hidden
                      className="shrink-0 text-xs font-bold text-muted-soft select-none"
                    >
                      →
                    </span>
                  )}
                </React.Fragment>
              )
            })}
          </div>
        </div>
      </SectionShell>

      {/* Main carousel area */}
      <SectionShell className="relative z-10 pt-10 pb-20 sm:pb-28">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left column: Step list */}
          <div className="hidden lg:col-span-4 lg:flex lg:flex-col lg:gap-6">
            <ol className="flex flex-col gap-2">
              {HR_AI_FLOW.map((item, index) => {
                const isActive = index === active
                const theme = STAGE_THEMES[index] ?? STAGE_THEMES[0]
                return (
                  <li key={item.step}>
                    <button
                      type="button"
                      onClick={() => goTo(index)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition-all border",
                        isActive
                          ? theme.activeListItem
                          : "border-transparent text-body hover:bg-foreground/[0.04] hover:text-ink"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span className={cn(
                          "size-2 rounded-full transition-transform duration-300",
                          theme.dot,
                          isActive && "scale-125"
                        )} />
                        <span className="font-mono text-xs opacity-75">
                          {item.step}
                        </span>
                        <span className="text-sm font-semibold">{item.title}</span>
                      </div>
                      <span className="font-mono text-[11px] opacity-75">
                        {item.tag}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ol>

            <div className="mt-4 flex items-center justify-between border-t border-hairline pt-6">
              <CountdownRing
                key={active}
                label={HR_AI_FLOW[active]?.step ?? "01"}
                reduceMotion={reduceMotion}
              />
              <CarouselArrows onPrev={goPrev} onNext={goNext} />
            </div>
          </div>

          {/* Right column: Interactive Flow Card Stack */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1">
              {HR_AI_FLOW.map((step, index) => (
                <FlowCard
                  key={step.step}
                  step={step}
                  index={index}
                  isActive={index === active}
                  reduceMotion={reduceMotion}
                />
              ))}
            </div>

            {/* Mobile / Tablet controls */}
            <div className="mt-6 flex items-center justify-between lg:hidden">
              <CountdownRing
                key={active}
                label={HR_AI_FLOW[active]?.step ?? "01"}
                reduceMotion={reduceMotion}
              />
              <div className="w-1/2">
                <Timeline
                  orientation="horizontal"
                  active={active}
                  reduceMotion={reduceMotion}
                />
              </div>
              <CarouselArrows onPrev={goPrev} onNext={goNext} />
            </div>
          </div>
        </div>
      </SectionShell>
    </section>
  )
}
export { SelectedWork as HrAi }
