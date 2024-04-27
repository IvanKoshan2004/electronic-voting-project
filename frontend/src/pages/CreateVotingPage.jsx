import css from "./CreateVotingPage.module.css";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { createElection } from "../api/elections";
import { useNavigate } from "react-router-dom";

export function CreateVotingPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [fields, setFields] = useState([
    { id: 1, value: "" },
    { id: 2, value: "" },
  ]);
  const idCounterRef = useRef(3);
  const {
    handleSubmit,
    register,
    formState: { isValid, errors },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = async function (data) {
    setIsLoading(true);
    const splitTime = data.time.split(":").map(Number);
    const votingTimeInSeconds = splitTime[0] * 86400 + splitTime[1] * 3600 + splitTime[2] * 60 + splitTime[3];
    const candidateNames = data.candidates.filter(candidate => !!candidate);
    const formatedData = { name: data.name, description: data.description, votingTimeInSeconds, candidateNames };
    const { data: responseData } = await createElection(formatedData);
    if (responseData.success) {
      navigate("/app/available-votings");
    }
    setIsLoading(false);
  };
  const handleChange = function (id, value) {
    const newFields = [...fields];
    const index = newFields.findIndex(el => el.id === id);
    newFields[index].value = value;

    const emptyIndex = newFields.findIndex(el => el.value === "");
    if (emptyIndex !== -1 && newFields.length > 2) newFields.splice(emptyIndex, 1);

    const nonEmptyCount = newFields.filter(el => el.value).length;
    if (nonEmptyCount === newFields.length && newFields.length < 10) {
      newFields.push({ id: idCounterRef.current++, value: "" });
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
        <input
          placeholder="enter description here..."
          type="text"
          {...register("description", {
            required: false,
          })}
        />
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
        {fields.map((field, index) => {
          return (
            <div key={index}>
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
          );
        })}
      </div>
      <button type="submit" className={css.createBtn} disabled={!isValid || isLoading}>
        Create
      </button>
    </form>
  );
}
