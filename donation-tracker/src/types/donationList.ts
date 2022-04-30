import { DonationItem } from "./donationItem"

/**
 * Interface to describe the object that holds all the data for the list of donateable items
 */
export interface DonationList {
	/**
	 * The timestamp of the last change in the data source
	 */
	timeStamp: Date,
	/**
	 * The timestamp of the last time when the online date source was checked
	 */
	requestTime: Date,
	/**
	 * The actual data that comes from the online source (converted CSV content)
	 */
	data: Array<DonationItem>
}
