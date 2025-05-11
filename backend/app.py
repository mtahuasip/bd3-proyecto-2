from src import create_app

app = create_app()

if __name__ == "__main__":
    from src.config import Config

    app.run(port=Config.PORT, debug=Config.DEBUG)
