import { parentPort, workerData } from 'worker_threads';

function main(jobData) {
  // Demo: jobData is a number, return jobData + 1
  return { result: (jobData.value || 0) + 1, original: jobData };
}

parentPort.postMessage(main(workerData));
