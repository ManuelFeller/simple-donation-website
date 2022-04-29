import { DonationItem } from "./donationItem"

export interface DonationList {
	timeStamp: Date,
	requestTime: Date,
	data: Array<DonationItem>
}
