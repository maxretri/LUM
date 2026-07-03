'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, ArrowLeft, Check, Sparkles } from 'lucide-react'
import Image from 'next/image'
import { COLORS } from '@/lib/constants'

// Energy Packages list matching site information
const ENERGY_PACKAGES = [
  {
    id: 'none',
    name: 'Vehicle Only',
    tagline: 'Standard charging',
    description: 'Use public charging infrastructure or standard home sockets. Perfect if you already have a charging solution.',
    price: 0,
    image: '/images/home/car-taupe-side.jpg', // Using the side view profile for standard vehicle
  },
  {
    id: 'home',
    name: 'Home Package',
    tagline: 'Smart home charging',
    description: 'A premium smart 11 kW wallbox with mobile app integration and professional installation included.',
    price: 1200,
    image: '/images/energy/home.jpg',
  },
  {
    id: 'villa',
    name: 'Villa Package',
    tagline: 'Full energy independence',
    description: '6 kWp solar carport roof panels, 10 kWh battery storage cabinet, and a bi-directional V2H charger to power your home.',
    price: 14500,
    image: '/images/energy/teaser.jpg',
  },
]

const BASE_PRICE = 59900

export function QuoteModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState(1) // Steps 1 to 4

  // Configuration State
  const [selectedColor, setSelectedColor] = useState(COLORS[0]) // Default: Taupe
  const [selectedEnergy, setSelectedEnergy] = useState(ENERGY_PACKAGES[0]) // Default: None
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    newsletter: false,
  })
  
  // Validation State
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Listen to hash changes to trigger modal
  useEffect(() => {
    const handleHashChange = () => {
      const isQuote = window.location.hash === '#quote'
      setIsOpen(isQuote)
      if (isQuote) {
        setStep(1) // Reset to step 1 when opening
      }
    }

    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleClose = () => {
    setIsOpen(false)
    if (window.location.hash === '#quote') {
      window.history.pushState(null, '', window.location.pathname)
    }
  }

  const handleNext = () => {
    if (step === 3) {
      // Validate inputs
      const newErrors: { [key: string]: string } = {}
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required'
      } else if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Invalid email address'
      }

      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required'
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors)
        return
      }
      
      setErrors({})
      handleSubmitLead()
    } else {
      setStep((s) => s + 1)
    }
  }

  const handleBack = () => {
    setStep((s) => Math.max(1, s - 1))
  }

  const handleSubmitLead = () => {
    setIsSubmitting(true)
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false)
      setStep(4) // Success step

      // Store in localStorage for reference
      const leads = JSON.parse(localStorage.getItem('lum_quotes') || '[]')
      leads.push({
        date: new Date().toISOString(),
        color: selectedColor.name,
        energy: selectedEnergy.name,
        price: BASE_PRICE + selectedEnergy.price,
        contact: formData,
      })
      localStorage.setItem('lum_quotes', JSON.stringify(leads))
    }, 1500)
  }

  const totalPrice = BASE_PRICE + selectedEnergy.price

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-stone-900/40 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-4xl h-[90vh] max-h-[700px] bg-white text-stone-900 shadow-2xl flex flex-col md:flex-row overflow-hidden border border-stone-200/60 rounded-xl"
          >
            {/* Left Graphic Banner (Dynamic depending on step) */}
            <div className="hidden md:flex md:w-5/12 bg-stone-50 border-r border-stone-100 flex-col justify-between p-8 relative overflow-hidden">
              <div className="relative z-10">
                <span className="text-[10px] tracking-[0.35em] uppercase text-stone-400 font-medium">LUM LEV 01</span>
                <h3 className="text-2xl font-light tracking-tight mt-2 text-stone-800">
                  {step === 1 && 'Configure Design'}
                  {step === 2 && 'Energy System'}
                  {step === 3 && 'Final Quote'}
                  {step === 4 && 'Thank you'}
                </h3>
              </div>

              {/* Dynamic Image Previews */}
              <div className="absolute inset-0 flex items-center justify-center p-6 opacity-30 select-none pointer-events-none">
                {step === 1 && (
                  <div className="relative w-full aspect-[4/3] scale-125">
                    <Image
                      src={selectedColor.images.threequarter}
                      alt={selectedColor.name}
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                )}
                {step === 2 && (
                  <div className="relative w-full aspect-[4/3] scale-110">
                    <Image
                      src={selectedEnergy.image}
                      alt={selectedEnergy.name}
                      fill
                      className="object-cover rounded-lg"
                      priority
                    />
                  </div>
                )}
                {(step === 3 || step === 4) && (
                  <div className="relative w-full aspect-[4/3] scale-125">
                    <Image
                      src={selectedColor.images.side}
                      alt={selectedColor.name}
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                )}
              </div>

              <div className="relative z-10">
                {step < 4 ? (
                  <div className="flex flex-col gap-1.5 text-stone-500 font-light text-xs tracking-wider">
                    <div className="flex justify-between">
                      <span>LEV 01 Base Price:</span>
                      <span className="font-normal text-stone-800">€{BASE_PRICE.toLocaleString()}</span>
                    </div>
                    {selectedEnergy.price > 0 && (
                      <div className="flex justify-between">
                        <span>{selectedEnergy.name}:</span>
                        <span className="font-normal text-stone-800">+€{selectedEnergy.price.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="h-px bg-stone-200/80 my-2" />
                    <div className="flex justify-between text-sm tracking-normal text-stone-900 font-medium">
                      <span>Total Estimate:</span>
                      <span>€{totalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-stone-400 font-light leading-relaxed">
                    LUM Automotive © 2026. Custom specifications registered under reference #{Math.floor(100000 + Math.random() * 900000)}.
                  </p>
                )}
              </div>
            </div>

            {/* Right Form Wizard content */}
            <div className="flex-1 flex flex-col justify-between h-full bg-white relative">
              {/* Header */}
              <div className="flex justify-between items-center px-6 py-5 border-b border-stone-100 shrink-0">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] tracking-[0.25em] uppercase px-2 py-0.5 bg-stone-100 text-stone-500 rounded font-medium">
                    Step {Math.min(3, step)} of 3
                  </span>
                  {step < 4 && (
                    <span className="text-xs text-stone-400 font-light hidden sm:inline">
                      {step === 1 && 'Select Exterior Paint'}
                      {step === 2 && 'Select Energy Charging Package'}
                      {step === 3 && 'Submit Configuration'}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleClose}
                  className="text-stone-400 hover:text-stone-950 transition-colors p-1.5 rounded-full hover:bg-stone-50"
                  aria-label="Close configuration"
                >
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>

              {/* Scrollable Step Content */}
              <div className="flex-1 overflow-y-auto p-6 min-h-0">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col h-full justify-between gap-6"
                    >
                      <div className="text-center md:text-left">
                        <h4 className="text-lg font-light text-stone-800 tracking-tight">Choose Paint Work</h4>
                        <p className="text-xs text-stone-400 font-light mt-1">
                          Select the exterior paint option for your LUM LEV 01.
                        </p>
                      </div>

                      {/* Large Preview */}
                      <div className="relative w-full aspect-[16/10] max-h-[220px] bg-stone-50/50 rounded-lg border border-stone-100 flex items-center justify-center p-4">
                        <div className="relative w-full h-full">
                          <Image
                            src={selectedColor.images.threequarter}
                            alt={selectedColor.name}
                            fill
                            className="object-contain transition-all duration-500"
                            priority
                          />
                        </div>
                      </div>

                      {/* Swatches & Selection */}
                      <div className="flex flex-col items-center gap-4">
                        <p className="text-xs tracking-[0.25em] uppercase text-stone-500 font-medium">
                          {selectedColor.name}
                        </p>
                        <div className="flex gap-4">
                          {COLORS.map((color) => {
                            const isSelected = selectedColor.id === color.id
                            return (
                              <button
                                key={color.id}
                                type="button"
                                onClick={() => setSelectedColor(color)}
                                aria-label={color.name}
                                aria-pressed={isSelected}
                                className="relative w-8 h-8 rounded-full transition-transform duration-300 hover:scale-110 focus:outline-none"
                                style={{
                                  backgroundColor: color.hex,
                                  boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.12)',
                                }}
                              >
                                {isSelected && (
                                  <span className="absolute -inset-1.5 rounded-full ring-1 ring-stone-900 flex items-center justify-center">
                                    <Check size={10} className="text-stone-900 bg-white rounded-full p-0.5" />
                                  </span>
                                )}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col gap-5"
                    >
                      <div>
                        <h4 className="text-lg font-light text-stone-800 tracking-tight">Select Energy Ecosystem</h4>
                        <p className="text-xs text-stone-400 font-light mt-1">
                          Tailor your charging setup with our optional clean energy solutions.
                        </p>
                      </div>

                      {/* Cards Stack */}
                      <div className="flex flex-col gap-3">
                        {ENERGY_PACKAGES.map((pkg) => {
                          const isSelected = selectedEnergy.id === pkg.id
                          return (
                            <button
                              key={pkg.id}
                              type="button"
                              onClick={() => setSelectedEnergy(pkg)}
                              className={`flex items-center gap-4 p-4 text-left border rounded-lg transition-all duration-300 hover:border-stone-400 ${
                                isSelected
                                  ? 'border-stone-900 bg-stone-50/50 shadow-sm'
                                  : 'border-stone-200'
                              }`}
                            >
                              <div className="relative w-20 h-16 shrink-0 bg-stone-100 rounded overflow-hidden">
                                <Image
                                  src={pkg.image}
                                  alt={pkg.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline">
                                  <span className="text-sm font-medium text-stone-800 tracking-tight">{pkg.name}</span>
                                  <span className="text-xs font-semibold text-stone-900">
                                    {pkg.price === 0 ? 'Included' : `+€${pkg.price.toLocaleString()}`}
                                  </span>
                                </div>
                                <p className="text-[10px] text-stone-400 font-medium uppercase tracking-wider mt-0.5">
                                  {pkg.tagline}
                                </p>
                                <p className="text-xs text-stone-500 font-light mt-1 line-clamp-2 leading-relaxed">
                                  {pkg.description}
                                </p>
                              </div>
                              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                isSelected ? 'border-stone-950 bg-stone-950 text-white' : 'border-stone-300'
                              }`}>
                                {isSelected && <Check size={10} strokeWidth={3} />}
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col gap-6"
                    >
                      <div>
                        <h4 className="text-lg font-light text-stone-800 tracking-tight">Your Contact Information</h4>
                        <p className="text-xs text-stone-400 font-light mt-1">
                          Our specialist will contact you shortly to review your configuration.
                        </p>
                      </div>

                      {/* Form Layout */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                          <label htmlFor="firstName" className="text-[10px] tracking-wider uppercase text-stone-400 font-medium">First Name</label>
                          <input
                            type="text"
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            className={`border px-3 py-2 text-sm focus:outline-none focus:border-stone-900 rounded ${
                              errors.firstName ? 'border-red-400' : 'border-stone-200'
                            }`}
                            placeholder="John"
                          />
                          {errors.firstName && <span className="text-[9px] text-red-500 mt-0.5">{errors.firstName}</span>}
                        </div>

                        <div className="flex flex-col gap-1">
                          <label htmlFor="lastName" className="text-[10px] tracking-wider uppercase text-stone-400 font-medium">Last Name</label>
                          <input
                            type="text"
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            className={`border px-3 py-2 text-sm focus:outline-none focus:border-stone-900 rounded ${
                              errors.lastName ? 'border-red-400' : 'border-stone-200'
                            }`}
                            placeholder="Doe"
                          />
                          {errors.lastName && <span className="text-[9px] text-red-500 mt-0.5">{errors.lastName}</span>}
                        </div>

                        <div className="col-span-2 flex flex-col gap-1">
                          <label htmlFor="email" className="text-[10px] tracking-wider uppercase text-stone-400 font-medium">Email Address</label>
                          <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className={`border px-3 py-2 text-sm focus:outline-none focus:border-stone-900 rounded ${
                              errors.email ? 'border-red-400' : 'border-stone-200'
                            }`}
                            placeholder="john.doe@example.com"
                          />
                          {errors.email && <span className="text-[9px] text-red-500 mt-0.5">{errors.email}</span>}
                        </div>

                        <div className="col-span-2 flex flex-col gap-1">
                          <label htmlFor="phone" className="text-[10px] tracking-wider uppercase text-stone-400 font-medium">Phone Number</label>
                          <input
                            type="tel"
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className={`border px-3 py-2 text-sm focus:outline-none focus:border-stone-900 rounded ${
                              errors.phone ? 'border-red-400' : 'border-stone-200'
                            }`}
                            placeholder="+33 6 1234 5678"
                          />
                          {errors.phone && <span className="text-[9px] text-red-500 mt-0.5">{errors.phone}</span>}
                        </div>

                        <div className="col-span-2 flex items-start gap-2.5 mt-2">
                          <input
                            type="checkbox"
                            id="newsletter"
                            checked={formData.newsletter}
                            onChange={(e) => setFormData({ ...formData, newsletter: e.target.checked })}
                            className="mt-0.5 accent-stone-900 border border-stone-200 rounded"
                          />
                          <label htmlFor="newsletter" className="text-[11px] text-stone-400 leading-normal font-light">
                            Keep me updated with exclusive news, event invitations, and official launch updates from LUM Automotive.
                          </label>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center h-full py-8 text-center"
                    >
                      <div className="w-14 h-14 bg-stone-50 border border-stone-200 rounded-full flex items-center justify-center text-stone-900 mb-6 shadow-sm">
                        <Sparkles size={24} strokeWidth={1.5} />
                      </div>
                      <h4 className="text-xl font-light text-stone-900 tracking-tight">Configuration Submitted</h4>
                      <p className="text-sm text-stone-500 font-light mt-3 max-w-sm leading-relaxed">
                        Thank you, <span className="font-normal text-stone-800">{formData.firstName}</span>. 
                        We have registered your interest in the **LUM LEV 01** in **{selectedColor.name}**
                        {selectedEnergy.id !== 'none' ? ` with the **${selectedEnergy.name}**` : ''}.
                      </p>
                      <p className="text-xs text-stone-400 font-light mt-4 max-w-xs leading-relaxed">
                        A product specialist will contact you at **{formData.email}** within 24 hours to confirm your allocation.
                      </p>
                      
                      <button
                        type="button"
                        onClick={handleClose}
                        className="mt-8 px-6 py-3 border border-stone-900 text-stone-900 text-xs tracking-wider uppercase font-medium hover:bg-stone-900 hover:text-white transition-colors duration-300"
                      >
                        Return to Site
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer Actions */}
              {step < 4 && (
                <div className="flex justify-between items-center px-6 py-5 border-t border-stone-100 shrink-0 bg-stone-50/50">
                  <div>
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={handleBack}
                        className="flex items-center gap-1.5 text-xs tracking-wider uppercase text-stone-400 hover:text-stone-900 transition-colors font-medium"
                      >
                        <ArrowLeft size={14} /> Back
                      </button>
                    ) : (
                      <span className="text-[10px] text-stone-300 uppercase tracking-widest font-semibold">Start</span>
                    )}
                  </div>

                  <div>
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={handleNext}
                      className="inline-flex items-center gap-2 bg-stone-900 text-white text-xs tracking-wider uppercase font-medium px-6 py-3 hover:bg-stone-850 disabled:opacity-50 transition-colors duration-300"
                    >
                      {isSubmitting ? (
                        <>Processing...</>
                      ) : step === 3 ? (
                        <>Submit Request <Check size={14} /></>
                      ) : (
                        <>Next <ArrowRight size={14} /></>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
