import {Backdrop, CircularProgress, useTheme} from "@suid/material";
import {createStore} from "solid-js/store";

const [store, setStore] = createStore({openCount: 0});

export default function LoadingOverlay() {
  const theme = useTheme();

  return (
    <Backdrop
      sx={{color: "#fff", zIndex: theme.zIndex.drawer + 1}}
      open={store.openCount > 0}
    >
      <CircularProgress color="inherit"/>
    </Backdrop>
  );
};

export function useLoadingOverlayStore() {
  return {
    showOverlay: () => setStore("openCount", (prev) => prev + 1),
    hideOverlay: () => setStore("openCount", (prev) => prev - 1),
  };
}