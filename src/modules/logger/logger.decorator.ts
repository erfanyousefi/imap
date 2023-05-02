import { LoggerEntity } from "src/modules/logger/entity/logger.entity";
import { Logger } from '@nestjs/common';
import { createRepository } from "src/common/utils/typeorm.util";

export function LoggerMethod(): MethodDecorator {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
      const originalMethod = descriptor.value;
      const logger = new Logger()
      descriptor.value = async function (...args: any[]) {
        const log: any = {}
        log.method = `${target.constructor.name}.${propertyKey}`;
        log.arguments = JSON.stringify(args);
        log.timestamp = new Date();
        try {
          const result = await originalMethod.apply(this, args);
          log.result = JSON.stringify(result);
          log.status = 'success';
          return result;
        } catch (error) {
          log.error = JSON.stringify(error);
          log.status = 'error';
          throw error;
        } finally {
          logger.log(`[${log.method}] ${log.status}`, log.error || log.result);
          const repository = await createRepository()
          await repository.createQueryBuilder(LoggerEntity,"logger").insert().into(LoggerEntity).values(log).execute()
        }
      };
      return descriptor;
    };
  }