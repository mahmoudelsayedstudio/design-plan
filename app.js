"use strict";
const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const KEY = "collage-plan.v2";
const AR = "٠١٢٣٤٥٦٧٨٩";
const arDigits = (n) => String(n).replace(/\d/g, (d) => AR[Number(d)]);

const courses = [
  { id: "fund", name: "أساسيات التصميم", source: "أحمد حمدي، ٦١ دقيقة", url: "https://www.youtube.com/watch?v=4IJPI0d7STI", color: "cp-c-terra" },
  { id: "color", name: "نظرية اللون", source: "فات جرافيكس، ٢٦ دقيقة", url: "https://www.youtube.com/watch?v=Vk7apgX3PAs", color: "cp-c-teal" },
  { id: "color-book", name: "ملخص كتاب تفاعل اللون", source: "فات جرافيكس، ٤ أجزاء، ٢٩ دقيقة", url: "https://www.youtube.com/watch?v=KiRN63rfb3U", color: "cp-c-ochre" },
  { id: "grid-types", name: "أنواع الجريد", source: "فات جرافيكس، ١٨ دقيقة", url: "https://www.youtube.com/watch?v=V_cGBPtBGhI", color: "cp-c-ink" },
  { id: "layout-1", name: "أسرار اللاي آوت، الجزء الأول", source: "فات جرافيكس", url: "https://www.youtube.com/watch?v=RcQtd1eUGuk", color: "cp-c-olive" },
  { id: "layout-2", name: "أسرار اللاي آوت، الجزء التاني", source: "فات جرافيكس", url: "https://www.youtube.com/watch?v=dfi5at7wWQI", color: "cp-c-terra" },
  { id: "grid-book", name: "ملخص كتاب أنظمة الجريد", source: "فات جرافيكس، ٤ أجزاء، ٤١ دقيقة", url: "https://www.youtube.com/watch?v=THSz2aw26fU", color: "cp-c-teal" },
  { id: "maher", name: "درس الجريد واللاي آوت", source: "أحمد ماهر، حوالي ساعتين", url: "https://www.youtube.com/watch?v=nqSq8CvXj4s", color: "cp-c-ochre" },
  { id: "indesign", name: "الجريد الموديولار في إنديزاين", source: "فات جرافيكس، ٣٤ دقيقة", url: "https://www.youtube.com/watch?v=j-2gcxnahds", color: "cp-c-ink" },
  { id: "typo-book", name: "ملخص كتاب التفكير في التايبوجرافي", source: "فات جرافيكس، ٤ أجزاء، ٣٧ دقيقة", url: "https://www.youtube.com/watch?v=1ZAZ6OEb_r4", color: "cp-c-olive" },
  { id: "typo-design", name: "التايبوجرافي في التصميم", source: "فات جرافيكس، ٢٠ دقيقة", url: "https://www.youtube.com/watch?v=iMrXclwIIdI", color: "cp-c-terra" },
  { id: "rafeeq", name: "ورشة التايبوجرافي العربي", source: "ستوديو رفيق، جزأين، الأول ٧٦ دقيقة", url: "https://www.youtube.com/playlist?list=PL4nPafUQJuXDSL-PDFA3s4uhaSywrzavr", color: "cp-c-teal" },
  { id: "fg-id-1", name: "سلسلة البراند آيدينتيتي، جزء ١", source: "فات جرافيكس، السلسلة ١١٢ دقيقة", url: "https://www.youtube.com/watch?v=4p87PLwFExI", color: "cp-c-ochre" },
  { id: "fg-id-2", name: "سلسلة البراند آيدينتيتي، جزء ٢", source: "فات جرافيكس", url: "https://www.youtube.com/watch?v=nXTPt_eVJCY", color: "cp-c-ochre" },
  { id: "fg-id-3", name: "سلسلة البراند آيدينتيتي، جزء ٣", source: "فات جرافيكس", url: "https://www.youtube.com/watch?v=Ty1BzoXWbQc", color: "cp-c-ochre" },
  { id: "fg-id-4", name: "سلسلة البراند آيدينتيتي، جزء ٤", source: "فات جرافيكس", url: "https://www.youtube.com/watch?v=BsfeMgYBDXQ", color: "cp-c-ochre" },
  { id: "artdir", name: "الآرت دايركشن", source: "أورانج سكوير، ٢٤ دقيقة", url: "https://www.youtube.com/watch?v=hFEtBCczEAI", color: "cp-c-ink" },
  { id: "kamal", name: "كورس البراند آيدينتيتي", source: "كمال وحيد، ١٣ حلقة، اللينك أول حلقة", url: "https://www.youtube.com/watch?v=mruszp9VPEY", color: "cp-c-olive" },
  { id: "yaser", name: "كورس إليستريتور", source: "ياسر سامي، ساعة و٥٥ دقيقة", url: "https://www.youtube.com/watch?v=xi1ierdIux4", color: "cp-c-terra" },
  { id: "qadri", name: "كورس إليستريتور المكثف", source: "قدري المنشاوي، ساعتين و٥٥ دقيقة", url: "https://www.youtube.com/watch?v=RDTeysmgYiA", color: "cp-c-teal" },
  { id: "hwthr", name: "كورس الهوية المكثف، اختياري", source: "هوثر، ٦ ساعات و٤٩ دقيقة", url: "https://www.youtube.com/watch?v=lbbxs7vbMQY", color: "cp-c-ochre" },
  { id: "calligraphy", name: "الخط العربي للهويات، اختياري", source: "جرافيكس أكاديمي، ١١ درس", url: "https://graphics-academy.com/courses/arabic-calligraphy-design/", color: "cp-c-ink" }
];
const courseById = Object.fromEntries(courses.map((c) => [c.id, c]));

const days = [
  { id: "d01", iso: "2026-11-28", date: "سبت ٢٨ نوفمبر", title: "أساسيات التصميم ونظرية اللون", detail: "فيديو أساسيات التصميم لأحمد حمدي، ٦١ دقيقة، وبعده فيديو نظرية اللون من فات جرافيكس، ٢٦ دقيقة. أول يوم، ٨٧ دقيقة بالظبط.", courseIds: ["fund", "color"], kind: "study" },
  { id: "d02", iso: "2026-11-29", date: "حد ٢٩ نوفمبر", title: "تفاعل اللون وأول الجريد", detail: "ملخص كتاب تفاعل اللون، ٤ أجزاء، ٢٩ دقيقة، وبعده فيديو أنواع الجريد، ١٨ دقيقة، وأول جزء من أسرار اللاي آوت. لينك الملخص أول جزء، وباقي الأجزاء مرقمة على القناة.", courseIds: ["color-book", "grid-types", "layout-1"], kind: "study" },
  { id: "d03", iso: "2026-11-30", date: "اتنين ٣٠ نوفمبر", title: "أنظمة الجريد وأسرار اللاي آوت", detail: "ملخص كتاب أنظمة الجريد، ٤ أجزاء، ٤١ دقيقة، وتاني جزء من أسرار اللاي آوت. لينك الملخص أول جزء.", courseIds: ["grid-book", "layout-2"], kind: "study" },
  { id: "d04", iso: "2026-12-01", date: "تلات ١ ديسمبر", title: "درس الجريد لأحمد ماهر، النص الأول", detail: "الدرس حوالي ساعتين، مقسوم على يومين. النهارده أول ساعة.", courseIds: ["maher"], kind: "study" },
  { id: "d05", iso: "2026-12-02", date: "أربع ٢ ديسمبر", title: "درس أحمد ماهر، النص التاني", detail: "كمّل تاني ساعة من الدرس، وطبّق بإيدك: ارسم جريد لتصميم قديم عندك.", courseIds: ["maher"], kind: "study" },
  { id: "d06", iso: "2026-12-03", date: "خميس ٣ ديسمبر", title: "الجريد الموديولار وبداية التايبوجرافي", detail: "فيديو الجريد الموديولار في إنديزاين، ٣٤ دقيقة، وبعده فيديو التايبوجرافي في التصميم، ٢٠ دقيقة. يوم خفيف.", courseIds: ["indesign", "typo-design"], kind: "study" },
  { id: "d07", iso: "2026-12-04", date: "جمعة ٤ ديسمبر", title: "راحة", detail: "يوم راحة، خد نفسك.", courseIds: [], kind: "rest" },
  { id: "d08", iso: "2026-12-05", date: "سبت ٥ ديسمبر", title: "التفكير في التايبوجرافي", detail: "ملخص كتاب التفكير في التايبوجرافي، ٤ أجزاء، ٣٧ دقيقة. لينك الملخص أول جزء. بعدها طبّق: اكتب اسمك ب٣ خطوط مختلفة وقارن بينهم.", courseIds: ["typo-book"], kind: "study" },
  { id: "d09", iso: "2026-12-06", date: "حد ٦ ديسمبر", title: "ورشة التايبوجرافي العربي، الجزء الأول", detail: "ورشة ستوديو رفيق، الجزء الأول ٧٦ دقيقة. اللينك قائمة التشغيل فيها الجزأين.", courseIds: ["rafeeq"], kind: "study" },
  { id: "d10", iso: "2026-12-07", date: "اتنين ٧ ديسمبر", title: "ورشة رفيق، الجزء التاني", detail: "كمّل الجزء التاني من الورشة، وطبّق على كلمة عربية من اختيارك.", courseIds: ["rafeeq"], kind: "study" },
  { id: "d11", iso: "2026-12-08", date: "تلات ٨ ديسمبر", title: "سلسلة البراند آيدينتيتي، جزء ١ و٢", detail: "أول جزأين من سلسلة فات جرافيكس، حوالي ٥٦ دقيقة.", courseIds: ["fg-id-1", "fg-id-2"], kind: "study" },
  { id: "d12", iso: "2026-12-09", date: "أربع ٩ ديسمبر", title: "سلسلة البراند آيدينتيتي، جزء ٣ و٤", detail: "آخر جزأين من السلسلة، وبعدهم فيديو الآرت دايركشن من أورانج سكوير، ٢٤ دقيقة.", courseIds: ["fg-id-3", "fg-id-4", "artdir"], kind: "study" },
  { id: "d13", iso: "2026-12-10", date: "خميس ١٠ ديسمبر", title: "كورس كمال وحيد، حلقات ١ لـ ٣", detail: "بداية كورس البراند آيدينتيتي لكمال وحيد، وهو الكورس الأساسي في الهوية. اللينك أول حلقة، والحلقات مرقمة على قناته.", courseIds: ["kamal"], kind: "study" },
  { id: "d14", iso: "2026-12-11", date: "جمعة ١١ ديسمبر", title: "راحة", detail: "يوم راحة، خد نفسك.", courseIds: [], kind: "rest" },
  { id: "d15", iso: "2026-12-12", date: "سبت ١٢ ديسمبر", title: "كمال وحيد، حلقات ٤ لـ ٦", detail: "تكملة الكورس. لو الحلقات أطول من ٩٠ دقيقة في اليوم، سيب الباقي ليوم الاحتياطي.", courseIds: ["kamal"], kind: "study" },
  { id: "d16", iso: "2026-12-13", date: "حد ١٣ ديسمبر", title: "كمال وحيد، حلقات ٧ لـ ٩", detail: "تكملة الكورس.", courseIds: ["kamal"], kind: "study" },
  { id: "d17", iso: "2026-12-14", date: "اتنين ١٤ ديسمبر", title: "كمال وحيد، حلقات ١٠ لـ ١٣", detail: "آخر حلقات الكورس. لو محتاج وقت زيادة، يوم بكرة احتياطي.", courseIds: ["kamal"], kind: "study" },
  { id: "d18", iso: "2026-12-15", date: "تلات ١٥ ديسمبر", title: "يوم احتياطي", detail: "لو يوم فاتك، لحقه النهارده. لو ماشي كويس، اتفرج على أول درسين من كورس الخط العربي الاختياري، أو ابدأ كورس هوثر الاختياري.", courseIds: [], kind: "rest" },
  { id: "d19", iso: "2026-12-16", date: "أربع ١٦ ديسمبر", title: "إليستريتور مع ياسر سامي، النص الأول", detail: "الكورس ساعة و٥٥ دقيقة، مقسوم على يومين. النهارده أول ساعة.", courseIds: ["yaser"], kind: "study" },
  { id: "d20", iso: "2026-12-17", date: "خميس ١٧ ديسمبر", title: "ياسر سامي، النص التاني", detail: "كمّل باقي الكورس، وطبّق على شكل بسيط من الخيال.", courseIds: ["yaser"], kind: "study" },
  { id: "d21", iso: "2026-12-18", date: "جمعة ١٨ ديسمبر", title: "راحة", detail: "يوم راحة، خد نفسك.", courseIds: [], kind: "rest" },
  { id: "d22", iso: "2026-12-19", date: "سبت ١٩ ديسمبر", title: "إليستريتور مع قدري المنشاوي، الجزء الأول", detail: "الكورس ساعتين و٥٥ دقيقة، مقسوم على يومين. النهارده أول ٩٠ دقيقة.", courseIds: ["qadri"], kind: "study" },
  { id: "d23", iso: "2026-12-20", date: "حد ٢٠ ديسمبر", title: "قدري المنشاوي، الجزء التاني", detail: "كمّل باقي الكورس، حوالي ٨٥ دقيقة.", courseIds: ["qadri"], kind: "study" },
  { id: "d24", iso: "2026-12-21", date: "اتنين ٢١ ديسمبر", title: "المشروع: البريف والمود بورد", detail: "اختار براند خيالي، اكتب بريف من ٥ سطور، واعمل مود بورد للألوان والشكل العام.", courseIds: [], kind: "project" },
  { id: "d25", iso: "2026-12-22", date: "تلات ٢٢ ديسمبر", title: "المشروع: سكتشات اللوجو والخط العربي", detail: "سكتشات لوجو بالقلم، وجرب تايبوجرافي عربي لاسم البراند زي ورشة رفيق.", courseIds: [], kind: "project" },
  { id: "d26", iso: "2026-12-23", date: "أربع ٢٣ ديسمبر", title: "المشروع: الألوان والتطبيقات", detail: "حدد باليت الألوان بناء على نظرية اللون، وطبّق الهوية على ٣ حاجات: كارت، بوست، وغلاف.", courseIds: [], kind: "project" },
  { id: "d27", iso: "2026-12-24", date: "خميس ٢٤ ديسمبر", title: "المشروع: التجميع والنشر", detail: "جمّع الشغل في صفحة عرض واحدة وانشره على بيهانس. آخر يوم في الخطة.", courseIds: [], kind: "project" }
];

const rules = [
  "جلسة واحدة بس في اليوم، ساعة ونص كحد أقصى.",
  "كل يوم موضوع مختلف عشان متزهقش.",
  "الجمعة راحة كل أسبوع، ومفيهاش تفاوض.",
  "لو زهقت في جلسة، وقف وكمّل بكرة.",
  "يوم ١٥ ديسمبر احتياطي للحق أي حاجة فاتتك.",
  "لو حلقات كمال وحيد طلعت أطول من يومها، كمّلها في يوم الاحتياطي.",
  "آخر ٤ أيام مشروع صغير تطبّق فيه كل اللي اتعلمته."
];

let state = {};
try { state = JSON.parse(localStorage.getItem(KEY) || "{}") || {}; } catch (e) { state = {}; }
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} };
const todayIso = new Date().toLocaleDateString("en-CA");
const tapes = ["cp-tape-terra", "cp-tape-teal", "cp-tape-ochre", "cp-tape-pink"];
const el = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; };

function dayCard(day, i) {
  const done = !!state[day.id];
  const card = el("article", "cp-day reveal cp-kind-" + day.kind);
  card.id = "card-" + day.id;
  card.style.setProperty("--rr", (i % 2 === 0 ? ".7deg" : "-.9deg"));
  card.style.setProperty("--rx", (i % 2 === 0 ? "42px" : "-42px"));
  card.style.setProperty("--d", Math.min(i % 4, 3) * 70 + "ms");
  if (done) card.classList.add("is-done");
  const tape = el("span", "cp-tape " + tapes[i % tapes.length]); tape.setAttribute("aria-hidden", "true"); card.appendChild(tape);
  if (day.iso === todayIso) card.appendChild(el("span", "cp-today", "النهارده"));
  if (done) card.appendChild(el("span", "cp-stamp", "خلصت")).setAttribute("aria-hidden", "true");
  const row = el("div", "cp-day-row");
  const btn = el("button", "cp-check" + (done ? " is-done" : ""));
  btn.type = "button";
  btn.setAttribute("aria-pressed", String(done));
  btn.setAttribute("aria-label", day.date + ": " + (done ? "اتعلم كمكتمل، دوس للتراجع" : "علّم اليوم كمكتمل"));
  btn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 12.8l4.8 4.7L19.5 6.2"/></svg>';
  btn.addEventListener("click", () => toggle(day, btn, card));
  row.appendChild(btn);
  const body = el("div", "cp-day-body");
  body.appendChild(el("span", "cp-date", day.date));
  body.appendChild(el("h3", "cp-day-title", day.title));
  body.appendChild(el("p", "cp-day-detail", day.detail));
  if (day.courseIds.length) {
    const links = el("div", "cp-day-links");
    for (const cid of day.courseIds) {
      const c = courseById[cid];
      const a = el("a", "cp-courselink"); a.href = c.url; a.target = "_blank"; a.rel = "noopener noreferrer";
      const dot = el("span", "cp-dot " + c.color); dot.setAttribute("aria-hidden", "true");
      a.appendChild(dot);
      a.appendChild(el("span", "file-hover-underline", "لينك " + c.name));
      const arr = el("span", "cp-arrow", "↗"); arr.setAttribute("aria-hidden", "true"); a.appendChild(arr);
      links.appendChild(a);
    }
    body.appendChild(links);
  }
  row.appendChild(body);
  card.appendChild(row);
  return card;
}

const pCount = document.getElementById("pCount"), pPct = document.getElementById("pPct"),
      pFill = document.getElementById("pFill"), pBar = document.getElementById("pBar"),
      resetBtn = document.getElementById("resetBtn");
const total = days.length;
let shownPct = 0, confirmReset = false;

function countUp(from, to) {
  if (REDUCED || from === to) { pPct.textContent = arDigits(to) + "٪"; shownPct = to; return; }
  const t0 = performance.now(), dur = 500;
  const step = (t) => {
    const p = Math.min(1, (t - t0) / dur);
    shownPct = Math.round(from + (to - from) * p);
    pPct.textContent = arDigits(shownPct) + "٪";
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function updateProgress() {
  const n = days.filter((d) => state[d.id]).length;
  const pct = Math.round((n / total) * 100);
  pCount.textContent = n === 0 ? "لسه في الأول" : "خلصت " + arDigits(n) + " من " + arDigits(total) + " يوم";
  pBar.setAttribute("aria-valuenow", String(pct));
  pFill.style.width = pct + "%";
  countUp(shownPct, pct);
  resetBtn.hidden = n === 0;
}

function burst(anchor) {
  if (REDUCED) return;
  const r = anchor.getBoundingClientRect();
  const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
  const colors = ["#c95f4a", "#4e8a80", "#dfa32c", "#f2b8ad", "#7f9c7d"];
  for (let i = 0; i < 12; i++) {
    const p = el("span", "cp-confetti");
    const s = 6 + Math.random() * 8;
    p.style.cssText = "left:" + cx + "px;top:" + cy + "px;width:" + s + "px;height:" + (s * .7) + "px;background:" + colors[i % colors.length];
    document.body.appendChild(p);
    const ang = Math.random() * Math.PI * 2, dist = 50 + Math.random() * 90;
    const dx = Math.cos(ang) * dist, dy = Math.sin(ang) * dist - 40;
    const anim = p.animate(
      [{ transform: "translate(-50%,-50%) rotate(0deg)", opacity: 1 },
       { transform: "translate(calc(-50% + " + dx + "px), calc(-50% + " + (dy + 70) + "px)) rotate(" + (Math.random() * 540 - 270) + "deg)", opacity: 0 }],
      { duration: 700 + Math.random() * 400, easing: "cubic-bezier(.2,.7,.3,1)" });
    anim.onfinish = () => p.remove();
  }
}

function toggle(day, btn, card) {
  const now = !state[day.id];
  if (now) state[day.id] = true; else delete state[day.id];
  save();
  btn.classList.toggle("is-done", now);
  btn.setAttribute("aria-pressed", String(now));
  btn.setAttribute("aria-label", day.date + ": " + (now ? "اتعلم كمكتمل، دوس للتراجع" : "علّم اليوم كمكتمل"));
  card.classList.toggle("is-done", now);
  const old = card.querySelector(".cp-stamp");
  if (old) old.remove();
  if (now) { const st = el("span", "cp-stamp", "خلصت"); st.setAttribute("aria-hidden", "true"); card.appendChild(st); burst(btn); }
  updateProgress();
}

resetBtn.addEventListener("click", () => {
  if (!confirmReset) { confirmReset = true; resetBtn.textContent = "متأكد؟ دوس تاني"; return; }
  state = {}; save(); confirmReset = false; resetBtn.textContent = "ابدأ من الأول";
  document.querySelectorAll(".cp-day").forEach((c) => { c.classList.remove("is-done"); const s = c.querySelector(".cp-stamp"); if (s) s.remove(); });
  document.querySelectorAll(".cp-check").forEach((b, i) => {
    b.classList.remove("is-done"); b.setAttribute("aria-pressed", "false");
    b.setAttribute("aria-label", days[i].date + ": علّم اليوم كمكتمل");
  });
  updateProgress();
});

/* render */
const weekBounds = [["week1", 0, 7], ["week2", 7, 14], ["week3", 14, 21], ["week4", 21, days.length]];
for (const [wid, a, b] of weekBounds) {
  days.slice(a, b).forEach((d, i) => document.getElementById(wid).appendChild(dayCard(d, i + a)));
}
rules.forEach((rule, i) => {
  const li = el("li", "cp-rule reveal", rule);
  li.style.setProperty("--rr", (i % 2 === 0 ? "-.9deg" : ".7deg"));
  li.style.setProperty("--d", Math.min(i, 3) * 70 + "ms");
  document.getElementById("rulesGrid").appendChild(li);
});
courses.forEach((c, i) => {
  const a = el("a", "cp-course reveal"); a.href = c.url; a.target = "_blank"; a.rel = "noopener noreferrer";
  a.style.setProperty("--rr", (i % 2 === 0 ? ".7deg" : "-.9deg"));
  a.style.setProperty("--d", Math.min(i, 3) * 70 + "ms");
  const dot = el("span", "cp-dot " + c.color); dot.setAttribute("aria-hidden", "true"); a.appendChild(dot);
  const body = el("span", "cp-course-body");
  body.appendChild(el("span", "cp-course-name file-hover-underline", c.name));
  body.appendChild(el("span", "cp-course-source", c.source));
  a.appendChild(body);
  a.appendChild(el("span", "cp-course-open", "افتح ↗"));
  document.getElementById("courseList").appendChild(a);
});
updateProgress();

/* collage background shapes + parallax */
const bg = document.getElementById("bg");
const shapeDefs = [
  { cls: "shape-tape", style: "background:rgb(201 95 74/.75)", top: "6%", right: "4%", rot: 24, speed: .18 },
  { cls: "shape-circle", style: "width:74px;height:74px;border-color:#4e8a80", top: "18%", left: "3%", rot: 0, speed: -.12 },
  { cls: "shape-dot", style: "width:26px;height:26px;background:#dfa32c", top: "32%", right: "7%", rot: 0, speed: .3 },
  { cls: "shape-scrap", style: "width:88px;height:64px", top: "44%", left: "2%", rot: -8, speed: .22 },
  { cls: "shape-tape", style: "background:rgb(78 138 128/.72)", top: "58%", right: "2%", rot: -35, speed: -.18 },
  { cls: "shape-dot", style: "width:18px;height:18px;background:#c95f4a", top: "70%", left: "8%", rot: 0, speed: .34 },
  { cls: "shape-circle", style: "width:52px;height:52px;border-color:#dfa32c", top: "82%", right: "10%", rot: 0, speed: -.1 },
  { cls: "shape-scrap", style: "width:64px;height:48px;background:#fdf0e8", top: "90%", left: "12%", rot: 12, speed: .26 },
  { cls: "shape-svg", top: "12%", left: "14%", rot: -12, speed: .14, svg: '<svg width="60" height="60" viewBox="0 0 60 60" fill="none" stroke="#33292a" stroke-width="2.5" stroke-linecap="round"><circle cx="18" cy="42" r="7"/><circle cx="42" cy="42" r="7"/><path d="M22 36 46 8M38 36 14 8"/></svg>' },
  { cls: "shape-svg", top: "66%", right: "16%", rot: 8, speed: -.16, svg: '<svg width="52" height="52" viewBox="0 0 52 52" fill="#dfa32c" opacity=".8"><path d="M26 2l5 16 16-5-11 13 11 13-16-5-5 16-5-16-16 5 11-13L5 13l16 5z"/></svg>' }
];
const shapes = shapeDefs.map((d) => {
  const s = el("span", "shape " + d.cls);
  s.style.top = d.top;
  if (d.right) s.style.right = d.right; else s.style.left = d.left;
  if (d.style) s.style.cssText += d.style;
  if (d.svg) s.innerHTML = d.svg;
  s.dataset.speed = d.speed; s.dataset.rot = d.rot;
  bg.appendChild(s);
  return s;
});
function placeShapes(y) {
  for (const s of shapes) {
    const sp = parseFloat(s.dataset.speed), rot = s.dataset.rot;
    s.style.transform = REDUCED ? "rotate(" + rot + "deg)" : "translate3d(0," + (-y * sp).toFixed(1) + "px,0) rotate(" + rot + "deg)";
  }
}
placeShapes(window.scrollY || 0);
if (!REDUCED) {
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => { placeShapes(window.scrollY || 0); ticking = false; });
  }, { passive: true });
}

/* reveal on scroll */
const all = document.querySelectorAll(".reveal");
if (REDUCED || !("IntersectionObserver" in window)) {
  all.forEach((n) => n.classList.add("in"));
} else {
  const io = new IntersectionObserver((es) => {
    for (const e of es) if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }, { threshold: .12, rootMargin: "0px 0px -6% 0px" });
  all.forEach((n) => io.observe(n));
            }
