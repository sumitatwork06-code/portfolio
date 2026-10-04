// ─────────────────────────────────────────────────────────────────────────
// Visitor geolocation (server-side)
//
// Resolves *where the visitor is* so the hero's locator strip can show their
// city, their local weather, and their time. Runs on the server and degrades
// gracefully through three tiers:
//
//   1. Production on Vercel → free geo headers present on every request
//      (x-vercel-ip-city / -latitude / -longitude / -timezone / -country).
//   2. Local dev (no Vercel headers) → free, no-key IP lookup (ipwho.is / ip-api.com),
//      which geolocates the visitor's real public IP.
//   3. Fallback → standard default (Noida, IN).
// ─────────────────────────────────────────────────────────────────────────
import { headers } from "next/headers"

export type GeoLocation = {
  /** Lower-case city name; the locator uppercases it via CSS. */
  city: string
  /** Lower-case country code shown after the city (e.g. "in"). */
  region: string
  latitude: number
  longitude: number
  /** IANA timezone name (e.g. "Asia/Kolkata") — used for the weather fetch. */
  timezone: string
}

// Tier 3 — used when neither the headers nor the IP lookup resolve.
const FALLBACK: GeoLocation = {
  city: "noida",
  region: "in",
  latitude: 28.5355,
  longitude: 77.3910,
  timezone: "Asia/Kolkata",
}

export async function getLocation(): Promise<GeoLocation> {
  // ── Tier 1: Vercel injects these headers on every production request. ──
  try {
    const h = await headers()
    const city = h.get("x-vercel-ip-city")
    const latitude = h.get("x-vercel-ip-latitude")
    const longitude = h.get("x-vercel-ip-longitude")

    if (city && latitude && longitude) {
      return {
        // Vercel RFC3986-encodes non-ASCII city names, so decode first.
        city: decodeURIComponent(city).toLowerCase(),
        region: (h.get("x-vercel-ip-country") ?? FALLBACK.region).toLowerCase(),
        latitude: Number(latitude),
        longitude: Number(longitude),
        timezone: h.get("x-vercel-ip-timezone") ?? FALLBACK.timezone,
      }
    }
  } catch {
    // If headers() is unavailable
  }

  // ── Tier 2: IP lookup via reliable free endpoints (no API key needed). ──
  // 2a. Primary: ipwho.is (fast, highly accurate, no rate-limiting block)
  try {
    const res = await fetch("https://ipwho.is/", {
      cache: "no-store",
      headers: { "User-Agent": "Mozilla/5.0" },
    })
    if (res.ok) {
      const d = (await res.json()) as {
        success?: boolean
        city?: string
        country_code?: string
        latitude?: number
        longitude?: number
        timezone?: { id?: string }
      }
      if (
        d.success &&
        typeof d.latitude === "number" &&
        typeof d.longitude === "number"
      ) {
        return {
          city: (d.city ?? FALLBACK.city).toLowerCase(),
          region: (d.country_code ?? FALLBACK.region).toLowerCase(),
          latitude: d.latitude,
          longitude: d.longitude,
          timezone: d.timezone?.id ?? FALLBACK.timezone,
        }
      }
    }
  } catch {
    // Continue to next provider
  }

  // 2b. Secondary: ip-api.com
  try {
    const res = await fetch("http://ip-api.com/json/", {
      cache: "no-store",
    })
    if (res.ok) {
      const d = (await res.json()) as {
        status?: string
        city?: string
        countryCode?: string
        lat?: number
        lon?: number
        timezone?: string
      }
      if (
        d.status === "success" &&
        typeof d.lat === "number" &&
        typeof d.lon === "number"
      ) {
        return {
          city: (d.city ?? FALLBACK.city).toLowerCase(),
          region: (d.countryCode ?? FALLBACK.region).toLowerCase(),
          latitude: d.lat,
          longitude: d.lon,
          timezone: d.timezone ?? FALLBACK.timezone,
        }
      }
    }
  } catch {
    // Continue to fallback
  }

  // ── Tier 3: Default fallback ──
  return FALLBACK
}
