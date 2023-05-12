from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import cv2

# from yolo.models import Model
# import torch
# device = torch.device("cpu")
# model = torch.load('./best.pt', map_location=device)
# model = model.get('ema')
# hub_model = Model(model.yaml).to(next(model.parameters()).device)  # create
# hub_model.load_state_dict(model.float().state_dict())  # load state_dict
# hub_model.names = model.names  # class names
# model = hub_model.to(device)

from ultralytics import YOLO
model = YOLO('./best.pt') # Your model patH

# results = model('C:\\Users\\pty10\\workspace\\BAD_Project_Food\\express\\uploads\\d53600e5cfe07b9ac42974000.jpg')
# print(results)



class Task(BaseModel):
    in_file_path: str
    out_file_path: str


app = FastAPI()


@app.post("/predict")
async def predict_task(task: Task):
    try:
        print('predict task:', task)
        results = model(task.in_file_path)
        # print('predict result:',results)
        boxes = []
        for result in results:
            img = result.plot()
            cv2.imwrite(task.out_file_path, img)
            for i in range(len(result.boxes)):
                boxes.append({
                    "confident": float(result.boxes.conf[i]),
                    "label": result.names[int(result.boxes.cls[i])]
                })
        return {'boxes': boxes}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))
