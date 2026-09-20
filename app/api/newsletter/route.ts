import { NextResponse } from "next/server";

interface NewsletterPayload {
  email?: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as NewsletterPayload;
    const { email } = body;

    if (!email?.trim()) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    // Integrate with your newsletter provider (Mailchimp, ConvertKit, etc.)
    const mailchimpApiKey = process.env.MAILCHIMP_API_KEY;
    const mailchimpListId = process.env.MAILCHIMP_LIST_ID;
    const mailchimpDatacenter = process.env.MAILCHIMP_DATACENTER ?? "us1";

    if (mailchimpApiKey && mailchimpListId) {
      const res = await fetch(
        `https://${mailchimpDatacenter}.api.mailchimp.com/3.0/lists/${mailchimpListId}/members`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `apikey ${mailchimpApiKey}`,
          },
          body: JSON.stringify({ email_address: email, status: "subscribed" }),
        }
      );

      if (!res.ok) {
        const data = await res.json() as { title?: string };
        if (data.title === "Member Exists") {
          return NextResponse.json({ success: true, message: "Already subscribed" }, { status: 200 });
        }
        console.error("Mailchimp error:", data);
        return NextResponse.json({ error: "Subscription failed" }, { status: 500 });
      }
    } else {
      // Log in development
      console.log("[Newsletter] New subscriber:", email);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("[Newsletter API]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
