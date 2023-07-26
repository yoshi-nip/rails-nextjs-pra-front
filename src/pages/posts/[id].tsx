import { Post } from '@/types';
import styles from '@/styles/Post.module.css'
import { useRouter } from 'next/router';

type Props ={
  post: Post;
};


export async function getStaticProps({ params }: { params : { id : string } }){
  const res = await fetch(`http://localhost:3001/api/v1/posts/${params.id}`);
  const post =  await res.json();

  console.log(post)

  return{
    props:{
      post,
    },
    revalidate: 60,
  };
}

// pages/posts/[id].tsx

export async function getStaticPaths() {
  const res = await fetch(`http://localhost:3001/api/v1/posts/`);
  const posts: Post[] =  await res.json();

  const paths = posts.map((post)=>({
    params: {id : post.id.toString()},
  }));

  return {
    // paths: [
    //   // Object variant:
    //   { params: { id : '' } },
    // ],
    // 公式ページのものを上のpathsで動的に取得して変わるよう設定している
    paths,
    fallback: true,
  }
}

const Post = ({post}:Props) => {

  const router = useRouter();

  if(router.isFallback){
    return <div>読み込み中</div>
  };

  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.title}>{post.title}</h2>
        <p className={styles.date}>{post.created_at}</p>
        <p className={styles.content}>{post.content}</p>
      </div>

    </>
  )
}

export default Post
