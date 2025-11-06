import webview
from flask import Flask, render_template

app = Flask(__name__)

# --- Rotas para servir cada página HTML ---

@app.route('/')
@app.route('/index.html')  # Adicionada rota para o arquivo exato
def home():
    """Serve a página principal (index.html)"""
    return render_template('index.html')

@app.route('/following.html')  # Rota atualizada
def following():
    """Serve a página 'Following' (following.html)"""
    return render_template('following.html')

@app.route('/explore.html')  # Rota atualizada
def explore():
    """Serve a página 'Explorar' (explore.html)"""
    return render_template('explore.html')

@app.route('/notifications.html')  # Rota atualizada
def notifications():
    """Serve a página 'Notificações' (notifications.html)"""
    return render_template('notifications.html')

@app.route('/messages.html')  # Rota atualizada
def messages():
    """Serve a página 'Mensagens' (messages.html)"""
    return render_template('messages.html')

@app.route('/bookmarks.html')  # Rota atualizada
def bookmarks():
    """Serve a página 'Itens Salvos' (bookmarks.html)"""
    return render_template('bookmarks.html')

@app.route('/lists.html')  # Rota atualizada
def lists():
    """Serve a página 'Listas' (lists.html)"""
    return render_template('lists.html')

@app.route('/profile.html')  # Rota atualizada
def profile():
    """Serve a página 'Perfil' (profile.html)"""
    return render_template('profile.html')

# --- Novas Rotas ---
@app.route('/auth.html')
def auth():
    """Serve a página de autenticação (auth.html)"""
    return render_template('auth.html')

@app.route('/settings.html')
def settings():
    """Serve a página de configurações (settings.html)"""
    return render_template('settings.html')

# --- Funções para PyWebview e Servidor ---

def run_pywebview():
    """Função para iniciar o PyWebview"""
    window = webview.create_window(
        'Meu App Híbrido Flask',
        app,
        fullscreen=True
    )
    webview.start()

if __name__ == '__main__':
    # Para rodar com PyWebview, descomente a linha abaixo:
    run_pywebview()
    # Para rodar como um servidor web padrão (para Vercel ou teste local):
    # app.run(debug=True)