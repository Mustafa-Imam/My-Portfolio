// POST route from contact form with token check
router.post('/send', (req, res, next) => {
  // Check if the session token matches
  if(req.session.contactFormToken !== 'unique_token') {
    req.session.customErrorMessage = "Unauthorized access to send route.";
    return res.redirect('/'); // Redirect to home if token doesn't match
  }

  // Basic security check (if you have a captcha or something similar)
  if(req.body.securityCheck !== '4') {
    req.session.customErrorMessage = "Security check failed.";
    return res.redirect('/');
  }

  // Creates a SMTP transporter object
  let transporter = nodemailer.createTransport({
    service: 'Outlook', 
    auth: {
      user: 'mustafa-imam@outlook.com', // my authenticated email
      pass: 'pfdduwagkdnpqdxy' // my app password
    }
  });

  // Message object
  let message = {
    from: 'mustafa-imam@outlook.com',
    to: 'mustafa-imam@outlook.com',
    subject: 'New Message from ' + req.body.email, // Includes user's email in subject
    text: 'Name: ' + req.body.name + '\nEmail: ' + req.body.email + '\nMessage: ' + req.body.comments,
    html: '<p><b>Name:</b> ' + req.body.name + '</p><p><b>Email:</b> ' + req.body.email + '</p><p><b>Message:</b> ' + req.body.comments + '</p>'
  };

  // sends mail with defined transport object
  transporter.sendMail(message, (error, info) => {
    if (error) {
      req.session.customErrorMessage = 'There was an error sending your message, please try again.';
      res.redirect('/');
    } else {
      // Clear the token and render success page
      req.session.contactFormToken = null;
      res.render('success', {
        title: "Message Sent",
        message: "Thank you for submitting your message! I will try my best to get back to you. If I don't get back to you in a month, that probably means I forgot to read your email so feel free to send me another message if you want. Please don't spam me, thanks!"
      });
    }
  });
});

module.exports = router;
