import sys
import cv2
import numpy as np
import onnxruntime as ort

def analyze_media(file_path):
    # Load ONNX model
    session = ort.InferenceSession("deepfake_model.onnx", providers=["CPUExecutionProvider"])

    # For simplicity: only checking first frame if video
    cap = cv2.VideoCapture(file_path)
    ret, frame = cap.read()
    if not ret:
        # Try image instead
        frame = cv2.imread(file_path)
        if frame is None:
            return "Invalid media file."

    frame_resized = cv2.resize(frame, (224, 224))
    frame_array = np.expand_dims(frame_resized.astype(np.float32) / 255.0, axis=0)
    frame_array = np.transpose(frame_array, (0, 3, 1, 2))

    # Run model
    inputs = {session.get_inputs()[0].name: frame_array}
    outputs = session.run(None, inputs)
    prediction = outputs[0][0][0]  # Assuming output is probability of realness

    if prediction > 0.5:
        return f"Real media detected ({prediction:.2f} confidence)"
    else:
        return f"Deepfake detected ({1 - prediction:.2f} confidence)"

if __name__ == "__main__":
    file_path = sys.argv[1]
    print(analyze_media(file_path))
