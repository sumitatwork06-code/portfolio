"use client"

import * as React from "react"
import {
  CloudFogIcon,
  CloudIcon,
  CloudLightningIcon,
  CloudRainIcon,
  CloudSnowIcon,
  CloudSunIcon,
  SunIcon,
} from "@phosphor-icons/react"

import { cn } from "@/lib/utils"
import type { GeoLocation } from "@/lib/location"
import type { Weather } from "@/lib/weather"

const TEMP_SYMBOL = "°C"

type IconComponent = React.ComponentType<{
  size?: number
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone"
  className?: string
  "aria-hidden"?: boolean
}>

// Open-Meteo WMO weather codes → editorial icon + label.
function weatherFor(code: number): { Icon: IconComponent; label: string } {
  if (code === 0) return { Icon: SunIcon, label: "Clear" }
  if (code <= 2) return { Icon: CloudSunIcon, label: "Partly cloudy" }
  if (code === 3) return { Icon: CloudIcon, label: "Overcast" }
  if (code <= 48) return { Icon: CloudFogIcon, label: "Fog" }
  if (code <= 57) return { Icon: CloudRainIcon, label: "Drizzle" }
  if (code <= 67) return { Icon: CloudRainIcon, label: "Rain" }
  if (code <= 77) return { Icon: CloudSnowIcon, label: "Snow" }
  if (code <= 82) return { Icon: CloudRainIcon, label: "Showers" }
  if (code <= 99) return { Icon: CloudLightningIcon, label: "Thunderstorm" }
  return { Icon: CloudIcon, label: "Cloudy" }
}

type Props = {
  className?: string
  /** Visitor location resolved on the server (lib/location.ts). */
  location: GeoLocation
  /** Weather snapshot fetched on the server. */
  weather: Weather | null
}

export function LiveLocator({
  className,
  location,
  weather,
}: Props): React.ReactElement {
  const [currentLocation, setCurrentLocation] = React.useState<GeoLocation>(location)
  const [currentWeather, setCurrentWeather] = React.useState<Weather | null>(weather)

  // Live wall-clock.
  const [now, setNow] = React.useState<Date | null>(null)
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNow(new Date())
    const id = setInterval(() => setNow(new Date()), 30_000)
    return () => clearInterval(id)
  }, [])

  // Dynamic IP geolocation & live weather sync in the browser
  React.useEffect(() => {
    let isMounted = true

    const syncClientGeo = async () => {
      try {
        const res = await fetch("https://ipwho.is/")
        if (!res.ok) return
        const d = await res.json()
        if (
          isMounted &&
          d.success &&
          d.city &&
          typeof d.latitude === "number" &&
          typeof d.longitude === "number"
        ) {
          const clientLoc: GeoLocation = {
            city: d.city.toLowerCase(),
            region: (d.country_code || "in").toLowerCase(),
            latitude: d.latitude,
            longitude: d.longitude,
            timezone: d.timezone?.id || "Asia/Kolkata",
          }
          setCurrentLocation(clientLoc)

          // Fetch current temperature for client coordinates in Celsius
          const wxRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${d.latitude.toFixed(2)}&longitude=${d.longitude.toFixed(2)}&current=temperature_2m,weather_code&temperature_unit=celsius&timezone=${encodeURIComponent(clientLoc.timezone)}`
          )
          if (wxRes.ok && isMounted) {
            const wxData = await wxRes.json()
            if (
              typeof wxData.current?.temperature_2m === "number" &&
              typeof wxData.current?.weather_code === "number"
            ) {
              setCurrentWeather({
                temperature: wxData.current.temperature_2m,
                code: wxData.current.weather_code,
              })
            }
          }
        }
      } catch {
        // Gracefully keep SSR props if network blocked
      }
    }

    void syncClientGeo()
    return () => {
      isMounted = false
    }
  }, [])

  const timeStr = React.useMemo(() => {
    if (!now) return null
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(now)
  }, [now])

  const wx = currentWeather ? weatherFor(currentWeather.code) : null
  const WeatherIcon = wx?.Icon

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[0.12em] text-overlay-cream/65",
        className
      )}
    >
      <span className="uppercase">
        {currentLocation.city}, {currentLocation.region}
      </span>

      {timeStr && (
        <>
          <span aria-hidden className="text-overlay-cream/25">
            &middot;
          </span>
          <span className="tracking-[0.04em] normal-case tabular-nums">
            {timeStr}
          </span>
        </>
      )}

      {currentWeather && wx && WeatherIcon && (
        <>
          <span aria-hidden className="text-overlay-cream/25">
            &middot;
          </span>
          <span
            className="inline-flex items-center gap-1.5"
            aria-label={`${wx.label}, ${Math.round(currentWeather.temperature)}${TEMP_SYMBOL}`}
            title={wx.label}
          >
            <WeatherIcon
              size={13}
              weight="regular"
              className="text-overlay-cream/85"
              aria-hidden
            />
            <span className="tracking-[0.04em] normal-case tabular-nums">
              {Math.round(currentWeather.temperature)}
              {TEMP_SYMBOL}
            </span>
          </span>
        </>
      )}
    </div>
  )
}
