import React,{useState,useEffect} from 'react';
import axios from 'axios'
const post=({postid})=>{
const [comment,setComment]=useState('');
useEffect(()=>{
axios.get(/api/posts/${postid})
.then((res)=>setPost(res.data))
.catch((err)=>console.error(err);
},[postid]);
const handleLike=()=>{
axios.post(/api/posts/${postid}/like,{userid:'currentUserid'})
.then((res)=>setPost(res.data))
.catch((err)=>console.error(err));
});
const handleComment=()=>{
axois.post(/api/posts/${postid}/comments,{userid:'currentuserid',content:comment})
.then((res)=>setPost(res.data))
.catch((err)=>console.error(err));
};
if(!post) return <div>loading...</div>
<button onClick={handleLike+>like</button>
<p>{post.likes.length}likes</p>
<div>
<input type="text" value={comment} onChnage={(e)=>setComment(e.target.value)} placeholder="write your comment"/>
<button onClick={handleComment}>comment</button>
</div>
<div>{post.comments.map((comment)=>(
<div key={comment._id}><p>{comment.content}</p>
</div>
))}
</div>
</div>
);
};