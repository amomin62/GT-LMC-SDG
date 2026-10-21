/**
 * Campaign content
 * ----------------
 * This is the only file you need to edit to fill the site.
 * Bracketed lines are placeholders. Replace them with finished prose.
 * The assignment asks for 1,200–2,000 words. The counter in the top bar
 * ignores any line that is still entirely inside square brackets.
 *
 * Set templateMode to false when the editing bar should disappear.
 *
 * Page order:
 *   1. Hero         campaign title and who it is for
 *   2. Issue        the problem, three figures, UN SDG + Sustainability Next
 *   3. Video        YouTube, Vimeo, Google Drive, or a video file in the folder
 *   4. Organizations  exactly the four groups you are promoting
 *   5. Find your fit  a short quiz that recommends one of the four
 *
 * Video: paste the link into video.url. These all work:
 *   https://www.youtube.com/watch?v=VIDEO_ID
 *   https://youtu.be/VIDEO_ID
 *   https://vimeo.com/123456789
 *   https://drive.google.com/file/d/FILE_ID/view   (share as “Anyone with the link”)
 *   media/our-video.mp4                             (a file saved in this project)
 *
 * Quiz: every option has an orgId. It must match one of the organization ids
 * below (org-1, org-2, org-3, org-4). The organization picked most often wins.
 *
 * Sustainability Next priorities (use the official names):
 *   Institute Operations · Education for Sustainable Development ·
 *   Leading Sustainability Research · Culture and Organization ·
 *   Climate Solutions · Living Learning Campus
 */
window.SITE = {
  templateMode: true,

  org: {
    name: "ATLearn",
    voice: "We are ATLearn, Georgia Tech students who believe a good education should be within reach of every Atlantan. We are inviting you to teach, mentor, and show up for the city you study in."
  },

  campaign: {
    kicker: "ATLearn · Opening doors to education across Atlanta",
    title: "Learning shouldn’t depend on your zip code.",
    lede: "A few blocks from campus, Atlanta kids and adults are shut out of the kind of education Georgia Tech students often take for granted. ATLearn connects you with the people already working to close that gap, so what you learn here can open doors next door.",
    audience: "Georgia Tech students"
  },

  issue: {
    heading: "The issue",
    paragraphs: [
      "Access to education means more than having a school nearby. It means a qualified teacher in every classroom, books at home, reliable internet, a safe way to get to class, and a second chance for adults who never finished school. In Atlanta, those things are spread unevenly. Some neighborhoods have tutors, enrichment programs, and college counselors. Others, a few miles away, have very little. The gap shows up early, in how well children can read by the end of elementary school, and it follows them into adulthood: metro Atlanta ranks last among the 50 largest U.S. metros for how often children born into low-income families climb the economic ladder.",
      "This is not happening somewhere far away. English Avenue and Vine City sit just west of campus, and a recent study of Atlanta’s Westside found that more than half of the children there live below the federal poverty line. Georgia Tech students spend four years building exactly what these neighborhoods are short on: strong reading, math, and science skills, mentors who have been through college, and a clear path to get there. An hour a week tutoring a middle schooler, a Saturday coding workshop, or helping an adult prepare for the GED turns your education into something you share. It works both ways, too. You build communication and leadership skills no class can teach, and you get to know the city you live in beyond the edge of campus."
    ],
    stats: [
      {
        figure: "35.7%",
        label: "of Atlanta Public Schools students in grades 3–8 scored proficient or above in English Language Arts",
        source: "Georgia Milestones results, Atlanta Public Schools, 2023–24"
      },
      {
        figure: "4.5%",
        label: "chance that a child raised in the bottom fifth of incomes in metro Atlanta reaches the top fifth as an adult",
        source: "Chetty et al., Equality of Opportunity Project, 2014"
      },
      {
        figure: "50th of 50",
        label: "metro Atlanta’s rank among the largest U.S. metros for upward mobility of children from low-income families",
        source: "Opportunity Insights, 2024, reported by Axios Atlanta"
      }
    ],
    sdgs: [
      { number: "4", name: "Quality Education" }
    ],
    nextPlan: ["Education for Sustainable Development"],
    connection: "SDG 4 asks the world to “ensure inclusive and equitable quality education and promote lifelong learning opportunities for all.” Georgia Tech’s Sustainability Next Plan makes Education for Sustainable Development one of its six priorities, and since 2023 it has funded faculty to build the SDGs into roughly 100 courses, so nearly every Tech undergraduate now meets the goals in class. The plan also calls on Georgia Tech to “lead by example in the practice and culture of sustainability,” and the Institute’s strategic plan commits it to being “an anchor institution, partner, and catalyst of sustainable development in our city.” ATLearn carries that commitment off the syllabus and into the neighborhood: when you tutor, mentor, or teach next door, you put SDG 4 into practice in the city Georgia Tech calls home."
  },

  video: {
    heading: "Watch",
    title: "[Video title]",
    url: "",
    caption: "[Tell the viewer what to notice and why this video belongs on the page. Say who made it.]",
    transcript: "[Paste a short transcript, or say where captions are available.]"
  },

  organizations: {
    heading: "Four organizations doing the work",
    intro: "[Introduce the four organizations. Say what they have in common and how a reader should choose among them.]",
    items: [
      {
        id: "org-1",
        name: "[Organization 1]",
        tagline: "[One line on what they do]",
        about: "[What the organization is, who runs it, and what it works on.]",
        why: "[Why this organization matters to your audience specifically.]",
        involve: "[How to get involved: a meeting, an event, a form, a volunteer shift.]",
        href: "",
        hrefLabel: "Visit their site",
        tags: ["SDG 4: Quality Education", "Education for Sustainable Development"]
      },
      {
        id: "org-2",
        name: "[Organization 2]",
        tagline: "[One line on what they do]",
        about: "[What the organization is, who runs it, and what it works on.]",
        why: "[Why this organization matters to your audience specifically.]",
        involve: "[How to get involved: a meeting, an event, a form, a volunteer shift.]",
        href: "",
        hrefLabel: "Visit their site",
        tags: ["SDG 4: Quality Education", "Education for Sustainable Development"]
      },
      {
        id: "org-3",
        name: "[Organization 3]",
        tagline: "[One line on what they do]",
        about: "[What the organization is, who runs it, and what it works on.]",
        why: "[Why this organization matters to your audience specifically.]",
        involve: "[How to get involved: a meeting, an event, a form, a volunteer shift.]",
        href: "",
        hrefLabel: "Visit their site",
        tags: ["SDG 4: Quality Education", "Education for Sustainable Development"]
      },
      {
        id: "org-4",
        name: "[Organization 4]",
        tagline: "[One line on what they do]",
        about: "[What the organization is, who runs it, and what it works on.]",
        why: "[Why this organization matters to your audience specifically.]",
        involve: "[How to get involved: a meeting, an event, a form, a volunteer shift.]",
        href: "",
        hrefLabel: "Visit their site",
        tags: ["SDG 4: Quality Education", "Education for Sustainable Development"]
      }
    ]
  },

  interactive: {
    heading: "Find your fit",
    intro: "[A one-sentence invitation: answer three questions and we will point you to one of the four organizations.]",
    questions: [
      {
        prompt: "[Question 1, e.g. How much time do you have this semester?]",
        options: [
          { label: "[Answer]", orgId: "org-1" },
          { label: "[Answer]", orgId: "org-2" },
          { label: "[Answer]", orgId: "org-3" },
          { label: "[Answer]", orgId: "org-4" }
        ]
      },
      {
        prompt: "[Question 2, e.g. What kind of work sounds most like you?]",
        options: [
          { label: "[Answer]", orgId: "org-2" },
          { label: "[Answer]", orgId: "org-3" },
          { label: "[Answer]", orgId: "org-4" },
          { label: "[Answer]", orgId: "org-1" }
        ]
      },
      {
        prompt: "[Question 3, e.g. Where would you rather make a difference?]",
        options: [
          { label: "[Answer]", orgId: "org-3" },
          { label: "[Answer]", orgId: "org-4" },
          { label: "[Answer]", orgId: "org-1" },
          { label: "[Answer]", orgId: "org-2" }
        ]
      }
    ]
  },

  footer: {
    close: "[Closing line in your organization’s voice. Repeat the invitation in one sentence.]",
    credits: "[Names, course, and term]",
    note: "Student campaign for the Georgia Tech community. This page is not an official Georgia Tech site."
  }
};
