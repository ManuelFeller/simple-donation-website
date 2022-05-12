import PageConfiguration from '../config';
import { ColumnMapping } from '../types/columnMapping';
import { DonationItem } from '../types/donationItem';
import { DonationList } from '../types/donationList';

/**
 * Class representing the dynamically loaded data (the number if items donated and still needed per donation campaign)
 */
export default class DataStore {
  private dataVersion = 1;

  private static instance: DataStore;

  private dataSourceUrl = PageConfiguration.DataSource;
  private maxDataAgeInMinutes = PageConfiguration.MaxDataAgeInMinutes;
  private hasLocalData: boolean;
  private isRefreshing: boolean;
  private localData: DonationList | null;
  private updateSubscribers: Array<Function>;
  private isGatsbyBuild: boolean;

  /**
   * DO NOT USE EXTERNALLY! Use DataStore.getInstance() instead!
   * Creates an instance and also try to load / update the local data if needed
   */
  private constructor() {
    this.debugLog('DataStore: Creating instance, initializing internal variables');
    this.updateSubscribers = new Array<Function>();
    this.isRefreshing = false;
    this.localData = null;
    this.hasLocalData = false;
    this.debugLog('DataStore: trying to read local storage data');
    let tmpData = null;
    if (typeof localStorage === 'undefined') {
      this.isGatsbyBuild = true;
      tmpData = JSON.stringify({
        version: this.dataVersion,
        timeStamp: '2025-01-01T01:23:45.678Z',
        requestTime: '2025-01-01T01:23:45.678Z',
        data: [
          {
            article: { en: 'Backpack 50-70 lt', de: 'Rucksack 50-70 l' },
            campaignKey: 'demo',
            neededOverall: 10,
            alreadyDonated: 6,
            remainingNeed: 4,
            unit: { en: 'pcs', de: 'Stk' },
            formLink: { en: 'https://google.com', de: 'https://google.de' },
          },
        ],
      });
    } else {
      this.isGatsbyBuild = false;
      tmpData = localStorage.getItem('donationCache');
    }
    this.processInitialLocalData(tmpData);
  }

  /**
   * Get the instance of the data store that can be used.
   * (Using Singleton Pattern to avoid overlapping refreshes)
   * @returns The instance to use for data access
   */
  static getInstance(): DataStore {
    if (!DataStore.instance) {
      DataStore.instance = new DataStore();
    }
    return DataStore.instance;
  }

  /**
   * Register for data change notification - please do not forget to unsubscribe if a component unmounts, so please do NOT use anonymous functions!
   * @param callback Callback function - needs to have have one Date parameter that get the timestamp of the last request
   */
  public subscribeToDataUpdates(callback: Function) {
    if (this.updateSubscribers.indexOf(callback) === -1) {
      this.debugLog('DataStore: Adding callback to internal list');
      this.updateSubscribers.push(callback);
    } else {
      this.debugLog('DataStore: Callback already registered, skipping adding');
    }
  }

  /**
   * Unregister from data change notifications - please do not forget tu unsubscribe if a component unmounts
   * @param callback Callback function that was passed during subscribing
   */
  public unsubscribeFromDataUpdates(callback: Function) {
    const currentIndex = this.updateSubscribers.indexOf(callback);
    if (currentIndex !== -1) {
      this.debugLog('DataStore: Removing callback from list');
      this.updateSubscribers.splice(currentIndex, 1);
    }
  }

  /**
   * Get all items (unfiltered)
   * @returns The list of items
   */
  public getAllItems(): Array<DonationItem> {
    return this.hasLocalData ? this.localData!.data : [];
  }

  /**
   * Get items filtered for a campaign
   * @param campaignKey The campaign key
   * @returns The list of items that belong to the campaign
   */
  public getItemsForCampaign(campaignKey: string): Array<DonationItem> {
    return this.getAllItems().filter(item => item.campaignKey === campaignKey);
  }

  /**
   * Get the time when the data was last changed in the CSV source
   * @returns Date object
   */
  public getLastDataUpdateTime() {
    if (this.localData === null) {
      return new Date(1970, 1, 1);
    } else {
      return this.localData?.timeStamp;
    }
  }

  /**
   * Get the time when the data was checked on the server
   * @returns Date object
   */
  public getLastDataLoadingTime() {
    return this.localData?.requestTime;
  }

  /**
   * Function to trigger a refresh (if data is already expired)
   */
  public triggerRefresh() {
    if (this.isDataOutdated()) {
      this.refreshData();
    }
  }

  /**
   * Function to check if a refresh is already possible
   * @returns A boolean information if a refresh trigger will execute or not
   */
  public canRefreshAlready() {
    return this.isDataOutdated();
  }

  /**
   * Function to check in how many seconds the next data refresh can / will be performed
   * @returns The number of seconds until the next data refresh - or undefined if it can not be calculated
   */
  public getSecondsUntilRefresh(): number | undefined {
    if (this.isRefreshing) {
      return 0;
    } else {
      if (this.localData === null) {
        return undefined;
      } else {
        const time = 1000 * 60 * this.maxDataAgeInMinutes;
        const newUpdateTime = new Date(this.localData.requestTime).getTime() + time;
        let remainingSeconds = Math.round((newUpdateTime - Date.now()) / 1000);
        if (remainingSeconds < 0) {
          remainingSeconds = 0;
        }
        return remainingSeconds;
      }
    }
  }

  /**
   * Internal function to process data that was found in the local storage
   * @param tmpData the temporary data string from the local storage
   */
  private processInitialLocalData(tmpData: string | null) {
    if (tmpData !== null) {
      this.debugLog('DataStore: Local data found, loading into memory');
      this.localData = JSON.parse(tmpData);

      if (!this.isLocalDataVersionOk()) {
        this.initWithEmptyLocalData('DataStore: Local data version outdated, querying online source scheduled');
        return;
      }
      // manually fix the date objects -> JSON.parse() does not do that as expected
      const requestDateValueExtracted: string = this.localData!.requestTime.toString();
      this.localData!.requestTime = new Date(requestDateValueExtracted);
      const updateDateValueExtracted: string = this.localData!.timeStamp.toString();
      this.localData!.timeStamp = new Date(updateDateValueExtracted);

      this.hasLocalData = true;
      if (this.isDataOutdated()) {
        this.debugLog('DataStore: Local data outdated, querying online source scheduled');
        if (!this.isGatsbyBuild) setTimeout(this.refreshData.bind(this), 100);
      } else {
        if (!this.isGatsbyBuild) this.registerDataUpdate();
      }
    } else {
      this.initWithEmptyLocalData('DataStore: No local data found, querying online source scheduled');
    }
  }

  /**
   * Internal function to check if the expected data version of the code matches the data version found locally
   * @returns true if version matches with code, false if not
   */
  private isLocalDataVersionOk() {
    this.debugLog('DataStore: Data Version Check');
    if (typeof this.localData!.version === 'undefined') {
      // missing version field = outdated
      return false;
    } else {
      if (this.localData!.version !== this.dataVersion) {
        // version mismatch = outdated
        return false;
      }
    }
    return true;
  }

  /**
   * Internal function to end class init with no local data
   * @param logMessage Message that should be logged as reason
   */
  private initWithEmptyLocalData(logMessage: string) {
    this.debugLog(logMessage);
    this.localData = null;
    this.hasLocalData = false;
    if (!this.isGatsbyBuild) setTimeout(this.refreshData.bind(this), 100);
  }

  /**
   * Internal function to register the next data update
   */
  private registerDataUpdate() {
    if (PageConfiguration.AutoRefresh) {
      let secondsUntilRefresh = this.getSecondsUntilRefresh();
      if (secondsUntilRefresh == undefined) {
        // use default refresh time if it can not be calculated
        secondsUntilRefresh = 1000 * 60 * this.maxDataAgeInMinutes;
      }
      this.debugLog(`DataStore: Registering next data refresh to execute in ${secondsUntilRefresh} seconds`);
      setTimeout(this.refreshData.bind(this), secondsUntilRefresh * 1000);
    }
  }

  /**
   * Internal function to map the columns to the data
   * @param csvConfigRow The first row of the CVS file / export
   * @returns A ColumnMapping object
   */
  private createColumnMapping(csvConfigRow: string): ColumnMapping {
    this.debugLog('DataStore: Creating column mapping');
    const headers = this.parseCsvLine(csvConfigRow.toLowerCase());
    const result: ColumnMapping = {
      languages: new Array<string>(),
      item: {},
      unit: {},
      form: {},
      campaignId: -1,
      need: -1,
      donated: -1,
      lastChange: -1,
    };
    headers.forEach((columnContent, index) => {
      if (columnContent.toString().indexOf(':') > -1) {
        // we have a localized value here
        const pair = columnContent.toString().split(':');
        const langCode = pair[1].toString().trim();
        let langIndex = result.languages.indexOf(langCode);
        if (langIndex == -1) {
          result.languages.push(langCode);
        }
        switch (pair[0].trim()) {
          case 'item':
            result.item[langCode] = index;
          case 'unit':
            result.unit[langCode] = index;
          case 'form':
            result.form[langCode] = index;
        }
      } else {
        // we have a non localized value
        switch (columnContent.toString().trim()) {
          case 'campaign':
            result.campaignId = index;
          case 'need':
            result.need = index;
          case 'donated':
            result.donated = index;
          case 'lastchange':
            result.lastChange = index;
        }
      }
    });
    return result;
  }

  /**
   * Internal function to validate the column mapping (were all expected columns found)
   * @param mapping The mapping that was generated from the createColumnMapping function
   * @returns true if everything is looking good, false if a column is not found (or not available for all languages)
   */
  private validateColumnMapping(mapping: ColumnMapping): boolean {
    this.debugLog('DataStore: Validating column mapping');
    let result = true;
    // simple value columns
    if (mapping.campaignId === -1) {
      this.errorLog('DataStore: Column Mapping Validation failed -> campaign ID column not found');
      result = false;
    }
    if (mapping.donated === -1) {
      this.errorLog('DataStore: Column Mapping Validation failed -> donated amount column not found');
      result = false;
    }
    if (mapping.need === -1) {
      this.errorLog('DataStore: Column Mapping Validation failed -> needed amount column not found');
      result = false;
    }
    if (mapping.lastChange === -1) {
      this.errorLog('DataStore: Column Mapping Validation failed -> last data update column not found');
      result = false;
    }
    // localized value columns
    mapping.languages.forEach(value => {
      if (mapping.item[value] === -1 || mapping.item[value] === undefined) {
        this.errorLog(`DataStore: Column Mapping Validation failed -> item name column for language '${value}' not found`);
        result = false;
      }
      if (mapping.unit[value] === -1 || mapping.item[value] === undefined) {
        this.errorLog(`DataStore: Column Mapping Validation failed -> unit column for language '${value}' not found`);
        result = false;
      }
      if (mapping.form[value] === -1 || mapping.item[value] === undefined) {
        this.errorLog(`DataStore: Column Mapping Validation failed -> form URL column for language '${value}' not found`);
        result = false;
      }
    });
    return result;
  }

  /**
   * Internal function to load / refresh the local data
   */
  private async refreshData() {
    this.isRefreshing = true;
    this.debugLog('DataStore: Data refresh started');
    let data = await fetch(this.dataSourceUrl, { cache: 'no-store' });
    const content = await data.text();
    const rows = content.split(`\n`);
    const tmpParsedData: DonationList = {
      version: this.dataVersion,
      timeStamp: new Date(1970, 0, 1),
      requestTime: new Date(),
      data: [],
    };
    if (rows.length > 0) {
      const mapping = this.createColumnMapping(rows[0].trim());
      if (!this.validateColumnMapping(mapping)) {
        this.isRefreshing = false;
        this.registerDataUpdate();
        return;
      }

      this.debugLog('DataStore: Data received');
      // extract line with change timestamp
      let timestampRow = this.parseCsvLine(rows[1].trim());
      if (timestampRow.length >= mapping.lastChange + 1) {
        try {
          tmpParsedData.timeStamp = new Date(Date.parse(timestampRow[mapping.lastChange].toString()));
        } catch (err) {
          this.errorLog(err);
          this.isRefreshing = false;
          this.registerDataUpdate();
          return;
        }
      } else {
        this.errorLog('DataStore: Length of line with the update timestamp is wrong');
        this.isRefreshing = false;
        this.registerDataUpdate();
        return;
      }

      // compare date age (to avoid older data being used as Google load balancers sometimes behave strange)
      let newDataAvailableOnline = false;
      if (this.hasLocalData) {
        this.localData!.requestTime = tmpParsedData.requestTime;
        // make sure new check time is persisted:
        localStorage.setItem('donationCache', JSON.stringify(this.localData));
        this.debugLog('DataStore: Local data present, comparing timestamps');
        if (this.localData!.timeStamp < tmpParsedData.timeStamp) {
          this.debugLog('DataStore: Data online is newer');
          newDataAvailableOnline = true;
        }
      } else {
        this.debugLog('DataStore: No local data available until now');
        newDataAvailableOnline = true;
      }
      // if new data is available and there is content extract the lines
      if (rows.length > 0 && newDataAvailableOnline) {
        this.debugLog('DataStore: Data extracting required');
        tmpParsedData.data = this.extractDataLines(rows, mapping);
        // save newer data in local storage & class internal store
        this.debugLog('DataStore: Persisting new data');
        localStorage.setItem('donationCache', JSON.stringify(tmpParsedData));
        this.localData = tmpParsedData;
        this.hasLocalData = true;
      }
    }
    this.isRefreshing = false;
    // update components
    this.updateSubscribers.forEach(subscriber => subscriber(this.localData!.requestTime));
    // register next execution of data update
    this.registerDataUpdate();
  }

  /**
   * Internal function to extract the data from the lines of the CSV file
   * @param dataRows The array containing the lines of the SV file, including header line
   * @param mapping The column mapping for the csv file
   * @returns An array with the DonationItems that were extracted
   */
  private extractDataLines(dataRows: string[], mapping: ColumnMapping): Array<DonationItem> {
    this.debugLog('DataStore: Data extracting data lines from online source');
    const tmpResult: Array<DonationItem> = [];
    // we have three simple values (update date does not count) and three localizable ones; so calculate the min number of columns
    const minColumns = 3 + mapping.languages.length * 3;
    for (let idx = 2; idx < dataRows.length; idx++) {
      const tmpLineData = this.parseCsvLine(dataRows[idx].trim());
      if (tmpLineData.length >= minColumns) {
        const tmpObject: DonationItem = {
          article: {},
          campaignKey: tmpLineData[mapping.campaignId].toString(),
          neededOverall: Number.parseInt(tmpLineData[mapping.need].toString()),
          alreadyDonated: Number.parseInt(tmpLineData[mapping.donated].toString()),
          remainingNeed: Number.parseInt(tmpLineData[mapping.need].toString()) - Number.parseInt(tmpLineData[mapping.donated].toString()),
          unit: {},
          formLink: {},
        };
        for (const lang of mapping.languages) {
          tmpObject.article[lang] = tmpLineData[mapping.item[lang]].toString();
          tmpObject.unit[lang] = tmpLineData[mapping.unit[lang]].toString();
          tmpObject.formLink[lang] = tmpLineData[mapping.form[lang]].toString();
        }
        tmpResult.push(tmpObject);
      }
    }
    return tmpResult;
  }

  /**
   * Function to check if the local data is outdated (older then the configured amount of minutes).
   * @returns A boolean result with the answer to the question
   */
  private isDataOutdated() {
    this.debugLog('DataStore: Checking if data is outdated...');
    const time = 1000 * 60 * this.maxDataAgeInMinutes;
    const elapsedTimeThreshold = Date.now() - time;
    const checkResult = new Date(this.localData!.requestTime).getTime() < elapsedTimeThreshold;
    this.debugLog(checkResult);
    return checkResult;
  }

  /**
   * Helper function to split a line of a CSV file into an array of the contained values
   * Known limitation: this parser can not deal with empty columns;
   * all columns need to have content that is not a whitespace!
   * @param lineContent The raw single line of the CSV file
   * @returns An array with the extracted values
   */
  private parseCsvLine(lineContent: string) {
    return lineContent.match(/\s*(\".*?\"|'.*?'|[^,]+)\s*(,|$)/g)!.map(function (line: string) {
      let m;
      if ((m = line.match(/^\s*\"(.*?)\"\s*,?$/))) return m[1]; // Double Quoted Text
      if ((m = line.match(/^\s*'(.*?)'\s*,?$/))) return m[1]; // Single Quoted Text
      if ((m = line.match(/^\s*(true|false)\s*,?$/))) return m[1] === 'true'; // Boolean
      if ((m = line.match(/^\s*((?:\+|\-)?\d+)\s*,?$/))) return parseInt(m[1]); // Integer Number
      if ((m = line.match(/^\s*((?:\+|\-)?\d*\.\d*)\s*,?$/))) return parseFloat(m[1]); // Floating Number
      if ((m = line.match(/^\s*(.*?)\s*,?$/))) return m[1]; // Unquoted Text
      return line;
    });
  }

  /**
   * Internal helper to print debug messages to the console log (if activated in the config)
   * @param message The message (or object) to log
   */
  private debugLog(message: any) {
    if (PageConfiguration.LogToConsole) {
      console.debug(message);
    }
  }

  /**
   * Internal helper to print error messages to the console log
   * @param message The message (or object) to log
   */
  private errorLog(message: any) {
    console.error(message);
  }
}
