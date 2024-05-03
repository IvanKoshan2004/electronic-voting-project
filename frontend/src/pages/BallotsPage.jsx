import { useEffect, useState } from "react";
import { CustomLoader } from "../components/CustomLoader";
import { getMyElections } from "../api/elections";
import { useNavigate } from "react-router-dom";
import css from "./AvailableAndEndedVotings.module.css";

export const BallotsPage = () => {
  const navigate = useNavigate();
  const [votings, setVotings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    async function fetchActiveVotings() {
      try {
        setIsLoading(true);
        const { data } = await getMyElections();
        if (data?.elections) {
          setVotings(data?.elections);
          setElapsedSeconds(0);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    }
    fetchActiveVotings();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedSeconds(state => state + 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const getMyVotings = async () => {
    const votings = await getMyElections();
    setVotings(votings.data.elections);
    setIsLoading(false);
  };

  useEffect(() => {
    getMyVotings();
  }, []);

  const timeConvert = function (totalSeconds) {
    const daysOut = Math.floor(totalSeconds / 86400);
    const hoursOut = Math.floor((totalSeconds - daysOut * 86400) / 3600);
    const minutesOut = Math.floor((totalSeconds - daysOut * 86400 - hoursOut * 3600) / 60);
    const secondsOut = Math.floor(totalSeconds - daysOut * 86400 - hoursOut * 3600 - minutesOut * 60);
    if (daysOut == 0) {
      return `${hoursOut < 0 ? "" : hoursOut}h ${minutesOut < 0 ? "" : minutesOut}m ${secondsOut < 0 ? "" : secondsOut}s`;
    }
    return `${daysOut < 0 ? "" : daysOut}d ${hoursOut < 0 ? "" : hoursOut}h ${minutesOut < 0 ? "" : minutesOut}m`;
  };

  return (
    <div className={css.mainBlock}>
      <h1>my ballots</h1>
      {isLoading ? (
        <CustomLoader />
      ) : (
        <div className={css.votingsList}>
          {votings.map((voting, index) => {
            return (
              <div
                className={css.votingBlock}
                key={index}
                onClick={() => navigate(`/app/votings/${voting.id.toString()}`)}
              >
                <div className={css.votingTime}>
                  <h4>time left:</h4>
                  <p>{timeConvert(voting.timeTillEndInSeconds - elapsedSeconds)}</p>
                </div>
                <div className={css.votingDetails}>
                  <div className={css.headerContainer}>
                    <h3>{voting.name}</h3>
                    <p>{voting.creatorName}</p>
                  </div>
                  <h4>{voting.description}</h4>
                </div>
                {voting.isVoted && <div className={css.votedFlag}></div>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
