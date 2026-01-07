import { supabase } from "@/lib/supabase";
import { Metadata, ResolvingMetadata } from 'next';
import CourseDetailClient from "@/components/course/CourseDetailClient";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const decodedSlug = decodeURIComponent(params.slug);
  const { data: course } = await supabase
    .from('courses')
    .select('title, description, image_url, tag')
    .eq('slug', decodedSlug)
    .single();

  if (!course) return {};

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${course.title} - AI 課程`,
    description: course.description,
    openGraph: {
      title: `${course.title} | Doris AI 學院`,
      description: course.description,
      url: `https://doris-ai-academy.com/courses/${params.slug}`,
      images: [course.image_url, ...previousImages],
      type: 'website',
    },
  };
}

export default async function CourseDetailPage({ params }: { params: { slug: string } }) {
  const decodedSlug = decodeURIComponent(params.slug);
  
  // 1. 抓取課程主表
  const { data: course } = await supabase
    .from('courses')
    .select('*')
    .eq('slug', decodedSlug)
    .single();

  if (!course) return <CourseDetailClient initialCourse={null} slug={decodedSlug} initialModules={[]} />;

  // 2. 抓取單元與課堂 (依 order_index 排序)
  const { data: modulesData } = await supabase
    .from('course_modules')
    .select(`
      *,
      lessons:course_lessons(*)
    `)
    .eq('course_id', course.id)
    .order('order_index', { ascending: true });

  const modules = modulesData?.map(m => ({
    ...m,
    lessons: (m.lessons || []).sort((a: any, b: any) => (a.order_index || 0) - (b.order_index || 0))
  })) || [];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.description,
    provider: {
      '@type': 'Organization',
      name: 'Doris AI 學院',
      sameAs: 'https://doris-ai-academy.com',
    },
    image: course.image_url,
    offers: {
      '@type': 'Offer',
      price: course.discount_price,
      priceCurrency: 'TWD',
      availability: 'https://schema.org/InStock',
    },
  };

  const breadcrumbLd = {
// ... (breadcrumbLd 保持不變)
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <CourseDetailClient 
        initialCourse={course} 
        slug={decodedSlug} 
        initialModules={modules} 
      />
    </>
  );
}
