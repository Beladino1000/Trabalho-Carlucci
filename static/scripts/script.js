// Handle page transition overlay fade-in
document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.querySelector('.page-transition-overlay');
    if (overlay) {
        setTimeout(() => {
            overlay.classList.add('hidden');
        }, 50); // 50ms is sufficient
    }
});

// Função para alternar entre as páginas
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelector('.tab-btn.active').classList.remove('active');
        e.currentTarget.classList.add('active');
    });
});

// Função para alternar menu de contexto
function toggleContextMenu(btn) {
    const menu = btn.nextElementSibling;
    if (menu) {
        menu.classList.toggle('active');
    }
}

// Toggle the sidebar context menu (used by the nav 'Mais' button)
function toggleSidebarContextMenu() {
    const srcMenu = document.querySelector('.sidebar-left .context-menu .context-menu-items');
    const btn = document.querySelector('.sidebar-left .nav-more');
    if (!srcMenu || !btn) return;

    // If floating menu already exists, toggle it off
    let floating = document.getElementById('floating-context-menu');
    if (floating) {
        floating.remove();
        return;
    }

    // Create floating clone of the original nav so structure and classes are preserved
    floating = srcMenu.cloneNode(true);
    floating.id = 'floating-context-menu';
    // Ensure the CSS active class makes it visible
    floating.classList.add('active');
    // Minimal positioning styles; let stylesheet handle layout (display, padding, item styles)
    floating.style.position = 'fixed';
    floating.style.zIndex = 10000;
    // ensure it has a sensible min width based on the source menu or button
    const srcWidth = srcMenu.offsetWidth || 200;
    floating.style.minWidth = srcWidth + 'px';
    document.body.appendChild(floating);

    // Fallback: if clone has no visible children (edge cases), copy innerHTML and ensure spacing
    if (!floating.children || floating.children.length === 0) {
        floating.innerHTML = srcMenu.innerHTML;
        floating.style.padding = getComputedStyle(srcMenu).padding || '8px 0';
        floating.style.background = getComputedStyle(srcMenu).backgroundColor || '';
    }

    // If still no menu items, build the two default items so the menu is usable
    const items = floating.querySelectorAll('.context-menu-item');
    if (!items || items.length === 0) {
        // build Listas item
        const listas = document.createElement('a');
        listas.className = 'context-menu-item';
        listas.href = 'lists.html';
        listas.innerHTML = '<i class="fas fa-list"></i><span>Listas</span>';
        // build Configurações item
        const settings = document.createElement('a');
        settings.className = 'context-menu-item';
        settings.href = 'settings.html';
        settings.innerHTML = '<i class="fas fa-cog"></i><span>Configurações</span>';
        // append
        floating.appendChild(listas);
        floating.appendChild(settings);
    }

    // Measure and position
    const btnRect = btn.getBoundingClientRect();
    const menuRect = floating.getBoundingClientRect();
    let left = btnRect.left + btnRect.width / 2;
    let top = btnRect.top - 8; // try above
    let transform = 'translate(-50%, -100%)';
    if (top - menuRect.height < 8) {
        top = btnRect.bottom + 8; // place below
        transform = 'translate(-50%, 0)';
    }
    floating.style.left = left + 'px';
    floating.style.top = top + 'px';
    floating.style.transform = transform;
}

// Fechar menu de contexto ao clicar fora
document.addEventListener('click', (e) => {
    // Ignore clicks on the context-menu itself or the sidebar "Mais" button
    if (!e.target.closest('.context-menu') && !e.target.closest('.nav-more') && !e.target.closest('.context-menu-btn') && !e.target.closest('#floating-context-menu')) {
        document.querySelectorAll('.context-menu-items').forEach(menu => {
            if (menu.id === 'floating-context-menu') {
                menu.remove();
            } else {
                menu.classList.remove('active');
            }
        });
    }
});

// Ativar/desativar botão Postar baseado no conteúdo
const textarea = document.querySelector('.composer-content textarea');
const postBtn = document.querySelector('.composer-footer .btn-primary');

if (textarea && postBtn) {
    textarea.addEventListener('input', () => {
        postBtn.disabled = textarea.value.trim() === '';
    });
}

// Carregar posts (simulação)
function loadPosts(page) {
    const feed = document.querySelector('.posts-feed');
    if (!feed) return;
    
    // Limpar feed existente
    feed.innerHTML = '';
    
    // Simular carregamento de posts diferentes para cada página
    const posts = page === 'following' ? [
        {
            author: "Pessoa que você segue",
            handle: "@seguindo",
            time: "2h",
            text: "Este é um post de alguém que você segue!",
            comments: "5",
            retweets: "12",
            likes: "45"
        }
    ] : [
        {
            author: "Post Recomendado",
            handle: "@recomendado",
            time: "3h",
            text: "Este é um post recomendado para você!",
            comments: "8",
            retweets: "15",
            likes: "62"
        }
    ];
    
    // Adicionar posts ao feed
    posts.forEach(post => {
        const postEl = document.createElement('div');
        postEl.className = 'post';
        postEl.innerHTML = `
            <img src="assets/profile-pic.jpg" alt="Perfil" class="profile-pic">
            <div class="post-content">
                <div class="post-header">
                    <span class="post-author">${post.author}</span>
                    <span class="post-handle">${post.handle} · ${post.time}</span>
                    <i class="fas fa-ellipsis-h"></i>
                </div>
                <p class="post-text">${post.text}</p>
                <div class="post-actions">
                    <span><i class="far fa-comment"></i> ${post.comments}</span>
                    <span><i class="fas fa-retweet"></i> ${post.retweets}</span>
                    <span><i class="far fa-heart"></i> ${post.likes}</span>
                    <span><i class="fas fa-share"></i></span>
                </div>
            </div>
        `;
        feed.appendChild(postEl);
    });
}

// Carregar posts baseado na página atual
document.addEventListener('DOMContentLoaded', () => {
    const isFollowingPage = window.location.pathname.includes('following.html');
    loadPosts(isFollowingPage ? 'following' : 'for-you');
});