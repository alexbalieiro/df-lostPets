import { sendEmailToUser } from "../lib/sendgrid";
export async function createReport(dataReport) {
  const { userEmail, reporterName, phoneNumber, message, petName } = dataReport;
  const mailEnviado = await sendEmailToUser(
    userEmail,
    reporterName,
    phoneNumber,
    message,
    petName
  );
  return mailEnviado;
}
