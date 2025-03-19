import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "jontythakur68@gmail.com",
      pass: "tciuojdgpjijuevr", // Use the generated App Password
    },
  });


  export const SendOtp=async(email,otp)=>{

    const mailOptions = {
        from: ' INTV ',
        to: email,
        subject: "Verify Email",
        text: `Your OTP code is: ${otp}. It is valid for 10 minutes. Please do not share it with anyone.`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px; max-width: 400px; margin: auto; background-color: #f9f9f9;">
            <h2 style="text-align: center; color: #333;">🔐 Your OTP Code</h2>
            <p style="text-align: center; font-size: 18px; color: #555;">Use the following OTP to complete your action:</p>
            <div style="font-size: 24px; font-weight: bold; text-align: center; padding: 10px; background: #007bff; color: #fff; border-radius: 5px;">
              ${otp}
            </div>
            <p style="text-align: center; font-size: 14px; color: #777; margin-top: 10px;">
              This OTP is valid for <b>5 minutes</b>. Please do not share it with anyone.
            </p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions)

  }