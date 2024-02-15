import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import PostDetails from './components/PostDetails/PostDetails';
import NavBar from "./components/NavBar/NavBar";
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import { GoogleOAuthProvider } from '@react-oauth/google'; // Import GoogleOAuthProvider

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
const clientId=`282585299227-7htevq641v9sq8bsi24mj2actb8nhmum.apps.googleusercontent.com`
  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId={clientId}> {/* Wrap everything in GoogleOAuthProvider */}
        <Container maxWidth="xl">
          <NavBar />
          <Routes>
            <Route path="/" element={<Navigate to="/posts" />} />
            <Route path="/posts" element={<Home />} />
            <Route path="/posts/search" element={<Home />} />
            <Route path="/posts/:id" element={<PostDetails />} />
            <Route
              path="/auth"
              element={!user ? <Auth /> : <Navigate to="/posts" />}
            />
          </Routes>
        </Container>
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
};

export default App;
