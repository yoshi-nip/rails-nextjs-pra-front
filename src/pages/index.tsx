import Image from 'next/image'
import Link from 'next/link';
import { Inter } from 'next/font/google'
import { Post } from '@/types';
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

type Props ={
  posts: Post[];
};

export async function getStaticProps(){
  const res = await fetch("http://localhost:3001/api/v1/posts/");
  const posts =  await res.json();

  console.log(posts)

  return{
    props:{
      posts,
    },
    revalidate: 60 * 60 *24,
  };
}

export default function Home({posts}:Props) {
  return (
    <>
    <div>
      <div>
        {posts.map((post:Post) =>(
          <div key={post.id} className={styles.postCard}>
            <Link href={`posts/${post.id}`} className={styles.postCardBox}>
            <h2>{post.title}</h2>
            </Link>
            <p>{post.content}</p>
            <button className={styles.editButton}>編集</button>
            <button className={styles.deleteButton}>削除</button>
          </div>
        ))}
    </div>
    </div>
    </>
  );
}
