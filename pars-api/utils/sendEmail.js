import nodemailer from "nodemailer";

export const sendOTPEmail = async (email, otp, subject) => {
  let transporter;

  // Try CPanel SMTP first
  try {
    transporter = nodemailer.createTransport({
      host: process.env.CPANEL_HOST, // e.g., mail.pars.com.np
      port: process.env.CPANEL_PORT, // 587 or 465
      secure: process.env.CPANEL_PORT === "465", // true if 465, false if 587
      auth: {
        user: process.env.CPANEL_EMAIL,
        pass: process.env.CPANEL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false, // bypass cert mismatch for now
      },
    });

    // Test connection before sending
    await transporter.verify();
    console.log("✅ Using CPanel SMTP for emails");
  } catch (err) {
    console.error("⚠️ CPanel SMTP failed, switching to Gmail:", err.message);

    // Gmail fallback
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
  }

  // Build email content
  let textContent = "";
  let htmlContent = "";

  if (subject === "Email Verification") {
    textContent = `Your email verification OTP is: ${otp}. It is valid for 10 minutes.`;
    htmlContent = `<p>Your email verification OTP is: <b>${otp}</b></p><p>It is valid for 10 minutes.</p>`;
  } else if (subject === "Password Reset") {
    textContent = `Use the following link to reset your password: ${otp}. It is valid for 10 minutes.`;
    htmlContent = `<p>Click the link below to reset your password:</p><a href="${otp}">${otp}</a><p>This link is valid for 10 minutes.</p>`;
  } else {
    textContent = `Your OTP is: ${otp}`;
    htmlContent = `<p>Your OTP is: <b>${otp}</b></p>`;
  }

  // Email options
  const mailOptions = {
    from: `"PARS Project" <${process.env.CPANEL_EMAIL}>`,
    to: email,
    subject,
    text: textContent,
    html: htmlContent,
  };

  // Send email
  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ ${subject} email sent to ${email}`);
  } catch (error) {
    console.error(`❌ Failed to send ${subject} email to ${email}:`, error.message);
    throw error;
  }
};
