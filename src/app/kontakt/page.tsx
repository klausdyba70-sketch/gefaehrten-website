import client from "../../../tina/__generated__/client";
import KontaktClient from "@/components/KontaktClient";
import { generatePageMetadata } from "@/utils/seo";

export async function generateMetadata() {
  const [response, settingsResponse] = await Promise.all([
    client.queries.kontakt({ relativePath: "index.json" }),
    client.queries.settings({ relativePath: "index.json" })
  ]);
  
  return generatePageMetadata(
    response.data.kontakt.seo, 
    settingsResponse.data.settings, 
    "/kontakt"
  );
}

export default async function KontaktPage() {
  let kontaktData = null;
  let kontaktQuery = "";
  let kontaktVariables = {};
  
  try {
    const kontaktResponse = await client.queries.kontakt({ relativePath: "index.json" });
    kontaktData = kontaktResponse.data;
    kontaktQuery = kontaktResponse.query;
    kontaktVariables = kontaktResponse.variables;
  } catch (e) {
    console.error("No kontakt data found, using defaults");
  }

  const settingsResponse = await client.queries.settings({ relativePath: "index.json" });

  return (
    <KontaktClient 
      data={kontaktData} 
      query={kontaktQuery} 
      variables={kontaktVariables}
      settings={settingsResponse.data.settings}
    />
  );
}
