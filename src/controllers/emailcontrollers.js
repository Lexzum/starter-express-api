const nodemailer = require("nodemailer");

const sendMail = async (req, res) => {
  try {
    await sendEmail(req, res);
    //console.log(resultado);

    res.json({
      to: req.body.email,
      message: "Email send success",
    });
    res.status(200);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const sendEmail = async (req, res) => {
  const { email, asunto, contenido } = req.body;

  const transporter = nodemailer.createTransport({
    /* host: "smtp.gmail.com",
    port: 587, */
    service: "gmail",
    auth: {
      user: "lexzum10@gmail.com",
      pass: "ywcw gubq mold qcwe",
    },
  });

  const info = await transporter.sendMail({
    from: email,
    to: "lexzum10@gmail.com",
    subject: asunto,
    text: contenido,
  });

  console.log(info);

  return info;
};

module.exports = {
  sendMail,
};

//main().catch(console.error);
