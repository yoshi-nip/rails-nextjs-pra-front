import React, { ChangeEvent, FormEvent, useState } from 'react'
import styles from '../styles/Home.module.css'

const CreatePost = () => {
  const [title,setTitle] = useState("");
  const [content,setContent] = useState("");

  const handleSubmit = (e : FormEvent)=>{
    e.preventDefault();

    console.log(e);
    console.log(title,content);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ブログ新規投稿</h1>
      <form  className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="" className={styles.label}>タイトル</label>
        <input type="text"
        className={styles.input}
        onChange={(e : ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} />
        <label htmlFor="" className={styles.label}>本文</label>
        <textarea name="" id="" cols="30" rows="10"
        className={styles.textarea}
        onChange={(e : ChangeEvent<HTMLTextareElement>) => setContent(e.target.value)}></textarea>
        <button type='submit' className={styles.createButton}>投稿</button>
      </form>
    </div>
  )
}

export default CreatePost
