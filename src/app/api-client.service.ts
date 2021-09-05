import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { delayRetry } from './extensions';

/** Автор */
export interface Author
{
  /** Уникальный идентификатор */
  id: number;
  /** Имя автора */
  name?: string;
  /** Книги автора */
  books?: Book[] | undefined;
}

/** Книга */
export interface Book
{
  /** Уникальный идентификатор */
  id: number;
  /** Заголовок */
  title?: string;
  /** Дата выхода книги */
  year?: Date;
  /** Уникальный идентификатор автора */
  authorId?: number;
}


@Injectable({ providedIn: 'root' })
// @delayRetry()
export class ApiClientService
{

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  public GetAllAuthor()
  {
    return this.http.get<Author[]>(`${this.baseUrl}/api/Authors`);
  }

  public GetAuthorById(id: number)
  {
    return this.http.get<Author[]>(`${this.baseUrl}/api/Authors/${id}`);
  }
}
