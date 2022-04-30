export default class PageConfiguration {
	/**
	 * The URL to the published CSV export of the data (e.g. a Google Spreadsheet)
	 */
	static DataSource: string = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQM_VX8StPqet3KBtHzyLVSzqgC8jP2VgcK97Fs_UTI1thN2-za-MHSAc9bizcVMebIEhDf-0Di8arH/pub?gid=919395952&single=true&output=csv';
	/**
	 * The maximum age of the locally cached data before it gets refreshed
	 */
	static MaxDataAgeInMinutes: number = 5;
	/**
	 * Option to turn logging to the browser console on or off
	 */
	static LogToConsole: boolean = true;
	/**
	 * Decide if the data should be refreshed automatically or only on explicit user interaction
	 */
	static AutoRefresh: boolean = true;

	static ImprintContact = {
		NameOfResponsible: 'Firstname Lastname',
		AddressLine1: 'Gateway 10',
		AddressLine2: '',
		ZipCode: '12345',
		City: ' Argon City',
		PhoneNumber: '+123456789',
		ContactEmail: 'website@domain.tld',
		PrivacyEmail: 'privacy@domain.tld',
	}

	static CampaignDetails = [
		{
			Title: 'Civilian Help 1',
			TitleImage: '',
			DetailsFile: './src/campaigns/cvh1.txt',
			Key: 'civilian',
			UrlSlug: 'civilian-help-1',
			Status: 'collecting / sammeln',
			Photos: [],
			StartDate: new Date(2022, 4, 1),
			RegistrationFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSd1cvk-HVWsq4pZ9Aiu2wF8y3_AKMNosmwDZEGk1qcie-Ccmg/viewform'
		}
	];
}