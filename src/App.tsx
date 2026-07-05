import { CircularProgress, Stack } from "@mui/material";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const AdminPage = lazy(async () => {
  const module = await import("./pages/AdminPage");
  return { default: module.AdminPage };
});

const MarketingPage = lazy(async () => {
  const module = await import("./pages/MarketingPage");
  return { default: module.MarketingPage };
});

function RouteLoadingFallback() {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh" }}
    >
      <CircularProgress color="primary" />
    </Stack>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<RouteLoadingFallback />}>
        <Routes>
          <Route path="/" element={<MarketingPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
