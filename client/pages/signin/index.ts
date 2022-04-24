import { Router } from "@vaadin/router";
import { state } from "../../state";

customElements.define(
  "signin-page",
  class extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
      super();
    }
    addListeners() {
      const elButtonNext = this.querySelector(".button-next");
      elButtonNext.addEventListener("click", () => {
        this.validation();
      });
    }
    validation() {
      const inputEmail: any = this.querySelector(".input-email");
      const userEmail = inputEmail.value;
      const validationText = this.querySelector(".validation-text");
      const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      if (userEmail.match(pattern)) {
        state.setEmail(userEmail);
        state.getUser((data) => {
          if (data.message) {
            Router.go("/register");
          } else {
            this.newForm();
            const elButtonGetinto = this.querySelector(".button-getinto");
            const validationText = this.querySelector(".validation-text");
            const linkPassw = this.querySelector(".link-passw");
            linkPassw.addEventListener("click", () => {
              Router.go("/register");
            });
            elButtonGetinto.addEventListener("click", () => {
              const inputPassw: any = this.querySelector(".input-passw");
              state.getToken(inputPassw.value, (data) => {
                if (data.error) {
                  validationText.innerHTML = `Contraseña incorrecta, vuelva a intentar`;
                } else {
                  Router.go("/my-pets");
                }
              });
            });
          }
        });
      } else {
        validationText.innerHTML = `Por favor, ingrese un email valido`;
      }
    }
    connectedCallback() {
      this.render();
    }
    newForm() {
      const newForm = (this.querySelector(
        ".section-container"
      ).innerHTML = `<text-component type="caption">Contraseña</text-component>
      <input type="password" class="input-passw">
      <span class="validation-text"> </span>
      <a class="link-passw" href=""> Olvidé mi contraseña</a>
      <button-component class="button-getinto" color="rosa">Ingresar</button-component>`);
      return newForm;
    }
    render() {
      const style = document.createElement("style");
      this.innerHTML = `
      <header-component></header-component>
      <main class="main-container">
        <text-component type="title" class="title">Ingresar</text-component>
      <section class="section-container">
        <text-component type="caption">email</text-component>
        <input type="email" class="input-email" placeholder="Ingrese un email valido">
        <span class="validation-text"> </span>
        <button-component class="button-next" color="rosa">Siguiente</button-component>
      </section>
      </main>
    `;
      style.innerHTML = `
      .main-container{
        margin: 45px 20px;
        display:flex;
        flex-direction: column;
        gap:45px;
      }
      @media (min-width:800px){
        .main-container{
          max-width: 700px;
          margin: 30px auto;
        }
      }
      .title{
        text-align: center;
      }
    .input-email, .input-passw{
      width:100%;
      height: 50px;
      font-family: 'Poppins', sans-serif;
      font-size: 24px;
      font-weight: 500;
      border: 2px solid black;
      border-radius: 4px;
    }
    .rosa{
      margin-top:20px;
    }
    .link-passw{
    font-family: 'Poppins', sans-serif;
    text-align: right;
    font-size: 16px;
    font-weight: 500;
    color: #3E91DD;
    text-decoration-line: underline;
    text-transform: uppercase;
    cursor: pointer;
    display: block;
    text-align: center;
    margin-top:5px;
    }
    .validation-text{
      color: red;
      font-style: italic;
    }
    `;
      this.appendChild(style);
      this.addListeners();
    }
  }
);
