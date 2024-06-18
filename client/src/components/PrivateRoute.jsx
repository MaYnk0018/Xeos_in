import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  function Handleit(){
    useEffect(() => {
        navigate("/sign-in");
      }, [])
  }
  const navigate = useNavigate();
  return (
    <div>
      {currentUser ? (
        <Outlet />
      ) : (
        Handleit()
      )}
    </div>
  );
}
