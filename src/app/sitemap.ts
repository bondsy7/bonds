import { MetadataRoute } from "next";
import { projects } from "@/data/projects";

const baseUrl = "https://danielbonds.dev";

export default function sitemap(): MetadataRoute.Sitemap {
    const locales = ["en", "de"];

    const routes = [
        "",
        "/about",
        "/projects",
        "/expertise",
        "/hobbies",
        "/playground",
        "/contact"
    ];

    const sitemapEntries: MetadataRoute.Sitemap = [];

    // Static Routes for each locale
    locales.forEach(locale => {
        routes.forEach(route => {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}${route}`,
                lastModified: new Date(),
                changeFrequency: "monthly",
                priority: route === "" ? 1 : 0.8,
            });
        });
    });

    // Project Dynamic Routes
    locales.forEach(locale => {
        projects.forEach(project => {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}/projects/${project.slug}`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 0.7
            });
        });
    });

    return sitemapEntries;
}
