import { Campaign } from './types/campaign';

export default class PageConfiguration {
  /**
   * The URL to the published CSV export of the data (e.g. a Google Spreadsheet)
   */
  static DataSource: string =
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vQM_VX8StPqet3KBtHzyLVSzqgC8jP2VgcK97Fs_UTI1thN2-za-MHSAc9bizcVMebIEhDf-0Di8arH/pub?gid=919395952&single=true&output=csv';
  /**
   * The maximum age of the locally cached data before it gets refreshed
   */
  static MaxDataAgeInMinutes: number = 5;
  /**
   * Option to turn logging to the browser console on or off
   */
  static LogToConsole: boolean = true;
  /**
   * Decide if the data should be refreshed automatically or only on explicit user interaction (keep on true for now, manual refresh needs to be implemented)
   */
  static AutoRefresh: boolean = true;
  /**
   * The URL for the page - NO trailing / allowed
   */
  static PageUrl: string = 'https://helpukraine.ingelheim.mobi';
  /**
   * Image used as default one for social cards when sharing.
   * Use path from server root (e.g. '/yourFileInTheStaticFolder.jpg') - place it in the 'donation-website/static/' folder of this project.
   * Sub-folders are possible, remember to add them to the path in that case
   */
  static defaultPageSocialCardImage: string = '/media/tim-mossholder-BQa--UCtFqg-unsplash_1200.jpg';
  /**
   * The default description used in the page metadata on pages that do not override it (e.g. the Imprint)
   */
  static defaultDescription: string = 'Collecting needed things for the people in Ukraine.';
  /**
   * File to generate the icons for the page from - for best results use a square image and make sure it has 1024 x 1024 pixels or more.
   * Image should be located in 'src/images/' (e.g. 'src/images/yourIconTemplate.jpg'), and that part of the path needs to be part of the configuration
   */
  static pageIconFile: string = 'src/images/tim-mossholder-BQa--UCtFqg-unsplash.jpg';
  /**
   * The title for a page - default fallback if a page does not provide it's own title
   */
  static pageTitle: string = '#StandWithUkraine';
  /**
   * The template for the page titles in the browser - will change the %s to the title of the currently loaded page
   */
  static titleTemplate: string = '%s · #StandWithUkraine'
  /**
   * The contact details that are used in the imprint
   */
  static ImprintContact = {
    NameOfResponsible: 'Firstname Lastname',
    AddressLine1: 'Gateway 10',
    AddressLine2: '',
    ZipCode: '12345',
    City: ' Argon City',
    PhoneNumber: '+123456789',
    ContactEmail: 'website@domain.tld',
    PrivacyEmail: 'privacy@domain.tld',
  };
  /**
   * The configuration for the campaign(s) that are shown on the generated website
   */
  static CampaignDetails: Campaign[] = [
    {
      Key: 'civilian',
      Title: 'Civilian Help 1',
			ShortCampaignDescription: 'Many people had to run away from the war in Ukraine and move to another city where is safe, and need help.',
      TitleImage: '/media/campaignCardMedia.svg',
			ShortDonationDescription: 'Here you can find the list of items that are the most urgent for the refugees within Ukraine.',
      DetailsFile: './src/campaigns/cvh1.txt',
      UrlSlug: 'civilian-help-1',
      Status: 'collecting',
      Photos: [],
      StartDate: new Date(2022, 4, 3),
      RegistrationFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSd1cvk-HVWsq4pZ9Aiu2wF8y3_AKMNosmwDZEGk1qcie-Ccmg/viewform',
    },
    {
      Key: 'medication',
      Title: 'Medical Help 1',
			ShortCampaignDescription: 'Many people had to run away from the war in Ukraine and move to another city where is safe, and need help.',
      TitleImage: '/media/campaignCardMedia.svg',
      ShortDonationDescription: 'Here you can find the list of items that are the most urgent for the refugees within Ukraine.',
      DetailsFile: './src/campaigns/cvh1.txt',
      UrlSlug: 'medical-help-1',
      Status: 'collecting',
      Photos: [],
      StartDate: new Date(2022, 4, 2),
      RegistrationFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSd1cvk-HVWsq4pZ9Aiu2wF8y3_AKMNosmwDZEGk1qcie-Ccmg/viewform',
    },
		{
      Key: 'army',
      Title: 'Medical Help 2',
			ShortCampaignDescription: 'Many people had to run away from the war in Ukraine and move to another city where is safe, and need help.',
      TitleImage: '/media/campaignCardMedia.svg',
      ShortDonationDescription: 'Here you can find the list of items that are the most urgent for the refugees within Ukraine.',
      DetailsFile: './src/campaigns/cvh1.txt',
      UrlSlug: 'medical-help-2',
      Status: 'collecting',
      Photos: [],
      StartDate: new Date(2022, 4, 1),
      RegistrationFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSd1cvk-HVWsq4pZ9Aiu2wF8y3_AKMNosmwDZEGk1qcie-Ccmg/viewform',
    },
  ];
}
