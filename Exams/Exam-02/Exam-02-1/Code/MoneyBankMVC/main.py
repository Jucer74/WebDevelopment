from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def root():
    return "HI I AM FAST API"