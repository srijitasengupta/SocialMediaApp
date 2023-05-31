import { Injectable } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Injectable({
	providedIn: 'root'
})
export class UtilsService {

	constructor(
		public messageService: MessageService
	) { }

	handleSuccess(message: any) {
		this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: message });
	}

	handleError(message: any) {
		this.messageService.add({ severity: 'error', summary: 'Rejected', detail: message });
                        
	}
}
