# Teton-Walkie-Talkie
A 5 hour implementation prototype for a walkie-talkie. Includes both a frontend, backend and database.
What is Teton-Walkie-Talkie?
```
A brief attempt at making a walkie-talkie web application.
```
// ----------------- How to run the project ----------------- //
- The projec consists of 2 main projects
-  client & server
1. For each, open a terminal and navigate to 'client' folder. Type npm install 
```
npm install
```
2. Do the same for the 'server' folder.
3. The app should serve on localhost:3000

P.S. I have included the .env file to allow your team to connect to the database but I will make it inactive in a while, unless specified otherwise.


// ----------------- Architecture choices ----------------- //
---
- Initial user flow, data flow and system architecture
![screenshot](https://github.com/TheSvaneMan/Teton-Walkie-Talkie/assets/43392291/065d328f-1026-42ce-b294-b6270bf36983)

- Screenshot of live database on harperDB
![screenshot2](https://github.com/TheSvaneMan/Teton-Walkie-Talkie/assets/43392291/549b910b-57a9-4b1b-b025-72bdc3795a2e)


// ----------------- Architecture description ----------------- //
- I chose to use a simple new react app, as it houses multiple useful functions for prototyping and hacking a project together.
- Expressjs is not the fastest backend server but it accessible, readible and serves the purpose for routing, data parsing and serving.
- I have not used HarperDB before, and my initial choice would have been MongoDB for storing the messages.

// ----------------- Workflow ----------------- //
- Opened Miro and diagramed the user flow and data flow
- Googled for existing codebases (Specifically for Audio Streaming / voice chats)
- Found socket io client API 

- https://socket.io/docs/v4/client-api/
- I made a choice to make an MVP chat app which can later have the live audio communication stream added. 

- Concluded MVP should be a chat based app that can have a call feature added later.
- Basic flow includes a user defining their username, and selecting a room to join.

-  I followed a tutorial:  https://www.freecodecamp.org/news/build-a-realtime-chat-app-with-react-express-socketio-and-harperdb/

- I then found https://codelabs.developers.google.com/codelabs/webrtc-web/#0 and looked through the documentation and attempted to build a service to stream audio, I did not succeed and chose not to continue based on time limitations.

// ----------------- Alternatives and reflections ----------------- //
- I should have realized from the beginning the task was out of scope to program in 5 hours for my current skillset, in relations to being a complete deployable web-application.
- I should have focused on the user interface and designing mockups, but I prefer to work in proof-of-concept workflows and note the blocks/painpoints in the process, which can then be evaluated later and further researched for the next design and prototype. Iterative development workflow.
- I wanted to upload and deploy the application live, but I pushed myself to get the WebRTC to function but did not manage.

// ----------------- Additional notes ----------------- //

"Encryption is mandatory for all WebRTC components, and its JavaScript APIs can only be used from secure origins (HTTPS or localhost). Signaling mechanisms aren't defined by WebRTC standards, so it's up to you make sure to use secure protocols."

- I hope the project suffices to show my skills, approach to problems and my ability to complete a task and determine the state of the task in detail.

