import Link from "next/link";
import coursesData from "../data/courses.json";

const COMMUNITY_URL =
  process.env.NEXT_PUBLIC_COMMUNITY_URL || "https://t.me/your_community_link";

const MONTH_REWARDS = [
  {
    month: 1,
    title: 'Трекер "Путь к здоровью"',
    subtitle: "Чек-лист ежедневных привычек и прогресса.",
    image: "/rewards/month-1.svg",
    unlocked: true,
  },
  {
    month: 2,
    title: "Консультация с врачом",
    subtitle: "Личная онлайн-сессия по текущим показателям.",
    image: "/rewards/month-2.svg",
    unlocked: true,
  },
  {
    month: 3,
    title: "Мини-курс Детокс",
    subtitle: "Короткая программа мягкого восстановления.",
    image: "/rewards/month-3.svg",
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
    image: "/rewards/month-5.svg",
    unlocked: false,
  },
  ...Array.from({ length: 7 }, (_, idx) => ({
    month: idx + 6,
    title: "Секретный бонус",
    subtitle: "Откроется позже",
    image: "",
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

      <section className="rewards-section">
        <div className="section-label">Подарки за продление</div>
        <p className="rewards-subtitle">
          Каждый месяц открывает новый уровень подарков и поддержку на весь год.
        </p>
        <div className="rewards-progress-row">
          <span>Прогресс разблокировки</span>
          <strong>4 / 12</strong>
        </div>
        <div className="rewards-progress-track">
          <div className="rewards-progress-fill" />
        </div>

        <details className="rewards-video">
          <summary>
            Видео: перспектива 12 месяцев в клубе
            <span className="rewards-video-hint">Нажмите, чтобы развернуть</span>
          </summary>
          <div className="rewards-video-body">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Перспектива годовой работы"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </details>

        <div className="rewards-grid">
          {MONTH_REWARDS.map((reward) => (
            <article
              key={reward.month}
              className={`reward-card${reward.unlocked ? "" : " locked"}`}
            >
              <header className="reward-head">
                <span>{reward.month} месяц</span>
                <small>{reward.unlocked ? "Открыто" : "Секрет"}</small>
              </header>
              {reward.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={reward.image} alt={reward.title} className="reward-image" />
              ) : (
                <div className="reward-image reward-image-placeholder">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="11" width="18" height="10" rx="2" />
                    <path d="M7 11V8a5 5 0 0 1 10 0v3" />
                  </svg>
                </div>
              )}
              <div className="reward-title">{reward.title}</div>
              <div className="reward-sub">{reward.subtitle}</div>
            </article>
          ))}
        </div>
      </section>

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
