import gmaService from "usecases/gma/gma.service";
import { IInvoiceData } from "../InvoiceGenerator";

class ConcatDataInvoiceGenerator {
	async concatDataInvoice(data: IInvoiceData): Promise<IInvoiceData | any> {
		var invoiceData = {};

		invoiceData = {
			invoiceDate: data.invoiceDate,
			invoiceNumber: data.invoiceNumber,
			corporateNameInvoicing: data.corporateNameInvoicing,
			cityInvoicing: data.cityInvoicing,
			stateInvoicing: data.stateInvoicing,
			zipCodeInvoicing: data.zipCodeInvoicing,
			countryInvoicing: data.countryInvoicing,
			terms: data.paymentCondition,
			totalAmount: data.totalAmount,
			numPurchaseOrder: data.numPurchaseOrder,
			contactEmailInvoicing: data.contactEmailInvoicing,
			numProcess: data.numProcess,
			emailAccountManager: data.emailAccountManager,
			noteDescription: data?.noteDescription,
		};

		var description = data?.noteDescription;
		if (description) {
			description = description.split(/\r?\n/).join("<br>");
		}
		console.log({ description });

		return invoiceData;
	}
}

export default new ConcatDataInvoiceGenerator();
