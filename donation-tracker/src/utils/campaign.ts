import { Campaign } from '../types/campaign';

export const getCampaignTitle = (campaign: Campaign, currentLanguage: string) => getCampaignText(campaign, currentLanguage, 'Title');
export const getCampaignShortCampaignDescription = (campaign: Campaign, currentLanguage: string) =>
  getCampaignText(campaign, currentLanguage, 'ShortCampaignDescription');
export const getCampaignShortDonationDescription = (campaign: Campaign, currentLanguage: string) =>
  getCampaignText(campaign, currentLanguage, 'ShortDonationDescription');

type ValueOf<T> = T[keyof T];

const getCampaignText = (campaign: Campaign, currentLanguage: string, textKey: keyof ValueOf<Required<Campaign>['Languages']>) =>
  currentLanguage && campaign.Languages && campaign.Languages[currentLanguage][textKey]
    ? campaign.Languages[currentLanguage][textKey]
    : campaign[textKey];
