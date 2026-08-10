import * as brevo from "@getbrevo/brevo";

const apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

export const sendEmail = async ({ to, subject, html }) => {
  try {
    if (!to || !subject || !html) {
      throw new Error("Missing email fields");
    }

    const email = new brevo.SendSmtpEmail();
    email.sender = { name: "MERN-Auth", email: process.env.BREVO_SENDER_EMAIL };
    email.to = [{ email: to }];
    email.subject = subject;
    email.htmlContent = html;

    const result = await apiInstance.sendTransacEmail(email);

    console.log("Email sent:", result.body?.messageId);

    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};