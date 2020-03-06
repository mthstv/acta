import React from "react";

const NotFoundPage = () => {
  return (
    <div style={{textAlign: 'center', color: 'white'}}>
      {/* <div className="error" style={{color:"white", textAlign: "center"}}>404</div> */}
      <div className="glitch mx-auto" data-text="404">404</div>
      {/* <div> Page not found</div> */}
      <div> Página não encontrada</div>
    </div>
  );
};

export default NotFoundPage;
