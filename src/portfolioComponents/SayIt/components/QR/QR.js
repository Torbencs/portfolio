import React, { useEffect, useState, useRef } from "react";
import QRCodeStyling from "qr-code-styling";

//Assets
import logo from "../../assets/logo_txt_sml.png";

export default function QR({ data, size, keyId }) {
  const [options, setOptions] = useState({
    width: size,
    height: size,
    type: "svg",
    data: data,
    image: logo,
    margin: 0,
    qrOptions: {
      typeNumber: 0,
      mode: "Byte",
      errorCorrectionLevel: "M",
    },
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.4,
      margin: 4,
      crossOrigin: "anonymous",
    },
    dotsOptions: {
      color: "#43384b",
      type: "extra-rounded",
    },
    backgroundOptions: {},
    cornersSquareOptions: {
      color: "#43384b",
      type: "extra-rounded",
    },
    cornersDotOptions: {
      color: "#43384b",
      type: "dot",
    },
  });

  const [qrCode] = useState(new QRCodeStyling(options));
  const ref = useRef(null);

  //Set QR as current ref
  useEffect(() => {
    if (ref.current) {
      qrCode.append(ref.current);
    }
  }, [qrCode, ref]);

  return <div key={keyId} ref={ref}></div>;
}
