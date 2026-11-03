"use server";

import { doubtForm } from "../content/contact";
import { readDoubt, validateDoubt, type DoubtState } from "./validate";

/**
 * Receives a doubt from the Contact page form, validates it on the server, and forwards it as JSON to the
 * URL in the DOUBTS_WEBHOOK_URL environment variable (see .env.example). Nothing is stored in this app.
 *
 * Spam protection: a hidden "company" field that people never see (bots tend to fill every field),
 * plus length limits. There is no rate limiting.
 */
export async function submitDoubt(_previous: DoubtState, formData: FormData): Promise<DoubtState> {
  // Honeypot: a real visitor never fills this. Pretend it worked so bots learn nothing.
  const trap = formData.get("company");
  if (typeof trap === "string" && trap.trim() !== "") return { status: "success" };

  const values = readDoubt(formData);
  const errors = validateDoubt(values);
  if (Object.keys(errors).length > 0) {
    return { status: "error", message: doubtForm.messages.validation, errors, values };
  }

  const webhookUrl = process.env.DOUBTS_WEBHOOK_URL;
  if (!webhookUrl) {
    return { status: "error", message: doubtForm.messages.notConfigured, values };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, submittedAt: new Date().toISOString(), source: "synapse-web" }),
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });
    if (!response.ok) throw new Error(`destination answered with HTTP ${response.status}`);
  } catch (error) {
    // Log the reason only. Never log the visitor's name, email or message.
    console.error("[doubt-form] could not deliver a doubt:", error instanceof Error ? error.message : "unknown error");
    return { status: "error", message: doubtForm.messages.deliveryFailed, values };
  }

  return { status: "success", message: doubtForm.messages.success };
}
