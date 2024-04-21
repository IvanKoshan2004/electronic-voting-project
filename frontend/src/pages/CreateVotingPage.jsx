import css from "./CreateVotingPage.module.css";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";

export function CreateVotingPage() {
  const [fields, setFields] = useState([
    { id: 1, value: "" },
    { id: 2, value: "" },
  ]);
  const [convertedTime, setConvertedTime] = useState("");
  const [clearCandidates, setClearCandidates] = useState([]);
  const idCounterRef = useRef(3);
  const {
    handleSubmit,
    register,
    formState: { isValid, errors },
  } = useForm({
    mode: "onBlur",
  });
  console.log(fields);
  const onSubmit = function (data) {
    const splitedTime = data.time.split(":").map(Number);
    setConvertedTime(splitedTime[0] * 86400 + splitedTime[1] * 3600 + splitedTime[2] * 60 + splitedTime[3]);
    setClearCandidates(data.candidates.filter(candidate => candidate));
  };
  const handleChange = function (id, value) {
    const newFields = [...fields];
    const index = newFields.findIndex(field => field.id === id);
    newFields[index].value = value;
    if (index === fields.length - 1 && index < 9 && value !== "") {
      newFields.push({ id: idCounterRef.current, value: "" });
      idCounterRef.current++;
    }
    if (value === "" && newFields.length > 2) {
      newFields.splice(index, 1);
    }
    setFields(newFields);
  };
  return (
    <form className={css.formBlock} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={css.creatingHeader}>create voting</h1>
      <div className={css.inputBlock}>
        <p className={css.inputDescription}>name:</p>
        <input
          placeholder="enter name here..."
          type="text"
          {...register("name", {
            required: true,
            minLength: { value: 3, message: "Minimum 3 characters" },
          })}
        />
        <p className={css.errorMessage}>{errors.name?.message}</p>
      </div>
      <div className={css.inputBlock}>
        <p className={css.inputDescription}>description:</p>
        <input placeholder="enter description here..." type="text" />
      </div>
      <div className={css.inputBlock}>
        <p className={css.inputDescription}>voting end time:</p>
        <input
          placeholder="dd:hh:mm:ss"
          type="text"
          {...register("time", {
            required: true,
            pattern: {
              value: /^(\d\d):([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,
              message: "Please, follow this format: dd:hh:mm:ss",
            },
          })}
        />
        <div className={css.errorMessage}>{errors.time?.message}</div>
      </div>
      <div className={css.candidateBlock}>
        <div className={css.candidateNumberBlock}>
          <p className={css.inputDescription}>number of candidates (2-10):</p>
          <div className={css.candidateCount}>{fields.length}</div>
        </div>
        {fields.map((field, index) => (
          <div key={field.id}>
            <input
              type="text"
              {...register(`candidates.${index}`, {
                required: fields.length < 3 ? true : false,
              })}
              value={field.value}
              onChange={e => handleChange(field.id, e.target.value)}
              placeholder="enter your candidate here..."
            />
          </div>
        ))}
      </div>
      <button type="submit" className={css.createBtn} disabled={!isValid}>
        Create
      </button>
    </form>
  );
}
