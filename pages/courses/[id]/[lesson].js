import { useState, useEffect } from "react";
import Link from "next/link";
import coursesData from "../../../data/courses.json";
import { useBackButton } from "../../../hooks/useBackButton";
import { useInitData } from "../../../hooks/useInitData";

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

function formatCommentDate(iso) {
  try {
    return new Date(iso).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

export default function LessonPage({
  courseId,
  courseTitle,
  lesson,
  lessonNumber,
  totalLessons,
  next,
}) {
  useBackButton(true, `/courses/${courseId}`);
  const initData = useInitData();
  const lessonKey = `${courseId}-${lessonNumber}`;

  const [comments, setComments] = useState([]);
  const [commentsStatus, setCommentsStatus] = useState("loading");
  const [commentBody, setCommentBody] = useState("");
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch(
          `/api/comments?lesson=${encodeURIComponent(lessonKey)}`
        );
        if (!res.ok) throw new Error("fetch failed");

        const data = await res.json();
        if (cancelled) return;

        if (!Array.isArray(data) || data.length === 0) {
          setComments([]);
          setCommentsStatus("empty");
        } else {
          setComments(data);
          setCommentsStatus("ok");
        }
      } catch {
        if (!cancelled) setCommentsStatus("error");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [lessonKey]);

  async function handleCommentSubmit(e) {
    e.preventDefault();
    if (!initData || !commentBody.trim()) return;

    setSubmitStatus("loading");

    try {
      const res = await fetch("/api/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          initData,
          lessonKey,
          body: commentBody.trim(),
        }),
      });
      const data = await res.json();

      if (data.ok) {
        setCommentBody("");
        setSubmitStatus("ok");
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    }
  }

  return (
    <div className="app">
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

      <section className="comments-section">
        <div className="section-label">Комментарии</div>

        {commentsStatus === "loading" && (
          <p className="comments-hint">Загружаем комментарии…</p>
        )}
        {commentsStatus === "error" && (
          <p className="comments-hint">Не удалось загрузить комментарии.</p>
        )}
        {commentsStatus === "empty" && (
          <p className="comments-hint">Пока нет комментариев.</p>
        )}
        {commentsStatus === "ok" && (
          <div className="comments-list">
            {comments.map((comment) => (
              <article key={comment.id} className="comment-card">
                <div className="comment-author">{comment.tg_name}</div>
                <p className="comment-body">{comment.body}</p>
                <time className="comment-date" dateTime={comment.created_at}>
                  {formatCommentDate(comment.created_at)}
                </time>
              </article>
            ))}
          </div>
        )}

        {initData ? (
          <form onSubmit={handleCommentSubmit}>
            <div className="form-field">
              <textarea
                className="form-textarea"
                placeholder="Напишите комментарий…"
                value={commentBody}
                onChange={(e) => setCommentBody(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="submit-btn"
              disabled={submitStatus === "loading"}
            >
              {submitStatus === "loading" ? "Отправляем…" : "Отправить"}
            </button>
            {submitStatus === "ok" && (
              <div className="status-msg ok">
                Комментарий отправлен на модерацию
              </div>
            )}
            {submitStatus === "error" && (
              <div className="status-msg error">
                Не удалось отправить. Попробуйте ещё раз.
              </div>
            )}
          </form>
        ) : (
          <p className="comments-hint">
            Комментарии доступны в приложении Telegram
          </p>
        )}
      </section>
    </div>
  );
}
