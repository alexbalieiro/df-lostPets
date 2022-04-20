import { Dropzone } from "dropzone";

export async function dropzoneUpload(
  uploadImg: Element,
  uploadButton
): Promise<Dropzone> {
  return new Dropzone(uploadButton, {
    url: `falsa`,
    autoProcessQueue: false,
    maxFiles: 1,
    clickable: true,
    clickableElements: uploadImg,
    disablePreviews: true,
  });
}
