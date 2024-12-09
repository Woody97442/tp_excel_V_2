const VerificationEmailTemplate = ({
  email,
  confirmLink,
}: {
  email: string;
  confirmLink: string;
}) => {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        fontSize: "16px",
        color: "#333",
      }}>
      <h2 style={{ color: "#4A90E2" }}>Bienvenue sur TP Excel V 2 !</h2>
      <p>Bonjour, {email}</p>
      <p>
        Merci de vous être inscrit sur TP Excel V 2. Pour compléter votre
        inscription, veuillez vérifier votre adresse e-mail en cliquant sur le
        lien ci-dessous :
      </p>
      <p>
        <a
          href={confirmLink}
          style={{
            color: "#4A90E2",
            textDecoration: "none",
            fontWeight: "bold",
          }}>
          Vérifier mon e-mail
        </a>
      </p>
      <p>
        Si vous n&#39;avez pas créé de compte sur notre site, vous pouvez
        ignorer ce message.
      </p>
      <p>Merci et à bientôt sur TP Excel V 2 !</p>
      <p>Bien cordialement,</p>
      <p>L&#39;équipe TP Excel V 2</p>
      <p>
        <small>
          Si vous avez des questions, n&#39;hésitez pas à nous contacter à{" "}
          <a
            href="mailto:woody97442@hotmail.fr"
            style={{ color: "#4A90E2" }}>
            woody97442@hotmail.fr
          </a>
          .
        </small>
      </p>
    </div>
  );
};

export default VerificationEmailTemplate;
