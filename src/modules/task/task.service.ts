import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression, SchedulerRegistry } from "@nestjs/schedule";

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
    constructor(private schedulerRegistry: SchedulerRegistry){}
  @Cron(CronExpression.EVERY_MINUTE)
  readMails() {
    this.logger.debug('Called every 30 seconds');
  }
  stopCronJob() {
    const job = this.schedulerRegistry.getCronJob('messaging');

    job.stop();
    console.log(job.lastDate());
}
}