const configureStore = require("@reduxjs/toolkit").configureStore;
const { createLogger } = require("redux-logger");
const videoReducer = require('./features/video/videoSlice');
const relatedVideosReducer = require('./features/relatedVideos/relatedVideosSlice');
// console.log(relatedVideosReducer);

const logger =createLogger()

const store =configureStore({
    reducer:{
        video: videoReducer,
        relatedVideos: relatedVideosReducer,
    },
    middleware: (getDefaultMiddlewares) =>
        getDefaultMiddlewares().concat(logger),
})

module.exports = store;