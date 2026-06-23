import Link from "next/link";
import coursesData from "../../../data/courses.json";

export function getStaticPaths() {
  const paths = [];
  coursesData.courses.forEach((course) => {
    course.lessons.forEach((_, i) => {
      paths.push({ params: { id: course.id, lesson: String(i + 1) } });
    });
  });
  return { paths, fallback: false };
}

export function getStaticProps({ params }) {
  const course = coursesData.courses.find((c) => c.id === params.id);
  const index = parseInt(params.lesson, 10) - 1;
  const lesson = course.lessons[index];
  const next = course.lessons[index + 1] || null;

  return {
    props: {
      courseId: course.id,
      courseTitle: course.title,
      lesson,
      lessonNumber: index + 1,
      totalLessons: course.lessons.length,
      next: next
        ? { number: index + 2, title: next.title, youtubeId: next.youtubeId || null }
        : null,
    },
  };
}

export default function LessonPage({
  courseId,
  courseTitle,
  lesson,
  lessonNumber,
  totalLessons,
  next,
}) {
  return (
    <div className="app">
      <div className="topbar">
        <Link href={`/courses/${courseId}`} className="topbar-action">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          {courseTitle}
        </Link>
        <span className="topbar-logo">метод латипова</span>
        <span className="topbar-right">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.6" /><circle cx="12" cy="12" r="1.6" /><circle cx="19" cy="12" r="1.6" /></svg>
        </span>
      </div>

      <div className="lesson-video lesson-video-hero">
        {lesson.youtubeId ? (
          <iframe
            src={`https://www.youtube.com/embed/${lesson.youtubeId}`}
            title={lesson.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="lesson-video-placeholder">Видео скоро появится</div>
        )}
      </div>

      <h1 className="lesson-hero-title">{lesson.title}</h1>
      <p className="lesson-hero-meta">
        Урок {lessonNumber} из {totalLessons}
      </p>

      {next ? (
        <>
          <div className="section-label">Следующий урок</div>
          <Link href={`/courses/${courseId}/${next.number}`} className="lesson-row next-lesson-row">
            <div className="lesson-row-thumb">
              {next.youtubeId ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={`https://img.youtube.com/vi/${next.youtubeId}/hqdefault.jpg`} alt="" />
              ) : (
                <div className="lesson-row-thumb-empty" />
              )}
              <div className="lesson-row-play">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="#fff"><path d="M6 4l14 8-14 8z" /></svg>
              </div>
            </div>
            <span className="lesson-row-title">{next.title}</span>
            <svg className="lesson-row-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
          </Link>
        </>
      ) : (
        <div className="empty-state">
          Это был последний урок курса «{courseTitle}». 🎉
        </div>
      )}
    </div>
  );
}
