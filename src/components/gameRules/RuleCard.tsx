import "./RuleCard.css";

interface RuleCardProps {
  letter: string;
  color: "green" | "yellow" | "gray";
  description: string;
}

export const RuleCard = ({ letter, color, description }: RuleCardProps) => {
  return (
    <div className="rule-card">
      <div className={`letter-box ${color}`}>{letter}</div>
      <p className="rule-card-description">{description}</p>
    </div>
  );
};
