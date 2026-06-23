import { getSupabaseAdmin } from "../../lib/supabaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const lesson = req.query.lesson;
  if (!lesson || typeof lesson !== "string") {
    return res.status(400).json({ error: "lesson query param required" });
  }

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("comments")
      .select("id, tg_name, body, created_at")
      .eq("lesson_key", lesson)
      .eq("is_approved", true)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return res.status(200).json(data || []);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to load comments" });
  }
}
