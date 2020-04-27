# Whatwapp-frontend
I made this to ease the testing process.

to run 

```
npm or yarn install
```
then

```
npm or yarn install
```
* to log-in as client, access the normal login page
* to log-in as admin access /admin.

* The admin view shows a table with all the clients and info about them. When the admin presses on the chat button of the table, the chat widget is changed to work with that user. It loads the chats messages and will push new messages to that endpoint
* The client view simply shows the chat

The app can be tested, after running the back-end, using two sessions of a web browser, it has been previously tested with two chrome sessions, in incognito. 
1. Open one client session, for example with the user bilbo@gmail.com
2. Open an admin session on the other browser page, press on the chat button next to bilbo@gmail.com.
3. the chat can now start and it will be in real-time. Also if the pages refreshes or the session ends. the messages will stay.

**NB as this was not required for the evaluation I didn't spend much time for its development, in fact I adapted an old front end I had.**
