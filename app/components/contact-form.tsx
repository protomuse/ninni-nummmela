"use client"

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { format } from 'date-fns'
import { CalendarIcon, Loader2 } from 'lucide-react'
import { DateRange } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().optional(),
  projectType: z.enum(["Editorial", "Commercial", "Event", "Personal", "Other"]),
  dateRange: z.object({
    from: z.date(),
    to: z.date().optional(),
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  vision: z.string().min(10, {
    message: "Please provide at least 10 characters about your vision.",
  }).max(500, {
    message: "Vision must not exceed 500 characters.",
  }),
  referralSource: z.enum(["Instagram", "Website", "Referral", "Other"]),
})

const steps = [
  { id: 1, name: 'Introduce Yourself' },
  { id: 2, name: 'Your Project' },
  { id: 3, name: 'Details' },
  { id: 4, name: 'Final Touch' },
]

export function ContactForm() {
  const [step, setStep] = React.useState(1)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSubmitted, setIsSubmitted] = React.useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      projectType: "Editorial",
      dateRange: { from: undefined, to: undefined },
      location: "",
      vision: "",
      referralSource: "Instagram",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      setIsSubmitted(true)
    } catch (error) {
      console.error('Error submitting form:', error)
      // Handle error (show error message to user)
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => {
    if (step < 4) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  if (isSubmitted) {
    return (
      <div className="text-center font-dm-sans">
        <h2 className="text-2xl font-medium mb-4">Thank you!</h2>
        <p className="mb-6">I've received your message and will be in touch soon.</p>
        <div className="space-x-4">
          <Button variant="outline" asChild>
            <a href="/portfolio">View Portfolio</a>
          </Button>
          <Button variant="outline" asChild>
            <a href="https://www.instagram.com/ninninummela" target="_blank" rel="noopener noreferrer">Instagram</a>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto font-dm-sans">
      <div className="mb-10">
        <nav aria-label="Progress">
          <ol role="list" className="flex items-center justify-between">
            {steps.map((stepItem, stepIdx) => (
              <li key={stepItem.name} className="relative">
                <Button
                  variant="ghost"
                  className={cn(
                    'w-10 h-10 rounded-full text-sm font-medium transition-colors duration-200',
                    step >= stepItem.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted-foreground/10'
                  )}
                  onClick={() => setStep(stepItem.id)}
                >
                  {stepItem.id}
                </Button>
                {stepIdx !== steps.length - 1 && (
                  <div
                    className={cn(
                      'absolute top-5 left-full w-full h-px -translate-y-1/2 transition-colors duration-200',
                      step > stepItem.id ? 'bg-primary' : 'bg-muted'
                    )}
                    style={{ width: 'calc(100% - 2.5rem)' }}
                  />
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {step === 1 && (
            <>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">What should we call you?</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} className="mt-2" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">How can I reach you?</FormLabel>
                    <FormControl>
                      <Input placeholder="Your email address" {...field} className="mt-2" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Phone number (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Your phone number" {...field} className="mt-2" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {step === 2 && (
            <>
              <FormField
                control={form.control}
                name="projectType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">What's the nature of your project?</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select project type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Editorial">Editorial</SelectItem>
                        <SelectItem value="Commercial">Commercial</SelectItem>
                        <SelectItem value="Event">Event</SelectItem>
                        <SelectItem value="Personal">Personal</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dateRange"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-base">When is it happening?</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full mt-2 pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value?.from ? (
                              field.value.to ? (
                                <>
                                  {format(field.value.from, "LLL dd, y")} -{" "}
                                  {format(field.value.to, "LLL dd, y")}
                                </>
                              ) : (
                                format(field.value.from, "LLL dd, y")
                              )
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          initialFocus
                          mode="range"
                          defaultMonth={field.value?.from}
                          selected={field.value}
                          onSelect={field.onChange}
                          numberOfMonths={2}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {step === 3 && (
            <>
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Where will this take place?</FormLabel>
                    <FormControl>
                      <Input placeholder="Location" {...field} className="mt-2" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="vision"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Tell me about your vision</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Share your ideas, inspiration, and what you're hoping to achieve..."
                        className="mt-2 resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {field.value?.length || 0}/500 characters
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {step === 4 && (
            <>
              <FormField
                control={form.control}
                name="referralSource"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">How did you find me?</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select referral source" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Instagram">Instagram</SelectItem>
                        <SelectItem value="Website">Website</SelectItem>
                        <SelectItem value="Referral">Referral</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          <div className="flex justify-between pt-4">
            {step > 1 && (
              <Button type="button" variant="outline" onClick={prevStep}>
                Previous
              </Button>
            )}
            {step < 4 ? (
              <Button type="button" className="ml-auto" onClick={nextStep}>
                Next
              </Button>
            ) : (
              <Button type="submit" className="ml-auto" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  )
} 