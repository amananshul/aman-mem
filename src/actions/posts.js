import * as api from "../api";
import { CREATE, DELETE, FETCH_ALL, LIKE, SEARCH_ALL, UPDATE } from "../constants/actionTypes";

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log("e", error);
  }
};
export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    // dispatch({ type: START_LOADING });
    const { data:{data}} = await api.fetchPostsBySearch(searchQuery);

    dispatch({ type: SEARCH_ALL, payload: data });
    // dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};
export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log("e", error);
  }
};
export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log("e", error);
  }
};
export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log("e", error);
  }
};
export const likePost = (id,post) => async (dispatch) => {
  try {
  const {data} = await api.likePost(id);
    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log("e", error);
  }
};
