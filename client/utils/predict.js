import { getImageTensorFromPath } from "./imageHelper";
import { runYoloModel } from "./modelHelper";

export async function inferenceYolo(path) {
  // 1. Convert image to tensor
  const imageTensor = await getImageTensorFromPath(path);
  // 2. Run model
  const [predictions, inferenceTime] = await runYoloModel(imageTensor);
  // 3. Return predictions and the amount of time it took to inference.
  return [predictions, inferenceTime];
}
