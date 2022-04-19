import * as sgMail from "@sendgrid/mail";
import "dotenv/config";

export async function sendEmailToUser(
  userEmail,
  reporterName,
  phoneNumber,
  message,
  petName
) {
  const respuesta = await sgMail.setApiKey(process.env.SENDGRID_APIKEY);
  const msg = {
    to: userEmail,
    from: "alexenri12@gmail.com",
    subject: `Informacion reportada sobre ${petName}`,
    text: `este es el numero de la persona que lo vió: ${phoneNumber}`,
    html: `<h2><strong>Hola soy ${reporterName}</strong>, <br>He visto a ${petName} en: ${message}, mi numero de contacto es ${phoneNumber}</h2>`,
  };

  const enviarMail = await sgMail.send(msg).then(() => {});
  return { message: "Mensaje enviado correctamente" };
}
