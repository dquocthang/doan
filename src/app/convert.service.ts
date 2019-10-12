import { Injectable } from '@angular/core';
import { Time } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ConvertService {
  room: string;
  timein: Time;
  timeout:Time;

  constructor() { }
}
