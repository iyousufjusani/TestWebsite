import { Autocomplete, GoogleMap, Marker } from "@react-google-maps/api";

import React, { memo, useCallback, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";

import { AddressProps } from "../../interfaces";
import { getAddress, getAddressFromLatLng } from "../../utils/map";

type Props = {
  onChange?: (address: AddressProps) => void;
  value?: AddressProps;
  placeholder?: string;

  showMap?: boolean;
  onClose?: () => void;
};
const Index: React.FC<Props> = ({
  value,
  onChange,
  placeholder,

  showMap,
  onClose,
}) => {
  const [autocomplete, setAutocomplete] = React.useState<any>(undefined);
  const [initialValue, setInitialValue] = React.useState("");

  const onLoad = (data: any) => {
    setAutocomplete(data);
  };

  var onMarkerDragEnd = async ({ latLng }) => {
    let newLat = latLng.lat(),
      newLng = latLng.lng();
    const newAddress = await getAddressFromLatLng(newLat, newLng);
    onChange?.(newAddress);
  };

  const currentPosition = useCallback(() => {
    navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      const newAddress = await getAddressFromLatLng(
        String(coords.latitude),
        String(coords.longitude)
      );
      onChange?.(newAddress);
    });
  }, [onChange]);

  useEffect(() => {
    if (value?.address) {
      setInitialValue(value.address);
      return;
    }
    currentPosition();
  }, [currentPosition, value]);

  return (
    <Modal show={showMap} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title
          style={{
            fontSize: "16px",
          }}
        >
          Pin your location in map
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Autocomplete
          onLoad={onLoad}
          restrictions={{ country: "GB" }}
          onPlaceChanged={async () => {
            if (autocomplete !== null) {
              const place = await autocomplete?.getPlace();
              onChange?.(getAddress(place));
            }
          }}
        >
          <Form.Control
            placeholder={placeholder}
            className="mb-3"
            value={initialValue}
            onChange={(e) => {
              setInitialValue(e.target.value);
            }}
          />
        </Autocomplete>

        {value?.address && (
          <GoogleMap
            mapContainerStyle={{
              width: "100%",
              height: "400px",
              borderRadius: "20px",
            }}
            center={{ lat: value?.latValue, lng: value?.lngValue }}
            zoom={16}
          >
            <Marker
              icon={{
                url: "/images/userMarker.png",
                scaledSize: new window.google.maps.Size(50, 50),
              }}
              draggable={true}
              position={{ lat: value?.latValue, lng: value?.lngValue }}
              onDragEnd={onMarkerDragEnd}
            />
          </GoogleMap>
        )}
        <div className="d-flex justify-content-end">
          <Button onClick={onClose} variant="danger" className=" mt-3 ">
            Close
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default memo(Index);
