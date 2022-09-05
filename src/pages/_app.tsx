import { Provider } from 'react-redux'
//
import moment from "moment";

import "moment/locale/ru";
moment.locale("ru");
//
import AuthWrapper from "components/AuthWrapper";
//
import { store } from '../store'
//
import "../styles/globals.css";



const MyApp = ({
  Component,
  pageProps,
}: any) => {
  return (
    <Provider store={store}>
      <AuthWrapper>
      <Component {...pageProps} />
      {/* <div>test</div> */}

    </AuthWrapper>
    </Provider>
  );
};
export default MyApp;
