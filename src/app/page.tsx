import client from "../../tina/__generated__/client";
import HomeClient from "@/components/HomeClient";
import { generatePageMetadata, generateReviewSchema, generateBreadcrumbSchema } from "@/utils/seo";
import Schema from "@/components/Schema";

export async function generateMetadata() {
  const [homepageResponse, settingsResponse] = await Promise.all([
    client.queries.homepage({ relativePath: "index.json" }),
    client.queries.settings({ relativePath: "index.json" })
  ]);
  
  return generatePageMetadata(
    homepageResponse.data.homepage.seo, 
    settingsResponse.data.settings, 
    "/"
  );
}

export default async function Home() {
  const [seminarsResponse, homepageResponse, settingsResponse] = await Promise.all([
    client.queries.seminarsConnection(),
    client.queries.homepage({ relativePath: "index.json" }),
    client.queries.settings({ relativePath: "index.json" })
  ]);
  
  const programs = seminarsResponse.data.seminarsConnection.edges?.map(edge => edge?.node) || [];
  const siteUrl = settingsResponse.data.settings?.siteMeta?.siteUrl || "https://gefaehrten.net";

  return (
    <>
      {homepageResponse.data.homepage.testimonials && (
        <Schema data={generateReviewSchema(homepageResponse.data.homepage.testimonials)} />
      )}
      <Schema data={generateBreadcrumbSchema([{ name: "Home", item: siteUrl }])} />
      <HomeClient programs={programs} homepageData={homepageResponse.data.homepage} />
    </>
  );
}
