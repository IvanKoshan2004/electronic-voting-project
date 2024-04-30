import { useParams } from "react-router-dom";
import css from "./VotingDetailsPage.module.css";
import { CandidateInputComponent } from "../components/CandidateInputComponent";
import { useState } from "react";
import { useEffect } from "react";
import dateFormat from "dateformat";
import { getElectionById } from "../api/elections";

export const VotingDetailsPage = () => {
  const currentTimeMilisec = new Date().getTime();
  const { id } = useParams();
  const [votingData, setVotingData] = useState();
  const [selectedId, setSelectedId] = useState("");
  useEffect(() => {
    const fetchVoting = async () => {
      try {
        const { data, error } = await getElectionById(id + "sd");
        console.log(data, error);
        if (data) {
          setVotingData(data);
        }
      } catch (e) {}
    };
    fetchVoting();
  }, [id]);

  console.log(votingData);

  const timeConvert = function (totalseconds) {
    const daysout = Math.floor(totalseconds / 86400);
    const hoursout = Math.floor((totalseconds - daysout * 86400) / 3600);
    const minutesout = Math.floor((totalseconds - daysout * 86400 - hoursout * 3600) / 60);
    return {
      timeleft: `${daysout}d ${hoursout}h ${minutesout}m`,
      endDate: dateFormat(currentTimeMilisec + totalseconds * 1000, "dd.mm.yyyy"),
      endExactTime: dateFormat(currentTimeMilisec + totalseconds * 1000, "HH:MM:ss"),
    };
  };

  function onChoose(id) {
    setSelectedId(id);
  }

  const submitVote = async function () {
    try {
    } catch (error) {}
  };

  return (
    <div className={css.mainBlock}>
      <div className={css.headerBlock}>
        <h1>{votingData?.name}</h1>
        <p>author-{votingData?.creatorId}</p>
      </div>
      <div className={css.descriptionBlock}>{votingData?.description}</div>
      <div className={css.formBlock}>
        <form className={css.candidatesBlock}>
          {votingData?.candidates.map(candidate => {
            return (
              <CandidateInputComponent
                key={candidate.id}
                candidateName={candidate.ballotName}
                isChosen={candidate.id === selectedId ? true : false}
                onChoose={() => {
                  onChoose(candidate.id);
                }}
              />
            );
          })}
        </form>
        <div className={css.timeBlock}>
          <span style={{ textDecoration: "underline" }}>{timeConvert(votingData?.endTime).timeleft}</span>
          <span> left</span>
          <div className={css.endDateBlock}>
            <p>end date:</p>
            <p>{timeConvert(votingData?.endTime).endDate}</p>
            <p>{timeConvert(votingData?.endTime).endExactTime}</p>
          </div>
        </div>
      </div>
      <button className={css.submitBtn} onClick={submitVote}>
        vote
      </button>
    </div>
  );
};
