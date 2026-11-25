import { useState } from 'react';
import contactImg from '../assets/imgcontact.png';
import { FiMapPin, FiMail, FiPhone } from 'react-icons/fi';
import { contactMessagesApi } from '../api/endpoints';

const initialValues = {
    fullName: '',
    email: '',
    phoneNumber: '',
    message: '',
    createdAt: '',
};

function validateContactForm(values) {
    const errors = {};

    if (!values.fullName.trim()) {
        errors.fullName = 'Целото име е задолжително.';
    }

    if (!values.email.trim()) {
        errors.email = 'Е-пошта е задолжителна.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
        errors.email = 'Ве молиме внесете валидна е-пошта.';
    }

    if (!values.message.trim()) {
        errors.message = 'Пораката е задолжителна.';
    }

    return errors;
}

function ContactPage() {
    const [values, setValues] = useState(initialValues);
    const [fieldErrors, setFieldErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [submitSuccess, setSubmitSuccess] = useState('');

    const handleChange = (field) => (e) => {
        const nextValues = { ...values, [field]: e.target.value };
        setValues(nextValues);

        if (fieldErrors[field]) {
            const nextErrors = validateContactForm(nextValues);
            setFieldErrors((prev) => ({ ...prev, [field]: nextErrors[field] }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError('');
        setSubmitSuccess('');

        const errors = validateContactForm(values);
        setFieldErrors(errors);
        if (Object.keys(errors).length > 0) return;

        setSubmitting(true);
        try {
            await contactMessagesApi.create({
                fullName: values.fullName.trim(),
                email: values.email.trim(),
                phoneNumber: values.phoneNumber.trim() || null,
                message: values.message.trim(),
                createdAt: new Date()
            });

            setSubmitSuccess('Пораката е успешно испратена. Ќе до добиете одговор наскоро. Ви благодариме!');
            setValues(initialValues);
            setFieldErrors({});
        } catch (err) {
            const { message, fieldErrors: apiFieldErrors } = extractContactError(err);
            setSubmitError(message);
            if (Object.keys(apiFieldErrors).length > 0) {
                setFieldErrors((prev) => ({ ...prev, ...apiFieldErrors }));
            }
        } finally {
            setSubmitting(false);
        }
    };

    function extractContactError(err) {
        let raw = typeof err === 'string' ? err : err?.message || '';
        if (raw.startsWith('Error: ')) raw = raw.replace('Error: ', '');

        try {
            const parsed = JSON.parse(raw);

            // Prefer details[0] like: "phoneNumber: Невалиден телефонски број"
            const firstDetail = Array.isArray(parsed.details) ? parsed.details[0] : '';
            if (firstDetail && firstDetail.includes(':')) {
                const [field, ...rest] = firstDetail.split(':');
                const text = rest.join(':').trim();
                return {
                    message: text,
                    fieldErrors: { [field.trim()]: text },
                };
            }

            return {
                message: parsed.message || 'Настана грешка при испраќањето на пораката.',
                fieldErrors: {},
            };
        } catch {
            return {
                message: raw || 'Настана грешка при испраќањето на пораката.',
                fieldErrors: {},
            };
        }
    }

    return (
        <div className="page page--info page--contact">
            <div className="contact-layout">
                <div className="contact-layout__text">
                    <h1>Контакт</h1>
                    <p>Имате прашање за нашиот мед, сакате да дознаете повеќе за производите или да направите нарачка?</p>
                    <p>Слободно контактирајте нè. Со задоволство ќе ви одговориме!</p>
                    <hr className="ormed-divider" />
                    <h3>Контактирајте нè</h3>
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
                </div>

                <div className="contact-layout__image">
                    <img src={contactImg} alt="ОрМед контакт" />
                </div>
            </div>
            <hr className="ormed-divider" />
            <section className="contact-form-section" aria-labelledby="contact-form-title">
                <h2 id="contact-form-title">Испратете ни порака</h2>

                <form className="contact-form" onSubmit={handleSubmit} noValidate>
                    <label>
                        Име и Презиме *
                        <input
                            type="text"
                            value={values.fullName}
                            onChange={handleChange('fullName')}
                            aria-invalid={Boolean(fieldErrors.fullName)}
                            placeholder="Петар Петровски"
                        />
                        {fieldErrors.fullName && <span className="field-error">{fieldErrors.fullName}</span>}
                    </label>

                    <label>
                        Е-пошта *
                        <input
                            type="email"
                            value={values.email}
                            onChange={handleChange('email')}
                            aria-invalid={Boolean(fieldErrors.email)}
                            placeholder="you@gmail.com"
                        />
                        {fieldErrors.email && <span className="field-error">{fieldErrors.email}</span>}
                    </label>

                    <label>
                        Телефон (Опционално)
                        <input
                            type="tel"
                            value={values.phoneNumber}
                            onChange={handleChange('phoneNumber')}
                            placeholder="+389 70 123 456"
                        />
                    </label>

                    <label>
                        Порака *
                        <textarea
                            value={values.message}
                            onChange={handleChange('message')}
                            aria-invalid={Boolean(fieldErrors.message)}
                            placeholder="Внесете ја вашата порака..."
                            rows={6}
                        />
                        {fieldErrors.message && <span className="field-error">{fieldErrors.message}</span>}
                    </label>

                    {submitError && <p className="contact-form__status contact-form__status--error">{submitError}</p>}
                    {submitSuccess && <p className="contact-form__status contact-form__status--success">{submitSuccess}</p>}

                    <button type="submit" className="button" disabled={submitting}>
                        {submitting ? 'Се испраќа...' : 'Испрати'}
                    </button>
                </form>
            </section>

        </div>

    );
}

export default ContactPage;