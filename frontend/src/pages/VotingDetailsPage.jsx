import { useParams } from "react-router-dom";
import css from "./VotingDetailsPage.module.css";
import { CandidateInputComponent } from "../components/CandidateInputComponent";
import { useState } from "react";
import { useEffect } from "react";
import dateFormat from "dateformat";
import { getElectionById, voteForCandidate } from "../api/elections";
import { CustomLoader } from "../components/CustomLoader";

export const VotingDetailsPage = () => {
  const { id } = useParams();
  const [dataFetchTimestamp, setDataFetchTimestamp] = useState(0);
  const [votingData, setVotingData] = useState();
  const [selectedId, setSelectedId] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [timeRanOut, setTimeRanOut] = useState(false);
  const fetchVoting = async () => {
    try {
      setIsLoading(true);
      const { data } = await getElectionById(id);
      if (data) {
        setVotingData(data.election);
        setDataFetchTimestamp(Date.now());
        setElapsedSeconds(0);
        setSelectedId(data.election.id);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVoting();
  }, [id]);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedSeconds(state => state + 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const timeConvert = function (totalSeconds) {
    const totalSecondsMinusElapsed = totalSeconds - elapsedSeconds;
    const daysOut = Math.floor(totalSecondsMinusElapsed / 86400);
    const hoursOut = Math.floor((totalSecondsMinusElapsed - daysOut * 86400) / 3600);
    const minutesOut = Math.floor((totalSecondsMinusElapsed - daysOut * 86400 - hoursOut * 3600) / 60);
    const secondsOut = Math.floor(totalSecondsMinusElapsed - daysOut * 86400 - hoursOut * 3600 - minutesOut * 60);
    let timeLeft;
    if (daysOut == 0) {
      timeLeft =
        daysOut === 0
          ? `${hoursOut < 0 ? "" : hoursOut}h ${minutesOut < 0 ? "" : minutesOut}m ${secondsOut < 0 ? "" : secondsOut}s`
          : `${daysOut < 0 ? "" : daysOut}d ${hoursOut < 0 ? "" : hoursOut}h ${minutesOut < 0 ? "" : minutesOut}m`;
    }

    return {
      timeLeft,
      endDate: dateFormat(dataFetchTimestamp + totalSeconds * 1000, "dd.mm.yyyy"),
      endExactTime: dateFormat(dataFetchTimestamp + totalSeconds * 1000, "HH:MM:ss"),
    };
  };
  function onChoose(id) {
    setSelectedId(id);
  }

  const submitVote = async function () {
    if (selectedId === -1) return;
    try {
      const { data } = await voteForCandidate(id, selectedId);
      if (data) {
        fetchVoting();
      }
    } catch (e) {
      console.log(e);
    }
  };
  const timeLeft = votingData?.endTime - votingData?.currentTime;
  const totalVotes =
    votingData?.candidates[0].votesCount !== undefined
      ? votingData.candidates.reduce((acc, el) => acc + el.votesCount, 0)
      : 0;
  const winnerCandidate = votingData?.candidates.find(el => el.id === votingData?.winnerCandidate);

  useEffect(() => {
    if (timeLeft - elapsedSeconds === 0 && !timeRanOut) {
      fetchVoting();
      setTimeRanOut(true);
    }
  }, [elapsedSeconds, timeLeft, timeRanOut]);

  return (
    <div className={css.mainBlock}>
      {isLoading ? (
        <CustomLoader />
      ) : (
        <>
          {votingData && (
            <>
              <div className={css.headerBlock}>
                <h1>{votingData?.name}</h1>
                <p>
                  author - {votingData?.creatorName} {votingData.isOwner && <span>(you)</span>}
                </p>
              </div>
              <div className={css.descriptionBlock}>{votingData?.description}</div>
              <div className={css.formBlock}>
                <form className={css.candidatesBlock}>
                  {votingData?.candidates.map(candidate => {
                    return (
                      <CandidateInputComponent
                        key={candidate.id}
                        candidateName={candidate.name}
                        isChosen={candidate.id === selectedId ? true : false}
                        onChoose={() => {
                          onChoose(candidate.id);
                        }}
                        disabled={votingData.hasVoted || votingData.ended || votingData.isOwner}
                        isWinner={votingData.ended ? votingData.winnerCandidate === candidate.id : false}
                        votesCount={candidate.votesCount}
                        totalVotesCount={totalVotes}
                        candidateCount={votingData.candidates.length}
                      />
                    );
                  })}
                </form>
                <div className={css.timeBlock}>
                  {!votingData.ended ? (
                    <>
                      <span style={{ textDecoration: "underline" }}>{timeConvert(timeLeft).timeLeft}</span>
                      <span> left</span>
                    </>
                  ) : (
                    <span>ENDED!</span>
                  )}
                  <div className={css.endDateBlock}>
                    <p>end date:</p>
                    <p>{timeConvert(timeLeft).endDate}</p>
                    <p>{timeConvert(timeLeft).endExactTime}</p>
                  </div>
                </div>
              </div>
              {votingData.ended || votingData.isOwner ? (
                <div className={css.contextBlock}>
                  <p>TOTAL VOTES - {totalVotes}</p>
                  {votingData.ended && (
                    <p>
                      FOR {winnerCandidate.name} - {winnerCandidate.votesCount} (
                      {totalVotes === 0
                        ? Math.floor(100 / votingData.candidates.length)
                        : ((winnerCandidate.votesCount / totalVotes) * 100).toFixed(0)}
                      %)
                    </p>
                  )}
                </div>
              ) : votingData.hasVoted ? (
                <button className={`${css.submitBtn} ${css.submitBtnForbidden} `} onClick={submitVote} disabled={true}>
                  You have already voted
                </button>
              ) : (
                <button className={css.submitBtn} onClick={submitVote} disabled={selectedId === -1}>
                  Vote
                </button>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};
