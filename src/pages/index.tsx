// CSS Module
import SearchableLayout from '@/components/searchable-layout';
import style from './index.module.css';
import { ReactNode, useEffect } from 'react';
import books from '@/mock/books.json';
import BookItem from '@/components/book-item';
import { InferGetServerSidePropsType } from 'next';

export const getServerSideProps = () => {
  // 불 가능 (브라우저에서만 사용할 수 있는 기능이라서)
  // window.alert()

  const data = 'hello';

  // 터미널에서 만 보임
  console.log('서버에서만 보여요');

  return {
    props: {
      data,
    },
  };
};

export default function Home({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // 불 가능 (브라우저에서만 사용할 수 있는 기능이라서)
  // window.alert()

  // 가능
  console.log(data);

  useEffect(() => {
    console.log('브라우저에서만 보여요');
  }, []);

  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
