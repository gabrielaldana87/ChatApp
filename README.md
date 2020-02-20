### To Run Project:

Please use node version 10.9.0

### Libraries Used for Project Build and Server-Side Routing:

* babel
* express
* hbs
* react
* webpack
* nodemon
* ws

### `npm install`

Installs all corresponding node modules for project and build.

### `npm start`

Runs the node server; which listens on port 4000 (based on the config.js file in the root directory). I've created a
node server which listens for request on the client files and broadcasts messages from multiple clients to the React
Components.

### `npm run dev`

In another Terminal window; run the build files to generate the React scripts to render the UI on the Client side.

### Use the API

Once the server is running and webpack creates the bundle for the React scripts please access the UI through:

http://localhost:4000/

### Future Work

Sometimes the React client lags in obtaining the name of the user who logs into the Chat App; making it difficult to
determine the disconnecting client. If I had more time I'd try to resolve this issue which seems to be coming from
the client files.