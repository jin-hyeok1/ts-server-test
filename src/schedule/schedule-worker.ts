import {parentPort, workerData} from 'worker_threads'

const {runnable} = workerData;
parentPort.postMessage(runnable)
runnable.run();