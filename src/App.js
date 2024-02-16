import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io.connect("https://mire-attractive-okra.glitch.me/");
function App() {
  const [message, setMessage] = useState("");
  const [recieveMsg, setRecieveMsg] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    socket.emit("send_message", {
      message,
      room,
    });
  };

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      setRecieveMsg(data.message);
      console.log(data);
    });
  }, [socket]);

  return (
    <div className="App">
      <input placeholder="Room..." onChange={(e) => setRoom(e.target.value)} />
      <button onClick={joinRoom}>Join room</button>
      <br />
      <input
        placeholder="Type..."
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send Message</button>
      <p>hello: {recieveMsg}</p>
    </div>
  );
}

export default App;
