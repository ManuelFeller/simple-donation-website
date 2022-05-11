export interface ColumnMapping {
	languages: string[],
	item: {[languageKey: string]: number},
	unit: {[languageKey: string]: number},
	form: {[languageKey: string]: number},
	campaignId: number,
	need: number,
	donated: number,
	lastChange: number
}
