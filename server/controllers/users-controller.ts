import { User } from "../models/user";
import { cloudinary } from "../lib/cloudinary";
export async function createProfile(profileData) {
  if (profileData.pictureURL) {
    const image = await cloudinary.uploader.upload(profileData.pictureURL, {
      resource_type: "image",
      discard_original_filename: true,
      width: 1000,
    });
    const imageURL = image.secure_url;
    const profile = await User.create({
      username: profileData.fullname,
      bio: profileData.bio,
      pictureURL: imageURL,
    });
    return profile;
  }
}
export async function getProfiles(userId) {
  const profile = await User.findByPk(userId);
  return profile;
}
