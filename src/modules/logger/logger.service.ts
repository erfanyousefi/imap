import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoggerEntity } from './entity/logger.entity';

@Injectable()
export class LoggerService {
  constructor(
    @InjectRepository(LoggerEntity)
    private readonly loggerRepository: Repository<LoggerEntity>,
  ) {}

  async log(log: LoggerEntity): Promise<void> {
    const logger = this.loggerRepository.create(log)
    await this.loggerRepository.save(logger);
  }
}