import React from "react"
import Headers from './_components/Headers'

function Provider({children}) {
  return (
    <div>
      <div className="relative px-10 md:px-20">
        <Headers />
        {children}
      </div>
    </div>
  );
}

export default Provider;
