from ultralytics import YOLO

model = YOLO("yolov8n.pt")
results = model(["https://ultralytics.com/images/bus.jpg"])[0]

classes: dict[int, str] = results.names
result_predict = [ {"classes": classes[v], "conf": results.boxes.conf.numpy()[i]} for i, v in enumerate(results.boxes.cls.numpy())]
print(result_predict)

# [{'classes': 'bus', 'conf': 0.8705451}, {'classes': 'person', 'conf': 0.8689803}, {'classes': 'person', 'conf': 0.85360384}, And more ...]
