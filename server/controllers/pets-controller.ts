import { Pet } from "../models";
import { User } from "../models";
import { index } from "./../lib/algolia";
import { cloudinary } from "./../lib/cloudinary";
function dataToIndex(data, id?) {
  const respuesta: any = {};
  if (data.name) {
    respuesta.name = data.name;
  }
  if (data.img) {
    respuesta.img = data.img;
  }
  if (data.last_lat && data.last_lng) {
    respuesta._geoloc = {
      lat: data.last_lat,
      lng: data.last_lng,
    };
  }
  if (data.state) {
    respuesta.state = data.state;
  }
  if (id) {
    respuesta.objectID = id;
  }
  console.log(respuesta);

  return respuesta;
}

export async function createPet(id, petData) {
  if (petData.img) {
    const image = await cloudinary.uploader.upload(petData.img, {
      resource_type: "image",
      discard_original_filename: true,
      width: 1000,
    });
    const imageURL = image.secure_url;
    const pet = await Pet.create({
      ...petData,
      img: imageURL,
      userId: id,
    });
    index.saveObject({
      objectID: pet.get("id"),
      name: pet.get("name"),
      img: pet.get("img"),
      _geoloc: {
        lat: pet.get("last_lat"),
        lng: pet.get("last_lng"),
      },
      state: pet.get("state"),
      userEmail: petData.userEmail,
    });
    return pet;
  }
}
export async function searchPets(id) {
  const pets = await Pet.findAll({
    where: {
      userId: id,
    },
    include: [User],
  });
  return pets;
}
export async function updatePet(petId, petData) {
  if (petData.img) {
    let imageURL = "";
    if (petData.img.length > 87) {
      const image = await cloudinary.uploader.upload(petData.img, {
        resource_type: "image",
        discard_original_filename: true,
        width: 1000,
      });
      imageURL = image.secure_url;
    } else {
      imageURL = petData.img;
    }
    const respuesta = await Pet.update(
      { ...petData, img: imageURL },
      {
        where: {
          id: petId,
        },
      }
    );
    const indexItem = dataToIndex(petData, petId);
    index.partialUpdateObject(indexItem);
    return respuesta;
  } else {
    const respuesta = await Pet.update(
      { ...petData },
      {
        where: {
          id: petId,
        },
      }
    );
  }
}
export async function nearbyPets(lng, lat) {
  const { hits } = await index.search("", {
    aroundLatLng: [lat, lng].join(","),
    aroundRadius: 5000, //500mts
  });
  return hits;
}
export async function deletePet(petId) {
  const pet = await Pet.findByPk(petId);
  if (pet) {
    pet.destroy();
    index.deleteObject(petId);
    return { delete: true };
  } else return { error: "no existe la mascota" };
}
