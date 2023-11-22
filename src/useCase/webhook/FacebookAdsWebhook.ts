import { AwsNotificationRepository } from "@/repositories/AwsNotificationRepository";
import { MetaAdvertisingLibDeliveryByRegionRepository } from "@/repositories/MetaAdvertisingLibDeliveryByRegionRepository";
import { MetaAdvertisingLibRepository } from "@/repositories/MetaAdvertisingLibRepository";

interface FacebookAdsWebhookUseCaseRequest {
  records: {
    s3: {
      object: {
        key: string;
      };
    };
  }[];
}

interface FacebookAdsWebhookUseCaseResponse {}

export class FacebookAdsWebhookUseCase {
  constructor(
    private awsNotificationRepository: AwsNotificationRepository,
    private metaAdvertisingLibRepository: MetaAdvertisingLibRepository,
    private metaAdvertisingLibDeliveryByRegionRepository: MetaAdvertisingLibDeliveryByRegionRepository,
    private metaAdvertisingLibDemographicDistributionRepository: MetaAdvertisingLibDeliveryByRegionRepository
  ) {}

  async execute({
    records,
  }: FacebookAdsWebhookUseCaseRequest): Promise<FacebookAdsWebhookUseCaseResponse> {
    const { advertisingData, deliveryRegionData, demographicDistributionData } =
      await this.awsNotificationRepository.S3FacebookAdsNotification({
        records,
      });

    await this.metaAdvertisingLibRepository.createMany(advertisingData);
    await this.metaAdvertisingLibDeliveryByRegionRepository.createMany(
      deliveryRegionData
    );
    await this.metaAdvertisingLibDemographicDistributionRepository.createMany(
      demographicDistributionData
    );
    return { advertisingData, deliveryRegionData, demographicDistributionData };
  }
}