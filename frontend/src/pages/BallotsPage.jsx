import { useState } from "react";
import { CustomLoader } from "../components/CustomLoader";

export const BallotsPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  return isLoading ? <CustomLoader /> : <div>Ballot page</div>;
};
