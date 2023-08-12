import * as React from 'react';
import { Link } from 'react-router-dom';


const Landing = () => {
    const randomText = "Welcome to our website. Search NPM packages and add to your favourites!";

    return (
        <section className='landing flex flex-col items-center justify-center' style={{ marginTop: '64px' }}>
            <p className="text-center text-3xl text-white font-bold mb-6">{randomText}</p>
            <Link to='/dashboard'>
                <button className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'>Click here to start</button>
            </Link>
        </section>
    )

}

export default Landing;