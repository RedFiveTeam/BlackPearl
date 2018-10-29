import { Serializer } from '../../../../utils/serializer';
import { WeatherModel } from '../WeatherModel';

export class WeatherSerializer implements Serializer<WeatherModel> {
  serialize(item: WeatherModel): {} {
    return {
      id: item.id,
      url: item.url
    };
  }

  deserialize(item: any): WeatherModel {
    return new WeatherModel(
      item.id,
      item.url
    );
  }
}