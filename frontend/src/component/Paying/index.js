import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import GetAllData from '../GetAllData';
import classNames from 'classnames/bind';
import styles from './Paying.module.scss';
import Header from '../DefaultPage/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { fakeApi } from './fakeApi';

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';
let codeTicket = '';

const cx = classNames.bind(styles);

const randomCharacters = () => {
    for (let i = 0; i < 6; i++) {
        if (i === 4) {
            const randomIndex = Math.floor(Math.random() * numbers.length);
            codeTicket += numbers[randomIndex];
        } else {
            const randomIndex = Math.floor(Math.random() * letters.length);
            codeTicket += letters[randomIndex];
        }
    }
    return codeTicket;
};
codeTicket = randomCharacters();

const checkTypeTrip = (TypeTrip) => {
    if (TypeTrip === 'Oneway') return true;
    else return false;
};

function Paying() {
    const [show, setShow] = useState(false);
    const storedInforFlight = JSON.parse(localStorage.getItem('inforFlight'));
    const storedInforPerson = JSON.parse(localStorage.getItem('inforPerson'));
    const storedInforSeat = JSON.parse(localStorage.getItem('bookedButton'));
    const storedTypeTrip = JSON.parse(localStorage.getItem('TypeTrip'));

    const [plant, setPlant] = useState('');
    const [numberCard, setNumberCard] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [name, setName] = useState('');
    const [isNumberCard, setIsNumberCard] = useState(false);

    let storedInforFlightReturn, storedInforSeatReturn;

    const valueReturn = () => {
        storedInforFlightReturn = JSON.parse(localStorage.getItem('inforFlightReturn'));
        storedInforSeatReturn = JSON.parse(localStorage.getItem('bookedButtonReturn'));

        const data = {
            TypeFlight: storedTypeTrip,
            TypeTicket: storedInforFlight.selectedValue,
            AirportFrom: storedInforFlight.item.AirportFrom,
            AirportTo: storedInforFlight.item.AirportTo,
            FlightTime: storedInforFlight.item.FlightTime,
            LandingTime: storedInforFlight.item.LandingTime,
            DateGo: storedInforFlight.item.DateGo,
            CodeTicket: codeTicket,
            FlightNumber: storedInforFlight.item.FlightNumber,
            UserName: storedInforPerson.Username,
            ID_Card: storedInforPerson.ID_Card,
            CodeSeat: storedInforSeat.join(' - '),
            Email: storedInforPerson.Email,

            TypeTicketReturn: storedInforFlightReturn.selectedValue,
            FlightNumberReturn: storedInforFlightReturn.item.FlightNumber,
            FlightTimeReturn: storedInforFlightReturn.item.FlightTime,
            LandingTimeReturn: storedInforFlightReturn.item.LandingTime,
            DateReturn: storedInforFlightReturn.item.DateGo,
            CodeSeatReturn: storedInforSeatReturn.join(' - '),

            TotalMoney: storedInforFlight.total + storedInforFlightReturn.total,
        };
        return data;
    };

    const valueDepart = () => {
        const data = {
            TypeFlight: storedTypeTrip,
            TypeTicket: storedInforFlight.selectedValue,
            AirportFrom: storedInforFlight.item.AirportFrom,
            AirportTo: storedInforFlight.item.AirportTo,
            FlightTime: storedInforFlight.item.FlightTime,
            LandingTime: storedInforFlight.item.LandingTime,
            DateGo: storedInforFlight.item.DateGo,
            CodeTicket: codeTicket,
            FlightNumber: storedInforFlight.item.FlightNumber,
            UserName: storedInforPerson.Username,
            ID_Card: storedInforPerson.ID_Card,
            CodeSeat: storedInforSeat.join(' - '),
            Email: storedInforPerson.Email,

            TotalMoney: storedInforFlight.total,
        };
        return data;
    };

    let data00;

    if (checkTypeTrip(storedTypeTrip)) {
        data00 = valueDepart();
        console.log('m bi ngao a');
    } else data00 = valueReturn();

    console.log('in ra cho t: ' + storedInforFlightReturn);

    console.log('in ra cho t ngay: ' + storedInforFlight);

    const sendInfoData = () => {
        fetch('http://localhost:4000/info', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify(data00),
        })
            .then((response) => {
                if (response.ok) {
                    console.log('Data sent successfully');
                } else {
                    console.error('Error sending data:', response.statusText);
                    console.log('thoi s gio loi roi');
                }
            })
            .catch((error) => {
                console.error('Error sending data:', error);
            });
    };

    console.log(data00.TypeTicket);
    console.log(data00);

    const [dataNew, setDataNew] = useState();
    const [dataNew2, setDataNew2] = useState();

    async function fetchAPI1(id) {
        let response = await fetch(`http://localhost:4000/tickets/${id}`);
        let data1 = await response.json();
        setDataNew(data1.data);
        return data1.data;
    }

    async function fetchAPI2(id) {
        let response = await fetch(`http://localhost:4000/tickets/${id}`);
        let data1 = await response.json();
        setDataNew2(data1.data);
        return data1.data;
    }
    let array1, array2;
    if (dataNew) {
        console.log(dataNew);
        console.log(dataNew[data00.TypeTicket]);
        array1 = dataNew[data00.TypeTicket].CodeSeat;
        array1.push(...storedInforSeat);
        console.log(array1);

        console.log(dataNew[data00.TypeTicket].PriceChildren);
        // console.log(dataNew[data00.FirstClass].PriceChildren);
        console.log('dcm');
    } else {
        fetchAPI1(storedInforFlight.item._id);
    }

    if (checkTypeTrip()) {
        if (dataNew2) {
            console.log(dataNew2);
            console.log(data00);
            console.log(dataNew2[data00.TypeTicketReturn]);
            array2 = dataNew2[data00.TypeTicketReturn].CodeSeat;
            array2.push(...storedInforSeatReturn);
            console.log(array2);

            // console.log(dataNew2[data00.TypeTicketReturn].PriceChildren);

            console.log('dcm no');
        } else {
            console.log(storedInforFlightReturn.item);
            fetchAPI2(storedInforFlightReturn.item._id);
        }
    }

    const pushSeat = (id) => {
        console.log('ma no cay that chu');
        const data = {
            [data00.TypeTicket]: {
                // PriceAdult: dataNew[data00.FirstClass].PriceAdult,
                // PriceChildren: dataNew[data00.FirstClass].Children,
                PriceAdult: dataNew[data00.TypeTicket].PriceAdult,
                PriceChildren: dataNew[data00.TypeTicket].PriceChildren,
                CodeSeat: array1,
            },
        };

        axios
            .patch(`http://localhost:4000/tickets/${id}`, data)
            .then((response) => {
                console.log('Data updated:', response.data);
                // Perform any additional actions after successful update
            })
            .catch((error) => {
                console.error('Error updating data:', error);
                // Handle error case
            });
    };

    const pushSeat2 = (id) => {
        console.log('ma no cay that chu 3');
        const data = {
            [data00.TypeTicketReturn]: {
                // PriceAdult: dataNew[data00.FirstClass].PriceAdult,
                // PriceChildren: dataNew[data00.FirstClass].Children,
                PriceAdult: dataNew2[data00.TypeTicketReturn].PriceAdult,
                PriceChildren: dataNew2[data00.TypeTicketReturn].PriceChildren,
                CodeSeat: array2,
            },
        };

        axios
            .patch(`http://localhost:4000/tickets/${id}`, data)
            .then((response) => {
                console.log('Data updated:', response.data);
                // Perform any additional actions after successful update
            })
            .catch((error) => {
                console.error('Error updating data:', error);
                // Handle error case
            });
    };

    const handlePay = (e) => {
        if (numberCard !== '' && expirationDate !== '' && name !== '') {
            if (isNumberCard) {
                setShow(true);
                console.log('success');

                console.log(data00);

                sendInfoData();
                handleSendEmail();

                pushSeat(storedInforFlight.item._id);

                if (checkTypeTrip()) {
                    console.log('nham roi em ơis');
                    pushSeat2(storedInforFlightReturn.item._id);
                }

                setTimeout(() => {
                    localStorage.clear();
                });
            }
        } else {
            handleInputNumberCard(e);
        }
    };

    // const email = "minh10a1quangtrung@gmail.com";
    // const code = "AJHHF";
    const handleSendEmail = async (e) => {
        const res = await fetch('http://localhost:4000/sendEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: data00.Email,
                code: data00.CodeTicket,
            }),
        });
        console.log(res);
    };
    const planeCode = storedInforFlight.item.AirlineCode;

    useEffect(() => {
        if (planeCode === 'VJ') {
            setPlant('VietJet');
        } else if (planeCode === 'VNA') {
            setPlant('Vietnam Airlines');
        } else if (planeCode === 'QH') {
            setPlant('BamBo Airways');
        } else if (planeCode === 'BL') {
            setPlant('Jetstar Pacific Airlines');
        }
    }, [planeCode]);

    function is_creditCard(str) {
        const regexp =
            /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/;

        if (regexp.test(str)) {
            return true;
        } else {
            return false;
        }
    }

    const handleInputNumberCard = (e) => {
        setNumberCard(e.target.value);

        const cardNumber = document.querySelector('#card-number');
        const error = document.querySelector('#ip-1');

        if (!is_creditCard(e.target.value)) {
            cardNumber.style.outlineColor = 'red';
            error.innerText = 'Số thẻ không hợp lệ';
            error.style.color = 'red';
            setIsNumberCard(false);
        } else {
            cardNumber.style.outlineColor = '#4469b0';
            error.innerText = 'Vui lòng nhập số thẻ';
            error.style.color = 'transparent';
            fakeApi.forEach((value) => {
                if (value.cardNumber === e.target.value) {
                    setName(value.name);
                    setExpirationDate(value.exp);
                }
            });
            setIsNumberCard(true);
        }
    };

    return (
        <div className={cx('wrapper_pay')}>
            <Header />

            <div className={cx('contain_pay')}>
                <div className={cx('wrapper')}>
                    <div className={cx('container')}>
                        <div className={cx('header')}>
                            <img
                                className={cx('Header_logo-img__tUcP2')}
                                alt="logo"
                                src="https://res.flynow.vn/logoflynow.png"
                            />
                        </div>
                        <div className={cx('content')}>
                            <div className={cx('information')}>
                                <div className={cx('supplier')}>
                                    <div className={cx('title')}>
                                        <FontAwesomeIcon className={cx('title-icon')} icon={faHouse} />
                                        <span>Nhà cung cấp </span>
                                    </div>
                                    <span id="plant" className={cx('information-line')}>
                                        {plant}
                                    </span>
                                </div>
                                <div className={cx('supplier')}>
                                    <div className={cx('title')}>
                                        <FontAwesomeIcon className={cx('title-icon')} icon={faMoneyBill} />
                                        <span> Số tiền </span>
                                    </div>
                                    <span className={cx('information-line')}>{data00.TotalMoney} VND</span>
                                </div>
                            </div>
                            <div className={cx('bank-card')}>
                                <span className={cx('card-title')}>Chi tiết thẻ</span>
                                <input
                                    id="card-number"
                                    className={cx('input-text')}
                                    value={numberCard}
                                    type="text"
                                    placeholder="Số thẻ"
                                    onChange={handleInputNumberCard}
                                />
                                <span id="ip-1" className={cx('title-input')}>
                                    Không được bỏ trống trường này
                                </span>
                                <input
                                    id="date"
                                    className={cx('input-text')}
                                    autoComplete="off"
                                    maxLength="7"
                                    value={expirationDate}
                                    inputMode="numeric"
                                    type="tel"
                                    placeholder="Ngày hết hạn"
                                />
                                <span id="ip-2" className={cx('title-input')}>
                                    Không được bỏ trống trường này
                                </span>
                                <input
                                    id="name"
                                    className={cx('input-text')}
                                    value={name}
                                    placeholder="Họ tên chủ thẻ"
                                />
                                <span id="ip-3" className={cx('title-input')}>
                                    Không được bỏ trống trường này
                                </span>
                                <div className={cx('submit-btn')}>
                                    <Link to="/seatBook" className={cx('btn', 'return-btn')}>
                                        <span>Trở lại</span>
                                    </Link>
                                    <button className={cx('btn', 'next-btn')} onClick={handlePay}>
                                        Thanh toán
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 
        <button onClick={handlePay}>Paying</button> */}
                {/* <button onClick={handleSendEmail}>Send Email</button> */}
                {show && <GetAllData data={data00} />}
                {/* {show && <GetAllData data={storedMyData} />} */}
            </div>
        </div>
    );
}

export default Paying;
// "TypeFlight": "OneWay",
//     "TypeTicket" : "Economy Class",
//     "AirportFrom": "HAN",
//     "AirportTo": "SGN",
//     "FlightTime": "2024-01-01T04:30:00.000Z",
//    "LandingTime": "2024-01-01T06:55:00.000Z",
//    "DateGo": "2024-01-01T00:00:00.000Z",
//    "TotalMoney": 10000000,
//    "CodeTicket": "ERSAF",
//    "FlightNumber":"QH03",
//    "UserName": "Tran Linh",
//    "ID_Card": "21001125",
//    "CodeSeat": "8A",
//    "Email":"linh10a1@gmail.com"
