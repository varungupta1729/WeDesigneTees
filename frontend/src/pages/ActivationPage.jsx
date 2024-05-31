import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../server";

const ActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
        await axios
          .post(`${server}/user/activation`, {
            activation_token,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err.message);
            setError(true);
          });
      };
      sendRequest();
    }
  }, []);

  return (
    <div className="min-h-screen w-screen flex justify-center items-center">
      {error ? "Token is Expired" : "Your Account is Successfully Created"}
    </div>
  );
};

export default ActivationPage;
