import { useState } from 'react';
import axios from 'axios';
import styles from './Check.module.scss';
import classNames from 'classnames/bind';
import { toast } from 'react-toastify';
import ToastCustom from '../../Toast';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { ModalSeatBooking } from '../../Modal';

const cx = classNames.bind(styles);

function Check() {
    const [data, setData] = useState({
        Username: '',
        DayOfBirth: '',
        Email: '',
        Address: '',
        ID_Card: '',
        Phone: '',
    });

    let isName = false;
    let isPhone = false;
    let isEmail = false;
    let isAddress = false;
    let isCCCD = false;
    let isDate = false;

    const handleChange = (e) => {
        const value = e.target.value;
        const id = e.target.id;

        setData({ ...data, [id]: value });
    };

    const [showModal, setShowModal] = useState(false);

    const handleSubmit = () => {
        handleCheckForm();

        if (isAddress && isDate && isEmail && isCCCD && isName && isPhone) {
            axios
                .post('http://localhost:4000/auth/enterInfo', {
                    Username: data.Username,
                    DayOfBirth: data.DayOfBirth,
                    Email: data.Email,
                    Address: data.Address,
                    ID_Card: data.ID_Card,
                    Phone: data.Phone,
                })
                .then((res) => {
                    console.log(res);
                    toast.success('Nhập thông tin thành công');
                    setData({
                        Username: '',
                        DayOfBirth: '',
                        Email: '',
                        Address: '',
                        ID_Card: '',
                        Phone: '',
                    });

                    setTimeout(() => {
                        setShowModal(true);
                    }, 4000);

                    // Store bookedButton in localStorage
                    localStorage.setItem('inforPerson', JSON.stringify(data));
                })
                .catch((err) => {
                    console.log(err);
                    toast.error('Vui lòng nhập lại thông tin');
                });
        } else {
            toast.error('Vui lòng nhập lại thông tin');
        }
    };

    const handleCheckForm = () => {
        handleCheckName();
        handleCheckDate();
        handleCheckEmail();
        handleCheckAdress();
        handleCheckCCCD();
        handleCheckPhone();
    };

    const handleCheckName = () => {
        const errorUsename = document.querySelector('#check-1');

        if (data.Username.trim() === '') {
            errorUsename.style.color = 'red';
            isName = false;
        } else {
            errorUsename.style.color = 'transparent';
            isName = true;
        }

        return isName;
    };

    const handleCheckDate = () => {
        const errorDay = document.querySelector('#check-2');
        const day = data.DayOfBirth.split('/');
        const validteDay = day[1] + '/' + day[0] + '/' + day[2];

        if (!isDateValid(validteDay)) {
            errorDay.style.color = 'red';
            isDate = false;
        } else {
            errorDay.style.color = 'transparent';
            isDate = true;
        }

        return isDate;
    };

    const handleCheckEmail = () => {
        const errorEmail = document.querySelector('#check-3');
        const redex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (!redex.test(data.Email)) {
            errorEmail.style.color = 'red';
            isEmail = false;
        } else {
            errorEmail.style.color = 'transparent';
            isEmail = true;
        }
    };

    const handleCheckAdress = () => {
        const errorAdress = document.querySelector('#check-4');
        if (data.Address.trim() === '') {
            errorAdress.style.color = 'red';
            isAddress = false;
        } else {
            errorAdress.style.color = 'transparent';
            isAddress = true;
        }
    };

    const handleCheckCCCD = () => {
        const errorCMND = document.querySelector('#check-5');
        const isNumberCCCD = isNaN(data.ID_Card.trim());

        if (data.ID_Card.trim() === '') {
            errorCMND.innerText = 'Trường này không được bỏ trống';
            errorCMND.style.color = 'red';
            isCCCD = false;
        } else if (data.ID_Card.trim().length === 12 && !isNumberCCCD) {
            errorCMND.style.color = 'transparent';
            isCCCD = true;
        } else {
            errorCMND.innerText = 'Số CCCD không hơp lệ';
            errorCMND.style.color = 'red';
            isCCCD = false;
        }

        return isCCCD;
    };

    const handleCheckPhone = () => {
        const errorPhone = document.querySelector('#check-6');
        const phoneRegex = /((09|03|07|08|05)+([0-9]{8})\b)/g;

        if (!phoneRegex.test(data.Phone)) {
            errorPhone.style.color = 'red';
            isPhone = false;
        } else {
            errorPhone.style.color = 'transparent';
            isPhone = true;
        }
    };

    function isDateValid(dateStr) {
        return !isNaN(new Date(dateStr));
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h2 className={cx('title_1', 'pb-2')}>Nhập thông tin</h2>

                <form className={cx('form_1', 'mt-2')}>
                    <div className={cx('content')}>
                        <div className={cx('col_6')}>
                            <label className={cx('title_2', 'mb-1')} htmlFor="Username">
                                Họ tên
                            </label>

                            <input
                                type="text"
                                id="Username"
                                placeholder="Họ và tên"
                                value={data.Username}
                                onChange={handleChange}
                                className={cx('input')}
                            />
                            <span id="check-1" className={cx('error-message')}>
                                Trường này không được bỏ trống
                            </span>
                        </div>

                        <div className={cx('col_6')}>
                            <label className={cx('title_2', 'mb-1')} htmlFor="DayOfBirth">
                                Ngày sinh
                            </label>

                            <input
                                type="text"
                                id="DayOfBirth"
                                value={data.DayOfBirth}
                                placeholder="Ngày sinh"
                                onChange={handleChange}
                                className={cx('input')}
                            />
                            <span id="check-2" className={cx('error-message')}>
                                Vui lòng nhập ngày sinh
                            </span>
                        </div>
                    </div>

                    <div className={cx('content')}>
                        <div className={cx('col_6')}>
                            <label className={cx('title_2', 'mb-1')} htmlFor="Email">
                                Email
                            </label>

                            <input
                                type="text"
                                id="Email"
                                value={data.Email}
                                placeholder="Địa chỉ email"
                                onChange={handleChange}
                                className={cx('input')}
                            />
                            <span id="check-3" className={cx('error-message')}>
                                Trường này phải là email
                            </span>
                        </div>

                        <div className={cx('col_6')}>
                            <label className={cx('title_2', 'mb-1')} htmlFor="Address">
                                Địa chỉ
                            </label>

                            <input
                                type="text"
                                id="Address"
                                value={data.Address}
                                placeholder="Địa chỉ"
                                onChange={handleChange}
                                className={cx('input')}
                            />
                            <span id="check-4" className={cx('error-message')}>
                                Trường này không được bỏ trống
                            </span>
                        </div>
                    </div>

                    <div className={cx('content')}>
                        <div className={cx('col_6')}>
                            <label className={cx('title_2', 'mb-1')} htmlFor="ID_Card">
                                Số CCCD
                            </label>

                            <input
                                type="text"
                                value={data.ID_Card}
                                id="ID_Card"
                                placeholder="Số CCCD"
                                onChange={handleChange}
                                className={cx('input')}
                            />
                            <span id="check-5" className={cx('error-message')}>
                                Trường này không được bỏ trống
                            </span>
                        </div>

                        <div className={cx('col_6')}>
                            <label className={cx('title_2', 'mb-1')} htmlFor="Phone">
                                Số điện thoại
                            </label>

                            <input
                                type="text"
                                id="Phone"
                                value={data.Phone}
                                placeholder="Số điện thoại"
                                onChange={handleChange}
                                className={cx('input')}
                            />
                            <span id="check-6" className={cx('error-message')}>
                                Trường này phải nhập số điện thoại
                            </span>
                        </div>
                    </div>

                    <div className={cx('content', ' mt-5')}>
                        <Link to="/" className={cx('button_submit', 'col_6')}>
                            {/* <div className={cx("button_submit col_6")}> */}
                            <span>Trở về</span>
                        </Link>
                        {/* </div> */}

                        <div className={cx('button_submit', 'col_6')} onClick={handleSubmit}>
                            <span>Tiếp theo</span>
                        </div>

                        <ToastCustom />
                    </div>
                </form>
            </div>

            {showModal && <ModalSeatBooking show={showModal} setShow={setShowModal} />}
        </div>
    );
}

export default Check;
