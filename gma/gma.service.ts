import FluigGetTableData from "../../providers/FluigGetTableData";
import { IFluigProvider } from "../../global/IFluigProvider";
import FluigProvider from "../../providers/fluigProvider";
import InvoiceGenerator from "./invoiceGenerator/InvoiceGenerator";

class GmaService {
	async getDataUSAGMA206(numProcess: string): Promise<any> {
		const FLUIG_BASE_URL = process.env.FLUIG_BASE_URL;

		var dataset = "dsGMAUSA206";
		var field = "numProcess";

		var baseUrl = `${FLUIG_BASE_URL}/api/public/ecm/dataset`;
		var filters = `/search?datasetId=${dataset}&searchField=${field}&searchValue=`;

		const fluigProviderRequest: IFluigProvider = {
			consumerKey: process.env.CONSUMER_KEY,
			consumerSecret: process.env.CONSUMER_SECRET,
			tokenKey: process.env.TOKEN,
			tokenSecret: process.env.TOKEN_SECRET,
			baseURL: `${baseUrl}${filters}${numProcess}`,
		};

		const fluigHelper = new FluigProvider(fluigProviderRequest);

		const urlDaAPI = `${filters}${numProcess}`;
		const metodoDaAPI = "GET";
		const dataDaAPI = null;

		const data = await fluigHelper.makeRequest(urlDaAPI, metodoDaAPI, dataDaAPI);

		return data[0];
	}

	async getDataTableServices(documentid): Promise<any> {
		var dataset = "dsGMAUSA206";
		var tablename = "tableServices";

		const FLUIG_BASE_URL = process.env.FLUIG_BASE_URL;

		var baseUrl = `${FLUIG_BASE_URL}/dataset/api`;
		var filters =
			`/v2/dataset-handle/search?datasetId=${dataset}&constraintsField=tablename&constraintsInitialValue=${tablename}&constraintsFinalValue=${tablename}` +
			`&constraintsField=documentid&constraintsInitialValue=${documentid}&constraintsFinalValue=${documentid}`;

		const fluigProviderRequest: IFluigProvider = {
			consumerKey: process.env.CONSUMER_KEY,
			consumerSecret: process.env.CONSUMER_SECRET,
			tokenKey: process.env.TOKEN,
			tokenSecret: process.env.TOKEN_SECRET,
			baseURL: `${baseUrl}${filters}`,
		};

		const fluigHelper = new FluigGetTableData(fluigProviderRequest);

		const urlDaAPI = `${filters}`;
		const metodoDaAPI = "GET";
		const dataDaAPI = null;

		const { values } = await fluigHelper.makeRequest(urlDaAPI, metodoDaAPI, dataDaAPI);

		return values;
	}

	async getDataUSAGMA004(numProcess: string): Promise<any> {
		const FLUIG_BASE_URL = process.env.FLUIG_BASE_URL;

		var dataset = "dsGMAUSA004";
		var field = "numProcess";

		var baseUrl = `${FLUIG_BASE_URL}/api/public/ecm/dataset`;
		var filters = `/search?datasetId=${dataset}&searchField=${field}&searchValue=`;

		const fluigProviderRequest: IFluigProvider = {
			consumerKey: process.env.CONSUMER_KEY,
			consumerSecret: process.env.CONSUMER_SECRET,
			tokenKey: process.env.TOKEN,
			tokenSecret: process.env.TOKEN_SECRET,
			baseURL: `${baseUrl}${filters}${numProcess}`,
		};

		const fluigHelper = new FluigProvider(fluigProviderRequest);

		const urlDaAPI = `${filters}${numProcess}`;
		const metodoDaAPI = "GET";
		const dataDaAPI = null;

		const data = await fluigHelper.makeRequest(urlDaAPI, metodoDaAPI, dataDaAPI);

		return data[0];
	}

	async handleInvoicingUSAGMA(dataUSAGMA206: any): Promise<any> {
		var tableServicesData = await this.getDataTableServices(dataUSAGMA206.documentid);

		const result = await InvoiceGenerator.generateInvoice(dataUSAGMA206, tableServicesData);
		return result;
	}

	async getInvoiceNumber(): Promise<string> {
		const FLUIG_BASE_URL = process.env.FLUIG_BASE_URL;

		var dataset = "dsBVUSA206_invoiceNumberGenerator";

		var baseUrl = `${FLUIG_BASE_URL}/api/public/ecm/dataset`;
		var filters = `/search?datasetId=${dataset}`;

		const fluigProviderRequest: IFluigProvider = {
			consumerKey: process.env.CONSUMER_KEY,
			consumerSecret: process.env.CONSUMER_SECRET,
			tokenKey: process.env.TOKEN,
			tokenSecret: process.env.TOKEN_SECRET,
			baseURL: `${baseUrl}${filters}`,
		};

		const fluigHelper = new FluigProvider(fluigProviderRequest);

		const urlDaAPI = `${filters}`;
		const metodoDaAPI = "GET";
		const dataDaAPI = null;

		const data = await fluigHelper.makeRequest(urlDaAPI, metodoDaAPI, dataDaAPI);

		var newData = JSON.parse(data[0].message);

		var invoiceNumber = newData.Codigo;

		return invoiceNumber;
	}
}

export default new GmaService();
