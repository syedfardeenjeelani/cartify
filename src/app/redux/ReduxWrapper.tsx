"use client";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ThemeProvider } from "next-themes";

const ReduxWrapper = ({ children }: any) => {
  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem >
      <Provider store={store}>{children}</Provider>;
    </ThemeProvider>
  );
};

export default ReduxWrapper;
