// Método para alternar a visibilidade do menu móvel
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
}

function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth'
        });
    }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        smoothScroll(this.getAttribute('href'));
    });
});

function toggleAnswer(button) {
    const answer = button.nextElementSibling; // Pega o div da resposta correspondente
    answer.classList.toggle('hidden'); // Mostra/Esconde a resposta

    // Alterna o ícone de mais/menos
    const icon = button.querySelector('.icon-toggle');
    if (answer.classList.contains('hidden')) {
        // Se escondido, mostra o sinal de mais
        icon.innerHTML = `
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="16"></line>
        <line x1="8" y1="12" x2="16" y2="12"></line>
    `;
    } else {
        // Se visível, mostra o sinal de menos
        icon.innerHTML = `
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="8" y1="12" x2="16" y2="12"></line>
    `;
    }
}

// Função para criar o efeito de contagem
function animateCounter(element) {
    const target = +element.getAttribute('data-target'); // Valor final do número
    const increment = target / 200; // Incremento com base no número alvo

    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.ceil(current) + '+'; // Adiciona o sinal de +
            requestAnimationFrame(updateCounter); // Animação suave
        } else {
            element.textContent = target + '+'; // Garante que o valor final seja exato
        }
    };

    updateCounter();
}

// Configuração do IntersectionObserver
const observerOptions = {
    threshold: 0.5 // Aciona quando 50% do elemento está visível
};

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counterElement = entry.target;
            animateCounter(counterElement);
            observer.unobserve(counterElement); // Não precisa continuar observando
        }
    });
};

// Inicializando o observador para cada contador
document.querySelectorAll('.count').forEach(counterElement => {
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    observer.observe(counterElement);
});


