import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://doris-ai-academy.com';

  // 1. 獲取文章
  const { data: articles } = await supabase
    .from('articles')
    .select('slug, updated_at')
    .neq('status', '草稿');

  const articleUrls = (articles || []).map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: article.updated_at || new Date(),
  }));

  // 2. 獲取課程
  const { data: courses } = await supabase
    .from('courses')
    .select('slug, updated_at');

  const courseUrls = (courses || []).map((course) => ({
    url: `${baseUrl}/courses/${course.slug}`,
    lastModified: course.updated_at || new Date(),
  }));

  // 3. 獲取工具
  const { data: tools } = await supabase
    .from('tools')
    .select('slug, created_at');

  const toolUrls = (tools || []).map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: tool.created_at || new Date(),
  }));

  // 4. 靜態頁面
  const routes = ['', '/courses', '/blog', '/tools', '/services/consulting'].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
    })
  );

  return [...routes, ...articleUrls, ...courseUrls, ...toolUrls];
}

