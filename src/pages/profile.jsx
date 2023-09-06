import React, { useEffect } from "react";
import shishiroimg from "../assets/shishiroaka.jpg";
import defaultimg from "../assets/defaultUser.jpeg"
import "../css/profile.css";
import WebFont from "webfontloader";
import axios from "axios";
import { useState } from "react";

WebFont.load({
  google: {
    families: ["Montserrat&display=swap"],
  },
});

function Profile() {
  const [profileData, setProfileData] = useState('')

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const id = sessionStorage.getItem("id");
        const token = sessionStorage.getItem("accessToken")
        const response = await axios.get(`http://localhost:3001/user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfileData(response.data.message);
      } catch (err) {
        console.log("Error while fetching data:", err);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div className="profileContainer">
      <div
        style={{
          width: "814px",
          height: "414px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "10px",
          padding: "10px 15px",
          fontFamily: "Montserrat,sans-serif",
          background: "transparent",
          boxShadow: "2px 5px 10px rgba(0,0,0,0.5)",
          borderRadius: "10px",
        }}
      >
        <div
          className="displayProfile"
          style={{
            width: "500px",
            borderRadius: "14px",
            margin: "15px",
            padding: "10px 15px",
          }}
        >
          <img src={profileData.name === "shishiro" || "SHISHIRO" || "Shishiro" ? shishiroimg : defaultimg} alt="shishiro" className="profileImage" />
        </div>
        <div
          style={{
            textTransform: "uppercase",
            padding: "15px",
            margin: "5px",
            zIndex: "999",
          }}
        >
          <h1>Welcome,{profileData.name}</h1>
          <ul
            style={{
              listStyle: "none",
              fontSize: "20px",
              textTransform: "capitalize",
              padding: "15px",
              margin: "5px",
            }}
          >
            <li>
              <div
                style={{
                  marginBottom: "5px",
                }}
              >
                Name:
                <span
                  style={{
                    marginLeft: "5px",
                  }}
                >
                  {profileData.name}
                </span>
              </div>
            </li>
            <li>
              <div
                style={{
                  marginBottom: "5px",
                }}
              >
                Email:
                <span
                  style={{
                    marginLeft: "5px",
                  }}
                >
                  {profileData.email}
                </span>
              </div>
            </li>
            <li>
              <div
                style={{
                  marginBottom: "5px",
                }}
              >
                Contact:
                <span
                  style={{
                    marginLeft: "5px",
                  }}
                >
                  +91 {profileData.number}
                </span>
              </div>
            </li>
            <li>
              <div
                style={{
                  marginBottom: "5px",
                }}
              >
                DOB:
                <span style={{ marginLeft: "5px" }}>
                  {new Date(profileData.DOB).toLocaleDateString()}
                </span>

              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Profile;
