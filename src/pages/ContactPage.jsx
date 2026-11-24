import contactImg from '../assets/imgcontact.png';
import { FiMapPin, FiMail, FiPhone } from 'react-icons/fi';

function ContactPage() {
    return (
        <div className="page page--info page--contact">
            <div className="contact-layout">
                <div className="contact-layout__text">
                    <h1>Контакт</h1>
                    <p>Имате прашање за нашиот мед, сакате да дознаете повеќе за производите или да направите нарачка?</p>
                    <p>Слободно контактирајте нè. Со задоволство ќе ви одговориме!</p>

                </div>

                <div className="contact-layout__image">
                    <img src={contactImg} alt="ОрМед контакт" />
                </div>
            </div>
            <hr className="ormed-divider" />
            <h2>Контакт информации</h2>
            <div className={"contact-group"}>
                <h3 className={'contact-title'}>
                    <FiMapPin className="contact-icon" aria-hidden="true" />
                    <span>Локација</span>
                </h3>
                <span className={"contact-span"}>Во срцето на Малешевијата – Берово</span>
            </div>
            <div className={"contact-group"}>
                <h3 className={'contact-title'}>
                    <FiMail className="contact-icon" aria-hidden="true" />
                    <span>Е-пошта</span>
                </h3>
                <span className={"contact-span"}>info@ormed.mk</span>
            </div>
            <div className={"contact-group"}>
                <h3 className={'contact-title'}>
                    <FiPhone className="contact-icon" aria-hidden="true" />
                    <span>Телефон</span>
                </h3>
                <span className={"contact-span"}>+389 70 123 456</span>
            </div>
            <hr className="ormed-divider" />

        </div>

    );
}

export default ContactPage;