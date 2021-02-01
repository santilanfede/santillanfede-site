const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "familia.santillan.2012@gmail.com",
    pass: "chenaut278"
  }
});

exports.welcomeMail = functions.firestore
  .document("Bienvenida/{id}")
  .onCreate((snap, context) => {
    const email = snap.data().email;
    const name = snap.data().name;
    return sendWelcomeMail(email, name);
  });
//aux functions
function sendWelcomeMail(email, name) {
  return transport
    .sendMail({
      from: "Santillan Federico<familia.santillan.2012@gmail.com>",
      to: email,
      subject: "Contacto",
      html: `
        <h1>Hola ${name} </h1>
        <p>Gracias por contactarte con Blueprins</p>   
        `
    })
    .then(r => r)
    .catch(e => e);
}
