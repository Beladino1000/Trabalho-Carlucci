document.addEventListener('DOMContentLoaded', function() {
    // Alternar entre categorias
    const categoryBtns = document.querySelectorAll('.category-btn');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Aqui você pode adicionar lógica para carregar conteúdo diferente
            // baseado na categoria selecionada
        });
    });

    // Carregar mais conteúdo quando rolar até o final
    window.addEventListener('scroll', function() {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
            // Simular carregamento de mais conteúdo
            console.log('Carregar mais conteúdo...');
            // Na implementação real, você faria uma requisição AJAX aqui
        }
    });
});