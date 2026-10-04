import { NextResponse } from "next/server"
import { SITE_CONFIG } from "@/lib/content"

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const { name, email, phone, company, purpose, date, time, message } = data

    if (!name || !email || !purpose || !date || !time) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      )
    }

    const web3Key = process.env.WEB3FORMS_ACCESS_KEY || SITE_CONFIG.web3formsKey
    let emailSent = false
    let provider = "none"

    // 1. Try Web3Forms if access key is provided
    if (web3Key) {
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: web3Key,
            subject: SITE_CONFIG.formSubject,
            from_name: name,
            to: SITE_CONFIG.email,
            email,
            phone: phone || "Not provided",
            company: company || "Not provided",
            purpose_of_call: purpose,
            preferred_date: date,
            preferred_time: time,
            message: message || "None",
          }),
        })
        const result = await res.json()
        if (result.success) {
          emailSent = true
          provider = "web3forms"
        }
      } catch (err) {
        console.error("Web3Forms error:", err)
      }
    }

    // 2. Direct FormSubmit relay (works without any secret keys)
    if (!emailSent) {
      try {
        const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(SITE_CONFIG.email)}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Referer: "https://nityamkumar.portfolio",
          },
          body: JSON.stringify({
            _subject: SITE_CONFIG.formSubject,
            _template: "table",
            _captcha: "false",
            "Name": name,
            "Email": email,
            "Phone": phone || "Not provided",
            "Company": company || "Not provided",
            "Purpose of Call": purpose,
            "Preferred Date": date,
            "Preferred Time": time,
            "Message": message || "None",
          }),
        })
        const result = await res.json()
        if (result.success === "true" || result.success === true) {
          emailSent = true
          provider = "formsubmit"
        }
      } catch (err) {
        console.error("FormSubmit relay error:", err)
      }
    }

    return NextResponse.json({
      success: true,
      emailSent,
      provider,
      message: SITE_CONFIG.confirmationMessage,
    })
  } catch (error) {
    console.error("Appointment API error:", error)
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    )
  }
}
