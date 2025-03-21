import fs from "fs";
import handlebars from "handlebars";
import path from "path";
import puppeteer from "puppeteer";
import ConcatDataInvoiceGenerator from "./helpers/ConcatData";
import EmailService, { IMailOptions } from "../../../services/EmailService";
import gmaService from "../gma.service";
import { getDataSource } from "../../../../data-source";
import e from "express";

export interface IInvoiceData {
	corporateNameInvoicing: string;
	cityInvoicing: string;
	stateInvoicing: string;
	zipCodeInvoicing: string;
	countryInvoicing: string;
	paymentCondition: string;
	totalAmount: string;
	invoiceNumber: string;
	invoiceDate: string;
	numPurchaseOrder: string;
	contactEmailInvoicing: string;
	numProcess: string;
	emailAccountManager: string;
	noteDescription: string;
}

class InvoiceGenerator {
	async createPDF(html, options, invoiceName) {
		console.log("Criando PDF...");

		// Crie o diretório 'invoices' se ele não existir
		const dirPath = path.dirname(invoiceName);
		if (!fs.existsSync(dirPath)) {
			fs.mkdirSync(dirPath, { recursive: true });
		}

		console.log("Caminho do dirPath:", dirPath);

		return new Promise(async (resolve, reject) => {
			try {
				console.log("Iniciando puppeteer...");
				// Configurar puppeteer para ignorar erros de certificado autoassinado
				process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

				const browser = await puppeteer
					.launch({
						headless: true,
						args: ["--no-sandbox", "--disable-setuid-sandbox"],
					})
					.catch((err) => {
						console.error("Erro ao iniciar o Puppeteer:", err);
						reject(err);
					});

				const executablePath = puppeteer.executablePath();

				console.log("Caminho do Chromium utilizado pelo Puppeteer:", executablePath);
				if (!browser) {
					console.log("O browser não foi iniciado.");
					return;
				}
				const page = await browser.newPage();
				await page.setContent(html);

				const pdfBuffer = await page.pdf(options);
				console.log("PDF buffer size:", pdfBuffer.length);
				fs.writeFileSync(invoiceName, pdfBuffer);
				console.log("PDF saved:", invoiceName);

				try {
					await browser.close();
				} catch (error) {
					console.error("Erro ao fechar o browser:", error);
				}
				resolve({ filename: invoiceName });
			} catch (err) {
				reject(err);
			}
		});
	}

	async getHtmlTemplate(templatePath: string): Promise<string> {
		return await fs.promises.readFile(templatePath, "utf-8");
	}

	async generateInvoice(invoiceData: IInvoiceData): Promise<void | any> {
		var dataConcat = await ConcatDataInvoiceGenerator.concatDataInvoice(invoiceData);

		if (dataConcat.noteDescription) {
			dataConcat.noteDescription = dataConcat.noteDescription.split(/\r?\n/).join("<br>");
		}

		var invoiceNumber = dataConcat.numProcess;

		const templatePath = path.join(__dirname, "../../../templates", "templateInvoiceGMA.html");
		const templateSource = fs.readFileSync(templatePath, "utf-8");
		const template = handlebars.compile(templateSource);

		const html = template(dataConcat);

		console.log("HTML gerado com sucesso");

		const options = {
			format: "A4",
			printBackground: true,
		};

		console.log("Gerando invoice...");

		var invoicesPath = path.join(__dirname, "./invoices");
		var fileName = `invoice_${invoiceNumber}.pdf`;
		var invoiceName = path.join(invoicesPath, fileName);

		console.log("Caminho da proforma:", invoiceName);

		try {
			var res = await this.createPDF(html, options, invoiceName);
			console.log("Invoice gerado com sucesso:", res);
		} catch (error) {
			console.error("Erro ao gerar o invoice:", error);
			return false;
		}

		var emailAccountManager = invoiceData?.emailAccountManager;
		var contactEmailInvoicing = invoiceData?.contactEmailInvoicing;

		var emailsContactInvoicing = contactEmailInvoicing.split("; ");

		var emailsFromRole = await this.getEmailsFromRole();
		var emailsTo = emailsFromRole.map((email) => email.EMAIL);

		if (process.env.NODE_ENV === "production") {
			var emailFaturamento = "celulafaturamento2@bureauveritas.com";
			var emailAdm = "adm_fluig@bureauveritas.com";
			emailsTo.push(emailFaturamento, emailAdm);
		} else {
			emailsTo.push("luizstevanatto@hotmail.com");
			emailsTo.push("jonathan.carvalho@bureauveritas.com");
		}
		emailsTo.push(emailAccountManager);
		emailsTo = emailsTo.concat(emailsContactInvoicing);

		var emailSubject = `Bureau Veritas Consumer Products Service - INVOICE ${invoiceNumber}`;

		var emailTemplatePath = path.join(__dirname, "../../../templates", "templateEmail.html");

		var emailHtml = await this.getHtmlTemplate(emailTemplatePath);

		const variables = {
			email: emailAccountManager || "gabriela.dias@bureauveritas.com",
		};

		emailHtml = this.replacePlaceholders(emailHtml, variables);

		var mailOptions: IMailOptions = {
			from: String(process.env.EMAIL_USER),
			to: emailsTo.join(", "),
			subject: emailSubject,
			html: emailHtml,
			attachments: [
				{
					filename: path.basename(invoiceName),
					path: invoiceName,
					contentType: "application/pdf",
				},
			],
		};

		var sendEmail = await EmailService.sendInvoiceEmail(mailOptions);

		if (sendEmail) {
			var invoicesFolderPath = path.join(__dirname, "./invoices");
			await this.deleteAllFilesInFolder(invoicesFolderPath);

			var result: any = {
				status: true,
				invoiceNumber,
			};
			return result;
		} else {
			throw new Error("Erro ao enviar o e-mail");
		}
	}

	async deleteAllFilesInFolder(folderPath: string) {
		fs.readdir(folderPath, (err, files) => {
			if (err) {
				console.error("Erro ao ler a pasta:", err);
				return;
			}

			files.forEach((file) => {
				const filePath = path.join(folderPath, file);
				fs.unlink(filePath, (err) => {
					if (err) {
						console.error("Erro ao excluir o arquivo:", err);
					} else {
						console.log("Arquivo excluído com sucesso:", filePath);
					}
				});
			});
		});
	}

	private replacePlaceholders(template, variables) {
		return template.replace(/{{(.*?)}}/g, (_, key) => {
			const trimmedKey = key.trim();
			const replacement = variables[trimmedKey] || "";
			return replacement;
		});
	}

	// getProposalList(servicesData): string {
	// 	var proposalList = [];

	// 	servicesData.forEach((service) => {
	// 		if (!proposalList.includes(service.proposalNumber)) {
	// 			proposalList.push(service.proposalNumber);
	// 		}
	// 	});

	// 	return proposalList.join("; ");
	// }

	// async getItensInfo(servicesData) {
	// 	const promises = servicesData.map(async (item) => {
	// 		const numProcess004 = item.processchc004;

	// 		const { countryExecutingGroup } = await gmaService.getDataUSAGMA004(numProcess004);

	// 		const itemDescription = item.itemDescription;
	// 		const originalAmount = item.serviceAmount;
	// 		const currentAmount = item.amountToInvoice;

	// 		var prevInvoiced = Number(((1 - parseFloat(currentAmount) / parseFloat(originalAmount)) * 100).toFixed(2));

	// 		if (isNaN(prevInvoiced)) {
	// 			prevInvoiced = 0;
	// 		}

	// 		var htmlItemDesc = `${itemDescription}`;

	// 		return {
	// 			country: countryExecutingGroup,
	// 			itemDescription: htmlItemDesc,
	// 			originalAmount: originalAmount,
	// 			currentAmount: currentAmount,
	// 			prevInvoiced,
	// 		};
	// 	});

	// 	const arrItens = await Promise.all(promises);

	// 	return arrItens;
	// }

	// async getInvoiceNumber(): Promise<string> {
	// 	var invoiceNumber = await gmaService.getInvoiceNumber();

	// 	return invoiceNumber;
	// }

	async getEmailsFromRole() {
		var datasource = getDataSource();
		var role = "chc_receive_invoice_email";

		var sql = `
    
      SELECT
        EMAIL
      FROM
        FDN_USERROLE ROLE
        LEFT JOIN FDN_USERTENANT ON ROLE.LOGIN = FDN_USERTENANT.LOGIN
      WHERE
        ROLE_CODE = '${role}'
    `;

		var emails = await datasource.query(sql);
		return emails;
	}
}
export default new InvoiceGenerator();
