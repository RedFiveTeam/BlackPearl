import { ProfileStore } from '../../../profile/ProfileStore';
import { MetricRepository } from './MetricRepository';
import { Stores } from '../../../utils/Stores';
import { Repositories } from '../../../utils/Repositories';
import { MetricModel } from './MetricModel';
import * as moment from 'moment';
import { action } from 'mobx';
import { ProfileRepository } from '../../../profile/ProfileRepository';

export class MetricActions {
  private profileStore: ProfileStore;
  private profileRepository: ProfileRepository;
  private metricRepository: MetricRepository;

  constructor(stores: Partial<Stores>, repositories: Partial<Repositories>) {
    this.profileStore = stores.profileStore!;
    this.profileRepository = repositories.profileRepository!;
    this.metricRepository = repositories.metricRepository!;
  }

  @action.bound
  async logMetric(actionEnum: number, context: string) {
    if (!this.profileStore!.profile) {
      let profile = await this.profileRepository.getProfile();
      this.profileStore.setProfile(profile);
    }
    const metric = new MetricModel(
      null,
      this.profileStore.profile.id!,
      this.profileStore.profile.cardID,
      moment().unix(),
      actionEnum,
      context
    );
    await this.metricRepository.logMetric(metric);
  }
}
