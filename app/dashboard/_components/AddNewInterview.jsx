"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { createChatSession } from '@/utils/GeminAIModel'
import { LoaderCircle } from 'lucide-react'

function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false)
    const [jobPosition, setJobPosition] = useState("")
    const [jobDesc, setJobDesc] = useState("")
    const [jobExperience, setJobExperience] = useState("")
    const [chat, setChat] = useState(null)
    const [loading, setLoading] = useState(false);
    const onSubmit = async (e) => {
        setLoading(true);
        e.preventDefault()
        console.log(jobPosition, jobDesc, jobExperience)

        try {
          
            let currentChat = chat
            if (!currentChat) {
                currentChat = await createChatSession()
                setChat(currentChat)
            }

            const InputPrompt = `Job Position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}.
Based on these, give ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT || 5} interview questions with answers in JSON format.
The JSON should contain objects with "question" and "answer" fields.`

            const result = await currentChat.sendMessage(InputPrompt)
            const text = await result.response.text().replace('```json','').replace('```','')
            console.log(JSON.parse(text));
        } catch (error) {
            console.error("Error generating questions:", error)
        }
        setLoading(false);
    }

    return (
        <div>
            <div
                className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all'
                onClick={() => setOpenDialog(true)}
            >
                <h2 className='font-bold text-lg text-center'>+ Add New</h2>
            </div>

            <Dialog open={openDialog}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">
                            Tell us more about your Job Interview
                        </DialogTitle>
                        <DialogDescription>
                            <form onSubmit={onSubmit}>
                                <div>
                                    <h2 className="mb-6 font-bold">
                                        Add Details about your Job position/role, Job Description, and years of Experience 
                                    </h2>

                                    <div className='mt-7 mb-4'>
                                        <label className="block text-sm font-medium mb-2">
                                            Job Role/Job Position
                                        </label>
                                        <Input
                                            placeholder="Ex. Full Stack Developer"
                                            required
                                            value={jobPosition}
                                            onChange={(e) => setJobPosition(e.target.value)}
                                        />
                                    </div>

                                    <div className='mb-4'>
                                        <label className="block text-sm font-medium mb-2">
                                            Job Description/ Tech Stack (In Short)
                                        </label>
                                        <Textarea
                                            placeholder="Ex. React, NodeJs, ExpressJs, MySql etc"
                                            className="min-h-[100px]"
                                            required
                                            value={jobDesc}
                                            onChange={(e) => setJobDesc(e.target.value)}
                                        />
                                    </div>

                                    <div className='mb-4'>
                                        <label className="block text-sm font-medium mb-2">
                                            Years Of Experience
                                        </label>
                                        <Input
                                            placeholder="Ex. 4"
                                            type="number"
                                            required
                                            value={jobExperience}
                                            onChange={(e) => setJobExperience(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className='flex gap-5 justify-end mt-6'>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={() => setOpenDialog(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={loading}>
                                        {loading?
                                        <>
                                      <LoaderCircle className='animate-spin'/>'Generating fron AI'
                                      </> : 'Start Interview'
                                    }
                                    </Button>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddNewInterview
