import { withPageAuthRequired } from "@auth0/nextjs-auth0/dist/frontend";
import React, { useEffect } from "react";
import { useState } from "react";
import RedirectAuth from "../templates/RedirectAuth/RedirectAuth";

const withCustomAuth =
  (Component: React.ComponentType<any>) => (props: any) => {
    const [returnTo, setReturnTo] = useState("");

    useEffect(() => {
      setReturnTo(window.location.pathname);
    }, []);

    const ModifiedComponent = withPageAuthRequired(Component, {
      onRedirecting: () => <RedirectAuth />,
      returnTo,
    });

    return <ModifiedComponent {...props} />;
  };

export default withCustomAuth;
