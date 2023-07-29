const sendEmail = async (req, res) => {
  const { asunto, contenido } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "lexzum10@gmail.com",
      pass: "iugwigicuwqwwwzk",
    },
  });

  const info = await transporter.sendMail({
    from: "lexzum10@gmail.com",
    to: "lexzum10@gmail.com",
    subject: asunto,
    text: contenido,
  });

  console.log("Message sent: %s", info.messageId);
};