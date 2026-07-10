import JournalPage from '../page';
import { journals } from '@/data/journals';

export async function generateStaticParams() {
  return journals.map((article) => ({
    id: article.id,
  }));
}

export default function JournalArticlePage() {
  return <JournalPage />;
}
