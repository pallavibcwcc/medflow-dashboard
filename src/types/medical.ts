export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  bloodGroup: string;
  emergencyContact: string;
  registeredAt: string;
  status: 'active' | 'inactive';
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  type: 'consultation' | 'follow-up' | 'emergency' | 'routine-checkup' | 'gynae';
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
}

export interface Doctor {
  id: string;
  name: string;
  email: string;
  specialization: string;
  phone: string;
  department: string;
  schedule: string[];
  status: 'available' | 'busy' | 'off-duty';
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  diagnosis: string;
  treatment: string;
  prescriptions: string[];
  doctorName: string;
  notes: string;
  attachments?: string[];
}

export interface GynaeRecord {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  lmpDate: string;
  eddDate?: string;
  gestationalAge?: string;
  visitType: 'prenatal' | 'postnatal' | 'routine' | 'emergency';
  bloodPressure: string;
  weight: string;
  fetalHeartRate?: string;
  notes: string;
  nextVisit?: string;
}

export interface Report {
  id: string;
  patientId: string;
  patientName: string;
  type: 'lab' | 'imaging' | 'pathology' | 'other';
  title: string;
  date: string;
  status: 'pending' | 'completed' | 'reviewed';
  findings?: string;
  doctorName: string;
  fileUrl?: string;
}

export type UserRole = 'admin' | 'doctor' | 'nurse' | 'receptionist';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}
