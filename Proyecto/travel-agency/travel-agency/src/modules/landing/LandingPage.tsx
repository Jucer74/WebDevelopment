import { STYLE } from "../../core/const/const";
import { Contact } from "./components/Contact";
import { FAQ } from "./components/FAQ";
import { Opinions } from "./components/Opinions";
import { Process } from "./components/Process";
import { Travels } from "./components/Travels";
import { Welcome } from './components/Welcome';

export const LandingPage = () => {
  return (
    <>
      <section id="home" className={"container-fluid " + STYLE.contentPaddingBottomY}>
        <Welcome></Welcome>
      </section>
      <section id="travels" className={"container-fluid " + STYLE.contentPaddingY}>
        <Process></Process>
      </section>
      <section className={"container-fluid " + STYLE.contentPaddingY}>
        <Travels></Travels>
      </section>
      <section id="opinions" className={"container-fluid " + STYLE.contentPaddingY}>
        <Opinions></Opinions>
      </section>
      <section className={"container-fluid " + STYLE.contentPaddingY}>
        <FAQ></FAQ>
      </section>
      <section id="contact" className={"container-fluid " + STYLE.contentPaddingY}>
        <Contact></Contact>
      </section>
    </>
  );
};
