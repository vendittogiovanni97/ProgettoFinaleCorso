import { Contact } from '../components/typesDashboard';

export interface ContactProfilePageProps {
  contact?: Contact;
}

export interface ProfileDetails {
  firstName: string;
  lastName: string;
  jobTitle: string;
  birthDate: string;
  email: string;
  location: string;
  bio: string;
}

export interface ProfileSidebarProps {
  contact: Contact;
  jobTitle: string;
}

export interface ProfileContentProps {
  profileDetails: ProfileDetails;
  phone: string;
}