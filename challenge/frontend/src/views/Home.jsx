import React, { useEffect } from "react";
import { useMakeRequest } from "../context/useMakeRequest";

const Home = () => {
  const { makeRequest } = useMakeRequest();
  useEffect(() => {
    makeRequest("/api/complaints/allComplaints/");
  });
  return (
    <div>
      <h1>welcome</h1>
    </div>
  );
};
export default Home;
