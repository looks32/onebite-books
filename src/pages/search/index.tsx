import { ReactNode } from 'react';
import SearchableLayout from '../components/searchable-layout';

export default function Page() {
  return <div>검색페이지</div>;
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
