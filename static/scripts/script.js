// Função para alternar entre as páginas
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelector('.tab-btn.active').classList.remove('active');
        e.currentTarget.classList.add('active');
    });
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