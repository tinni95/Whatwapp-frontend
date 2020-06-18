import React, { useEffect } from "react";
import {
  Widget,
  addResponseMessage,
  addUserMessage,
  deleteMessages,
} from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import Table from "./Table";
import { Button } from "@material-ui/core";
import { useState } from "react";
import openSocket from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:8080";

function Home({ token, setFalseAdmin }) {
  const setMessages = (messages) => {
    deleteMessages();
    messages.forEach((message) => {
      if (message.isAdmin) {
        addUserMessage(message.message);
      } else {
        addResponseMessage(message.message);
      }
    });
  };

  const fetchMessages = () => {
    fetch("http://localhost:8080/chat/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to post status");
        }
        return res.json();
      })
      .then((resData) => {
        setMessages(resData.chat.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [page, setPage] = useState(1);
  const [id, setId] = useState(null);
  const socket = openSocket(ENDPOINT);

  useEffect(() => {
    fetchMessages();
    id && socket.emit("join room", id);
    socket.on("new message", (data) => {
      if (data.roomId == id && !data.isAdmin) {
        addResponseMessage(data.message);
      }
    });
  }, [id]);

  const onLeave = (nextId) => {
    socket.emit("leave room", id);
    setId(nextId);
  };

  const handleNewUserMessage = (message) => {
    fetch("http://localhost:8080/chat/" + id, {
      method: "POST",
      body: JSON.stringify({
        message,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to post status");
        }
        return res.json();
      })
      .then((resData) => {
        console.log("resDat", resData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Table
        page={page}
        onLeave={onLeave}
        setFalseAdmin={setFalseAdmin}
        token={token}
      />
      <div className="mb-2">
        {page != 1 && (
          <Button
            variant="contained"
            color="primary"
            style={{ margin: 20 }}
            onClick={() => setPage(page - 1)}
          >
            Previous Page
          </Button>
        )}
        <Button
          variant="contained"
          color="primary"
          style={{ margin: 20 }}
          onClick={() => setPage(page + 1)}
        >
          Next Page
        </Button>
      </div>
      <Widget handleNewUserMessage={handleNewUserMessage} />
    </div>
  );
}

export default Home;
