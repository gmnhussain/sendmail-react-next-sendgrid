import { useState, useRef } from "react";
import Head from "next/head";
import Snackbar from "@material-ui/core/Snackbar";

export default function Contact() {
  //snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  // contact
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const nameEl = useRef(null);
  const subjectEl = useRef(null);
  const emailEl = useRef(null);
  const phoneEl = useRef(null);
  const messageEl = useRef(null);

  const handleNameChange = (e) => {
    e.target.classList.remove("error");
    setName(e.target.value.trim());
  };

  const handleSubjectChange = (e) => {
    e.target.classList.remove("error");
    setSubject(e.target.value.trim());
  };

  const handleEmailChange = (e) => {
    e.target.classList.remove("error");
    setEmail(e.target.value.trim());
  };

  const handlePhoneChange = (e) => {
    e.target.classList.remove("error");
    setPhone(e.target.value.trim());
  };

  const handleMessageChange = (e) => {
    e.target.classList.remove("error");
    setMessage(e.target.value.trim());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //console.log('Sending')

    let error = false;

    const pattern =
      /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    if (name === "") {
      nameEl.current.classList.add("error");
      error = true;
    }

    // if (subject === '') {
    // 	subjectEl.current.classList.add('error')
    // 	error = true
    // }

    if (email === "") {
      emailEl.current.classList.add("error");
      error = true;
    }

    if (!pattern.test(email)) {
      emailEl.current.classList.add("error");
      error = true;
    }

    // if (phone === '') {
    // 	phoneEl.current.classList.add('error')
    // 	error = true
    // }

    if (message === "") {
      messageEl.current.classList.add("error");
      error = true;
    }

    if (error) return;

    let data = {
      name,
      subject,
      email,
      phone,
      message,
    };

    fetch("/api/sendMail", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      //console.log('Response received')
      if (res.status === 200) {
        //console.log(res)
        setName("");
        setSubject("");
        setEmail("");
        setPhone("");
        setMessage("");

        nameEl.current.value = "";
        subjectEl.current.value = "";
        emailEl.current.value = "";
        phoneEl.current.value = "";
        messageEl.current.value = "";

        setSnackbarOpen(true);
      }
    });
  };

  return (
    <>
      <Head>
        <title>Send Mail with SendGrid</title>
        <meta name="description" content="Send mail with SendGrid" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <h1 className="title">Contact from</h1>

        <form
          className="contact-form"
          action=""
          method="POST"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="input">
            <p>Your name</p>
            <input
              type="text"
              name="name"
              onChange={(e) => handleNameChange(e)}
              ref={nameEl}
            />
          </div>
          <div className="input">
            <p>Subject</p>
            <input
              type="text"
              name="subject"
              onChange={(e) => handleSubjectChange(e)}
              ref={subjectEl}
            />
          </div>
          <div className="input">
            <p>Your email</p>
            <input
              type="text"
              name="email"
              placeholder="email@example.com"
              onChange={(e) => handleEmailChange(e)}
              ref={emailEl}
            />
          </div>
          <div className="input">
            <p>Mobile number</p>
            <input
              type="text"
              name="phone"
              placeholder="+880 1xxxxxxxxx"
              onChange={(e) => handlePhoneChange(e)}
              ref={phoneEl}
            />
          </div>
          <div className="input">
            <p>Your message</p>
            <textarea
              name="message"
              onChange={(e) => handleMessageChange(e)}
              ref={messageEl}
            ></textarea>
          </div>
          <div className="input">
            <button type="submit" name="contact">
              Submit
            </button>
          </div>
        </form>
      </main>

      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="Email send successfully"
      />
    </>
  );
}
