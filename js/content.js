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
 *   1. Hero         hook question over a background photo
 *   2. Issue        guess-the-number, the problem, three figures (one tone: "hope"),
 *                   UN SDG + Sustainability Next, and a "your turn" reflection
 *   3. Context      map of school reading scores (data in js/schools.js) and a
 *                   guess-first chart comparing Atlanta's reading gap
 *   4. Video        YouTube, Vimeo, Google Drive, or a video file in the folder
 *   5. Organizations  the four groups, each with a photo in images/
 *   6. Find your fit  quiz. Result keys match organization ids, plus "tie".
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
  templateMode: false,

  org: {
    name: "ATLearn",
    voice: "We are ATLearn, Georgia Tech students who believe a good education should be within reach of every Atlantan. We are inviting you to teach, mentor, and show up for the city you study in."
  },

  campaign: {
    kicker: "ATLearn · Georgia Tech students opening doors to education in Atlanta",
    title: "What if your zip code decided how well you could read?",
    lede: "Within two miles of Tech Tower, there are schools where four in five students read at grade level, and schools where fewer than one in six do. You already have what helps close that gap: time, skills, and a college story worth sharing. Ready to use them?",
    primaryCta: "Take the 10-second guess",
    secondaryCta: "See the map",
    audience: "Georgia Tech students",
    image: "images/hero-horizons.jpg",
    imageCredit: "Photo: Horizons Atlanta summer program"
  },

  issue: {
    heading: "Start with a guess",
    contextHeading: "The gap is closer than you think",
    guess: {
      prompt: "Out of every 10 students in Atlanta Public Schools, grades 3–8, how many do you think read and write at grade level?",
      answer: 3.57,
      reveal: "35.7% of Atlanta Public Schools students in grades 3–8 scored proficient or above in English Language Arts.",
      high: "You guessed {n}. The real answer is fewer than 4. From campus, it is easy to picture the schools we went to.",
      close: "You guessed {n}. Close: the real answer is just under 4, so most students are behind.",
      low: "You guessed {n}. The real answer is a little higher, just under 4, which still leaves most students behind.",
      source: "Georgia Department of Education, Georgia Milestones 2023–24",
      sourceUrl: "https://goews.georgia.gov/dashboards-data-report-card/downloadable-data"
    },
    story: {
      kicker: "Behind the number",
      title: "Meet Michael, a third grader about three miles from campus",
      image: "images/michael-crowder.jpg",
      imageAlt: "Michael Crowder reading a book at an after-school literacy program.",
      paragraphs: [
        "Michael Crowder stands at the front of his third-grade classroom, his mustard-yellow polo buttoned to the top. “Give us some vowels,” his teacher says. His eyes search the chart, but he doesn’t land on an answer.",
        "Michael missed most of first grade. It was the first fall of the pandemic, and for months Atlanta held school only online. His mom had just had a baby, and their small apartment had no quiet place to learn. By the end of first grade he knew two sight words, “a” and “the.” First graders are expected to know 200.",
        "His teacher, La’Neeka Gilbert-Jackson, followed his class from first grade to third, and that steady presence helped him start reading. Midway through third grade, he reads like a first grader: real progress, but still behind, like most of his classmates. Now imagine one more adult in his corner. That could be you."
      ],
      quote: "He wants it. He’ll catch up.",
      quoteBy: "La’Neeka Gilbert-Jackson, Michael’s teacher",
      school: "William M. Boyd Elementary School",
      schoolName: "Boyd Elementary",
      schoolLabel: "Find it on the map",
      source: "Associated Press, “‘Too much to learn’: Schools race to catch up kids’ reading,” April 2023",
      sourceUrl: "https://apnews.com/article/reading-third-grade-phonics-bd9a14dd348d88c2b11e2dce38829a8e"
    },
    paragraphs: [
      "Now think about what got you here: a teacher who would not let you coast, books at home, a laptop and Wi-Fi, someone who had been to college. Access to education is all of those things, and in Atlanta they are spread unevenly.",
      "This is not happening somewhere far away. English Avenue and Vine City sit just west of campus, where a recent study found that more than half of children live below the federal poverty line. So what could one hour a week of your time do? Tutor a middle schooler in math, help a family set up their first laptop, or show a kid what a college student looks like up close."
    ],
    stats: [
      {
        figure: "60 points",
        label: "gap in 4th-grade reading between Atlanta Public Schools students from low-income families and their classmates, more than double the national gap",
        source: "The Nation’s Report Card (NAEP), 2024",
        sourceUrl: "https://www.nationsreportcard.gov/profiles/districtprofile/overview/XA"
      },
      {
        figure: "1 in 12",
        label: "Atlanta households has no home broadband, cutting families off from homework, online classes, and job training",
        source: "U.S. Census Bureau, American Community Survey 2020–2024",
        sourceUrl: "https://www.census.gov/quickfacts/atlantacitygeorgia"
      },
      {
        tone: "hope",
        badge: "Reason for hope",
        figure: "+6.9 points",
        label: "Atlanta’s gain in 4th-grade reading from 2022 to 2024, the only large-city district in the country to improve significantly. Extra help works.",
        source: "The Nation’s Report Card (NAEP), 2024",
        sourceUrl: "https://www.nationsreportcard.gov/profiles/districtprofile/overview/XA"
      }
    ],
    sdgs: [
      { number: "4", name: "Quality Education", href: "https://sdgs.un.org/goals/goal4" }
    ],
    nextPlan: [
      { name: "Education for Sustainable Development", href: "https://sustain.gatech.edu/sustainability-next-plan/" }
    ],
    connection: "Tutoring, mentoring, and digital access put UN Sustainable Development Goal 4, Quality Education, into practice. ATLearn connects that goal with Georgia Tech’s Education for Sustainable Development priority and its commitment to serving Atlanta.",
    links: [
      { label: "UN Sustainable Development Goal 4", href: "https://sdgs.un.org/goals/goal4" },
      { label: "Georgia Tech Sustainability Next Plan", href: "https://sustain.gatech.edu/sustainability-next-plan/" },
      { label: "Georgia Tech Strategic Plan", href: "https://strategicplan.gatech.edu/" }
    ],
    reflection: {
      prompt: "What helped you most on the way to Georgia Tech?",
      options: [
        {
          label: "A teacher who pushed me",
          reply: "Many Atlanta kids lose that teacher every summer, when reading skills slide. Horizons Atlanta fills those months with free summer learning, including a program on our campus.",
          orgId: "horizons-atlanta"
        },
        {
          label: "A computer and internet at home",
          reply: "About 1 in 12 Atlanta households has no home broadband. Inspiredu gets laptops to families and teaches them to use them, with volunteers running workshops and refurbishing computers.",
          orgId: "inspiredu-atl"
        },
        {
          label: "An adult who kept showing up",
          reply: "A mentor who reads with a child and shows up twice a month can change what that child expects of school. Big Brothers Big Sisters matches you to do exactly that.",
          orgId: "bbbs-atlanta"
        },
        {
          label: "Knowing someone who went to college",
          reply: "For a kid who has never met a college student, you are proof that it is possible. Buddy Jackets brings Tech students and local children together all year.",
          orgId: "buddy-jackets"
        }
      ]
    }
  },

  context: {
    heading: "Two miles, two different schools",
    intro: "Each dot is an Atlanta public school, colored by the share of students reading at grade level. Tap a dot to explore a school near campus.",
    source: "Georgia Milestones 2023–24 English Language Arts, Georgia Governor’s Office of Education and Workforce Strategy. School locations: National Center for Education Statistics.",
    sourceUrl: "https://goews.georgia.gov/dashboards-data-report-card/downloadable-data",
    chart: {
      heading: "Is this just how big cities are?",
      prompt: "Fourth graders from low-income families score lower in reading almost everywhere. Before you see Atlanta, make a call: is its gap smaller or bigger than the nation’s?",
      reveal: "Atlanta’s gap is 60 points, more than twice the national gap of 27. That is the gap ATLearn is asking you to help close.",
      lowLabel: "Students from low-income families",
      highLabel: "Their classmates",
      rows: [
        { label: "United States (public schools)", low: 202.0, high: 229.2, gap: 27 },
        { label: "Large U.S. cities", low: 199.2, high: 229.1, gap: 30 },
        { label: "Georgia", low: 205.9, high: 237.7, gap: 32 },
        { label: "Atlanta Public Schools", low: 195.4, high: 255.5, gap: 60, highlight: true }
      ],
      source: "The Nation’s Report Card (NAEP), 2024 grade 4 reading, average scale scores",
      sourceUrl: "https://www.nationsreportcard.gov/reports/reading/2024/g4_8/performance-by-student-group/?grade=4"
    }
  },

  video: {
    heading: "Watch",
    title: "Inclusive Education – Education Equity Now",
    url: "https://www.youtube.com/watch?v=8HPh4RoV63s",
    prompt: "As you watch, ask yourself: which of these barriers have you never had to think about?",
    caption: "",
    transcript: ""
  },

  organizations: {
    heading: "Find a place to help",
    intro: "Teach, share your tech skills, or mentor a young person. Choose a group below, or take the quiz to find your fit.",
    items: [
      {
        id: "horizons-atlanta",
        name: "Horizons Atlanta",
        tagline: "Summer learning",
        about: "Horizons Atlanta offers free summer programs in literacy, STEM, and enrichment, including one on Georgia Tech’s campus.",
        involve: "Help local students keep learning while school is out. Explore the program’s volunteer opportunities.",
        href: "https://www.horizonsatlanta.org/",
        hrefLabel: "Explore Horizons Atlanta",
        image: "images/org-horizons.jpg",
        imageAlt: "A Horizons Atlanta volunteer teaching a student to play bass guitar in a classroom",
        imageCredit: "Photo: Horizons Atlanta",
        tags: ["UN SDG 4: Quality Education", "Education for Sustainable Development"]
      },
      {
        id: "inspiredu-atl",
        name: "Inspiredu",
        tagline: "Digital access and skills",
        about: "Inspiredu provides computers and digital skills training to help Atlanta families get online.",
        involve: "Put your tech skills to work by refurbishing laptops or supporting a digital literacy workshop.",
        href: "https://www.iuatl.org/",
        hrefLabel: "Explore Inspiredu",
        image: "images/org-inspiredu.jpg",
        imageAlt: "Inspiredu volunteers working together at a laptop",
        imageCredit: "Photo: Inspiredu",
        tags: ["UN SDG 4: Quality Education", "Education for Sustainable Development"]
      },
      {
        id: "bbbs-atlanta",
        name: "Big Brothers Big Sisters of Metro Atlanta",
        tagline: "One-to-one mentoring",
        about: "Big Brothers Big Sisters pairs you with a young person to read, explore the community, and build a lasting connection.",
        involve: "Meet at least twice a month for one year. Review mentor requirements and start with a Big Orientation.",
        href: "https://bbbsatl.org/be-a-big/",
        hrefLabel: "Review mentor requirements",
        image: "images/org-bbbs.jpg",
        imageAlt: "A Big Brothers Big Sisters mentor and his mentee laughing together on a front porch",
        imageCredit: "Photo: Big Brothers Big Sisters of Metro Atlanta",
        tags: ["UN SDG 4: Quality Education", "Education for Sustainable Development"]
      },
      {
        id: "buddy-jackets",
        name: "Buddy Jackets",
        tagline: "Service with fellow Tech students",
        about: "Buddy Jackets brings Georgia Tech students together to mentor Atlanta children, including through service at the Agape Youth and Family Center.",
        involve: "Contact the campus group about joining its mentoring and service activities this semester.",
        href: "https://gatech.campuslabs.com/engage/organization/buddy-jackets",
        hrefLabel: "Explore Buddy Jackets",
        image: "images/org-buddy-jackets.jpg",
        imageAlt: "A Buddy Jackets volunteer and a child smiling while making paper-plate crafts",
        imageCredit: "Photo: Buddy Jackets",
        tags: ["UN SDG 4: Quality Education", "Education for Sustainable Development"]
      }
    ]
  },

  interactive: {
    heading: "Find your fit",
    intro: "Answer four questions to find an organization that fits your interests and availability.",
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
        body: "Your answers point to the technology side of the gap: computers and workshops. Digital Skills Volunteers support Inspiredu workshops, in person or online. Tech Team volunteers clean and reimage the laptops those programs give out. Open the volunteer page and pick the role that matches the hour you have.",
        links: [
          { label: "See Inspiredu volunteer roles", href: "https://www.iuatl.org/volunteer" }
        ]
      },
      "bbbs-atlanta": {
        title: "Big Brothers Big Sisters of Metro Atlanta fits how you want to help.",
        body: "Your answers point to a one-to-one relationship: the same young person, at least twice a month, for at least a year. Big Brothers Big Sisters matches children and teens with mentors who read, visit the library, and spend time in the community. Review the mentor requirements and sign up for a Big Orientation.",
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
        body: "Your answers landed evenly, so more than one organization fits. Contact the group you can reach this week, and save the others for later."
      }
    }
  },

  footer: {
    close: "One hour a week can open a door next door. Which one will you open?",
    credits: "Alexandra, Ali, Owen, Siva, and Srija. LMC 3403, Fall 2026.",
    note: "Student campaign for the Georgia Tech community. This page is not an official Georgia Tech site."
  }
};
