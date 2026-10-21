(function () {
  const site = window.SITE;
  const app = document.querySelector("#app");

  if (!site || !app) {
    if (app) {
      app.innerHTML = "<p class='noscript'>Add a SITE object in js/content.js to fill this page.</p>";
    }
    return;
  }

  const orgs = site.organizations.items || [];

  document.title = plain(site.campaign.title) + " · " + plain(site.org.name);

  app.innerHTML = [
    banner(),
    header(),
    hero(),
    `<main id="content">${issueSection()}${videoSection()}${orgSection()}${interactiveSection()}</main>`,
    footer()
  ].join("");

  updateWordCount();
  document.addEventListener("click", onClick);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  function banner() {
    if (!site.templateMode || sessionStorage.getItem("gtsdg-hide-banner")) return "";
    return `
      <div class="template-banner">
        <div class="wrap">
          <p>Template. Replace bracketed text in <strong>js/content.js</strong>. Finished writing: <strong data-wordcount>0</strong> words (target 1,200–2,000). Set <strong>templateMode</strong> to false to hide this bar.</p>
          <button class="banner-dismiss" type="button" data-action="dismiss-banner">Hide</button>
        </div>
      </div>`;
  }

  function header() {
    return `
      <header class="site-header">
        <div class="wrap header-inner">
          <a class="brand" href="#top">
            <span class="mark" aria-hidden="true"><i></i></span>
            <span>${esc(site.org.name)}</span>
          </a>
          <button class="menu-btn" type="button" aria-expanded="false" aria-controls="nav">Menu</button>
          <nav id="nav" class="nav" aria-label="Page">
            <a href="#issue">Issue</a>
            <a href="#watch">Watch</a>
            <a href="#organizations">Organizations</a>
            <a class="nav-cta" href="#fit">${esc(site.interactive.heading)}</a>
          </nav>
        </div>
      </header>`;
  }

  function hero() {
    return `
      <div class="hero" id="top">
        <div class="wrap hero-grid">
          <div>
            <p class="kicker">${esc(site.campaign.kicker)}</p>
            <h1>${esc(site.campaign.title)}</h1>
            <p class="lede">${esc(site.campaign.lede)}</p>
            <div class="hero-actions">
              <a class="btn btn-gold" href="#watch">Watch the video</a>
              <a class="btn btn-ghost" href="#organizations">Meet the organizations</a>
            </div>
            <p class="chip">For: ${esc(site.campaign.audience)}</p>
          </div>
          <aside class="hero-panel">
            <p class="kicker">Speaking as</p>
            <p>${esc(site.org.voice)}</p>
          </aside>
        </div>
      </div>`;
  }

  function issueSection() {
    const issue = site.issue;
    const stats = (issue.stats || []).map((stat) => `
      <article class="stat">
        <b>${esc(stat.figure)}</b>
        <span>${esc(stat.label)}</span>
        <p class="source">${esc(stat.source)}</p>
      </article>`).join("");
    const sdgs = (issue.sdgs || []).map((sdg) => `
      <span class="goal"><b>SDG ${esc(sdg.number)}</b> ${esc(sdg.name)}</span>`).join("");
    const next = (issue.nextPlan || []).map((name) => `
      <span class="goal goal-next"><b>Sustainability Next</b> ${esc(name)}</span>`).join("");

    return `
      <section class="section" id="issue">
        <div class="wrap">
          ${sectionHead("01", issue.heading)}
          <div class="issue-grid">
            <div>${paragraphs(issue.paragraphs)}</div>
            <aside class="fit-box">
              <p class="kicker">Where this fits</p>
              <div class="goals">${sdgs}${next}</div>
              <p>${esc(issue.connection)}</p>
            </aside>
          </div>
          <div class="stat-grid">${stats}</div>
        </div>
      </section>`;
  }

  function videoSection() {
    const video = site.video;
    return `
      <section class="section" id="watch">
        <div class="wrap">
          ${sectionHead("02", video.heading)}
          <div class="video-layout">
            <div class="video-frame">${videoPlayer(video)}</div>
            <div class="video-copy">
              <h3>${esc(video.title)}</h3>
              <p>${esc(video.caption)}</p>
              <details class="transcript">
                <summary>Transcript</summary>
                <p>${esc(video.transcript)}</p>
              </details>
            </div>
          </div>
        </div>
      </section>`;
  }

  function videoPlayer(video) {
    const source = videoSource(video.url);
    if (source.type === "embed") {
      return `<iframe src="${esc(source.src)}" title="${esc(plain(video.title))}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    }
    if (source.type === "file") {
      return `<video controls preload="metadata" src="${esc(source.src)}"></video>`;
    }
    if (source.type === "link") {
      return `<div class="video-placeholder"><p>This link cannot play inside the page.</p><a class="btn btn-gold" href="${esc(source.src)}">Open the video</a></div>`;
    }
    return `
      <div class="video-placeholder">
        <div class="play" aria-hidden="true"><i></i></div>
        <strong>Video placeholder</strong>
        <p>Paste a YouTube, Vimeo, or Google Drive link, or a file path like media/video.mp4, into video.url in js/content.js.</p>
      </div>`;
  }

  function orgSection() {
    const cards = orgs.map((org, i) => orgCard(org, i)).join("");
    return `
      <section class="section" id="organizations">
        <div class="wrap">
          ${sectionHead("03", site.organizations.heading)}
          <p class="section-intro">${esc(site.organizations.intro)}</p>
          <div class="org-grid">${cards}</div>
        </div>
      </section>`;
  }

  function orgCard(org, index) {
    const href = safeUrl(org.href);
    const link = href
      ? `<a class="btn btn-navy" href="${esc(href)}" target="_blank" rel="noopener">${esc(org.hrefLabel || "Visit")}</a>`
      : `<button class="btn btn-line" type="button" disabled>${esc(org.hrefLabel || "Add a link")}</button>`;
    const tags = (org.tags || []).map((tag) => `<span class="tag">${esc(tag)}</span>`).join("");
    return `
      <article class="org" id="${esc(org.id)}">
        <div class="org-top">
          <span class="org-num">${String(index + 1).padStart(2, "0")}</span>
          <div>
            <h3>${esc(org.name)}</h3>
            <p class="tagline">${esc(org.tagline)}</p>
          </div>
        </div>
        <p>${esc(org.about)}</p>
        <p class="label">Why it matters to you</p>
        <p>${esc(org.why)}</p>
        <p class="label">How to get involved</p>
        <p>${esc(org.involve)}</p>
        <div class="org-foot">
          ${link}
          <div class="tags">${tags}</div>
        </div>
      </article>`;
  }

  function interactiveSection() {
    return `
      <section class="section" id="fit">
        <div class="wrap">
          ${sectionHead("04", site.interactive.heading)}
          <div class="interactive-placeholder">
            <strong>${esc(site.interactive.placeholder)}</strong>
          </div>
        </div>
      </section>`;
  }

  function footer() {
    return `
      <footer class="site-footer">
        <div class="wrap">
          <h2>${esc(site.footer.close)}</h2>
          <p>${esc(site.footer.credits)}</p>
          <p class="fine">${esc(site.footer.note)}</p>
        </div>
      </footer>`;
  }

  function onClick(event) {
    const menuBtn = event.target.closest(".menu-btn");
    if (menuBtn) {
      const open = document.querySelector(".site-header").classList.toggle("is-open");
      menuBtn.setAttribute("aria-expanded", String(open));
      return;
    }
    if (event.target.closest(".nav a")) closeMenu();

    const button = event.target.closest("[data-action]");
    if (!button) return;
    const action = button.dataset.action;

    if (action === "dismiss-banner") {
      sessionStorage.setItem("gtsdg-hide-banner", "1");
      const bar = document.querySelector(".template-banner");
      if (bar) bar.remove();
    }
  }

  function sectionHead(index, title) {
    return `
      <div class="section-head">
        <span class="index">${index}</span>
        <h2>${esc(title)}</h2>
      </div>`;
  }

  function paragraphs(list) {
    return (list || []).map((text) => `<p>${esc(text)}</p>`).join("");
  }

  function updateWordCount() {
    const skip = new Set(["id", "href", "url", "hrefLabel"]);
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
      } else if (node && typeof node === "object") {
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
    if (header) header.classList.remove("is-open");
    if (menuBtn) menuBtn.setAttribute("aria-expanded", "false");
  }

  function videoSource(url) {
    const value = safeUrl(url);
    if (!value) return { type: "none" };
    if (/\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i.test(value)) return { type: "file", src: value };

    let parsed;
    try {
      parsed = new URL(value, window.location.href);
    } catch (error) {
      return { type: "none" };
    }
    const host = parsed.hostname.replace(/^(www\.|m\.)/, "");
    const parts = parsed.pathname.split("/").filter(Boolean);

    if (host === "youtube.com" || host === "youtube-nocookie.com") {
      const id = parsed.searchParams.get("v") || (["embed", "shorts", "live"].includes(parts[0]) ? parts[1] : "");
      if (id) return { type: "embed", src: "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(id) };
    }
    if (host === "youtu.be" && parts[0]) {
      return { type: "embed", src: "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(parts[0]) };
    }
    if (host === "vimeo.com" && /^\d+$/.test(parts[0] || "")) {
      return { type: "embed", src: "https://player.vimeo.com/video/" + parts[0] };
    }
    if (host === "player.vimeo.com") return { type: "embed", src: parsed.href };
    if (host === "drive.google.com" && parts[0] === "file" && parts[1] === "d" && parts[2]) {
      return { type: "embed", src: "https://drive.google.com/file/d/" + encodeURIComponent(parts[2]) + "/preview" };
    }
    return { type: "link", src: value };
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
    if (/^(#|\/|\.\/|\.\.\/)/.test(value)) return value;
    if (!/^[a-z][a-z0-9+.-]*:/i.test(value)) return value;
    try {
      const parsed = new URL(value);
      if (["http:", "https:", "mailto:"].includes(parsed.protocol)) return parsed.href;
    } catch (error) {
      return "";
    }
    return "";
  }
})();
