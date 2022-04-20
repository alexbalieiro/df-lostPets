import { Router } from "@vaadin/router";
import { state } from "../../state";
const img = require("url:../../img/patitas.png");
customElements.define(
  "header-component",
  class extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
      super();
    }
    userToken = false;
    email = "";
    addListeners() {
      const navMenu = this.querySelector(".burger-container");
      navMenu.addEventListener("click", () => {
        const menuItems = this.querySelector(".menu-items");
        const mapContainer = document.getElementById("map");
        if (mapContainer) {
          mapContainer.classList.toggle("show");
        }
        menuItems.classList.toggle("show");
      });
      const homeButton = this.querySelector(".header-img");
      homeButton.addEventListener("click", () => {
        Router.go("/");
      });
      const mydateLink = this.querySelector(".mydate-link");
      mydateLink.addEventListener("click", () => {
        const menuItems = this.querySelector(".menu-items");
        menuItems.classList.toggle("show");
      });
      const mypetsLink = this.querySelector(".mypets-link");
      mypetsLink.addEventListener("click", () => {
        const menuItems = this.querySelector(".menu-items");
        menuItems.classList.toggle("show");
      });
      const myreportLink = this.querySelector(".myreport-link");
      myreportLink.addEventListener("click", () => {
        const menuItems = this.querySelector(".menu-items");
        menuItems.classList.toggle("show");
      });
      const closeSesion = this.querySelector(".close-sesion");
      closeSesion.addEventListener("click", () => {
        sessionStorage.removeItem("token");
        const cs = state.getState();
        cs.fullname = "";
        cs.userEmail = "";
        cs.password = "";
        cs.userId = "";
        state.setState(cs);
        Router.go("/");
        const menuItems = this.querySelector(".menu-items");
        menuItems.classList.toggle("show");
      });
    }

    connectedCallback() {
      state.recoverToken((token) => {
        if (token == "" || token == "undefined") {
          this.userToken = false;
          this.render();
        } else {
          this.userToken = true;
          const cs = state.getState();
          this.email = cs.userEmail;
          this.render();
        }
      });
      this.render();
    }
    render() {
      const style = document.createElement("style");
      this.innerHTML = `
      <div class="header-container">
        <img class="header-img" src="${img}">
        <ul class="menu-items">
        <li><a class="mydate-link" href=${
          this.userToken ? "/register" : "/signin"
        }> Mis datos</a></li>
          <li><a class="mypets-link" href=${
            this.userToken ? "/my-pets" : "/signin"
          }> Mis mascotas reportadas</a></li>
          <li><a class="myreport-link" href=${
            this.userToken ? "/report" : "/signin"
          }> Reportar mascota</a></li>
          <div class="sesion-container">
            <span class="email-header">${this.email}</span>
            <a class="close-sesion" href="">${
              this.userToken ? "Cerrar sesión" : ""
            }</a>
          </div>

        </ul>
        <div class="burger-container">
          <div class="rectangulo"></div>
          <div class="rectangulo"></div>
          <div class="rectangulo"></div>
        </div>
      </div>
      `;
      style.innerHTML = `
        .header-container{
          display:flex;
          justify-content: space-between;
          height: 60px;
          width: 100vw;
          background-color: #FF6868;
          border-bottom: 1px solid white;
          box-shadow: 5px 0 10px rgba(0,0,0, .6);
          align-items: center;
        }
        .header-img{
          width: 40px;
          height: 34px;
          margin: 20px;
        }
        .burger-container,.header-img{
          cursor: pointer;
        }
        .burger-container{
          display:none;
        }
        .rectangulo{
          background-color: black;
          width: 54px;
          height: 5px;
          margin-bottom: 8px;
        }
        .menu-items{
          display:flex;
          list-style:none;
        }
        .menu-items li{
          border-radius:5px;
          margin: 0 30px;
        }
        .menu-items li a{
          font-family: 'Poppins', sans-serif;
          font-size: 24px;
          font-weight: 700;
          color: black;
          text-decoration: none;
          padding: 7px 13px;
          display:block;
        }
        .menu-items li:hover, li:active{
          background-color: rgba(255 ,255 ,255 ,.4);
          transition: .4s;
        }
        ul.show{
          top:60px;
        }
        .sesion-container{
          display:none;
          flex-direction: column;
          margin-top: 110px;
        }
        .sesion-container span{
          font-family: 'Poppins', sans-serif;
          font-size: 24px;
        }
        .sesion-container a{
          font-family: 'Poppins', sans-serif;
          font-size: 16px;
          font-weight: 500;
          text-transform: uppercase;
        }
        @media screen and (max-width: 1038px){
          .burger-container{
            display:block;
            margin: 10px 20px 0 0 ;
          }
          .menu-items{
           position: fixed;
           width:100vw;
           height: 100vh;
           background: #8AF1FF;
           top: -100vh;
           text-align: center;
           transition: all .4s;
           flex-direction:column;
           padding: 0;
           margin: 0px
          }
          .menu-items li {
            margin-top: 60px;
          }
          .menu-items li:hover{
            background: none;
          }
          .sesion-container{
            display:flex;
          }
        }
        #map.show{
          display:none;
        }
        `;
      this.appendChild(style);
      this.addListeners();
    }
  }
);
