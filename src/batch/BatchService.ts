import {Runnable} from "../schedule/schedule.common";

export class BatchService implements Runnable {
  run() {
    console.log('hi')
  }
}