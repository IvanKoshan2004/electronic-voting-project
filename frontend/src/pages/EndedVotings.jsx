import css from "./AvailableAndEndedVotings.module.css";
import { useNavigate } from "react-router-dom";

export const EndedVotings = () => {
  const navigate = useNavigate();

  const votings = [
    {
      id: 1,
      endTime: 123456,
      creatorId: "john_doe_123",
      name: "Budget Vote",
      description: "New budget vote",
      isVoted: false,
    },
    {
      id: 2,
      endTime: 234567,
      creatorId: "alice_wonderland_456",
      name: "Building Code Vote",
      description: "Building code changes",
      isVoted: true,
    },
    {
      id: 3,
      endTime: 345678,
      creatorId: "bob_smith_789",
      name: "Kindergarten Vote",
      description: "New kindergarten location",
      isVoted: false,
    },
    {
      id: 4,
      endTime: 0,
      creatorId: "emma_jones_321",
      name: "Cameras Vote",
      description: "Additional surveillance cameras",
      winnerCandidate: "HinkVision",
      isVoted: true,
    },
    {
      id: 5,
      endTime: 567890,
      creatorId: "mike_anderson_654",
      name: "Square Vote",
      description: "Main square reconstruction",
      isVoted: true,
    },
    {
      id: 6,
      endTime: 0,
      creatorId: "laura_williams_987",
      name: "Pensions Vote",
      description: "Pensions increase",
      winnerCandidate: "Option B",
      isVoted: false,
    },
    {
      id: 7,
      endTime: 789012,
      creatorId: "chris_brown_159",
      name: "Waste Vote",
      description: "New waste sorting system",
      isVoted: false,
    },
    {
      id: 8,
      endTime: 890123,
      creatorId: "sophia_miller_753",
      name: "Bike Lanes Vote",
      description: "Additional bike lanes",
      isVoted: false,
    },
    {
      id: 9,
      endTime: 901234,
      creatorId: "david_taylor_246",
      name: "Transport Vote",
      description: "New public transportation system",
      isVoted: true,
    },
    {
      id: 10,
      endTime: 101234,
      creatorId: "olivia_jackson_852",
      name: "Benches Vote",
      description: "New park benches",
      isVoted: false,
    },
  ];
  return (
    <div className={css.mainBlock}>
      <h1>ended votings</h1>
      <div className={css.votingsList}>
        {votings
          .filter(voting => voting.endTime === 0)
          .map((voting, index) => {
            return (
              <div className={css.votingBlock} key={index} onClick={() => navigate(`${voting.id.toString()}`)}>
                <div className={css.votingDetails}>
                  <div className={css.headerContainer}>
                    <h3>{voting.name}</h3>
                    <p>{voting.creatorId}</p>
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
