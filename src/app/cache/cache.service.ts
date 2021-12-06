import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CacheService
{
  [key: string]: Observable<any> | undefined;

  constructor() { }
}
