import client from "../../../tina/__generated__/client";
import AboutClient from "@/components/AboutClient";
import { generatePageMetadata } from "@/utils/seo";
import { localizeTinaData } from "@/utils/tina-helper";

export async function generateMetadata() {
  const [response, settingsResponse] = await Promise.all([
    client.queries.ueberuns({ relativePath: "index.json" }),
    client.queries.settings({ relativePath: "index.json" })
  ]);
  
  const ueberunsData = localizeTinaData(response.data.ueberuns);
  const settingsData = localizeTinaData(settingsResponse.data.settings);

  return generatePageMetadata(
    ueberunsData.seo, 
    settingsData, 
    "/ueber-uns"
  );
}

export default async function AboutPage() {
  let aboutData = null;
  let aboutQuery = "";
  let aboutVariables = {};
  
  try {
    const response = await client.queries.ueberuns({ relativePath: "index.json" });
    aboutData = localizeTinaData(response.data);
    aboutQuery = response.query;
    aboutVariables = response.variables;
  } catch (e) {
    console.error("No about data found, using defaults");
  }

  return (
    <AboutClient 
      data={aboutData} 
      query={aboutQuery} 
      variables={aboutVariables}
    />
  );
}

