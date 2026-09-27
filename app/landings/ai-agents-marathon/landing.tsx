'use client';

import { useState } from 'react';

export default function AIAgentsMarathonLanding() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [selectedAudience, setSelectedAudience] = useState('switcher');

  const audienceData = {
    switcher: {
      title: 'Для IT-спеціалістів, які хочуть перейти в automation',
      description: 'Навчись автоматизувати робочі процеси без коду',
      color: 'from-blue-600 to-blue-400'
    },
    digital: {
      title: 'Для digital-спеціалістів',
      description: 'Масштабуй свої кампанії з AI і автоматизацією',
      color: 'from-purple-600 to-purple-400'
    },
    business: {
      title: 'Для власників малого бізнесу',
      description: 'Заощаджуй час та гроші з розумною автоматизацією',
      color: 'from-green-600 to-green-400'
    }
  };

  const current = audienceData[selectedAudience as keyof typeof audienceData];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      alert('Будь ласка, введи свій email');
      return;
    }

    try {
      const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL || 'https://n8n.mageek.club/webhook/site-lead';
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          audience: selectedAudience,
          source: 'ai-agents-marathon-landing',
          timestamp: new Date().toISOString()
        })
      });

      if (response.ok) {
        setSubmitted(true);
        setEmail('');
        
        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      } else {
        alert('Помилка при реєстрації. Спробуй ще раз.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Помилка при реєстрації. Перевір з\'єднання.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Navigation */}
      <nav className="border-b border-slate-700/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-bold">MASC AI Agents</div>
          <button
            onClick={() => {
              (document.querySelector('input[type="email"]') as HTMLInputElement)?.focus();
              document.querySelector('input[type="email"]')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
          >
            Записатися
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 pt-20 pb-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            3-Денний Марафон AI Агентів
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            Навчись будувати AI-агентів, які автоматизують твою роботу
          </p>
          <div className="inline-flex gap-2 bg-slate-800/50 p-1 rounded-lg border border-slate-700">
            {Object.entries(audienceData).map(([key, data]) => (
              <button
                key={key}
                onClick={() => setSelectedAudience(key)}
                className={`px-4 py-2 rounded-md transition-colors ${
                  selectedAudience === key
                    ? 'bg-slate-700 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {key === 'switcher' ? 'IT-спеціаліст' : key === 'digital' ? 'Digital-фахівець' : 'Бізнесмен'}
              </button>
            ))}
          </div>
        </div>

        {/* Audience-specific section */}
        <div className={`mb-16 p-8 rounded-2xl bg-gradient-to-r ${current.color} bg-opacity-10 border border-slate-700`}>
          <h2 className="text-3xl font-bold mb-4">{current.title}</h2>
          <p className="text-lg text-slate-200">{current.description}</p>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            { icon: '✓', title: 'Без знання програмування', desc: 'Ми все поясним, починаючи з нуля' },
            { icon: '⏱', title: 'Всього 3 дні', desc: 'Інтенсивний курс, який можна пройти за вихідні' },
            { icon: '⚡', title: 'Реальні приклади', desc: 'Розбираємо кейси з реальних проектів' }
          ].map((item, i) => (
            <div key={i} className="p-6 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-slate-600 transition-colors">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Program */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Програма марафону</h2>
          <div className="space-y-4">
            {[
              { day: 'День 1', topic: 'Основи AI і як вибрати правильний інструмент' },
              { day: 'День 2', topic: 'Створюємо свого першого AI-агента' },
              { day: 'День 3', topic: 'Інтеграція з реальними сервісами (Google, Slack, тощо)' }
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-lg bg-slate-800/50 border border-slate-700 flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600/20 border border-blue-500 flex items-center justify-center font-bold text-blue-400">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{item.day}</h3>
                  <p className="text-slate-400">{item.topic}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Registration Form */}
        <div className="max-w-md mx-auto">
          <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700">
            <h2 className="text-2xl font-bold mb-6">Розпочни марафон</h2>
            
            {submitted ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">✓</div>
                <p className="text-lg font-semibold mb-2">Дякуємо за реєстрацію!</p>
                <p className="text-slate-400">Перевір свій email для деталей</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  placeholder="Твій email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                  required
                />
                
                <select
                  value={selectedAudience}
                  onChange={(e) => setSelectedAudience(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="switcher">IT-спеціаліст, який хоче перейти</option>
                  <option value="digital">Digital-фахівець</option>
                  <option value="business">Власник малого бізнесу</option>
                </select>

                <button
                  type="submit"
                  className={`w-full px-8 py-4 rounded-lg font-bold text-lg transition-all bg-gradient-to-r ${current.color} hover:shadow-xl hover:shadow-blue-500/50`}
                >
                  Розпочати марафон (безкоштовно)
                </button>
              </form>
            )}
          </div>
          
          <p className="text-center text-slate-500 text-sm mt-6">
            Марафон стартує найближчого тижня. Місця обмежені!
          </p>
        </div>
      </div>
    </div>
  );
}
