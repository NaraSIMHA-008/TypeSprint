import React from "react";
import "../css/Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faDiscord,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div className="footerContainer">
        <h4>TypeSprint</h4>
        <div className="inbox" style={{ height: "100px" }}>
          <p>Stay updated. Subscribe for typing tips, offers, and updates.</p>
          <div className="input-container">
            <input
              required=""
              placeholder="Email Address"
              type="email"
              className="emailBox"
            />
            <button className="invite-btn" type="button">
              Follow
            </button>
          </div>
        </div>
        <div className="ourLinks" style={{ height: "100px" }}>
          <p>Our links</p>
          <Link to="/about">aboutUs</Link>
          <Link to="/contact">contactUs</Link>
          <Link to="/team">OurTeam</Link>
        </div>
        <div className="text">
          <p>Find us on social media</p>
          <div className="links" style={{ height: "0px" }}>
            <button>
              <FontAwesomeIcon icon={faTwitter} className="icon1" />
            </button>
            <button>
              <FontAwesomeIcon icon={faInstagram} className="icon2" />
            </button>
            <button>
              <FontAwesomeIcon icon={faDiscord} className="icon3" />
            </button>
          </div>
        </div>
      </div>
      <hr />
      <div className="bottom">
        <Link to="/#">Privacy Terms</Link>
        <Link to="/contact">Contact</Link>
        <p>&#169; copyright by team</p>
      </div>
    </footer>
  );
}
