import React, { useState } from 'react';

const STEPS = [
  { progress: 0,   x: 80, y: 71, title: 'Você está no interior da loja Riachuelo', dist: 'Distância total: 85m', btn: 'Iniciar Navegação' },
  { progress: 25,  x: 80, y: 43, title: 'Saia pela direita e siga reto pelo corredor lateral', dist: 'Distância: 30m', btn: 'Próximo Passo →' },
  { progress: 50,  x: 45, y: 43, title: 'Vire à esquerda no corredor acima do Átrio', dist: 'Distância: 22m', btn: 'Próximo Passo →' },
  { progress: 75,  x: 45, y: 28, title: 'Siga reto em direção ao estacionamento', dist: 'Distância: 18m', btn: 'Próximo Passo →' },
  { progress: 100, x: 45, y: 12, title: 'Chegou à Vaga A-145!', dist: 'Seu carro está estacionado aqui', btn: 'Finalizar 🏁' }
];

export default function FindMyCarMap() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const currentStep = STEPS[currentIdx];

  const handleAction = () => {
    if (currentIdx < STEPS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setCurrentIdx(0);
    }
  };

  const handleBack = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
    }
  };

  return (
    <div className="app-card">
      <header className="header-nav">
        <button className="btn-back" onClick={handleBack} aria-label="Voltar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div className="header-titles">
          <h1>Encontre meu Carro</h1>
          <p>Planta Baixa · Térreo</p>
        </div>
      </header>

      <div className="top-info-grid">
        <div className="info-card vaga">
          <span className="label">Vaga</span>
          <span className="val">A-145</span>
        </div>
        <div className="info-card andar">
          <span className="label">Pavimento</span>
          <span className="val">Térreo</span>
        </div>
        <div className="info-card setor">
          <span className="label">Setor</span>
          <span className="val">Setor A</span>
        </div>
      </div>

      <div className="map-card-wrapper">
        <div className="map-canvas">
          <div className="map-badge badge-left">Planta Baixa · Térreo</div>
          <div className="map-badge badge-right">Modo...</div>

          <div className="parking-zone top-parking">
            <div className="dashed-lines"></div>
          </div>

          <div className="target-vaga-marker">
            <span className="vaga-text-label">Vaga A-145</span>
            <div className="green-circle-target"></div>
          </div>

          <div className="building-card">
            <div className="building-row">
              <div className="store-box store-amer">Lojas Americanas</div>
              <div className="store-box store-carga">Carga & Serviços</div>
              <div className="store-box store-ca1">C&A</div>
            </div>

            <div className="building-row mid-row">
              <div className="atrium-oval">Praça Central / Átrio</div>
            </div>

            <div className="building-row">
              <div className="store-box store-ca2">C&A</div>
              <div className="store-box store-riach">Riachuelo</div>
            </div>
          </div>

          <div className="entrada-sul-label">ENTRADA SUL</div>

          <div className="parking-zone bottom-parking">
            <div className="dashed-lines"></div>
          </div>

          <svg className="route-svg" viewBox="0 0 1000 1000" preserveAspectRatio="none">
            <path
              d="M 800 710 L 800 430 L 450 430 L 450 120"
              fill="none"
              stroke="#ffffff"
              strokeWidth="14"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <div
            className="user-pin-marker"
            style={{ left: `${currentStep.x}%`, top: `${currentStep.y}%` }}
          />
        </div>

        <div className="progress-bar-container">
          <div
            className="progress-bar-fill"
            style={{ width: `${currentStep.progress}%` }}
          />
        </div>
      </div>

      <div className="instruction-card">
        <div className="current-step-box">
          <div className="icon-step-arrow">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
          <div className="step-details">
            <h3>{currentStep.title}</h3>
            <span className="distance-tag">{currentStep.dist}</span>
          </div>
        </div>
      </div>

      <button className="btn-primary-action" onClick={handleAction}>
        {currentStep.btn}
      </button>
    </div>
  );
}