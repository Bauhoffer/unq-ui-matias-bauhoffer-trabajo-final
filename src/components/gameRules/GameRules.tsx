import React from "react";
import "./GameRules.css";
import { RuleCard } from "./RuleCard";

export const GameRules: React.FC = () => {
  return (
    <section className="game-rules-container">
      <div className="game-rules-body">
        <p>
          Las reglas son simples: adivina la palabra oculta en 6 intentos.
        </p>

        <p>
          Cada intento debe ser una palabra válida y si la palabra no existe el
          juego te avisará.
        </p>

        <p>
          Después de cada intento el color de las casillas cambia para mostrar
          qué tan cerca estás de acertar la palabra:
        </p>
      </div>
      <div className="game-rules-color-code">
        <RuleCard
          letter="U"
          color="green"
          description="VERDE significa que la letra está en la palabra y en la posición CORRECTA."
        />
        <RuleCard
          letter="N"
          color="yellow"
          description="AMARILLO significa que la letra está presente en la palabra pero en la posición INCORRECTA."
        />
        <RuleCard
          letter="Q"
          color="gray"
          description="GRIS significa que la letra NO está presente en la palabra."
        />
      </div>
    </section>
  );
};
