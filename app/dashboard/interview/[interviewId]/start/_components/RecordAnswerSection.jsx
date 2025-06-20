"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react'
import { toast } from 'sonner'
import { createChatSession } from '@/utils/GeminAIModel'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'

function RecordAnswerSection({ mockInterviewQuestion, activeQuestionIndex,interviewData }) {
  const [userAnswer, setUserAnswer] = useState('');
  const {user} = useUser();
  const [loading,setLoading] = useState(false);
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  useEffect(() => {
    results.forEach((result) => {
      setUserAnswer(prevAns => prevAns + (result?.transcript || ''));
    });
  }, [results]);

  useEffect(() => {
    if(!isRecording&&userAnswer.length>10){
      UpdateUserAnswer();
    }
   

  },[userAnswer])


  const StartStopRecording = async () => {
    if (isRecording) {

     
      stopSpeechToText();
    
     
    } else {
      startSpeechToText();
    }
  };
  const UpdateUserAnswer = async()=>{

    console.log(userAnswer)

    setLoading(true)
    const feedbackPrompt =
    "Question:" + mockInterviewQuestion[activeQuestionIndex]?.question +
    ", User Answer:" + userAnswer +
    ", Depends on question and user answer for given interview question " +
    " please give us rating for answer and feedback as area of improvement if any " +
    "in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";

  
    const chatSession = await createChatSession();
    const result = await chatSession.sendMessage(feedbackPrompt);

    const rawText = await result.response.text();
    const mockJsonResp = rawText.replace('```json', '').replace('```', '');
    console.log("AI feedback JSON:", mockJsonResp);
 
  const JsonFeedbackResp = JSON.parse(mockJsonResp);

  const resp = await db.insert(UserAnswer)
  .values({
    mockIdRef:interviewData?.mockId,
    question:mockInterviewQuestion[activeQuestionIndex]?.question,
    correctAns:mockInterviewQuestion[activeQuestionIndex]?.answer,
    userAns:userAnswer,
    feedback:JsonFeedbackResp?.feedback,
    rating:JsonFeedbackResp?.rating,
    userEmail:user?.primaryEmailAddress?.emailAddress,
    createdAt:moment().format('DD-MM-yyyy')

  })
  if(resp){
    toast('User Answer Recorded Successfully')
  }
  setUserAnswer('');
  setLoading(false);

  }

  return (
    <div className='flex items-center justify-center flex-col'>
      <div className='flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5'>
        <Image src={'/webcam.png'} width={200} height={200} className='absolute' alt="webcam placeholder" />
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: '100%',
            zIndex: 10,
          }}
        />
      </div>

      <Button
        disabled = {loading}
        variant="outline"
        className="my-10"
        onClick={StartStopRecording}
      >
        <div className="flex items-center gap-2">
          <Mic className={isRecording ? "text-red-600" : "text-primary"} />
          <span className={isRecording ? "text-red-600" : "text-primary"}>
            {isRecording ? "Stop Recording" : "Record Answer"}
          </span>
        </div>
      </Button>

      
    </div>
  );
}

export default RecordAnswerSection;
