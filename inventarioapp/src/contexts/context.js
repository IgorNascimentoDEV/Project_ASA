import React, { createContext, useState } from "react";

const StoreContext = createContext({
  token: null,
  setToken: () => {},
});

export default StoreContext;