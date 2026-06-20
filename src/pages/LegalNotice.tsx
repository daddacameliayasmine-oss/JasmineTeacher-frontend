import Card from "../components/ui/Card.js";

// Page "Mentions legales + Politique de confidentialite" (obligation legale en France).
// Texte statique, valeurs a personnaliser par Jasmine avant mise en prod definitive.
// Structure : editeur, hebergeur, propriete intellectuelle, donnees personnelles, cookies.
const LegalNotice = () => {
  return (
    <section
      style={{
        maxWidth: 800,
        margin: "var(--space-xl) auto",
        padding: "0 var(--space-lg)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-md)",
      }}
    >
      <h1 style={{ marginBottom: "var(--space-md)" }}>Mentions légales</h1>

      <Card title="Éditeur du site">
        <p>
          <strong>Jasmine Teacher</strong> — site personnel proposant des cours de danse orientale
          en ligne.
        </p>
        <p>Responsable de publication : Jasmine</p>
        <p>Adresse email de contact : contact@jasmine-teacher.fr</p>
        <p>Statut : entrepreneur individuel (à compléter avant mise en production réelle).</p>
      </Card>

      <Card title="Hébergement">
        <p>
          <strong>Frontend</strong> : Vercel Inc. — 340 S Lemon Ave #4133, Walnut, CA 91789, USA.
        </p>
        <p>
          <strong>Backend</strong> : Render Services Inc. — 525 Brannan St, San Francisco, CA 94107,
          USA.
        </p>
        <p>
          <strong>Base de données</strong> : TiDB Cloud (PingCAP, Inc.) — région Frankfurt
          (Allemagne, UE).
        </p>
      </Card>

      <Card title="Propriété intellectuelle">
        <p>
          L'ensemble du contenu de ce site (textes, images, vidéos, chorégraphies, code source) est
          la propriété exclusive de Jasmine, sauf mention contraire. Toute reproduction,
          représentation ou diffusion sans autorisation écrite préalable est interdite.
        </p>
      </Card>

      <div id="confidentialite" />
      <Card title="Politique de confidentialité">
        <p>
          Conformément au RGPD (Règlement Général sur la Protection des Données — UE 2016/679) et à
          la loi Informatique et Libertés, vous disposez d'un droit d'accès, de rectification, de
          suppression et d'opposition sur vos données personnelles.
        </p>
        <p style={{ marginTop: "var(--space-md)" }}>
          <strong>Données collectées</strong> : nom, prénom, adresse email, mot de passe (haché avec
          bcrypt), historique des réservations et paiements.
        </p>
        <p style={{ marginTop: "var(--space-md)" }}>
          <strong>Finalité</strong> : gestion des comptes élèves, réservations de cours, suivi des
          paiements (via Stripe), communication relative aux cours.
        </p>
        <p style={{ marginTop: "var(--space-md)" }}>
          <strong>Durée de conservation</strong> : tant que votre compte est actif. Vous pouvez
          demander la suppression de votre compte à tout moment via la page Profil ou en envoyant un
          email à contact@jasmine-teacher.fr.
        </p>
        <p style={{ marginTop: "var(--space-md)" }}>
          <strong>Partage des données</strong> : aucune donnée personnelle n'est revendue. Stripe
          traite les informations de paiement de manière conforme à la norme PCI-DSS.
        </p>
      </Card>

      <Card title="Cookies">
        <p>
          Le site utilise un unique <em>localStorage</em> pour conserver votre token de session
          (JWT) afin de vous maintenir connecté. Aucun cookie de tracking publicitaire n'est posé.
        </p>
      </Card>

      <Card title="Contact">
        <p>
          Pour toute question relative à vos données ou au site, contactez-nous à
          contact@jasmine-teacher.fr ou via la <a href="/contact">page de contact</a>.
        </p>
      </Card>
    </section>
  );
};

export default LegalNotice;
