import css from "./CandidateInputComponent.module.css";

export const CandidateInputComponent = ({
  candidateName,
  isChosen,
  onChoose,
  disabled,
  isWinner,
  votesCount,
  totalVotesCount,
  candidateCount,
}) => {
  const percentage =
    totalVotesCount === 0 ? Math.floor(100 / candidateCount) : ((votesCount / totalVotesCount) * 100).toFixed(0);
  return (
    <div
      className={`${css.inputBody} ${isWinner && css.inputBodyWinner}`}
      style={{
        ...(disabled ? { paddingLeft: "30px" } : {}),
      }}
      onClick={disabled ? () => {} : onChoose}
    >
      <div
        style={{
          display: "flex",
          gap: "20px",
        }}
      >
        {!disabled && <div> {isChosen ? <Filled color="black" /> : <Outline color="black" />}</div>}
        <p>{candidateName}</p>
      </div>
      {votesCount !== undefined && (
        <p className={css.analytics}>
          {" "}
          {votesCount} - {percentage}%
        </p>
      )}
    </div>
  );
};

const Filled = ({ color }) => {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="17" cy="17" r="16" stroke={color} strokeWidth="2" />
      <circle cx="17" cy="17" r="12" fill={color} />
    </svg>
  );
};
const Outline = ({ color }) => {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="17" cy="17" r="16" stroke={color} strokeWidth="2" />
    </svg>
  );
};
