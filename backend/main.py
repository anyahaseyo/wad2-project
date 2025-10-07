from firebase_functions import https_fn
from firebase_admin import initialize_app


def main():
    initialize_app()


@https_fn.on_request()
def hello_world(req: https_fn.Request) -> https_fn.Response:
    return https_fn.Response("Hello World")


if __name__ == "__main__":
    main()
