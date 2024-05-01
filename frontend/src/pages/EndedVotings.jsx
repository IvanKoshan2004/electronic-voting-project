import { useEffect, useState } from "react";
import css from "./AvailableAndEndedVotings.module.css";
import { useNavigate } from "react-router-dom";
import { getInactiveElections } from "../api/elections";
import { CustomLoader } from "../components/CustomLoader";

export const EndedVotings = () => {
  const navigate = useNavigate();
  const [votings, setVotings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchInactiveVotings() {
      setIsLoading(true);
      const { data } = await getInactiveElections();
      if (data?.elections) {
        setVotings(data?.elections);
      }
      setIsLoading(false);
    }
    fetchInactiveVotings();
  }, []);

  return (
    <div className={css.mainBlock}>
      <h1>ended votings</h1>
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
      )}
    </div>
  );
};
