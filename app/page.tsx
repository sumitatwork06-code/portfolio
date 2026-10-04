import type { Metadata } from "next"

import { Approach } from "@/components/approach"
import { Capabilities } from "@/components/capabilities"
import { Contact } from "@/components/contact"
import { Experience } from "@/components/experience"
import { Hero } from "@/components/hero"
import { PracticeStrip } from "@/components/practice-strip"
import { SelectedWork } from "@/components/selected-work"
import { Stack } from "@/components/stack"
import { SITE_CONFIG } from "@/lib/content"
import { getLocation } from "@/lib/location"
import { getWeather } from "@/lib/weather"

const title = `${SITE_CONFIG.name} · ${SITE_CONFIG.title}`
const description = `${SITE_CONFIG.tagline} HR Professional passionate about modern HR practices, AI, data, and automation.`

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: SITE_CONFIG.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/nityam-profile.jpg",
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@nityam__rajput",
    images: ["/images/nityam-profile.jpg"],
  },
}


export default async function Page(): Promise<React.ReactElement> {
  // Resolve the visitor's location, then their weather — both server-side, so
  // the hero receives ready-to-render, serializable props (no client fetching).
  const location = await getLocation()
  const weather = await getWeather(location)

  return (
    <main className="relative">
      <Hero location={location} weather={weather} />
      <PracticeStrip />
      <SelectedWork />
      <Capabilities />
      <Experience />
      <Approach />
      <Stack />
      <Contact />
    </main>
  )
}
