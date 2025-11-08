import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import style from './[id].module.css';
import fetchOneBook from '@/lib/fetch-one-book';
import { useRouter } from 'next/router';

// 다이나믹한 페이지라서 getStaticPaths를 해주어야 한다.
export const getStaticPaths = () => {
  return {
    paths: [
      // '1'는 반드시 문자열로 입력해야 한다.
      { params: { id: '1' } },
      { params: { id: '2' } },
      { params: { id: '3' } },
    ],

    // blocking (즉시 생성 (Like SSR))
    // 한번 생성하면 html을 서버에 생성 하기 때문에
    // 처음에는 조금 오래 걸릴수 있지만
    // 이후에는 빠르다는 장점이 있다.
    // 백엔드에서 데이터를 받아오는 것이 오래걸리면
    // 계속 화면이 보이지 않는다는 단점이 있다.

    // true : 즉시 생성 + 페이지만 미리 반환
    // 그래서 true를 사용하면
    // 일단 정보가 없는 화면을 보여주고 (로딩처리 해주기?)
    // 백엔드에서 정보가 오면 정보가 들어있는 화면까지 보여줄 수 있다.
    fallback: true,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  const book = await fetchOneBook(Number(id));

  // 진짜 데이터가 없다면
  // 404페이지로 이동
  if (!book) {
    return {
      notFound: true,
    };
  }

  return {
    props: { book },
  };
};

export default function Page({
  book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  // 3. 그래서 이렇게 로딩 처리
  const router = useRouter();
  if (router.isFallback) return '로딩중입니다.';

  // 1. fallback:true일때 데이터가 없으면 보여짐
  // 2. 하지만 진짜 book데이터가 없는 화면에서도 보여지기 때문에 로딩에는 적합하지 않다.
  if (!book) return '문제가 발생했습니다. 다시 시도하세요';

  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

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
