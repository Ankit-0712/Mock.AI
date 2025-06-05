import { Lightbulb, Volume2, VolumeX } from 'lucide-react';
import React, { useState } from 'react';

function QuestionSection({ mockInterviewQuestion, activeQuestionIndex }) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const textToSpeech = (text) => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        const speech = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(speech);
        setIsSpeaking(true);
        speech.onend = () => {
          setIsSpeaking(false);
        };
      }
    } else {
      alert('Sorry, your browser does not support text-to-speech');
    }
  };

  return mockInterviewQuestion && (
    <div className='p-5 border rounded-lg my-10'>
      {/* Question Tabs */}
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {mockInterviewQuestion.map((_, index) => (
          <h2
            key={index}
            className={`p-2 rounded-full text-xs md:text-sm text-center font-bold cursor-pointer 
              ${activeQuestionIndex === index ? 'bg-primary text-white' : 'bg-secondary text-black'}`}
          >
            Question #{index + 1}
          </h2>
        ))}
      </div>

      {/* Question Text */}
      <h2 className='my-5 text-md md:text-lg'>
        {mockInterviewQuestion[activeQuestionIndex]?.question}
      </h2>

      {/* Left-Aligned Volume Button */}
      <div className='flex justify-start my-3'>
        <button
          className="p-2 rounded-full border hover:bg-blue-100"
          onClick={() =>
            textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)
          }
        >
          {isSpeaking ? (
            <VolumeX className="text-red-500 w-6 h-6" />
          ) : (
            <Volume2 className="text-blue-600 w-6 h-6" />
          )}
        </button>
      </div>

      {/* Note Section */}
      <div className='border rounded-lg p-5 bg-blue-100 mt-10'>
        <h2 className='flex gap-2 items-center text-primary'>
          <Lightbulb />
          <strong>Note:</strong>
        </h2>
        <h2 className='text-sm text-primary my-2'>
          <i>{process.env.NEXT_PUBLIC_QUESTION_NOTE}</i>
        </h2>
      </div>
    </div>
  );
}

export default QuestionSection;
