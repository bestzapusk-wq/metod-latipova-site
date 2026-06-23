import { getSupabaseAdmin } from "../../lib/supabaseAdmin";
import {
  getTelegramUserFromInitData,
  verifyTelegramInitData,
} from "../../lib/verifyTelegram";
import { calcUnlockedMonths } from "../../lib/unlock";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { initData } = req.body || {};
  const botToken = process.env.TELEGRAM_BOT_TOKEN;

  if (!initData || !botToken) {
    return res.status(400).json({ error: "initData required" });
  }

  if (!verifyTelegramInitData(initData, botToken)) {
    return res.status(401).json({ error: "Invalid initData" });
  }

  const user = getTelegramUserFromInitData(initData);
  if (!user?.id) {
    return res.status(400).json({ error: "User not found in initData" });
  }

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("subscriptions")
      .select("started_at")
      .eq("tg_user_id", user.id)
      .maybeSingle();

    if (error) throw error;

    if (!data?.started_at) {
      return res.status(200).json({ unlockedMonths: 0, startedAt: null });
    }

    const unlockedMonths = calcUnlockedMonths(data.started_at);

    return res.status(200).json({
      unlockedMonths,
      startedAt: data.started_at,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to load subscription" });
  }
}
