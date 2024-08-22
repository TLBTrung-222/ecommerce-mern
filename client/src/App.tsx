import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import HeaderComponent from "./components/Header/Header";
import Box from "@mui/material/Box";
import { CssBaseline } from "@mui/material";

const App = () => (
    <>
        <CssBaseline>
            <Box className="App">
                <Router>
                    <Routes>
                        {routes.map((route) => (
                            <Route
                                key={route.path}
                                path={route.path}
                                element={
                                    <>
                                        {route.isShowHeader && (
                                            <HeaderComponent />
                                        )}
                                        <route.page />
                                    </>
                                }
                            />
                        ))}
                    </Routes>
                </Router>
            </Box>
        </CssBaseline>
    </>
);

export default App;
