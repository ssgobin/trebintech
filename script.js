document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = form.querySelector('button');
            btn.textContent = 'Enviando...';
            btn.disabled = true;

            setTimeout(() => {
                btn.textContent = 'Mensagem Enviada!';
                btn.style.background = '#10b981';
                form.reset();

                setTimeout(() => {
                    btn.textContent = 'Enviar Mensagem';
                    btn.style.background = '';
                    btn.disabled = false;
                }, 2000);
            }, 1000);
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#!') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offset = target.offsetTop - 80;
                    window.scrollTo({ top: offset, behavior: 'smooth' });
                }
            }
        });
    });
});