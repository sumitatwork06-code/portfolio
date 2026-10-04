"use client"

import * as React from "react"
import Image from "next/image"
import {
  ArrowUpRightIcon,
  CalendarCheckIcon,
  CheckCircleIcon,
  EnvelopeSimpleIcon,
} from "@phosphor-icons/react"

import { Button } from "@/components/ui/button"
import { Reveal, RevealGroup } from "@/components/reveal"
import { SectionHead, SectionShell } from "@/components/section-shell"
import { ABOUT_META, SITE_CONFIG } from "@/lib/content"

function WhatsAppIcon({ className = "size-4" }: { className?: string }): React.ReactElement {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.888 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function buildWhatsAppUrl(
  data: {
    name: string
    email: string
    phone?: string
    company?: string
    purpose: string
    date: string
    time: string
    message?: string
  },
  number: string
): string {
  const cleanNumber = number.replace(/\D/g, "")
  const lines = [
    "📅 *New Call Appointment Request – Nityam Kumar*",
    "",
    `👤 *Name:* ${data.name || "N/A"}`,
    `✉️ *Email:* ${data.email || "N/A"}`,
    `📞 *Phone:* ${data.phone || "Not provided"}`,
    `🏢 *Company:* ${data.company || "Not provided"}`,
    `🎯 *Purpose of Call:* ${data.purpose || "N/A"}`,
    `🗓️ *Preferred Date:* ${data.date || "N/A"}`,
    `⏰ *Preferred Time:* ${data.time || "N/A"}`,
    `💬 *Message:* ${data.message || "None"}`,
  ]
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(lines.join("\n"))}`
}

export function Contact(): React.ReactElement {
  const [submitted, setSubmitted] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    purpose: "",
    date: "",
    time: "",
    message: "",
  })
  const [submittedData, setSubmittedData] = React.useState(formData)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // 1. Send automated background email notification via API route
      await fetch("/api/appoint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
    } catch (err) {
      console.error("Appointment submission error:", err)
    } finally {
      setIsSubmitting(false)
      setSubmittedData({ ...formData })
      setSubmitted(true)
    }
  }

  const whatsAppDraftLink = buildWhatsAppUrl(formData, SITE_CONFIG.whatsappNumber)
  const whatsAppSubmittedLink = buildWhatsAppUrl(submittedData, SITE_CONFIG.whatsappNumber)

  return (
    <div className="relative isolate overflow-hidden bg-gradient-to-b from-[#f7f6f1] via-[#f3f2ea] to-[#eae8de] dark:from-[#13120f] dark:via-[#171612] dark:to-[#11100d]">
      {/* Editorial backdrop behind the About + Contact bands */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-20 top-20 h-[600px] w-[600px] opacity-[0.10] sm:right-10 sm:top-28 sm:h-[720px] sm:w-[720px] sm:opacity-[0.14] lg:right-20 lg:h-[820px] lg:w-[820px]">
          <Image
            src="/images/logo-transparent.png"
            alt="Nityam Singh Logo"
            aria-hidden
            fill
            sizes="(min-width: 1024px) 820px, 600px"
            className="object-contain"
          />
        </div>
      </div>

      {/* Cloudy fades: melt the image into the canvas at the top + bottom edges */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-canvas via-canvas/60 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-canvas via-canvas/60 to-transparent" />

      {/* About band */}
      <section id="about" aria-labelledby="about-h" className="py-20 sm:py-28 scroll-mt-12">
        <SectionShell>
          <SectionHead
            numeral="06"
            label="About"
            aside="Profile"
            titleId="about-h"
            title="About Nityam Singh"
            hiddenTitle
          />
          <RevealGroup className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
            <Reveal as="div" className="space-y-6 lg:col-span-8">
              <div className="flex items-center gap-3.5 pb-1">
                <div className="relative size-14 shrink-0 overflow-hidden rounded-2xl border-2 border-hairline-strong bg-zinc-800 shadow-md">
                  <Image
                    src={SITE_CONFIG.profilePhoto}
                    alt={SITE_CONFIG.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-base font-bold text-ink">{SITE_CONFIG.name}</h3>
                  <p className="font-mono text-xs text-muted-ink">
                    {SITE_CONFIG.title}
                  </p>
                </div>
              </div>

              <blockquote className="max-w-[34ch] text-base sm:text-lg lg:text-xl font-semibold leading-relaxed tracking-tight text-ink">
                &ldquo;I am an HR professional with a strong interest in AI and
                HR technology. My focus is on connecting people, data,
                technology, and business to build more effective and modern HR
                practices.&rdquo;
              </blockquote>

              <p className="max-w-[54ch] text-sm sm:text-[15px] leading-relaxed text-body">
                I am interested in using AI, automation, data, and technology to
                improve HR processes, support better decision-making, and
                create meaningful employee experiences.
              </p>

              <div className="rounded-xl border border-orange-200/80 dark:border-orange-900/50 bg-gradient-to-r from-orange-50/90 via-amber-50/70 to-orange-50/60 dark:from-orange-950/40 dark:via-amber-950/30 dark:to-orange-950/20 p-5 shadow-xs">
                <span className="caption-uppercase text-orange-700 dark:text-orange-400 font-bold">
                  Career Focus
                </span>
                <p className="mt-1.5 text-sm font-semibold text-ink">
                  Building a career at the intersection of Human Resources,
                  Technology, AI, and Business.
                </p>
              </div>
            </Reveal>

            <Reveal as="dl" className="border-t border-hairline lg:col-span-4">
              {ABOUT_META.map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-baseline justify-between gap-4 border-b border-hairline py-4 font-mono text-[12.5px]"
                >
                  <dt className="text-[11px] tracking-[0.08em] text-muted-ink uppercase">
                    {k}
                  </dt>
                  <dd className="text-ink font-medium">{v}</dd>
                </div>
              ))}
            </Reveal>
          </RevealGroup>
        </SectionShell>
      </section>

      {/* Contact / Appoint a Call band */}
      <section
        id="contact"
        aria-labelledby="contact-h"
        className="relative py-20 sm:py-28 border-t border-hairline-soft scroll-mt-12"
      >
        <SectionShell>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Left info column */}
            <RevealGroup className="lg:col-span-5">
              <Reveal
                as="span"
                className="eyebrow flex items-center gap-3 text-muted-ink uppercase"
              >
                <span>07</span>
                <span className="text-ink">Contact</span>
              </Reveal>

              <Reveal
                as="h2"
                id="contact-h"
                className="mt-5 text-xl sm:text-2xl lg:text-[1.85rem] font-bold leading-tight tracking-tight text-ink"
              >
                Appoint a Call
              </Reveal>

              <Reveal
                as="p"
                className="mt-3 max-w-[42ch] text-[14px] leading-relaxed text-body"
              >
                Let&apos;s discuss modern HR practices, talent acquisition,
                operational improvements, or how AI and data can empower your
                organization. Fill in your preferred time to schedule a call.
              </Reveal>

              {/* Channel indicators badge */}
              <Reveal className="mt-6 flex flex-wrap gap-2 text-xs">
                <span className="inline-flex items-center gap-1.5 rounded-md border border-hairline bg-surface-card px-2.5 py-1 text-muted-ink">
                  <EnvelopeSimpleIcon size={14} className="text-primary" />
                  <span>Email Notification</span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-emerald-700 dark:text-emerald-400 font-medium">
                  <WhatsAppIcon className="size-3.5 text-[#25D366]" />
                  <span>WhatsApp Direct</span>
                </span>
              </Reveal>

              <Reveal className="mt-6 flex flex-col gap-3 font-mono text-[13px]">
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="inline-flex items-center gap-2.5 text-body font-semibold transition-colors hover:text-primary"
                >
                  <EnvelopeSimpleIcon size={16} className="text-primary" />
                  <span>{SITE_CONFIG.email}</span>
                </a>

                <div className="mt-2 flex flex-wrap gap-2 text-xs">
                  <a
                    href={SITE_CONFIG.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-surface-card px-3.5 py-1.5 font-medium text-muted-ink shadow-2xs transition-all hover:text-primary hover:border-primary/50 hover:bg-orange-50/50 dark:hover:bg-orange-950/30"
                  >
                    LinkedIn <ArrowUpRightIcon size={12} />
                  </a>
                  <a
                    href={SITE_CONFIG.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-surface-card px-3.5 py-1.5 font-medium text-muted-ink shadow-2xs transition-all hover:text-primary hover:border-primary/50 hover:bg-orange-50/50 dark:hover:bg-orange-950/30"
                  >
                    X / Twitter <ArrowUpRightIcon size={12} />
                  </a>
                  <a
                    href={SITE_CONFIG.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-surface-card px-3.5 py-1.5 font-medium text-muted-ink shadow-2xs transition-all hover:text-primary hover:border-primary/50 hover:bg-orange-50/50 dark:hover:bg-orange-950/30"
                  >
                    Instagram <ArrowUpRightIcon size={12} />
                  </a>
                  <a
                    href={SITE_CONFIG.social.snapchat}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-surface-card px-3.5 py-1.5 font-medium text-muted-ink shadow-2xs transition-all hover:text-primary hover:border-primary/50 hover:bg-orange-50/50 dark:hover:bg-orange-950/30"
                  >
                    Snapchat <ArrowUpRightIcon size={12} />
                  </a>
                </div>
              </Reveal>
            </RevealGroup>

            {/* Right form column */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-orange-200/70 dark:border-orange-900/50 bg-white/95 dark:bg-surface-card/95 p-6 sm:p-8 backdrop-blur-md shadow-[0_12px_40px_-12px_rgba(245,78,0,0.12)] dark:shadow-[0_12px_40px_-12px_rgba(245,78,0,0.25)]">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-6 text-center">
                    <div className="flex size-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      <CheckCircleIcon size={38} weight="fill" />
                    </div>

                    <h3 className="mt-4 text-xl font-bold text-ink">
                      Request Sent
                    </h3>

                    <p className="mt-2 max-w-[46ch] text-sm leading-relaxed text-body">
                      {SITE_CONFIG.confirmationMessage}
                    </p>

                    {/* Summary of submitted details */}
                    <div className="mt-6 w-full rounded-xl border border-hairline bg-canvas/70 p-4 text-left font-mono text-xs text-muted-ink shadow-2xs">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hairline pb-2.5 mb-2.5 font-sans font-bold text-ink text-sm">
                        <span>{submittedData.purpose || "Call Appointment"}</span>
                        <span className="font-mono text-xs font-semibold text-primary">
                          {submittedData.date} · {submittedData.time}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-muted-soft">Name: </span>
                          <span className="text-ink font-medium">{submittedData.name}</span>
                        </div>
                        <div>
                          <span className="text-muted-soft">Email: </span>
                          <span className="text-ink font-medium">{submittedData.email}</span>
                        </div>
                        <div>
                          <span className="text-muted-soft">Phone: </span>
                          <span className="text-ink font-medium">{submittedData.phone || "Not provided"}</span>
                        </div>
                        <div>
                          <span className="text-muted-soft">Company: </span>
                          <span className="text-ink font-medium">{submittedData.company || "Not provided"}</span>
                        </div>
                      </div>
                      {submittedData.message && (
                        <div className="mt-2.5 pt-2 border-t border-hairline/70">
                          <span className="text-muted-soft">Message: </span>
                          <span className="text-ink font-medium">{submittedData.message}</span>
                        </div>
                      )}
                    </div>

                    {/* Instant WhatsApp action */}
                    <div className="mt-6 w-full flex flex-col gap-2">
                      <a
                        href={whatsAppSubmittedLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-center gap-2.5 rounded-lg bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-[#20ba5a] active:scale-[0.99] transition-all"
                      >
                        <WhatsAppIcon className="size-5 text-white" />
                        <span>Notify Nityam on WhatsApp Directly (1-Click)</span>
                      </a>
                      <p className="text-[11.5px] text-muted-ink">
                        Automated email notification has been dispatched to HR. Click above to also message Nityam directly on WhatsApp.
                      </p>
                    </div>

                    <Button
                      type="button"
                      onClick={() => {
                        setSubmitted(false)
                        setFormData({
                          name: "",
                          email: "",
                          phone: "",
                          company: "",
                          purpose: "",
                          date: "",
                          time: "",
                          message: "",
                        })
                      }}
                      variant="outline"
                      className="mt-6 border-hairline-strong text-xs"
                    >
                      Submit Another Request
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="name"
                          className="caption-uppercase mb-1.5 block text-muted-ink"
                        >
                          Name <span className="text-primary">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          className="w-full rounded-md border border-hairline bg-canvas/80 px-3.5 py-2 text-sm text-ink placeholder:text-muted-soft focus:border-ink focus:outline-none"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="caption-uppercase mb-1.5 block text-muted-ink"
                        >
                          Email <span className="text-primary">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="name@example.com"
                          className="w-full rounded-md border border-hairline bg-canvas/80 px-3.5 py-2 text-sm text-ink placeholder:text-muted-soft focus:border-ink focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="phone"
                          className="caption-uppercase mb-1.5 block text-muted-ink"
                        >
                          Phone
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91..."
                          className="w-full rounded-md border border-hairline bg-canvas/80 px-3.5 py-2 text-sm text-ink placeholder:text-muted-soft focus:border-ink focus:outline-none"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="company"
                          className="caption-uppercase mb-1.5 block text-muted-ink"
                        >
                          Company
                        </label>
                        <input
                          id="company"
                          name="company"
                          type="text"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Organization name"
                          className="w-full rounded-md border border-hairline bg-canvas/80 px-3.5 py-2 text-sm text-ink placeholder:text-muted-soft focus:border-ink focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="purpose"
                        className="caption-uppercase mb-1.5 block text-muted-ink"
                      >
                        Purpose of Call <span className="text-primary">*</span>
                      </label>
                      <input
                        id="purpose"
                        name="purpose"
                        type="text"
                        required
                        value={formData.purpose}
                        onChange={handleChange}
                        placeholder="e.g. Talent Acquisition, HR Tech Collaboration, Consultation"
                        className="w-full rounded-md border border-hairline bg-canvas/80 px-3.5 py-2 text-sm text-ink placeholder:text-muted-soft focus:border-ink focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="date"
                          className="caption-uppercase mb-1.5 block text-muted-ink"
                        >
                          Preferred Date <span className="text-primary">*</span>
                        </label>
                        <input
                          id="date"
                          name="date"
                          type="date"
                          required
                          value={formData.date}
                          onChange={handleChange}
                          className="w-full rounded-md border border-hairline bg-canvas/80 px-3.5 py-2 text-sm text-ink placeholder:text-muted-soft focus:border-ink focus:outline-none"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="time"
                          className="caption-uppercase mb-1.5 block text-muted-ink"
                        >
                          Preferred Time <span className="text-primary">*</span>
                        </label>
                        <input
                          id="time"
                          name="time"
                          type="time"
                          required
                          value={formData.time}
                          onChange={handleChange}
                          className="w-full rounded-md border border-hairline bg-canvas/80 px-3.5 py-2 text-sm text-ink placeholder:text-muted-soft focus:border-ink focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="caption-uppercase mb-1.5 block text-muted-ink"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={3}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Brief overview or agenda for our call..."
                        className="w-full rounded-md border border-hairline bg-canvas/80 px-3.5 py-2 text-sm text-ink placeholder:text-muted-soft focus:border-ink focus:outline-none resize-none"
                      />
                    </div>

                    {/* Dual Action Controls */}
                    <div className="mt-2 flex flex-col sm:flex-row gap-3">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="h-11 flex-1 rounded-md bg-primary text-sm font-medium text-primary-foreground hover:bg-primary-active transition-all cursor-pointer"
                      >
                        {isSubmitting ? (
                          <span className="inline-flex items-center gap-2">
                            <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                            Scheduling Call...
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-2">
                            <CalendarCheckIcon size={18} weight="bold" />
                            Appoint a Call
                          </span>
                        )}
                      </Button>

                      <a
                        href={whatsAppDraftLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-11 inline-flex items-center justify-center gap-2 rounded-md border border-emerald-600/30 bg-emerald-50 dark:bg-emerald-950/30 px-4 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-all shadow-2xs"
                        title="Send booking directly via WhatsApp"
                      >
                        <WhatsAppIcon className="size-4 text-[#25D366]" />
                        <span>Book via WhatsApp</span>
                      </a>
                    </div>

                    <p className="text-center font-mono text-[11px] text-muted-ink">
                      ⚡ Automated email notification + Instant WhatsApp messaging enabled.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </SectionShell>
      </section>
    </div>
  )
}
