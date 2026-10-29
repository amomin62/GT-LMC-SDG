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
  const quiz = site.interactive || {};
  const quizQuestions = quiz.questions || [];
  let quizStep = 0;
  let quizAnswers = [];

  const schools = window.SCHOOLS || [];
  const techTower = [33.77245, -84.39481];
  const twoMilesInMeters = 3218.7;
  const bands = [
    { id: "low", label: "Under 25%", color: "#c63b26", test: (pct) => pct < 25 },
    { id: "mid", label: "25–50%", color: "#e09a00", test: (pct) => pct >= 25 && pct < 50 },
    { id: "high", label: "50% or more", color: "#00796f", test: (pct) => pct >= 50 }
  ];
  let schoolMap = null;
  let schoolMarkers = [];

  document.title = plain(site.org.name) + " · " + plain(site.campaign.title);

  app.innerHTML = [
    banner(),
    header(),
    hero(),
    `<main id="content">${issueSection()}${contextSection()}${videoSection()}${orgSection()}${interactiveSection()}</main>`,
    footer()
  ].join("");

  updateWordCount();
  renderQuiz(false);
  initMap();
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
            <a href="#map">Map</a>
            <a href="#watch">Watch</a>
            <a href="#organizations">Organizations</a>
            <a class="nav-cta" href="#fit">${esc(site.interactive.heading)}</a>
          </nav>
        </div>
      </header>`;
  }

  function hero() {
    const campaign = site.campaign;
    const image = safeUrl(campaign.image);
    const absolute = image ? new URL(image, window.location.href).href : "";
    const style = image ? ` style="--hero-image: url('${esc(absolute.replace(/'/g, "%27"))}')"` : "";
    const credit = image && campaign.imageCredit ? `<p class="hero-credit">${esc(campaign.imageCredit)}</p>` : "";
    return `
      <div class="hero${image ? " has-image" : ""}" id="top"${style}>
        <div class="wrap hero-grid">
          <div>
            <p class="kicker">${esc(campaign.kicker)}</p>
            <h1>${esc(campaign.title)}</h1>
            <p class="lede">${esc(campaign.lede)}</p>
            <div class="hero-actions">
              <a class="btn btn-gold" href="#guess">${esc(campaign.primaryCta || "Start here")}</a>
              <a class="btn btn-ghost" href="#map">${esc(campaign.secondaryCta || "See the map")}</a>
            </div>
            <p class="chip">For: ${esc(campaign.audience)}</p>
          </div>
          <aside class="hero-panel">
            <p class="kicker">Speaking as</p>
            <p>${esc(site.org.voice)}</p>
          </aside>
        </div>
        ${credit}
      </div>`;
  }

  function issueSection() {
    const issue = site.issue;
    const stats = (issue.stats || []).map((stat) => `
      <article class="stat${stat.tone === "hope" ? " stat-hope" : ""}">
        ${stat.badge ? `<p class="stat-badge">${esc(stat.badge)}</p>` : ""}
        <b>${esc(stat.figure)}</b>
        <span>${esc(stat.label)}</span>
        <p class="source">${sourceLink(stat.source, stat.sourceUrl)}</p>
      </article>`).join("");
    const sdgs = (issue.sdgs || []).map((sdg) => goalTag("goal", "SDG " + sdg.number, sdg.name, sdg.href)).join("");
    const next = (issue.nextPlan || [])
      .map((item) => (typeof item === "string" ? { name: item } : item))
      .map((item) => goalTag("goal goal-next", "Sustainability Next", item.name, item.href))
      .join("");
    const links = (issue.links || []).map((link) => {
      const href = safeUrl(link.href);
      return href ? `<li><a href="${esc(href)}" target="_blank" rel="noopener">${esc(link.label)}</a></li>` : "";
    }).join("");

    return `
      <section class="section" id="issue">
        <div class="wrap">
          ${sectionHead("01", issue.heading)}
          ${guessHtml(issue.guess)}
          ${storyHtml(issue.story)}
          <div class="issue-grid">
            <div class="issue-copy">${paragraphs(issue.paragraphs)}</div>
            <aside class="fit-box">
              <p class="kicker">Where this fits</p>
              <div class="goals">${sdgs}${next}</div>
              <p>${esc(issue.connection)}</p>
              ${links ? `<ul class="read-more">${links}</ul>` : ""}
            </aside>
          </div>
          <div class="stat-grid">${stats}</div>
          ${reflectionHtml(issue.reflection)}
        </div>
      </section>`;
  }

  function goalTag(className, label, name, href) {
    const url = safeUrl(href);
    const inner = `<b>${esc(label)}</b> ${esc(name)}`;
    return url
      ? `<a class="${className}" href="${esc(url)}" target="_blank" rel="noopener">${inner}</a>`
      : `<span class="${className}">${inner}</span>`;
  }

  function guessHtml(guess) {
    if (!guess) return "";
    const buttons = Array.from({ length: 10 }, (_, i) => `
      <button type="button" class="guess-num" data-action="guess" data-value="${i + 1}" aria-pressed="false">${i + 1}</button>`).join("");
    return `
      <div class="guess" id="guess">
        <p class="guess-kicker">Quick question</p>
        <h3 class="guess-prompt">${esc(guess.prompt)}</h3>
        <div class="guess-nums" role="group" aria-label="Your guess, out of 10 students">${buttons}</div>
        <div class="guess-result" aria-live="polite" hidden></div>
      </div>`;
  }

  function showGuess(value) {
    const guess = site.issue.guess;
    const box = document.querySelector(".guess-result");
    if (!guess || !box) return;
    const answer = Number(guess.answer) || 0;
    const diff = value - answer;
    const template = Math.abs(diff) < 1 ? guess.close : diff > 0 ? guess.high : guess.low;
    document.querySelectorAll(".guess-num").forEach((button) => {
      button.setAttribute("aria-pressed", String(Number(button.dataset.value) === value));
    });
    box.hidden = false;
    box.innerHTML = `
      <div class="guess-bar" aria-hidden="true">
        <span class="guess-fill"></span>
        <span class="guess-mark" style="left:${value * 10}%"><i>Your guess</i></span>
      </div>
      <div class="guess-scale" aria-hidden="true"><span>0</span><span>5</span><span>10</span></div>
      <p class="guess-reveal">${esc(guess.reveal)}</p>
      <p>${esc(String(template || "").replace("{n}", value))}</p>
      <p class="source">${sourceLink(guess.source, guess.sourceUrl)}</p>`;
    requestAnimationFrame(() => {
      const fill = box.querySelector(".guess-fill");
      if (fill) fill.style.width = answer * 10 + "%";
    });
  }

  function storyHtml(story) {
    if (!story) return "";
    const school = schools.find(([name]) => name === story.school);
    const schoolBox = school ? `
      <div class="story-school">
        <p class="story-pct" style="color:${bandFor(school[3]).color}"><b>${school[3].toFixed(1)}%</b></p>
        <p>of students at ${esc(story.schoolName || school[0])} read and write at grade level (2023–24). It is ${milesFromTech(school[1], school[2]).toFixed(1)} miles from Tech Tower.</p>
        <button type="button" class="btn btn-navy" data-action="map-school" data-school="${esc(school[0])}">${esc(story.schoolLabel || "See it on the map")}</button>
      </div>` : "";
    return `
      <article class="story">
        <div class="story-copy">
          <p class="guess-kicker">${esc(story.kicker)}</p>
          <h3>${esc(story.title)}</h3>
          ${paragraphs(story.paragraphs)}
          <p class="source">${sourceLink(story.source, story.sourceUrl)}</p>
        </div>
        <aside class="story-side">
          ${story.quote ? `<blockquote><p>“${esc(story.quote)}”</p><cite>${esc(story.quoteBy)}</cite></blockquote>` : ""}
          ${schoolBox}
        </aside>
      </article>`;
  }

  function reflectionHtml(reflection) {
    if (!reflection || !reflection.options) return "";
    const options = reflection.options.map((option, index) => `
      <button type="button" class="reflect-option" data-action="reflect" data-index="${index}" aria-pressed="false">${esc(option.label)}</button>`).join("");
    return `
      <div class="reflect">
        <p class="guess-kicker">Your turn</p>
        <h3>${esc(reflection.prompt)}</h3>
        <div class="reflect-options" role="group" aria-label="${esc(reflection.prompt)}">${options}</div>
        <div class="reflect-reply" aria-live="polite" hidden></div>
      </div>`;
  }

  function showReflection(index) {
    const option = site.issue.reflection.options[index];
    const box = document.querySelector(".reflect-reply");
    if (!option || !box) return;
    document.querySelectorAll(".reflect-option").forEach((button) => {
      button.setAttribute("aria-pressed", String(Number(button.dataset.index) === index));
    });
    const org = orgs.find((item) => item.id === option.orgId);
    box.hidden = false;
    box.innerHTML = `
      <p>${esc(option.reply)}</p>
      ${org ? `<a class="btn btn-navy" href="#${esc(org.id)}">Meet ${esc(org.name)}</a>` : ""}`;
  }

  function contextSection() {
    const context = site.context;
    if (!context) return "";
    const filters = [{ id: "all", label: "All schools" }].concat(bands).map((band, index) => `
      <button type="button" class="map-filter" data-action="map-filter" data-band="${band.id}" aria-pressed="${index === 0}">
        ${band.color ? `<i style="background:${band.color}"></i>` : ""}${esc(band.label)}
      </button>`).join("");
    return `
      <section class="section" id="map">
        <div class="wrap">
          ${sectionHead("02", context.heading)}
          <p class="section-intro">${esc(context.intro)}</p>
          <div class="map-layout">
            <div class="map-frame">
              <div id="school-map" class="school-map" role="region" aria-label="Map of Atlanta public schools colored by reading proficiency"></div>
            </div>
            <aside class="map-panel">
              <p class="kicker">Share of students reading at grade level</p>
              <div class="map-filters" role="group" aria-label="Show schools by reading level">${filters}</div>
              <div class="map-info" aria-live="polite">${mapSummaryHtml()}</div>
            </aside>
          </div>
          <p class="source map-source">${sourceLink(context.source, context.sourceUrl)}</p>
          ${chartHtml(context.chart)}
        </div>
      </section>`;
  }

  function mapSummaryHtml() {
    const near = schools
      .map(([name, lat, lon, pct]) => ({ name, pct, miles: milesFromTech(lat, lon) }))
      .filter((school) => school.miles <= 2)
      .sort((a, b) => a.pct - b.pct);
    if (!near.length) return "<p>Tap a dot to see a school.</p>";
    const low = near[0];
    const high = near[near.length - 1];
    return `
      <p class="map-big"><b>${Math.round(low.pct)}%</b> to <b>${Math.round(high.pct)}%</b></p>
      <p>That is the range across the ${near.length} public schools within two miles of Tech Tower, from ${esc(low.name)} to ${esc(high.name)}.</p>
      <p class="map-hint">Tap any dot to see that school.</p>`;
  }

  function schoolInfoHtml(name, pct, miles) {
    const band = bandFor(pct);
    return `
      <p class="map-school">${esc(name)}</p>
      <p class="map-big" style="color:${band.color}"><b>${pct.toFixed(1)}%</b></p>
      <p>of students read and write at grade level. That is about ${Math.round(pct / 10)} in 10. This school is ${miles.toFixed(1)} miles from Tech Tower.</p>
      <button type="button" class="btn btn-line" data-action="map-reset">Back to the overview</button>`;
  }

  function initMap() {
    const el = document.getElementById("school-map");
    if (!el) return;
    if (!window.L || !schools.length) {
      el.innerHTML = `<p class="map-fallback">The map needs an internet connection to load. Refresh the page to try again.</p>`;
      return;
    }
    schoolMap = L.map(el, { scrollWheelZoom: false });
    const esri = "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/";
    L.tileLayer(esri + "World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}", {
      attribution: "Tiles &copy; Esri &mdash; Esri, HERE, Garmin, &copy; OpenStreetMap contributors",
      maxZoom: 16
    }).addTo(schoolMap);
    L.tileLayer(esri + "World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}", { maxZoom: 16 }).addTo(schoolMap);
    L.circle(techTower, {
      radius: twoMilesInMeters,
      color: "#003057",
      weight: 1.5,
      dashArray: "6 6",
      fillColor: "#003057",
      fillOpacity: 0.04,
      interactive: false
    }).addTo(schoolMap);
    L.marker(techTower, {
      icon: L.divIcon({ className: "gt-pin", html: "<span>GT</span>", iconSize: [34, 34] }),
      title: "Georgia Tech, Tech Tower",
      keyboard: false
    }).addTo(schoolMap).bindTooltip("Georgia Tech · Tech Tower");

    schoolMarkers = schools.map(([name, lat, lon, pct]) => {
      const band = bandFor(pct);
      const marker = L.circleMarker([lat, lon], {
        radius: 7,
        color: "#ffffff",
        weight: 1.5,
        fillColor: band.color,
        fillOpacity: 0.95
      });
      marker.bindTooltip(`${esc(name)}: ${pct.toFixed(1)}%`);
      marker.on("click", () => {
        const info = document.querySelector(".map-info");
        if (info) info.innerHTML = schoolInfoHtml(name, pct, milesFromTech(lat, lon));
      });
      marker.addTo(schoolMap);
      return { name, marker, band: band.id };
    });
    schoolMap.fitBounds(L.latLngBounds(schools.map(([, lat, lon]) => [lat, lon])), { padding: [16, 16] });
  }

  function filterMap(bandId) {
    document.querySelectorAll(".map-filter").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.band === bandId));
    });
    if (!schoolMap) return;
    schoolMarkers.forEach(({ marker, band }) => {
      if (bandId === "all" || band === bandId) marker.addTo(schoolMap);
      else marker.remove();
    });
  }

  function focusSchool(name) {
    const school = schools.find(([schoolName]) => schoolName === name);
    if (!school) return;
    const [, lat, lon, pct] = school;
    filterMap("all");
    const info = document.querySelector(".map-info");
    if (info) info.innerHTML = schoolInfoHtml(name, pct, milesFromTech(lat, lon));
    const section = document.getElementById("map");
    if (section) section.scrollIntoView();
    const entry = schoolMarkers.find((item) => item.name === name);
    if (!schoolMap || !entry) return;
    schoolMap.fitBounds(L.latLngBounds([techTower, [lat, lon]]), { padding: [48, 48] });
    entry.marker.openTooltip();
  }

  function bandFor(pct) {
    return bands.find((band) => band.test(pct)) || bands[0];
  }

  function milesFromTech(lat, lon) {
    const rad = Math.PI / 180;
    const dLat = (lat - techTower[0]) * rad;
    const dLon = (lon - techTower[1]) * rad;
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(techTower[0] * rad) * Math.cos(lat * rad) * Math.sin(dLon / 2) ** 2;
    return 2 * 3958.8 * Math.asin(Math.sqrt(h));
  }

  function chartHtml(chart) {
    if (!chart || !chart.rows) return "";
    const min = 185;
    const max = 265;
    const pos = (score) => ((score - min) / (max - min)) * 100;
    const rows = chart.rows.map((row) => `
      <div class="chart-row${row.highlight ? " is-atl is-mystery" : ""}">
        <span class="chart-label">${esc(row.label)}</span>
        <div class="chart-track">
          <span class="chart-line" style="left:${pos(row.low)}%;width:${pos(row.high) - pos(row.low)}%"></span>
          <span class="chart-dot dot-low" style="left:${pos(row.low)}%" title="${Math.round(row.low)}"></span>
          <span class="chart-dot dot-high" style="left:${pos(row.high)}%" title="${Math.round(row.high)}"></span>
          <span class="chart-mystery" aria-hidden="true">?</span>
        </div>
        <span class="chart-gap">${esc(row.gap)} points</span>
      </div>`).join("");
    const choices = [["smaller", "Smaller"], ["same", "About the same"], ["bigger", "Bigger"]].map(([id, label]) => `
      <button type="button" class="reflect-option" data-action="chart-guess" data-choice="${id}" aria-pressed="false">${label}</button>`).join("");
    return `
      <div class="gap-chart">
        <p class="guess-kicker">Make a call</p>
        <h3>${esc(chart.heading)}</h3>
        <p class="chart-prompt">${esc(chart.prompt)}</p>
        <div class="reflect-options chart-choices" role="group" aria-label="Is Atlanta’s gap smaller or bigger?">${choices}</div>
        <div class="chart-legend">
          <span><i class="dot-low"></i>${esc(chart.lowLabel)}</span>
          <span><i class="dot-high"></i>${esc(chart.highLabel)}</span>
        </div>
        <div class="chart-rows">${rows}</div>
        <div class="chart-reply" aria-live="polite" hidden></div>
        <p class="source">${sourceLink(chart.source, chart.sourceUrl)}</p>
      </div>`;
  }

  function showChart(choice) {
    const chart = site.context.chart;
    document.querySelectorAll("[data-action='chart-guess']").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.choice === choice));
    });
    document.querySelectorAll(".chart-row.is-mystery").forEach((row) => row.classList.remove("is-mystery"));
    const reply = document.querySelector(".chart-reply");
    if (!reply) return;
    reply.hidden = false;
    reply.innerHTML = `<p><strong>${choice === "bigger" ? "You called it." : "Not quite."}</strong> ${esc(chart.reveal)}</p>`;
  }

  function sourceLink(text, url) {
    const href = safeUrl(url);
    if (!text) return "";
    return href
      ? `<a href="${esc(href)}" target="_blank" rel="noopener">${esc(text)}</a>`
      : esc(text);
  }

  function videoSection() {
    const video = site.video;
    return `
      <section class="section" id="watch">
        <div class="wrap">
          ${sectionHead("03", video.heading)}
          ${video.prompt ? `<p class="section-intro video-prompt">${esc(video.prompt)}</p>` : ""}
          <div class="video-layout video-solo">
            <div class="video-frame">${videoPlayer(video)}</div>
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
          ${sectionHead("04", site.organizations.heading)}
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
    const image = safeUrl(org.image);
    const photo = image ? `
        <figure class="org-photo${org.imageFit === "contain" ? " is-logo" : ""}">
          <img src="${esc(image)}" alt="${esc(org.imageAlt || "")}" loading="lazy">
          ${org.imageCredit ? `<figcaption>${esc(org.imageCredit)}</figcaption>` : ""}
        </figure>` : "";
    const name = href
      ? `<a href="${esc(href)}" target="_blank" rel="noopener">${esc(org.name)}</a>`
      : esc(org.name);
    const siteLink = href ? `<p class="org-site"><a href="${esc(href)}" target="_blank" rel="noopener">${esc(hostName(href))}</a></p>` : "";
    return `
      <article class="org" id="${esc(org.id)}">
        ${photo}
        <div class="org-top">
          <span class="org-num">${String(index + 1).padStart(2, "0")}</span>
          <div>
            <h3>${name}</h3>
            <p class="tagline">${esc(org.tagline)}</p>
            ${siteLink}
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
    const intro = quiz.intro ? `<p class="section-intro">${esc(quiz.intro)}</p>` : "";
    return `
      <section class="section" id="fit">
        <div class="wrap">
          ${sectionHead("05", quiz.heading || "Find your fit")}
          ${intro}
          <div id="quiz" class="quiz" aria-live="polite"></div>
        </div>
      </section>`;
  }

  function renderQuiz(moveFocus) {
    const root = document.querySelector("#quiz");
    if (!root) return;
    if (!quizQuestions.length) {
      root.innerHTML = `<div class="quiz-card"><p>Add quiz questions under interactive.questions in js/content.js.</p></div>`;
      return;
    }
    root.innerHTML = quizStep >= quizQuestions.length ? quizResultHtml() : quizQuestionHtml();
    if (!moveFocus) return;
    const heading = document.getElementById("quiz-prompt");
    if (heading) heading.focus();
  }

  function quizQuestionHtml() {
    const question = quizQuestions[quizStep];
    const options = (question.options || []).map((option, index) => `
      <button type="button" class="quiz-option" data-action="quiz-option" data-index="${index}">
        <span class="quiz-letter" aria-hidden="true">${String.fromCharCode(65 + index)}</span>
        <span>${esc(option.label)}</span>
      </button>`).join("");
    const back = quizStep > 0
      ? `<button type="button" class="btn btn-line" data-action="quiz-back">Back</button>`
      : "";
    const width = Math.round((quizStep / quizQuestions.length) * 100);
    return quizFrame(
      `Question ${quizStep + 1} of ${quizQuestions.length}`,
      width,
      `<h3 id="quiz-prompt" tabindex="-1">${esc(question.prompt)}</h3>
       <div class="quiz-options" role="group" aria-labelledby="quiz-prompt">${options}</div>`,
      back
    );
  }

  function quizResultHtml() {
    const winners = quizWinners();
    const results = quiz.results || {};
    const back = `<button type="button" class="btn btn-line" data-action="quiz-back">Back</button>`;
    const restart = `<button type="button" class="btn btn-line" data-action="quiz-restart">${esc(quiz.restartLabel || "Retake the quiz")}</button>`;
    let title = "";
    let body = "";
    let links = "";

    if (winners.length === 1 && results[winners[0]]) {
      title = results[winners[0]].title;
      body = results[winners[0]].body;
      links = (results[winners[0]].links || []).map((link) => actionLink(link.href, link.label)).join("");
    } else if (winners.length > 1) {
      title = tieTitle(winners.map(orgName));
      body = (results.tie && results.tie.body) || "Your answers landed evenly. Contact the group you can reach this week.";
      links = winners.map((id) => {
        const copy = results[id];
        const first = copy && copy.links && copy.links[0];
        if (first) return actionLink(first.href, first.label);
        const org = orgs.find((item) => item.id === id);
        return org ? actionLink(org.href, org.name) : "";
      }).join("");
    } else {
      return `<div class="quiz-card"><p>Add a result for this match under interactive.results in js/content.js.</p></div>`;
    }

    return quizFrame(
      "Your match",
      100,
      `<h3 id="quiz-prompt" tabindex="-1">${esc(title)}</h3>
       <p class="quiz-body">${esc(body)}</p>`,
      links + back + restart
    );
  }

  function tieTitle(names) {
    if (names.length === 2) return names[0] + " and " + names[1] + " both fit how you want to help.";
    return names.slice(0, -1).join(", ") + ", and " + names[names.length - 1] + " all fit how you want to help.";
  }

  function orgName(id) {
    const org = orgs.find((item) => item.id === id);
    return org && org.name ? org.name : id;
  }

  function quizFrame(status, width, body, actions) {
    return `
      <div class="quiz-card">
        <p class="quiz-status" id="quiz-progress">${esc(status)}</p>
        <div class="quiz-bar" aria-hidden="true"><span style="width:${width}%"></span></div>
        ${body}
        <div class="quiz-actions">${actions}</div>
      </div>`;
  }

  function quizWinners() {
    const totals = {};
    quizAnswers.forEach((answer) => {
      const question = quizQuestions[answer.step];
      const option = question && question.options && question.options[answer.index];
      if (!option) return;
      Object.entries(option.scores || {}).forEach(([id, points]) => {
        totals[id] = (totals[id] || 0) + (Number(points) || 0);
      });
    });
    const ranked = Object.entries(totals).sort((a, b) => b[1] - a[1]);
    if (!ranked.length) return [];
    const top = ranked[0][1];
    const order = new Map(orgs.map((org, index) => [org.id, index]));
    return ranked
      .filter((entry) => entry[1] === top)
      .map((entry) => entry[0])
      .sort((a, b) => (order.has(a) ? order.get(a) : 99) - (order.has(b) ? order.get(b) : 99));
  }

  function actionLink(href, label) {
    const safe = safeUrl(href);
    if (!safe || !label) return "";
    return `<a class="btn btn-navy" href="${esc(safe)}" target="_blank" rel="noopener">${esc(label)}</a>`;
  }

  function footer() {
    return `
      <footer class="site-footer">
        <div class="wrap">
          <h2>${esc(site.footer.close)}</h2>
          <div class="hero-actions">
            <a class="btn btn-gold" href="#fit">${esc(quiz.heading || "Find your fit")}</a>
            <a class="btn btn-ghost" href="#organizations">Meet the organizations</a>
          </div>
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
      return;
    }

    if (action === "guess") {
      showGuess(Number(button.dataset.value));
      return;
    }

    if (action === "reflect") {
      showReflection(Number(button.dataset.index));
      return;
    }

    if (action === "chart-guess") {
      showChart(button.dataset.choice);
      return;
    }

    if (action === "map-filter") {
      filterMap(button.dataset.band);
      return;
    }

    if (action === "map-school") {
      focusSchool(button.dataset.school);
      return;
    }

    if (action === "map-reset") {
      const info = document.querySelector(".map-info");
      if (info) info.innerHTML = mapSummaryHtml();
      return;
    }

    if (action === "quiz-option") {
      const index = Number(button.dataset.index);
      const question = quizQuestions[quizStep];
      if (!question || !question.options || !question.options[index]) return;
      quizAnswers.push({ step: quizStep, index });
      quizStep += 1;
      renderQuiz(true);
      return;
    }

    if (action === "quiz-back") {
      if (quizStep === 0) return;
      quizStep -= 1;
      quizAnswers = quizAnswers.filter((answer) => answer.step < quizStep);
      renderQuiz(true);
      return;
    }

    if (action === "quiz-restart") {
      quizStep = 0;
      quizAnswers = [];
      renderQuiz(true);
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
    const skip = new Set(["id", "href", "url", "hrefLabel", "sourceUrl", "image", "imageAlt", "imageFit", "imageCredit", "tone", "orgId", "school"]);
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

  function hostName(url) {
    try {
      return new URL(url).hostname.replace(/^www\./, "");
    } catch (error) {
      return url;
    }
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
