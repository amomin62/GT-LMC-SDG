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
 *   5. Find your fit  quiz. Result keys match organization ids, plus "tie".
 *
 * Video: paste the link into video.url. These all work:
 *   https://www.youtube.com/watch?v=VIDEO_ID
 *   https://youtu.be/VIDEO_ID
 *   https://vimeo.com/123456789
 *   https://drive.google.com/file/d/FILE_ID/view   (share as “Anyone with the link”)
 *   media/our-video.mp4                             (a file saved in this project)
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
      "Access to education means more than having a school nearby. It means a qualified teacher in every classroom, books at home, reliable internet, a safe way to get to class, and a second chance for adults who never finished school. In Atlanta, those things are spread unevenly. Some neighborhoods have tutors, enrichment programs, and college counselors. Others, a few miles away, have very little. The gap shows up early, in how well children can read by the end of elementary school, and in Atlanta the reading gap between children from low-income families and their classmates is wider than in other large U.S. cities.",
      "This is not happening somewhere far away. English Avenue and Vine City sit just west of campus, and a recent study of Atlanta’s Westside found that more than half of the children there live below the federal poverty line. Georgia Tech students spend four years building exactly what these neighborhoods are short on: strong reading, math, and science skills, mentors who have been through college, and a clear path to get there. An hour a week tutoring a middle schooler, a Saturday coding workshop, or helping an adult prepare for the GED turns your education into something you share. It works both ways, too. You build communication and leadership skills no class can teach, and you get to know the city you live in beyond the edge of campus."
    ],
    stats: [
      {
        figure: "35.7%",
        label: "of Atlanta Public Schools students in grades 3–8 scored proficient or above in English Language Arts",
        source: "Georgia Milestones results, Atlanta Public Schools, 2023–24"
      },
      {
        figure: "60 points",
        label: "gap in 4th-grade reading scores between Atlanta Public Schools students from low-income families and their classmates, wider than in other large U.S. cities, Georgia, or the nation",
        source: "National Assessment of Educational Progress (The Nation’s Report Card), 2024"
      },
      {
        figure: "1 in 12",
        label: "Atlanta households has no home broadband internet subscription, cutting families off from homework, online classes, and job training",
        source: "U.S. Census Bureau, American Community Survey 2020–2024"
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
    title: "Inclusive Education – Education Equity Now",
    url: "https://www.youtube.com/watch?v=8HPh4RoV63s",
    caption: "[Tell the viewer what to notice and why this video belongs on the page. Say who made it.]",
    transcript: "[Paste a short transcript, or say where captions are available.]"
  },

  organizations: {
    heading: "Four organizations doing the work",
    intro: "[Introduce the four organizations. Say what they have in common and how a reader should choose among them.]",
    items: [
      {
        id: "horizons-atlanta",
        name: "Horizons Atlanta",
        tagline: "Independent Atlanta Nonprofit",
        about: "Horizons Atlanta is a non-profit organization that offers free summer learning and academic assistance to students from disadvantaged communities. The organization concentrates on literacy, STEM education, enrichment, and personal growth. Individuals interested in volunteering and partnering with Horizons Atlanta are encouraged to find out more.",
        why: "Horizons Atlanta is important for Georgia Tech students in that it strives to foster education equity in Atlanta and has a program at the Georgia Tech campus. Students who are interested in education, technology, and community outreach can investigate how to help out the kids around here.",
        involve: "Visit the Horizons Atlanta website to explore volunteer opportunities and learn how to support educational programs for underserved students.",
        href: "https://www.horizonsatlanta.org/",
        hrefLabel: "Visit the organization",
        tags: ["UN SDG 4: Quality Education", "Education for Sustainable Development"]
      },
      {
        id: "inspiredu-atl",
        name: "Inspiredu",
        tagline: "Atlanta Community Nonprofit",
        about: "Inspiredu attempts to reduce the digital divide through supplying underserved communities with computers, teaching digital literacy and computer technology. Volunteer opportunities include working as a facilitator for a digital literacy workshop or preparing and refurbishing laptops.",
        why: "Inspiredu is very applicable to Georgia Tech students since it combines technology, education, and community service. This means that students can use their technology expertise to assist families in gaining access to online materials.",
        involve: "Check out Inspiredu’s website for digital literacy and technology related volunteering opportunities.",
        href: "https://www.iuatl.org/",
        hrefLabel: "Visit the organization",
        tags: ["UN SDG 4: Quality Education", "Education for Sustainable Development"]
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
        tags: ["UN SDG 4: Quality Education", "Education for Sustainable Development"]
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
        tags: ["UN SDG 4: Quality Education", "Education for Sustainable Development"]
      }
    ]
  },

  interactive: {
    heading: "Find your fit",
    intro: "Answer four questions about how you want to help. You will get a match, Horizons Atlanta or Inspiredu, and a specific page where a Georgia Tech student can volunteer.",
    restartLabel: "Retake the quiz",
    questions: [
      {
        prompt: "How do you want to spend the hour?",
        options: [
          {
            label: "With a student, teaching or tutoring",
            scores: { "horizons-atlanta": 2 }
          },
          {
            label: "With hardware and software, so a family can get online",
            scores: { "inspiredu-atl": 2 }
          },
          {
            label: "Wherever a team can use me soonest",
            scores: { "horizons-atlanta": 1, "inspiredu-atl": 1 }
          }
        ]
      },
      {
        prompt: "Which fact on this page do you want to work on?",
        options: [
          {
            label: "Too few Atlanta students are reading on grade level",
            scores: { "horizons-atlanta": 2 }
          },
          {
            label: "Households without home internet cannot reach homework or job training",
            scores: { "inspiredu-atl": 2 }
          },
          {
            label: "Both. One gap feeds the other.",
            scores: { "horizons-atlanta": 1, "inspiredu-atl": 1 }
          }
        ]
      },
      {
        prompt: "What can you bring this month?",
        options: [
          {
            label: "Patience to explain an idea until it clicks",
            scores: { "horizons-atlanta": 2 }
          },
          {
            label: "Comfort fixing a laptop or coaching someone through an app",
            scores: { "inspiredu-atl": 2 }
          },
          {
            label: "A steady hour. I can learn the rest on site.",
            scores: { "horizons-atlanta": 1, "inspiredu-atl": 1 }
          }
        ]
      },
      {
        prompt: "When can you show up?",
        options: [
          {
            label: "Summer, when school is out and learning loss grows",
            scores: { "horizons-atlanta": 2 }
          },
          {
            label: "A workshop or a weekend during the semester",
            scores: { "inspiredu-atl": 2 }
          },
          {
            label: "The first opening either group has",
            scores: { "horizons-atlanta": 1, "inspiredu-atl": 1 }
          }
        ]
      }
    ],
    results: {
      "horizons-atlanta": {
        title: "Horizons Atlanta fits how you want to help.",
        body: "Your answers point to time with students: teaching, reading, and the months when school is out. Horizons at Georgia Tech serves about 240 rising 1st through 9th graders with reading support, STEAM, and enrichment, on campus in the summer and during the school year. Fill out the volunteer interest form and say you are a Georgia Tech student. That hour is how you put SDG 4 into practice in the city you study in.",
        links: [
          { label: "Open the volunteer form", href: "https://www.horizonsatlanta.org/about/volunteer-with-us/" },
          { label: "See Horizons at Georgia Tech", href: "https://www.horizonsatlanta.org/our-region/georgia-tech/" }
        ]
      },
      "inspiredu-atl": {
        title: "Inspiredu fits how you want to help.",
        body: "Your answers point to the technology side of the same gap: computers, internet, and families shut out of homework and training. Digital Skills Volunteers support Inspiredu workshops, in person or online. Tech Team volunteers clean and reimage the laptops those programs give out. Open the volunteer page and pick the role that matches the hour you have.",
        links: [
          { label: "See Inspiredu volunteer roles", href: "https://www.iuatl.org/volunteer" }
        ]
      },
      tie: {
        title: "Start with either organization. Then come back for the other.",
        body: "Your answers split between teaching and technology, and Atlanta needs both. Only 35.7 percent of Atlanta Public Schools students in grades 3–8 scored proficient or above in English, and about one Atlanta household in twelve has no home internet. Contact the group you can reach this week. Use the other link after that first hour is on your calendar.",
        links: [
          { label: "Horizons Atlanta volunteer form", href: "https://www.horizonsatlanta.org/about/volunteer-with-us/" },
          { label: "Inspiredu volunteer page", href: "https://www.iuatl.org/volunteer" }
        ]
      }
    }
  },

  footer: {
    close: "[Closing line in your organization’s voice. Repeat the invitation in one sentence.]",
    credits: "[Names, course, and term]",
    note: "Student campaign for the Georgia Tech community. This page is not an official Georgia Tech site."
  }
};
