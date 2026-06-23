import { getSupabaseAdmin } from "../../lib/supabaseAdmin";
import {
  getTelegramUserFromInitData,
  verifyTelegramInitData,
} from "../../lib/verifyTelegram";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { initData, lessonKey, body } = req.body || {};
  const botToken = process.env.TELEGRAM_BOT_TOKEN;

  if (!initData || !lessonKey || !body?.trim()) {
    return res.status(400).json({ error: "initData, lessonKey and body required" });
  }

  if (!botToken || !verifyTelegramInitData(initData, botToken)) {
    return res.status(401).json({ error: "Invalid initData" });
  }

  const user = getTelegramUserFromInitData(initData);
  if (!user?.id) {
    return res.status(400).json({ error: "User not found in initData" });
  }

  const tgName = [user.first_name, user.last_name].filter(Boolean).join(" ").trim()
    || user.username
    || "Участник";

  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("comments").insert({
      lesson_key: lessonKey,
      tg_user_id: user.id,
      tg_name: tgName,
      body: body.trim(),
      is_approved: false,
    });

    if (error) throw error;

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to save comment" });
  }
}
