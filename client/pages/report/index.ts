const imgvacia = require("url:../../img/img-vacia.png");
import { Router } from "@vaadin/router";
import { dropzoneUpload } from "../../lib/dropzone";
import { initMap, initSearchForm, mapbox } from "../../lib/mapbox";
import { state } from "../../state";
customElements.define(
  "report-page",
  class extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
      super();
    }
    imageDataURL: string;
    last_lat = "";
    last_lng = "";
    userEmail = "";
    addListeners() {
      const userEmail = state.getState().userEmail;
      this.userEmail = userEmail;
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
      const validationName = this.querySelector(".validation-name");
      const validationImg = this.querySelector(".validation-img");
      const validationLocation = this.querySelector(".validation-location");
      const buttonReport = this.querySelector(".button-report");
      buttonReport.addEventListener("click", () => {
        const inputNamePet: any = this.querySelector(".input-name-pet");
        const report = {
          name: inputNamePet.value,
          img: this.imageDataURL,
          last_lat: this.last_lat,
          last_lng: this.last_lng,
          state: "perdido",
          userEmail: this.userEmail,
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
          state.createPet(report, () => {
            Router.go("/my-pets");
          });
          validationName.innerHTML = "";
          validationImg.innerHTML = "";
          validationLocation.innerHTML = "";
        }
      });

      const buttonCancelar = this.querySelector(".button-cancelar");
      buttonCancelar.addEventListener("click", () => {
        Router.go("/");
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
      this.render();
      await this.mapbox();
      const buttonCercaDe = document.querySelector(".cerca-de");
      const spanCercaDe: any = this.querySelector(".span-cerca-de");
      buttonCercaDe.addEventListener("click", async () => {
        const lat = this.last_lat;
        const lng = this.last_lng;
        if (lat == "" && lng == "") {
          alert("Elija las coordenadas en el mapa");
        } else {
          const map = initMap();
          initSearchForm(lng, lat, function (results) {
            const firstResult = results[0];
            const ubicación = firstResult.place_name;
            spanCercaDe.innerHTML = `${ubicación}`;
            const marker = new mapbox.Marker()
              .setLngLat(firstResult.geometry.coordinates)
              .addTo(map);
            map.setCenter(firstResult.geometry.coordinates);
            map.setZoom(14);
          });
        }
      });
    }
    render() {
      const style = document.createElement("style");
      this.innerHTML = `
      <header-component></header-component>
      <main class="main-container">
        <text-component type="title" class="title">
          Reportar mascota perdida
        </text-component>
      <section class="section-container">
        <div>
          <text-component type="caption">Nombre</text-component>
          <input type="text" class="input-name-pet">
          <span class="validation-name"> </span>
        </div>
      <div class="dropzone-container">
        <div class="img-container">
        <img class="img-dropzone" src="${imgvacia}">
      </div>
      <button class="dropzone-button">agregar/modificar foto</button>
      <span class="validation-img"> </span>
        </div>
        <div>
          <div id="map"></div>
          <text-component type="caption">
          Primero haga click en el mapa para indicar las cordenadas de su mascota perdida, luego presione el boton "CERCA DE..." y tendra un lugar destacado cercano como referencia.
          </text-component>
          <br>
          <br>
          <text-component type="caption">Aquí abajo figurarán las coordenadas cuando las indique en el mapa.</text-component>
          <input type="text" class="input-location">
          <span class="span-cerca-de"></span>
          <button class="cerca-de">Cerca de...</button>
          <span class="validation-location"> </span>
        </div>
        <div>
          <button-component class="button-report" color="rosa">Reportar como perdido</button-component>
          <button-component class="button-cancelar" color="gris">Calcelar</button-component>
        </div>
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
      @media (min-width:800px){
        .main-container{
          max-width: 700px;
          margin: 30px auto;
        }
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
    .rosa, .dropzone-button, .gris{
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
    .validation-name, .validation-img, .validation-location, .span-cerca-de{
      color: red;
      font-style: italic;
      margin-top: 8px;
      display:block;
    }
    .span-cerca-de{
      color: blue;
    }
    .cerca-de{
      background-color: rgb(0 166 214 / 45%);
    }
    `;
      this.appendChild(style);
      this.addListeners();
    }
  }
);
