import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export async function POST(req: NextRequest) {
  let body: ContactPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, phone, service, message } = body;
  if (!name || !email || !phone || !service || !message) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) {
    return NextResponse.json({ error: "Email service not configured." }, { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `"${name}" <${user}>`,
    replyTo: email,
    to: "anky.lohi5@gmail.com",
    subject: `Booking Inquiry — ${service}`,
    text: [
      `Name:    ${name}`,
      `Email:   ${email}`,
      `Phone:   ${phone}`,
      `Service: ${service}`,
      ``,
      `Message:`,
      message,
    ].join("\n"),
    html: `
      <table style="font-family:sans-serif;font-size:14px;color:#333;border-collapse:collapse;width:100%;max-width:560px">
        <tr><td style="padding:8px 0;border-bottom:1px solid #eee"><strong>Name</strong></td><td style="padding:8px 0;border-bottom:1px solid #eee">${name}</td></tr>
        <tr><td style="padding:8px 0;border-bottom:1px solid #eee"><strong>Email</strong></td><td style="padding:8px 0;border-bottom:1px solid #eee"><a href="mailto:${email}">${email}</a></td></tr>
        <tr><td style="padding:8px 0;border-bottom:1px solid #eee"><strong>Phone</strong></td><td style="padding:8px 0;border-bottom:1px solid #eee">${phone}</td></tr>
        <tr><td style="padding:8px 0;border-bottom:1px solid #eee"><strong>Service</strong></td><td style="padding:8px 0;border-bottom:1px solid #eee">${service}</td></tr>
        <tr><td colspan="2" style="padding-top:16px"><strong>Message</strong><br/><br/>${message.replace(/\n/g, "<br/>")}</td></tr>
      </table>
    `,
  });

  return NextResponse.json({ ok: true });
}
