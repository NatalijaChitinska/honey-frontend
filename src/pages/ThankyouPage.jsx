import { Link } from 'react-router-dom';

function ThankyouPage() {
    return (
        <div className='page page--thankyou'>
            <div className='thankyou-card'>
                <h1>Ви благодариме!</h1>
                <p>Вашата нарачка е успешно испратена</p>

                <div className='thankyou-actions'>
                    <Link to='/api/products' className='button'>
                        Продолжи со купување
                    </Link>
                    <Link to='/api' className='button'>
                        Назад на почетна
                    </Link>
                </div>

                <p className='thankyou-note'>
                📦 Достава: 1-3 работни дена <br />
                📞 За прашања: 07X XXX XXX
                </p>
            </div>
        </div>
    );
}

export default ThankyouPage;