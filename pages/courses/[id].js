import Link from "next/link";
import coursesData from "../../data/courses.json";

export function getStaticPaths() {
  return {
    paths: coursesData.courses.map((c) => ({ params: { id: c.id } })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  const course = coursesData.courses.find((c) => c.id === params.id);
  return { props: { course } };
}

export default function CoursePage({ course }) {
  return (
    <div className="app">
      <div className="topbar">
        <Link href="/" className="topbar-action">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          Назад
        </Link>
        <span className="topbar-logo">метод латипова</span>
        <span className="topbar-right">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.6" /><circle cx="12" cy="12" r="1.6" /><circle cx="19" cy="12" r="1.6" /></svg>
        </span>
      </div>

      <h1 className="page-title">{course.title}</h1>
      {course.subtitle && <p className="page-sub">{course.subtitle}</p>}

      {course.lessons.length === 0 ? (
        <div className="empty-state">Уроки этого курса скоро появятся.</div>
      ) : (
        course.lessons.map((lesson, i) => (
          <Link key={i} href={`/courses/${course.id}/${i + 1}`} className="lesson-row">
            <div className="lesson-row-thumb">
              {lesson.youtubeId ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={`https://img.youtube.com/vi/${lesson.youtubeId}/hqdefault.jpg`} alt="" />
              ) : (
                <div className="lesson-row-thumb-empty" />
              )}
              <div className="lesson-row-play">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="#fff"><path d="M6 4l14 8-14 8z" /></svg>
              </div>
            </div>
            <span className="lesson-row-title">{lesson.title}</span>
            <svg className="lesson-row-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
          </Link>
        ))
      )}
    </div>
  );
}
