const API_BASE_URL = process.env.API_BASE_URL;
const state = {
  data: {
    userEmail: "",
    fullname: "",
    userId: "",
    petId: "",
    namePet: "",
    imgPet: "",
    last_lat: "",
    last_lng: "",
    petState: "",
  },
  listeners: [],

  recoverToken(callback) {
    console.log(API_BASE_URL, "SALUDOS HUMANOS");
    const token = sessionStorage.getItem("token") || "";
    fetch(API_BASE_URL + "/me", {
      method: "GET",
      headers: {
        Authorization: "bearer " + token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          callback(token);
        } else {
          const cs = this.getState();
          cs.fullname = data.fullname;
          cs.userEmail = data.email;
          cs.userId = data.id;
          this.setState(cs);
          callback(token);
        }
      });
  },
  getState() {
    return this.data;
  },
  setEmail(email: string) {
    const cs = this.getState();
    cs.userEmail = email;
    this.setState(cs);
  },
  setFullname(fullname: string) {
    const cs = this.getState();
    cs.fullname = fullname;
    this.setState(cs);
  },
  updateUser(fullname, password, callback) {
    const cs = this.getState();
    const email = cs.userEmail;
    fetch(API_BASE_URL + "/users/update", {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        fullname,
        password,
        email,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        callback(data);
      });
  },
  getUser(callback) {
    const cs = this.getState();
    const email = cs.userEmail;
    fetch(API_BASE_URL + "/users/search?email=" + email, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.message) {
          callback(data);
        } else {
          cs.fullname = data.fullname;
          this.setState(cs);
          callback(data);
        }
      });
  },
  auth(fullname, password, callback) {
    const cs = this.getState();
    const email = cs.userEmail;
    fetch(API_BASE_URL + "/auth", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        fullname,
        password,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        cs.userId = data.id;
        this.setState(cs);
        callback(data);
      });
  },
  getToken(password, callback) {
    const cs = this.getState();
    const email = cs.userEmail;
    fetch(API_BASE_URL + "/auth/token", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        sessionStorage.setItem("token", data.token);
        this.setState(cs);
        callback(data);
      });
  },
  createPet(petData, callback) {
    const token = sessionStorage.getItem("token") || "";
    fetch(API_BASE_URL + "/pets", {
      method: "post",
      headers: {
        "content-type": "application/json",
        Authorization: "bearer " + token,
      },
      body: JSON.stringify({
        ...petData,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        callback(data);
      });
  },
  updatePet(petId, petData, callback) {
    const token = sessionStorage.getItem("token") || "";
    fetch(API_BASE_URL + "/pets/" + petId, {
      method: "put",
      headers: {
        "content-type": "application/json",
        Authorization: "bearer " + token,
      },
      body: JSON.stringify({
        ...petData,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        callback(data);
      });
  },
  deletePet(petId, callback) {
    const token = sessionStorage.getItem("token") || "";
    fetch(API_BASE_URL + "/pets/" + petId, {
      method: "delete",
      headers: {
        "content-type": "application/json",
        Authorization: "bearer " + token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        callback(data);
      });
  },
  async getMyPets() {
    const token = sessionStorage.getItem("token") || "";
    const pets = await fetch(API_BASE_URL + "/me/pets", {
      method: "get",
      headers: {
        Authorization: "bearer " + token,
      },
    });
    return await pets.json();
  },
  async getNearbyPets(lat, lng) {
    const pets = await fetch(
      API_BASE_URL + "/pets?lat=" + lat + "&lng=" + lng,
      {
        method: "get",
        headers: {
          "content-type": "application/json",
        },
      }
    );
    return await pets.json();
  },
  createReport(report, callback) {
    fetch(API_BASE_URL + "/reports", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        ...report,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        callback(data);
      });
  },
  currentPet(dataPet) {
    const cs = this.getState();
    cs.petId = dataPet.id;
    cs.namePet = dataPet.name;
    cs.imgPet = dataPet.img;
    cs.last_lat = dataPet.last_lat;
    cs.last_lng = dataPet.last_lng;
    cs.petState = dataPet.state;
    this.setState(cs);
  },
  setCurrentPet() {
    const cs = this.getState();
    cs.petId = "";
    cs.namePet = "";
    cs.imgPet = "";
    cs.last_lat = "";
    cs.last_lng = "";
    this.setState(cs);
  },

  setState(newState) {
    this.data = newState;
    for (const cb of this.listeners) {
      cb();
    }
    console.log("Soy el state, he cambiado", this.data);
  },
  subscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },
};

export { state };
