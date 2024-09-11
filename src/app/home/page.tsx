import React from 'react';
import Image from 'next/image';
import Foreman from '@public/icons/Foreman.png';
import Crane from '@public/icons/Crane.png';
import Engineer from '@public/icons/Engineer.png';
import ShoppingCart from '@public/icons/Shopping cart.png';
import AddUser1 from '@public/icons/Add user (1).png';
import AddUser from '@public/icons/Add user.png';
import Chat from '@public/icons/Chat.png';
import PaymentMethod from '@public/icons/Payment method.png';
import Wip from '@public/icons/Wip.png';
import Review from '@public/icons/Reviews.png';
import CurriculumVitae from '@public/icons/Curriculum vitae.png';
import Checked from '@public/icons/Checked.png';
import Suitcase from '@public/icons/Suitcase.png';




import './main.css';
import LandingHeader from './components/Header';
import LandingFooter from './components/Footer';


const HomePage: React.FC = () => {
    return (
        <>
            <LandingHeader />
            <main className='main__container'>
                <section className='main__container_provider'>
                    <h3>Build with a Service Provider near you!</h3>
                    <div className='main__container_provider_tags'>
                        <div className='workTag'>
                            <div className='logoIcon'>
                                <Image src={Foreman} alt="Isomorphic" className="dark:invert" />
                            </div>
                            <button className='btn'>
                                Fundi
                            </button>
                        </div>
                        <div className='workTag'>
                            <div className='logoIcon'>
                                <Image src={Engineer} alt="Isomorphic" className="dark:invert" />
                            </div>
                            <button className='btn'>
                                Professional
                            </button>
                        </div>
                        <div className='workTag'>
                            <div className='logoIcon'>
                                <Image src={ShoppingCart} alt="Isomorphic" className="dark:invert" />
                            </div>
                            <button className='btn'>
                                Hardware
                            </button>
                        </div>
                        <div className='workTag'>
                            <div className='logoIcon'>
                                <Image src={Crane} alt="Isomorphic" className="dark:invert" />
                            </div>
                            <button className='btn'>
                                Contractor
                            </button>
                        </div>
                    </div>
                </section>
                <section className='main__container_work'>
                    <div>
                        <h1>How it <span style={{ color: 'blue' }}>Works?</span></h1>
                        <h2>Customers</h2>
                    </div>
                    <div className='process'>
                        <div className='tag'>
                            <div className='logoIcon '>
                                <Image src={AddUser} alt="Isomorphic" className="dark:invert" />
                            </div>
                            <span className='btn'>
                                Sign up with us
                            </span>
                        </div>
                        <div className='tag'>
                            <div className='logoIcon'>
                                <Image src={Chat} alt="Isomorphic" className="dark:invert" />
                            </div>
                            <span className='btn'>
                                Make a requisition to find Service Providers near you
                            </span>
                        </div>
                        <div className='tag'>
                            <div className='logoIcon'>
                                <Image src={PaymentMethod} alt="Isomorphic" className="dark:invert" />
                            </div>
                            <span className='btn'>
                                Make payment in advance or as per milestone agreed
                            </span>
                        </div>
                        <div className='tag'>
                            <div className='logoIcon'>
                                <Image src={Wip} alt="Isomorphic" className="dark:invert" />
                            </div>
                            <span className='btn'>
                                Job Start
                            </span>
                        </div>
                        <div className='tag'>
                            <div className='logoIcon'>
                                <Image src={Review} alt="Isomorphic" className="dark:invert" />
                            </div>
                            <span className='btn'>
                                Review Job
                            </span>
                        </div>
                    </div>
                    <div>
                        <h2>Service Providers</h2>
                    </div>
                    <div className='process'>
                        <div className='tag'>
                            <div className='logoIcon'>
                                <Image src={AddUser1} alt="Isomorphic" className="dark:invert" />
                            </div>
                            <span className='btn'>
                                Sign up with us
                            </span>
                        </div>
                        <div className='tag'>
                            <div className='logoIcon'>
                                <Image src={CurriculumVitae} alt="Isomorphic" className="dark:invert" />
                            </div>
                            <span className='btn'>
                                Create a Profile
                            </span>
                        </div>
                        <div className='tag'>
                            <div className='logoIcon'>
                                <Image src={Checked} alt="Isomorphic" className="dark:invert" />
                            </div>
                            <span className='btn'>
                                Be verified
                            </span>
                        </div>
                        <div className='tag'>
                            <div className='logoIcon'>
                                <Image src={Suitcase} alt="Isomorphic" className="dark:invert" />
                            </div>
                            <span className='btn'>
                                Quote for Jobs
                            </span>
                        </div>
                        <div className='tag'>
                            <div className='logoIcon'>
                                <Image src={Wip} alt="Isomorphic" className="dark:invert" />
                            </div>
                            <span className='btn'>
                                Job Start
                            </span>
                        </div>
                        <div className='tag'>
                            <div className='logoIcon'>
                                <Image src={Review} alt="Isomorphic" className="dark:invert" />
                            </div>
                            <span className='btn'>
                                Review Job
                            </span>
                        </div>
                    </div>
                    <div>
                        <button className='request_btn'>
                            Make a Request
                        </button>
                    </div>
                </section>
                <section className='provider__container'>
                    <div className='provider__container_one'>
                        <div className='provider__container_one_two'>
                            <h4>Service Provider</h4>
                            <div>
                                <h5>Fundi</h5>
                                <p>Get a qualified and verified fundi/artisan near you.</p>
                            </div>
                        </div>
                        <div className='provider__container_one_two'>
                            <h4>Services</h4>
                            <div className='services'>
                                <ul>
                                    <li>New construction</li>
                                    <li>Repairs</li>
                                    <li>Demolitions</li>
                                </ul>
                                <ul>
                                    <li>Masons</li>
                                    <li>Electrician</li>
                                    <li>Plumber</li>
                                    <li>Welder</li>
                                    <li>Roofer</li>
                                    <li>Foremen</li>
                                    <li>Fitter</li>
                                    <li>Tile fixer</li>
                                </ul>
                            </div>
                        </div>
                        <div className='provider__container_one_two'>
                            <h4>Trades</h4>
                                <ul>
                                    <li>Steel fixer</li>
                                    <li>Skimmers/Wall masters</li>
                                    <li>Carpenter</li>
                                    <li>Painter</li>
                                    <li>Glass fitter</li>
                                </ul>
                        </div>
                    </div>
                    <div className='provider__container_one'>
                        <div className='provider__container_one_two'>
                            <h4>Service Provider</h4>
                            <div>
                                <h5>Professional</h5>
                                <p>Get a qualified and verified professional near you.</p>
                            </div>
                        </div>
                        <div className='provider__container_one_two'>
                            <h4>Services</h4>
                            <ul>
                                <li>Design of new developments</li>
                                <li>Redesign of existing developments</li>
                                <li>Consultancy</li>
                            </ul>
                            <ul>
                                <li>Engineers</li>
                                <li>Architects</li>
                                <li>EIA Experts</li>
                                <li>Draughtsmen</li>
                                <li>Quantity Surveyors</li>
                                <li>Project Managers</li>
                            </ul>
                        </div>
                        <div className='provider__container_one_two'>
                            <h4>Trades</h4>
                            <ul>
                                <li>Construction manager</li>
                                <li>Technicians</li>
                                <li>Land valuers</li>
                                <li>Surveyors</li>
                                <li>Planners</li>
                            </ul>
                        </div>
                    </div>
                    <div className='provider__container_one'>
                        <div className='provider__container_one_two'>
                            <h4>Service Provider</h4>
                            <div>
                                <h5>Hardware</h5>
                                <p>Get quality materials near you.</p>
                            </div>
                        </div>
                        <div className='provider__container_one_two'>
                            <h4>Services</h4>
                            <ul>
                                <li>General Materials</li>
                                <li>Design Concepts</li>
                                <li>Custom Products</li>
                            </ul>
                            <ul>
                                <li>Quarry Items</li>
                                <li>Steel & Aluminium</li>
                                <li>Timber & Woods</li>
                                <li>Roofing Products</li>
                            </ul>
                        </div>
                        <div className='provider__container_one_two'>
                            <h4>Trades</h4>
                            <ul>
                                <li>Paints & other Chemicals</li>
                                <li>Plumbing materials</li>
                                <li>Flooring & ceiling</li>
                                <li>Electricals</li>
                                <li>Tools & other equipments</li>
                            </ul>
                        </div>
                    </div>
                    <div className='provider__container_one'>
                        <div className='provider__container_one_two'>
                            <h4>Service Provider</h4>
                            <div>
                                <h5>Contractor</h5>
                                <p>Get qualified and verified NCA contractor near you.</p>
                            </div>
                        </div>
                        <div className='provider__container_one_two'>
                            <h4>Services</h4>
                            <ul>
                                <li>New construction</li>
                                <li>Repairs</li>
                                <li>Demolitons</li>
                            </ul>
                            <ul>
                                <li>Water</li>
                                <li>Energy</li>
                                <li>Housing</li>
                                <li>Other Infrastructure</li>
                            </ul>
                        </div>
                        <div className='provider__container_one_two'>
                            <h4>Trades</h4>
                            <ul>
                                <li>Construction manager</li>
                                <li>Technicians</li>
                                <li>Land valuers</li>
                                <li>Surveyors</li>
                                <li>Planners</li>
                            </ul>
                        </div>
                    </div>
                </section>
            </main>
            <LandingFooter />
        </>
    );
};

export default HomePage;