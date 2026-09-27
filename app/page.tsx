'use client';

import { useState } from 'react';

const styles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    background: linear-gradient(to bottom, rgb(15, 23, 42), rgb(30, 41, 59), rgb(15, 23, 42));
    color: white;
    font-family: system-ui, -apple-system, sans-serif;
    line-height: 1.5;
  }
  
  .container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 24px;
  }
  
  nav {
    border-bottom: 1px solid rgba(148, 163, 184, 0.2);
    backdrop-filter: blur(12px);
    position: sticky;
    top: 0;
    z-index: 40;
  }
  
  nav .inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 24px;
  }
  
  nav .logo {
    font-size: 20px;
    font-weight: bold;
  }
  
  nav button {
    padding: 8px 24px;
    background: rgb(37, 99, 235);
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
  }
  
  nav button:hover {
    background: rgb(29, 78, 216);
  }
  
  .hero {
    max-width: 1280px;
    margin: 0 auto;
    padding: 80px 24px 48px;
  }
  
  .hero-title {
    font-size: 56px;
    font-weight: bold;
    margin-bottom: 24px;
    background: linear-gradient(to right, rgb(96, 165, 250), rgb(168, 85, 247));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .hero-subtitle {
    font-size: 20px;
    color: rgb(203, 213, 225);
    margin-bottom: 32px;
  }
  
  .button-group {
    display: inline-flex;
    gap: 8px;
    background: rgba(30, 41, 59, 0.5);
    padding: 8px;
    border-radius: 8px;
    border: 1px solid rgb(51, 65, 85);
    margin-bottom: 48px;
  }
  
  .button-group button {
    padding: 8px 16px;
    border: none;
    border-radius: 6px;
    background: transparent;
    color: rgb(148, 163, 184);
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .button-group button.active {
    background: rgb(51, 65, 85);
    color: white;
  }
  
  .audience-section {
    margin-bottom: 64px;
    padding: 32px;
    border-radius: 16px;
    background: linear-gradient(to right, rgba(37, 99, 235, 0.1), rgba(168, 85, 247, 0.1));
    border: 1px solid rgb(51, 65, 85);
  }
  
  .audience-section h2 {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 16px;
  }
  
  .audience-section p {
    font-size: 18px;
    color: rgb(226, 232, 240);
  }
  
  .benefits {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
    margin-bottom: 64px;
  }
  
  .benefit-card {
    padding: 24px;
    border-radius: 12px;
    background: rgba(30, 41, 59, 0.5);
    border: 1px solid rgb(51, 65, 85);
    transition: border-color 0.2s;
  }
  
  .benefit-card:hover {
    border-color: rgb(71, 85, 105);
  }
  
  .benefit-icon {
    font-size: 32px;
    margin-bottom: 16px;
  }
  
  .benefit-card h3 {
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 8px;
  }
  
  .benefit-card p {
    color: rgb(148, 163, 184);
  }
  
  .program {
    margin-bottom: 64px;
  }
  
  .program h2 {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 32px;
    text-align: center;
  }
  
  .program-item {
    padding: 24px;
    border-radius: 8px;
    background: rgba(30, 41, 59, 0.5);
    border: 1px solid rgb(51, 65, 85);
    margin-bottom: 16px;
    display: flex;
    gap: 16px;
  }
  
  .program-day {
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: rgba(37, 99, 235, 0.2);
    border: 2px solid rgb(59, 130, 246);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: rgb(147, 197, 253);
  }
  
  .program-content h3 {
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 4px;
  }
  
  .program-content p {
    color: rgb(148, 163, 184);
  }
  
  .form-container {
    max-width: 448px;
    margin: 0 auto;
    background: linear-gradient(to bottom, rgb(30, 41, 59), rgb(15, 23, 42));
    border-radius: 16px;
    padding: 32px;
    border: 1px solid rgb(51, 65, 85);
  }
  
  .form-container h2 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 24px;
  }
  
  .form-group {
    margin-bottom: 16px;
  }
  
  .form-group input,
  .form-group select {
    width: 100%;
    padding: 12px 16px;
    border-radius: 8px;
    background: rgb(51, 65, 85);
    border: 1px solid rgb(71, 85, 105);
    color: white;
    font-size: 16px;
  }
  
  .form-group input::placeholder {
    color: rgb(100, 116, 139);
  }
  
  .form-group input:focus,
  .form-group select:focus {
    outline: none;
    border-color: rgb(59, 130, 246);
  }
  
  .submit-btn {
    width: 100%;
    padding: 16px 32px;
    border-radius: 8px;
    font-weight: bold;
    font-size: 18px;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
    color: white;
  }
  
  .success-message {
    text-align: center;
    padding: 32px;
  }
  
  .success-icon {
    font-size: 32px;
    margin-bottom: 16px;
  }
  
  .footer-note {
    text-align: center;
    color: rgb(100, 116, 139);
    font-size: 14px;
    margin-top: 24px;
  }
`;

export default function AIAgentsMarathonLanding() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [selectedAudience, setSelectedAudience] = useState('switcher');

  const audienceData = {
    switcher: {
      title: 'Для IT-спеціалістів, які хочуть перейти в automation',
      description: 'Навчись автоматизувати робочі процеси без коду',
      buttonColor: 'rgb(37, 99, 235)'
    },
    digital: {
      title: 'Для digital-спеціалістів',
      description: 'Масштабуй свої кампанії з AI і автоматизацією',
      buttonColor: 'rgb(126, 34, 206)'
    },
    business: {
      title: 'Для власників малого бізнесу',
      description: 'Заощаджуй час та гроші з розумною автоматизацією',
      buttonColor: 'rgb(34, 197, 94)'
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
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      
      <nav>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>MASC AI Agents</div>
            <button
              onClick={() => {
                (document.querySelector('input[type="email"]') as HTMLInputElement)?.focus();
              }}
              style={{ padding: '8px 24px', background: 'rgb(37, 99, 235)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}
            >
              Записатися
            </button>
          </div>
        </div>
      </nav>

      <div className="hero">
        <h1 className="hero-title">3-Денний Марафон AI Агентів</h1>
        <p className="hero-subtitle">Навчись будувати AI-агентів, які автоматизують твою роботу</p>
        
        <div className="button-group">
          {Object.entries(audienceData).map(([key]) => (
            <button
              key={key}
              className={`${selectedAudience === key ? 'active' : ''}`}
              onClick={() => setSelectedAudience(key)}
              style={{
                background: selectedAudience === key ? 'rgb(51, 65, 85)' : 'transparent',
                color: selectedAudience === key ? 'white' : 'rgb(148, 163, 184)'
              }}
            >
              {key === 'switcher' ? 'IT-спеціаліст' : key === 'digital' ? 'Digital-фахівець' : 'Бізнесмен'}
            </button>
          ))}
        </div>

        <div className="audience-section">
          <h2>{current.title}</h2>
          <p>{current.description}</p>
        </div>

        <div className="benefits">
          {[
            { icon: '✓', title: 'Без знання програмування', desc: 'Ми все поясним, починаючи з нуля' },
            { icon: '⏱', title: 'Всього 3 дні', desc: 'Інтенсивний курс, який можна пройти за вихідні' },
            { icon: '⚡', title: 'Реальні приклади', desc: 'Розбираємо кейси з реальних проектів' }
          ].map((item, i) => (
            <div key={i} className="benefit-card">
              <div className="benefit-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="program">
          <h2>Програма марафону</h2>
          {[
            { day: 'День 1', topic: 'Основи AI і як вибрати правильний інструмент' },
            { day: 'День 2', topic: 'Створюємо свого першого AI-агента' },
            { day: 'День 3', topic: 'Інтеграція з реальними сервісами (Google, Slack, тощо)' }
          ].map((item, i) => (
            <div key={i} className="program-item">
              <div className="program-day">{i + 1}</div>
              <div className="program-content">
                <h3>{item.day}</h3>
                <p>{item.topic}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="form-container">
          <h2>Розпочни марафон</h2>
          
          {submitted ? (
            <div className="success-message">
              <div className="success-icon">✓</div>
              <p style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Дякуємо за реєстрацію!</p>
              <p style={{ color: 'rgb(148, 163, 184)' }}>Перевір свій email для деталей</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Твій email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="form-group">
                <select
                  value={selectedAudience}
                  onChange={(e) => setSelectedAudience(e.target.value)}
                >
                  <option value="switcher">IT-спеціаліст, який хоче перейти</option>
                  <option value="digital">Digital-фахівець</option>
                  <option value="business">Власник малого бізнесу</option>
                </select>
              </div>

              <button
                type="submit"
                className="submit-btn"
                style={{ background: current.buttonColor }}
              >
                Розпочати марафон (безкоштовно)
              </button>
            </form>
          )}
          
          <p className="footer-note">
            Марафон стартує найближчого тижня. Місця обмежені!
          </p>
        </div>
      </div>
    </>
  );
}
