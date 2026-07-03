'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, ArrowLeft, Check, Sparkles, Zap, Shield, Car } from 'lucide-react'
import Image from 'next/image'
import { COLORS } from '@/lib/constants'

// Color descriptions to add narrative premium depth
const COLOR_DETAILS: Record<string, { description: string; character: string }> = {
  taupe: {
    description: 'Warm metallic sand with subtle copper undertones that shift under direct sunlight.',
    character: 'Refined & Earthy',
  },
  graphite: {
    description: 'Deep industrial gray with a fine metallic flake that emphasizes the vehicle\'s sharp silhouette.',
    character: 'Modern & Technical',
  },
  obsidian: {
    description: 'Pure, high-gloss solid black containing crystalline micro-particles for deep reflection.',
    character: 'Stealth & Premium',
  },
  'pearl-white': {
    description: 'Multi-coat metallic white with a soft pearlescent luster that gleams under natural light.',
    character: 'Clean & Timeless',
  },
}

// Energy Packages list matching site information
const ENERGY_PACKAGES = [
  {
    id: 'none',
    name: 'Vehicle Only',
    tagline: 'Standard charging',
    description: 'Standard AC/DC charging. Perfect if you already have a home charger or plan to charge exclusively on public networks.',
    price: 0,
    features: ['Public CCS Combo 2 ready', 'Standard 11 kW AC charging', 'Over-the-air charging updates'],
    image: '/images/home/car-taupe-side.jpg',
  },
  {
    id: 'home',
    name: 'Home Package',
    tagline: 'Smart home charging',
    description: 'A premium smart 11 kW wallbox with mobile app integration, charging scheduler, and professional installation included.',
    price: 1200,
    features: ['11 kW Smart Wallbox charger', 'Full app control & scheduling', 'Standard home installation'],
    image: '/images/energy/home.jpg',
  },
  {
    id: 'villa',
    name: 'Villa Package',
    tagline: 'Full energy independence',
    description: '6 kWp solar carport roof panels, a 10 kWh home battery storage cabinet, and a bi-directional V2H charger to power your villa.',
    price: 14500,
    features: ['6 kWp Solar Carport roof panels', '10 kWh battery storage cabinet', 'V2H bi-directional charger'],
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
    // Clear the hash on initial mount if it exists, so it doesn't open automatically on reload
    if (window.location.hash === '#quote') {
      window.history.replaceState(null, '', window.location.pathname)
    }

    const handleHashChange = () => {
      const isQuote = window.location.hash === '#quote'
      setIsOpen(isQuote)
      if (isQuote) {
        setStep(1) // Reset to step 1 when opening
      }
    }

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
  const colorMeta = COLOR_DETAILS[selectedColor.id] || { description: '', character: '' }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-stone-950/65 backdrop-blur-[6px]"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="relative w-full max-w-5xl h-[92vh] max-h-[750px] bg-white text-stone-900 shadow-2xl flex flex-col md:flex-row overflow-hidden border border-stone-200/50 rounded-2xl"
          >
            {/* Left Graphic Banner (Premium Dark Theme Sidebar) */}
            <div className="hidden md:flex md:w-5/12 bg-stone-950 text-white border-r border-stone-900 flex-col justify-between p-8 relative overflow-hidden">
              {/* Subtle grid pattern background */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-stone-900 via-stone-950 to-stone-950 opacity-100 pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-stone-400">
                  <Car size={14} className="text-stone-500" />
                  <span className="text-[10px] tracking-[0.4em] uppercase font-light">LUM LEV 01</span>
                </div>
                <h3 className="text-3xl font-extralight tracking-tight mt-3 text-white">
                  {step === 1 && 'Configure Design'}
                  {step === 2 && 'Energy System'}
                  {step === 3 && 'Final Quote'}
                  {step === 4 && 'Allocation Ready'}
                </h3>
                <p className="text-xs text-stone-400 font-light mt-1.5 leading-relaxed">
                  {step === 1 && 'Select paint work and view your digital twin.'}
                  {step === 2 && 'Optimize charging performance for your home.'}
                  {step === 3 && 'Enter personal details for validation.'}
                  {step === 4 && 'Your premium vehicle quote is complete.'}
                </p>
              </div>

              {/* Vehicle Digital Twin Preview (Glow & High Contrast) */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center p-6 opacity-35 select-none pointer-events-none transition-all duration-700">
                <div className="absolute w-[280px] h-[280px] bg-stone-800/10 rounded-full blur-3xl" />
                {step === 1 && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1.15 }}
                    transition={{ duration: 0.5 }}
                    className="relative w-full aspect-[4/3]"
                  >
                    <Image
                      src={selectedColor.images.threequarter}
                      alt={selectedColor.name}
                      fill
                      className="object-contain filter drop-shadow-[0_12px_24px_rgba(255,255,255,0.06)]"
                      priority
                    />
                  </motion.div>
                )}
                {step === 2 && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    className="relative w-full aspect-[4/3]"
                  >
                    <Image
                      src={selectedEnergy.image}
                      alt={selectedEnergy.name}
                      fill
                      className="object-cover rounded-xl filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.5)] border border-stone-800"
                      priority
                    />
                  </motion.div>
                )}
                {(step === 3 || step === 4) && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1.15 }}
                    transition={{ duration: 0.5 }}
                    className="relative w-full aspect-[4/3]"
                  >
                    <Image
                      src={selectedColor.images.side}
                      alt={selectedColor.name}
                      fill
                      className="object-contain filter drop-shadow-[0_12px_24px_rgba(255,255,255,0.06)]"
                      priority
                    />
                  </motion.div>
                )}
              </div>

              {/* Pricing & Configuration Summary */}
              <div className="relative z-10">
                {step < 4 ? (
                  <div className="flex flex-col gap-2.5 text-stone-400 font-light text-xs tracking-wider">
                    <div className="flex justify-between">
                      <span>LEV 01 Base Price:</span>
                      <span className="font-normal text-white">€{BASE_PRICE.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between items-baseline">
                      <span>Paint ({selectedColor.name}):</span>
                      <span className="font-normal text-white">€0</span>
                    </div>

                    {selectedEnergy.price > 0 && (
                      <div className="flex justify-between">
                        <span>{selectedEnergy.name}:</span>
                        <span className="font-normal text-white">+€{selectedEnergy.price.toLocaleString()}</span>
                      </div>
                    )}
                    
                    <div className="h-px bg-stone-800 my-2" />
                    
                    <div className="flex justify-between text-sm tracking-normal text-white font-medium">
                      <span>Total Estimate:</span>
                      <span className="text-base text-white tracking-tight">€{totalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2.5 text-stone-400 font-light text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                      <Shield size={12} />
                      <span>Security allocation locked</span>
                    </div>
                    <p className="text-[10px] text-stone-500 font-light leading-relaxed">
                      LUM Automotive © 2026. Custom specifications registered under reference #{Math.floor(100000 + Math.random() * 900000)}.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Form Wizard content */}
            <div className="flex-1 flex flex-col justify-between h-full bg-white relative">
              {/* Top Animated Progress Bar */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-stone-100">
                <motion.div 
                  className="h-full bg-stone-900"
                  initial={{ width: '33%' }}
                  animate={{ width: `${(Math.min(3, step) / 3) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Header */}
              <div className="flex justify-between items-center px-6 py-5 border-b border-stone-100 shrink-0">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3].map((s) => {
                      const isActive = step === s
                      const isCompleted = step > s
                      return (
                        <div 
                          key={s}
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold transition-all duration-300 ${
                            isCompleted 
                              ? 'bg-stone-900 text-white' 
                              : isActive 
                              ? 'bg-stone-100 text-stone-900 border border-stone-900' 
                              : 'bg-stone-50 text-stone-300 border border-stone-200'
                          }`}
                        >
                          {isCompleted ? <Check size={10} strokeWidth={3} /> : s}
                        </div>
                      )
                    })}
                  </div>
                  {step < 4 && (
                    <span className="text-xs text-stone-500 font-medium hidden sm:inline">
                      {step === 1 && 'Exterior Paint Options'}
                      {step === 2 && 'Smart Charging Infrastructure'}
                      {step === 3 && 'Personal & Security Details'}
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
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="flex flex-col h-full justify-between gap-6"
                    >
                      <div>
                        <h4 className="text-xl font-light text-stone-900 tracking-tight">Choose Paint Work</h4>
                        <p className="text-xs text-stone-400 font-light mt-1">
                          Tailor the aesthetic personality of your LEV 01 with our curated premium options.
                        </p>
                      </div>

                      {/* Large High Definition Dynamic Preview */}
                      <div className="relative w-full aspect-[16/9] max-h-[220px] bg-white flex items-center justify-center p-2 overflow-hidden">
                        <div className="relative w-full h-full">
                          <Image
                            src={selectedColor.images.threequarter}
                            alt={selectedColor.name}
                            fill
                            className="object-contain transition-all duration-700 ease-out"
                            priority
                          />
                        </div>
                      </div>

                      {/* Swatches & Technical Descriptions */}
                      <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-baseline border-b border-stone-100 pb-2">
                          <span className="text-xs tracking-[0.2em] uppercase text-stone-500 font-medium">
                            {selectedColor.name}
                          </span>
                          <span className="text-[10px] text-stone-400 font-light">
                            {colorMeta.character}
                          </span>
                        </div>
                        <p className="text-xs text-stone-500 font-light leading-relaxed min-h-[36px]">
                          {colorMeta.description}
                        </p>

                        <div className="flex gap-4.5 justify-center py-2">
                          {COLORS.map((color) => {
                            const isSelected = selectedColor.id === color.id
                            return (
                              <button
                                key={color.id}
                                type="button"
                                onClick={() => setSelectedColor(color)}
                                aria-label={color.name}
                                aria-pressed={isSelected}
                                className="relative w-9 h-9 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none"
                                style={{
                                  backgroundColor: color.hex,
                                  boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.12)',
                                }}
                              >
                                {isSelected && (
                                  <motion.span 
                                    layoutId="selectedColorRing"
                                    className="absolute -inset-1.5 rounded-full ring-2 ring-stone-900 flex items-center justify-center"
                                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                                  >
                                    <Check size={11} className="text-stone-900 bg-white rounded-full p-0.5 shadow-sm" />
                                  </motion.span>
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
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="flex flex-col gap-5"
                    >
                      <div>
                        <h4 className="text-xl font-light text-stone-900 tracking-tight">Select Energy Ecosystem</h4>
                        <p className="text-xs text-stone-400 font-light mt-1">
                          Seamlessly integrate charging into your household. Our clean energy setups optimize costs automatically.
                        </p>
                      </div>

                      {/* Cards Stack */}
                      <div className="flex flex-col gap-3.5">
                        {ENERGY_PACKAGES.map((pkg) => {
                          const isSelected = selectedEnergy.id === pkg.id
                          return (
                            <button
                              key={pkg.id}
                              type="button"
                              onClick={() => setSelectedEnergy(pkg)}
                              className={`group flex gap-4 p-4 text-left border rounded-xl transition-all duration-300 ${
                                isSelected
                                  ? 'border-stone-900 bg-stone-50/50 shadow-sm'
                                  : 'border-stone-200/80 hover:border-stone-400 hover:bg-stone-50/20'
                              }`}
                            >
                              <div className="relative w-24 h-20 shrink-0 bg-stone-100 rounded-lg overflow-hidden border border-stone-200/40">
                                <Image
                                  src={pkg.image}
                                  alt={pkg.name}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline">
                                  <span className="text-sm font-semibold text-stone-900 tracking-tight">{pkg.name}</span>
                                  <span className="text-xs font-semibold text-stone-950">
                                    {pkg.price === 0 ? 'Included' : `+€${pkg.price.toLocaleString()}`}
                                  </span>
                                </div>
                                <p className="text-[10px] text-stone-400 font-semibold uppercase tracking-wider mt-0.5 flex items-center gap-1">
                                  <Zap size={10} className="text-stone-400" />
                                  {pkg.tagline}
                                </p>
                                <p className="text-[11px] text-stone-500 font-light mt-1.5 leading-relaxed">
                                  {pkg.description}
                                </p>
                                
                                {/* Bullet points inside details */}
                                <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2.5">
                                  {pkg.features.map((feat, idx) => (
                                    <span key={idx} className="inline-flex items-center text-[9px] text-stone-400 font-medium">
                                      <Check size={8} className="text-stone-900 mr-1" />
                                      {feat}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <div className="shrink-0 flex items-center justify-center self-start mt-1">
                                <div className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center transition-all ${
                                  isSelected ? 'border-stone-950 bg-stone-950 text-white' : 'border-stone-300 group-hover:border-stone-400'
                                }`}>
                                  {isSelected && <Check size={11} strokeWidth={3} />}
                                </div>
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
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="flex flex-col gap-5"
                    >
                      <div>
                        <h4 className="text-xl font-light text-stone-900 tracking-tight">Your Contact Information</h4>
                        <p className="text-xs text-stone-400 font-light mt-1">
                          Submit your specifications. A dedicated allocation specialist will call you to confirm build dates.
                        </p>
                      </div>

                      {/* Interactive Configuration Badge */}
                      <div className="bg-stone-50 border border-stone-200/50 rounded-xl p-4 flex gap-4 items-center">
                        <div className="relative w-16 h-12 shrink-0 bg-white rounded border border-stone-200/50 overflow-hidden flex items-center justify-center">
                          <Image
                            src={selectedColor.images.threequarter}
                            alt={selectedColor.name}
                            fill
                            className="object-contain p-1"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] tracking-wider uppercase text-stone-400 font-semibold">Active spec</p>
                          <p className="text-xs font-semibold text-stone-850 truncate mt-0.5">
                            LUM LEV 01 in {selectedColor.name} {selectedEnergy.id !== 'none' ? `+ ${selectedEnergy.name}` : ''}
                          </p>
                          <p className="text-xs font-light text-stone-505 mt-0.5">
                            Estimated Allocation Total: <span className="font-semibold text-stone-900">€{totalPrice.toLocaleString()}</span>
                          </p>
                        </div>
                      </div>

                      {/* Form Inputs Grid */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="firstName" className="text-[10px] tracking-wider uppercase text-stone-400 font-semibold">First Name</label>
                          <input
                            type="text"
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            className={`border px-3.5 py-2.5 text-xs focus:outline-none focus:border-stone-950 transition-colors bg-stone-50/50 focus:bg-white rounded-lg ${
                              errors.firstName ? 'border-red-400 focus:border-red-400' : 'border-stone-200/80'
                            }`}
                            placeholder="John"
                          />
                          {errors.firstName && <span className="text-[9px] text-red-500 font-medium mt-0.5">{errors.firstName}</span>}
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="lastName" className="text-[10px] tracking-wider uppercase text-stone-400 font-semibold">Last Name</label>
                          <input
                            type="text"
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            className={`border px-3.5 py-2.5 text-xs focus:outline-none focus:border-stone-950 transition-colors bg-stone-50/50 focus:bg-white rounded-lg ${
                              errors.lastName ? 'border-red-400 focus:border-red-400' : 'border-stone-200/80'
                            }`}
                            placeholder="Doe"
                          />
                          {errors.lastName && <span className="text-[9px] text-red-500 font-medium mt-0.5">{errors.lastName}</span>}
                        </div>

                        <div className="col-span-2 flex flex-col gap-1.5">
                          <label htmlFor="email" className="text-[10px] tracking-wider uppercase text-stone-400 font-semibold">Email Address</label>
                          <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className={`border px-3.5 py-2.5 text-xs focus:outline-none focus:border-stone-950 transition-colors bg-stone-50/50 focus:bg-white rounded-lg ${
                              errors.email ? 'border-red-400 focus:border-red-400' : 'border-stone-200/80'
                            }`}
                            placeholder="john.doe@example.com"
                          />
                          {errors.email && <span className="text-[9px] text-red-500 font-medium mt-0.5">{errors.email}</span>}
                        </div>

                        <div className="col-span-2 flex flex-col gap-1.5">
                          <label htmlFor="phone" className="text-[10px] tracking-wider uppercase text-stone-400 font-semibold">Phone Number</label>
                          <input
                            type="tel"
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className={`border px-3.5 py-2.5 text-xs focus:outline-none focus:border-stone-950 transition-colors bg-stone-50/50 focus:bg-white rounded-lg ${
                              errors.phone ? 'border-red-400 focus:border-red-400' : 'border-stone-200/80'
                            }`}
                            placeholder="+48 123 456 789"
                          />
                          {errors.phone && <span className="text-[9px] text-red-500 font-medium mt-0.5">{errors.phone}</span>}
                        </div>

                        <div className="col-span-2 flex items-start gap-3.5 mt-2">
                          <input
                            type="checkbox"
                            id="newsletter"
                            checked={formData.newsletter}
                            onChange={(e) => setFormData({ ...formData, newsletter: e.target.checked })}
                            className="mt-0.5 accent-stone-950 border border-stone-200 rounded w-4 h-4"
                          />
                          <label htmlFor="newsletter" className="text-[11px] text-stone-400 leading-normal font-light">
                            I consent to receive exclusive updates, technical reports, and special event invitations from LUM Automotive.
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
                      <div className="w-16 h-16 bg-stone-50 border border-stone-200/60 rounded-full flex items-center justify-center text-stone-900 mb-6 shadow-sm relative">
                        <motion.div 
                          className="absolute inset-0 rounded-full border border-stone-900 border-dashed"
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
                        />
                        <Sparkles size={26} className="text-stone-850" />
                      </div>
                      
                      <h4 className="text-2xl font-light text-stone-900 tracking-tight">Configuration Submitted</h4>
                      <p className="text-sm text-stone-500 font-light mt-3.5 max-w-sm leading-relaxed">
                        Thank you, <span className="font-normal text-stone-850">{formData.firstName}</span>. We have recorded your interest in the **LUM LEV 01** in **{selectedColor.name}**
                        {selectedEnergy.id !== 'none' ? ` with the **${selectedEnergy.name}**` : ''}.
                      </p>
                      
                      <div className="mt-6 p-4 bg-stone-50 rounded-xl border border-stone-200/50 max-w-sm text-left">
                        <p className="text-[10px] tracking-wider uppercase text-stone-400 font-semibold">What happens next?</p>
                        <ul className="text-xs text-stone-500 font-light mt-2 space-y-1.5">
                          <li className="flex items-start gap-2">
                            <span className="font-medium text-stone-900">1.</span> An automated allocation confirmation email has been dispatched to {formData.email}.
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="font-medium text-stone-900">2.</span> A local specialist will review build queue capacities.
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="font-medium text-stone-900">3.</span> We will contact you at your phone number to coordinate allocation details.
                          </li>
                        </ul>
                      </div>

                      <button
                        type="button"
                        onClick={handleClose}
                        className="mt-8 px-8 py-3.5 bg-stone-900 text-white text-xs tracking-widest uppercase font-medium hover:bg-stone-800 transition-colors duration-300 rounded-lg shadow"
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
                        className="flex items-center gap-1.5 text-xs tracking-wider uppercase text-stone-400 hover:text-stone-900 transition-colors font-medium cursor-pointer"
                      >
                        <ArrowLeft size={14} /> Back
                      </button>
                    ) : (
                      <span className="text-[10px] text-stone-300 uppercase tracking-widest font-semibold select-none">Start Configuration</span>
                    )}
                  </div>

                  <div>
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={handleNext}
                      className="inline-flex items-center gap-2 bg-stone-900 text-white text-xs tracking-wider uppercase font-medium px-6 py-3.5 hover:bg-stone-800 disabled:opacity-50 transition-all duration-300 cursor-pointer rounded-lg shadow"
                    >
                      {isSubmitting ? (
                        <>Processing allocation...</>
                      ) : step === 3 ? (
                        <>Submit Quote Request <Check size={14} /></>
                      ) : (
                        <>Next Step <ArrowRight size={14} /></>
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
