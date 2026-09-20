import { NextResponse } from "next/server";

interface ContactPayload {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  service?: string;
  preferredTime?: string;
  message?: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as ContactPayload;
    const { name, email, message } = body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    // Here you would integrate with your email service (Resend, SendGrid, etc.)
    // Example with a hypothetical email service:
    const emailServiceUrl = process.env.EMAIL_SERVICE_URL;
    const emailApiKey = process.env.EMAIL_API_KEY;

    if (emailServiceUrl && emailApiKey) {
      const res = await fetch(emailServiceUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${emailApiKey}`,
        },
        body: JSON.stringify({
          to: process.env.CONTACT_EMAIL ?? "gm@peoplepulseonline.com",
          subject: `New Enquiry from ${name} — ${body.service ?? "General"}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${body.phone ?? "—"}</p>
            <p><strong>Company:</strong> ${body.company ?? "—"}</p>
            <p><strong>Service:</strong> ${body.service ?? "—"}</p>
            <p><strong>Preferred time:</strong> ${body.preferredTime ?? "—"}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, "<br/>")}</p>
          `,
        }),
      });
      if (!res.ok) {
        console.error("Email send failed:", res.status);
      }
    } else {
      // Log to console in development
      console.log("[Contact Form]", { name, email, phone: body.phone, company: body.company, service: body.service, preferredTime: body.preferredTime, message });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("[Contact API]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
