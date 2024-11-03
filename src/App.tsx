import "./App.css";
import { Tldraw } from "tldraw";
import { useSyncDemo } from "@tldraw/sync";
import "tldraw/tldraw.css";
import { useState } from "react";

function App() {
  const roomId = window.location.pathname.replace("/", "").trim();
  const store = useSyncDemo({ roomId });
  const [newRoomId, setNewRoomId] = useState("");

  const handleRoomCreation = (e: React.FormEvent) => {
    e.preventDefault();
    if (newRoomId) {
      window.location.pathname = `/${newRoomId}`;
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-100">
      {roomId ? (
        <Tldraw store={store} />
      ) : (
        <form
          onSubmit={handleRoomCreation}
          className="bg-white p-8 rounded shadow-md w-80"
        >
          <h2 className="text-2xl text-black font-bold mb-4">
            Create a New Room
          </h2>
          <input
            type="text"
            value={newRoomId}
            onChange={(e) => setNewRoomId(e.target.value)}
            placeholder="Enter room name"
            required
            className="border border-gray-300 rounded p-2 mb-4 w-full"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-2 rounded w-full hover:bg-blue-600 transition"
          >
            Create Room
          </button>
        </form>
      )}
    </div>
  );
}

export default App;
