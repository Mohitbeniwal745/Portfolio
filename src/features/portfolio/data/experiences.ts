import type { Experience } from "../types/experiences"

export const EXPERIENCES: Experience[] = [
  {
    id: "education",
    companyName: "",
    positions: [
      {
        id: "3",
        title: "B.Tech - Computer Science and Engineering",
        employmentPeriod: {
          start: "08.2023",
          end: "Present",
        },
        description: `Lovely Professional University (CGPA: 7.92) - Phagwara, Punjab`,
        skills: ["C++", "Java", "Python", "Data Structures", "Algorithms", "Advanced Databases", "Systems Design", "Software Engineering"],
        icon: "education",
      },
      {
        id: "2",
        title: "Intermediate",
        employmentPeriod: {
          start: "04.2022",
          end: "03.2023",
        },
        description: `RPS International School (84.4%) - Gurgaon, Haryana`,
        skills: [],
        icon: "education",
      },
      {
        id: "1",
        title: "Matriculation",
        employmentPeriod: {
          start: "04.2020",
          end: "03.2021",
        },
        description: `SED Sr Sec School (86.8%) - Bhiwani, Haryana`,
        skills: [],
        icon: "education",
      },
    ],
  },
  {
    id: "achievements",
    companyName: "Achievements",
    positions: [
      {
        id: "1",
        title: "Achievements & Awards",
        employmentPeriod: {
          start: "2022",
          end: "2026",
        },
        icon: "idea",
        description: `- Solved 400+ DSA problems on LeetCode, applying advanced algorithms and data structures to optimize time and space complexity.
- Attained 1200+ rating on Codeforces through consistent performance in competitive programming contests.
- Secured 2nd position in a Capture The Flag (CTF) Hackathon, solving real-world cybersecurity challenges in cryptography, web security, and reverse engineering.
- Completed industry-recognized certifications in Problem Solving, JavaScript, and Java, reinforcing strong programming fundamentals.`,
        skills: ["DSA", "LeetCode", "Codeforces", "CTF", "Cybersecurity", "JavaScript", "Java"]
      }
    ]
  }
]
