import React, {useEffect} from "react"
import { ChatFeed, Message } from 'react-chat-ui'
import { useState } from "react"
import { TextField, Button } from "@material-ui/core"
import openSocket from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:8080";


export default function HomeClient({userId, token}) {
  const [newMessage, setNewMessage] = useState("")
  const sendMessage = (message) => {
    setMessages([...messages,new Message({ id: 0, message: text })]);
    fetch('http://localhost:8080/chat/'+userId,{
      method: 'POST',
      body:JSON.stringify({
        message
      }),
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ token
        },
  })
    .then(res => {
      if (res.status !== 200) {
        throw new Error('Failed to post status');
      }
      return res.json();
    })
    .then(resData => {
      console.log("resDat",resData.chat)
    })
    .catch(err => {
      console.log(err);
    });
  } 

  useEffect (() => {
    setMessages([...messages,newMessage]);
  },[newMessage])

  useEffect(() => {
  var socket = (openSocket(ENDPOINT));
  socket.on("new message", data => {
    setNewMessage(new Message({ id: data.isAdmin? 1:0, 
      message: data.message }));
  })

  fetch('http://localhost:8080/chat/'+userId,{
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ token
      },
})
  .then(res => {
    if (res.status !== 200) {
      throw new Error('Failed to fetch status');
    }
    return res.json();
  })
  .then(resData => {
    console.log("resDat",resData.chat)
    setMessages(parseData(resData.chat))
  })
  .catch(err => {
    console.log(err);
  });
  }, []);

  const parseData = (data) =>{
    return data.reverse().map(msg=>{
      return new Message({
        id: msg.isAdmin&& msg.isAdmin ? 1:0,
        message: msg.message && msg.message
      })
  })
   
  }

  const [text,setText]= useState("");

  const [messages,setMessages]= useState([])
  return (
  <div><ChatFeed
      messages={messages} // Boolean: list of message objects
      isTyping={false} // Boolean: is the recipient typing
      hasInputField={false} // Boolean: use our input, or use your own
      showSenderName // show the name of the user who sent the message
      bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
      // JSON: Custom bubble styles
      bubbleStyles={
        {
          text: {
            fontSize: 30
          },
          chatbubble: {
            borderRadius: 70,
            padding: 40
          }
        }
      }
    />
    <TextField onChange={event =>setText(event.target.value)}></TextField>
  <Button
    variant="contained" 
    color="primary" 
    onClick={()=>{
      sendMessage(text)
    }}>
    Send
  </Button>
    </div>
    )

}