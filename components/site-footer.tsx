import Image from "next/image"
import Link from "next/link"

import { SectionShell } from "@/components/section-shell"
import { FOOTER_COLUMNS } from "@/lib/content"

export function SiteFooter(): React.ReactElement {
  return (
    <footer className="bg-canvas pt-14 pb-10 border-t border-hairline">
      <SectionShell>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-5 md:gap-x-8">
          <div className="sm:col-span-2 md:col-span-2">
            <Link
              href="#hero"
              className="inline-flex items-center gap-2.5 text-[15px] font-bold tracking-tight text-ink group"
            >
              <div className="relative size-6 shrink-0 overflow-hidden rounded-md border border-hairline bg-black shadow-xs transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/images/logo.png"
                  alt="Nityam Singh Logo"
                  fill
                  sizes="24px"
                  className="object-contain p-0.5"
                />
              </div>
              <span>Nityam Singh</span>
            </Link>
            <p className="mt-3 max-w-[34ch] text-sm leading-[1.55] text-body">
              An HR professional passionate about connecting people, technology,
              and business through modern HR practices, AI, data, and automation.
            </p>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="caption-uppercase mb-4 text-muted-ink">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2">
                {col.links.map(([label, href]) => {
                  const isExternal = href.startsWith("http")
                  return (
                    <li key={label}>
                      <Link
                        href={href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        className="text-sm text-body transition-colors hover:text-ink"
                      >
                        {label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}


          <div>
            <h4 className="caption-uppercase mb-4 text-muted-ink">Status</h4>
            <ul className="flex flex-col gap-2 text-sm">
              <li className="text-ink">Open to Connect</li>
              <li className="text-body">India · GMT +5:30</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-hairline-soft pt-6 font-mono text-[11px] tracking-[0.06em] text-muted-ink">
          <span>© 2026 Nityam Kumar. All Rights Reserved.</span>
          <span>HR | AI | Technology | People | Data.</span>
        </div>

      </SectionShell>
    </footer>
  )
}
