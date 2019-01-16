import { Serializer } from '../../../../utils/Serializer';
import { WeatherModel } from '../WeatherModel';

export class WeatherSerializer implements Serializer<WeatherModel> {
  serialize(item: WeatherModel): {} {
    return {
      id: item.id,
      url: item.url,
      label: item.label
    };
  }

  deserialize(item: any): WeatherModel {
    return new WeatherModel(
      item.id,
      item.url,
      item.label
    );
  }
}