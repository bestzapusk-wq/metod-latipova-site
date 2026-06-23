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
        <div className="empty-state">
          Уроки этого курса скоро появятся.
        </div>
      ) : (
        course.lessons.map((lesson, i) => (
          <div key={i} className="lesson-card">
            <div className="lesson-card-top">
              <div className="lesson-card-title">{lesson.title}</div>
            </div>
            <div className="lesson-video">
              {lesson.youtubeId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${lesson.youtubeId}`}
                  title={lesson.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="lesson-video-placeholder">
                  Видео скоро появится
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
