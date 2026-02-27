import type { Project } from "../types/projects"

export const PROJECTS: Project[] = [
  {
    id: "roomzy",
    title: "Roomzy - Real Estate Marketplace",
    period: {
      start: "2023",
      end: "2024",
    },
    link: "https://github.com/mohitbeniwal745",
    skills: ["React.js", "TypeScript", "Supabase", "Tailwind CSS", "Framer Motion"],
    description: `- Developed a comprehensive property rental platform with features for browsing, booking, hosting rooms, and real-time availability tracking.
- Implemented an in-app chat system enabling seamless communication between tenants and hosts for inquiries and booking discussions.
- Optimized server-side interaction by designing relational database schemas in Supabase and leveraging TanStack Query for efficient data fetching and caching.`,
    isExpanded: true,
  },
  {
    id: "cpu-scheduler",
    title: "Intelligent CPU Scheduler Simulator",
    period: {
      start: "2023",
      end: "2024",
    },
    link: "https://github.com/mohitbeniwal745",
    skills: ["React.js", "HTML", "CSS", "JavaScript"],
    description: `- Built a simulator website modeling CPU scheduling using FCFS, SJF, Round Robin, and Priority algorithms with interactive visualizations.
- Developed a dynamic process management interface allowing users to add, modify, or remove processes in real time and observe scheduling behavior instantly.
- Optimized logic handling to simulate up to 1000 concurrent processes while accurately displaying waiting time, turnaround time, and CPU utilization.`,
    isExpanded: true,
  },
]
