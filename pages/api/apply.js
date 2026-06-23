import { sendTelegramMessage } from "../../lib/telegram";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const { name, username, comment } = req.body || {};

  if (!name || !username) {
    return res
      .status(400)
      .json({ ok: false, error: "Заполни имя и юзернейм" });
  }

  const text =
    `📩 <b>Новая заявка в "Базу материалов"</b>\n\n` +
    `Имя: ${escapeHtml(name)}\n` +
    `Юзернейм: ${escapeHtml(username)}\n` +
    `Комментарий: ${escapeHtml(comment || "—")}`;

  try {
    await sendTelegramMessage(text);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: "Не удалось отправить заявку" });
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
