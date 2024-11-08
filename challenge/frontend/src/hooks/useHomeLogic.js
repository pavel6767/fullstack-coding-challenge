import { useContext, useEffect, useState } from "react";
import makeRequest from "../utils/makeRequest";
import { BE_ROUTES } from "../utils";
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          openCasesResponse,
          closedCasesResponse,
          topComplaintTypeResponse,
          complaintsResponse,
        ] = await Promise.all([
          makeRequest(BE_ROUTES.open),
          makeRequest(BE_ROUTES.closed),
          makeRequest(BE_ROUTES.top),
          makeRequest(BE_ROUTES.all),
        ]);

        setOpenCases(openCasesResponse.length);
        setClosedCases(closedCasesResponse.length);
        setTopComplaintType(
          topComplaintTypeResponse[0]?.complaint_type || "N/A"
        );
        setComplaints(complaintsResponse);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      }
      setLoading(false);
    };

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
