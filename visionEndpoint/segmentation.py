import torch
from PIL import Image
import io
from ultralytics import YOLO

def get_yolov8_model():
    # Load the YOLOv8 model
    model = YOLO('./model/yolov8s.pt')  # Replace with your desired model
    return model

def get_image_from_bytes(binary_image, max_size=640):
    input_image = Image.open(io.BytesIO(binary_image)).convert("RGB")
    width, height = input_image.size
    resize_factor = min(max_size / width, max_size / height)
    resized_image = input_image.resize(
        (int(input_image.width * resize_factor), int(input_image.height * resize_factor))
    )
    return resized_image