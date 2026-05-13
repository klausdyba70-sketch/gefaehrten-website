import { notFound } from "next/navigation";
import ProgramPageClient from "@/components/ProgramPageClient";
import ContentPageClient from "@/components/ContentPageClient";
import client from "../../../tina/__generated__/client";
import { generatePageMetadata, generateCourseSchema, generateBreadcrumbSchema, generateVideoSchema } from "@/utils/seo";
import Schema from "@/components/Schema";
import { localizeTinaData } from "@/utils/tina-helper";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [settingsResponse] = await Promise.all([
    client.queries.settings({ relativePath: "index.json" })
  ]);

  const settingsData = localizeTinaData(settingsResponse.data.settings);

  try {
    const programResponse = await client.queries.seminars({ relativePath: `${slug}.mdx` });
    if (programResponse.data.seminars) {
      const seminarData = localizeTinaData(programResponse.data.seminars);
      return generatePageMetadata(
        seminarData.seo, 
        settingsData, 
        `/${slug}`
      );
    }
  } catch (e) {}

  try {
    const pageResponse = await client.queries.page({ relativePath: `${slug}.mdx` });
    if (pageResponse.data.page) {
      const pageData = localizeTinaData(pageResponse.data.page);
      return generatePageMetadata(
        pageData.seo, 
        settingsData, 
        `/${slug}`
      );
    }
  } catch (e) {}

  return {};
}

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Try finding a program first in Tina
  try {
    const [programResponse, settingsResponse] = await Promise.all([
      client.queries.seminars({ relativePath: `${slug}.mdx` }),
      client.queries.settings({ relativePath: "index.json" })
    ]);

    if (programResponse.data.seminars) {
      const seminar = localizeTinaData(programResponse.data.seminars);
      const settings = localizeTinaData(settingsResponse.data.settings);
      const siteUrl = settings?.siteMeta?.siteUrl || "https://gefaehrten.net";

      return (
        <>
          <Schema data={generateCourseSchema(seminar, settings)} />
          <Schema data={generateBreadcrumbSchema([
            { name: "Home", item: siteUrl },
            { name: seminar.category || "Seminar", item: `${siteUrl}/#angebot` },
            { name: seminar.title, item: `${siteUrl}/${slug}` }
          ])} />
          {seminar.videoSrc && (
            <Schema data={generateVideoSchema({
              name: seminar.title,
              description: seminar.intro?.summary || seminar.seo?.description,
              thumbnailUrl: `${siteUrl}/images/hero-forest.webp`, // Fallback thumbnail
              contentUrl: `${siteUrl}${seminar.videoSrc}`,
              uploadDate: "2024-01-01T08:00:00+08:00"
            })} />
          )}
          <ProgramPageClient 
            data={localizeTinaData(programResponse.data)} 
            query={programResponse.query} 
            variables={programResponse.variables} 
          />
        </>
      );
    }
  } catch (e) {
    // Not a seminar
  }

  // Then try finding a static content page in Tina
  try {
    const pageResponse = await client.queries.page({ relativePath: `${slug}.mdx` });
    if (pageResponse.data.page) {
      return (
        <ContentPageClient 
          data={localizeTinaData(pageResponse.data)} 
          query={pageResponse.query} 
          variables={pageResponse.variables} 
        />
      );
    }
  } catch (e) {
    // Not a page
  }

  notFound();
}

export async function generateStaticParams() {
  const seminars = await client.queries.seminarsConnection();
  const pages = await client.queries.pageConnection();
  
  const seminarParams = seminars.data.seminarsConnection.edges?.map((edge) => ({
    slug: edge?.node?._sys.filename,
  })) || [];

  const pageParams = pages.data.pageConnection.edges?.map((edge) => ({
    slug: edge?.node?._sys.filename,
  })) || [];
  
  return [...seminarParams, ...pageParams];
}

