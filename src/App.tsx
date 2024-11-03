import "./App.css";
import { Tldraw, Editor } from "tldraw";
import { useSyncDemo } from "@tldraw/sync";
import "tldraw/tldraw.css";

function App() {
  const store = useSyncDemo({ roomId: "myapp-abc123" });

  return (
    <div style={{ position: "fixed", inset: 0 }}>
      <Tldraw store={store} />
    </div>
  );
}

export default App;
