import { NextResponse } from "next/server";

export default async function POST(req: Request) {
  // get the email from the request body
  const { email } = await req.json();

  // check if the email is provided
  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  // get the mailchimp api key, server and audience from the environment variables
  const MailchimlKey = process.env.MAILCHIMP_API_KEY;
  const MailchimpServer = process.env.MAILCHIMP_SERVER;
  const MailchimpAudience = process.env.MAILCHIMP_AUDIENCE;

  const customUrl = `https://${MailchimpServer}.api.mailchimp.com/3.0/lists/${MailchimpAudience}/members`;

  // make a request to the mailchimp api to subscribe the user
  const response = await fetch(customUrl, {
    method: "POST",
    headers: {
      Authorization: `apikey ${MailchimlKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email_address: email,
      status: "subscribed",
    }),
  });
  const received = await response.json();
  return NextResponse.json(received);
}
