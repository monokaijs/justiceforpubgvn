import type { MetadataRoute } from "next";
import { languages } from "@/lib/language";
import { indexablePages, pageUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return indexablePages.flatMap((page) => languages.map((language) => ({ url: pageUrl(language, page) })));
}
