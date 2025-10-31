import type { MetadataRoute } from "next";
import { promises as fs } from "fs";

const files = await fs.readdir(process.cwd() + "/app");
const slug = files
  .map((file) => {
    if (!file) return null;
    const slug = file.replace(/\.tsx?$/, "");
    return {
      url: `https://test.com/${slug}`,
      lastModified: new Date(),
      priority: 0.7,
    };
  })
  .filter(
    (p): p is { url: string; lastModified: Date; priority: number } =>
      p !== null,
  );

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://acme.com",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "https://acme.com/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...slug,
  ];
}
