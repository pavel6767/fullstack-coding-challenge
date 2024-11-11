import { useContext, useEffect, useState } from "react";
import { ComplaintsContext } from "../context/Complaints";

const useHomeLogic = () => {
  const [loading, setLoading] = useState(true);
  const [isFilterByAccount, setIsFilterByAccount] = useState(true);

  const { fetchDataByAccount, fetchDataByDistrict } =
    useContext(ComplaintsContext);

  const toggleFilter = () => setIsFilterByAccount((prevState) => !prevState);
  const handleToggleClick = async () => {
    setLoading(true);
    if (isFilterByAccount) await fetchDataByDistrict();
    else await fetchDataByAccount();
    toggleFilter();
    setLoading(false);
  };

  const initialCall = async () => {
    await fetchDataByAccount();
    setLoading(false);
  };

  useEffect(() => {
    initialCall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    loading,
    isFilterByAccount,
    handleToggleClick,
  };
};

export default useHomeLogic;
