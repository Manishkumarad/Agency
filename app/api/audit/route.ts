import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(request: NextRequest) {
  try {
    let body: Record<string, unknown>
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }
    const { business, url, email, phone } = body

    if (!business?.trim() || !email?.trim()) {
      return NextResponse.json(
        { error: "Business name and email are required" },
        { status: 400 }
      )
    }

    const toEmail = process.env.CONTACT_EMAIL || process.env.RESEND_FROM_EMAIL
    if (!toEmail) {
      console.error("CONTACT_EMAIL or RESEND_FROM_EMAIL not set in .env")
      return NextResponse.json(
        { error: "Email not configured. Please add CONTACT_EMAIL to .env" },
        { status: 500 }
      )
    }

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: "Email service not configured. Add RESEND_API_KEY to .env.local" },
        { status: 500 }
      )
    }

    const resend = new Resend(apiKey)
    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev"

    const { data, error } = await resend.emails.send({
      from: `ScaleCraft <${fromEmail}>`,
      to: [toEmail],
      replyTo: email,
      subject: `[Free Audit] ${business} - Website Audit Request`,
      html: `
        <h2>New Website Audit Request</h2>
        <p><strong>Business Name:</strong> ${business}</p>
        <p><strong>Website URL:</strong> ${url || "Not provided"}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <hr />
        <p><em>Sent from ScaleCraft website - Free Audit form</em></p>
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json(
        { error: error.message || "Failed to send email" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, id: data?.id })
  } catch (err) {
    console.error("Audit API error:", err)
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}
