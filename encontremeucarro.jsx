import React, { useState } from 'react';
import './styles.css';

// Dados que mapeiam cada tela (da 13 até a 18)
const NAVIGATION_STEPS = [
  {
    screenId: 13,
    type: 'start',
    buttonText: 'Iniciar Navegação',
  },
  {
    screenId: 14,
    stepNum: 1,
    totalSteps: 5,
    progress: 10,
    currentStep: {
      title: 'Saia pela entrada principal',
      distance: '50m',
    },
    nextSteps: [
      { num: 2, title: 'Siga até o elevador 1º Andar' },
      { num: 3, title: 'Vá para o 1º Andar' },
    ],
    buttonText: 'Próximo Passo',
  },
  {
    screenId: 15,
    stepNum: 2,
    totalSteps: 5,
    progress: 35,
    currentStep: {
      title: 'Siga até o elevador 1º Andar',
      distance: '30m',
    },
    nextSteps: [
      { num: 3, title: 'Vá para o 1º Andar' },
      { num: 4, title: 'Caminhe até o setor Setor A' },
    ],
    buttonText: 'Próximo Passo',
  },
  {
    screenId: 16,
    stepNum: 3,
    totalSteps: 5,
    progress: 60,
    currentStep: {
      title: 'Vá para o 1º Andar',
      distance: null,
    },
    nextSteps: [
      { num: 4, title: 'Caminhe até o setor Setor A' },
      { num: 5, title: 'Sua vaga é a A19' },
    ],
    buttonText: 'Próximo Passo',
  },
  {
    screenId: 17,
    stepNum: 4,
    totalSteps: 5,
    progress: 82,
    currentStep: {
      title: 'Caminhe até o setor Setor A',
      distance: '40m',
    },
    nextSteps: [
      { num: 5, title: 'Sua vaga é a A19' },
    ],
    buttonText: 'Próximo Passo',
  },
  {
    screenId: 18,
    stepNum: 5,
    totalSteps: 5,
    progress: 100,
    currentStep: {
      title: 'Sua vaga é a A19',
      distance: '10m',
    },
    isArrival: true,
    buttonText: 'Finalizar rota',
  },
];

export default function EncontreMeuCarroFlow({ onBackToMonitoring }) {
  // Estado que controla em qual índice do fluxo estamos (0 = Tela 13, 5 = Tela 18)
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const currentData = NAVIGATION_STEPS[currentStepIdx];

  const handleNext = () => {
    if (currentStepIdx < NAVIGATION_STEPS.length - 1) {
      setCurrentStepIdx((prev) => prev + 1);
    } else {
      // Se estiver na Tela 18 e clicar em "Finalizar rota", volta para o Monitoramento
      if (onBackToMonitoring) onBackToMonitoring();
    }
  };

  const handleBack = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx((prev) => prev - 1);
    } else {
      if (onBackToMonitoring) onBackToMonitoring();
    }
  };

  return (
    <div className="app-card">
      {/* Header com botão de voltar */}
      <header className="header-nav">
        <button className="btn-back" onClick={handleBack} aria-label="Voltar">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div className="header-titles">
          <h1>Encontre meu Carro</h1>
          <p>Navegação até seu veículo</p>
        </div>
      </header>

      {/* Grid Superior de Informações */}
      <div className="top-info-grid">
        <div className="info-card vaga">
          <span className="label">Vaga</span>
          <span className="val">A70</span>
        </div>
        <div className="info-card andar">
          <span className="label">Andar</span>
          <span className="val">1º Andar</span>
        </div>
        <div className="info-card setor">
          <span className="label">Setor</span>
          <span className="val">Setor A</span>
        </div>
      </div>

      {/* ÁREA CENTRAL DO MAPA / PROGRESSO */}
      <div className="map-container">
        {currentData.type === 'start' ? (
          /* Tela 13 - Card Inicial de Navegação */
          <div className="start-nav-box">
            <div className="icon-circle-blue">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <h2>Inicie a navegação</h2>
            <p>Ver o caminho até seu carro</p>
          </div>
        ) : (
          /* Telas 14 a 18 - Barra de Progresso com Aviãozinho/Pin */
          <div className="progress-route-wrapper">
            <div className="progress-track">
              <div 
                className="progress-fill progress-bar-fill" 
                style={{ width: `${currentData.progress}%` }} 
              />
              <div 
                className="progress-pin" 
                style={{ left: `${currentData.progress}%` }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 2L11 13" />
                  <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                </svg>
              </div>
            </div>
            <div className="step-pill-badge">
              Passo {currentData.stepNum} de {currentData.totalSteps}
            </div>
          </div>
        )}
      </div>

      {/* DETALHES DO PASSO ATUAL E PRÓXIMOS PASSOS */}
      {currentData.currentStep && (
        <div className="instruction-card">
          <div className="current-step-box">
            <div className="icon-step-arrow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
            <div className="step-details">
              <h3>{currentData.currentStep.title}</h3>
              {currentData.currentStep.distance && (
                <div className="distance-tag">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#ef4444" stroke="#ef4444" strokeWidth="2">
                    <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
                  </svg>
                  <span>Distância: {currentData.currentStep.distance}</span>
                </div>
              )}
            </div>
          </div>

          {/* Próximos passos (Telas 14 a 17) */}
          {currentData.nextSteps && currentData.nextSteps.length > 0 && (
            <div className="next-steps-section">
              <span className="next-steps-title">PRÓXIMOS PASSOS</span>
              {currentData.nextSteps.map((step) => (
                <div key={step.num} className="next-step-item">
                  <div className="badge-num">{step.num}</div>
                  <span className="next-step-text">{step.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TELA 18: CARD EXTRA DE CHEGADA AO DESTINO */}
      {currentData.isArrival && (
        <div className="arrival-card">
          <div className="arrival-icon-circle">
            {/* Ícone de Carro */}
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C1.4 11.2 1 12.1 1 13v3c0 .6.4 1 1 1h2" />
              <circle cx="7" cy="17" r="2" />
              <circle cx="17" cy="17" r="2" />
            </svg>
          </div>
          <h2>Você chegou!</h2>
          <p>Seu carro está à sua frente</p>
        </div>
      )}

      {/* BOTÃO DE AÇÃO */}
      <button className="btn-primary-action" onClick={handleNext}>
        {currentData.type === 'start' && (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 2L11 13" />
            <path d="M22 2L15 22L11 13L2 9L22 2Z" />
          </svg>
        )}
        <span>{currentData.buttonText}</span>
        {currentData.type !== 'start' && (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        )}
      </button>
    </div>
  );
}