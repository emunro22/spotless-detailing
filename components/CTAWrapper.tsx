import { getAllSettings } from '@/lib/queries';
import { BUSINESS } from '@/lib/constants';
import CTA from './CTA';

export default async function CTAWrapper() {
  let settings: Record<string, string> = {};
  try {
    settings = await getAllSettings();
  } catch {}

  return (
    <CTA
      phone={settings.business_phone_tel || BUSINESS.phone}
      phoneDisplay={settings.business_phone || BUSINESS.phoneDisplay}
      whatsapp={settings.business_whatsapp || BUSINESS.whatsapp}
    />
  );
}
