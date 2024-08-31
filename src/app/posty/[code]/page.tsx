import { getArticleDetails, getArticlesList } from "@/api/api_methods";
import { ArticleListSchema } from "@/consts/articles/types";
import Article from "@/app/posty/[code]/_components/article";
import { Suspense } from "react";

export async function generateStaticParams() {
  const articles: ArticleListSchema[] = await getArticlesList();
  const unique_codes = Array.from(
    new Set(articles.map((article) => article.code)),
  );

  return unique_codes.flatMap((code) => {
    return {
      code: code,
    };
  });
}

export default async function Page({ params }: { params: { code: string } }) {
  const article_localized_data = {
    pl: await getArticleDetails(params.code, "pl"),
    en: await getArticleDetails(params.code, "en"),
  };
  return (
    <Suspense>
      <Article article_localized_data={article_localized_data} />;
    </Suspense>
  );
}
