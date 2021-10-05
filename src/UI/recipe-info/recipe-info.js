import React from "react";

import svg from "../../sprite.svg";

const RecipeInfo = (props) => {
  return (
    <div>
      <img src={props.imgSrc} alt={props.imgAlt} />
      <h3>{props.title}</h3>

      <div>
        <div>

        </div>

        <svg>
          <use xlinkHref={}>
        </svg>

      </div>

    </div>
  );
};

export default RecipeInfo;
