import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PerformerRepository } from './performer.repository';
import { Performer } from './schemas';
import { CreatePerformerDto } from './dto';

@Injectable()
export class PerformerService {
  constructor(private readonly performerRepository: PerformerRepository) {}

  async createPerformer(payload: CreatePerformerDto): Promise<Performer> {
    return this.performerRepository.create({
      ...payload,
      id: randomUUID(),
    });
  }

  async updatePerformer(
    id: string,
    payload: CreatePerformerDto,
  ): Promise<Performer> {
    return this.performerRepository.findOneAndUpdate({ id }, payload);
  }

  async getPerformerById(id: string): Promise<Performer> {
    return this.performerRepository.findOne({ id });
  }
}
