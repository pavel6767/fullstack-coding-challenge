import React, { useEffect } from "react";
import makeRequest from "../utils/makeRequest";

const Home = ({compo}) => {
  useEffect(() => {
    makeRequest("/api/complaints/allComplaints/");
  }, []);
  return (
    <div>
      <h1>welcome</h1>
    </div>
  );
};
export default Home;
