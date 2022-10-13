import React, { useState, useEffect } from "react";
import "./cssFiles/Home.css";
import { Button_Foodbank } from "../MPComponents/Button";
import axios from "axios";
import About from "./About";

function Home(props) {
  const loggedInUser = props.loggedInUser;
  const [userdata, setUserdata] = useState("");

  useEffect(() => {
    if (loggedInUser !== "") {
      const jwt = sessionStorage.getItem("jwt");
      console.log(jwt);

      axios({
        method: "get",
        url: "/user",
        params: { email: loggedInUser },
        headers: { Authorization: `Bearer ${jwt}` },
      })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            if (response.data.addresses)
              setUserdata(JSON.stringify(response.data.addresses[0]));
          }
        })
        .catch((err) => {
          console.log(err.response);
          setUserdata("Data failure");
        });
    }
  }, [loggedInUser]);

  console.log(loggedInUser);
  if (loggedInUser === "") {
    return <About />;
  } else {
    return WelcomePage();
  }
}
function WelcomePage() {
  return (
    <>
      {/* Main Content */}
      <div className="main_content">
        <h3>
          At Foodable our focus is to tackle world hunger with healthy food
          packages that meet peoples different dietary equirements.
        </h3>
        <br />
        <h3>
          Foodable allows for people to use a single platform for creating
          packages for a preferred dietary needs and for people that need them a
          place to find them!
        </h3>
        <br />
        <h3>Global Hunger is not the only thing we are after!</h3>
        <h4>
          {" "}
          Waste is another issue that has been increasing around the world
          <br /> to allow people to donate items that might get tossed away to
          someone that may need it.
        </h4>
        <br />
      </div>
      {/* Foodbank Locations */}
      <div className="main_content">
        <Button_Foodbank className="btn-mobile-Donator" value="Donate Food">
          {" "}
          Find Foodbanks here
        </Button_Foodbank>
      </div>
      {/* Carousel  */}
      <div id="slider">
        <figure>
          <img src="../Img/Image_1.png" alt="Food_1" />
          <img src="../Img/pexels-fauxels-3184183.jpg" alt="Food_2" />
          <img src="../Img/pexels-pixabay-162927.jpg" alt="Donating_Food" />
          <img
            src="../Img/pexels-julia-m-cameron-6994993.jpg"
            alt="Donating_Food"
          />
          <img
            src="../Img/pexels-julia-m-cameron-6994944.jpg"
            alt="Donating_Food"
          />
        </figure>
      </div>
      {/* End Carousel  */}
      {/* End Main Content */}
    </>
  );
}
export default Home;
