import { Metadata } from "next";

export function generatePageMetadata(seoData: any, globalSettings: any, path: string): Metadata {
  const siteUrl = globalSettings?.siteMeta?.siteUrl || "https://gefaehrten.net";
  const siteName = globalSettings?.siteMeta?.siteName || "Gefährten";
  const defaultDesc = globalSettings?.siteMeta?.defaultDescription || "Ein Begleiter auf dem Weg der Heilung.";
  const defaultOg = globalSettings?.siteMeta?.defaultOgImage || "/images/og-default.jpg";

  const fullUrl = `${siteUrl}${path === "/" ? "" : path}`;
  
  const title = seoData?.title 
    ? `${seoData.title} | ${siteName}` 
    : siteName;
    
  const description = seoData?.description || defaultDesc;
  const ogImage = seoData?.ogImage || defaultOg;

  return {
    title,
    description,
    alternates: {
      canonical: seoData?.canonical || fullUrl,
    },
    robots: {
      index: !seoData?.noIndex,
      follow: !seoData?.noIndex,
    },
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
        },
      ],
      locale: "de_DE",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export function generateOrganizationSchema(settings: any) {
  const siteUrl = settings?.siteMeta?.siteUrl || "https://gefaehrten.net";
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": settings?.address?.name || "Gefährten",
    "url": siteUrl,
    "logo": `${siteUrl}/images/logo.png`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": settings?.contactPhone,
      "contactType": "customer service",
      "email": settings?.contactEmail
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": settings?.address?.street,
      "addressLocality": settings?.address?.city?.split(" ")[1] || settings?.address?.city,
      "postalCode": settings?.address?.city?.split(" ")[0],
      "addressCountry": "DE"
    },
    "sameAs": [
      settings?.socials?.instagram,
      settings?.socials?.facebook,
      "https://www.linkedin.com/in/dariusz-dyba-6b2a4a1b/" // Example, can be made dynamic
    ].filter(Boolean)
  };
}

export function generateCourseSchema(program: any, settings: any) {
  const siteUrl = settings?.siteMeta?.siteUrl || "https://gefaehrten.net";
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": program.title,
    "description": program.intro?.summary || program.seo?.description,
    "provider": {
      "@type": "Organization",
      "name": settings?.address?.name || "Gefährten",
      "sameAs": siteUrl
    },
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "onsite",
      "instructor": {
        "@type": "Person",
        "name": "Dariusz Dyba",
        "sameAs": "https://www.linkedin.com/in/dariusz-dyba-6b2a4a1b/"
      }
    }
  };
}

export function generateBreadcrumbSchema(items: { name: string, item: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.item
    }))
  };
}

export function generateVideoSchema(videoData: any) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": videoData.name,
    "description": videoData.description,
    "thumbnailUrl": videoData.thumbnailUrl,
    "uploadDate": videoData.uploadDate || "2024-01-01T08:00:00+08:00",
    "contentUrl": videoData.contentUrl,
    "embedUrl": videoData.embedUrl
  };
}

export function generateReviewSchema(testimonials: any[]) {
  return testimonials.map(t => ({
    "@context": "https://schema.org",
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": t.name
    },
    "reviewBody": t.quote,
    "itemReviewed": {
      "@type": "Organization",
      "name": "Gefährten"
    }
  }));
}
