import { useContext, useEffect, useState } from "react";
import useMakeRequest from "./useMakeRequest";
import { BE_ROUTES, STATUS } from "../utils";
import { UserContext } from "../context/User";

const useHomeLogic = () => {
  const [loading, setLoading] = useState(true);
  const [isFilterByAccount, setIsFilterByAccount] = useState(true);
  const [complaints, setComplaints] = useState({
    allComplaints: [],
    topComplaintType: "",
    openCases: 0,
    closedCases: 0,
  });

  const {
    user: { district },
  } = useContext(UserContext);
  const { makeRequest } = useMakeRequest();

  const toggleFilter = () => setIsFilterByAccount((prevState) => !prevState);
  const handleToggleClick = async () => {
    if (isFilterByAccount) await fetchDataByDistrict();
    else await fetchDataByAccount();
    toggleFilter();
  };

  const fetchDataByAccount = async () => {
    setLoading(true);
    try {
      const [
        openCasesResponse,
        closedCasesResponse,
        topComplaintTypeResponse,
        complaintsResponse,
      ] = await Promise.all([
        makeRequest(BE_ROUTES.COMPLAINTS.OPEN),
        makeRequest(BE_ROUTES.COMPLAINTS.CLOSED),
        makeRequest(BE_ROUTES.COMPLAINTS.TOP),
        makeRequest(BE_ROUTES.COMPLAINTS.ALL),
      ]);

      setComplaints({
        allComplaints: complaintsResponse,
        topComplaintType: topComplaintTypeResponse[0]?.complaint_type || "N/A",
        openCases: openCasesResponse.length,
        closedCases: closedCasesResponse.length,
      });
    } catch (error) {
      console.error("Error fetching dashboard data", error);
    }
    setLoading(false);
  };

  const fetchDataByDistrict = async () => {
    setLoading(true);
    try {
      const response = await makeRequest(
        BE_ROUTES.COMPLAINTS.CONSTITUENT_COMPLAINTS
      );
      if (response.status === STATUS.FAIL)
        throw new Error("error calling constituents complaints");

      setComplaints(() => {
        const countedComplaints = response.reduce((all, { complaint_type }) => {
          if (!all[complaint_type]) all[complaint_type] = 0;
          all[complaint_type]++;
          return all;
        }, {});
        const topComplaintType = Object.keys(countedComplaints).reduce(
          (max, current) => {
            if (countedComplaints[current] > countedComplaints[max])
              return current;
            return max;
          },
          ""
        );

        return {
          allComplaints: response,
          topComplaintType,
          openCases: response.filter((complaint) => !complaint.closedate)
            .length,
          closedCases: response.filter((complaint) => !!complaint.closedate)
            .length,
        };
      });
    } catch (error) {
      console.error("Error fetching dashboard data", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDataByAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    loading,
    complaints,
    district,
    isFilterByAccount,
    handleToggleClick,
  };
};

export default useHomeLogic;
