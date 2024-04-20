import css from "./CreateVotingPage.module.css";

export default function CreateVotingPage() {
  return (
    <div className={css.mainBlock}>
      <form className={css.formBlock}>
        <h1 className={css.creatingHeader}>create voting</h1>
        <div className={css.inputBlock}>
          <p className={css.inputDescription}>name:</p>
          <input placeholder="enter name here..." type="text" />
        </div>
        <div className={css.inputBlock}>
          <p className={css.inputDescription}>description:</p>
          <input placeholder="enter description here..." type="text" />
        </div>
        <div className={css.inputBlock}>
          <p className={css.inputDescription}>voting end time:</p>
          <input placeholder="dd:hh:mm:ss" type="text" />
        </div>
        <div className={css.candidateBlock}>
          <div className={css.candidateNumberBlock}>
            <p className={css.inputDescription}>enter number of candidates (2-10):</p>
            <div className={css.candidateCount}>2</div>
          </div>
          <input placeholder="enter your candidate here..." type="text" />
          <input placeholder="enter your candidate here..." type="text" />
        </div>
        <button type="submit" className={css.createBtn}>
          Create
        </button>
      </form>
    </div>
  );
}
