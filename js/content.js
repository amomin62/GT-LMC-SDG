/**
 * Campaign content
 * ----------------
 * This is the only file you need to edit to fill the site.
 * Bracketed lines are placeholders. Replace them with finished prose.
 * The assignment asks for 1,200–2,000 words. The counter ignores
 * any line that is still entirely inside square brackets.
 *
 * Set templateMode to false when the editing bar should disappear.
 *
 * Resources you want to advertise go in the `resources` array.
 * Give each one a unique `id`. Point the matcher options at those ids.
 *
 * Video: paste a YouTube or Vimeo link into video.url.
 *
 * Sustainability Next priorities (use the official names):
 *   Institute Operations
 *   Education for Sustainable Development
 *   Leading Sustainability Research
 *   Culture and Organization
 *   Climate Solutions
 *   Living Learning Campus
 *
 * UN Sustainable Development Goals:
 *   1 No Poverty
 *   2 Zero Hunger
 *   3 Good Health and Well-being
 *   4 Quality Education
 *   5 Gender Equality
 *   6 Clean Water and Sanitation
 *   7 Affordable and Clean Energy
 *   8 Decent Work and Economic Growth
 *   9 Industry, Innovation and Infrastructure
 *   10 Reduced Inequalities
 *   11 Sustainable Cities and Communities
 *   12 Responsible Consumption and Production
 *   13 Climate Action
 *   14 Life Below Water
 *   15 Life on Land
 *   16 Peace, Justice and Strong Institutions
 *   17 Partnerships for the Goals
 */
window.SITE = {
  templateMode: true,

  org: {
    name: "[Organization or initiative name]",
    voice: "[One line in the voice of that organization. Say who you are and what you are inviting people to do.]",
    contact: ""
  },

  campaign: {
    kicker: "A Georgia Tech sustainability campaign",
    title: "[Name the sustainability issue]",
    lede: "[In two or three sentences, say what the issue is and why people at Georgia Tech should care about it now.]",
    audienceLabel: "[Target audience]"
  },

  issue: {
    heading: "The issue",
    pull: "[One sentence a reader should remember after they leave.]",
    paragraphs: [
      "[Explain the sustainability issue in plain language. Define any term a newcomer would not already know.]",
      "[Describe how the issue shows up for the Georgia Tech community: students, staff, faculty, or Atlanta neighbors. Stay specific to this campus.]",
      "[Name what is at stake if nothing changes, and what becomes possible if people on this campus act.]"
    ]
  },

  evidence: {
    heading: "Background and evidence",
    intro: "[Tell the reader what the figures below are meant to show before they read the numbers.]",
    points: [
      {
        figure: "[Figure]",
        label: "[What this number measures]",
        source: "[Source and year]"
      },
      {
        figure: "[Figure]",
        label: "[What this number measures]",
        source: "[Source and year]"
      },
      {
        figure: "[Figure]",
        label: "[What this number measures]",
        source: "[Source and year]"
      }
    ],
    paragraphs: [
      "[Interpret the evidence. Explain what the numbers mean for your audience, and what they do not prove.]",
      "[Add the local context a Georgia Tech reader needs: campus conditions, Atlanta conditions, or both. Cite the source in the sentence.]"
    ],
    chart: {
      title: "[Chart title]",
      caption: "[Say what the reader should conclude from this comparison, and name the source.]",
      points: [
        { label: "[Category]", value: null, note: "[What this bar measures, the figure, and the source.]" },
        { label: "[Category]", value: null, note: "[What this bar measures, the figure, and the source.]" },
        { label: "[Category]", value: null, note: "[What this bar measures, the figure, and the source.]" },
        { label: "[Category]", value: null, note: "[What this bar measures, the figure, and the source.]" }
      ]
    }
  },

  connections: {
    heading: "Where this fits",
    intro: "[Preview how the issue connects to a UN Sustainable Development Goal and to Georgia Tech’s Sustainability Next Plan.]",
    sdgs: [
      {
        number: "[#]",
        name: "[Official SDG name]",
        note: "[Explain which part of this goal the issue touches, and what a Georgia Tech reader can do that actually serves it.]"
      },
      {
        number: "[#]",
        name: "[Official SDG name]",
        note: "[Explain the second connection. Say how it differs from the first goal, if you use more than one.]"
      }
    ],
    nextPlan: {
      summary: "[Connect the issue to Sustainability Next. Name the priority and how this campaign carries it onto campus.]",
      priorities: [
        {
          name: "[Sustainability Next priority]",
          note: "[Which objectives or strategies you are tying to, and how the resources on this page carry them out.]"
        }
      ]
    }
  },

  audience: {
    heading: "Who this is for",
    name: "[Name a specific audience, not “everyone.”]",
    paragraphs: [
      "[Who they are on campus, and what they are already trying to get done.]",
      "[What they care about, what they are tired of hearing, and what would make this worth their time.]",
      "[How the page is built for them: length, tone, order, and which actions sit first. Write this in the organization’s voice.]"
    ]
  },

  resourcesIntro: {
    heading: "Resources",
    lede: "[Introduce the programs, organizations, and tools you are advertising. Say what they share, and how a reader should choose among them.]"
  },

  resources: [
    {
      id: "program-1",
      kind: "Program",
      name: "[Program name]",
      organizer: "[Who runs it]",
      summary: "[What the program is, who it is for, and what a person does when they show up.]",
      why: "[Why this program is relevant to your audience, in this moment.]",
      action: "[The specific next step: a meeting, a form, a shift, a class.]",
      href: "",
      hrefLabel: "Visit the program",
      tags: ["[UN SDG]", "[Sustainability Next priority]"]
    },
    {
      id: "org-1",
      kind: "Organization",
      name: "[Organization name]",
      organizer: "[Campus or community home]",
      summary: "[What the organization works on and how a new person can join or use it.]",
      why: "[Why this organization is a fit for the audience you named above.]",
      action: "[The specific next step.]",
      href: "",
      hrefLabel: "Visit the organization",
      tags: ["[UN SDG]", "[Sustainability Next priority]"]
    },
    {
      id: "resource-1",
      kind: "Resource",
      name: "[Resource name]",
      organizer: "[Who publishes it]",
      summary: "[What the resource contains and when someone should use it.]",
      why: "[Why this resource helps your audience act on the issue.]",
      action: "[The specific next step.]",
      href: "",
      hrefLabel: "Open the resource",
      tags: ["[UN SDG]", "[Sustainability Next priority]"]
    }
  ],

  relevance: {
    heading: "Why these, for you",
    paragraphs: [
      "[Explain why these initiatives matter to the audience you named. Tie each one to a real constraint they have, such as time, cost, major, or where they live.]",
      "[Say what you left out, and why the resources you kept are the right set for this reader.]"
    ]
  },

  actions: {
    heading: "Get involved",
    intro: "[Invite the reader to do something this week. Match the size of the ask to the audience.]",
    items: [
      {
        id: "action-1",
        title: "[A first action that takes less than ten minutes]",
        detail: "[What to do, where, and what happens after they do it.]",
        href: "",
        hrefLabel: "Start"
      },
      {
        id: "action-2",
        title: "[An action with a group]",
        detail: "[Who they will meet, when it happens, and how to join.]",
        href: "",
        hrefLabel: "Join"
      },
      {
        id: "action-3",
        title: "[A deeper commitment]",
        detail: "[What this asks of them over the semester, and who supports them.]",
        href: "",
        hrefLabel: "Commit"
      }
    ]
  },

  matcher: {
    title: "Find a place to start",
    intro: "[A one-sentence invitation to answer a few questions. The result should point to one resource above.]",
    questions: [
      {
        prompt: "[Question about what the reader wants to do first]",
        options: [
          { label: "[Choice]", resourceId: "program-1", because: "[Why this choice points to the program.]" },
          { label: "[Choice]", resourceId: "org-1", because: "[Why this choice points to the organization.]" },
          { label: "[Choice]", resourceId: "resource-1", because: "[Why this choice points to the resource.]" }
        ]
      },
      {
        prompt: "[Question about how much time they have, or where they want to plug in]",
        options: [
          { label: "[Choice]", resourceId: "resource-1", because: "[Why this choice points here.]" },
          { label: "[Choice]", resourceId: "program-1", because: "[Why this choice points here.]" },
          { label: "[Choice]", resourceId: "org-1", because: "[Why this choice points here.]" }
        ]
      },
      {
        prompt: "[Question that separates a campus action from a community action]",
        options: [
          { label: "[Choice]", resourceId: "org-1", because: "[Why this choice points here.]" },
          { label: "[Choice]", resourceId: "program-1", because: "[Why this choice points here.]" },
          { label: "[Choice]", resourceId: "resource-1", because: "[Why this choice points here.]" }
        ]
      }
    ]
  },

  video: {
    heading: "Watch",
    title: "[Video title]",
    url: "",
    caption: "[Tell the viewer what to notice and why this video belongs on the page. Say who made it.]",
    transcript: "[Paste a short transcript, or describe where the captions and transcript live.]"
  },

  footer: {
    close: "[Closing line in the organization’s voice. Repeat the invitation in one sentence.]",
    credits: "[Names, course, and term]",
    note: "Student campaign template for the Georgia Tech community. Name the organization you represent before you publish. This page is not an official Georgia Tech site."
  }
};
