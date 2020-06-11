import React, { useEffect } from "react";
import { parse, stringify } from "querystring";

function GithubLogin() {
  useEffect(() => {
    console.log("GithubCallback rendered");
    const href = window.location.href.split("?");
    const { code } = parse(href[1]);
    localStorage.setItem("code", code as string);
    console.log("code?? ", code);
  }, []);
  return (
    <div>
      <h1>GITHUB LOGIN</h1>
    </div>
  );
}

export default GithubLogin;
