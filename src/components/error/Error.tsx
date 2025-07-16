import "./Error.css";

type errorProps = {
  errorMessage: string;
  handleBackToMenu: () => void;
};

const Error = ({ errorMessage, handleBackToMenu }: errorProps) => {
  return (
    <div className="error-container">
      <h2>Error</h2>
      <p>{errorMessage}</p>
      <button onClick={handleBackToMenu} className="error-action-button">Volver al menú</button>
    </div>
  );
};

export default Error;
