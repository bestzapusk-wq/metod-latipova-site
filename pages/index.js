import Link from "next/link";
import coursesData from "../data/courses.json";

const COMMUNITY_URL =
  process.env.NEXT_PUBLIC_COMMUNITY_URL || "https://t.me/your_community_link";

function ImagePlaceholder({ title }) {
  return (
    <div className="tile-placeholder">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
      <span>обложка скоро</span>
      <strong>{title}</strong>
    </div>
  );
}

export default function Home() {
  return (
    <div className="app">
      <div className="topbar">
        <span className="topbar-action">✕ Закрыть</span>
        <span className="topbar-logo">метод латипова</span>
        <span className="topbar-right">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.6" /><circle cx="12" cy="12" r="1.6" /><circle cx="19" cy="12" r="1.6" /></svg>
        </span>
      </div>

      {/* Карточка профиля — пока статичная, без проверки подписки.
          Имя/фото можно подтянуть из Telegram.WebApp.initDataUnsafe.user, когда понадобится. */}
      <div className="profile-card">
        <div className="profile-avatar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="3.4" /><path d="M5 19c1.2-3.2 4-4.8 7-4.8s5.8 1.6 7 4.8" /></svg>
        </div>
        <div>
          <div className="profile-name">Участник клуба</div>
          <span className="profile-status">Доступ открыт</span>
        </div>
      </div>

      <div className="actions-grid">
        <Link href="/apply" className="action-btn">
          <svg className="action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5.5h16v10H9.5L5 19v-3.5H4z" /></svg>
          <span className="action-label">База материалов</span>
        </Link>

        <a href={COMMUNITY_URL} target="_blank" rel="noreferrer" className="action-btn">
          <svg className="action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11v2a2 2 0 0 0 2 2h1l1.4 4.2a1 1 0 0 0 1.9-.6L8.6 15H10l8 4V5l-8 4H5a2 2 0 0 0-2 2Z" /></svg>
          <span className="action-label">Сообщество</span>
        </a>
      </div>

      <div className="section-label">Курсы</div>
      <div className="courses-grid">
        {coursesData.courses.map((course) => (
          <Link
            key={course.id}
            href={`/courses/${course.id}`}
            className={`course-tile${course.cover ? "" : " no-cover"}`}
          >
            {course.cover ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img className="course-tile-image" src={course.cover} alt={course.title} />
            ) : (
              <ImagePlaceholder title={course.title} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
