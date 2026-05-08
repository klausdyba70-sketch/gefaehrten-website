import client from "../../../tina/__generated__/client";
import AboutClient from "@/components/AboutClient";
import { generatePageMetadata } from "@/utils/seo";

export async function generateMetadata() {
  const [response, settingsResponse] = await Promise.all([
    client.queries.ueberuns({ relativePath: "index.json" }),
    client.queries.settings({ relativePath: "index.json" })
  ]);
  
  return generatePageMetadata(
    response.data.ueberuns.seo, 
    settingsResponse.data.settings, 
    "/ueber-uns"
  );
}

export default async function AboutPage() {
  let aboutData = null;
  let aboutQuery = "";
  let aboutVariables = {};
  
  try {
    const response = await client.queries.ueberuns({ relativePath: "index.json" });
    aboutData = response.data;
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
