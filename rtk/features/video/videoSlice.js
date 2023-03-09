const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
// const { default: fetch } = require("node-fetch");
const fetch = require("node-fetch");

const initialState ={
    loading: false,
    video:{},
    error:'',
};

// async thunk 
const fetchVideo = createAsyncThunk("video/fetchVideo", async () => {
    const response = await fetch(
        "http://localhost:9000/videos"
    );
    const video = await response.json();
    return video;
});

const videoSlice = createSlice({
    name: 'video',
    initialState,
    extraReducers: (builder) => {
      builder.addCase(fetchVideo.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
        .addCase(fetchVideo.fulfilled, (state, action) => {
          state.loading = false;
          state.video = action.payload;
        })
        .addCase(fetchVideo.rejected, (state, action) => {
          state.loading = false;
          state.video = {};
          state.error = action.error?.message;
        });
    },
  });
module.exports = videoSlice.reducer;
module.exports.fetchVideo = fetchVideo;