from typing import Union

from fastapi import FastAPI
from pydantic import BaseModel


class Task(BaseModel):
    file_name: str



app = FastAPI()


@app.post("/predict")
async def predict_task(task: Task):
    return task