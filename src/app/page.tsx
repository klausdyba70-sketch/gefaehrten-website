import client from "../../tina/__generated__/client";
import HomeClient from "@/components/HomeClient";
import { generatePageMetadata, generateReviewSchema, generateBreadcrumbSchema } from "@/utils/seo";
import Schema from "@/components/Schema";
import { localizeTinaData } from "@/utils/tina-helper";

export async function generateMetadata() {
  const [homepageResponse, settingsResponse] = await Promise.all([
    client.queries.homepage({ relativePath: "index.json" }),
    client.queries.settings({ relativePath: "index.json" })
  ]);
  
  const homepageData = localizeTinaData(homepageResponse.data.homepage);
  const settingsData = localizeTinaData(settingsResponse.data.settings);

  return generatePageMetadata(
    homepageData.seo, 
    settingsData, 
    "/"
  );
}

export default async function Home() {
  const [seminarsResponse, homepageResponse, settingsResponse] = await Promise.all([
    client.queries.seminarsConnection(),
    client.queries.homepage({ relativePath: "index.json" }),
    client.queries.settings({ relativePath: "index.json" })
  ]);
  
  const homepageData = localizeTinaData(homepageResponse.data.homepage);
  const programs = localizeTinaData(seminarsResponse.data.seminarsConnection.edges?.map(edge => edge?.node) || []);
  const settingsData = localizeTinaData(settingsResponse.data.settings);
  const siteUrl = settingsData?.siteMeta?.siteUrl || "https://gefaehrten.net";

  return (
    <>
      {homepageData.testimonials && (
        <Schema data={generateReviewSchema(homepageData.testimonials)} />
      )}
      <Schema data={generateBreadcrumbSchema([{ name: "Home", item: siteUrl }])} />
      <HomeClient programs={programs} homepageData={homepageData} />
    </>
  );
}

