'use client';

import { useState } from 'react';
import { ChevronDown, Play, CheckCircle2, Clock, Users, Zap } from 'lucide-react';

export default function AIAgentsMarathonLanding() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [selectedAudience, setSelectedAudience] = useState('switcher'); // switcher, digital, business

  const audienceData = {
    switcher: {
      title: '🤖 Перші 3 дні безкоштовно: навчись будувати AI агентів',
      subtitle: 'За 3 дні марафону ти побудуєш свого першого агента (без коду!) і зрозумієш, як на цьому заробляти від $30/год',
      benefits: [
        'Зрозумієш, як AI агенти змінюють бізнес',
        'Побудуєш свого першого агента (без коду!)',
        'Дізнаєшся, як на цьому заробляти від $30/год'
      ],
      cta: 'Реєструйся на марафон',
      color: 'from-blue-600 to-blue-400'
    },
    digital: {
      title: '💼 Нова навичка = нові проєкти (і ціна у 2x вище)',
      subtitle: 'Клієнти вже запитують про AI. За 3 дні марафону ти будеш знати, як це продавати',
      benefits: [
        'Як запропонувати AI-рішення клієнту',
        'Яких помилок уникнути (реальні кейси)',
        'Скільки брати за цей сервіс (більше, ніж очікуєш)'
      ],
      cta: 'Приєднайся до марафону',
      color: 'from-purple-600 to-purple-400'
    },
    business: {
      title: '🏢 Скоротити витрати на $3,000/місяць? AI агенти це роблять',
      subtitle: 'Твій бізнес гублить гроші на рутині. За 3 дні марафону ти дізнаєшся, як їх скоротити',
      benefits: [
        'Зрозумієш, які процеси можна автоматизувати',
        'Визначишь конкретну економію для твого бізнесу',
        'Почнеш впроваджувати в перший день'
      ],
      cta: 'Запишися на марафон',
      color: 'from-green-600 to-green-400'
    }
  };

  const current = audienceData[selectedAudience as keyof typeof audienceData];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Send to n8n webhook
    const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL || 'https://n8n.mageek.club/webhook/site-lead';
    
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          audience: selectedAudience,
          source: 'ai-agents-marathon',
          timestamp: new Date().toISOString()
        })
      });

      if (response.ok) {
        setSubmitted(true);
        // Redirect to confirmation page after 2 seconds
        setTimeout(() => {
          window.location.href = '/success';
        }, 2000);
      } else {
        console.error('Webhook error:', response.status);
        alert('Помилка при реєстрації. Спробуй ще раз.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Помилка при реєстрації. Перевір з\'єднання.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 py-6 px-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">MASC</h1>
          <p className="text-slate-300 text-sm">Automation School</p>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 py-12 text-center">
        <div className="mb-8 inline-block bg-blue-500/20 border border-blue-400/30 rounded-full px-4 py-2 text-sm">
          ⏰ Марафон розпочинається сьогодні
        </div>

        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          {current.title}
        </h2>

        <p className="text-lg text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          {current.subtitle}
        </p>

        {/* Audience Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-12 max-w-2xl mx-auto">
          {[
            { id: 'switcher', label: '🌱 Світчер (в IT)' },
            { id: 'digital', label: '💼 Digital спец' },
            { id: 'business', label: '🏢 Власник бізнесу' }
          ].map(btn => (
            <button
              key={btn.id}
              onClick={() => setSelectedAudience(btn.id)}
              className={`px-4 py-3 rounded-lg font-medium transition-all ${
                selectedAudience === btn.id
                  ? 'bg-blue-500 border border-blue-400 text-white'
                  : 'bg-slate-700/50 border border-slate-600 text-slate-300 hover:border-slate-500'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Registration Form */}
        {!submitted ? (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-16">
            <div className="flex gap-2 mb-3">
              <input
                type="email"
                placeholder="Твоя email адреса"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:border-blue-400"
              />
              <button
                type="submit"
                className={`px-6 py-3 rounded-lg font-bold transition-all ${
                  email
                    ? `bg-gradient-to-r ${current.color} hover:shadow-lg`
                    : 'bg-slate-600 cursor-not-allowed'
                }`}
              >
                {current.cta}
              </button>
            </div>
            <p className="text-xs text-slate-400">
              ✅ Безкоштовно. Без спаму. Миттєвий доступ.
            </p>
          </form>
        ) : (
          <div className="max-w-md mx-auto mb-16 p-6 bg-green-500/10 border border-green-400/30 rounded-lg">
            <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-3" />
            <p className="font-bold text-green-300">Готово! Перевір свою email.</p>
            <p className="text-sm text-slate-300 mt-2">Лист з доступом прийде за 1-2 хвилини</p>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-16 max-w-2xl mx-auto">
          {[
            { icon: Users, value: '4,500+', label: 'Учнів' },
            { icon: Clock, value: '3', label: 'Дні' },
            { icon: Zap, value: '$1k+', label: 'На перших проєктах' }
          ].map((stat, i) => (
            <div key={i} className="bg-slate-700/30 border border-slate-600/50 rounded-lg p-4">
              <stat.icon className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <div className="font-bold text-lg">{stat.value}</div>
              <div className="text-xs text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 py-16">
        <h3 className="text-2xl font-bold text-center mb-12">Що ти отримаєш за 3 дні</h3>

        <div className="space-y-4 max-w-2xl mx-auto">
          {current.benefits.map((benefit, i) => (
            <div key={i} className="flex gap-4 p-4 bg-slate-700/20 border border-slate-600/30 rounded-lg hover:border-slate-500 transition">
              <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
              <p className="text-slate-200">{benefit}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Social Proof */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 py-16">
        <h3 className="text-2xl font-bold text-center mb-12">Що кажуть учні</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              text: 'За 3 дні розібрався з AI агентами. Тепер біржа повна замовлень на цей сервіс.',
              author: 'Максим, Фрілансер',
              role: 'Світчер з маркетингу'
            },
            {
              text: 'Показав клієнтові, як автоматизувати його sales flow. Додав $5k до мого місячного доходу.',
              author: 'Ольга, Digital Expert',
              role: 'Marketing Specialist'
            },
            {
              text: 'Скоротили витрати на $3,500 в місяць. Один AI агент замінив дві людини.',
              author: 'Антон, Власник SaaS',
              role: 'CEO'
            },
            {
              text: 'Почав з марафону, тепер роблю AI рішення для своїх клієнтів. Це реально.',
              author: 'Даша, Digital Marketer',
              role: 'Performance Manager'
            }
          ].map((testimonial, i) => (
            <div key={i} className="p-5 bg-slate-700/30 border border-slate-600/30 rounded-lg">
              <p className="text-slate-200 mb-4 italic">"{testimonial.text}"</p>
              <div>
                <p className="font-bold text-sm">{testimonial.author}</p>
                <p className="text-xs text-slate-400">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 max-w-3xl mx-auto px-4 py-16">
        <h3 className="text-2xl font-bold text-center mb-12">Часті питання</h3>

        <div className="space-y-3">
          {[
            {
              q: 'Чи потребує це знання програмування?',
              a: 'Ні. AI агенти будуються без коду. Потрібна лише базова англійська.'
            },
            {
              q: 'Скільки часу займає?',
              a: '3 дні марафону — це 2-3 години кожен день. Все інше — за тобою.'
            },
            {
              q: 'Після марафону я можу самостійно це робити?',
              a: 'Та, це вся суть. За 3 дні ти отримаєш все необхідне для першого проєкту.'
            },
            {
              q: 'Потрібна карта для реєстрації?',
              a: 'Ні, марафон безкоштовний. Реєстрація займає 30 секунд.'
            }
          ].map((faq, i) => (
            <details
              key={i}
              className="group p-4 bg-slate-700/20 border border-slate-600/30 rounded-lg cursor-pointer hover:border-slate-500 transition"
            >
              <summary className="flex items-center justify-between font-bold text-slate-200">
                {faq.q}
                <ChevronDown className="w-4 h-4 group-open:rotate-180 transition" />
              </summary>
              <p className="text-slate-400 mt-3 text-sm">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 max-w-3xl mx-auto px-4 py-16 text-center">
        <h3 className="text-3xl font-bold mb-6">Готовий змінити свою кар'єру?</h3>
        <p className="text-lg text-slate-300 mb-8">
          Приєднайся до 4,500+ українців, що вже заробляють на AI агентах
        </p>
        
        <div className="inline-block">
          <button
            onClick={() => {
              (document.querySelector('input[type="email"]') as HTMLInputElement)?.focus();
              document.querySelector('input[type="email"]')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`px-8 py-4 rounded-lg font-bold text-lg transition-all bg-gradient-to-r ${current.color} hover:shadow-xl hover:shadow-blue-500/50`}
          >
            Розпочати марафон (безкоштовно)
          </button>
        </div>

        <p className="text-xs text-slate-400 mt-6">
          Реєстрація займає 30 секунд. Доступ миттєво.
        </p>
      </section>

      {/* Footer */}
      <footer className="relative z-10 max-w-5xl mx-auto px-4 py-12 text-center border-t border-slate-700/30 mt-16">
        <p className="text-slate-400 text-sm">
          MASC © 2026 | Automation School
        </p>
        <p className="text-xs text-slate-500 mt-2">
          Ми навчаємо небудь розбирається в AI. Ні бекграунду, ні досвіду.
        </p>
      </footer>
    </div>
  );
}
