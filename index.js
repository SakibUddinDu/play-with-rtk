const store = require('./rtk/store')
const {fetchVideo} = require('./rtk/features/video/videoSlice')
const {fetchVideosByTags} = require('./rtk/features/relatedVideos/relatedVideosSlice')

store.subscribe(()=>{
    // console.log(store.getState())
})

store.dispatch(fetchVideo()).then(() => {
    const {video} = store.getState().video;
    // console.log(state.video.video.tags)
    const {tags} = video;
    store.dispatch(fetchVideosByTags(tags));
  });