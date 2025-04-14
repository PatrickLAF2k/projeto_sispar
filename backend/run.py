# Importa a função `create_app` do módulo app, que cria e configura a aplicação Flask
from src.app import create_app

# Chama a função `create_app` para obter uma instância da aplicação Flask configurada
app = create_app()

# Verifica se esse arquivo está sendo executado diretamente (e não importado por outro)
if __name__ == '__main__':
    # Inicia o servidor Flask em modo de desenvolvimento (debug=True)
    # Isso permite recarregamento automático e mostra mensagens de erro detalhadas
    app.run(debug=True)
