const routes = require('express').Router()
const Video = require('./models/Video')
const mongoose = require('mongoose')




/**
 * Mongodb config
 */
const mongoURI = process.env.MONGO_URI
const conn = mongoose.createConnection(mongoURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})

let gfs;
conn.once("open", () => {
  // init stream
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads"
  });
});



/**
 * get: return video by passing its filename
 * @param filename : video name 
 */
routes.get("/video/:filename", (req, res) => {
  // console.log('id', req.params.id)
  const file = gfs
    .find({
      filename: req.params.filename
    })
    .toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: "no files exist"
        });
      }
      gfs.openDownloadStreamByName(req.params.filename).pipe(res);
    });
});

/**
 * get: return all videos name in the database
 */
routes.get("/names", async (req, res) => {
  let names = []
  const test = await gfs.find()
  .toArray((err, files) => {
    // console.log(files)
    
    files.map(item => {

      names.push({
        filename: item.filename,
        id: item._id,
        size: item.length
      })
    })
    res.send(names)
  });
});

/**
 * post: create a new entry in database
 * @param file: the choosen file to upload, passed through body
 */
routes.post("/upload", Video.single("file"), (req, res) => {
  // console.log(req.file)
  res.send(req.file)
});


/**
 * post: delete one video passing id
 * @param id: id from the video
 */
routes.delete("/delete/:id", (req, res) => {
  gfs.delete(new mongoose.Types.ObjectId(req.params.id), (err, data) => {
    if (err) return res.status(404).json({ err: err.message });
  });
  res.send(`Video deleted`)
});


module.exports = routes