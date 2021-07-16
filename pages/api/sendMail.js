import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function (req, res) {
  const authEmail = process.env.AUTH_EMAIL;
  const contactEmail = process.env.CONTACT_EMAIL;

  const { name, subject, email, phone, message } = req.body;

  const mailSubject = subject === "" ? `New message from ${name}` : subject;

  const data = {
    to: contactEmail,
    from: authEmail,
    subject: mailSubject,
    replyTo: email,
    text:
      message + " | Sent from: " + email + " name: " + name + " phone " + phone,
    html: `<div>
			<b>Name: </b>${name}<br/>
			<b>Email: </b>${email}<br/>
			<b>Phone: </b>${phone}<br/>
			<b>Message: </b>${message}
		</div>`,
  };

  await sgMail.send(data);

  res.status(200).json({ status: "OK" });
}
