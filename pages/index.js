import { useState } from "react";
import Link from "next/link";
import coursesData from "../data/courses.json";

const COMMUNITY_URL =
  process.env.NEXT_PUBLIC_COMMUNITY_URL || "https://t.me/your_community_link";

const MONTH_REWARDS = [
  {
    month: 1,
    title: 'Трекер "Путь к здоровью"',
    subtitle: "Чек-лист ежедневных привычек и прогресса.",
    image: "/rewards/month-1.png",
    unlocked: true,
  },
  {
    month: 2,
    title: "Консультация с врачом",
    subtitle: "Личная онлайн-сессия по текущим показателям.",
    image: "/rewards/month-2.png",
    unlocked: true,
  },
  {
    month: 3,
    title: "Мини-курс Детокс",
    subtitle: "Короткая программа мягкого восстановления.",
    image: "/rewards/month-3.png",
    unlocked: true,
  },
  {
    month: 4,
    title: "Чек-ап энергии",
    subtitle: "Разбор сна, стресса и фокуса с планом действий.",
    image: "/rewards/month-4.svg",
    unlocked: true,
  },
  {
    month: 5,
    title: "Секретный бонус",
    subtitle: "Откроется позже",
    image: "/rewards/secret.png",
    unlocked: false,
  },
  ...Array.from({ length: 7 }, (_, idx) => ({
    month: idx + 6,
    title: "Секретный бонус",
    subtitle: "Откроется позже",
    image: "/rewards/secret.png",
    unlocked: false,
  })),
];

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
  const [isRoadmapOpen, setIsRoadmapOpen] = useState(false);

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

      <div className="profile-shell">
        {/* Имя/фото можно подтянуть из Telegram.WebApp.initDataUnsafe.user */}
        <div className="profile-card">
          <div className="profile-avatar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="3.4" /><path d="M5 19c1.2-3.2 4-4.8 7-4.8s5.8 1.6 7 4.8" /></svg>
          </div>
          <div className="profile-main">
            <div className="profile-name">Алишер | Биохакинг</div>
            <span className="profile-status">Нонейм до 22.07.2026</span>
          </div>
          <button
            type="button"
            className={`profile-expand${isRoadmapOpen ? " open" : ""}`}
            onClick={() => setIsRoadmapOpen((prev) => !prev)}
            aria-expanded={isRoadmapOpen}
            aria-controls="roadmap-panel"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
          </button>
        </div>

        {isRoadmapOpen && (
          <section id="roadmap-panel" className="roadmap-panel">
            <div className="roadmap-progress-row">
              <span>Прогресс разблокировки</span>
              <strong>4 / 12</strong>
            </div>
            <div className="roadmap-track">
              <div className="roadmap-track-fill" />
            </div>
            <div className="roadmap-title">Подарки за продление</div>
            <p className="roadmap-subtitle">
              Каждый месяц подписки открывает новый уровень с подарком.
            </p>
            <div className="roadmap-slider">
              {MONTH_REWARDS.map((reward) => (
                <article
                  key={reward.month}
                  className={`roadmap-card${reward.unlocked ? "" : " locked"}`}
                >
                  <div className="roadmap-month">{reward.month} месяц</div>
                  {reward.unlocked ? (
                    <span className="roadmap-chip">Открыто</span>
                  ) : (
                    <span className="roadmap-chip locked">Секрет</span>
                  )}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={reward.image} alt={reward.title} className="roadmap-image" />
                  <div className="roadmap-card-title">{reward.title}</div>
                  <div className="roadmap-card-sub">{reward.subtitle}</div>
                </article>
              ))}
            </div>
          </section>
        )}
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
