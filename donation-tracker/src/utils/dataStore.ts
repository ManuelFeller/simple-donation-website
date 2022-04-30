import PageConfiguration from "../config";
import { DonationItem } from "../types/donationItem";
import { DonationList } from "../types/donationList";

/**
 * Class representing the dynamically loaded data (the number if items donated and still needed per donation campaign)
 */
export default class DataStore {

	private static instance: DataStore;

	private dataSourceUrl = PageConfiguration.DataSource;
	private maxDataAgeInMinutes = PageConfiguration.MaxDataAgeInMinutes;
	private hasLocalData: boolean;
	private isRefreshing: boolean;
	private localData: DonationList | null;
	private updateSubscribers: Array<Function>;

	/**
	 * DO NOT USE EXTERNALLY! Use DataStore.getInstance() instead!
	 * Creates an instance and also try to load / update the local data if needed
	 */
	private constructor() {
		this.debugLog('DataStore: Creating instance, trying to read local storage data');
		let tmpData = localStorage.getItem('donationCache');
		this.isRefreshing = false;
		if (tmpData !== null) {
			this.debugLog('DataStore: Local data found, loading into memory');
			this.localData = JSON.parse(tmpData);
			this.hasLocalData = true;
			if (this.isDataOutdated()) {
				this.debugLog('DataStore: Local data outdated, querying online source scheduled');
				setTimeout(this.refreshData.bind(this), 100);
			} else {
				this.registerDataUpdate();
			}
		} else {
			this.debugLog('DataStore: No local data found, querying online source scheduled');
			this.localData = null;
			this.hasLocalData = false;
			setTimeout(this.refreshData.bind(this), 100);
		}
		this.updateSubscribers = new Array<Function>();
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
		if (this.hasLocalData) {
			return this.localData!.data;
		} else {
			return new Array<DonationItem>();
		}
	}

	/**
	 * Get items filtered for a campaign
	 * @param campaignKey The campaign key
	 * @returns The list of items that belong to the campaign
	 */
	public getItemsForCampaign(campaignKey: string): Array<DonationItem> {
		const tempResult = new Array<DonationItem>();
		if (this.hasLocalData) {
			this.localData!.data.forEach(item => {
				if (item.initiativeKey === campaignKey) {
					tempResult.push(item);
				}
			});
		}
		return tempResult;
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
	 * @returns The number of seconds until the next data refresh
	 */
	public getSecondsUntilRefresh(): number {
		if (this.isRefreshing) {
			return 0;
		} else {
			if (this.localData === null) {
				return 0;
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

	// internal function to register the next data update
	private registerDataUpdate() {
		if (PageConfiguration.AutoRefresh) {
			const secondsUntilRefresh = this.getSecondsUntilRefresh();
			this.debugLog(`DataStore: Registering next data refresh to execute in ${secondsUntilRefresh} seconds`);
			setTimeout(
				this.refreshData.bind(this),
				(secondsUntilRefresh * 1000)
			);
		}
	}

	/**
	 * Internal function to load / refresh the local data
	 */
	private async refreshData() {
		this.isRefreshing = true;
		this.debugLog('DataStore: Data refresh started');
		let data = await fetch(this.dataSourceUrl, {cache: "no-store"});
		const content = await data.text();
		const rows = content.split(`\n`);
		const tmpParsedData: DonationList =  {
			timeStamp: new Date(1970, 0, 1),
			requestTime: new Date(),
			data: [],
		};
		if (rows.length > 0) {
			this.debugLog('DataStore: Data received');
			// extract header line
			let header = this.parseCsvLine(rows[0]);
			if (header.length >= 7) {
				try {
					tmpParsedData.timeStamp = new Date(Date.parse(header[6].toString()));
				} catch (err) {
					console.error(err);
					this.isRefreshing = false;
				}
			} else {
				this.debugLog('DataStore: Header length is wrong');
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
				newDataAvailableOnline = true;
			}
			// if new data is available and there is content extract the lines
			if (rows.length > 0 && newDataAvailableOnline) {
				this.debugLog('DataStore: Data extracting data from online source');
				tmpParsedData.data = this.extractDataLines(rows);
				// save newer data in local storage & class internal store
				this.debugLog('DataStore: Persisting new data');
				localStorage.setItem('donationCache', JSON.stringify(tmpParsedData));
				this.localData = tmpParsedData;
				this.hasLocalData = true;
			}
		}
		this.isRefreshing = false;
		// update components
		this.updateSubscribers.forEach(subscriber =>
			subscriber(this.localData!.requestTime)
		);
		// register next execution of data update
		this.registerDataUpdate();
	}

	/**
	 * Internal function to extract the data from the lines of the CSV file
	 * @param dataRows The array containing the lines of the SV file, including header line
	 * @returns An array with the DonationItems that were extracted
	 */
	private extractDataLines(dataRows: string[]): Array<DonationItem> {
		this.debugLog('DataStore: Data extracting data from online source');
		const tmpResult: Array<DonationItem> = [];
		for (let idx = 1; idx < dataRows.length; idx++) {
			const tmpLineData = this.parseCsvLine(dataRows[idx]);
			if (tmpLineData.length >= 5) {
				const tmpObject: DonationItem = {
					article: tmpLineData[0].toString(),
					initiativeKey: tmpLineData[1].toString(),
					neededOverall: Number.parseInt(tmpLineData[2].toString()),
					alreadyDonated: Number.parseInt(tmpLineData[3].toString()),
					remainingNeed: Number.parseInt(tmpLineData[4].toString()),
					unit: tmpLineData[5].toString()
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
		const checkResult = new Date(this.localData!.requestTime).getTime() < elapsedTimeThreshold
		this.debugLog(checkResult);
    return checkResult;
	}

	/**
	 * Helper function to split a line of a CSV file into an array of the contained values
	 * @param lineContent The raw single line of the CSV file
	 * @returns An array with the extracted values
	 */
	private parseCsvLine(lineContent: string) {
		return lineContent.match(/\s*(\".*?\"|'.*?'|[^,]+)\s*(,|$)/g)!.map(
			function (line: string) {
				let m;
				if (m = line.match(/^\s*\"(.*?)\"\s*,?$/)) return m[1]; // Double Quoted Text
				if (m = line.match(/^\s*'(.*?)'\s*,?$/)) return m[1]; // Single Quoted Text
				if (m = line.match(/^\s*(true|false)\s*,?$/)) return m[1] === "true"; // Boolean
				if (m = line.match(/^\s*((?:\+|\-)?\d+)\s*,?$/)) return parseInt(m[1]); // Integer Number
				if (m = line.match(/^\s*((?:\+|\-)?\d*\.\d*)\s*,?$/)) return parseFloat(m[1]); // Floating Number
				if (m = line.match(/^\s*(.*?)\s*,?$/)) return m[1]; // Unquoted Text
				return line;
			}
		);
	}

	/**
	 * Internal helper to print debug messages to teh console log (if activated in teh config)
	 * @param message The message (or object) to log
	 */
	private debugLog(message: any) {
		 if (PageConfiguration.LogToConsole) {
			console.debug(message);
		 }
	}

}
