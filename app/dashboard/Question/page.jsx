// app/dashboard/Question/page.jsx
"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import QuestionItem from "./_components/QuestionItem"
import { Loader2 } from "lucide-react"

const topics = [
  "React",
  "Next.js",
  "JavaScript",
  "Node.js",
  "System Design",
  "HR Behavioral Questions",
  "DSA Questions",
]

export default function QuestionPage() {
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchQuestions = async (topic) => {
    setLoading(true)
    try {
      const res = await fetch("/api/getQuestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      })

      if (!res.ok) throw new Error("API Error: " + res.status)

      const data = await res.json()
      setQuestions(data.questions || [])
    } catch (err) {
      console.error("Fetch Error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-slate-50 to-slate-200 dark:from-[#0f0f0f] dark:to-[#1a1a1a] transition-all duration-300">
      <h1 className="text-4xl font-bold text-center text-primary mb-8">
        Top 10 Interview Question
      </h1>

      <div className="flex justify-center flex-wrap gap-4 mb-10">
        {topics.map((topic) => (
          <Button
            key={topic}
            onClick={() => fetchQuestions(topic)}
            className="rounded-xl px-5 py-2 text-base font-medium shadow-md transition-all hover:scale-105"
            variant="default"
          >
            {topic}
          </Button>
        ))}
      </div>

      {loading && (
        <div className="flex justify-center items-center">
          <Loader2 className="animate-spin h-6 w-6 text-primary" />
          <span className="ml-2 text-muted-foreground">Loading...</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 max-w-5xl mx-auto">
        {questions.map((qa, idx) => (
          <QuestionItem key={idx} question={qa.question} answer={qa.answer} />
        ))}
      </div>
    </div>
  )
}
