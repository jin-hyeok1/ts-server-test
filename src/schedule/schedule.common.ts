import {BatchService} from "../batch/BatchService";

const serviceMap: Map<string, { new(): Runnable }> = new Map();
serviceMap.set('material', BatchService);
serviceMap.set('master', BatchService);
export {serviceMap};


export class Scheduler {
  constructor({task, delay = 0, interval, timeUnit, totalCount}: {
    task: Runnable,
    delay: number,
    interval: number,
    timeUnit: TimeUnit,
    totalCount: number
  }) {
    this.task = task;
    this.delay = delay;
    this.timeUnit = timeUnit;
    this.serviceName = task.constructor.name
    this.interval = interval;
    this.totalCount = totalCount
    this.execCount = 0;
    this.isDone = false
  }

  private timeoutId: NodeJS.Timeout | null = null;
  task: Runnable
  delay: number
  interval: number
  timeUnit: TimeUnit
  totalCount: number
  execCount: number
  isDone: boolean
  serviceName: string

  cancel() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId); // 스케줄이 실행 중이면 타이머 취소
    }
    this.isDone = true;
  }

  execute() {
    if (this.isDone) return;

    if (this.execCount >= this.totalCount) {
      this.isDone = true;
      return;
    }

    const delayTime = this.execCount === 0 ? this.delay : this.interval;
    const delayInMs = getMilliSecond(delayTime, this.timeUnit); // getMilliSecond에서 밀리초로 변환

    // setTimeout을 사용해 task 실행
    this.timeoutId = setTimeout(() => {
      this.task.run();
      this.execCount++;
      this.execute(); // 재귀 호출로 계속 실행
    }, delayInMs);
  }
}

export interface Runnable {
  run(): void
}

export enum TimeUnit {
  DAY = "Day",
  HOUR = "Hour",
  MINUTE = "Minute",
  SECOND = "Second",
  MILLI_SECOND = "Millisecond"
}

export function getMilliSecond(time: number, timeUnit: TimeUnit) {
  switch (timeUnit) {
    case TimeUnit.DAY:
      return time * 24 * 60 * 60 * 1000;
    case TimeUnit.HOUR:
      return time * 60 * 60 * 1000;
    case TimeUnit.MINUTE:
      return time * 60 * 1000;
    case TimeUnit.SECOND:
      return time * 1000;
    case TimeUnit.MILLI_SECOND:
      return time;
  }
}