import { NextRequest, NextResponse } from "next/server";

// Simple file-system independent storage using Vercel's /tmp directory
// This persists during warm instances and gets logged to Vercel's function logs
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { answers } = body;

    const payload = {
      submittedAt: new Date().toISOString(),
      answers,
    };

    // Always log to Vercel function logs (retrievable via Vercel dashboard)
    console.log("SURVEY_RESPONSE:", JSON.stringify(payload));

    // Forward to Google Apps Script webhook if configured
    const webhookUrl = process.env.SURVEY_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } catch (webhookError) {
        console.error("Webhook delivery failed:", webhookError);
      }
    }

    // Send email notification via Resend if configured
    if (process.env.RESEND_API_KEY) {
      try {
        const answerLines = Object.entries(answers as Record<string, string>)
          .filter(([, v]) => v && String(v).trim())
          .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`)
          .join("\n");

        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: "Space Survey <hello@spatial-wellness.com>",
            to: "hello@spatial-wellness.com",
            subject: `New survey response (${new Date().toLocaleDateString("nl-NL")})`,
            text: `New anonymous survey response\n\nSubmitted: ${payload.submittedAt}\n\n${answerLines}`,
          }),
        });
      } catch (emailError) {
        console.error("Email delivery failed:", emailError);
      }
    }

    // Write to /tmp as backup (persists during warm invocations)
    try {
      const fs = await import("fs");
      const path = "/tmp/survey-responses.jsonl";
      fs.appendFileSync(path, JSON.stringify(payload) + "\n");
    } catch {
      // /tmp may not always be available
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Submit error:", error);
    return NextResponse.json(
      { ok: false, error: "Submission failed" },
      { status: 500 }
    );
  }
}
