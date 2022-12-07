import React from "react";
import useScrollToTop from "../../../../hooks/useScrollToTop";
import useTitle from "../../../../hooks/useTitle";

const UpdateProfile = () => {
  useScrollToTop();
  useTitle("Update Profile");
  return (
    <div>
      <h2>Update Profile</h2>
    </div>
  );
};

export default UpdateProfile;
