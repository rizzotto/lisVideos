const routes = require('express').Router()
const VideoController = require('./controllers/VideoController')
const Video = require('./models/Video')


/**
 * get: return video by passing its filename
 * @param filename : video name 
 */
routes.get("/video/:filename", VideoController.oneVideo);

/**
 * get: return all videos name in the database
 */
routes.get("/names", VideoController.index);

/**
 * post: create a new entry in database
 * @param file: the choosen file to upload, passed through body
 */
routes.post("/upload", Video.single("file"), VideoController.create);


/**
 * delete: delete one video by passing the id
 * @param id: id from the video
 */
routes.delete("/delete/:id", VideoController.delete);


module.exports = routes