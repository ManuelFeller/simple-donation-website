export interface Campaign {
  Key: string;
  Title: string;
  ShortCampainDescription?: string,
  TitleImage: string;
  ShortDonationDescription?: string,
  DetailsFile: string;
  UrlSlug: string;
  Status: 'collecting' | 'preparing' | 'transfer' | 'delivered' | 'closed';
  Photos: any[];
  StartDate: Date;
  RegistrationFormUrl: string;
}
