// Dados de exemplo para demonstração
const demoData = {
    clients: [
        { id: 1, name: 'João Silva', phone: '(11) 98765-4321', email: 'joao@email.com' },
        { id: 2, name: 'Maria Oliveira', phone: '(11) 91234-5678', email: 'maria@email.com' },
        { id: 3, name: 'Carlos Santos', phone: '(11) 99876-5432', email: 'carlos@email.com' }
    ],
    vehicles: [
        { id: 1, clientId: 1, plate: 'ABC1234', model: 'Gol', year: '2018', color: 'Prata' },
        { id: 2, clientId: 1, plate: 'DEF5678', model: 'Civic', year: '2020', color: 'Preto' },
        { id: 3, clientId: 2, plate: 'GHI9012', model: 'Corolla', year: '2019', color: 'Branco' },
        { id: 4, clientId: 3, plate: 'JKL3456', model: 'HB20', year: '2021', color: 'Vermelho' }
    ],
    services: [
        { 
            id: 1, 
            vehicleId: 1, 
            date: '2023-05-15', 
            description: 'Instalação de porta automática', 
            warranty: '2023-11-15',
            details: 'Instalação completa de porta automática com sensor de presença'
        },
        { 
            id: 2, 
            vehicleId: 3, 
            date: '2023-06-20', 
            description: 'Manutenção de porta automática', 
            warranty: '2023-09-20',
            details: 'Troca de motor e ajuste de sensores'
        },
        { 
            id: 3, 
            vehicleId: 2, 
            date: '2023-07-10', 
            description: 'Instalação de vidro elétrico', 
            warranty: '2024-07-10',
            details: 'Instalação de kit completo de vidros elétricos'
        },
        { 
            id: 4, 
            vehicleId: 4, 
            date: '2023-08-05', 
            description: 'Reparo em trava elétrica', 
            warranty: '2023-11-05',
            details: 'Substituição de módulo central e reprogramação'
        }
    ]
};

// Função para salvar dados no localStorage
function saveData() {
    localStorage.setItem('systemData', JSON.stringify(demoData));
}

// Função para carregar dados do localStorage
function loadData() {
    const savedData = localStorage.getItem('systemData');
    if (savedData) {
        return JSON.parse(savedData);
    }
    // Se não houver dados salvos, usa os dados de demonstração e salva
    saveData();
    return demoData;
}

// Função para formatar data de YYYY-MM-DD para DD/MM/YYYY
function formatDate(dateString) {
    if (!dateString) return '';
    const parts = dateString.split('-');
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

// Função para verificar se uma garantia está próxima do vencimento (30 dias)
function isWarrantyEnding(warrantyDate) {
    const today = new Date();
    const warranty = new Date(warrantyDate);
    const diffTime = warranty - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 && diffDays <= 30;
}

// Função para verificar se uma garantia está vencida
function isWarrantyExpired(warrantyDate) {
    const today = new Date();
    const warranty = new Date(warrantyDate);
    return today > warranty;
}

// Função para obter o nome do cliente pelo ID
function getClientName(clientId) {
    const data = loadData();
    const client = data.clients.find(c => c.id === clientId);
    return client ? client.name : 'Cliente não encontrado';
}

// Função para obter o veículo pela placa
function getVehicleByPlate(plate) {
    const data = loadData();
    return data.vehicles.find(v => v.plate.toLowerCase() === plate.toLowerCase());
}

// Função para obter os serviços de um veículo
function getVehicleServices(vehicleId) {
    const data = loadData();
    return data.services.filter(s => s.vehicleId === vehicleId);
}

// Função para obter o cliente de um veículo
function getVehicleClient(vehicleId) {
    const data = loadData();
    const vehicle = data.vehicles.find(v => v.id === vehicleId);
    if (vehicle) {
        return data.clients.find(c => c.id === vehicle.clientId);
    }
    return null;
}

// Inicialização da página
document.addEventListener('DOMContentLoaded', function() {
    // Verifica qual página está sendo carregada
    const currentPage = window.location.pathname.split('/').pop();
    
    // Inicializa a página correspondente
    switch(currentPage) {
        case 'index.html':
        case '':
            initDashboard();
            break;
        case 'cadastro.html':
            initCadastro();
            break;
        case 'consulta.html':
            initConsulta();
            break;
        case 'servicos.html':
            initServicos();
            break;
        case 'detalhes.html':
            initDetalhes();
            break;
        case 'lista-servicos.html':
            // A função initListaServicos está definida na própria página
            break;
        case 'lista-veiculos.html':
            // A função initListaVeiculos está definida na própria página
            break;
    }
});

// Função para calcular faturamento mensal (exemplo)
function calculateMonthlyRevenue() {
    const data = loadData();
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    // Verifica se os serviços têm valor
    let monthlyRevenue = 0;
    
    data.services.forEach(service => {
        const serviceDate = new Date(service.date);
        // Se o serviço foi realizado no mês atual
        if (serviceDate.getMonth() === currentMonth && serviceDate.getFullYear() === currentYear) {
            // Usa o valor do serviço se existir, ou um valor padrão de R$ 150
            const serviceValue = service.value || 150;
            monthlyRevenue += serviceValue;
        }
    });
    
    return monthlyRevenue;
}

// Função para exportar dados
function exportData() {
    const data = loadData();
    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'sistema_dados_' + new Date().toISOString().split('T')[0] + '.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

// Inicialização da página de dashboard
function initDashboard() {
    const data = loadData();
    
    // Atualiza contadores
    document.getElementById('clientCount').textContent = data.clients.length;
    document.getElementById('vehicleCount').textContent = data.vehicles.length;
    document.getElementById('serviceCount').textContent = data.services.length;
    
    // Conta garantias próximas do vencimento
    const warrantiesEnding = data.services.filter(s => isWarrantyEnding(s.warranty)).length;
    document.getElementById('warrantyCount').textContent = warrantiesEnding;
    
    // Calcula e exibe o faturamento mensal
    const monthlyRevenue = calculateMonthlyRevenue();
    document.getElementById('revenueCount').textContent = `R$ ${monthlyRevenue.toFixed(2).replace('.', ',')}`;
    
    // Preenche tabela de serviços recentes
    const recentServicesTable = document.getElementById('recentServices').getElementsByTagName('tbody')[0];
    
    // Ordena serviços por data (mais recentes primeiro)
    const sortedServices = [...data.services].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Pega os 5 serviços mais recentes
    const recentServices = sortedServices.slice(0, 5);
    
    recentServices.forEach(service => {
        const vehicle = data.vehicles.find(v => v.id === service.vehicleId);
        const client = data.clients.find(c => c.id === vehicle.clientId);
        
        const row = recentServicesTable.insertRow();
        
        // Data do serviço
        const dateCell = row.insertCell();
        dateCell.textContent = formatDate(service.date);
        
        // Nome do cliente
        const clientCell = row.insertCell();
        clientCell.textContent = client.name;
        
        // Placa do veículo
        const plateCell = row.insertCell();
        plateCell.textContent = vehicle.plate;
        
        // Descrição do serviço
        const serviceCell = row.insertCell();
        serviceCell.textContent = service.description;
        
        // Data da garantia
        const warrantyCell = row.insertCell();
        warrantyCell.textContent = formatDate(service.warranty);
        
        // Adiciona classe para destacar garantias próximas do vencimento ou vencidas
        if (isWarrantyExpired(service.warranty)) {
            warrantyCell.classList.add('text-danger');
            warrantyCell.textContent += ' (Vencida)';
        } else if (isWarrantyEnding(service.warranty)) {
            warrantyCell.classList.add('text-warning');
            warrantyCell.textContent += ' (Próxima)';
        }
        
        // Coluna de ações
        const actionsCell = row.insertCell();
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'd-flex gap-1';
        
        // Botão de editar serviço
        const editBtn = document.createElement('button');
        editBtn.className = 'btn btn-sm btn-warning';
        editBtn.innerHTML = '<i class="fas fa-edit"></i>';
        editBtn.title = 'Editar Serviço';
        editBtn.addEventListener('click', function() {
            window.location.href = `servicos.html?edit=${service.id}`;
        });
        actionsDiv.appendChild(editBtn);
        
        // Botão de detalhes
        const detailsBtn = document.createElement('button');
        detailsBtn.className = 'btn btn-sm btn-info text-white';
        detailsBtn.innerHTML = '<i class="fas fa-info-circle"></i>';
        detailsBtn.title = 'Ver Detalhes';
        detailsBtn.addEventListener('click', function() {
            window.location.href = `detalhes.html?id=${vehicle.id}`;
        });
        actionsDiv.appendChild(detailsBtn);
        
        actionsCell.appendChild(actionsDiv);
    });
    
    // Configura busca rápida
    const searchBtn = document.getElementById('searchBtn');
    const quickSearch = document.getElementById('quickSearch');
    
    searchBtn.addEventListener('click', function() {
        const plate = quickSearch.value.trim();
        if (plate) {
            const vehicle = getVehicleByPlate(plate);
            if (vehicle) {
                // Redireciona para a página de detalhes com o ID do veículo
                window.location.href = `detalhes.html?id=${vehicle.id}`;
            } else {
                alert('Veículo não encontrado. Verifique a placa informada.');
            }
        } else {
            alert('Por favor, informe a placa do veículo.');
        }
    });
    
    // Permite buscar ao pressionar Enter
    quickSearch.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });
    
    // Configuração do modal de garantias
    const modal = document.getElementById('warrantiesModal');
    const viewWarrantiesBtn = document.getElementById('viewWarranties');
    const closeModal = document.getElementsByClassName('close-modal')[0];
    
    // Abre o modal ao clicar no botão
    viewWarrantiesBtn.addEventListener('click', function() {
        // Preenche a tabela de garantias
        const warrantiesTable = document.getElementById('warrantiesTable').getElementsByTagName('tbody')[0];
        warrantiesTable.innerHTML = '';
        
        // Filtra serviços com garantias próximas do vencimento ou recém vencidas
        const warrantiesServices = data.services.filter(s => 
            isWarrantyEnding(s.warranty) || 
            (isWarrantyExpired(s.warranty) && new Date(s.warranty) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
        );
        
        if (warrantiesServices.length === 0) {
            const row = warrantiesTable.insertRow();
            const cell = row.insertCell();
            cell.colSpan = 5;
            cell.textContent = 'Nenhuma garantia próxima do vencimento.';
            cell.style.textAlign = 'center';
        } else {
            warrantiesServices.forEach(service => {
                const vehicle = data.vehicles.find(v => v.id === service.vehicleId);
                const client = data.clients.find(c => c.id === vehicle.clientId);
                
                const row = warrantiesTable.insertRow();
                
                // Cliente
                const clientCell = row.insertCell();
                clientCell.textContent = client.name;
                
                // Placa
                const plateCell = row.insertCell();
                plateCell.textContent = vehicle.plate;
                
                // Serviço
                const serviceCell = row.insertCell();
                serviceCell.textContent = service.description;
                
                // Vencimento
                const warrantyCell = row.insertCell();
                warrantyCell.textContent = formatDate(service.warranty);
                
                if (isWarrantyExpired(service.warranty)) {
                    warrantyCell.classList.add('warranty-expired');
                    warrantyCell.textContent += ' (Vencida)';
                } else {
                    warrantyCell.classList.add('warranty-ending');
                    const today = new Date();
                    const warranty = new Date(service.warranty);
                    const diffTime = warranty - today;
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    warrantyCell.textContent += ` (${diffDays} dias)`;
                }
                
                // Ações
                const actionsCell = row.insertCell();
                const detailsBtn = document.createElement('button');
                detailsBtn.className = 'mini-btn';
                detailsBtn.innerHTML = '<i class="fas fa-info-circle"></i> Detalhes';
                detailsBtn.addEventListener('click', function() {
                    window.location.href = `detalhes.html?id=${vehicle.id}`;
                });
                actionsCell.appendChild(detailsBtn);
            });
        }
        
        modal.style.display = 'block';
    });
    
    // Fecha o modal ao clicar no X
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Fecha o modal ao clicar fora dele
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Configuração dos botões de ação rápida
    document.getElementById('exportDataBtn').addEventListener('click', exportData);
    
    document.getElementById('backupBtn').addEventListener('click', function() {
        exportData();
        alert('Backup realizado com sucesso! O arquivo foi baixado para o seu computador.');
    });
    
    document.getElementById('printReportBtn').addEventListener('click', function() {
        window.print();
    });
}