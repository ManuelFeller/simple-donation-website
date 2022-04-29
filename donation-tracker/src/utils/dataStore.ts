import { DonationItem } from "../types/donationItem";
import { DonationList } from "../types/donationList";

export default class DataStore {
	private dataSourceUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQM_VX8StPqet3KBtHzyLVSzqgC8jP2VgcK97Fs_UTI1thN2-za-MHSAc9bizcVMebIEhDf-0Di8arH/pub?gid=919395952&single=true&output=csv';
	private maxDataAgeInMinutes = 5;
	private hasLocalData: boolean;
	private localData: DonationList | null;

	constructor() {
		let tmpData = localStorage.getItem('donationCache');
		if (tmpData !== null) {
			this.localData = JSON.parse(tmpData);
			this.hasLocalData = true;
			console.log(this.localData);
			if (this.isDataOutdated(this.localData!.requestTime, this.maxDataAgeInMinutes)) {
				setTimeout(this.refreshData.bind(this), 100);
			}
		} else {
			this.localData = null;
			this.hasLocalData = false;
			setTimeout(this.refreshData.bind(this), 100);
		}
		// ToDo: auto-refresh
	}

	public getSecondsUntilRefresh() {
		// new Date(dataTimeStamp).getTime()
	}

	private async refreshData() {
		let data = await fetch(this.dataSourceUrl, {cache: "no-store"});
		const content = await data.text();
		const rows = content.split(`\n`);
		const tmpParsedData: DonationList =  {
			timeStamp: new Date(1970, 0, 1),
			requestTime: new Date(),
			data: [],
		};
		if (rows.length > 0) {
			// extract header
			let header = this.parseCSVLine(rows[0]);
			if (header.length >= 6) {
				try {
					tmpParsedData.timeStamp = new Date(Date.parse(header[5].toString()));
				} catch (err) {
					console.error(err);
				}
			}
			// ToDo: compare date age (to avoid older data being used)
			// extract lines
			if (rows.length > 0) {
				for (let idx = 1; idx < rows.length; idx++) {
					const tmpLineData = this.parseCSVLine(rows[idx]);
					if (tmpLineData.length >= 5) {
						const tmpObject: DonationItem = {
							article: tmpLineData[0].toString(),
							initiativeKey: tmpLineData[1].toString(),
							neededOverall: Number.parseInt(tmpLineData[2].toString()),
							alreadyDonated: Number.parseInt(tmpLineData[3].toString()),
							remainingNeed: Number.parseInt(tmpLineData[4].toString())
						}
						tmpParsedData.data.push(tmpObject);
					}
				}
			}
			localStorage.setItem('donationCache', JSON.stringify(tmpParsedData));
			this.localData = tmpParsedData;
			this.hasLocalData = true;
		}
	}

	private isDataOutdated = (dataTimeStamp: Date, minutesAgo: number) => {
    const time = 1000 * 60 * minutesAgo;
    const elapsedTimeThreshold = Date.now() - time;
    return new Date(dataTimeStamp).getTime() > elapsedTimeThreshold;
	}

	private parseCSVLine(lineContent: string) {
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


}