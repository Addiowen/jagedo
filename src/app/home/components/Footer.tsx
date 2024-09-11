import * as React from 'react';
import Image from 'next/image';
import Copyright from '@public/icons/copyright.png';
import '../main.css';


const LandingFooter: React.FC = () => {
    return (
        <footer className='footer'>
            <div>
                <p>All rights reserved to JaGedo <Image src={Copyright} width={15} alt="Isomorphic" className="copyright" /> 2024</p>
                <span>
                    <a href=''>Terms of Use</a> - 
                    <a href=''> Privacy Policy</a>
                </span>
            </div>
            <div>
                <p>+254716108282</p>
                <a href="mailto:info@jagedo.co.ke">info@jagedo.co.ke</a>
                <div>

                </div>
            </div>
            <div>
                <div>
                <a href="http://" target="_blank" rel="noopener noreferrer">FAQs</a>
                </div>
                <div>
                <a href="http://" target="_blank" rel="noopener noreferrer">Help</a>
                </div>
            </div>
        </footer>
    )
};

export default LandingFooter;