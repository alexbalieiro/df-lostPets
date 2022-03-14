import { Report } from "../models";

export async function createReport(idPet, dataReport) {
  const report = await Report.create({
    ...dataReport,
    petId: idPet,
  });
  return report;
}
