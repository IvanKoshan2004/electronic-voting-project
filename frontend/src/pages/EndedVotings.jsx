import { useEffect, useState } from "react";
import css from "./AvailableAndEndedVotings.module.css";
import { useNavigate } from "react-router-dom";
import { getInactiveElections } from "../api/elections";

export const EndedVotings = () => {
  const navigate = useNavigate();
  const [votings, setVotings] = useState([]);

  useEffect(() => {
    async function fetchInactiveVotings() {
      const inactiveVotings = await getInactiveElections();
      if (inactiveVotings) {
        setVotings(inactiveVotings);
      }
    }
    fetchInactiveVotings();
  }, []);

  return (
    <div className={css.mainBlock}>
      <h1>ended votings</h1>
      <div className={css.votingsList}>
        {votings.map((voting, index) => {
          return (
            <div
              className={css.votingBlock}
              key={index}
              onClick={() => navigate(`/app/votings/${voting.id.toString()}`)}
            >
              <div className={css.votingDetails}>
                <div className={css.headerContainer}>
                  <h3>{voting.name}</h3>
                  <p>{voting.creatorName}</p>
                </div>
                <h4>{voting.winnerCandidate}</h4>
              </div>
              {voting.isVoted && <div className={css.votedFlag}></div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};
