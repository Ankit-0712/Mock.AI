// app/howitworks/_components/HowItWorks.jsx
import React from "react";
import { CheckCircle, Lightbulb, MessageCircle, PlayCircle } from "lucide-react";

export default function HowItWorks() {
  return (
    <section className="max-w-5xl mx-auto p-6 text-gray-800">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-primary mb-4">How It Works</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Our AI Interview Mocker simulates real interview environments using AI to help you prepare confidently for any job role.
        </p>
      </div>

      {/* Step-by-step Process */}
      <div className="grid md:grid-cols-2 gap-10 mb-16">
        {[
          {
            icon: <CheckCircle className="text-primary w-8 h-8" />,
            title: "1. Sign Up / Log In",
            desc: "Create your profile to track progress and access interviews anytime.",
          },
          {
            icon: <Lightbulb className="text-yellow-500 w-8 h-8" />,
            title: "2. Choose a Role",
            desc: "Pick a job position or customize your own interview scope.",
          },
          {
            icon: <PlayCircle className="text-green-600 w-8 h-8" />,
            title: "3. Start Mock Interview",
            desc: "Answer questions by typing or speaking. AI evaluates your response instantly.",
          },
          {
            icon: <MessageCircle className="text-blue-500 w-8 h-8" />,
            title: "4. Get Smart Feedback",
            desc: "Receive actionable insights and improvement suggestions based on your answers.",
          },
        ].map((step, index) => (
          <div
            key={index}
            className="flex items-start space-x-4 bg-white shadow-md p-5 rounded-lg hover:shadow-xl transition-all"
          >
            <div>{step.icon}</div>
            <div>
              <h4 className="font-semibold text-lg mb-1">{step.title}</h4>
              <p className="text-sm text-gray-600">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Why it’s Useful */}
      <div className="text-center mb-10">
        <h3 className="text-3xl font-bold mb-4 text-gray-900">Why It’s Useful</h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Designed to help you practice under realistic conditions and improve fast with detailed feedback.
        </p>
        <ul className="grid sm:grid-cols-2 gap-4 text-left max-w-3xl mx-auto text-gray-700">
          <li className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md">
            ✅ Practice anytime, anywhere — no scheduling required.
          </li>
          <li className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md">
            ✅ Unbiased, AI-powered feedback for every answer.
          </li>
          <li className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md">
            ✅ Tracks your performance over time and suggests areas of improvement.
          </li>
          <li className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md">
            ✅ Boosts confidence with regular exposure to tough questions.
          </li>
        </ul>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-12">
        <h4 className="text-2xl font-semibold text-gray-800 mb-4">Ready to Get Started?</h4>
        <p className="text-gray-600 mb-6">Create your first mock interview session and experience the future of interview preparation.</p>
        <a
          href="/dashboard"
          className="inline-block bg-primary text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-primary/90 transition"
        >
          Go to Dashboard
        </a>
      </div>
    </section>
  );
}
