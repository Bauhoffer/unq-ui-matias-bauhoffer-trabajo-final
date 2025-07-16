import "./Error.css";

type errorProps = {
  errorMessage: string;
  actionButton: () => void;
};

const Error = ({ errorMessage, actionButton }: errorProps) => {
  return (
    <div className="error-container">
      <h2>Error</h2>
      <p>{errorMessage}</p>
      <button onClick={actionButton} className="error-action-button">Volver al menú</button>
    </div>
  );
};

export default Error;
