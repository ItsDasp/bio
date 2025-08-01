import { ProfileSection } from '@/components/ProfileSection';
import AccessibilityProvider from '@/components/AccessibilityProvider';
export default function HomePage() {
  return (
    <AccessibilityProvider>
      <ProfileSection />
    </AccessibilityProvider>
  );
}