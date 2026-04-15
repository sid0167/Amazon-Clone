import dotenv from "dotenv";
dotenv.config(); // ✅ force load env here

import { Resend } from "resend";

console.log("ENV KEY:", process.env.RESEND_API_KEY); // 🔍 debug

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (to, subject, html) => {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.log("❌ No API key found");
      return;
    }

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to,
      subject,
      html
    });

    console.log("✅ Email sent");
  } catch (err) {
    console.log("❌ Email error:", err.message);
  }
};