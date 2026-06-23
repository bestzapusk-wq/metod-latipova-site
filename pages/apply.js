import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "../components/icons";
import { useTelegramUser } from "../hooks/useTelegramUser";

export default function ApplyPage() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState(null); // null | "loading" | "ok" | "error"
  const { user } = useTelegramUser();

  useEffect(() => {
    if (!user) return;
    const fullName = `${user.first_name} ${user.last_name || ""}`.trim();
    if (fullName) setName(fullName);
    if (user.username) setUsername(`@${user.username}`);
  }, [user]);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, username, comment }),
      });
      const data = await res.json();

      if (data.ok) {
        setStatus("ok");
        setName("");
        setUsername("");
        setComment("");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  }

  return (
    <div className="app">
      <Link href="/" className="back-link">
        <ArrowLeftIcon style={{ width: 16, height: 16 }} /> Назад
      </Link>

      <h1 className="page-title">База материалов</h1>
      <p className="page-intro">
        Оставь заявку, и мы добавим тебя в группу с материалами.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label className="form-label">Имя</label>
          <input
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label className="form-label">Юзернейм в Telegram</label>
          <input
            className="form-input"
            placeholder="@username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label className="form-label">Комментарий (необязательно)</label>
          <textarea
            className="form-textarea"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="submit-btn"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Отправляем..." : "Отправить заявку"}
        </button>

        {status === "ok" && (
          <div className="status-msg ok">Заявка отправлена! Мы скоро добавим тебя в группу.</div>
        )}
        {status === "error" && (
          <div className="status-msg error">
            Что-то пошло не так. Попробуй ещё раз чуть позже.
          </div>
        )}
      </form>
    </div>
  );
}
