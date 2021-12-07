import { Observable } from "rxjs";
import { shareReplay } from "rxjs/operators";

/**
 * Декоратор кэширования
 *
 * @export
 * @param cacheFactory Получение кэша
 * @return {*}
 */
export function cachedRequest(
  cacheFactory: (this: any) =>
    { [key: string]: Observable<any> | undefined }
)
{
  return (target: any, method: string, descriptor: PropertyDescriptor): PropertyDescriptor =>
  {
    // Запоминаем оригинальную функцию
    const origin = descriptor.value;
    // Префикс кэша
    const prefix = `${target.constructor.name}.${method}`;

    // Заменяем оригинальную функцию на функцию с кэшем
    descriptor.value = function (...args: any[]): Observable<any>
    {
      // Получаем объект кэш
      const storage = cacheFactory.call(this)
      // Ключ кэша
      const key = `${prefix}+${JSON.stringify(args)}`;

      // Смотрим есть кэшированный ответ
      let observable = storage[key];

      // Если есть возвращаем его
      if (!!observable) return observable;

      // Создаём ответ
      observable = origin
        .apply(this, args)
        .pipe(shareReplay(1));

      // Сохраняем в кэш
      storage[key] = observable;

      // возвращаем
      return observable as Observable<any>;
    };

    return descriptor;
  }
}
