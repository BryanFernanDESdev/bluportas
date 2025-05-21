/**
 * Script para corrigir problemas com modais do Bootstrap
 */

// Função para limpar backdrops presos
function clearStuckBackdrops() {
    // Remove todas as classes modal-open do body
    document.body.classList.remove('modal-open');
    
    // Remove todos os backdrops presos
    const stuckBackdrops = document.querySelectorAll('.modal-backdrop');
    stuckBackdrops.forEach(backdrop => {
        backdrop.remove();
    });
    
    // Restaura o scroll
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
}

// Executa a limpeza quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    clearStuckBackdrops();
    
    // Adiciona evento para limpar backdrops quando um modal é fechado
    document.body.addEventListener('hidden.bs.modal', function() {
        // Pequeno timeout para garantir que o Bootstrap terminou de processar
        setTimeout(clearStuckBackdrops, 100);
    });
});

// Função para criar toast em vez de modal
function showSuccessToast(message, details = {}) {
    // Remove qualquer toast existente
    const existingToasts = document.querySelectorAll('.toast-container');
    existingToasts.forEach(toast => toast.remove());
    
    // Cria o container do toast
    const toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
    toastContainer.style.zIndex = '1100';
    
    // Cria o HTML do toast
    let detailsHtml = '';
    if (details.value) {
        detailsHtml += `<p>Valor: R$ ${details.value}</p>`;
    }
    if (details.warranty) {
        detailsHtml += `<p>Garantia até: ${details.warranty}</p>`;
    }
    
    // Botão de ação
    let actionButton = '';
    if (details.actionUrl) {
        actionButton = `
            <div class="mt-2">
                <button type="button" class="btn btn-sm btn-light action-btn" data-url="${details.actionUrl}">
                    <i class="fas fa-info-circle me-1"></i> ${details.actionText || 'Ver Detalhes'}
                </button>
            </div>
        `;
    }
    
    toastContainer.innerHTML = `
        <div class="toast align-items-center text-white bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                    <h5><i class="fas fa-check-circle me-2"></i> Sucesso!</h5>
                    <p>${message}</p>
                    ${detailsHtml}
                    ${actionButton}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    `;
    
    // Adiciona o toast ao body
    document.body.appendChild(toastContainer);
    
    // Inicializa o toast
    const toast = new bootstrap.Toast(toastContainer.querySelector('.toast'), {
        autohide: false
    });
    toast.show();
    
    // Adiciona evento para o botão de ação
    const actionBtn = toastContainer.querySelector('.action-btn');
    if (actionBtn) {
        actionBtn.addEventListener('click', function() {
            window.location.href = this.getAttribute('data-url');
        });
    }
    
    // Remove o toast do DOM quando for fechado
    toastContainer.querySelector('.toast').addEventListener('hidden.bs.toast', function() {
        toastContainer.remove();
    });
    
    return toast;
}