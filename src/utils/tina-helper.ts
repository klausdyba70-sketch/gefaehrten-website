/**
 * Helper to replace Tina Cloud Media URLs with local paths.
 * This ensures that in production, we serve images from our own domain
 * to avoid third-party cookies and improve Lighthouse scores.
 */
export function localizeTinaData(data: any) {
  if (!data) return data;
  
  // Recursively process the data object
  const process = (obj: any): any => {
    if (typeof obj !== 'object' || obj === null) {
      if (typeof obj === 'string' && obj.startsWith('https://assets.tina.io/')) {
        // Extract the filename from the URL
        const parts = obj.split('/');
        const filename = decodeURIComponent(parts[parts.length - 1]);
        
        // Handle special folders like testimonials
        if (filename.includes('testimonial')) {
          return `/images/testimonials/${filename}`;
        }
        
        // If it's one of our renamed images, it's in /images/
        // We check for keywords to be more flexible with spaces/hyphens
        const isRenamed = filename.toLowerCase().includes('dariusz') || 
                          filename.toLowerCase().includes('dahlmann') || 
                          filename.toLowerCase().includes('gefaehrten');

        if (isRenamed) {
          return `/images/${filename}`;
        }
        
        return `/images/tina/${filename}`;
      }
      return obj;
    }
    
    if (Array.isArray(obj)) {
      return obj.map(process);
    }
    
    const newObj: any = {};
    for (const key in obj) {
      newObj[key] = process(obj[key]);
    }
    return newObj;
  };
  
  return process(data);
}
