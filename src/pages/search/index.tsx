import SearchableLayout from '@/components/searchable-layout';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import BookItem from '@/components/book-item';
import fetchBooks from '@/lib/fetch-books';
import { BookData } from '@/types';
import Head from 'next/head';

// export const getStaticProps = async (context: GetStaticPropsContext) => {
//   const q = context.query.q;
//   const books = await fetchBooks(q as string);
//   return {
//     props: { books },
//   };
// };

// context.query 는 빌드타임에는 받아 올 수 없다.

export default function Page() {
  // 그래서 빌드 타임 이후에 받아오는 방법도 사용할 수 있다.
  // (리액트처럼 패칭 받아오기)
  const [books, setBooks] = useState<BookData[]>([]);

  const router = useRouter();
  const q = router.query.q;
  const fetchSearchResult = async () => {
    const data = await fetchBooks(q as string);
    setBooks(data);
  };

  useEffect(() => {
    if (q) {
      fetchSearchResult();
    }
  }, [q]);

  return (
    <div>
      <Head>
        <title>한입북스 - 검색결과</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입북스 - 검색결과" />
        <meta
          property="og:description"
          content="한입 북스에 등록된 도서를 만나보세요."
        />
      </Head>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
