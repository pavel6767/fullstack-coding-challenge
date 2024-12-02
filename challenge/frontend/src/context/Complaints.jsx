import React, { createContext, useEffect, useState } from "react";
import { BE_ROUTES, STATUS, TOAST_STATUS } from "../utils";
import useNetworkRequest from "../hooks/useNetworkRequest";

export const ComplaintsContext = createContext({});

export const ComplaintsProvider = ({ children }) => {
  const { makeRequest, showToast } = useNetworkRequest();

  const [allComplaints, setAllComplaints] = useState({
    data: [],
    error: false,
  });
  const [openCases, setOpenCases] = useState({ data: 0, error: false });
  const [closedCases, setClosedCases] = useState({ data: 0, error: false });
  const [topComplaintType, setTopComplaintType] = useState({
    data: "",
    error: false,
  });

  const setAllErrors = (error) => {
    setAllComplaints({ data: [], error });
    setOpenCases({
      data: 0,
      error,
    });
    setClosedCases({
      data: 0,
      error,
    });
    setTopComplaintType({ data: "", error });
  };

  const fetchDataByAccount = async () => {
    try {
      const [
        complaintsResponse,
        openCasesResponse,
        closedCasesResponse,
        topComplaintTypeResponse,
      ] = await Promise.all([
        makeRequest(BE_ROUTES.COMPLAINTS.ALL),
        makeRequest(BE_ROUTES.COMPLAINTS.OPEN),
        makeRequest(BE_ROUTES.COMPLAINTS.CLOSED),
        makeRequest(BE_ROUTES.COMPLAINTS.TOP),
      ]);

      if (complaintsResponse.status === STATUS.FAIL)
        setAllComplaints({ data: [], error: true });
      else setAllComplaints({ data: complaintsResponse, error: false });
      if (openCasesResponse.status === STATUS.FAIL)
        setOpenCases({ data: 0, error: true });
      else setOpenCases({ data: openCasesResponse.length, error: false });
      if (closedCasesResponse.status === STATUS.FAIL)
        setClosedCases({ data: 0, error: true });
      else setClosedCases({ data: closedCasesResponse.length, error: false });
      if (topComplaintTypeResponse.status === STATUS.FAIL)
        setTopComplaintType({ data: "", error: true });
      else
        setTopComplaintType({
          data: topComplaintTypeResponse[0]?.complaint_type || "N/A",
          error: false,
        });
    } catch (error) {
      console.error("Error fetching dashboard data", error);
      showToast({
        title: "Error",
        status: TOAST_STATUS.ERROR,
        description: `error with this request, please try again`,
      });
      setAllErrors(true);
    }
  };

  const fetchDataByDistrict = async () => {
    try {
      const response = await makeRequest(
        BE_ROUTES.COMPLAINTS.CONSTITUENT_COMPLAINTS
      );
      if (response.status === STATUS.FAIL)
        throw new Error("error calling constituents complaints");

      const countedComplaints = response.reduce((all, { complaint_type }) => {
        if (!all[complaint_type]) all[complaint_type] = 0;
        all[complaint_type]++;
        return all;
      }, {});
      const topComplaintType = Object.keys(countedComplaints).reduce(
        (max, current) => {
          if (countedComplaints[current] > (countedComplaints[max] || 0))
            return current;
          return max;
        },
        ""
      );

      setAllComplaints({ data: response, error: false });
      setOpenCases({
        data: response.filter((complaint) => !complaint.closedate).length,
        error: false,
      });
      setClosedCases({
        data: response.filter((complaint) => !!complaint.closedate).length,
        error: false,
      });
      setTopComplaintType({ data: topComplaintType, error: false });
    } catch (error) {
      console.error("Error fetching dashboard data", error);
      showToast({
        title: "Error",
        status: TOAST_STATUS.ERROR,
        description: `error with this request, please try again`,
      });
      setAllErrors(true);
    }
  };

  useEffect(() => setAllErrors(false), []);

  return (
    <ComplaintsContext.Provider
      value={{
        complaints: { allComplaints, topComplaintType, openCases, closedCases },
        fetchDataByDistrict,
        fetchDataByAccount,
      }}
    >
      {children}
    </ComplaintsContext.Provider>
  );
};
