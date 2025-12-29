const t = document.getElementById("textInput");

const w = document.getElementById("words");
const c = document.getElementById("chars");
const cns = document.getElementById("charsNoSpace");
const s = document.getElementById("sentences");
const p = document.getElementById("paragraphs");
const r = document.getElementById("readingTime");
const sp = document.getElementById("speakingTime");

// ---- Privacy-safe local analytics ----
const analyticsKey = "wordCounterStats";

function updateAnalytics(words) {
  const data = JSON.parse(localStorage.getItem(analyticsKey)) || {
    sessions: 0,
    totalWords: 0,
    lastVisit: Date.now()
  };

  if (Date.now() - data.lastVisit > 30 * 60 * 1000) {
    data.sessions += 1;
  }

  data.totalWords += words;
  data.lastVisit = Date.now();

  localStorage.setItem(analyticsKey, JSON.stringify(data));
}

// ✅ SINGLE updateStats() FUNCTION (FINAL)
function updateStats() {
  const text = t.value;

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;

  if (w) w.textContent = words;
  if (c) c.textContent = text.length;
  if (cns) cns.textContent = text.replace(/\s/g, "").length;
  if (s) s.textContent = text.split(/[.!?]+/).filter(x => x.trim()).length;
  if (p) p.textContent = text.split(/\n+/).filter(x => x.trim()).length;
  if (r) r.textContent = Math.ceil(words / 200) + " min";
  if (sp) sp.textContent = Math.ceil(words / 130) + " min";

  updateAnalytics(words);
}

// Live update
t.addEventListener("input", updateStats);
updateStats();

// Copy stats
const copyBtn = document.getElementById("copyStats");
if (copyBtn) {
  copyBtn.addEventListener("click", () => {
    const data =
`Words: ${w?.textContent}
Characters: ${c?.textContent}
No-space characters: ${cns?.textContent}
Sentences: ${s?.textContent}
Paragraphs: ${p?.textContent}
Reading time: ${r?.textContent}
Speaking time: ${sp?.textContent}`;

    navigator.clipboard.writeText(data);
    alert("Statistics copied to clipboard");
  });
}

// Dark mode
const toggle = document.getElementById("themeToggle");
if (toggle && localStorage.theme === "dark") {
  document.body.classList.add("dark");
  toggle.textContent = "☀️ Light Mode";
}

if (toggle) {
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    localStorage.theme = isDark ? "dark" : "light";
    toggle.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
  });
}

// FAQ Accordion Logic
document.querySelectorAll(".faq-question").forEach(btn => {
  btn.addEventListener("click", () => {
    const item = btn.parentElement;

    document.querySelectorAll(".faq-item").forEach(faq => {
      if (faq !== item) faq.classList.remove("active");
    });

    item.classList.toggle("active");
  });
});
