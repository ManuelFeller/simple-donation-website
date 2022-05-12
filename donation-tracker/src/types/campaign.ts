export interface Campaign {
  Key: string;
  Title: string;
  CampaignType: 'civilianSupport' | 'medicalSupport' | 'civilianProtection' | 'financialSupport' | 'generalSupport' | 'volunteering';
  ShortCampaignDescription?: string;
  TitleImage?: string;
  ShortDonationDescription?: string;
  DetailsFile?: string;
  UrlSlug?: string;
  Status: 'collecting' | 'preparing' | 'transfer' | 'delivered' | 'closed';
  Photos: any[];
  StartDate: Date;
  CollectionEndDate?: Date;
  RegistrationFormUrl?: string;
  Languages?: { [languageKey: string]: Pick<Campaign, 'Title' | 'ShortCampaignDescription' | 'ShortDonationDescription'> };
}
