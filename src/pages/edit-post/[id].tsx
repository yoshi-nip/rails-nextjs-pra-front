import React, { ChangeEvent, FormEvent, useState } from 'react'
import styles from '@/styles/Home.module.css'
import axios from 'axios';
import { useRouter } from 'next/router';
import { Post } from '@/types';


type Props = {
  post : Post
}

export async function getServerSideProps(context:any) {
  const id = context.params.id

  const res = await fetch(`http://localhost:3001/api/v1/posts/${id}`);
  const post =  await res.json();

  return {
    props:{
      post,
    }
  }
}

const EditPost = ({post} : Props) => {
  const [title,setTitle] = useState(post.title);
  const [content,setContent] = useState(post.content);

  const router = useRouter();

  const handleSubmit = async (e : FormEvent)=>{
    e.preventDefault();


    try{
      await axios.put(`http://localhost:3001/api/v1/posts/${post.id}`,{
        title : title,
        content: content}
      );

      router.push("/");
    }catch(err){
      alert("編集に失敗したよ")
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ブログ新規投稿</h1>
      <form  className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="" className={styles.label}>タイトル</label>
        <input type="text"
        className={styles.input}
        value={title}
        onChange={(e : ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} />
        <label htmlFor="" className={styles.label}>本文</label>
        <textarea name="" id="" cols="30" rows="10"
        className={styles.textarea}
        value={content}
        onChange={(e : ChangeEvent<HTMLTextareElement>) => setContent(e.target.value)}></textarea>
        <button type='submit' className={styles.createButton}>編集</button>
      </form>
    </div>
  )
}

export default EditPost
