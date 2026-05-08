import client from "../../../tina/__generated__/client";
import AnmeldenClient from "@/components/AnmeldenClient";
import { generatePageMetadata } from "@/utils/seo";
import { Suspense } from "react";

export async function generateMetadata() {
  const [response, settingsResponse] = await Promise.all([
    client.queries.anmelden({ relativePath: "index.json" }),
    client.queries.settings({ relativePath: "index.json" })
  ]);
  
  return generatePageMetadata(
    response.data.anmelden.seo, 
    settingsResponse.data.settings, 
    "/anmelden"
  );
}

export default async function AnmeldenPage() {
  const seminarsResponse = await client.queries.seminarsConnection();
  const programs = seminarsResponse.data.seminarsConnection.edges?.map((edge: any) => edge?.node) || [];

  let pageQuery = "";
  let pageVariables = {};
  let pageData = {};

  try {
    const response = await client.queries.anmelden({ relativePath: "index.json" });
    pageQuery = response.query;
    pageVariables = response.variables;
    pageData = response.data;
  } catch (e) {
    console.error("No anmelden data found");
  }

  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <AnmeldenClient 
        programs={programs} 
        query={pageQuery}
        variables={pageVariables}
        data={pageData}
      />
    </Suspense>
  );
}
