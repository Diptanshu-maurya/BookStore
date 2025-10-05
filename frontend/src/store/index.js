import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./auth" //give the name what ever we want

const store=configureStore({

  reducer:{
    auth:authReducer
  },
});
export default store;