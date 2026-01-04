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
  const { data: course } = await supabase
    .from('courses')
    .select('title, description, image_url, tag')
    .eq('slug', params.slug)
    .single();

  if (!course) return {};

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${course.title} - AI 課程`,
    description: course.description,
    openGraph: {
      title: `${course.title} | Doris AI學院`,
      description: course.description,
      url: `https://doris-ai-academy.com/courses/${params.slug}`,
      images: [course.image_url, ...previousImages],
      type: 'website',
    },
  };
}

export default async function CourseDetailPage({ params }: { params: { slug: string } }) {
  const { data: course } = await supabase
    .from('courses')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (!course) return <CourseDetailClient initialCourse={null} slug={params.slug} />;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.description,
    provider: {
      '@type': 'Organization',
      name: 'Doris AI學院',
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
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: '首頁',
        item: 'https://doris-ai-academy.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: '熱門課程',
        item: 'https://doris-ai-academy.com/courses',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: course.title,
        item: `https://doris-ai-academy.com/courses/${params.slug}`,
      },
    ],
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
      <CourseDetailClient initialCourse={course} slug={params.slug} />
    </>
  );
}
