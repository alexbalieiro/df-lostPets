import { User } from "../models/user";

export async function searchUser(email) {
  const user = await User.findOne({ where: { email } });
  if (user === null) {
    return { message: "El usuario no existe" };
  } else {
    return user;
  }
}
export async function getProfiles(userId) {
  const profile = await User.findByPk(userId);
  return profile;
}
export async function findUser(userData) {
  const user = await User.findByPk(userData._user.id);
  return user;
}
export async function allUser() {
  const user = await User.findAll();
  return user;
}
