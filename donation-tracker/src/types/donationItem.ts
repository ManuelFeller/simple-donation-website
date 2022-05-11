import { LocalizedString } from "./localizedString";

/**
 * Interface to describe a donateable item in its details
 */
export interface DonationItem {
	/**
	 * The name or short description of the item
	 */
	article: LocalizedString[],
	/**
	 * The key to assign this item to any of the ongoing initiatives / campaigns
	 */
	campaignKey: string,
	/**
	 * The amount that is needed overall
	 */
	neededOverall: number,
	/**
	 * The amount that was already donated
	 */
	alreadyDonated: number,
	/**
	 * The amount that is still needed
	 */
	remainingNeed: number,
	/**
	 * The unit for the item (e.g. kg, l, pcs, ...)
	 */
	unit: LocalizedString[],
	/**
	 * The link to the donation registration form 
	 */
	formLink: LocalizedString[]
}
