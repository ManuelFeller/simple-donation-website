import { DonationItem } from "./donationItem"

export type DonationList = {
	timeStamp: Date,
	requestTime: Date,
	data: Array<DonationItem>
}
