import * as React from 'react';
import { useState,useEffect } from 'react';
import Post from './Post';
import { Box } from '@mui/system';
import axios from "axios";


export default function RecipeReviewCard() {

  useEffect(() => {
    // call api or anything
    getPosts();
  },[]);

  // Windows.location.reload(true);
  //Local storage
  let returned_state_string = localStorage.getItem("LoginData");
  let returned_state_object = JSON.parse(returned_state_string);
  var sessionEmail =returned_state_object.email;

  const [image,setImage]=useState({
    databaseimg:""
  });
  const [content,setContent]=useState('Dummy');
  const [image2,setImage2]=useState({
    check:false,
    img1:""
  });

  //usestate for post array
  const [posts,setPost]=useState([]);

  
  const emailPost={
      email:sessionEmail
    }
  let length1=0;
  const allPosts=[];

  const getPosts = async () => {
  const r= await axios.post('http://localhost:4000/Veteran/getPost',emailPost)
  .then(res=> (length1=res.data.length,allPosts.push(res.data)));

  for(let i=0;i<length1;i++){
    // console.log(allPosts[0][i])
    setPost(allPosts[0]);
  }

  
    }


  return ( 
    
    <Box flex={4} p={2} >
  
    
    {/* <Button onClick={getPosts} >See Photos</Button> */}
    

    {posts.map((name)=><Post media={name.media} content={name.content}/>)}
        
    </Box>
  );
}