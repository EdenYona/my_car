import "./car.scss";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState, useContext } from "react";
import { publicRequest } from "../../requestMethods";
import { useParams } from "react-router-dom";
import { carDetails } from "../../data";
import ImagesSlider from "../../components/imagesSlider/ImagesSlider";
import { TailSpin } from "react-loader-spinner";
import { CurrentUserContext } from "../../context/currentUserContext/currentUserContext";
import { useSDK } from "@metamask/sdk-react";


const Car = () => {
  const [showEmail, setShowEmail] = useState(false);
  const [showNumber, setShowNumber] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [car, setCar] = useState(null);
  const [images, setImages] = useState([]);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [showSlider, setShowSlider] = useState(false);

  const { currentUser } = useContext(CurrentUserContext);

  const { sdk, connected, connecting, provider, chainId } = useSDK();

  console.log(currentUser);

  const { id } = useParams();

  const getData = async () => {
    try {
      setIsLoading(true);
      const res = await publicRequest.get(`car/${id}`);
      setCar(res.data);
      setImages(res.data.images);
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  const send = async () => {
    console.log("sending..");
    console.log(currentUser, provider);
    try {
      await provider.request({
        method: "eth_sendTransaction",
        params: [
          {
            // from: `${currentUser?.account?.substring(0, 8)}...`,
            from: currentUser?.account,
            to: "0x6B8763cBF3D796E2AC96A39C7ad0D81F3873612E",
            value: "1",
            gasLimit: '0x5028',
            // Customizable by the user during MetaMask confirmation.
            maxPriorityFeePerGas: '0x3b9aca00',
            // Customizable by the user during MetaMask confirmation.
            maxFeePerGas: '0x2540be400',
          }
        ]
      }
    );
    } catch (err) {
      console.warn("failed to send request..", err);
    }
  };

  const phone =
    [
      car?.phone.slice(0, 3),
      " ",
      car?.phone.slice(3, 7),
      " ",
      car?.phone.slice(7),
    ].join("") || "";

  const openImage = index => {
    setShowSlider(true);
    setSliderIndex(index);
  };

  useEffect(() => {
    getData();
  }, [id]);

  return (
    <div className="car">
      {showSlider && (
        <ImagesSlider
          images={images}
          sliderIndex={sliderIndex}
          setSliderIndex={setSliderIndex}
          setShowSlider={setShowSlider}
        />
      )}
      <div style={{ borderBottom: "1px  solid black" }}>
        <Navbar />
      </div>
      {isLoading ? (
        <TailSpin
          height="60"
          width="60"
          color="gray"
          ariaLabel="tail-spin-loading"
          wrapperStyle={{
            margin: "80px auto",
            width: "fit-content",
          }}
          radius="1"
          visible={true}
        />
      ) : (
        car && (
          <>
            <div className="container car-wrapper">
              <div className="left">
                <div className="img-wrapper">
                  {images.map((img, i) => (
                    <img
                      onClick={() => openImage(i)}
                      key={i}
                      src={img}
                      alt={car.model}
                    />
                  ))}
                </div>
                <div className="desc-card">
                  <span className="model">
                    {car.make} {car.model}
                  </span>
                  <span className="title">{car.title}</span>
                  {car.desc && <span className="desc">{car.desc}</span>}
                </div>
              </div>
              <div className="right">
                <span className="price">
                  <small>USD</small>
                  {car.price.toLocaleString()}
                </span>
                {/* <div
                  style={{ width: "100%" }}
                  onClick={() => setShowEmail(true)}
                >
                  <a href={`mailto:${car.email}`} className="email">
                    {showEmail ? car.email : "Show Email"}
                  </a>
                </div> */}
                <div
                  style={{ width: "100%" }}
                  onClick={send}
                >
                  <a href="#" className="email">
                    Pay
                  </a>
                </div>
                <div
                  style={{ width: "100%" }}
                  onClick={() => setShowNumber(true)}
                >
                  <a href={`tel:+${car.phone}`} className="phone">
                    {showNumber ? phone : "Show Number"}
                  </a>
                </div>

                <div className="details">
                  {carDetails.map((d, i) => (
                    <div key={i} className="row">
                      <span>{d}</span>
                      <span>{car[d.toLowerCase()]}</span>
                    </div>
                  ))}
                </div>
                <div className="options">
                  {car.tags.map((t, i) => (
                    <div key={i} className="card">
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Footer />
          </>
        )
      )}
    </div>
  );
};

export default Car;
