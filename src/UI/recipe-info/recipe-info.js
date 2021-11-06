import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

import svg from "../../sprite.svg";

const RecipeInfo = (props) => {
  const [locationHash, setLocationHash] = useState(
    window.location.hash.slice(1)
  );

  const hashChangeListener = () => {
    setLocationHash(window.location.hash.slice(1));
    console.log("CHANGED");
  };

  useEffect(() => {
    console.log("Effect");
    window.addEventListener("hashchange", hashChangeListener);

    return () => {
      window.removeEventListener("hashchange", hashChangeListener);
      console.log("WONT RUN");
    };
  }, []);

  const changeHash = () => {
    console.log(locationHash);
    if (locationHash !== "333333") {
      window.location.hash = "#333333";
      console.log("LISTENER 1");
    } else {
      window.location.hash = "#321111";
      console.log("LISTENER 2");
    }
  };

  return (
    <div>
      <button onClick={changeHash}>CLICK</button>
      <img src={props.imgSrc} alt={props.imgAlt} />
      <h3>{props.title}</h3>

      <div>
        <div>{locationHash} mmm</div>

        <svg>{/* <use xlinkHref={}> */}</svg>
      </div>
    </div>
  );
};

export default RecipeInfo;
