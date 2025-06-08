// app/dashboard/questions/_components/QuestionItem.jsx
"use client"
import React from 'react'

function QuestionItem({ question, answer }) {
  return (
    <div className="p-6 bg-white dark:bg-secondary rounded-xl shadow-lg border border-border transition-all hover:shadow-xl">
      <h3 className="font-semibold text-lg text-primary mb-2">{question}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{answer}</p>
    </div>
  )
}

export default QuestionItem
