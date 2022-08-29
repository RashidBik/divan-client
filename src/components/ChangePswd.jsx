import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../api/account";

function ChangePswd() {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const changeApassword = () => {
    changePassword(oldPassword, newPassword).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        alert("your password changed");
        navigate("/profile");
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-900 text-gray-400  gap-2">
      <h2>Change Password</h2>
      <div className="flex flex-col space-y-4 w-80 items-center">
        <input
          className="w-full p-2 rounded-xl bg-gray-300 "
          type="text"
          placeholder="old password"
          onChange={(event) => {
            setOldPassword(event.target.value);
          }}
        />
        <input
          className="w-full p-2 rounded-xl bg-gray-300 "
          type="text"
          placeholder="new password"
          onChange={(event) => {
            setNewPassword(event.target.value);
          }}
        />
        <button
          className="self-end bg-red-900 rounded-md px-4 "
          onClick={changeApassword}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default ChangePswd;
