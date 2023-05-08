from ultralytics import YOLO

model = YOLO("yolov8m_custom.pt")

model.predict(source="train.mp4", show=True, save=True, conf=0.5, save_txt = True, save_conf = True, save_crop = True)