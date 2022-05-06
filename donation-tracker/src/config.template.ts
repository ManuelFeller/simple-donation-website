import { Campaign } from './types/campaign';

export default class PageConfiguration {
  /**
   * The URL to the published CSV export of the data (e.g. a Google Spreadsheet)
   *
   * Example Google Spreadsheet: https://docs.google.com/spreadsheets/d/e/[YOUR_PUBLISHED_FORM_URL]/pub?gid=[YOUR_GID]&single=true&output=csv
   */
  static DataSource: string = 'YOUR_LINK_HERE';
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
  static PageUrl: string = 'https://YOUR-WEBSITE.TLD';
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
  static pageTitle: string = 'YOUR-PAGE-TITLE';
  /**
   * The template for the page titles in the browser - will change the %s to the title of the currently loaded page
   */
  static titleTemplate: string = '%s · YOUR-PAGE-TITLE';
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
      Key: 'ongoing',
      Title: '??? for ???',
      ShortCampaignDescription: 'People at ??? need ??? help for ???!',
      TitleImage: '/media/campaignCardMedia.svg',
      ShortDonationDescription: 'To help ??? with ??? we need this',
      DetailsFile: './data/campaigns/ongoing.txt',
      UrlSlug: 'ongoing-campaign', // this will be used as URL to the campaigns detail page, so 'page-name' will become https://yoursite.tld/campaigns/page-name/
      Status: 'collecting', // 'collecting' or 'preparing' or 'transfer' or 'delivered' or 'closed'
      Photos: [],
      StartDate: new Date(2022, 3, 3), // please remember that JavaScript starts months from 0, so 0 = January and 11 = December!
      RegistrationFormUrl: 'https://YOUR-FORM-WEBSITE.TLD/FORMID',
    },
    {
      Key: 'finished',
      Title: '??? for ???',
      ShortCampaignDescription: 'People at ??? need ??? help for ???!',
      TitleImage: '/media/campaignCardMedia.svg',
      ShortDonationDescription: 'To help ??? with ??? we need this',
      DetailsFile: './data/campaigns/finished.txt',
      UrlSlug: 'finished-campaign', // this will be used as URL to the campaigns detail page, so 'page-name' will become https://yoursite.tld/campaigns/page-name/
      Status: 'delivered', // 'collecting' or 'preparing' or 'transfer' or 'delivered' or 'closed'
      Photos: [],
      StartDate: new Date(2022, 4, 1), // please remember that JavaScript starts months from 0, so 0 = January and 11 = December!
      RegistrationFormUrl: 'https://YOUR-FORM-WEBSITE.TLD/FORMID',
    },
  ];
}
