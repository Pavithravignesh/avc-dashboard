import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import AcvRange from "scenes/acvRange";
import CustomerType from "scenes/customerType";
import Team from "scenes/team";
import AccountIndustry from "scenes/accountIndustry";
import NotFound from "components/NotFound";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode), [mode]));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {/* <Router> */}
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/customerType" replace />} />
              <Route path="/customerType" element={<CustomerType />} />
              <Route path="/acvRange" element={<AcvRange />} />
              <Route path="/team" element={<Team />} />
              <Route path="/accountIndustry" element={<AccountIndustry />} />

              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
          {/* </Router> */}
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
