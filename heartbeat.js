// heartbeat.js – updates last_seen every 60 seconds
(function() {
    const SUPABASE_URL = 'https://oyeojlvrjhaymbhohxdq.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95ZW9qbHZyamhheW1iaG9oeGRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUzNzMxNDYsImV4cCI6MjA5MDk0OTE0Nn0.aL-Y0hXjfpSIfqnwX-CDhoYLu5fsaMZPr6wW_VxxYj8';

    const sb = window.supabase?.createClient?.(SUPABASE_URL, SUPABASE_KEY);
    if (!sb) return;

    setInterval(async () => {
        const stored = localStorage.getItem('aou_user');
        if (!stored) return;
        try {
            const user = JSON.parse(stored);
            if (user?.id) {
                await sb.from('users').update({ last_seen: new Date().toISOString() }).eq('id', user.id);
            }
        } catch (e) { /* ignore */ }
    }, 60000);
})();