(function () {
  const site = window.SITE;
  const app = document.querySelector("#app");

  if (!site || !app) {
    if (app) {
      app.innerHTML = "<p class='noscript'>Add a SITE object in js/content.js to fill this page.</p>";
    }
    return;
  }

  const state = {
    kind: "All",
    query: "",
    step: 0,
    answers: [],
    openId: "",
    chartOpen: -1,
    checks: loadChecks()
  };

  document.title = plain(site.campaign.title) + " · " + plain(site.org.name);

  render();
  bind();
  requestAnimationFrame(paintBars);

  function render() {
    const banner = site.templateMode && !sessionStorage.getItem("gtsdg-hide-banner")
      ? `<div class="template-banner">
          <div class="wrap">
            <p>Template. Replace bracketed text in <strong>js/content.js</strong>. Finished writing: <strong data-wordcount>0</strong> words. Bracketed lines are not counted. Target range: 1,200–2,000. Set <strong>templateMode</strong> to false to hide this bar.</p>
            <button class="banner-dismiss" type="button" data-action="dismiss-banner">Hide</button>
          </div>
        </div>`
      : "";

    app.innerHTML = `
      ${banner}
      <header class="site-header">
        <div class="wrap header-inner">
          <a class="brand" href="#top">
            <span class="mark" aria-hidden="true"><i></i></span>
            <span>${esc(site.org.name)}</span>
          </a>
          <button class="menu-btn" type="button" aria-expanded="false" aria-controls="nav">Menu</button>
          <nav id="nav" class="nav" aria-label="Page">
            <a href="#issue">Issue</a>
            <a href="#evidence">Evidence</a>
            <a href="#connections">Connections</a>
            <a href="#audience">Audience</a>
            <a href="#resources">Resources</a>
            <a href="#involved">Get involved</a>
            <a href="#watch">Watch</a>
          </nav>
        </div>
      </header>
      <div class="hero" id="top">
        <div class="wrap hero-grid">
          <div>
            <p class="kicker" data-count>${esc(site.campaign.kicker)}</p>
            <h1 data-count>${esc(site.campaign.title)}</h1>
            <p class="lede prose" data-count>${esc(site.campaign.lede)}</p>
            <div class="hero-actions">
              <a class="btn btn-gold" href="#resources">See resources</a>
              <a class="btn btn-ghost" href="#involved">Find a way in</a>
            </div>
            <div class="meta-row">
              <span class="chip" data-count>${esc(site.campaign.audienceLabel)}</span>
              ${site.connections.sdgs.map((sdg) => `<span class="chip">SDG ${esc(sdg.number)}</span>`).join("")}
            </div>
          </div>
          <aside class="hero-panel">
            <p class="panel-index">01</p>
            <div>
              <p class="kicker">Speaking as</p>
              <p data-count>${esc(site.org.voice)}</p>
            </div>
          </aside>
        </div>
      </div>
      <main id="content">
        ${issueSection()}
        ${evidenceSection()}
        ${connectionsSection()}
        ${audienceSection()}
        ${resourcesSection()}
        ${relevanceSection()}
        ${involvedSection()}
        ${videoSection()}
      </main>
      <footer class="site-footer">
        <div class="wrap">
          <h2 data-count>${esc(site.footer.close)}</h2>
          <div class="footer-row">
            <p data-count>${esc(site.footer.credits)}${contactLink()}</p>
            ${site.templateMode ? `<p>Finished writing: <strong data-wordcount>0</strong> words. Target range: 1,200–2,000.</p>` : ""}
          </div>
          <p class="fine">${esc(site.footer.note)}</p>
        </div>
      </footer>
    `;
    updateWordCount();
    paintBars();
  }

  function issueSection() {
    return `
      <section class="section" id="issue">
        <div class="wrap">
          <div class="section-head">
            <span class="index">01</span>
            <h2>${esc(site.issue.heading)}</h2>
          </div>
          <div class="split">
            <div>
              <hr class="pull-rule">
              <blockquote class="pull" data-count>${esc(site.issue.pull)}</blockquote>
            </div>
            <div>${paragraphs(site.issue.paragraphs)}</div>
          </div>
        </div>
      </section>`;
  }

  function evidenceSection() {
    const points = site.evidence.points.map((point) => `
      <article class="stat">
        <b data-count>${esc(point.figure)}</b>
        <span data-count>${esc(point.label)}</span>
        <p class="source" data-count>${esc(point.source)}</p>
      </article>`).join("");

    const max = Math.max(...site.evidence.chart.points.map((p) => Number(p.value) || 0), 0);
    const bars = site.evidence.chart.points.map((point, i) => {
      const value = point.value === null || point.value === undefined || point.value === "" ? null : Number(point.value);
      const width = value === null || !max ? 0 : Math.max(0, Math.min(100, (value / max) * 100));
      const shown = value === null || Number.isNaN(value) ? "—" : String(value);
      const open = state.chartOpen === i;
      return `
        <div>
          <button class="bar-btn" type="button" data-action="chart" data-index="${i}" aria-expanded="${open}">
            <span class="bar-label"><span data-count>${esc(point.label)}</span><span>${esc(shown)}</span></span>
            <span class="track" aria-hidden="true"><span class="fill" data-width="${width}"></span></span>
          </button>
          ${open ? `<p class="bar-note" data-count>${esc(point.note)}</p>` : ""}
        </div>`;
    }).join("");

    return `
      <section class="section" id="evidence">
        <div class="wrap">
          <div class="section-head">
            <span class="index">02</span>
            <h2>${esc(site.evidence.heading)}</h2>
          </div>
          <p class="section-intro prose" data-count>${esc(site.evidence.intro)}</p>
          <div class="stat-grid">${points}</div>
          ${paragraphs(site.evidence.paragraphs)}
          <div class="chart">
            <h3 data-count>${esc(site.evidence.chart.title)}</h3>
            <p class="prose" data-count>${esc(site.evidence.chart.caption)}</p>
            <div class="bars">${bars}</div>
          </div>
        </div>
      </section>`;
  }

  function connectionsSection() {
    const sdgs = site.connections.sdgs.map((sdg, i) => {
      const id = "sdg-" + i;
      const open = state.openId === id;
      return `
        <article class="sdg">
          <button class="sdg-btn" type="button" data-action="toggle" data-id="${id}" aria-expanded="${open}">
            <span class="num">${esc(sdg.number)}</span>
            <span><small>UN Sustainable Development Goal</small><br><strong data-count>${esc(sdg.name)}</strong></span>
            <span class="chev" aria-hidden="true"></span>
          </button>
          ${open ? `<p class="expand" data-count>${esc(sdg.note)}</p>` : ""}
        </article>`;
    }).join("");

    const priorities = site.connections.nextPlan.priorities.map((item, i) => {
      const id = "plan-" + i;
      const open = state.openId === id;
      return `
        <article class="priority">
          <button class="priority-btn" type="button" data-action="toggle" data-id="${id}" aria-expanded="${open}">
            <span class="num">${String(i + 1).padStart(2, "0")}</span>
            <span><small>Sustainability Next</small><br><strong data-count>${esc(item.name)}</strong></span>
            <span class="chev" aria-hidden="true"></span>
          </button>
          ${open ? `<p class="expand" data-count>${esc(item.note)}</p>` : ""}
        </article>`;
    }).join("");

    return `
      <section class="section" id="connections">
        <div class="wrap">
          <div class="section-head">
            <span class="index">03</span>
            <h2>${esc(site.connections.heading)}</h2>
          </div>
          <p class="section-intro prose" data-count>${esc(site.connections.intro)}</p>
          <div class="connection-layout">
            <div class="sdg-grid">${sdgs}</div>
            <div>
              <p class="next-summary prose" data-count>${esc(site.connections.nextPlan.summary)}</p>
              ${priorities}
            </div>
          </div>
        </div>
      </section>`;
  }

  function audienceSection() {
    return `
      <section class="section" id="audience">
        <div class="wrap">
          <div class="section-head">
            <span class="index">04</span>
            <h2>${esc(site.audience.heading)}</h2>
          </div>
          <article class="audience-card">
            <p class="kicker">Written for</p>
            <h3 data-count>${esc(site.audience.name)}</h3>
            ${paragraphs(site.audience.paragraphs)}
          </article>
        </div>
      </section>`;
  }

  function resourcesSection() {
    const kinds = ["All", ...new Set(site.resources.map((item) => item.kind).filter(Boolean))];
    const filters = kinds.map((kind) => `
      <button class="filter" type="button" data-action="filter" data-kind="${esc(kind)}" aria-pressed="${state.kind === kind}">
        ${esc(kind)}
      </button>`).join("");
    const visible = filteredResources();

    const cards = visible.length
      ? visible.map((item) => resourceCard(item)).join("")
      : `<p class="empty">No resources match this filter yet. Add one in the resources array, or clear the search.</p>`;

    const adder = site.templateMode
      ? `<article class="card add-card"><div><strong>Add a resource</strong><p>Copy an object in the resources array in js/content.js. Kinds already on this page: ${esc(kinds.filter((k) => k !== "All").join(", ") || "any label you choose")}.</p></div></article>`
      : "";

    return `
      <section class="section" id="resources">
        <div class="wrap">
          <div class="section-head">
            <span class="index">05</span>
            <h2>${esc(site.resourcesIntro.heading)}</h2>
          </div>
          <p class="section-intro prose" data-count>${esc(site.resourcesIntro.lede)}</p>
          <div class="toolbar">
            <div class="filters" role="group" aria-label="Filter resources">${filters}</div>
            <label class="search">
              <span>Search</span>
              <input type="search" data-action="search" value="${esc(state.query)}" placeholder="Name, tag, or organizer" autocomplete="off">
            </label>
          </div>
          <p class="count-line" aria-live="polite">${visible.length} ${visible.length === 1 ? "resource" : "resources"} to look through</p>
          <div class="card-grid" id="resource-grid">${cards}${adder}</div>
        </div>
      </section>`;
  }

  function resourceCard(item) {
    const href = safeUrl(item.href);
      const link = href
      ? `<a class="btn btn-navy" href="${esc(href)}">${esc(item.hrefLabel || "Open")}</a>`
      : `<button class="btn btn-line" type="button" disabled>${esc(item.hrefLabel || "Add a link")}</button>`;
    const tags = (item.tags || []).map((tag) => `<span class="tag" data-count>${esc(tag)}</span>`).join("");
    return `
      <article class="card" id="${esc(item.id)}">
        <p class="kind">${esc(item.kind)}</p>
        <h3 data-count>${esc(item.name)}</h3>
        <p class="organizer" data-count>${esc(item.organizer)}</p>
        <p class="prose" data-count>${esc(item.summary)}</p>
        <p class="why-label">Why it matters</p>
        <p class="prose" data-count>${esc(item.why)}</p>
        <p class="why-label">Next step</p>
        <p class="prose" data-count>${esc(item.action)}</p>
        ${link}
        <div class="tags">${tags}</div>
      </article>`;
  }

  function relevanceSection() {
    return `
      <section class="section" id="relevance">
        <div class="wrap">
          <div class="section-head">
            <span class="index">06</span>
            <h2>${esc(site.relevance.heading)}</h2>
          </div>
          ${paragraphs(site.relevance.paragraphs)}
        </div>
      </section>`;
  }

  function involvedSection() {
    const items = site.actions.items.map((item) => {
      const href = safeUrl(item.href);
      const link = href
        ? `<a class="btn btn-line" href="${esc(href)}">${esc(item.hrefLabel || "Go")}</a>`
        : "";
      const checked = state.checks.includes(item.id);
      return `
        <div class="action ${checked ? "is-done" : ""}">
          <label>
            <input type="checkbox" data-action="check" data-id="${esc(item.id)}" ${checked ? "checked" : ""}>
            <span>
              <h3>${esc(item.title)}</h3>
              <p>${esc(item.detail)}</p>
            </span>
          </label>
          ${link}
        </div>`;
    }).join("");

    return `
      <section class="section" id="involved">
        <div class="wrap">
          <div class="section-head">
            <span class="index">07</span>
            <h2>${esc(site.actions.heading)}</h2>
          </div>
          <p class="section-intro prose" data-count>${esc(site.actions.intro)}</p>
          <div class="involve">
            <div class="action-list">${items}</div>
            <div class="matcher" id="matcher">${matcherHtml()}</div>
          </div>
        </div>
      </section>`;
  }

  function matcherHtml() {
    const questions = site.matcher.questions || [];
    if (state.step >= questions.length) {
      return matcherResult(questions);
    }
    const question = questions[state.step];
    const options = question.options.map((option, index) => `
      <button class="option" type="button" data-action="answer" data-index="${index}">${esc(option.label)}</button>
    `).join("");
    const back = state.step > 0
      ? `<button class="btn btn-line" type="button" data-action="matcher-back">Back</button>`
      : `<span></span>`;
    return `
      <p class="progress">Question ${state.step + 1} of ${questions.length}</p>
      <h3 data-count>${esc(site.matcher.title)}</h3>
      ${state.step === 0 ? `<p class="prose">${esc(site.matcher.intro)}</p>` : ""}
      <p>${esc(question.prompt)}</p>
      <div class="options">${options}</div>
      <div class="matcher-nav">${back}</div>`;
  }

  function matcherResult(questions) {
    const scores = {};
    state.answers.forEach((answer, index) => {
      const id = answer.resourceId;
      scores[id] = (scores[id] || 0) + index + 1;
    });
    const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const winnerId = ranked.length ? ranked[0][0] : "";
    const resource = site.resources.find((item) => item.id === winnerId);
    const because = [...state.answers].reverse().find((answer) => answer.resourceId === winnerId);
    const href = resource ? safeUrl(resource.href) : "";

    if (!resource) {
      return `
        <p class="progress">A place to start</p>
        <h3>Link the answers to a resource</h3>
        <p>The matcher points at “${esc(winnerId)}”, and that id is not in the resources array. Match each option’s resourceId to a resource id in js/content.js.</p>
        <button class="btn btn-line" type="button" data-action="matcher-reset">Start again</button>`;
    }

    return `
      <div class="result">
        <p class="progress">Start here</p>
        <h3 data-count>${esc(resource.name)}</h3>
        <p class="organizer">${esc(resource.kind)} · ${esc(resource.organizer)}</p>
        <p data-count>${esc(because ? because.because : resource.why)}</p>
        <p class="because" data-count>${esc(resource.action)}</p>
        <div class="hero-actions">
          ${href ? `<a class="btn btn-navy" href="${esc(href)}">${esc(resource.hrefLabel || "Open")}</a>` : `<a class="btn btn-navy" href="#${esc(resource.id)}">Read the listing</a>`}
          <button class="btn btn-line" type="button" data-action="matcher-reset">Try different answers</button>
        </div>
      </div>`;
  }

  function videoSection() {
    const embed = embedUrl(site.video.url);
    const frame = embed
      ? `<iframe src="${esc(embed)}" title="${esc(site.video.title)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
      : `<div class="video-placeholder">
          <div class="play" aria-hidden="true"><i></i></div>
          <strong>Video placeholder</strong>
          <p>Paste a YouTube or Vimeo link into video.url in js/content.js. The film will play in this frame.</p>
        </div>`;
    const direct = !embed && safeUrl(site.video.url)
      ? `<p><a href="${esc(safeUrl(site.video.url))}">Open the video</a></p>`
      : "";

    return `
      <section class="section" id="watch">
        <div class="wrap">
          <div class="section-head">
            <span class="index">08</span>
            <h2>${esc(site.video.heading)}</h2>
          </div>
          <div class="video-layout">
            <div class="video-frame">${frame}</div>
            <div class="video-copy">
              <h3 data-count>${esc(site.video.title)}</h3>
              <p data-count>${esc(site.video.caption)}</p>
              ${direct}
              <details class="transcript">
                <summary>Transcript</summary>
                <p data-count>${esc(site.video.transcript)}</p>
              </details>
            </div>
          </div>
        </div>
      </section>`;
  }

  function bind() {
    document.addEventListener("click", onClick);
    document.addEventListener("input", onInput);
    document.addEventListener("change", onChange);
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }

  function onClick(event) {
    const menuBtn = event.target.closest(".menu-btn");
    if (menuBtn) {
      const header = document.querySelector(".site-header");
      const open = header.classList.toggle("is-open");
      menuBtn.setAttribute("aria-expanded", String(open));
      return;
    }

    if (event.target.closest(".nav a")) closeMenu();

    const button = event.target.closest("[data-action]");
    if (!button) return;
    const action = button.dataset.action;

    if (action === "dismiss-banner") {
      sessionStorage.setItem("gtsdg-hide-banner", "1");
      const banner = document.querySelector(".template-banner");
      if (banner) banner.remove();
      return;
    }

    if (action === "filter") {
      state.kind = button.dataset.kind;
      patchResources(`#resources [data-kind="${cssEscape(state.kind)}"]`);
      return;
    }

    if (action === "toggle") {
      const id = button.dataset.id;
      state.openId = state.openId === id ? "" : id;
      patchConnections(`[data-action="toggle"][data-id="${cssEscape(state.openId || id)}"]`);
      return;
    }

    if (action === "chart") {
      const index = Number(button.dataset.index);
      state.chartOpen = state.chartOpen === index ? -1 : index;
      patchEvidenceChart(`[data-action="chart"][data-index="${state.chartOpen === -1 ? index : state.chartOpen}"]`);
      return;
    }

    if (action === "answer") {
      const question = site.matcher.questions[state.step];
      state.answers[state.step] = question.options[Number(button.dataset.index)];
      state.answers = state.answers.slice(0, state.step + 1);
      state.step += 1;
      patchMatcher();
      return;
    }

    if (action === "matcher-back") {
      state.step = Math.max(0, state.step - 1);
      patchMatcher();
      return;
    }

    if (action === "matcher-reset") {
      state.step = 0;
      state.answers = [];
      patchMatcher();
      return;
    }

  }

  function onChange(event) {
    const input = event.target.closest("[data-action='check']");
    if (!input) return;
    const id = input.dataset.id;
    if (input.checked) {
      if (!state.checks.includes(id)) state.checks.push(id);
    } else {
      state.checks = state.checks.filter((item) => item !== id);
    }
    saveChecks();
    input.closest(".action").classList.toggle("is-done", input.checked);
  }

  function onInput(event) {
    const input = event.target.closest("[data-action='search']");
    if (!input) return;
    const caret = input.selectionStart;
    state.query = input.value;
    patchResources("[data-action='search']");
    const field = document.querySelector("[data-action='search']");
    if (field) {
      field.focus();
      const pos = Math.min(caret ?? field.value.length, field.value.length);
      field.setSelectionRange(pos, pos);
    }
  }

  function patchResources(focusSelector) {
    replaceSection("resources", resourcesSection(), focusSelector);
  }

  function patchConnections(focusSelector) {
    replaceSection("connections", connectionsSection(), focusSelector);
  }

  function patchEvidenceChart(focusSelector) {
    replaceSection("evidence", evidenceSection(), focusSelector);
    paintBars();
  }

  function replaceSection(id, html, focusSelector) {
    const section = document.getElementById(id);
    if (!section) return;
    const fresh = document.createElement("div");
    fresh.innerHTML = html.trim();
    section.replaceWith(fresh.firstElementChild);
    updateWordCount();
    if (!focusSelector) return;
    const el = document.querySelector(focusSelector);
    if (el) el.focus();
  }

  function patchMatcher() {
    const matcher = document.getElementById("matcher");
    if (!matcher) return;
    matcher.innerHTML = matcherHtml();
    updateWordCount();
  }

  function filteredResources() {
    const query = state.query.trim().toLowerCase();
    return site.resources.filter((item) => {
      const kindOk = state.kind === "All" || item.kind === state.kind;
      if (!kindOk) return false;
      if (!query) return true;
      const haystack = [item.name, item.organizer, item.summary, item.why, item.action, ...(item.tags || [])]
        .join(" ")
        .toLowerCase();
      return haystack.includes(query);
    });
  }

  function paintBars() {
    document.querySelectorAll(".fill").forEach((bar) => {
      const width = bar.getAttribute("data-width") || "0";
      bar.style.width = width + "%";
    });
  }

  function paragraphs(list) {
    return (list || []).map((text) => `<p class="prose" data-count>${esc(text)}</p>`).join("");
  }

  function contactLink() {
    const href = safeUrl(site.org.contact);
    if (!href) return "";
    return ` · <a href="${esc(href)}">Contact</a>`;
  }

  function updateWordCount() {
    const skip = new Set(["id", "href", "url", "contact", "hrefLabel"]);
    let count = 0;
    function walk(node, key, parentKey) {
      if (typeof node === "string") {
        if (skip.has(key)) return;
        if (key === "note" && parentKey === "footer") return;
        if (/^\s*\[[\s\S]*\]\s*$/.test(node)) return;
        count += node.trim().split(/\s+/).filter(Boolean).length;
        return;
      }
      if (Array.isArray(node)) {
        node.forEach((item) => walk(item, key, parentKey));
        return;
      }
      if (node && typeof node === "object") {
        Object.entries(node).forEach(([childKey, value]) => walk(value, childKey, key));
      }
    }
    walk(site, "", "");
    document.querySelectorAll("[data-wordcount]").forEach((node) => {
      node.textContent = count.toLocaleString();
    });
  }

  function closeMenu() {
    const header = document.querySelector(".site-header");
    const menuBtn = document.querySelector(".menu-btn");
    if (!header) return;
    header.classList.remove("is-open");
    if (menuBtn) menuBtn.setAttribute("aria-expanded", "false");
  }

  function loadChecks() {
    try {
      const saved = JSON.parse(localStorage.getItem("gtsdg-actions") || "[]");
      return Array.isArray(saved) ? saved : [];
    } catch (error) {
      return [];
    }
  }

  function saveChecks() {
    localStorage.setItem("gtsdg-actions", JSON.stringify(state.checks));
  }

  function cssEscape(value) {
    if (window.CSS && CSS.escape) return CSS.escape(String(value));
    return String(value).replace(/["\\]/g, "\\$&");
  }

  function plain(value) {
    return String(value || "").replace(/[\[\]]/g, "");
  }

  function esc(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function safeUrl(url) {
    const value = String(url || "").trim();
    if (!value || value === "#") return "";
    if (value.startsWith("#") || value.startsWith("/") || value.startsWith("./") || value.startsWith("../")) {
      return value;
    }
    try {
      const parsed = new URL(value, window.location.href);
      if (parsed.protocol === "http:" || parsed.protocol === "https:" || parsed.protocol === "mailto:") {
        return parsed.href;
      }
    } catch (error) {
      return "";
    }
    return "";
  }

  function embedUrl(url) {
    const value = safeUrl(url);
    if (!value) return "";
    let parsed;
    try {
      parsed = new URL(value);
    } catch (error) {
      return "";
    }
    const host = parsed.hostname.replace(/^www\./, "");
    if (host === "youtube.com" || host === "m.youtube.com" || host === "youtube-nocookie.com") {
      if (parsed.pathname.startsWith("/embed/")) {
        return "https://www.youtube-nocookie.com" + parsed.pathname;
      }
      const id = parsed.searchParams.get("v");
      if (id) return "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(id);
    }
    if (host === "youtu.be") {
      const id = parsed.pathname.split("/").filter(Boolean)[0];
      if (id) return "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(id);
    }
    if (host === "vimeo.com") {
      const id = parsed.pathname.split("/").filter(Boolean)[0];
      if (id && /^\d+$/.test(id)) return "https://player.vimeo.com/video/" + id;
    }
    if (host === "player.vimeo.com") return value;
    return "";
  }
})();
