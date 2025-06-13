// Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '/logout' || this.getAttribute('href') === '/dashboard') {
                return; // Allow normal navigation for logout and dashboard
            }
            
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding section
            const sectionId = this.getAttribute('data-section');
            const section = document.getElementById(sectionId);
            if (section) {
                section.classList.add('active');
                
                // Load content based on section
                switch(sectionId) {
                    case 'todos-eventos':
                        loadAllEvents();
                        break;
                    case 'inscritos':
                        loadInscribedEvents();
                        break;
                    case 'meus-eventos':
                        loadMyEvents();
                        break;
                    case 'perfil':
                        loadProfile();
                        break;
                }
            }
        });
    });

    // Modal functionality
    const modal = document.getElementById('event-modal');
    const closeBtn = document.querySelector('.close');

    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Profile form submission
    const profileForm = document.getElementById('profile-form');
    profileForm.addEventListener('submit', function(e) {
        e.preventDefault();
        updateProfile();
    });

    // Entity linking
    const linkEntityBtn = document.getElementById('link-entity-btn');
    linkEntityBtn.addEventListener('click', function() {
        linkToEntity();
    });

    // Create event button
    const createEventBtn = document.getElementById('create-event-btn');
    createEventBtn.addEventListener('click', function() {
        window.location.href = '/eventos/novo';
    });

    // Load initial content
    loadAllEvents();
    loadEntities();
    checkUserEntityStatus();
});

// Load all events
async function loadAllEvents() {
    try {
        const response = await fetch('/api/eventos');
        const events = await response.json();
        
        const container = document.getElementById('events-container');
        container.innerHTML = '';
        
        events.forEach(event => {
            const eventCard = createEventCard(event);
            container.appendChild(eventCard);
        });
    } catch (error) {
        console.error('Erro ao carregar eventos:', error);
    }
}

// Load inscribed events
async function loadInscribedEvents() {
    try {
        const response = await fetch('/api/eventos/inscritos');
        const events = await response.json();
        
        const container = document.getElementById('inscribed-events-container');
        container.innerHTML = '';
        
        if (events.length === 0) {
            container.innerHTML = '<p>Você ainda não se inscreveu em nenhum evento.</p>';
            return;
        }
        
        events.forEach(event => {
            const eventCard = createEventCard(event, true);
            container.appendChild(eventCard);
        });
    } catch (error) {
        console.error('Erro ao carregar eventos inscritos:', error);
    }
}

// Load my events
async function loadMyEvents() {
    try {
        const response = await fetch('/api/eventos/meus');
        const events = await response.json();
        
        const container = document.getElementById('my-events-container');
        container.innerHTML = '';
        
        if (events.length === 0) {
            container.innerHTML = '<p>Você ainda não criou nenhum evento.</p>';
            return;
        }
        
        events.forEach(event => {
            const eventCard = createEventCard(event, false, true);
            container.appendChild(eventCard);
        });
    } catch (error) {
        console.error('Erro ao carregar meus eventos:', error);
    }
}

// Create event card
function createEventCard(event, isInscribed = false, isOwner = false) {
    const card = document.createElement('div');
    card.className = 'event-card';
    
    const eventDate = new Date(event.data_evento).toLocaleDateString('pt-BR');
    const eventTime = new Date(event.data_evento).toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    card.innerHTML = `
        <h3>${event.titulo}</h3>
        <p><strong>Data:</strong> ${eventDate}</p>
        <p><strong>Horário:</strong> ${eventTime}</p>
        <p><strong>Local:</strong> ${event.local}</p>
        ${isOwner ? '<p><strong>Status:</strong> Meu evento</p>' : ''}
        ${isInscribed ? '<p><strong>Status:</strong> Inscrito</p>' : ''}
    `;
    
    card.addEventListener('click', function() {
        showEventDetails(event, isInscribed, isOwner);
    });
    
    return card;
}

// Show event details in modal
function showEventDetails(event, isInscribed = false, isOwner = false) {
    const modal = document.getElementById('event-modal');
    const detailsContainer = document.getElementById('event-details');
    
    const eventDate = new Date(event.data_evento).toLocaleDateString('pt-BR');
    const eventTime = new Date(event.data_evento).toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    let actionButton = '';
    if (isOwner) {
        actionButton = `<button class="subscribe-btn" onclick="editEvent(${event.id})">Editar Evento</button>`;
    } else if (!isInscribed) {
        actionButton = `<button class="subscribe-btn" onclick="subscribeToEvent(${event.id})">Inscreva-se</button>`;
    } else {
        actionButton = `<button class="subscribe-btn" disabled>Já inscrito</button>`;
    }
    
    detailsContainer.innerHTML = `
        <h2>${event.titulo}</h2>
        <p><strong>Descrição:</strong> ${event.descricao || 'Sem descrição'}</p>
        <p><strong>Data:</strong> ${eventDate}</p>
        <p><strong>Horário:</strong> ${eventTime}</p>
        <p><strong>Local:</strong> ${event.local}</p>
        <p><strong>Vagas:</strong> ${event.vagas}</p>
        <p><strong>Organizador:</strong> ${event.organizador_nome || 'Não informado'}</p>
        ${actionButton}
    `;
    
    modal.style.display = 'block';
}

// Subscribe to event
async function subscribeToEvent(eventId) {
    try {
        const response = await fetch(`/api/eventos/${eventId}/inscrever`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            alert('Inscrição realizada com sucesso!');
            document.getElementById('event-modal').style.display = 'none';
            
            // Reload current section
            const activeSection = document.querySelector('.section.active');
            if (activeSection) {
                const sectionId = activeSection.id;
                switch(sectionId) {
                    case 'todos-eventos':
                        loadAllEvents();
                        break;
                    case 'inscritos':
                        loadInscribedEvents();
                        break;
                }
            }
        } else {
            const error = await response.json();
            alert('Erro ao se inscrever: ' + error.message);
        }
    } catch (error) {
        console.error('Erro ao se inscrever:', error);
        alert('Erro ao se inscrever no evento');
    }
}

// Edit event
function editEvent(eventId) {
    window.location.href = `/eventos/editar/${eventId}`;
}

// Load profile
function loadProfile() {
    loadLinkedEntities();
}

// Update profile
async function updateProfile() {
    const formData = new FormData(document.getElementById('profile-form'));
    const data = Object.fromEntries(formData);
    
    try {
        const response = await fetch('/api/usuarios/perfil', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            alert('Perfil atualizado com sucesso!');
        } else {
            alert('Erro ao atualizar perfil');
        }
    } catch (error) {
        console.error('Erro ao atualizar perfil:', error);
        alert('Erro ao atualizar perfil');
    }
}

// Load entities for selection
async function loadEntities() {
    try {
        const response = await fetch('/api/entidades');
        const entities = await response.json();
        
        const select = document.getElementById('entity-select');
        select.innerHTML = '<option value="">Selecione uma entidade</option>';
        
        entities.forEach(entity => {
            const option = document.createElement('option');
            option.value = entity.id;
            option.textContent = entity.nome;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Erro ao carregar entidades:', error);
    }
}

// Link to entity
async function linkToEntity() {
    const entityId = document.getElementById('entity-select').value;
    const cargo = document.getElementById('cargo').value;
    
    if (!entityId || !cargo) {
        alert('Por favor, selecione uma entidade e informe o cargo');
        return;
    }
    
    try {
        const response = await fetch('/api/entidades/vincular', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ entidade_id: entityId, cargo: cargo })
        });
        
        if (response.ok) {
            alert('Vinculação realizada com sucesso!');
            document.getElementById('entity-select').value = '';
            document.getElementById('cargo').value = '';
            loadLinkedEntities();
            checkUserEntityStatus();
        } else {
            const error = await response.json();
            alert('Erro ao vincular: ' + error.message);
        }
    } catch (error) {
        console.error('Erro ao vincular à entidade:', error);
        alert('Erro ao vincular à entidade');
    }
}

// Load linked entities
async function loadLinkedEntities() {
    try {
        const response = await fetch('/api/entidades/vinculadas');
        const entities = await response.json();
        
        const container = document.getElementById('linked-entities');
        container.innerHTML = '';
        
        if (entities.length === 0) {
            container.innerHTML = '<p>Você não está vinculado a nenhuma entidade.</p>';
            return;
        }
        
        entities.forEach(entity => {
            const entityDiv = document.createElement('div');
            entityDiv.className = 'linked-entity';
            entityDiv.innerHTML = `
                <span>${entity.nome} - ${entity.cargo}</span>
                <button class="remove-btn" onclick="unlinkFromEntity(${entity.id})">×</button>
            `;
            container.appendChild(entityDiv);
        });
    } catch (error) {
        console.error('Erro ao carregar entidades vinculadas:', error);
    }
}

// Unlink from entity
async function unlinkFromEntity(entityId) {
    if (!confirm('Tem certeza que deseja se desvincular desta entidade?')) {
        return;
    }
    
    try {
        const response = await fetch(`/api/entidades/desvincular/${entityId}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            alert('Desvinculação realizada com sucesso!');
            loadLinkedEntities();
            checkUserEntityStatus();
        } else {
            alert('Erro ao desvincular');
        }
    } catch (error) {
        console.error('Erro ao desvincular da entidade:', error);
        alert('Erro ao desvincular da entidade');
    }
}

// Check user entity status
async function checkUserEntityStatus() {
    try {
        const response = await fetch('/api/entidades/vinculadas');
        const entities = await response.json();
        
        const createBtn = document.getElementById('create-event-btn');
        const noEntityMessage = document.getElementById('no-entity-message');
        
        if (entities.length > 0) {
            createBtn.style.display = 'block';
            noEntityMessage.style.display = 'none';
        } else {
            createBtn.style.display = 'none';
            noEntityMessage.style.display = 'block';
        }
    } catch (error) {
        console.error('Erro ao verificar status de entidades:', error);
    }
}

