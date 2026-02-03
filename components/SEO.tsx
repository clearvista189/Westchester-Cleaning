
import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  type?: string;
  name?: string;
  image?: string;
  schema?: object;
}

const SEO: React.FC<SEOProps> = ({ title, description, keywords, type = 'website', name = 'ClearVista Cleaning', image, schema }) => {
  useEffect(() => {
    // Update Document Title
    document.title = `${title} | ${name}`;

    // Helper to update or create meta tags
    const updateMeta = (selector: string, attribute: string, value: string, content: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, value);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    updateMeta('meta[name="description"]', 'name', 'description', description);
    
    if (keywords) {
      updateMeta('meta[name="keywords"]', 'name', 'keywords', keywords);
    }
    
    // Open Graph
    updateMeta('meta[property="og:title"]', 'property', 'og:title', title);
    updateMeta('meta[property="og:description"]', 'property', 'og:description', description);
    updateMeta('meta[property="og:type"]', 'property', 'og:type', type);
    
    if (image) {
      updateMeta('meta[property="og:image"]', 'property', 'og:image', image);
    }

    // Schema.org JSON-LD
    if (schema) {
      const scriptId = 'json-ld-schema';
      let script = document.getElementById(scriptId) as HTMLScriptElement;
      
      if (!script) {
        script = document.createElement('script');
        script.id = scriptId;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.text = JSON.stringify(schema);

      // Cleanup on unmount is tricky if we navigate to a page without schema, 
      // but usually we want to keep the last valid schema or replace it.
      // We will leave it as the 'current page' schema.
    }
  }, [title, description, keywords, type, name, image, schema]);

  return null;
};

export default SEO;
