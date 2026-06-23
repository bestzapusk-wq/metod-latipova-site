import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import coursesData from "../data/courses.json";
import { useTelegramUser } from "../hooks/useTelegramUser";
import { useBackButton } from "../hooks/useBackButton";
import { useInitData } from "../hooks/useInitData";

const DEFAULT_UNLOCKED_MONTHS = 0;

const COMMUNITY_URL =
  process.env.NEXT_PUBLIC_COMMUNITY_URL || "https://t.me/your_community_link";

const SECRET_LABELS = {
  4: "Крепкий орешек",
  5: "На драйве",
  6: "Глубина",
  7: "Точка невозврата",
  8: "Закалённый",
  9: "Мастер привычек",
  10: "Несокрушимый",
  11: "Легенда клуба",
  12: "Полный апгрейд",
};

const MONTH_REWARDS = [
  {
    month: 1,
    secret: false,
    label: "Разогрев",
    title: 'Трекер "Путь к здоровью"',
    image: "/rewards/month-1.png",
  },
  {
    month: 2,
    secret: false,
    label: "В ритме",
    title: "Консультация с врачом",
    image: "/rewards/month-2.png",
  },
  {
    month: 3,
    secret: false,
    label: "Второе дыхание",
    title: "Мини-курс Детокс",
    image: "/rewards/month-3.png",
  },
  ...Array.from({ length: 9 }, (_, idx) => {
    const month = idx + 4;
    return {
      month,
      secret: true,
      label: SECRET_LABELS[month],
      title: "Секретный бонус",
      image: "/rewards/secret.png",
    };
  }),
];

function formatMonthLabel(n) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 14) return `${n} месяцев`;
  if (mod10 === 1) return `${n} месяц`;
  if (mod10 >= 2 && mod10 <= 4) return `${n} месяца`;
  return `${n} месяцев`;
}

function getUserInitials(user) {
  if (!user) return "У";
  const first = user.first_name?.trim()?.[0] || "";
  const last = user.last_name?.trim()?.[0] || "";
  const initials = `${first}${last}`.toUpperCase();
  return initials || "У";
}

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
  const [unlockedMonths, setUnlockedMonths] = useState(DEFAULT_UNLOCKED_MONTHS);
  const roadmapSliderRef = useRef(null);
  const { user } = useTelegramUser();
  const initData = useInitData();
  useBackButton(false);

  const displayName = user
    ? `${user.first_name} ${user.last_name || ""}`.trim()
    : "Участник клуба";

  useEffect(() => {
    if (!initData) return;

    let cancelled = false;

    (async () => {
      try {
        const res = await fetch("/api/unlock", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ initData }),
        });
        if (!res.ok || cancelled) return;

        const data = await res.json();
        if (typeof data.unlockedMonths === "number" && !cancelled) {
          setUnlockedMonths(data.unlockedMonths);
        }
      } catch {
        // keep fallback
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [initData]);

  function handleRoadmapScroll() {
    const slider = roadmapSliderRef.current;
    if (!slider) return;
    slider.scrollBy({ left: slider.clientWidth * 0.8, behavior: "smooth" });
  }

  return (
    <div className="app">
      <div className="profile-shell">
        <div className="profile-card">
          <div className="profile-avatar">
            {user?.photo_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.photo_url} alt="" />
            ) : (
              <span className="profile-avatar-initials" aria-hidden="true">
                {getUserInitials(user)}
              </span>
            )}
          </div>
          <div className="profile-main">
            <div className="profile-name">{displayName}</div>
            <span className="profile-status">Доступ открыт</span>
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
              <strong>{unlockedMonths} / 12</strong>
            </div>
            <div className="roadmap-track">
              <div
                className="roadmap-track-fill"
                style={{ width: `${(unlockedMonths / 12) * 100}%` }}
              />
            </div>
            <h2 className="roadmap-title">Подарки за продление</h2>
            <p className="roadmap-subtitle">
              Каждые 30 дней подписки открывается новый уровень с подарком.
            </p>
            <div className="roadmap-slider" ref={roadmapSliderRef}>
              {MONTH_REWARDS.map((reward) => {
                const isLocked = reward.month > unlockedMonths;

                return (
                <article
                  key={reward.month}
                  className={`roadmap-card${isLocked ? " locked" : ""}`}
                >
                  <div className="roadmap-card-head">
                    <div className="roadmap-month">{formatMonthLabel(reward.month)}</div>
                    <span className={`roadmap-chip${isLocked ? " locked" : ""}`}>
                      {reward.label}
                    </span>
                    <h3 className="roadmap-card-title">
                      {reward.secret || isLocked ? "Секретный бонус" : reward.title}
                    </h3>
                  </div>
                  <div className={`roadmap-image-wrap${isLocked ? " secret" : ""}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={reward.image} alt={reward.title} className="roadmap-image" />
                    {isLocked && (
                      <svg
                        className="roadmap-lock-icon"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--accent-dark)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    )}
                  </div>
                </article>
                );
              })}
            </div>
            <div className="roadmap-scroll-hint">
              <div className="roadmap-scroll-line" aria-hidden="true">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="roadmap-scroll-dot">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </span>
                ))}
              </div>
              <button
                type="button"
                className="roadmap-scroll-btn"
                onClick={handleRoadmapScroll}
              >
                Прокрутите, чтобы увидеть все награды
                <span className="roadmap-scroll-chevron" aria-hidden="true">
                  ›
                </span>
              </button>
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

      <div className="section-label section-label-programs">Доступные программы</div>
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
