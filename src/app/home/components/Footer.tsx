import * as React from 'react';
import Image from 'next/image';
import Copyright from '@public/icons/copyright.png';
import Email from '@public/icons/Email.png';
import Slice1 from '@public/icons/Slice 2.png';
import Slice from '@public/icons/Slice 1.png';
import Calling from '@public/icons/Calling.png';
import playstore from '@public/icons/google.png';
import appstore from '@public/icons/appstore.jpg';



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
                <div style={{display: 'flex', gap: '1rem'}}>
                <Image src={playstore} width={100} alt="Isomorphic" className="copyright" />
                <Image src={appstore} width={100} alt="Isomorphic" className="copyright" />
                </div>
            </div>
            <div>
                <p>
                    <Image src={Calling} width={15} alt="Isomorphic" className="copyright" />   +254716108282</p>
                <Image src={Email} width={15} alt="Isomorphic" className="copyright" /><a href="mailto:info@jagedo.co.ke">  info@jagedo.co.ke</a>
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