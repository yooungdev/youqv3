//
import moment from "moment";

import "moment/locale/ru";
moment.locale("ru");
//
import AuthWrapper from "components/AuthWrapper";
//
import "../styles/globals.css";



const MyApp = ({
  Component,
  pageProps,
}: any) => {
  return (
    <AuthWrapper>
      <Component {...pageProps} />
      {/* <div>test</div> */}

    </AuthWrapper>
  );
};
export default MyApp;
