import "./SeatBook.scss";
import TypeSeat from "./TypeSeat";
import seatBook from "../../asset/images/bookSeat.jpg";

function TypeCommon({
  storedInforFlight,
  typeSeat1,
  handleButtonClick,
  bookedButton,
  title,
  dataNew,
}) {
  console.log(dataNew);
  return (
    <div className="depart">
      {/* <h2 className="title_0">Depart: {storedInforFlight.item.DateGo}</h2> */}
      <h2 className="title_0">{title}</h2>

      <div
        className="wrapper_0"
        style={{
          backgroundImage: `url(${seatBook})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}
      >
        <span className="info_0">
          {storedInforFlight.item.FlightNumber} <br />
          <span className="type_0">{typeSeat1}</span>
          {/* <span className="type_0">{storedInforFlight.selectedValue}</span> */}
        </span>
      </div>

      {typeSeat1 === "EconomyClass" && (
        <TypeSeat
          handleButtonClick={handleButtonClick}
          bookedButton={bookedButton}
          number={7}
          dataNew={dataNew.EconomyClass}
        />
      )}
      {typeSeat1 === "BusinessClass" && (
        <TypeSeat
          handleButtonClick={handleButtonClick}
          bookedButton={bookedButton}
          number={3}
          dataNew={dataNew.BusinessClass}
        />
      )}
      {typeSeat1 === "FirstClass" && (
        <TypeSeat
          handleButtonClick={handleButtonClick}
          bookedButton={bookedButton}
          number={1}
          dataNew={dataNew.FirstClass}
        />
      )}
      {typeSeat1 === "PremiumClass" && (
        <TypeSeat
          handleButtonClick={handleButtonClick}
          bookedButton={bookedButton}
          number={5}
          dataNew={dataNew.PremiumClass}
        />
      )}
    </div>
  );
}

export default TypeCommon;
