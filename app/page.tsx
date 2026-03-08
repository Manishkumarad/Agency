"use client"

import { useState } from "react"
import Link from "next/link"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import AgencyNavigation from "@/components/agency-navigation"
import {
  Globe,
  ShoppingCart,
  Smartphone,
  Search,
  Palette,
  Zap,
  Star,
  ChevronDown,
  Check,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  ExternalLink,
} from "lucide-react"

export default function AgencyHomePage() {
  const [auditLoading, setAuditLoading] = useState(false)
  const [contactLoading, setContactLoading] = useState(false)

  async function handleAuditSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const data = {
      business: formData.get("business"),
      url: formData.get("url"),
      email: formData.get("email"),
      phone: formData.get("phone"),
    }
    setAuditLoading(true)
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const text = await res.text()
      let json: { error?: string }
      try {
        json = text ? JSON.parse(text) : {}
      } catch {
        throw new Error(res.ok ? "Invalid response" : "Server error. Check that CONTACT_EMAIL and RESEND_API_KEY are set in .env.local")
      }
      if (!res.ok) throw new Error(json.error || "Failed to submit")
      toast.success("Request sent! We'll analyze your site and email you soon.")
      form.reset()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setAuditLoading(false)
    }
  }

  async function handleContactSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    }
    setContactLoading(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const text = await res.text()
      let json: { error?: string }
      try {
        json = text ? JSON.parse(text) : {}
      } catch {
        throw new Error(res.ok ? "Invalid response" : "Server error. Check that CONTACT_EMAIL and RESEND_API_KEY are set in .env.local")
      }
      if (!res.ok) throw new Error(json.error || "Failed to send")
      toast.success("Message sent! We'll get back to you soon.")
      form.reset()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setContactLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white text-foreground overflow-x-hidden">
      <AgencyNavigation />

      {/* Hero Section - Split Layout: Content Left, Image Right (responsive) */}
      <section className="relative pt-24 pb-16 sm:pt-28 sm:pb-20 md:pt-32 md:pb-24 lg:pt-36 lg:pb-24 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_20%_50%,rgba(220,220,230,0.3),transparent)]" />
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
            <div className="order-2 md:order-1 text-center md:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-muted-foreground mb-4 sm:mb-5">
                Digital Agency for Small Business
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-foreground mb-5 sm:mb-6 tracking-tight leading-[1.15]">
                Websites That Bring Customers to Your Business
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-xl mx-auto md:mx-0 leading-relaxed">
                Increase bookings, orders, and revenue. We build high-converting sites and apps tailored for small business.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start mb-8 sm:mb-10">
                <Link href="#audit">
                  <Button size="lg" className="w-full sm:w-auto bg-highlight hover:bg-highlight/90 text-white px-8 h-12 rounded-lg font-medium">
                    Get Free Website Audit
                  </Button>
                </Link>
                <Link href="#contact">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 rounded-lg border-2">
                    Free Consultation
                  </Button>
                </Link>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-x-4 sm:gap-x-6 gap-y-2 text-xs sm:text-sm text-muted-foreground">
                <span>500+ Sites Built</span>
                <span className="hidden sm:inline text-border">|</span>
                <span>10+ Years</span>
                <span className="hidden sm:inline text-border">|</span>
                <span>98% Satisfied</span>
              </div>
            </div>
            <div className="order-1 md:order-2 flex justify-center md:justify-end">
              <div className="relative w-full max-w-[280px] sm:max-w-sm md:max-w-md lg:max-w-xl">
                <div className="rounded-2xl border border-gray-200/80 shadow-2xl overflow-hidden bg-white">
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop"
                    alt="Websites and apps we build - dashboard and analytics for businesses"
                    className="w-full h-auto"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-highlight/10 rounded-2xl -z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clients / Partners - Sliding */}
      <section className="py-8 sm:py-10 bg-white border-y border-gray-200/80 overflow-hidden">
        <p className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-6 px-4">
          Trusted by leading brands
        </p>
        <div className="relative">
          <div className="clients-slide flex gap-12 sm:gap-16 md:gap-20">
            {[
              "DCODHA",
              "DEODHA",
              "Think",
              "Marriott",
              "DB",
              "Wipro",
              "Lemon",
              "Channel",
              "And more",
            ].map((name) => (
              <span
                key={name}
                className="text-base sm:text-lg font-bold text-gray-400/90 whitespace-nowrap shrink-0"
              >
                {name}
              </span>
            ))}
            {[
              "DCODHA",
              "DEODHA",
              "Think",
              "Marriott",
              "DB",
              "Wipro",
              "Lemon",
              "Channel",
              "And more",
            ].map((name) => (
              <span
                key={`${name}-2`}
                className="text-base sm:text-lg font-bold text-gray-400/90 whitespace-nowrap shrink-0"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-[#fafafa]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2 sm:mb-3 tracking-tight">
              Services That Grow Your Business
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Not just a site — a growth engine.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              { icon: Globe, title: "Business Website Development", desc: "Professional websites that convert visitors into customers. Mobile-first, fast, and optimized for your industry.", benefits: ["5+ pages included", "Mobile responsive", "Contact forms"] },
              { icon: ShoppingCart, title: "E-commerce Store Development", desc: "Full online stores with secure checkout, inventory management, and payment integration.", benefits: ["Product catalog", "Secure payments", "Order tracking"] },
              { icon: Smartphone, title: "Mobile App Development", desc: "Native and cross-platform apps that keep your business in your customers' pockets.", benefits: ["iOS & Android", "Push notifications", "Offline support"] },
              { icon: Search, title: "SEO for Local Businesses", desc: "Rank higher on Google so local customers find you first when they search.", benefits: ["Local SEO", "Keyword strategy", "Monthly reports"] },
              { icon: Palette, title: "Website Redesign", desc: "Refresh your outdated site into a modern, high-converting online presence.", benefits: ["Modern design", "Faster loading", "Better UX"] },
              { icon: Zap, title: "Automation Tools", desc: "Streamline bookings, emails, and workflows so you focus on running your business.", benefits: ["Booking systems", "Email automation", "CRM integration"] },
            ].map((service, i) => (
              <Card key={i} className="bg-white border border-gray-200/80 hover:shadow-md hover:border-gray-300 transition-all duration-200">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-4">
                    <service.icon className="h-6 w-6 text-foreground" />
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                  <CardDescription>{service.desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.benefits.map((b, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="h-4 w-4 text-foreground shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2 sm:mb-3 tracking-tight">
              Success Stories
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Real results for real businesses.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              { industry: "Marriott Courtyard Bhopal", problem: "Hotel needed modern online presence", solution: "Full website with booking, rooms & amenities", result: "Live hotel website", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=280&fit=crop", link: "https://www.marriott.com/en-us/hotels/bhocy-courtyard-bhopal/overview/", featured: true },
              { industry: "Restaurant", problem: "No online ordering", solution: "Website + ordering system", result: "40% more orders", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=280&fit=crop" },
              { industry: "Salon", problem: "Manual booking only", solution: "Online booking + automated reminders", result: "3x more bookings", image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=280&fit=crop" },
              { industry: "Gym", problem: "No online presence", solution: "Website + member portal", result: "2x member sign-ups", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=280&fit=crop" },
              { industry: "Retail Shop", problem: "Limited local reach", solution: "E-commerce store + local SEO", result: "60% more sales", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=280&fit=crop" },
              { industry: "Dental Clinic", problem: "Phone-only appointments", solution: "Online booking system", result: "50% fewer no-shows", image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=280&fit=crop" },
              { industry: "Consulting", problem: "No lead capture", solution: "Landing pages + contact forms", result: "4x more leads", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=280&fit=crop" },
            ].map((item, i) => (
              <Card key={i} className={`bg-[#fafafa] border overflow-hidden hover:shadow-md transition-shadow ${item.featured ? "border-highlight ring-1 ring-highlight/20" : "border-gray-200/80"}`}>
                <div className="h-44 relative overflow-hidden group">
                  <img src={item.image} alt={`${item.industry} website project`} className="w-full h-full object-cover max-w-full" />
                  {item.featured && (
                    <span className="absolute top-3 left-3 px-2 py-0.5 bg-highlight text-white text-xs font-medium rounded">Featured</span>
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{item.industry} Website</CardTitle>
                  <CardDescription>
                    <strong>Problem:</strong> {item.problem}<br />
                    <strong>Solution:</strong> {item.solution}<br />
                    <strong className="text-foreground">Result: {item.result}</strong>
                  </CardDescription>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-3 text-sm font-medium text-highlight hover:underline"
                    >
                      View live website
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="case-studies" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-[#fafafa]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2 sm:mb-3 tracking-tight">
              Case Studies
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Measurable growth for small businesses.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <Card className="bg-white overflow-hidden border border-highlight/30 shadow-sm">
              <div className="h-48 relative">
                <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=280&fit=crop" alt="Marriott Courtyard Bhopal" className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 px-2 py-0.5 bg-highlight text-white text-xs font-medium rounded">Featured</span>
              </div>
              <div className="p-5 sm:p-6 md:p-8">
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Marriott Courtyard Bhopal</h3>
                <div className="space-y-4 text-muted-foreground">
                  <p><strong className="text-foreground">Project:</strong> Hotel website with booking, rooms, amenities & overview</p>
                  <p><strong className="text-foreground">Tech:</strong> Modern responsive design, SEO-optimized</p>
                  <a
                    href="https://www.marriott.com/en-us/hotels/bhocy-courtyard-bhopal/overview/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 mt-4 text-highlight font-medium hover:underline"
                  >
                    View live website
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </Card>
            <Card className="bg-white overflow-hidden border border-gray-200/80 shadow-sm">
              <div className="h-48 relative">
                <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=280&fit=crop" alt="Gym project" className="w-full h-full object-cover" />
              </div>
              <div className="p-5 sm:p-6 md:p-8">
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Gym Business</h3>
                <div className="space-y-4 text-muted-foreground">
                  <p><strong className="text-foreground">Before:</strong> No online bookings, manual sign-ups only</p>
                  <p><strong className="text-foreground">After:</strong> Website + online booking system</p>
                  <div className="flex items-center gap-2 pt-4">
                    <Check className="h-5 w-5 text-foreground" />
                    <span className="font-semibold text-foreground">Result: 3x more members</span>
                  </div>
                </div>
              </div>
            </Card>
            <Card className="bg-white overflow-hidden border border-gray-200/80 shadow-sm">
              <div className="h-48 relative">
                <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=280&fit=crop" alt="Restaurant project" className="w-full h-full object-cover" />
              </div>
              <div className="p-5 sm:p-6 md:p-8">
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Local Restaurant</h3>
                <div className="space-y-4 text-muted-foreground">
                  <p><strong className="text-foreground">Before:</strong> Phone orders only, no online menu</p>
                  <p><strong className="text-foreground">After:</strong> Ordering website + delivery integration</p>
                  <div className="flex items-center gap-2 pt-4">
                    <Check className="h-5 w-5 text-foreground" />
                    <span className="font-semibold text-foreground">Result: 40% more orders</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2 sm:mb-3 tracking-tight">
              What Our Clients Say
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Trusted by hundreds of small business owners.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              { quote: "Our restaurant started getting online orders after they built our website. Highly recommended!", name: "James M.", business: "Bella's Kitchen", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
              { quote: "We went from zero online presence to 3x more bookings. The team understood exactly what we needed.", name: "Sarah L.", business: "Serenity Spa", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" },
              { quote: "Best investment we've made. Our gym membership sign-ups doubled in 6 months.", name: "Mike R.", business: "FitZone Gym", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
            ].map((t, i) => (
              <Card key={i} className="bg-[#fafafa] border border-gray-200/80">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-3">
                    <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <p className="font-semibold text-foreground">{t.name}</p>
                      <p className="text-sm text-muted-foreground">{t.business}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-foreground text-foreground" />
                    ))}
                  </div>
                  <CardDescription className="text-base text-foreground/90">
                    &quot;{t.quote}&quot;
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-[#fafafa]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2 sm:mb-3 tracking-tight">
              Simple Pricing
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              No hidden fees. Choose what fits.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              { name: "Starter", price: 199, pages: "Up to 5 pages", seo: "Basic SEO", mobile: "Mobile responsive", hosting: "1 year hosting", maintenance: "Email support" },
              { name: "Growth", price: 499, popular: true, pages: "Up to 10 pages", seo: "Full SEO optimization", mobile: "Mobile responsive", hosting: "1 year hosting + SSL", maintenance: "Priority support" },
              { name: "Premium", price: 999, pages: "Up to 20 pages", seo: "Full SEO + ongoing", mobile: "Mobile responsive", hosting: "2 years hosting", maintenance: "Dedicated support" },
            ].map((plan, i) => (
              <Card key={i} className={`relative bg-white border ${plan.popular ? "ring-2 ring-highlight border-highlight shadow-lg" : "border-gray-200/80"}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-highlight text-white text-xs font-medium rounded-full">
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-foreground">${plan.price}</div>
                  <CardDescription>One-time setup</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { icon: Check, text: plan.pages },
                    { icon: Check, text: plan.seo },
                    { icon: Check, text: plan.mobile },
                    { icon: Check, text: plan.hosting },
                    { icon: Check, text: plan.maintenance },
                  ].map((item, j) => (
                    <div key={j} className="flex items-center gap-2 text-sm">
                      <item.icon className="h-4 w-4 text-foreground shrink-0" />
                      {item.text}
                    </div>
                  ))}
                  <Link href="#contact" className="block pt-4">
                    <Button className={`w-full ${plan.popular ? "bg-highlight hover:bg-highlight/90 text-white border-0" : ""}`} variant={plan.popular ? "default" : "outline"}>
                      Get Started
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Gen - Free Audit */}
      <section id="audit" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-[#0f172a]">
        <div className="container mx-auto max-w-xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Get Your Free Website Audit
          </h2>
          <p className="text-white/70 mb-8 text-sm">
            We&apos;ll analyze your online presence and send actionable recommendations.
          </p>
          <form onSubmit={handleAuditSubmit} className="space-y-4 text-left">
            <div>
              <Label htmlFor="business" className="text-white/90">Business Name</Label>
              <Input id="business" name="business" required placeholder="Your business name" className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/50" />
            </div>
            <div>
              <Label htmlFor="url" className="text-white/90">Website URL (if any)</Label>
              <Input id="url" name="url" placeholder="https://" className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/50" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email" className="text-white/90">Email</Label>
                <Input id="email" name="email" type="email" required placeholder="you@business.com" className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/50" />
              </div>
              <div>
                <Label htmlFor="phone" className="text-white/90">Phone</Label>
                <Input id="phone" name="phone" placeholder="+1 (555) 000-0000" className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/50" />
              </div>
            </div>
            <Button type="submit" size="lg" disabled={auditLoading} className="w-full bg-highlight text-white hover:bg-highlight/90 h-12 disabled:opacity-70">
              {auditLoading ? "Sending..." : "Get Free Website Audit"}
            </Button>
          </form>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-white">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4 tracking-tight">About ScaleCraft</h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed px-2 sm:px-0">
            We&apos;re a digital agency focused on helping small businesses grow online. With over 10 years of experience and 500+ projects delivered, we understand what it takes to build websites and apps that bring customers to your door. Our mission is simple: help you get more bookings, more orders, and more revenue.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-[#fafafa]">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground text-center mb-8 sm:mb-10 tracking-tight">FAQ</h2>
          <div className="space-y-4">
            {[
              { q: "How long does it take to build a website?", a: "Most projects take 2-4 weeks from kickoff to launch. Timeline depends on the size and complexity of your site." },
              { q: "Do you offer ongoing support?", a: "Yes. All plans include support. Growth and Premium plans include priority support and maintenance options." },
              { q: "Can you help with my existing website?", a: "Absolutely. We offer website redesigns and improvements for existing sites that need a refresh." },
              { q: "Do you work with businesses outside the US?", a: "Yes. We work with clients globally. Communication is done via video calls and email." },
            ].map((faq, i) => (
              <details key={i} className="group border border-gray-200 rounded-lg p-4 sm:p-5 bg-white min-h-[44px]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-medium text-foreground text-sm sm:text-base py-1 -my-1">
                  {faq.q}
                  <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-muted-foreground text-sm">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4">Get in Touch</h2>
              <p className="text-muted-foreground mb-8">
                Ready to grow your business online? Schedule a free consultation.
              </p>
              <div className="space-y-4">
                <a href="mailto:deodhmanish059@gmail.com" className="flex items-center gap-3 text-muted-foreground hover:text-foreground">
                  <Mail className="h-5 w-5" />
                  deodhmanish059@gmail.com
                </a>
                <a href="tel:9135112405" className="flex items-center gap-3 text-muted-foreground hover:text-foreground">
                  <Phone className="h-5 w-5" />
                  9135112405
                </a>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="h-5 w-5 shrink-0" />
                  <span>Mig 24, Rajeev Nagar<br />Bhopal, Madhya Pradesh</span>
                </div>
                <a href="https://wa.me/9135112405" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="mt-4">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Chat on WhatsApp
                  </Button>
                </a>
              </div>
            </div>
            <Card className="bg-white p-5 sm:p-6 lg:p-8 border border-gray-200/80 shadow-sm">
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="c-name">Name</Label>
                  <Input id="c-name" name="name" required placeholder="Your name" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="c-email">Email</Label>
                  <Input id="c-email" name="email" type="email" required placeholder="you@example.com" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="c-message">Message</Label>
                  <Textarea id="c-message" name="message" required placeholder="Tell us about your project..." className="mt-1 min-h-[120px]" />
                </div>
                <Button type="submit" size="lg" disabled={contactLoading} className="w-full bg-highlight hover:bg-highlight/90 text-white border-0 disabled:opacity-70">
                  {contactLoading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-white py-8 sm:py-10 lg:py-12 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-foreground">ScaleCraft</span>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-4 sm:gap-6 lg:gap-8 text-sm text-muted-foreground">
              <Link href="#services" className="hover:text-foreground">Services</Link>
              <Link href="#portfolio" className="hover:text-foreground">Portfolio</Link>
              <Link href="#pricing" className="hover:text-foreground">Pricing</Link>
              <Link href="#contact" className="hover:text-foreground">Contact</Link>
            </div>
          </div>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} ScaleCraft. We build websites that bring customers to your business.
          </p>
        </div>
      </footer>
    </div>
  )
}
