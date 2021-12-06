import { CacheService } from './../cache/cache.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { CachedRequest } from '../cache/cache-decorator';
import { delayRetry } from '../extensions';

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

  constructor(
    private readonly http: HttpClient,
    @Inject('BASE_URL') private readonly baseUrl: string,
    private readonly cache: CacheService
  )
  {
  }

  @CachedRequest(function () { return this.cache; })
  public GetAllAuthor()
  {
    return this.http.get<Author[]>(`${this.baseUrl}/api/Authors`);
  }

  public GetAuthorById(id: number)
  {
    return this.http.get<Author[]>(`${this.baseUrl}/api/Authors/${id}`);
  }
}
