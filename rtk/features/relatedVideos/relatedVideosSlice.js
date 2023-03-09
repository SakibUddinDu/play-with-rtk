const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
// const { default: fetch } = require("node-fetch");
const fetch = require("node-fetch");

const initialState = {
    loading: false,
    videos:[],
    error:'',
};

// async thunk 
const fetchVideosByTags = createAsyncThunk("relatedVideos/fetchRelatedVideos", async (tags) => {
  console.log(tags);
    let queryString = tags?.length > 0 ? tags.map((tag)=>`tags_like=${tag}`).join('&'):'';
    const response = await fetch(
        `http://localhost:9000/videos?${queryString}`
    );
    const videos = await response.json();
    const sortedVideos =videos.sort((a, b) => parseInt(b.views) - parseInt(a.views));
    return sortedVideos;
});

const relatedVideosSlice = createSlice({

    name: 'relatedVideos',
    initialState,
    extraReducers: (builder) => {
      builder.addCase(fetchVideosByTags.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
        .addCase(fetchVideosByTags.fulfilled, (state, action) => {
          state.loading = false;
          state.videos = action.payload;
        })
        .addCase(fetchVideosByTags.rejected, (state, action) => {
          state.loading = false;
          state.videos = [];
          state.error = action.error?.message;
        });
    },
  });

module.exports = relatedVideosSlice.reducer;
module.exports.fetchVideosByTags = fetchVideosByTags;