import React from "react";

import testing from "../test.json";

function instructions() {
  return (
    // <div>
    //   <ul>
    //     {testing.map((name, steps) =>
    //       name.steps.map((step) => <li key={step.number}>{step.step}</li>)
    //     )}
    //   </ul>
    // </div>

    <div>
      <ul>
        {testing.map((name) =>
          name.steps.map((step) => <li key={step.number}>{step.step}</li>)
        )}
      </ul>
    </div>
  );
}

export default instructions;
