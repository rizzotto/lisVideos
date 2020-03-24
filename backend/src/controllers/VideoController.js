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


module.exports = {

  oneVideo (req, res) {
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
  },

  async index(req, res) {
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
  },

  create(req, res) {
    // console.log(req.file)
    res.send(req.file)
  },

  delete (req, res) {
    gfs.delete(new mongoose.Types.ObjectId(req.params.id), (err, data) => {
      if (err) return res.status(404).json({ err: err.message });
    });
    res.send(`Video deleted`)
  }

}