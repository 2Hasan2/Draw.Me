import "./App.css";
import { Tldraw } from "tldraw";
import { useSyncDemo } from "@tldraw/sync";
import "tldraw/tldraw.css";
import { useState, useEffect } from "react";

function App() {
  const [roomId, setRoomId] = useState("");
  const store = useSyncDemo({ roomId });
  const [newRoomId, setNewRoomId] = useState("");

  // Get the roomId from query parameters on component mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("roomId");
    if (id) {
      setRoomId(id);
    }
  }, []);

  const handleRoomCreation = (e: React.FormEvent) => {
    e.preventDefault();
    if (newRoomId) {
      // Update the URL with the new roomId in query parameters
      window.history.pushState({}, "", `?roomId=${newRoomId}`);
      setRoomId(newRoomId); // Set the roomId state to the new roomId
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
