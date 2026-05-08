import { MetadataRoute } from 'next';
import client from "../../tina/__generated__/client";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = "https://gefaehrten.net";

  // Fetch all seminars
  const seminarsResponse = await client.queries.seminarsConnection();
  const seminars = seminarsResponse.data.seminarsConnection.edges?.map(edge => ({
    url: `${siteUrl}/${edge?.node?._sys.filename}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  })) || [];

  // Static pages
  const routes = ['', '/ueber-uns', '/anmelden', '/kontakt', '/impressum', '/datenschutz'].map(
    (route) => ({
      url: `${siteUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : 0.5,
    })
  );

  return [...routes, ...seminars];
}
