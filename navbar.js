function criarNavbarInferior() {
  const style = document.createElement('style');
  style.textContent = `
    body {
      padding-bottom: 80px !important; /* espaço para navbar */
    }

    .navbar {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 70px;
      background-color: #111;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      border-top: 1px solid #333;
      z-index: 999;
    }

    .nav-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #aaa;
      font-size: 13px;
      cursor: pointer;
      text-align: center;
      transition: color 0.2s;
    }

    .nav-item:hover {
      color: #fff;
    }

    .nav-icon {
      font-size: 24px;
      margin-bottom: 4px;
    }

    @media (max-width: 768px) {
      .navbar {
        height: 65px;
        padding: 0 5px;
      }

      .nav-item {
        font-size: 12px;
      }

      .nav-icon {
        font-size: 20px;
        margin-bottom: 2px;
      }
    }

    @media (max-width: 480px) {
      .nav-item {
        font-size: 11px;
      }

      .nav-icon {
        font-size: 18px;
      }
    }
  `;
  document.head.appendChild(style);

  const navbar = document.createElement('div');
  navbar.className = 'navbar';
  navbar.innerHTML = `
    <div class="nav-item" onclick="window.location.href='https://filmes.gt.tc/?i=1'">
      <i class="fas fa-home nav-icon"></i>
      🏠
Home
    </div>
    <div class="nav-item" onclick="window.location.href='https://incomparable-cupcake-1fa3e6.netlify.app/jogos'">
      <i class="fas fa-bolt nav-icon"></i>
     🎰 Casa de Aposta
    </div>
    <div class="nav-item" onclick="window.location.href='grupos.html'">
      <i class="fas fa-globe nav-icon"></i>
      👥
Grupos
    </div>
    <div class="nav-item" onclick="window.location.href='minha-conta.html'">
      <i class="fas fa-user nav-icon"></i>
      👤
Perfil
    </div>
  `;
  document.body.appendChild(navbar);

  // Carregar FontAwesome se ainda não estiver presente
  if (!document.getElementById('fontawesome-kit')) {
    const script = document.createElement('script');
    script.id = 'fontawesome-kit';
    script.src = 'https://kit.fontawesome.com/a076d05399.js';
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);
  }
}

document.addEventListener('DOMContentLoaded', criarNavbarInferior);
