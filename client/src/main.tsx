import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import store from "./app/store";
import theme from "./constant/theme";

import { Box, CircularProgress } from "@mui/material";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

export const persistor = persistStore(store);
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <PersistGate
      persistor={persistor}
      loading={
        <Box
          sx={{
            height: "100vh",
            w: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress size={200} />
        </Box>
      }
    >
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </React.StrictMode>
    </PersistGate>
  </Provider>
);
