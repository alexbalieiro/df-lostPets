import { Router } from "@vaadin/router";
import { state } from "../../state";

customElements.define(
  "register-page",
  class extends HTMLElement {
    constructor() {
      super();
    }
    fullname = "";
    addListeners() {
      const elButton = this.querySelector(".button");
      const inputFullname: any = this.querySelector(".input-fullname");
      inputFullname.value = this.fullname;
      const inputPass1: any = this.querySelector(".input-pass1");
      const inputPass2: any = this.querySelector(".input-pass2");
      const validationPassw: any = this.querySelector(".validation-passw");
      const validationName = this.querySelector(".validation-name");
      elButton.addEventListener("click", () => {
        if (inputPass1.value == inputPass2.value) {
          validationPassw.innerHTML = "";
          if (inputPass1.value == "" || inputPass2.value == "") {
            validationPassw.innerHTML = "Por favor, ingrese una contraseña";
          } else {
            validationPassw.innerHTML = "";
            if (inputFullname.value == "") {
              validationName.innerHTML = `Por favor, ingrese un nombre`;
            } else {
              validationName.innerHTML = "";
              state.getUser((data) => {
                if (data.message) {
                  state.auth(inputFullname.value, inputPass1.value, () => {
                    state.getToken(inputPass1.value, () => {
                      Router.go("/my-pets");
                    });
                  });
                } else {
                  state.updateUser(
                    inputFullname.value,
                    inputPass1.value,
                    (data) => {
                      if (data.error) {
                        validationPassw.style.color = "red";
                        validationPassw.innerHTML = `${data.error}`;
                      } else {
                        validationPassw.style.color = "green";
                        validationPassw.innerHTML = `Tu informacion se guardó correctamente`;
                      }
                    }
                  );
                }
              });
            }
          }
        } else {
          validationPassw.innerHTML = `Por favor, repita las contraseñas correctamente`;
        }
      });
    }

    connectedCallback() {
      const cs = state.getState();
      this.fullname = cs.fullname;
      this.render();
    }
    render() {
      const style = document.createElement("style");
      this.innerHTML = `
      <header-component></header-component>
      <main class="main-container">
        <text-component type="title" class="title">Mis datos</text-component>
      <section class="section-container">
      <div>
        <text-component type="caption">Nombre</text-component>
        <input type="text" class="input-fullname">
        <span class="validation-name"> </span>
      </div>
      <div>
        <text-component type="caption">Contraseña</text-component>
        <input type="password" class="input-pass1">
        <text-component type="caption">Repetir contraseña</text-component>
        <input type="password" class="input-pass2">
        <span class="validation-passw"> </span>
        <button-component class="button" color="rosa">Guardar</button-component>
      </div>
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
      .section-container{
        display: flex;
        flex-direction: column;
        gap: 70px;
      }
    input{
      width:100%;
      height: 50px;
      font-family: 'Poppins', sans-serif;
      font-size: 24px;
      font-weight: 500;
      border: 2px solid black;
      border-radius: 4px;
      text-security: square;
    }
    .rosa{
      margin-top:20px;
    }
    .validation-passw, .validation-name{
      color: red;
      font-style: italic;
    }
    `;
      this.appendChild(style);
      this.addListeners();
    }
  }
);
