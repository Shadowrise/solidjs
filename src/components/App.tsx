import {Button, Container, createTheme, CssBaseline, ThemeProvider} from "@suid/material";
import {createResource} from "solid-js";
import UsersTable from "./UsersTable";
import LoadingOverlay, {useLoadingOverlayStore} from "./LoadingOverlay";
import HeaderBar from "./HeaderBar";

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

const fetchUsers = async () => {
  useLoadingOverlayStore().showOverlay();
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users`);
    const result = await response.json();
    return result as User[];
  } finally {
    useLoadingOverlayStore().hideOverlay();
  }
};

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App() {
  const {showOverlay} = useLoadingOverlayStore();
  const [users] = createResource(fetchUsers);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline enableColorScheme/>

      <Container
        maxWidth="lg"
        component="main"
        sx={{display: 'flex', flexDirection: 'column', my: 8, gap: 4}}
      >
        <HeaderBar/>
        <Button onClick={showOverlay}>Show loader</Button>
        <UsersTable users={users()}/>
      </Container>
      <LoadingOverlay/>
    </ThemeProvider>
  );
}
