import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import style from './[id].module.css';
import fetchOneBook from '@/lib/fetch-one-book';

// 다이나믹한 페이지라서 getStaticPaths를 해주어야 한다.
export const getStaticPaths = () => {
  return {
    paths: [
      // '1'는 반드시 문자열로 입력해야 한다.
      { params: { id: '1' } },
      { params: { id: '2' } },
      { params: { id: '3' } },
    ],

    // 만약 id:'4' 같이 존재하지 않는 것들이 들어올때 대비책으로 넣어둠
    // false는 paths에 작성하지 않은 값이 들어오면
    // 무조건 not found 페이지로 이동시킴
    fallback: false,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  const book = await fetchOneBook(Number(id));

  return {
    props: { book },
  };
};

export default function Page({
  book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!book) return '문제가 발생했습니다. 다시 시도하세요';

  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    book;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
