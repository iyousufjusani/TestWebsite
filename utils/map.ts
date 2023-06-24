import Geocode from "react-geocode";
import { AddressProps } from "../interfaces";

export function getState(addressArray: any[]) {
  let state = "";
  for (let i = 0; i < addressArray.length; i++) {
    for (let i = 0; i < addressArray.length; i++) {
      if (
        addressArray[i].types[0] &&
        "administrative_area_level_2" === addressArray[i].types[0]
      ) {
        state = addressArray[i].long_name;
        return state;
      }
    }
  }
}

export function getcountry(addressArray: any[]) {
  let state = "";
  for (let i = 0; i < addressArray.length; i++) {
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0] && "country" === addressArray[i].types[0]) {
        state = addressArray[i].long_name;
        return state;
      }
    }
  }
}
export function getArea(addressArray: any[]) {
  let area = "";
  for (let i = 0; i < addressArray.length; i++) {
    if (addressArray[i].types[0]) {
      for (let j = 0; j < addressArray[i].types.length; j++) {
        if (
          "sublocality_level_1" === addressArray[i].types[j] ||
          "locality" === addressArray[i].types[j] ||
          "postal_town" === addressArray[i].types[j]
        ) {
          area = addressArray[i].long_name;
          return area;
        }
      }
    }
  }
}
export function getCity(addressArray) {
  let city = "";
  for (let i = 0; i < addressArray.length; i++) {
    if (
      addressArray[i].types[0] &&
      "postal_town" === addressArray[i].types[0]
    ) {
      city = addressArray[i].long_name;
      return city;
    }
  }
}

export function getRoad(addressArray: any[]) {
  let city = "";
  for (let i = 0; i < addressArray.length; i++) {
    if (addressArray[i].types[0] && "route" === addressArray[i].types[0]) {
      city = addressArray[i].long_name;
      return city;
    }
  }
}
export function getPostCode(addressArray: any[]) {
  let city = "";
  for (let i = 0; i < addressArray.length; i++) {
    if (
      addressArray[i].types[0] &&
      "postal_code" === addressArray[i].types[0]
    ) {
      city = addressArray[i].long_name;
      return city;
    }
  }
}

export const removeNullsFromObject = <IO>(obj: IO): IO => {
  Object.keys(obj).forEach((key) => !obj[key] && delete obj[key]);

  return obj;
};
export function getAddress(data: any): AddressProps {
  const address: string = data.formatted_address,
    addressArray = data.address_components,
    city = getCity(addressArray) || getArea(addressArray),
    area = getArea(addressArray),
    county = getState(addressArray),
    postCode = getPostCode(addressArray),
    country = getcountry(addressArray),
    road = getRoad(addressArray),
    latValue: number =
      typeof data.geometry.location.lat !== "function"
        ? data.geometry.location.lat
        : data.geometry.location.lat(),
    lngValue: number =
      typeof data.geometry.location.lng !== "function"
        ? data.geometry.location.lng
        : data.geometry.location.lng();
  const results = {
    address,
    city,
    area,
    county,
    country,
    latValue,
    lngValue,
    postCode,
    road,
  };

  return removeNullsFromObject(results);
}

export async function getAddressFromLatLng(newLat: string, newLng: string) {
  const response = await Geocode.fromLatLng(newLat, newLng);
  return getAddress(response.results[0]);
}
