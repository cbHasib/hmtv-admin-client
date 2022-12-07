import React from "react";
import useScrollToTop from "../../../../hooks/useScrollToTop";
import useTitle from "../../../../hooks/useTitle";

const Profile = () => {
  useScrollToTop();
  useTitle("Profile");
  return (
    <div>
      <h2>Profile</h2>
    </div>
  );
};

export default Profile;
