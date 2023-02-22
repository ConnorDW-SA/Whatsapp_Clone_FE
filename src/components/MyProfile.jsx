import React from "react";
import { ReactComponent as ArrowBack } from "./icons/arrowback.svg";
import { ReactComponent as Profile } from "./icons/profile.svg";
import { ReactComponent as Edit } from "./icons/edit.svg";
import { useDispatch, useSelector } from "react-redux";
import { SET_MY_PROFILE } from "../redux/actions";
import { Image } from "react-bootstrap";

function MyProfile() {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.home.userInfo);
  const myProfile = useSelector((state) => state.home.myProfile);
  console.log(currentUser.avatar);
  return (
    <div>
      <div className="my-profile-header">
        <div className="my-profile-header-items">
          <div className="pointer">
            <ArrowBack
              onClick={() => {
                dispatch({ type: SET_MY_PROFILE, payload: !myProfile });
              }}
            />
          </div>
          <div className="my-profile-text ml-4">Profile</div>
        </div>
      </div>{" "}
      <div className="my-profile-picture">
        {currentUser.avatar === "" ? (
          <Profile className="mp-pic" />
        ) : (
          <Image src={currentUser.avatar} />
        )}
      </div>
      <div className="your-name d-flex flex-column justify-content-between">
        <div className="wtsp-d-green">Your name</div>
        <div className="d-flex justify-content-between">
          <div>{currentUser.username}</div>
          <div className="pointer">
            <Edit />
          </div>
        </div>
      </div>
      <div className="my-profile-info-text">
        This is not your username or pin. This name will be <br /> visible to
        your WhatsApp contacts.
      </div>
      <div className="your-name d-flex flex-column justify-content-between">
        <div className="wtsp-d-green">About</div>
        <div className="d-flex justify-content-between">
          <div>{currentUser.about}</div>
          <div className="pointer">
            <Edit />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
