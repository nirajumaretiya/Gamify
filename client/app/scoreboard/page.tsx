import React from "react";

import Winning from "./winning";
import ScoreBoard from "./scoreboard";
import Weapon from "./weapon";

const Page = () => {
  return (
    <>
      {/* <div>
        <Winning />
      </div> */}
      <div>
        <ScoreBoard />
      </div>
      <div>
        <Weapon />
      </div>
    </>
  );
};

export default Page;
