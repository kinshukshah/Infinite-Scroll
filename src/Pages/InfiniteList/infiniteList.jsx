import React, { useCallback, useRef, useState } from "react";
import { CustomButton } from "../../Components/CustomBtn/customBtn.component";
import { useAuth } from "../../Contexts/authContext";
import { useGetUsers } from "../../CustomHooks/useGetUsers";
import { useNavigate } from "react-router-dom";
import "./infiniteList.style.css";
export const InfiniteList = () => {
  const [pageNumber, setPageNumber] = useState(10);
  const { loading, error, users } = useGetUsers(pageNumber);
  const { dispatch } = useAuth();
  let navigate = useNavigate();
  const observer = useRef();
  const lastBookElement = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        console.log(entries);
        if (entries[0].isIntersecting) {
          setPageNumber((prevPageNumber) => prevPageNumber + 10);
          console.log("visible");
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  const handleLogout = () => {
    dispatch({ user: null });
    navigate("/login");
  };
  return (
    <div className="infinite-list">
      <CustomButton
        label="Logout"
        style={{ width: "150px" }}
        onClick={handleLogout}
      />

      {users.map((user, idx) => {
        if (users.length === idx + 1) {
          return (
            <div ref={lastBookElement} className="user-component" key={idx}>
              <div className="user-img">
                <img src={user.imgUrl} alt="UserImage"></img>
              </div>
              <div className="user-name">{user.name}</div>
            </div>
          );
        } else {
          return (
            <div className="user-component" key={idx}>
              <div className="user-img">
                <img src={user.imgUrl} alt="UserImage"></img>
              </div>
              <div className="user-name">{user.name}</div>
            </div>
          );
        }
      })}
      <div className="loading">{loading && "Loading..."}</div>
      <div>{error && "Error..."}</div>
    </div>
  );
};
