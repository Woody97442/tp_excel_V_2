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
        Votre compte a été créé sur TP Excel V 2. Pour compléter votre
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
    </div>
  );
};

export default VerificationEmailTemplate;
