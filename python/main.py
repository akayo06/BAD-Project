# Download these libraries first:
# pip install fastapi
# pip install "uvicorn[standard]"
# pip install python-multipart
# pip install opencv-python

# Start server with:
# uvicorn main:app --reload

from ultralytics import YOLO
from fastapi import FastAPI, File, Form, UploadFile
from fastapi.responses import FileResponse
from pydantic import BaseModel

import uuid
import os
import cv2


# Create folder for saving upload and predict result
upload_path = "./uploads"
os.makedirs(upload_path) if not os.path.exists(upload_path) else None

predict_path = "./predict"
os.makedirs(predict_path) if not os.path.exists(predict_path) else None

model = YOLO('./best.pt') # Your model path
app = FastAPI()

@app.get("/")
def read_root():
    return {
        "Hello": "World",
        "name": 123
    }

@app.post("/files/")
async def create_file(
    file: UploadFile = File(), name: str = Form()
):
    # Upload file path
    file_path = os.path.join(upload_path, file.filename)

    try:
        contents = file.file.read()
        with open(file_path, 'wb') as f:
            f.write(contents)
        file.file.close()

        res = model(file_path) # Predict images
        res_plotted = res[0].plot() # Write result to images array

        predict_img = os.path.join(predict_path, str(uuid.uuid4()) + ".png") # Specific predict image location
        cv2.imwrite(predict_img, res_plotted) # Write to OS

        return FileResponse(predict_img) # Return the result as file
    except Exception:
        return {
            "status" : False,
            "message": "There was an error in the server, please try again."
        }
    
    
