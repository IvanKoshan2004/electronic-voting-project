import { useParams } from "react-router-dom";
import css from "./VotingDetailsPage.module.css";
import { CandidateInputComponent } from "../components/CandidateInputComponent";
import { useState } from "react";
import { useEffect } from "react";
import dateFormat from "dateformat";

export const VotingDetailsPage = () => {
  const currentTimeMilisec = new Date().getTime();
  const { id } = useParams();
  const [voteData, setVoteData] = useState();
  const [selectedId, setSelectedId] = useState("");
  useEffect(() => {
    try {
      setVoteData({
        id: 1,
        endTime: 123456,
        creatorId: "john_doe_123",
        name: "Budget Vote",
        description:
          "New budget vote. Please vote because we need money lol. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        candidates: [
          {
            id: 1,
            ballotName: "50 billion",
          },
          {
            id: 2,
            ballotName: "0 billion",
          },
          {
            id: 3,
            ballotName: "4+2i billion",
          },
        ],
      });
    } catch (error) {}
  }, []);

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
        <h1>{voteData?.name}</h1>
        <p>author-{voteData?.creatorId}</p>
      </div>
      <div className={css.descriptionBlock}>{voteData?.description}</div>
      <div className={css.formBlock}>
        <form className={css.candidatesBlock}>
          {voteData?.candidates.map(candidate => {
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
          <span style={{ textDecoration: "underline" }}>{timeConvert(voteData?.endTime).timeleft}</span>
          <span> left</span>
          <div className={css.endDateBlock}>
            <p>end date:</p>
            <p>{timeConvert(voteData?.endTime).endDate}</p>
            <p>{timeConvert(voteData?.endTime).endExactTime}</p>
          </div>
        </div>
      </div>
      <button className={css.submitBtn} onClick={submitVote}>
        vote
      </button>
    </div>
  );
};
