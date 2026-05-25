import { getAllSettings } from '@/lib/queries';
import { BUSINESS } from '@/lib/constants';
import Navbar from './Navbar';

export default async function NavbarServer() {
  let settings: Record<string, string> = {};
  try {
    settings = await getAllSettings();
  } catch {}

  return (
    <Navbar
      phone={settings.business_phone_tel || BUSINESS.phone}
      phoneDisplay={settings.business_phone || BUSINESS.phoneDisplay}
    />
  );
}
