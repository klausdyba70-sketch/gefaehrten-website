import client from "../../../tina/__generated__/client";
import ContentPageClient from "@/components/ContentPageClient";
import { notFound } from "next/navigation";

export default async function DatenschutzPage() {
  try {
    const response = await client.queries.page({ relativePath: "datenschutz.mdx" });
    return (
      <ContentPageClient 
        data={response.data} 
        query={response.query} 
        variables={response.variables} 
      />
    );
  } catch (e) {
    notFound();
  }
}
