import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {
  messages: string[] = [];
  isAnyError: boolean = false;

  add(message: string, isError: boolean = false) {
    this.messages.push(message);
    this.isAnyError = this.isAnyError || isError;
  }

  clear() {
    this.messages = [];
    this.isAnyError = false;
  }
}
