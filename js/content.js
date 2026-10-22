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
    caption: "",
    transcript: ""
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
        id: "bbbs-atlanta",
        name: "Big Brothers Big Sisters of Metro Atlanta",
        tagline: "Atlanta Youth Mentoring Nonprofit",
        about: "Big Brothers Big Sisters of Metro Atlanta is a nonprofit organization that connects children and teens with adult volunteer mentors. The organization supports one-to-one relationships that help young people build confidence and explore their interests. Mentors and youth spend time together through activities such as reading, visiting the library, and exploring the community.",
        why: "Big Brothers Big Sisters is relevant to Georgia Tech students since it combines mentoring, learning, and community service. Students who are interested in working with young people can share their experiences with education and college while becoming a consistent source of encouragement for a child in metro Atlanta.",
        involve: "Visit the organization’s website to review mentor requirements and sign up for a Big Orientation. Volunteers commit to meeting with their mentee at least twice a month for at least one year.",
        href: "https://bbbsatl.org/be-a-big/",
        hrefLabel: "Visit the organization",
        tags: ["UN SDG 4: Quality Education", "Education for Sustainable Development"]
      },
      {
        id: "buddy-jackets",
        name: "Buddy Jackets",
        tagline: "Georgia Tech Student Service Organization",
        about: "Buddy Jackets is a student organization at Georgia Tech that connects students with children in the surrounding Atlanta community through mentoring, volunteering, and events. The organization promotes higher education and builds relationships between college students and local youth. Its community service opportunities include volunteering at the Agape Youth and Family Center.",
        why: "Buddy Jackets is relevant to Georgia Tech students since it combines education, mentorship, and community service through a campus organization. Students interested in working with children can share their experiences with college, encourage an interest in learning, and build connections with other Tech students who want to support the Atlanta community.",
        involve: "Visit Buddy Jackets’ Georgia Tech organization page to learn more and contact the group about current membership and volunteer opportunities. Ask how to take part in mentoring, community events, and service activities during the semester.",
        href: "https://gatech.campuslabs.com/engage/organization/buddy-jackets",
        hrefLabel: "Visit the organization",
        tags: ["UN SDG 4: Quality Education", "Education for Sustainable Development"]
      }
    ]
  },

  interactive: {
    heading: "Find your fit",
    intro: "Answer four questions about how you want to help. You will get a match among Horizons Atlanta, Inspiredu, Big Brothers Big Sisters of Metro Atlanta, and Buddy Jackets, plus a page where a Georgia Tech student can get involved.",
    restartLabel: "Retake the quiz",
    questions: [
      {
        prompt: "How do you want to spend the time?",
        options: [
          {
            label: "In a classroom, teaching literacy or STEM",
            scores: { "horizons-atlanta": 2 }
          },
          {
            label: "With laptops and digital-literacy workshops",
            scores: { "inspiredu-atl": 2 }
          },
          {
            label: "One-to-one with the same young person",
            scores: { "bbbs-atlanta": 2 }
          },
          {
            label: "Alongside other Tech students at community events",
            scores: { "buddy-jackets": 2 }
          }
        ]
      },
      {
        prompt: "Which commitment fits you?",
        options: [
          {
            label: "A summer program, when school is out",
            scores: { "horizons-atlanta": 2 }
          },
          {
            label: "A workshop shift, or a session refurbishing computers",
            scores: { "inspiredu-atl": 2 }
          },
          {
            label: "At least twice a month for a year",
            scores: { "bbbs-atlanta": 2 }
          },
          {
            label: "Events and service during the semester",
            scores: { "buddy-jackets": 2 }
          }
        ]
      },
      {
        prompt: "Where do you picture yourself?",
        options: [
          {
            label: "In Horizons’ summer learning program, including the one at Georgia Tech",
            scores: { "horizons-atlanta": 2 }
          },
          {
            label: "At a workbench or a digital skills workshop",
            scores: { "inspiredu-atl": 2 }
          },
          {
            label: "At the library or out in the neighborhood with one mentee",
            scores: { "bbbs-atlanta": 2 }
          },
          {
            label: "At the Agape Youth and Family Center, or a Buddy Jackets event",
            scores: { "buddy-jackets": 2 }
          }
        ]
      },
      {
        prompt: "What do you want someone to get from you?",
        options: [
          {
            label: "A teacher for the months when school is out",
            scores: { "horizons-atlanta": 2 }
          },
          {
            label: "A computer, and someone to explain how to use it",
            scores: { "inspiredu-atl": 2 }
          },
          {
            label: "One adult who keeps showing up",
            scores: { "bbbs-atlanta": 2 }
          },
          {
            label: "A group of college students who make higher education feel nearby",
            scores: { "buddy-jackets": 2 }
          }
        ]
      }
    ],
    results: {
      "horizons-atlanta": {
        title: "Horizons Atlanta fits how you want to help.",
        body: "Your answers point to teaching: literacy, STEM, and the summer months when school is out. Horizons Atlanta offers free summer learning for students from communities with the fewest extra supports, including a program at the Georgia Tech campus. Fill out the volunteer interest form and say you are a Georgia Tech student.",
        links: [
          { label: "Open the Horizons volunteer form", href: "https://www.horizonsatlanta.org/about/volunteer-with-us/" },
          { label: "See Horizons at Georgia Tech", href: "https://www.horizonsatlanta.org/our-region/georgia-tech/" }
        ]
      },
      "inspiredu-atl": {
        title: "Inspiredu fits how you want to help.",
        body: "Your answers point to the technology side of the gap: computers, workshops, and families shut out of homework and training. Digital Skills Volunteers support Inspiredu workshops, in person or online. Tech Team volunteers clean and reimage the laptops those programs give out. Open the volunteer page and pick the role that matches the hour you have.",
        links: [
          { label: "See Inspiredu volunteer roles", href: "https://www.iuatl.org/volunteer" }
        ]
      },
      "bbbs-atlanta": {
        title: "Big Brothers Big Sisters of Metro Atlanta fits how you want to help.",
        body: "Your answers point to a one-to-one relationship: the same young person, at least twice a month, for at least a year. Big Brothers Big Sisters matches children and teens with mentors who read, visit the library, and spend time in the community. Review the mentor requirements and sign up for a Big Orientation. Tell them you are a Georgia Tech student.",
        links: [
          { label: "Become a Big", href: "https://bbbsatl.org/be-a-big/" }
        ]
      },
      "buddy-jackets": {
        title: "Buddy Jackets fits how you want to help.",
        body: "Your answers point to a campus group: other Georgia Tech students, events during the semester, and service with children in Atlanta. Buddy Jackets mentors local youth, promotes higher education, and volunteers at the Agape Youth and Family Center. Open their Georgia Tech page and ask about membership, mentoring, and the next community event.",
        links: [
          { label: "See Buddy Jackets on campus", href: "https://gatech.campuslabs.com/engage/organization/buddy-jackets" }
        ]
      },
      tie: {
        body: "Your answers landed evenly, so more than one organization fits. Each link below is a different kind of help. Contact the group you can reach this week, and save the others for after that first step is on your calendar. Only 35.7 percent of Atlanta Public Schools students in grades 3–8 scored proficient or above in English."
      }
    }
  },

  footer: {
    close: "Join ATLearn in opening doors to education across Atlanta: teach, mentor, or volunteer.",
    credits: "Alexandra, Ali, Owen, Siva, and Srija. LMC 3403, Fall 2026.",
    note: "Student campaign for the Georgia Tech community. This page is not an official Georgia Tech site."
  }
};
