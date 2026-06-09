// ============================================================
// Shared styles - Venerdi Brand
// ============================================================
const base = {
  body: `margin:0;padding:0;background:#f5f5f5;font-family:'Helvetica Neue',Arial,sans-serif;`,
  wrapper: `width:100%;background:#f5f5f5;padding:40px 0;`,
  container: `width:600px;margin:0 auto;background:#ffffff;border-radius:0px;overflow:hidden;border:1px solid #e0e0e0;`,
  header: `background:#000000;padding:32px 20px;text-align:center;`,
  headerTitle: `margin:0;color:#ffffff;font-size:28px;letter-spacing:6px;font-weight:900;text-transform:uppercase;`,
  headerSubtitle: `margin:8px 0 0;color:#aaaaaa;font-size:11px;letter-spacing:3px;text-transform:uppercase;`,
  body_td: `padding:40px 48px;`,
  greeting: `margin:0 0 16px;color:#111111;font-size:22px;font-weight:700;`,
  text: `color:#555555;line-height:1.8;font-size:15px;margin:0 0 14px;`,
  footer_td: `padding:24px;text-align:center;font-size:11px;color:#aaaaaa;border-top:1px solid #e0e0e0;letter-spacing:1px;text-transform:uppercase;background:#000000;`,
  divider: `border:none;border-top:1px solid #e0e0e0;margin:28px 0;`,
};

// ============================================================
// 1. Verify Email
// ============================================================
export const verifyEmailTemplate = (name = "User", code = "000000") => {
  return `
<!DOCTYPE html>
<html dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Verify Your Email - VENERDI</title>
</head>
<body style="${base.body}">
  <div style="${base.wrapper}">
    <table width="600" cellpadding="0" cellspacing="0" style="${base.container}" align="center">

      <!-- Header -->
      <tr>
        <td style="${base.header}">
          <h2 style="${base.headerTitle}">VENERDI</h2>
          <p style="${base.headerSubtitle}">Fashion Without Limits</p>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="${base.body_td}">
          <h2 style="${base.greeting}">Hey ${name} 👋</h2>
          <p style="${base.text}">Thanks for joining VENERDI! To complete your registration, please verify your email address using the code below.</p>

          <!-- Code Box -->
          <div style="
            text-align:center;
            font-size:38px;
            font-weight:900;
            letter-spacing:12px;
            margin:32px 0;
            padding:24px;
            background:#f5f5f5;
            border-radius:0px;
            color:#000000;
            border:2px solid #000000;
          ">
            ${code}
          </div>

          <p style="${base.text}">This code will expire in <span style="color:#000000;font-weight:bold;">15 minutes</span>.</p>

          <hr style="${base.divider}" />

          <p style="color:#aaaaaa;font-size:13px;margin:0;">
            If you didn't create an account, you can safely ignore this email.
          </p>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="${base.footer_td}">
          © 2026 VENERDI. All rights reserved.
        </td>
      </tr>

    </table>
  </div>
</body>
</html>
  `;
};


// ============================================================
// 2. Welcome Email
// ============================================================
export const welcomeEmailTemplate = (name = "User") => {
  return `
<!DOCTYPE html>
<html dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Welcome - VENERDI</title>
</head>
<body style="${base.body}">
  <div style="${base.wrapper}">
    <table width="600" cellpadding="0" cellspacing="0" style="${base.container}" align="center">

      <!-- Header -->
      <tr>
        <td style="${base.header}">
          <h2 style="${base.headerTitle}">VENERDI</h2>
          <p style="${base.headerSubtitle}">Fashion Without Limits</p>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="${base.body_td}">
          <h2 style="${base.greeting}">Welcome aboard, ${name} 🎉</h2>
          <p style="${base.text}">Your email has been successfully verified. You now have full access to your VENERDI account.</p>

          <!-- Success Box -->
          <div style="
            margin:28px 0;
            padding:20px 24px;
            background:#f5f5f5;
            border-radius:0px;
            border-left:4px solid #000000;
          ">
            <p style="margin:0;color:#000000;font-size:15px;font-weight:bold;">✅ Email Verified Successfully</p>
            <p style="margin:6px 0 0;color:#777777;font-size:13px;">You can now log in and start shopping the latest drops.</p>
          </div>

          <!-- CTA Button -->
          <div style="text-align:center;margin:32px 0;">
            <a href="https://www.venerdistore.com" style="
              display:inline-block;
              padding:16px 40px;
              background:#000000;
              color:#ffffff;
              text-decoration:none;
              font-weight:bold;
              font-size:13px;
              letter-spacing:3px;
              text-transform:uppercase;
            ">
              SHOP NOW →
            </a>
          </div>

          <hr style="${base.divider}" />

          <p style="color:#aaaaaa;font-size:13px;margin:0;">
            This is an automated message. Please do not reply to this email.
          </p>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="${base.footer_td}">
          © 2026 VENERDI. All rights reserved.
        </td>
      </tr>

    </table>
  </div>
</body>
</html>
  `;
};


// ============================================================
// 3. Reset Password Email
// ============================================================
export const resetPasswordTemplate = (name = "User", resetLink = "#") => {
  return `
<!DOCTYPE html>
<html dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Reset Password - VENERDI</title>
</head>
<body style="${base.body}">
  <div style="${base.wrapper}">
    <table width="600" cellpadding="0" cellspacing="0" style="${base.container}" align="center">

      <!-- Header -->
      <tr>
        <td style="${base.header}">
          <h2 style="${base.headerTitle}">VENERDI</h2>
          <p style="${base.headerSubtitle}">Fashion Without Limits</p>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="${base.body_td}">
          <h2 style="${base.greeting}">Hey ${name} 👋</h2>
          <p style="${base.text}">We received a request to reset your password. Click the button below to set a new password.</p>

          <!-- Button -->
          <div style="text-align:center;margin:36px 0;">
            <a href="${resetLink}" style="
              display:inline-block;
              padding:16px 40px;
              background:#000000;
              color:#ffffff;
              text-decoration:none;
              font-weight:bold;
              font-size:13px;
              letter-spacing:3px;
              text-transform:uppercase;
            ">
              RESET PASSWORD →
            </a>
          </div>

          <p style="${base.text}">This link will expire in <span style="color:#000000;font-weight:bold;">15 minutes</span>.</p>

          <!-- Warning Box -->
          <div style="
            margin:24px 0;
            padding:16px 20px;
            background:#f5f5f5;
            border-radius:0px;
            border-left:4px solid #aaaaaa;
          ">
            <p style="margin:0;color:#555555;font-size:13px;">
              ⚠️ If you didn't request a password reset, please ignore this email. Your password will remain unchanged.
            </p>
          </div>

          <hr style="${base.divider}" />

          <p style="color:#aaaaaa;font-size:13px;margin:0;">
            This is an automated security email. Please do not reply.
          </p>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="${base.footer_td}">
          © 2026 VENERDI. All rights reserved.
        </td>
      </tr>

    </table>
  </div>
</body>
</html>
  `;
};


// ============================================================
// 4. Password Changed Email
// ============================================================
export const passwordChangedTemplate = (name = "User") => {
  return `
<!DOCTYPE html>
<html dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Password Changed - VENERDI</title>
</head>
<body style="${base.body}">
  <div style="${base.wrapper}">
    <table width="600" cellpadding="0" cellspacing="0" style="${base.container}" align="center">

      <!-- Header -->
      <tr>
        <td style="${base.header}">
          <h2 style="${base.headerTitle}">VENERDI</h2>
          <p style="${base.headerSubtitle}">Fashion Without Limits</p>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="${base.body_td}">
          <h2 style="${base.greeting}">Hey ${name} 👋</h2>
          <p style="${base.text}">Your password has been successfully changed.</p>

          <!-- Success Box -->
          <div style="
            margin:24px 0;
            padding:18px 20px;
            background:#f5f5f5;
            border-radius:0px;
            border-left:4px solid #000000;
          ">
            <p style="margin:0;color:#000000;font-size:15px;font-weight:bold;">✅ Password Updated Successfully</p>
            <p style="margin:6px 0 0;color:#777777;font-size:13px;">Your VENERDI account is now secured with the new password.</p>
          </div>

          <!-- Warning Box -->
          <div style="
            margin:24px 0;
            padding:16px 20px;
            background:#f5f5f5;
            border-radius:0px;
            border-left:4px solid #aaaaaa;
          ">
            <p style="margin:0;color:#555555;font-size:13px;font-weight:bold;">🚨 Wasn't you?</p>
            <p style="margin:6px 0 0;color:#777777;font-size:13px;">
              If you did not make this change, please reset your password immediately and contact support.
            </p>
          </div>

          <hr style="${base.divider}" />

          <p style="color:#aaaaaa;font-size:13px;margin:0;">
            ⚠️ Security Tip: Never share your password with anyone.
          </p>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="${base.footer_td}">
          © 2026 VENERDI. All rights reserved.
        </td>
      </tr>

    </table>
  </div>
</body>
</html>
  `;
};