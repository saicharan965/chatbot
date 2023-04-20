import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChatHistoryService {
  constructor(private _http: HttpClient) {}

  getChat(conversationId: any) {
    return this._http.get(
      'https://chatbotelasticapi.azurewebsites.net/api/ChatHistory?ConversationId=' +
        conversationId
    );
  }
}
