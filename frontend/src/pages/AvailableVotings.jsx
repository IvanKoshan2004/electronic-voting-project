import { useEffect, useState } from "react";
import css from "./AvailableAndEndedVotings.module.css";
import { useNavigate } from "react-router-dom";
import { getActiveElections } from "../api/elections";

export const AvailableVotings = () => {
  const navigate = useNavigate();
  const [votings, setVotings] = useState([]);

  useEffect(() => {
    async function fetchActiveVotings() {
      const { data } = await getActiveElections();
      if (data?.elections) {
        setVotings(data?.elections);
      }
    }
    fetchActiveVotings();
  }, []);

  const timeConvert = function (totalseconds) {
    const daysout = Math.floor(totalseconds / 86400);
    const hoursout = Math.floor((totalseconds - daysout * 86400) / 3600);
    const minutesout = Math.floor((totalseconds - daysout * 86400 - hoursout * 3600) / 60);
    return `${daysout < 0 ? "" : daysout}d ${hoursout < 0 ? "" : hoursout}h ${minutesout < 0 ? "" : minutesout}m`;
  };

  return (
    <div className={css.mainBlock}>
      <h1>available votings</h1>
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
                <p>{timeConvert(voting.timeTillEndInSeconds)}</p>
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
    </div>
  );
};
