import Card from "../components/ui/Card.js";

// Page "A propos" : presentation de Jasmine (texte issu du wireframe Frame 3).
const About = () => {
  return (
    <section
      style={{
        padding: "var(--space-xl) var(--space-lg)",
        maxWidth: 800,
        margin: "0 auto",
      }}
    >
      <h1 style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: "var(--space-lg)" }}>
        À propos
      </h1>
      <Card>
        <p style={{ marginBottom: "var(--space-md)" }}>
          Jasmine, professeure, propose des cours de danse orientale en ligne, accessibles à tous
          les niveaux.
        </p>
        <p style={{ marginBottom: "var(--space-md)" }}>
          Passionnée depuis son plus jeune âge, Jasmine compte plus de 10 ans d'expérience et
          transmet son savoir avec exigence et bienveillance.
        </p>
        <p style={{ marginBottom: "var(--space-md)" }}>
          Que vous soyez débutant ou confirmé, vous pouvez apprendre à votre rythme depuis chez
          vous, grâce à des cours en visio (10 personnes maximum) ou en individuel, avec des
          programmes adaptés à chacun. Les enfants sont acceptés à partir de 6 ans.
        </p>
        <p>
          Les cours sont à réserver au minimum une semaine à l'avance afin d'assurer un
          accompagnement de qualité.
        </p>
      </Card>
    </section>
  );
};

export default About;
