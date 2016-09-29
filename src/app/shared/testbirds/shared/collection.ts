export class Collection<T> {
  skip: number;
  limit: number;
  total: number;

  current: number;
  next: number;
  previous: number;
  all: number;

  data: T[] = [];

  constructor(obj: any, factory: ItemOperation<T>) {
    this.skip   = obj && obj.skip || 0;
    this.limit   = obj && obj.limit || 10;
    this.total   = obj && obj.total || 0;

    this.calculateAll();
    this.calculateCurrent();
    this.calculateNext();
    this.calculatePrevious();

    if(obj && Array.isArray(obj.data)) {
      obj.data.map((item: any): void => {
        this.data.push(factory(item));
      });
    }
  }

  /**
   * Calculates number of pages
   */
  protected calculateAll(): void {
    this.all = Math.ceil(this.total / this.limit);
  }

  /**
   * Calculates current page
   */
  protected calculateCurrent(): void {
    this.current = this.skip + 1;
  }

  /**
   * Calculates next page
   */
  protected calculateNext(): void {
    let next = this.current + 1;
    this.next = this.all >= next ? next : null;
  }

  /**
   * Calculate previous page
   */
  protected calculatePrevious(): void {
    this.previous = this.current !== 1 ? this.current - 1 : null;
  }
}

export interface ItemOperation<T> extends Function {
  (item: any): T;
}


