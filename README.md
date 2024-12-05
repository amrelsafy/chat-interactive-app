A dynamic interactive chat application that supports text messages and visualizes various data types (images, tabular) dynamically within the chat interface

## Getting started

This is a React application built with Vite bundler and packaged with NPM, so we will need to install our packages

```
npm i
```

To run the environment as a developer

```
npm run dev &&
cd server &&
npm run dev
```

## Researches
### Framer Motion
Framer motion was used to seamlessly incorporate animations and transitions through its motion object which attaches to any HTML tag with ease of access to its properties
- Framer motion was used in displaying the users list and each message

### Web Socket
Web Socket enables two applications, in our case the client and the server to connect through the same host port to communicate with low latency data to each other
- Upon each user page launch, a new web socket connection is established with the server to send and receive data

### Importing multimedia files
Labels were used to enable icon displays as input for an actual hidden input that handles for each data type its inputs only and then procced through file reader and stores our content in the messages

### Context API
Context API is used for global state management across the app without installing any third party library and without having prop drilling.
- Context API was used to persist users messages across the pages

### Responsive and Accessible Design
The application runs responsive with accessible colors of contrast across devices from large screens to small mobile phones by changing the user list to be shown on demand using a button for the smaller screens
