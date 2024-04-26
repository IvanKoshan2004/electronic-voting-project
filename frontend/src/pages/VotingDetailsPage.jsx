import { useParams } from "react-router-dom";

export const VotingDetailsPage = () => {
  const { id } = useParams();
  return <div>Voting details page</div>;
};
