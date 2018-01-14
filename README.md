Note Manager
============
This project is an assignment completed as part of the application process to Focus21 Inc.
The live version of the application can be found at https://notemanager.herokuapp.com/

To install the project in a local workspace, clone this repository and run the following commands:

* npm install
* Update the mySQL connection configuration file ./lib/dbConfig.js
* npm run-script start
* Visit your browser @ localhost:8080

Below is an overview of the requirements I was assigned to implement:

Hi Maksymilian,

My name is Collin Doering and I'm the acting CTO here at Focus21. I will be assisting you throughout the interviewing process. Before we bring you in for a final, meet the founders interview however, we ask that you complete the assignment detailed below. This will give us an idea of where you stand as a developer, the rate at which you can learn new technologies and let you showcase your creativity and passion for software development. You are welcome to use whatever libraries, tools, etc.. to facilitate its completion. However, you must meet the minimum requirements specified below. Also feel free to take a look at our stack.

Create a notepad SPA (single page application) with a react and redux front-end and a rest API that uses a postgres, mysql, SQLite or Neo4j database to store notes. The project must meet the following requirements:
Written in es6 (use babel)
Use webpack for packaging client side code
expressjs
node
npm/yarn
React
Redux
Use postgress, MySQL or SQLite to store notes
Deploy publicly somewhere (eg. Heroku, AWS ElasticBeanstalk, private server, etc..)
Implement a ReST note management API with the following specification:

### Add a note
POST /note/add

### Get notes
GET /note?limit=10&start=1&order=asc
- limit - Indicates the maximum number of notes to get; if unspecified it gets all notes
- order - Specifies what order to sort the notes, based on creation time which can be either "asc" or "desc"; if unspecified, defaults to descending
- start - Specifies where in the sorted notes to begin getting notes; if unspecified, defaults to 1

### View a note with a given id
GET /note/:id

### Update a note with a given id
PUT /note/:id

### Delete a note with a given id
DELETE /note/:id

Use the ReST API detailed above from your front-end React SPA

### Bonus:
- Use graphql and relay to make requests (note a ReST api must still be provided)
- Use auth0 to provide authentication and restrict users to only being able view, add and create their own notes. This will require modifying the ReST API to allow specifying the user (eg. GET /note/:id becomes GET /:user/note/:id and so on. Additionally there must be an additional route to authenticate the user.
- Allow users to use markdown and show a live preview of the resulting document
- Allow users to download a PDF copy of their note
- Create a react-native application to manage a users notes that uses the note api that was written for this assignment
- Create a native desktop app using your application and elecron
- Use SASS for CSS
- Use CSS animations and transitions to provide a nicer user experience

### Next steps for you:
Email us back to let us know if you will be completing the assignment and if you have a desire to join the best team in the multiverse!
If so, please include your estimation for the time it would take you to complete the assignment. (Note: We are not looking for speed here, we are looking for quality and accountability to your chosen time frame.). Once you complete the assignment, email us the URL to your repo and URL of release if published. Wait for an answer :)

Looking forward to seeing what you can do!

Ilya Peskov
CEO