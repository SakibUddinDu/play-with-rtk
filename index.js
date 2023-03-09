const store = require('./rtk/store')
const {fetchVideo} = require('./rtk/features/video/videoSlice')
//fetchRelatedVideos dicchilam import -export problem
const {fetchVideosByTags} = require('./rtk/features/relatedVideos/relatedVideosSlice');

store.subscribe(()=>{
    // console.log(store.getState())
})

store.dispatch(fetchVideo()).then(() => {
    const {video} = store.getState().video;
    const {tags} = video;
    store.dispatch(fetchVideosByTags(tags));

  });