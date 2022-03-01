"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfiles = exports.createProfile = void 0;
const user_1 = require("../models/user");
const cloudinary_1 = require("../lib/cloudinary");
async function createProfile(profileData) {
    if (profileData.pictureURL) {
        const image = await cloudinary_1.cloudinary.uploader.upload(profileData.pictureURL, {
            resource_type: "image",
            discard_original_filename: true,
            width: 1000,
        });
        const imageURL = image.secure_url;
        const profile = await user_1.User.create({
            username: profileData.fullname,
            bio: profileData.bio,
            pictureURL: imageURL,
        });
        return profile;
    }
}
exports.createProfile = createProfile;
async function getProfiles(userId) {
    const profile = await user_1.User.findByPk(userId);
    return profile;
}
exports.getProfiles = getProfiles;
