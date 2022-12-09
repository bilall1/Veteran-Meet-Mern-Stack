import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { Stack } from '@mui/system';
import Post from './Post';
import { Box } from '@mui/system';
import { Button, TextField } from '@mui/material';
import axios from "axios";
import {useRef} from 'react';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const Searchbar = styled("div")({
  padding: "0 10px",
  backgroundColor: "Pink",
  borderRadius: "2px",
  width: "30%",
})

const styles = theme => ({ textField: { width: '90%', marginLeft: 'auto', marginRight: 'auto', color: 'white', paddingBottom: 0, marginTop: 0, fontWeight: 500 }, });


export default function RecipeReviewCard() {

  const hiddenFileInput = useRef(null);

  useEffect(() => {
    getPosts();
  }, []);

  // Windows.location.reload(true);
  //Local storage
  let returned_state_string = localStorage.getItem("LoginData");
  let returned_state_object = JSON.parse(returned_state_string);
  var sessionEmail = returned_state_object.email;

  const [image, setImage] = useState({
    databaseimg: ""
  });
  const [content, setContent] = useState('Dummy');
  const [image2, setImage2] = useState({
    check: false,
    img1: ""
  });

  //usestate for post array
  const [posts, setPost] = useState([]);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleClick = event => {
    hiddenFileInput.current.click();
  };

  const handleChange = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setImage({ databaseimg: base64 });
  }


  const handleAPI = () => {

    const contentImage = {
      picture: image.databaseimg,
      contentPicture: content,
      email: sessionEmail
    }

    axios.post('http://localhost:4000/Veteran/picture', contentImage)
      .then(res => (setImage2({ check: true, img1: res.data }), alert("Content Posted")));


  }
  const emailPost = {
    email: sessionEmail
  }
  let length1 = 0;
  const allPosts = [];

  const getPosts = async () => {
    const r = await axios.post('http://localhost:4000/Veteran/getAllPost', emailPost)
      .then(res => (console.log("OK"), length1 = res.data.length, allPosts.push(res.data)));

    for (let i = 0; i < length1; i++) {
      setPost(allPosts[0]);
    }

  }


  return (

    <Box flex={4} p={2} >


      {/* <Button onClick={getPosts} >See Photos</Button> */}
      {/* <img width={100} src={image}></img> */}


      <Stack direction="row" spacing={2} justifyContent="space-between">

        <TextField sx={{ marginBottom: 2 }} onChange={(e) => setContent(e.target.value)} id="outlined-basic" label="New Post" variant="outlined" style={{ width: "90%" }} />
        <Button onClick={handleAPI} sx={{ height: 55, width: 20 }} variant="outlined">Post</Button>
      </Stack>

      {/* {image2.check?(<img width={100} src={image2.img1}/>):''} */}

      <Button onClick={handleClick}>
        Add 
          <PhotoCamera />
      </Button>

      <input type="file" 
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{ display: 'none' }}
      /> 

      {posts.map((name) => <Post media={name.media} content={name.content} />)}

    </Box>
  );
}