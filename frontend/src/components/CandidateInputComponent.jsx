import css from "./CandidateInputComponent.module.css";

export const CandidateInputComponent = ({ candidateName, isChosen, onChoose }) => {
  return (
    <div className={css.inputBody} onClick={onChoose}>
      <div className={css.radioBtn}>{isChosen && <div className={css.selectedRadioBtn}></div>}</div>
      <p>{candidateName}</p>
    </div>
  );
};
