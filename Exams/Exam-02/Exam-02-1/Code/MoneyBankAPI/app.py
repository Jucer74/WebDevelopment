from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from Routes.accountRoute import router as AccountRouter
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

origins = ["https://localhost:8000", "http://localhost:8000"]


# exception handler <- mas bien printer de errores :D
@app.exception_handler(HTTPException)
async def http_exception_handler(request, exception):
    return JSONResponse(status_code=exception.status_code, content={"error_detail": exception.detail})

# pero no funciona :(

# middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
    allow_credentials=True
)

app.include_router(AccountRouter, tags=["Accounts"], prefix="/api/v1")

# Root path
@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Welcome to MoneyBank API, please go to /docs to see the documentation and try the API :)"}


##  init
# uvicorn app:app --reload
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)