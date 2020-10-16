import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

//Css
import "../css/layout.sass";
import "./ProjectTemplate.sass";

const ProjectTemplate = (props) => {
  const header = useRef(null);
  const article = useRef(null);

  useEffect(() => {
    // Add resize event handler to deal with padding of responsive element
    const handleResize = () => {
      article.current.style.paddingTop =
        header.current.getBoundingClientRect().height + "px";
    };
    handleResize();
    window.addEventListener("resize", handleResize);
  }, []);
  return (
    <section className={"sub__section"}>
      <header ref={header} className={"sub__header"}>
        <h1>Booking UI/UX</h1>
        <h2>
          {" "}
          Booking pages have too much friction and do not optimize design flow
        </h2>
      </header>
      <article ref={article} className={"sub__article"}>
        <p>
          sed commodo urna <br></br>
          vestibulum. Nulla purus neque, lobortis at fermentum sed, rutrum nec
          mi. Sed mauris ex, pellentesque quis tincidunt ac, sagittis a sapien.
          Sed a massa et sapien feugiat pharetra sed eu tortor. Curabitur
          vehicula, dui et ph <br></br> <br></br>aretra auctor, dui purus
          tincidunt arcu, eu tristique nibh purus eu erat. Donec ac sapien
          neque. Sed ac mauris gravida, vulputate lacus at, placerat magna.
          Fusce tincidunt tellus odio. Maecenas facilisis congue sem, in semper{" "}
        </p>
      </article>
    </section>
  );
};

export default ProjectTemplate;
