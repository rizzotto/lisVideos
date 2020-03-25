# lisVideos
A project that allows the user to upload videos to a database and display them in another route.
## Back-end
Technologies:
- Nodejs
- Express
- Mongodb (GridFS to store files bigger than 22Mb)

Api Methods: 

GET:

- return one entry by passing it's filename (generates a unique filename) 
- path: `"/video/:filename"`

GET:
- return all entries name in the database
- path: `"/names"`

POST:
- create a new entry in database
- path: `"/upload"`

DELETE:
- delete one entry by passing the id
- path: `"/delete/:id"`

## Front-end
- Reactjs

Pages in the app:
- VideoPage (main)
- UploadPage

Components in the app:
- FileList (all entries in the database)
- Upload (drag and drop zone)
- Nav (Navigation menu)

