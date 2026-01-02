import { useEffect, useState } from "react";
import supabase from "../supabase-client";

export function useAuth() {
  const [user, setUser] = useState<unknown | null>(null);
  const [session, setSession] = useState<unknown | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function init() {
      try {
        const { data } = await supabase.auth.getSession();
        if (!mounted) return;
        setSession(data.session ?? null);
        setUser(data.session?.user ?? null);
      } catch (err) {
        console.error("useAuth init error:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    init();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session ?? null);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      mounted = false;
      try {
        authListener?.subscription?.unsubscribe();
      } catch (e) {
        console.log(e);
      }
    };
  }, []);

  return { user, session, loading };
}
