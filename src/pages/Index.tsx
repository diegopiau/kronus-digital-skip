import { HeroSection } from '@/components/HeroSection'
import { ServicesSection } from '@/components/ServicesSection'
import { SocialProofSection } from '@/components/SocialProofSection'
import { ContactSection } from '@/components/ContactSection'

export default function Index() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <ServicesSection />
      <SocialProofSection />
      <ContactSection />
    </div>
  )
}
