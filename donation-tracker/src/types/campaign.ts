export interface Campaign {
  Key: string;
  CampaignType: 'civilianSupport' | 'medicalSupport' | 'civilianProtection' | 'financialSupport' | 'generalSupport' | 'volunteering';
  Title?: string;
  ShortCampaignDescription?: string;
  ShortDonationDescription?: string;
  TitleImage?: string;
  DetailsFile?: string;
  UrlSlug?: string;
  Status: 'collecting' | 'preparing' | 'transfer' | 'delivered' | 'closed';
  Photos: any[];
  StartDate: Date;
  CollectionEndDate?: Date;
  RegistrationFormUrl?: string;
  Languages?: { [languageKey: string]: { Title: string; ShortCampaignDescription?: string; ShortDonationDescription?: string } };
}
