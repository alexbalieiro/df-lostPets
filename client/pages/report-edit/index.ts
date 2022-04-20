const imgvacia = require("url:../../img/img-vacia.png");
import { state } from "../../state";
import { dropzoneUpload } from "../../lib/dropzone";
import { initMap, mapbox } from "../../lib/mapbox";
import { Router } from "@vaadin/router";
customElements.define(
  "reportedit-page",
  class extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
      super();
    }
    petId;
    imgLoad = "";
    imageDataURL: string;
    last_lat = "";
    last_lng = "";
    petState = "";
    addListeners() {
      const inputNamePet: any = this.querySelector(".input-name-pet");
      const inputLocation: any = this.querySelector(".input-location");
      const currentPet = state.getState();
      this.petId = currentPet.petId;
      inputNamePet.value = currentPet.namePet;
      this.last_lat = currentPet.last_lat;
      this.last_lng = currentPet.last_lng;
      inputLocation.value = currentPet.last_lat + " " + currentPet.last_lng;
      this.imageDataURL = currentPet.imgPet;
      const dropzoneImage: any = this.querySelector(".img-dropzone");
      const dropzoneButton = this.querySelector(".dropzone-button");
      const dropzoneInit = dropzoneUpload(dropzoneImage, dropzoneButton);
      dropzoneInit.then((dropzone) => {
        dropzone.on("thumbnail", (file) => {
          dropzoneImage.src = file.dataURL;
          this.imageDataURL = file.dataURL;
        });
        dropzone.processQueue();
      });
      const validationSave = this.querySelector(".validation-save");
      const validationName = this.querySelector(".validation-name");
      const validationImg = this.querySelector(".validation-img");
      const validationLocation = this.querySelector(".validation-location");
      const buttonSave = this.querySelector(".button-save");
      buttonSave.addEventListener("click", () => {
        const inputNamePet: any = this.querySelector(".input-name-pet");
        const report = {
          name: inputNamePet.value,
          img: this.imageDataURL,
          last_lat: this.last_lat,
          last_lng: this.last_lng,
          state: "perdido",
        };
        if (report.name == "") {
          validationName.innerHTML =
            "Por favor, ingrese el nombre de la mascota";
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else if (report.img == undefined) {
          validationName.innerHTML = "";
          validationImg.innerHTML = "Por favor, cargue la imagen de la mascota";
          window.scrollTo({ top: 80, behavior: "smooth" });
        } else if (report.last_lat == "" || report.last_lng == "") {
          validationImg.innerHTML = "";
          validationLocation.innerHTML =
            "Por favor, marque en el mapa donde fue visto por última vez la mascota";
        } else {
          state.updatePet(this.petId, report, (data) => {
            validationSave.innerHTML = "La informacion se guardó correctamente";
          });
          validationName.innerHTML = "";
          validationImg.innerHTML = "";
          validationLocation.innerHTML = "";
        }
      });

      const buttonLocated = this.querySelector(".button-located");
      buttonLocated.addEventListener("click", () => {
        const report = {
          name: inputNamePet.value,
          img: this.imageDataURL,
          last_lat: this.last_lat,
          last_lng: this.last_lng,
          state: "encontrado",
        };
        if (report.name == "") {
          validationName.innerHTML =
            "Por favor, ingrese el nombre de la mascota";
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else if (report.img == undefined) {
          validationName.innerHTML = "";
          validationImg.innerHTML = "Por favor, cargue la imagen de la mascota";
          window.scrollTo({ top: 80, behavior: "smooth" });
        } else if (report.last_lat == "" || report.last_lng == "") {
          validationImg.innerHTML = "";
          validationLocation.innerHTML =
            "Por favor, marque en el mapa donde fue visto por última vez la mascota";
        } else {
          state.updatePet(this.petId, report, (data) => {
            Router.go("/my-pets");
          });
          validationName.innerHTML = "";
          validationImg.innerHTML = "";
          validationLocation.innerHTML = "";
        }
      });
      const buttonLost = this.querySelector(".button-lost");
      buttonLost.addEventListener("click", () => {
        const report = {
          name: inputNamePet.value,
          img: this.imageDataURL,
          last_lat: this.last_lat,
          last_lng: this.last_lng,
          state: "perdido",
        };
        if (report.name == "") {
          validationName.innerHTML =
            "Por favor, ingrese el nombre de la mascota";
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else if (report.img == undefined) {
          validationName.innerHTML = "";
          validationImg.innerHTML = "Por favor, cargue la imagen de la mascota";
          window.scrollTo({ top: 80, behavior: "smooth" });
        } else if (report.last_lat == "" || report.last_lng == "") {
          validationImg.innerHTML = "";
          validationLocation.innerHTML =
            "Por favor, marque en el mapa donde fue visto por última vez la mascota";
        } else {
          state.updatePet(this.petId, report, (data) => {
            Router.go("/my-pets");
          });
          validationName.innerHTML = "";
          validationImg.innerHTML = "";
          validationLocation.innerHTML = "";
        }
      });
      const linkDespublicar = this.querySelector(".link-despublicar");
      linkDespublicar.addEventListener("click", () => {
        if (this.petId) {
          state.deletePet(this.petId, () => {
            Router.go("/my-pets");
          });
        } else {
          Router.go("/my-pets");
        }
      });
    }
    async mapbox() {
      initMap();
      initMap().on("click", (data) => {
        const lng = data.lngLat.lng;
        const lat = data.lngLat.lat;
        this.last_lat = lat;
        this.last_lng = lng;
        const inputLocation: any = this.querySelector(".input-location");
        inputLocation.value = this.last_lat + " " + this.last_lng;
      });
    }

    async connectedCallback() {
      const currentPet = state.getState();
      this.petState = currentPet.petState;
      if (currentPet.imgPet) {
        this.imageDataURL = currentPet.imgPet;
      } else {
        this.imageDataURL = imgvacia;
      }
      this.render();
      await this.mapbox();
    }
    render() {
      const style = document.createElement("style");
      this.innerHTML = `
      <header-component></header-component>
      <main class="main-container">
        <text-component type="title" class="title">
          Editar mascota perdida
        </text-component>
      <section class="section-container">
        <div>
          <text-component type="caption">Nombre</text-component>
          <input type="text" class="input-name-pet">
          <span class="validation-name"> </span>
        </div>
      <div class="dropzone-container">
        <div class="img-container">
        <img class="img-dropzone" src="${this.imageDataURL}">
      </div>
      <button class="dropzone-button">agregar/modificar foto</button>
      <span class="validation-img"> </span>
        </div>
        <div>
          <div id="map"></div>
          <text-component type="caption">Ubicación</text-component>
          <input type="text" class="input-location">
          <span class="validation-location"> </span>
          <text-component type="caption">
          Buscá un punto de referencia para reportar a tu mascota.
          Puede ser una dirección, un barrio o una ciudad.
          </text-component>
        </div>
        <div>
        <span class="validation-save"> </span>
        <button-component class="button-save" color="rosa">Guardar</button-component>
        <button-component class="button-lost" color="verde">Reportar como perdido</button-component>
        <button-component class="button-located" color="verde">Reportar como encontrado</button-component>
        </div>
        <a class="link-despublicar">Despublicar</a>
        </section>
      </main>
    `;
      style.innerHTML = `
      .main-container{
        margin: 10px 20px;
        display:flex;
        flex-direction: column;
        gap:30px;
      }
      .section-container{
        display: flex;
        flex-direction: column;
        gap: 35px;
      }
    .input-name-pet, .input-location{
      width:100%;
      height: 50px;
      font-family: 'Poppins', sans-serif;
      font-size: 24px;
      font-weight: 500;
      border: 2px solid black;
      border-radius: 4px;
      text-security: square;
    }
    .input-location{
      font-size: 15px;
    }
    .rosa, .dropzone-button, .verde{
      margin-top:20px;
    }
    .dropzone-button{
      background-color: #97EA9F;
    }
    .link-despublicar{
      font-family: 'Poppins', sans-serif;
      text-align: center;
      font-size: 16px;
      font-weight: 500;
      color: #FF3A3A;
      text-decoration-line: underline;
      text-transform: uppercase;
      cursor: pointer;
      margin-bottom: 35px;
    }
    .img-dropzone{
      width: 100%;
      max-height: 300px;
      object-fit: contain;
    }
    #map{
      width: 100%;
      height: 350px;
    }
    .validation-name, .validation-img, .validation-location, .validation-save{
      color: red;
      font-style: italic;
      margin-top: 8px;
      display:block;
    }
    .validation-save{
      color:green;
    }
    .button-lost{
      display: ${this.petState == "perdido" ? "none" : "initial"};
    }
    .button-located{
      display: ${this.petState == "encontrado" ? "none" : "initial"};
    }
    `;
      this.appendChild(style);
      this.addListeners();
    }
  }
);
