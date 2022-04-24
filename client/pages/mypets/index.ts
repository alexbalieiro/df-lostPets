import { state } from "../../state";

customElements.define(
  "mypets-page",
  class extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
      super();
    }
    pets: any = 0;
    addListeners() {
      const container = this.querySelector(".section-container");
      const caption = this.querySelector(".caption");
      if (this.pets == 0) {
        caption.innerHTML = `Aun no reportaste mascotas perdidas`;
      } else {
        caption.innerHTML = ``;
        this.pets.forEach((pet) => {
          const div = document.createElement("div");
          div.innerHTML = `<card-component with-pencil="true" pet-id="${pet.id}" name-pet="${pet.name}" img=${pet.img} state="${pet.state}" lat="${pet.last_lat}" lng="${pet.last_lng}"> </card-component>`;
          container.appendChild(div);
        });
      }
    }

    async connectedCallback() {
      state.setCurrentPet();
      const pets = await state.getMyPets();
      this.pets = pets;
      this.render();
    }
    render() {
      const style = document.createElement("style");
      this.innerHTML = `
      <header-component></header-component>
      <main class="main-container">
        <text-component type="title">Mis mascotas perdidas</text-component>
      <section class="section-container">
          <span class="caption"></span>
      </section>
      </main>

    `;
      style.innerHTML = `
      .main-container{
        padding:15px 20px;
      }
      @media (min-width:800px){
        .main-container{
          max-width: 700px;
          margin: 30px auto;
        }
      }
      .section-container{
        margin-top: 30px;
        display:flex;
        flex-direction: column;
        gap:20px;
      }
      .caption{
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
