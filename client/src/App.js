import React from "react";
import AppRouter from "./router/AppRouter";
import { CookiesProvider } from 'react-cookie';
import { AuthProvider } from "./contexts/AuthContext";

const App = () => {
  return (
    <div>
      <CookiesProvider>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </CookiesProvider>
    </div>
  );
};

export default App;
