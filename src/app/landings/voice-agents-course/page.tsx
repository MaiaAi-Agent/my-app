import type { Metadata } from 'next';
import VoiceAgentsCourseLanding from './VoiceAgentsCourseLanding';

export const metadata: Metadata = {
  title: 'Voice Agents Course: від ідеї до заробітків | MASC',
  description: 'Навчись створювати надійних Voice-агентів, які заробляють гроші. Жива група з практиками. Старт 18 жовтня.',
};

export default function Page() {
  return <VoiceAgentsCourseLanding />;
}
