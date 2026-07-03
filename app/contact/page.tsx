'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Navigation } from '@/components/Navigation'
import { FooterSection } from '@/sections/FooterSection'
import { Mail, Phone, MapPin, Instagram, Send, Check, Loader2 } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    const newErrors: { [key: string]: string } = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email address'
    }

    if (!formData.subject.trim()) newErrors.subject = 'Subject is required'
    if (!formData.message.trim()) newErrors.message = 'Message is required'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/send-telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contact',
          data: formData,
        }),
      })

      if (!response.ok) {
        console.error('Failed to send Telegram contact notification')
      }
    } catch (err) {
      console.error('Error sending Telegram contact notification:', err)
    }

    setIsSubmitting(false)
    setIsSuccess(true)
    
    // Store in localStorage for audit
    const messages = JSON.parse(localStorage.getItem('lum_messages') || '[]')
    messages.push({
      date: new Date().toISOString(),
      ...formData,
    })
    localStorage.setItem('lum_messages', JSON.stringify(messages))

    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    })
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white pt-32 pb-20">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8">
          {/* Header */}
          <div className="max-w-2xl mb-16">
            <span className="text-[10px] tracking-[0.35em] uppercase text-stone-400 font-semibold block mb-3">
              Get in Touch
            </span>
            <h1 className="text-4xl sm:text-5xl font-extralight tracking-tight text-stone-900 leading-tight">
              Connect with LUM
            </h1>
            <p className="text-stone-500 font-light mt-4 text-base sm:text-lg leading-relaxed">
              Have questions about specifications, build slot allocations, or charging technology? Send us a message, and our team will get back to you shortly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            {/* Contact Details (Left Column) */}
            <div className="lg:col-span-5 flex flex-col gap-10">
              {/* Office Location */}
              <div className="flex gap-5 items-start">
                <div className="w-10 h-10 bg-stone-50 border border-stone-150 flex items-center justify-center rounded-lg text-stone-850 shrink-0">
                  <MapPin size={18} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-stone-900 tracking-tight">Europe HQ Office</h3>
                  <p className="text-xs text-stone-450 mt-1 leading-relaxed">
                    Passeig de Gràcia, 45<br />
                    08007 Barcelona, Spain
                  </p>
                </div>
              </div>

              {/* Direct Emails */}
              <div className="flex gap-5 items-start">
                <div className="w-10 h-10 bg-stone-50 border border-stone-150 flex items-center justify-center rounded-lg text-stone-850 shrink-0">
                  <Mail size={18} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-stone-900 tracking-tight">Email Addresses</h3>
                  <p className="text-xs text-stone-455 mt-1 leading-relaxed">
                    General Inquiries:{' '}
                    <a href="mailto:info@lumautomotive.com" className="text-stone-900 font-normal hover:underline">
                      info@lumautomotive.com
                    </a>
                    <br />
                    Press & Media:{' '}
                    <a href="mailto:press@lumautomotive.com" className="text-stone-900 font-normal hover:underline">
                      press@lumautomotive.com
                    </a>
                  </p>
                </div>
              </div>

              {/* Phone Line */}
              <div className="flex gap-5 items-start">
                <div className="w-10 h-10 bg-stone-50 border border-stone-150 flex items-center justify-center rounded-lg text-stone-850 shrink-0">
                  <Phone size={18} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-stone-900 tracking-tight">Telephone Support</h3>
                  <p className="text-xs text-stone-450 mt-1 leading-relaxed">
                    Monday to Friday, 9:00 - 18:00 CET<br />
                    <a href="tel:+34931234567" className="text-stone-900 font-normal hover:underline">
                      +34 93 123 4567
                    </a>
                  </p>
                </div>
              </div>

              {/* Instagram & Social Section */}
              <div className="h-px bg-stone-100 my-2" />
              
              <div>
                <h4 className="text-[10px] tracking-widest uppercase text-stone-400 font-semibold mb-4">Follow the Journey</h4>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-stone-950 text-white px-5 py-3 hover:bg-stone-800 transition-colors rounded-lg shadow-sm text-xs font-semibold tracking-wider uppercase"
                >
                  <Instagram size={16} strokeWidth={1.5} />
                  <span>Instagram</span>
                </a>
              </div>
            </div>

            {/* Contact Form (Right Column) */}
            <div className="lg:col-span-7 bg-stone-50/40 border border-stone-100 rounded-2xl p-6 sm:p-10 relative">
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    key="contact-form"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="name" className="text-[10px] tracking-wider uppercase text-stone-400 font-semibold">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`border px-4 py-3 text-xs focus:outline-none focus:border-stone-900 transition-colors bg-white rounded-lg ${
                          errors.name ? 'border-red-400' : 'border-stone-200'
                        }`}
                        placeholder="John Doe"
                      />
                      {errors.name && <span className="text-[10px] text-red-500 font-medium mt-0.5">{errors.name}</span>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="text-[10px] tracking-wider uppercase text-stone-400 font-semibold">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`border px-4 py-3 text-xs focus:outline-none focus:border-stone-900 transition-colors bg-white rounded-lg ${
                          errors.email ? 'border-red-400' : 'border-stone-200'
                        }`}
                        placeholder="john@example.com"
                      />
                      {errors.email && <span className="text-[10px] text-red-500 font-medium mt-0.5">{errors.email}</span>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="subject" className="text-[10px] tracking-wider uppercase text-stone-400 font-semibold">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className={`border px-4 py-3 text-xs focus:outline-none focus:border-stone-900 transition-colors bg-white rounded-lg ${
                          errors.subject ? 'border-red-400' : 'border-stone-200'
                        }`}
                        placeholder="How can we help you?"
                      />
                      {errors.subject && <span className="text-[10px] text-red-500 font-medium mt-0.5">{errors.subject}</span>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="message" className="text-[10px] tracking-wider uppercase text-stone-400 font-semibold">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        className={`border px-4 py-3.5 text-xs focus:outline-none focus:border-stone-900 transition-colors bg-white rounded-lg resize-none ${
                          errors.message ? 'border-red-400' : 'border-stone-200'
                        }`}
                        placeholder="Write your message here..."
                      />
                      {errors.message && <span className="text-[10px] text-red-500 font-medium mt-0.5">{errors.message}</span>}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="mt-2 bg-stone-950 text-white py-3.5 px-6 rounded-lg text-xs font-semibold tracking-widest uppercase hover:bg-stone-800 transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <Send size={14} />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-message"
                    className="flex flex-col items-center justify-center py-12 text-center"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="w-14 h-14 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-6 shadow-sm">
                      <Check size={24} strokeWidth={2.5} />
                    </div>
                    <h3 className="text-xl font-semibold text-stone-900 tracking-tight">Message Sent</h3>
                    <p className="text-sm text-stone-500 font-light mt-3 max-w-sm leading-relaxed">
                      Thank you for contacting LUM. Your message has been received, and our team will respond within 24 business hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsSuccess(false)}
                      className="mt-8 border border-stone-200 text-stone-700 px-6 py-2.5 rounded-lg text-xs font-semibold tracking-wider uppercase hover:bg-stone-50 transition-colors"
                    >
                      Send another message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>
      <FooterSection />
    </>
  )
}
