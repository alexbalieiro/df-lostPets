import { Router } from "@vaadin/router";
import { state } from "../../state";
import { initSearchForm } from "../../lib/mapbox";
const vector = require("url:../../img/vector.png");
const lapiz = require("url:../../img/lapiz.png");
customElements.define(
  "card-component",
  class extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
      super();
    }
    petId = "";
    petName = "";
    userEmail = "";
    last_lat = "";
    last_lng = "";
    addListeners() {
      const spanCercaDe = this.querySelector(".span-cerca-de");
      const lng = parseFloat(this.last_lng);
      const lat = parseFloat(this.last_lat);
      initSearchForm(lng, lat, (results) => {
        const firstResult = results[0];
        const cercaDe = firstResult.place_name;
        spanCercaDe.innerHTML = `${cercaDe}`;
      });
      const elLink = this.querySelector(".report-link");
      const elButtonClose = this.querySelector(".close-button");
      const elLapiz = this.querySelector(".img-lapiz");
      const formReport = this.querySelector(".form-report");
      elLink.addEventListener("click", () => {
        const reportContainer = this.querySelector(".report-container");
        reportContainer.classList.toggle("show");
        const mainContainer = document.querySelector(".main-container");
        mainContainer.classList.toggle("show");
        const cardContainer = this.querySelector(".card-container");
        cardContainer.classList.toggle("show");
        const img = this.querySelector(".img");
        img.classList.toggle("show");
      });
      elButtonClose.addEventListener("click", () => {
        const reportContainer = this.querySelector(".report-container");
        reportContainer.classList.toggle("show");
        const mainContainer = document.querySelector(".main-container");
        mainContainer.classList.toggle("show");
        const cardContainer = this.querySelector(".card-container");
        cardContainer.classList.toggle("show");
        const img = this.querySelector(".img");
        img.classList.toggle("show");
      });
      elLapiz.addEventListener("click", async () => {
        const petId = this.petId;
        const pets = await state.getMyPets();
        const pet = pets.find((pet) => {
          if (pet.id == petId) {
            return pet;
          }
        });
        state.currentPet(pet);
        Router.go("/report-edit");
      });
      formReport.addEventListener("submit", (e: any) => {
        e.preventDefault();
        const nameReport = e.target.fullname.value;
        const phoneReport = e.target.phone.value;
        const messageReport = e.target.where.value;
        const report = {
          userEmail: this.userEmail,
          reporterName: nameReport,
          phoneNumber: phoneReport,
          message: messageReport,
          petName: this.petName,
        };
        if (nameReport == "") {
          alert("Ingrese el nombre de quien reporta");
        } else if (phoneReport.length < 10) {
          alert(`Ingrese un numero valido, sin "0" y sin "15"`);
        } else if (messageReport == "") {
          alert("Cuentenos donde vió a la mascota");
        } else {
          state.createReport(report, (data) => {
            alert("Gracias por brindarnos información");
            const reportContainer = this.querySelector(".report-container");
            reportContainer.classList.toggle("show");
            const mainContainer = document.querySelector(".main-container");
            mainContainer.classList.toggle("show");
            const cardContainer = this.querySelector(".card-container");
            cardContainer.classList.toggle("show");
            const img = this.querySelector(".img");
            img.classList.toggle("show");
          });
        }
      });
    }
    connectedCallback() {
      this.render();
    }
    render() {
      const style = document.createElement("style");
      const withPencil = this.getAttribute("with-pencil");
      const state = this.getAttribute("state");
      const petId = this.getAttribute("pet-id");
      this.petId = petId;
      const petName = this.getAttribute("name-pet");
      this.petName = petName;
      const owner = this.getAttribute("owner");
      this.userEmail = owner;
      const lat = this.getAttribute("lat");
      const lng = this.getAttribute("lng");
      this.last_lat = lat;
      this.last_lng = lng;
      const img = this.getAttribute("img");
      this.innerHTML = `
      <div class="card-container" style="height:${
        state == "encontrado" ? "360px" : "330px"
      };">
      <div class="report-container">
        <button class="close-button">
        <img class="img-report" src="${vector}">
        </button>
        <text-component type="title">Reportar info de Bobby</text-component>
        <form class="form-report">
          <label class="label-form">Tu nombre
            <input type="text" name="fullname" class="input"/>
          </label>
          <label class="label-form">Tu teléfono
            <input type="number" name="phone" class="input"/>
          </label>
          <label class="label-form">Donde lo viste?
            <textarea type="text" name="where" class="textarea"></textarea>
          </label>
          <button class="form-button">Enviar</button>
        </form>
      </div>
        <div class="img-container">
          <img class="img" src=${img}>
        </div>
        <div class="text-container">
          <div class="text-info">
            <text-component type="title">${petName}</text-component>
            <span class="span-cerca-de"></span>
          </div>
            <a class="report-link">Reportar informacion</a>
            <img class="img-lapiz" src="${lapiz}">
            </div>
            <span class="located" style="display:${
              state == "encontrado" ? "block" : "none"
            };">Esta mascota la reportaste como encontrada</span>
      </div>
      `;
      style.innerHTML = `
      .card-container{
        width: 100%;
        border: 2px solid black;
        border-radius: 8px;
        box-shadow: 8px 5px 5px #CDCDCD;
        display:flex;
        flex-direction: column;
      }
      .img-container{
        display:flex;
        height: 200px;
      }
      .img{
        width: 100%;
        object-fit: cover;
        border-radius: 8px;
      }
      .text-container{
        display:flex;
        justify-content: space-between;
        align-items: center;
        padding: 0px 10px;
        overflow: auto;
      }
      .text-info{
        display:flex;
        flex-direction:column;
        margin-top:10px;
        overflow-wrap: anywhere;
      }
      .report-link{
        display: ${withPencil == "true" ? "none" : "initial"};
        font-family: 'Poppins', sans-serif;
        text-align: right;
        font-size: 16px;
        font-weight: 500;
        color: #3E91DD;
        text-decoration-line: underline;
        text-transform: uppercase;
        cursor: pointer;
        max-width: 113px
      }
      .report-container.show{
        top:100px;
      }
      .main-container.show{
        background: rgba(0,0,0,.4);
        padding-bottom: 508px;
      }
      .card-container.show{
        box-shadow:none;
        align-items: center;
      }
      .img.show{
        display:none;
      }
      .report-container{
        width:314px;
        height:600px;
        background-color: white;
        position:fixed;
        top: -100vh;
        transition: all .3s;
        border: 1px solid black;
        display: flex;
        flex-direction: column;
        padding: 10px;
        gap:15px;
      }
      .close-button{
        border-style:none;
        background-color: white;
        align-self: end;
        padding: 0px;
      }
      .form-report{
        display: flex;
        flex-direction: column;
      }
      .input,textarea{
        display:block;
        margin-bottom: 18px;
      }
      .input{
        width: 100%;
        height: 50px;
        font-family: 'Poppins', sans-serif;
        font-size: 24px;
        font-weight: 500;
        border: 2px solid black;
        border-radius: 4px;
      }
      .textarea{
        width: 100%;
        height: 125px;
        font-family: 'Poppins', sans-serif;
        font-size: 24px;
        font-weight: 500;
        border: 2px solid black;
        border-radius: 4px;
      }
      .form-button{
        height: 50px;
        font-size: 16px;
        font-weight: 700;
        font-family: 'Poppins', sans-serif;
        border: 0px;
        border-radius: 4px;
        background-color: #FF9DF5;
      }
      .label-form{
        font-size: 16px;
        font-weight: 500;
        font-family: 'Poppins', sans-serif;
        text-transform: uppercase;
      }
      .img-lapiz{
        display: ${withPencil == "true" ? "initial" : "none"};
        cursor: pointer;
      }
      .located{
        color: green;
        text-align: center;
        font-style: italic;
        margin-top: 8px;
      }
      .span-cerca-de{
        font-family: 'Poppins', sans-serif;
        font-size: 16px;
        font-weight: 500;
        text-transform: uppercase;
      }
        `;
      this.appendChild(style);
      this.addListeners();
    }
  }
);
