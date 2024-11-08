import { useContext, useEffect, useState } from "react";
import useMakeRequest from "./useMakeRequest";
import { BE_ROUTES, STATUS } from "../utils";
import { UserContext } from "../context/User";

const useHomeLogic = () => {
  const [loading, setLoading] = useState(true);
  const [openCases, setOpenCases] = useState(0);
  const [closedCases, setClosedCases] = useState(0);
  const [topComplaintType, setTopComplaintType] = useState("");
  const [complaints, setComplaints] = useState([]);

  const {
    user: { district },
  } = useContext(UserContext);
  const { makeRequest } = useMakeRequest();

  const fetchData = async () => {
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

      // :P:: TODO: consider refactor, the below gets an object or array
      const checkForError = (resObj) =>
        resObj?.status === STATUS.FAIL ? "Error" : resObj;
      setOpenCases(openCasesResponse.length);
      setClosedCases(closedCasesResponse.length);
      setTopComplaintType(topComplaintTypeResponse[0]?.complaint_type || "N/A");
      setComplaints(complaintsResponse);
    } catch (error) {
      // :P:: TODO: toast here?
      console.error("Error fetching dashboard data", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    loading,
    openCases,
    closedCases,
    topComplaintType,
    complaints,
    district,
  };
};

export default useHomeLogic;
