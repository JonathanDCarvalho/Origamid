import { Request, Response } from "express";
import gmaService from "./gma.service";

class GmaController {
	async handleInvoicing(request: Request, response: Response) {
		var { numProcess, relacao } = request.query;

		numProcess = String(numProcess);
		relacao = String(relacao);

		console.log({ numProcess, relacao });

		const dataUSAGMA206 = await gmaService.getDataUSAGMA206(numProcess);

		if (!dataUSAGMA206) {
			return response.status(404).json({ message: "Process not found!" });
		}

		const result = await gmaService.handleInvoicingUSAGMA(dataUSAGMA206);

		var invoiceNumber = String(result.invoiceNumber);

		if (result.status) {
			var fieldsGMA = [
				{
					nome: "invoiceNumber",
					valor: invoiceNumber || "",
				},
			];

			return response.json(fieldsGMA);
		}
	}
}

export default new GmaController();
