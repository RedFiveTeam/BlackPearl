export interface Serializer<T> {
  serialize(item: T): any;
  deserialize(item: any): T;
}